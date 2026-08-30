import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import {
  CONTACT_MESSAGE_COLUMNS,
  PAGE_SIZE,
  SIGNED_URL_TTL_SECONDS,
  formatFileSize,
  formatHungarianDate,
  hasAttachment,
  safeAttachmentDownloadName,
  type ContactMessage,
} from "../components/admin/ContactMessages";
import {
  isLegalHoldActive,
  retentionEligibilityFilter,
} from "../lib/contact-retention";
import { buildAdminMessageLink, buildAdminEmail, ADMIN_BASE_URL } from "../../supabase/functions/_shared/contact-emails";

const src = (p: string) => readFileSync(new URL(p, import.meta.url), "utf8");
const moduleSrc = src("../components/admin/ContactMessages.tsx");

const row = (over: Partial<ContactMessage> = {}): ContactMessage => ({
  id: "11111111-1111-4111-8111-111111111111",
  is_consumer_complaint: false,
  legal_hold_until: null,
  name: "Teszt Elek",
  email: "teszt@example.com",
  phone: null,
  message: "Ajánlatot kérek",
  created_at: "2026-08-06T12:00:00.000Z",
  source: "Kapcsolat",
  page_url: "https://northwind.hu/",
  attachment_name: null,
  attachment_size: null,
  attachment_mime: null,
  attachment_path: null,
  ...over,
});

describe("Megkeresések list", () => {
  it("selects only existing contact_messages columns and no internal hashes", () => {
    const cols = CONTACT_MESSAGE_COLUMNS.split(",");
    expect(cols).toEqual([
      "id","name","email","phone","message","created_at","source","page_url",
      "attachment_name","attachment_size","attachment_mime","attachment_path",
      "is_consumer_complaint","legal_hold_until",
    ]);
    expect(CONTACT_MESSAGE_COLUMNS).not.toContain("ip_hash");
    expect(CONTACT_MESSAGE_COLUMNS).not.toContain("content_hash");
  });

  it("excludes active legal holds from routine two-year deletion", () => {
    expect(retentionEligibilityFilter(new Date("2026-08-14T12:00:00.000Z"))).toBe(
      "legal_hold_until.is.null,legal_hold_until.lt.2026-08-14T12:00:00.000Z",
    );
    expect(moduleSrc).toContain("set_contact_message_complaint_status");
    expect(moduleSrc).toContain("Fogyasztói panaszként megjelölés");
    expect(moduleSrc).toContain("Panaszbesorolás jogilag zárolva");
    expect(moduleSrc).not.toContain("Téves panaszjelölés megszüntetése");
    expect(isLegalHoldActive(row({ legal_hold_until: "2027-01-01T00:00:00.000Z" }), new Date("2026-01-01T00:00:00.000Z"))).toBe(true);
    expect(isLegalHoldActive(row({ legal_hold_until: "2025-01-01T00:00:00.000Z" }), new Date("2026-01-01T00:00:00.000Z"))).toBe(false);
  });

  it("uses paginated, bounded queries ordered newest first", () => {
    expect(PAGE_SIZE).toBeGreaterThan(0);
    expect(PAGE_SIZE).toBeLessThanOrEqual(50);
    expect(moduleSrc).toContain('.order("created_at", { ascending: false })');
    expect(moduleSrc).toContain(".range(from, from + PAGE_SIZE - 1)");
  });

  it("renders the message as React text, never as raw HTML", () => {
    expect(moduleSrc).not.toContain("dangerouslySetInnerHTML");
    expect(moduleSrc).toContain("{selected.message}");
  });

  it("formats the submission time in Hungarian", () => {
    expect(formatHungarianDate("2026-08-06T12:00:00.000Z")).toMatch(/2026\. 08\. 06\./);
  });

  it("shows a download button only when a file is actually stored", () => {
    expect(hasAttachment(row())).toBe(false);
    expect(hasAttachment(row({ attachment_path: "uuid/a.pdf", attachment_name: "a.pdf" }))).toBe(true);
    expect(moduleSrc).toContain("hasAttachment(selected) ?");
    expect(moduleSrc).toContain("Csatolmány letöltése");
    expect(formatFileSize(204800)).toBe("200 KB");
    expect(formatFileSize(null)).toBe("");
  });
});

