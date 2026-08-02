/**
 * Magic-number (file signature) detection for the attachment types accepted by
 * the contact form. Used to avoid trusting the client-provided MIME type.
 */

export type DetectedFileType = "application/pdf" | "image/jpeg" | "image/png" | null;

const startsWith = (bytes: Uint8Array, sig: number[]): boolean => {
  if (bytes.length < sig.length) return false;
  for (let i = 0; i < sig.length; i++) {
    if (bytes[i] !== sig[i]) return false;
  }
  return true;
};

const PDF = [0x25, 0x50, 0x44, 0x46]; // %PDF
const JPEG = [0xff, 0xd8, 0xff];
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/** Returns the canonical MIME type detected from the file header, or null. */
export function detectFileType(bytes: Uint8Array): DetectedFileType {
  if (startsWith(bytes, PDF)) return "application/pdf";
  if (startsWith(bytes, JPEG)) return "image/jpeg";
  if (startsWith(bytes, PNG)) return "image/png";
  return null;
}

/** Normalizes the client MIME type to the canonical form used for comparison. */
export function normalizeMime(mime: string): string {
  const m = mime.trim().toLowerCase();
  if (m === "image/jpg" || m === "image/pjpeg") return "image/jpeg";
  return m;
}

/** True when the real file header matches the declared MIME type. */
export function signatureMatchesDeclared(bytes: Uint8Array, declaredMime: string): boolean {
  const detected = detectFileType(bytes);
  if (!detected) return false;
  return detected === normalizeMime(declaredMime);
}

/** Removes path traversal and unsafe characters from an uploaded file name. */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/^\.+/, "").slice(-120);
  return cleaned.length > 0 ? cleaned : "csatolmany";
}

/** Canonical extension for a detected type, used for the stored object path. */
export function extensionFor(mime: DetectedFileType): string {
  switch (mime) {
    case "application/pdf":
      return "pdf";
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    default:
      return "bin";
  }
}
