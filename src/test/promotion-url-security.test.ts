import { describe, expect, it } from "vitest";
import { safePromotionUrl } from "../lib/promotion-url";

describe("promotion URL allow-list", () => {
  it("keeps useful, non-executable destinations", () => {
    expect(safePromotionUrl("/fujitsu#garancia")).toBe("/fujitsu#garancia");
    expect(safePromotionUrl("#kapcsolat")).toBe("#kapcsolat");
    expect(safePromotionUrl("https://www.fisherklima.hu/ajanlat")).toBe("https://www.fisherklima.hu/ajanlat");
    expect(safePromotionUrl("tel:+36704099760")).toBe("tel:+36704099760");
    expect(safePromotionUrl("mailto:northwind@northwind.hu")).toBe("mailto:northwind@northwind.hu");
  });

  it("rejects executable, protocol-relative and credentialed URLs", () => {
    for (const unsafe of [
      "javascript:alert(1)",
      "data:text/html,x",
      "//evil.example/path",
      "/\\evil.example",
      "/%2f%2fevil.example",
      "/%252f%252fevil.example",
      "/%5cevil.example",
      "http://evil.example",
      "https://user:pass@evil.example",
      "mailto:northwind@northwind.hu?bcc=evil@example.com",
      "#1-invalid",
    ]) {
      expect(safePromotionUrl(unsafe)).toBeNull();
    }
  });
});
