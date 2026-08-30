/**
 * Pure builders for the contact e-mail payloads sent through Resend.
 * Kept free of Deno/network APIs so they can be unit tested from vitest.
 */

export const FROM_ADDRESS = "Northwind Klíma <northwind@northwind.hu>";
export const NORTHWIND_EMAIL = "northwind@northwind.hu";

/**
 * Fixed, allow-listed production base URL for the admin deep link.
 * Never derived from request Origin or any user input.
 */
export const ADMIN_BASE_URL = "https://northwind.hu";

const CONTACT_SOURCES = new Set([
  "Főoldal – Northwind Hűtéstechnika Kft.",
  "Fisher oldal – Northwind Hűtéstechnika Kft.",
  "Fujitsu oldal – Northwind Hűtéstechnika Kft.",
]);

/** Accepts only the three source labels emitted by the production forms. */
export const safeContactSource = (value?: string | null): string | null => {
  const candidate = (value ?? "").trim();
  return CONTACT_SOURCES.has(candidate) ? candidate : null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Builds the admin deep link. Only a validated UUID is ever appended. */
export const buildAdminMessageLink = (id?: string | null): string | null => {
  const candidate = (id ?? "").trim();
  if (!UUID_RE.test(candidate)) return null;
  return `${ADMIN_BASE_URL}/admin?megkereses=${candidate}`;
};

export interface AttachmentInfo {
  path: string;
  name: string;
  size: number;
  mime: string;
}

export interface ContactEmailInput {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  source?: string | null;
  page_url?: string | null;
  attachment?: AttachmentInfo | null;
  /** contact_messages record UUID — used only for the admin deep link. */
  messageId?: string | null;
}

export interface ResendPayload {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
  text: string;
}

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Strips CR/LF so user data can never inject e-mail headers. */
const headerSafe = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const EMAIL_RE = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

/** Detects ASCII control characters, optionally permitting selected code points. */
export const hasAsciiControlCharacter = (
  value: string,
  allowedCodePoints: readonly number[] = [],
): boolean => Array.from(value).some((character) => {
  const codePoint = character.codePointAt(0);
  return codePoint !== undefined
    && (codePoint <= 0x1f || codePoint === 0x7f)
    && !allowedCodePoints.includes(codePoint);
});

export const isValidEmail = (email: string): boolean => {
  const candidate = headerSafe(email);
  const at = candidate.indexOf("@");
  const local = at >= 0 ? candidate.slice(0, at) : "";
  return candidate.length <= 255
    && local.length >= 1
    && local.length <= 64
    && !local.startsWith(".")
    && !local.endsWith(".")
    && !local.includes("..")
    && EMAIL_RE.test(candidate);
};

/** Accepts common phone formatting while rejecting control characters/text. */
export const isValidPhone = (phone: string): boolean => {
  const candidate = phone.trim();
  if (!candidate) return true;
  if (candidate.length > 50 || hasAsciiControlCharacter(candidate)) return false;
  if (!/^\+?[0-9][0-9 ()/.-]*$/.test(candidate)) return false;
  const digitCount = (candidate.match(/[0-9]/g) ?? []).length;
  return digitCount >= 6 && digitCount <= 20;
};

const ALLOWED_PAGE_HOSTNAMES = new Set([
  "northwind.hu",
  "www.northwind.hu",
  "cool-comfort-heroes.lovable.app",
]);
const CONTACT_FORM_PATHS = new Set(["/", "/fisher", "/fujitsu"]);

/**
 * Allows only HTTPS page URLs belonging to a known Northwind frontend.
 * This prevents user-controlled schemes such as javascript: from becoming
 * clickable links in the internal notification e-mail.
 */
export const safePageUrl = (value?: string | null): string | null => {
  const candidate = (value ?? "").trim();
  if (!candidate || candidate.length > 500) return null;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || !ALLOWED_PAGE_HOSTNAMES.has(url.hostname.toLowerCase())) {
      return null;
    }
    if (url.username || url.password || url.port) return null;
    const normalizedPath = url.pathname === "/"
      ? "/"
      : url.pathname.replace(/\/+$/, "");
    if (!CONTACT_FORM_PATHS.has(normalizedPath)) return null;
    url.pathname = normalizedPath;
    // Query parameters and fragments are unnecessary for identifying the
    // contact-form page and may contain campaign IDs or other incidental data.
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
};

