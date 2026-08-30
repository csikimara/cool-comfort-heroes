import { createClient } from "@supabase/supabase-js";
import {
  isLocalhostAllowed,
  isLovablePreviewAllowed,
  resolveCors,
} from "../_shared/cors.ts";
import {
  buildAdminEmail,
  buildUserEmail,
  hasAsciiControlCharacter,
  isValidEmail,
  isValidPhone,
  NORTHWIND_EMAIL,
  safeContactSource,
  safePageUrl,
} from "../_shared/contact-emails.ts";
import {
  exceedsRequestLimit,
  getClientIp,
  readRequestBodyWithLimit,
} from "../_shared/request-security.ts";
import {
  detectFileType,
  extensionFor,
  normalizeMime,
  sanitizeFileName,
  signatureMatchesDeclared,
} from "../_shared/file-signature.ts";

interface ContactFormData {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  source?: unknown;
  page_url?: unknown;
  turnstileToken?: unknown;
}

const ALLOWED_MIMES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]);
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10 MB

// --- Anti-abuse configuration ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const GENERIC_ERROR = "Az üzenet küldése sikertelen. Kérjük, próbálja újra később.";
const GENERIC_VALIDATION = "Kérjük, ellenőrizze a megadott adatokat.";
const GENERIC_RATE_LIMIT = "Túl sok beküldés érkezett rövid időn belül. Kérjük, próbálja újra később.";
const GENERIC_DUPLICATE = "Ezt az üzenetet már elküldte. Kérjük, várjon a válaszunkra.";
const GENERIC_ATTACHMENT = "A csatolt fájl nem felel meg a követelményeknek (max. 10 MB, PDF/JPG/PNG).";
const GENERIC_TURNSTILE = "Nem sikerült ellenőrizni, hogy Ön nem robot. Kérjük, próbálja újra.";
const GENERIC_ORIGIN = "A kérés forrása nem engedélyezett.";
const GENERIC_METHOD = "A kért művelet nem engedélyezett.";
const GENERIC_CONTENT_TYPE = "A kérés formátuma nem támogatott.";
const GENERIC_REQUEST_SIZE = "A beküldött adatmennyiség túl nagy.";

// Csak ezekről a hostokról fogadunk el Turnstile tokent.
const ALLOWED_TURNSTILE_HOSTNAMES = new Set([
  "northwind.hu",
  "www.northwind.hu",
]);
const EXPECTED_TURNSTILE_ACTION = "contact_form";
const OUTBOUND_FETCH_TIMEOUT_MS = 10_000;

const bytesToHex = (bytes: Uint8Array) =>
  Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToHex(new Uint8Array(sig));
}

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }
  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (remoteIp && remoteIp !== "unknown") body.append("remoteip", remoteIp);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        signal: AbortSignal.timeout(OUTBOUND_FETCH_TIMEOUT_MS),
      },
    );
    if (!res.ok) {
      console.error(`Turnstile verify HTTP ${res.status}`);
      return false;
    }
    const data = await res.json() as {
      success?: boolean;
      hostname?: string;
      action?: string;
      "error-codes"?: string[];
    };
    if (!data.success) {
      console.error("Turnstile verify failed:", data["error-codes"]);
      return false;
    }
    const hostname = (data.hostname ?? "").toLowerCase();
    const lovablePreviewAllowed = isLovablePreviewAllowed({
      ALLOW_LOVABLE_PREVIEW: Deno.env.get("ALLOW_LOVABLE_PREVIEW") ?? undefined,
    });
    const hostnameAllowed = ALLOWED_TURNSTILE_HOSTNAMES.has(hostname)
      || (lovablePreviewAllowed && hostname === "cool-comfort-heroes.lovable.app");
    if (data.action !== EXPECTED_TURNSTILE_ACTION) {
      console.error("Turnstile action mismatch");
      return false;
    }
    if (!hostnameAllowed) {
      console.error(`Turnstile hostname not allowed: ${hostname || "(empty)"}`);
      return false;
    }
    return true;
  } catch (_err) {
    console.error("Turnstile verify exception");
    return false;
  }
}

