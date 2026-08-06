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
export const ADMIN_BASE_URL = "https://cool-comfort-heroes.lovable.app";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Only a server-validated, header-safe address may be used in Reply-To. */
export const safeReplyTo = (email: string, fallback = NORTHWIND_EMAIL): string => {
  const candidate = headerSafe(email);
  return EMAIL_RE.test(candidate) ? candidate : fallback;
};

const kb = (size: number) => `${Math.max(1, Math.round(size / 1024))} KB`;

export const buildAdminEmail = (
  input: ContactEmailInput,
  recipient: string,
): ResendPayload => {
  const hasFile = !!input.attachment;
  const phone = (input.phone ?? "").trim();
  const source = (input.source ?? "").trim() || "Weboldal";
  const pageUrl = (input.page_url ?? "").trim();
  const adminLink = buildAdminMessageLink(input.messageId);

  const attachmentBlockHtml = hasFile
    ? `<p><strong>Csatolmány:</strong> ${escapeHtml(input.attachment!.name)} (${kb(input.attachment!.size)})<br />
       <span style="color:#6b7280;font-size:13px;">Elérési út a privát tárolóban: ${escapeHtml(input.attachment!.path)}</span></p>`
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
          `Elérési út a privát tárolóban: ${input.attachment!.path}`,
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
  const hasFile = !!input.attachment;
  const intro = "Köszönjük megkeresését! Üzenetét sikeresen megkaptuk, és hamarosan felvesszük Önnel a kapcsolatot.";
  const attachmentSentence = hasFile ? "A beküldött csatolmányt is megkaptuk." : "";
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br>");
  const year = new Date().getFullYear();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a7ab5, #2a8fc2); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Northwind Klíma</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Professzionális klíma megoldások 1993 óta</p>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
        <h2 style="color: #1a7ab5; margin-top: 0;">Tisztelt Ügyfelünk!</h2>
        <p style="color: #374151; line-height: 1.6;">${intro}</p>
        ${attachmentSentence ? `<p style="color: #374151; line-height: 1.6;">${attachmentSentence}</p>` : ""}
        <p style="color: #374151; line-height: 1.6;">Üdvözlettel:<br/><strong>Northwind Hűtéstechnika Kft.</strong></p>
        <div style="background: #f0f7fc; border-left: 4px solid #1a7ab5; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 5px; color: #6b7280; font-size: 14px;"><strong>Az Ön üzenete:</strong></p>
          <p style="margin: 0; color: #374151;">${safeMessage}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
          <strong>Elérhetőségeink:</strong><br>
          +36 70 409 9760<br>
          northwind@northwind.hu<br>
          1118 Budapest, Torbágy u. 16.
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
    ...(attachmentSentence ? [attachmentSentence] : []),
    "",
    "Az Ön üzenete:",
    input.message,
    "",
    "Üdvözlettel: Northwind Hűtéstechnika Kft.",
    "+36 70 409 9760 | northwind@northwind.hu",
    "1118 Budapest, Torbágy u. 16.",
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
