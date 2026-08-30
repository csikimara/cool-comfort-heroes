import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import {
  buildAdminEmail,
  buildUserEmail,
  FROM_ADDRESS,
  isValidEmail,
  isValidPhone,
  safeContactSource,
  safePageUrl,
  safeReplyTo,
} from "../../supabase/functions/_shared/contact-emails";

const base = {
  name: "Teszt Elek",
  email: "teszt@example.com",
  phone: "+36301234567",
  message: "Kérek egy ajánlatot",
  source: "Kapcsolat",
  page_url: "https://northwind.hu/",
  attachment: null,
};

const withFile = {
  ...base,
  attachment: {
    path: "uuid/alaprajz.pdf",
    name: "alaprajz.pdf",
    size: 204800,
    mime: "application/pdf",
  },
};

describe("contact e-mail sender identity", () => {
  it("uses the production sender for both e-mails", () => {
    expect(FROM_ADDRESS).toBe("Northwind Klíma <northwind@northwind.hu>");
    expect(buildAdminEmail(base, "northwind@northwind.hu").from).toBe(FROM_ADDRESS);
    expect(buildUserEmail(base).from).toBe(FROM_ADDRESS);
  });

  it("sets Reply-To to the validated customer address on the internal notice", () => {
    expect(buildAdminEmail(base, "northwind@northwind.hu").reply_to).toBe("teszt@example.com");
    expect(buildAdminEmail(base, "northwind@northwind.hu").to).toEqual(["northwind@northwind.hu"]);
  });

  it("sets Reply-To to northwind@northwind.hu on the customer confirmation", () => {
    const user = buildUserEmail(base);
    expect(user.reply_to).toBe("northwind@northwind.hu");
    expect(user.html).not.toContain(base.message);
    expect(user.text).not.toContain(base.message);
  });

  it("never lets header injection or invalid data into Reply-To", () => {
    expect(safeReplyTo("a@b.hu\r\nBcc: evil@x.hu")).toBe("northwind@northwind.hu");
    expect(safeReplyTo("not-an-email")).toBe("northwind@northwind.hu");
    expect(isValidEmail("teszt+ajanlat@example.hu")).toBe(true);
    expect(isValidEmail("a@b.hu,evil@example.com")).toBe(false);
    expect(isValidEmail("a@b.hu:Bcc@example.com")).toBe(false);
    expect(isValidEmail(".a@example.com")).toBe(false);
    expect(isValidEmail("a..b@example.com")).toBe(false);
  });

  it("accepts ordinary phone formatting but rejects text and controls", () => {
    expect(isValidPhone("+36 (30) 123-4567")).toBe(true);
    expect(isValidPhone("06 30 123 4567")).toBe(true);
    expect(isValidPhone("")).toBe(true);
    expect(isValidPhone("hívjon vissza")).toBe(false);
    expect(isValidPhone("+36 30 123 4567\r\nBcc: x@example.com")).toBe(false);
    expect(isValidPhone("123")).toBe(false);
  });

  it("only turns allow-listed HTTPS page URLs into links", () => {
    expect(safePageUrl("https://northwind.hu/fisher?x=1#ajanlat")).toBe("https://northwind.hu/fisher");
    expect(safePageUrl("javascript:alert(1)")).toBeNull();
    expect(safePageUrl("https://northwind.hu.evil.example/")).toBeNull();
    expect(safePageUrl("http://northwind.hu/")).toBeNull();
    expect(safePageUrl("https://northwind.hu:8443/")).toBeNull();
    expect(safePageUrl("https://northwind.hu/ugyfel/teszt@example.com")).toBeNull();

    const malicious = buildAdminEmail(
      { ...base, page_url: "javascript:alert(1)" },
      "northwind@northwind.hu",
    );
    expect(malicious.html).not.toContain("javascript:");
  });

  it("accepts only a source label emitted by a real contact form", () => {
    expect(safeContactSource("Fisher oldal – Northwind Hűtéstechnika Kft.")).toBe(
      "Fisher oldal – Northwind Hűtéstechnika Kft.",
    );
    expect(safeContactSource("Sürgős rendszerüzenet")).toBeNull();
  });

  it("has no onboarding@resend.dev anywhere in production code", () => {
    const files = [
      "supabase/functions/_shared/contact-emails.ts",
      "supabase/functions/send-contact-email/index.ts",
    ];
    for (const f of files) {
      expect(readFileSync(f, "utf8")).not.toContain("onboarding@resend.dev");
    }
  });
});

describe("attachment wording", () => {
  it("does not mention attachments when no file was sent", () => {
    const user = buildUserEmail(base);
    const admin = buildAdminEmail(base, "northwind@northwind.hu");
    for (const body of [user.html, user.text, admin.html, admin.text]) {
      expect(body.toLowerCase()).not.toContain("csatol");
    }
    expect(user.html).toContain("Köszönjük megkeresését!");
    expect(user.text).toContain("Köszönjük megkeresését!");
  });

  it("acknowledges the attachment in the customer confirmation without a storage link", () => {
    const user = buildUserEmail(withFile);
    expect(user.html).not.toContain("A beküldött csatolmányt is megkaptuk.");
    expect(user.text).not.toContain("A beküldött csatolmányt is megkaptuk.");
    expect(user.html).not.toContain("uuid/alaprajz.pdf");
    expect(user.text).not.toContain("uuid/alaprajz.pdf");
  });

  it("includes the sanitized file name but never exposes the private path", () => {
    const admin = buildAdminEmail(withFile, "northwind@northwind.hu");
    expect(admin.html).toContain("alaprajz.pdf");
    expect(admin.html).not.toContain("uuid/alaprajz.pdf");
    expect(admin.text).not.toContain("uuid/alaprajz.pdf");
    expect(admin.text).toContain("alaprajz.pdf (200 KB)");
  });
});

describe("HTML escaping", () => {
  it("escapes user supplied data", () => {
    const evil = {
      ...base,
      name: '<script>alert("x")</script>',
      message: "5 < 6 & 'ok'",
    };
    const admin = buildAdminEmail(evil, "northwind@northwind.hu");
    expect(admin.html).not.toContain("<script>");
    expect(admin.html).toContain("&lt;script&gt;");
    expect(buildUserEmail(evil).html).not.toContain(evil.message);
    expect(admin.subject).not.toMatch(/[\r\n]/);
  });
});