Deno.serve(async (req) => {
  // ---------- Strict CORS / origin check (before ANY processing) ----------
  const cors = resolveCors(
    req.headers.get("origin"),
    isLocalhostAllowed({ ALLOW_LOCALHOST_CORS: Deno.env.get("ALLOW_LOCALHOST_CORS") ?? undefined }),
    isLovablePreviewAllowed({ ALLOW_LOVABLE_PREVIEW: Deno.env.get("ALLOW_LOVABLE_PREVIEW") ?? undefined }),
  );
  const corsHeaders = cors.headers;
  const jsonResponse = (status: number, payload: Record<string, unknown>) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });

  if (!cors.allowed) {
    console.warn("Blocked request from disallowed origin");
    return jsonResponse(403, { error: GENERIC_ORIGIN });
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: GENERIC_METHOD }), {
      status: 405,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        Allow: "POST, OPTIONS",
      },
    });
  }

  if (exceedsRequestLimit(req.headers.get("content-length"))) {
    return jsonResponse(413, { error: GENERIC_REQUEST_SIZE });
  }

  try {
    // ---------- Request parsing: multipart/form-data OR JSON ----------
    const contentType = req.headers.get("content-type") ?? "";
    const mediaType = contentType.split(";", 1)[0]?.trim().toLowerCase();
    const requestBytes = await readRequestBodyWithLimit(req);
    if (requestBytes === null) {
      return jsonResponse(413, { error: GENERIC_REQUEST_SIZE });
    }
    let body: ContactFormData;
    let uploadFile: File | null = null;

    try {
      if (mediaType === "multipart/form-data") {
        const formRequest = new Request(req.url, {
          method: "POST",
          headers: req.headers,
          body: requestBytes,
        });
        const form = await formRequest.formData();
        const str = (k: string) => {
          const v = form.get(k);
          return typeof v === "string" ? v : "";
        };
        body = {
          name: str("name"),
          email: str("email"),
          phone: str("phone"),
          message: str("message"),
          source: str("source"),
          page_url: str("page_url"),
          turnstileToken: str("turnstileToken"),
        };
        const f = form.get("attachment");
        if (f instanceof File && f.size > 0) uploadFile = f;
      } else if (mediaType === "application/json") {
        const parsed = JSON.parse(new TextDecoder().decode(requestBytes));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          return jsonResponse(400, { error: GENERIC_VALIDATION });
        }
        body = parsed as ContactFormData;
      } else {
        return jsonResponse(415, { error: GENERIC_CONTENT_TYPE });
      }
    } catch {
      if (mediaType !== "multipart/form-data" && mediaType !== "application/json") {
        return jsonResponse(415, { error: GENERIC_CONTENT_TYPE });
      }
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }

    const trimmedString = (value: unknown): string =>
      typeof value === "string" ? value.trim() : "";
    const name = trimmedString(body.name);
    const email = trimmedString(body.email);
    const phone = trimmedString(body.phone);
    const message = trimmedString(body.message);
    const source = safeContactSource(trimmedString(body.source));
    const page_url = safePageUrl(trimmedString(body.page_url));
    const turnstileToken = trimmedString(body.turnstileToken);

    if (turnstileToken.length > 2048) {
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }

    // ---------- Server-side input validation ----------
    if (!name || !email || !message) {
      console.warn("Validation failed: missing required fields");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      console.warn("Validation failed: field too long");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    if (!isValidPhone(phone)) {
      console.warn("Validation failed: invalid phone");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    if (
      hasAsciiControlCharacter(name)
      || hasAsciiControlCharacter(message, [0x09, 0x0a, 0x0d])
    ) {
      console.warn("Validation failed: control character");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    if (!isValidEmail(email)) {
      console.warn("Validation failed: invalid email");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    // Cheap pre-checks on the real upload (full validation happens after
    // Turnstile + rate limiting, right before the Storage upload).
    if (uploadFile) {
      if (uploadFile.size > MAX_ATTACHMENT_SIZE) {
        console.warn(`Validation failed: attachment size ${uploadFile.size}`);
        return jsonResponse(400, { error: GENERIC_ATTACHMENT });
      }
      if (!ALLOWED_MIMES.has(normalizeMime(uploadFile.type))) {
        console.warn(`Validation failed: disallowed mime ${uploadFile.type}`);
        return jsonResponse(400, { error: GENERIC_ATTACHMENT });
      }
    }

    // ---------- Turnstile verification (before ANY side effects) ----------
    const clientIp = getClientIp(req.headers);
    if (!turnstileToken) {
      console.warn("Turnstile token missing from request");
      return jsonResponse(400, { error: GENERIC_TURNSTILE });
    }
    const turnstileOk = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileOk) {
      return jsonResponse(400, { error: GENERIC_TURNSTILE });
    }

    // ---------- Build salted IP hash + content hash ----------
    const ipSalt = Deno.env.get("IP_HASH_SALT");
    if (!ipSalt || new TextEncoder().encode(ipSalt).byteLength < 32) {
      console.error("IP_HASH_SALT is missing or too short");
      return jsonResponse(500, { error: GENERIC_ERROR });
    }
    const ipHash = await hmacSha256Hex(ipSalt, `ip:${clientIp}`);
    const contentHash = await hmacSha256Hex(
      ipSalt,
      `content:${email.toLowerCase()}|${message}`,
    );

    // ---------- Rate limit / duplicate check via service_role client ----------
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const nowMs = Date.now();
    const rateLimitSince = new Date(nowMs - RATE_LIMIT_WINDOW_MS).toISOString();
    const duplicateSince = new Date(nowMs - DUPLICATE_WINDOW_MS).toISOString();

    const { count: recentCount, error: rateErr } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", rateLimitSince);
    if (rateErr) {
      console.error("Rate limit query failed");
      return jsonResponse(500, { error: GENERIC_ERROR });
    }
    if ((recentCount ?? 0) >= RATE_LIMIT_MAX) {
      console.warn("Rate limit hit for a pseudonymous client");
      return jsonResponse(429, { error: GENERIC_RATE_LIMIT });
    }

    const { count: dupCount, error: dupErr } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("content_hash", contentHash)
      .gte("created_at", duplicateSince);
    if (dupErr) {
      console.error("Duplicate query failed");
      return jsonResponse(500, { error: GENERIC_ERROR });
    }
    if ((dupCount ?? 0) > 0) {
      console.warn("Duplicate submission blocked");
      return jsonResponse(429, { error: GENERIC_DUPLICATE });
    }

    // ---------- Attachment verification + upload (only after all checks) ----------
    let attachment: { path: string; name: string; size: number; mime: string } | null = null;
    if (uploadFile) {
      const buf = new Uint8Array(await uploadFile.arrayBuffer());
      if (buf.byteLength === 0 || buf.byteLength > MAX_ATTACHMENT_SIZE) {
        console.warn(`Attachment rejected: byte length ${buf.byteLength}`);
        return jsonResponse(400, { error: GENERIC_ATTACHMENT });
      }
      const detected = detectFileType(buf);
      if (!detected || !signatureMatchesDeclared(buf, uploadFile.type)) {
        console.warn("Attachment rejected: file signature mismatch");
        return jsonResponse(400, { error: GENERIC_ATTACHMENT });
      }
      const extension = extensionFor(detected);
      const sanitizedOriginal = sanitizeFileName(uploadFile.name);
      const nameStem = sanitizedOriginal.replace(/\.[^.]*$/, "").replace(/\.+$/, "") || "csatolmany";
      const safeName = `${nameStem}.${extension}`;
      const objectPath = `${crypto.randomUUID()}/${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("contact-attachments")
        .upload(objectPath, buf, { contentType: detected, upsert: false });
      if (uploadError) {
        console.error("Attachment upload failed");
        return jsonResponse(500, { error: GENERIC_ERROR });
      }
      attachment = {
        path: objectPath,
        name: safeName.slice(0, 200),
        size: buf.byteLength,
        mime: detected,
      };
    }

    // Save to database FIRST — email failures must not lose the lead.

    const { data: insertRows, error: dbError } = await supabase.rpc(
      "insert_contact_message_with_limits",
      {
        p_name: name,
        p_email: email,
        p_phone: phone || null,
        p_message: message,
        p_source: source,
        p_page_url: page_url,
        p_ip_hash: ipHash,
        p_content_hash: contentHash,
        p_attachment_path: attachment?.path ?? null,
        p_attachment_name: attachment?.name ?? null,
        p_attachment_size: attachment?.size ?? null,
        p_attachment_mime: attachment?.mime ?? null,
      },
    );
    const insertResult = Array.isArray(insertRows) ? insertRows[0] : insertRows;
    const outcome = (insertResult as { outcome?: string } | null)?.outcome;
    const insertedId = (insertResult as { id?: string } | null)?.id ?? null;

    if (dbError || !outcome) {
      console.error("Atomic contact insert failed");
      if (attachment) {
        const { error: removeError } = await supabase.storage
          .from("contact-attachments")
          .remove([attachment.path]);
        if (removeError) {
          console.error("Orphan attachment cleanup failed");
        }
      }
      return jsonResponse(500, { error: GENERIC_ERROR });
    }

    if (outcome !== "inserted") {
      if (attachment) {
        const { error: removeError } = await supabase.storage
          .from("contact-attachments")
          .remove([attachment.path]);
        if (removeError) console.error("Rejected attachment cleanup failed");
      }
      if (outcome === "rate_limited") {
        return jsonResponse(429, { error: GENERIC_RATE_LIMIT });
      }
      if (outcome === "duplicate") {
        return jsonResponse(429, { error: GENERIC_DUPLICATE });
      }
      return jsonResponse(500, { error: GENERIC_ERROR });
    }

    // Send email notifications
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const emailInput = {
        name, email, phone, message, source, page_url, attachment,
        messageId: insertedId,
      };
      const sendResend = (payload: Record<string, unknown>) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(OUTBOUND_FETCH_TIMEOUT_MS),
        });

      try {
        // 1. Admin notification (Reply-To = validated customer address)
        const adminEmailRes = await sendResend(
          buildAdminEmail(emailInput, NORTHWIND_EMAIL),
        );
        if (!adminEmailRes.ok) {
          console.error(`Admin email send failed: HTTP ${adminEmailRes.status}`);
        }

        // 2. Confirmation email to the user (Reply-To = northwind@northwind.hu)
        const userEmailRes = await sendResend(buildUserEmail(emailInput));
        if (!userEmailRes.ok) {
          console.error(`User confirmation email failed: HTTP ${userEmailRes.status}`);
        }
      } catch (_mailErr) {
        console.error("Email send exception");
      }
    } else {
      console.warn("RESEND_API_KEY not set, skipping email notifications");
    }

    return jsonResponse(200, { success: true });
  } catch (_error) {
    console.error("Unexpected contact function error");
    return jsonResponse(500, { error: GENERIC_ERROR });
  }
});
