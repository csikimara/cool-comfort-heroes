/**
 * Promotion links are admin-authored but still untrusted database content.
 * Keep useful internal, HTTPS, phone and e-mail destinations while rejecting
 * executable schemes, protocol-relative URLs and control characters.
 */
export const safePromotionUrl = (value?: string | null): string | null => {
  const candidate = (value ?? "").trim();
  const hasControlCharacter = Array.from(candidate).some((character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127;
  });
  if (!candidate || candidate.length > 500 || hasControlCharacter) {
    return null;
  }
  if (/^#[A-Za-z][A-Za-z0-9_-]*$/.test(candidate)) return candidate;
  if (
    candidate.startsWith("/")
    && !candidate.startsWith("//")
    && !candidate.includes("\\")
    && !/%(?:25)*(?:2f|5c)/i.test(candidate)
  ) {
    return candidate;
  }
  if (/^https:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);
      return url.protocol === "https:" && !url.username && !url.password ? url.toString() : null;
    } catch {
      return null;
    }
  }
  if (/^tel:\+?[0-9 ()-]{6,30}$/i.test(candidate)) return candidate;
  if (/^mailto:[^\s@,;:?&#]+@[^\s@,;:?&#]+\.[^\s@,;:?&#]+$/i.test(candidate)) {
    return candidate;
  }
  return null;
};
