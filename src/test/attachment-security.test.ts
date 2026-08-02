import { describe, it, expect } from "vitest";
import {
  detectFileType,
  normalizeMime,
  sanitizeFileName,
  signatureMatchesDeclared,
  extensionFor,
} from "../../supabase/functions/_shared/file-signature";

const bytes = (...b: number[]) => new Uint8Array(b);
const pdf = bytes(0x25, 0x50, 0x44, 0x46, 0x2d, 0x31);
const jpeg = bytes(0xff, 0xd8, 0xff, 0xe0, 0x00);
const png = bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
const exe = bytes(0x4d, 0x5a, 0x90, 0x00);

describe("attachment signature detection", () => {
  it("detects the allowed types", () => {
    expect(detectFileType(pdf)).toBe("application/pdf");
    expect(detectFileType(jpeg)).toBe("image/jpeg");
    expect(detectFileType(png)).toBe("image/png");
  });

  it("rejects unknown/executable content and empty input", () => {
    expect(detectFileType(exe)).toBeNull();
    expect(detectFileType(bytes())).toBeNull();
  });

  it("rejects spoofed MIME types", () => {
    // executable renamed/declared as PDF
    expect(signatureMatchesDeclared(exe, "application/pdf")).toBe(false);
    // PNG bytes declared as PDF
    expect(signatureMatchesDeclared(png, "application/pdf")).toBe(false);
  });

  it("accepts matching declarations, incl. image/jpg alias", () => {
    expect(signatureMatchesDeclared(jpeg, "image/jpg")).toBe(true);
    expect(signatureMatchesDeclared(jpeg, "IMAGE/JPEG")).toBe(true);
    expect(signatureMatchesDeclared(pdf, "application/pdf")).toBe(true);
    expect(normalizeMime(" Image/JPG ")).toBe("image/jpeg");
  });
});

describe("file name sanitization", () => {
  it("strips path traversal and unsafe characters", () => {
    expect(sanitizeFileName("../../etc/passwd")).toBe("passwd");
    expect(sanitizeFileName("a b;rm -rf.pdf")).toBe("a_b_rm_-rf.pdf");
    expect(sanitizeFileName("..\\..\\win.png")).toBe("win.png");
  });

  it("never returns an empty or dot-only name", () => {
    expect(sanitizeFileName("")).toBe("csatolmany");
    expect(sanitizeFileName("...")).toBe("csatolmany");
  });

  it("maps detected types to canonical extensions", () => {
    expect(extensionFor("application/pdf")).toBe("pdf");
    expect(extensionFor("image/jpeg")).toBe("jpg");
    expect(extensionFor("image/png")).toBe("png");
  });
});