describe("attachment access hardening", () => {
  it("creates only short-lived signed URLs (max 5 minutes)", () => {
    expect(SIGNED_URL_TTL_SECONDS).toBe(300);
    expect(SIGNED_URL_TTL_SECONDS).toBeLessThanOrEqual(300);
    expect(moduleSrc).toContain(".createSignedUrl(path, SIGNED_URL_TTL_SECONDS");
    expect(moduleSrc).toContain("download: safeAttachmentDownloadName(downloadName)");
    expect(moduleSrc).not.toContain("getPublicUrl");
  });

  it("sanitizes legacy download names before adding them to a signed URL", () => {
    expect(safeAttachmentDownloadName("alaprajz.pdf")).toBe("alaprajz.pdf");
    expect(safeAttachmentDownloadName("../ár\r\nInjected.pdf")).toBe("_ár_Injected.pdf");
    expect(safeAttachmentDownloadName("\u0000\u0001")).toBe("_");
    expect(safeAttachmentDownloadName(null)).toBe(true);
  });

  it("derives the storage path from the record only, never from URL params or user input", () => {
    expect(moduleSrc).toContain("if (!message.attachment_path) return;");
    expect(moduleSrc).toContain("createAttachmentSignedUrl(message.attachment_path, message.attachment_name)");
    // the only URL parameter read is the record UUID used for the deep link
    const params = [...moduleSrc.matchAll(/\.get\("([^"]+)"\)/g)].map((m) => m[1]);
    expect(params).toEqual(["megkereses"]);
    expect(moduleSrc).not.toMatch(/createSignedUrl\((?!path,)/);
  });

  it("never renders the private storage path in markup", () => {
    expect(moduleSrc).not.toContain("{selected.attachment_path}");
    expect(moduleSrc).not.toContain("console.log");
  });

  it("shows a polite Hungarian error for missing or deleted files", () => {
    expect(moduleSrc).toContain("A csatolmány nem elérhető");
  });

  it("deletes database rows before files and cleans up only confirmed deletions", () => {
    const singleStart = moduleSrc.indexOf("const deleteSelectedMessage");
    const batchStart = moduleSrc.indexOf("const deleteExpiredMessages");
    const complaintStart = moduleSrc.indexOf("const markConsumerComplaint");
    const singleDelete = moduleSrc.slice(singleStart, batchStart);
    const batchDelete = moduleSrc.slice(batchStart, complaintStart);

    expect(singleDelete.indexOf('.from("contact_messages")')).toBeLessThan(
      singleDelete.indexOf("removeAttachments"),
    );
    expect(singleDelete).toContain('.select("id,attachment_path")');
    expect(batchDelete.indexOf('.from("contact_messages")')).toBeLessThan(
      batchDelete.lastIndexOf("removeAttachments"),
    );
    expect(batchDelete).toContain("const deleted = (deletedRows ?? [])");
    expect(batchDelete).toContain("Remove files only for rows confirmed as deleted");
  });

  it("keeps the attachments bucket private in the frontend code", () => {
    expect(moduleSrc).toContain('ATTACHMENT_BUCKET = "contact-attachments"');
    expect(moduleSrc).not.toContain("public: true");
  });

  it("never ships a service-role key to the frontend", () => {
    for (const f of ["../components/admin/ContactMessages.tsx", "../pages/Admin.tsx", "../integrations/supabase/client.ts"]) {
      expect(src(f)).not.toMatch(/SERVICE_ROLE/i);
    }
  });
});

describe("admin deep link in the internal notice", () => {
  it("only builds links from a valid UUID on the allow-listed production domain", () => {
    expect(buildAdminMessageLink("11111111-1111-4111-8111-111111111111"))
      .toBe(`${ADMIN_BASE_URL}/admin?megkereses=11111111-1111-4111-8111-111111111111`);
    expect(ADMIN_BASE_URL).toBe("https://northwind.hu");
    expect(buildAdminMessageLink("../../etc/passwd")).toBeNull();
    expect(buildAdminMessageLink("https://evil.example")).toBeNull();
    expect(buildAdminMessageLink(null)).toBeNull();
  });

  it("keeps the sanitized file name and size, and adds no signed URL", () => {
    const mail = buildAdminEmail(
      {
        name: "Teszt Elek",
        email: "teszt@example.com",
        message: "Szia",
        attachment: { path: "uuid/alaprajz.pdf", name: "alaprajz.pdf", size: 204800, mime: "application/pdf" },
        messageId: "11111111-1111-4111-8111-111111111111",
      },
      "northwind@northwind.hu",
    );
    expect(mail.html).toContain("alaprajz.pdf");
    expect(mail.html).toContain("200 KB");
    expect(mail.html).toContain("Megkeresés megnyitása az adminfelületen");
    expect(mail.html).not.toContain("uuid/alaprajz.pdf");
    expect(mail.text).not.toContain("uuid/alaprajz.pdf");
    expect(mail.html).not.toContain("token=");
    expect(mail.text).not.toContain("token=");
  });

  it("omits the link when there is no record id", () => {
    const mail = buildAdminEmail({ name: "A", email: "a@b.hu", message: "x" }, "northwind@northwind.hu");
    expect(mail.html).not.toContain("megkereses=");
  });
});
