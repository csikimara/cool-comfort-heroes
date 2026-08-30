import { describe, expect, it } from "vitest";
import {
  exceedsRequestLimit,
  getClientIp,
  MAX_REQUEST_BYTES,
  readRequestBodyWithLimit,
} from "../../supabase/functions/_shared/request-security";

const headers = (values: Record<string, string>) => ({
  get(name: string) {
    return values[name.toLowerCase()] ?? null;
  },
});

describe("contact request boundary guards", () => {
  it("prefers platform client-IP headers over a forwarded chain", () => {
    expect(getClientIp(headers({
      "cf-connecting-ip": "203.0.113.10",
      "x-real-ip": "203.0.113.11",
      "x-forwarded-for": "198.51.100.1, 198.51.100.2",
    }))).toBe("203.0.113.10");
    expect(getClientIp(headers({
      "x-forwarded-for": "198.51.100.1, 198.51.100.2",
    }))).toBe("198.51.100.1");
  });

  it("rejects oversized and malformed Content-Length values", () => {
    expect(exceedsRequestLimit(String(MAX_REQUEST_BYTES))).toBe(false);
    expect(exceedsRequestLimit(String(MAX_REQUEST_BYTES + 1))).toBe(true);
    expect(exceedsRequestLimit("12MB")).toBe(true);
    expect(exceedsRequestLimit(null)).toBe(false);
  });

  it("ignores malformed client-IP header values", () => {
    expect(getClientIp(headers({
      "cf-connecting-ip": "spoofed-client",
      "x-forwarded-for": "2001:db8::1, 198.51.100.2",
    }))).toBe("2001:db8::1");
    expect(getClientIp(headers({ "x-forwarded-for": "not an ip" }))).toBe("unknown");
    expect(getClientIp(headers({ "x-forwarded-for": "999.1.2.3" }))).toBe("unknown");
    expect(getClientIp(headers({ "x-forwarded-for": "deadbeef" }))).toBe("unknown");
    expect(getClientIp(headers({ "x-forwarded-for": "1::2::3" }))).toBe("unknown");
  });

  it("enforces the byte limit even without Content-Length", async () => {
    const accepted = await readRequestBodyWithLimit(
      new Request("https://example.test", {
        method: "POST",
        body: new Uint8Array([1, 2, 3, 4]),
      }),
      4,
    );
    expect(Array.from(accepted ?? [])).toEqual([1, 2, 3, 4]);

    const rejected = await readRequestBodyWithLimit(
      new Request("https://example.test", {
        method: "POST",
        body: new Uint8Array([1, 2, 3, 4, 5]),
      }),
      4,
    );
    expect(rejected).toBeNull();
  });
});