/** Only a server-validated, header-safe address may be used in Reply-To. */
export const safeReplyTo = (email: string, fallback = NORTHWIND_EMAIL): string => {
  const candidate = headerSafe(email);
  return isValidEmail(candidate) ? candidate : fallback;
};

const kb = (size: number) => `${Math.max(1, Math.round(size / 1024))} KB`;

export const buildAdminEmail = (
  input: ContactEmailInput,
  recipient: string,
): ResendPayload => {
  const hasFile = !!input.attachment;
  const phone = (input.phone ?? "").trim();
  const source = (input.source ?? "").trim() || "Weboldal";
  const pageUrl = safePageUrl(input.page_url);
  const adminLink = buildAdminMessageLink(input.messageId);

  const attachmentBlockHtml = hasFile
    ? `<p><strong>Csatolmány:</strong> ${escapeHtml(input.attachment!.name)} (${kb(input.attachment!.size)})</p>`
    : "";

  const html = `
    <h2>Új üzenet érkezett a weboldalról</h2>
    <p><strong>Forrás:</strong> ${escapeHtml(source)}${pageUrl ? ` (<a href="${escapeHtml(pageUrl)}">${escapeHtml(pageUrl)}</a>)` : ""}</p>
    <p><strong>Név:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Telefon:</strong> ${phone ? escapeHtml(phone) : "Nem adott meg"}</p>
    ${attachmentBlockHtml}
    <hr />
    <p><strong>Üzenet:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>
    ${adminLink ? `<hr /><p><a href="${adminLink}">Megkeresés megnyitása az adminfelületen</a></p>` : ""}
  `;

  const text = [
    "Új üzenet érkezett a weboldalról",
    `Forrás: ${source}${pageUrl ? ` (${pageUrl})` : ""}`,
    `Név: ${input.name}`,
    `Email: ${input.email}`,
    `Telefon: ${phone || "Nem adott meg"}`,
    ...(hasFile
      ? [
          `Csatolmány: ${input.attachment!.name} (${kb(input.attachment!.size)})`,
        ]
      : []),
    "",
    "Üzenet:",
    input.message,
    ...(adminLink ? ["", `Megkeresés megnyitása az adminfelületen: ${adminLink}`] : []),
  ].join("\n");

  return {
    from: FROM_ADDRESS,
    to: [recipient],
    reply_to: safeReplyTo(input.email),
    subject: `Új ajánlatkérés: ${headerSafe(input.name).slice(0, 120)}`,
    html,
    text,
  };
};

export const buildUserEmail = (input: ContactEmailInput): ResendPayload => {
  const intro = "Köszönjük megkeresését! Üzenetét sikeresen megkaptuk, és hamarosan felvesszük Önnel a kapcsolatot.";
  const year = new Date().getFullYear();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a7ab5, #2a8fc2); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Northwind Klíma</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Szakmai tapasztalat 1993 óta</p>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
        <h2 style="color: #1a7ab5; margin-top: 0;">Tisztelt Ügyfelünk!</h2>
        <p style="color: #374151; line-height: 1.6;">${intro}</p>
        <p style="color: #374151; line-height: 1.6;">Üdvözlettel:<br/><strong>Northwind Hűtéstechnika Kft.</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
          <strong>Elérhetőségeink:</strong><br>
          +36 70 409 9760<br>
          northwind@northwind.hu<br>
          1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó
        </p>
      </div>
      <div style="text-align: center; padding: 15px; color: #9ca3af; font-size: 12px;">
        © ${year} Northwind Hűtéstechnika. Minden jog fenntartva.
      </div>
    </div>
  `;

  const text = [
    "Tisztelt Ügyfelünk!",
    "",
    intro,
    "",
    "Üdvözlettel: Northwind Hűtéstechnika Kft.",
    "+36 70 409 9760 | northwind@northwind.hu",
    "1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó",
  ].join("\n");

  return {
    from: FROM_ADDRESS,
    to: [safeReplyTo(input.email, "")].filter(Boolean) as string[],
    reply_to: NORTHWIND_EMAIL,
    subject: "Megkeresését megkaptuk – Northwind Hűtéstechnika Kft.",
    html,
    text,
  };
};
