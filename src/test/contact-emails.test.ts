import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import {
  buildAdminEmail,
  buildUserEmail,
  FROM_ADDRESS,
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
    expect(buildAdminEmail(base, "csikimara@gmail.com").from).toBe(FROM_ADDRESS);
    expect(buildUserEmail(base).from).toBe(FROM_ADDRESS);
  });

  it("sets Reply-To to the validated customer address on the internal notice", () => {
    expect(buildAdminEmail(base, "csikimara@gmail.com").reply_to).toBe("teszt@example.com");
    expect(buildAdminEmail(base, "csikimara@gmail.com").to).toEqual(["csikimara@gmail.com"]);
  });

  it("sets Reply-To to northwind@northwind.hu on the customer confirmation", () => {
    expect(buildUserEmail(base).reply_to).toBe("northwind@northwind.hu");
  });

  it("never lets header injection or invalid data into Reply-To", () => {
    expect(safeReplyTo("a@b.hu\r\nBcc: evil@x.hu")).toBe("northwind@northwind.hu");
    expect(safeReplyTo("not-an-email")).toBe("northwind@northwind.hu");
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
    const admin = buildAdminEmail(base, "csikimara@gmail.com");
    for (const body of [user.html, user.text, admin.html, admin.text]) {
      expect(body.toLowerCase()).not.toContain("csatol");
    }
    expect(user.html).toContain("Köszönjük megkeresését!");
    expect(user.text).toContain("Köszönjük megkeresését!");
  });

  it("acknowledges the attachment in the customer confirmation without a storage link", () => {
    const user = buildUserEmail(withFile);
    expect(user.html).toContain("A beküldött csatolmányt is megkaptuk.");
    expect(user.text).toContain("A beküldött csatolmányt is megkaptuk.");
    expect(user.html).not.toContain("uuid/alaprajz.pdf");
    expect(user.text).not.toContain("uuid/alaprajz.pdf");
  });

  it("includes the sanitized file name and private path in the internal notice", () => {
    const admin = buildAdminEmail(withFile, "csikimara@gmail.com");
    expect(admin.html).toContain("alaprajz.pdf");
    expect(admin.html).toContain("uuid/alaprajz.pdf");
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
    const admin = buildAdminEmail(evil, "csikimara@gmail.com");
    expect(admin.html).not.toContain("<script>");
    expect(admin.html).toContain("&lt;script&gt;");
    expect(buildUserEmail(evil).html).toContain("5 &lt; 6 &amp; &#39;ok&#39;");
    expect(admin.subject).not.toMatch(/[\r\n]/);
  });
});
