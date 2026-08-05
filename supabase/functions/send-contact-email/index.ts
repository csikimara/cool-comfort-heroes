import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isLocalhostAllowed, resolveCors } from "../_shared/cors.ts";
import { buildAdminEmail, buildUserEmail } from "../_shared/contact-emails.ts";
import {
  detectFileType,
  extensionFor,
  normalizeMime,
  sanitizeFileName,
  signatureMatchesDeclared,
} from "../_shared/file-signature.ts";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  page_url?: string;
  turnstileToken?: string;
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

// Csak ezekről a hostokról fogadunk el Turnstile tokent.
const ALLOWED_TURNSTILE_HOSTNAMES = new Set([
  "cool-comfort-heroes.lovable.app",
  "northwind.hu",
  "www.northwind.hu",
]);

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

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-real-ip") ??
    "unknown";
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
      { method: "POST", body },
    );
    if (!res.ok) {
      console.error(`Turnstile verify HTTP ${res.status}`);
      return false;
    }
    const data = await res.json() as {
      success?: boolean;
      hostname?: string;
      "error-codes"?: string[];
    };
    if (!data.success) {
      console.error("Turnstile verify failed:", data["error-codes"]);
      return false;
    }
    const hostname = (data.hostname ?? "").toLowerCase();
    if (!ALLOWED_TURNSTILE_HOSTNAMES.has(hostname)) {
      console.error(`Turnstile hostname not allowed: ${hostname || "(empty)"}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Turnstile verify exception:", err);
    return false;
  }
}

Deno.serve(async (req) => {
  // ---------- Strict CORS / origin check (before ANY processing) ----------
  const cors = resolveCors(
    req.headers.get("origin"),
    isLocalhostAllowed({ ALLOW_LOCALHOST_CORS: Deno.env.get("ALLOW_LOCALHOST_CORS") ?? undefined }),
  );
  const corsHeaders = cors.headers;
  const jsonResponse = (status: number, payload: Record<string, unknown>) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (!cors.allowed) {
    console.warn("Blocked request from disallowed origin");
    return jsonResponse(403, { error: GENERIC_ORIGIN });
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ---------- Request parsing: multipart/form-data OR JSON ----------
    const contentType = req.headers.get("content-type") ?? "";
    let body: ContactFormData;
    let uploadFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
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
    } else {
      body = await req.json();
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "").trim().slice(0, 100) || null;
    const page_url = (body.page_url ?? "").trim().slice(0, 500) || null;
    const turnstileToken = (body.turnstileToken ?? "").trim();

    // ---------- Server-side input validation ----------
    if (!name || !email || !message) {
      console.warn("Validation failed: missing required fields");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      console.warn("Validation failed: field too long");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    if (phone && phone.length > 50) {
      console.warn("Validation failed: phone too long");
      return jsonResponse(400, { error: GENERIC_VALIDATION });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
    const clientIp = getClientIp(req);
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
    if (!ipSalt) {
      console.error("IP_HASH_SALT is not configured");
      return jsonResponse(500, { error: GENERIC_ERROR });
    }
    const ipHash = await hmacSha256Hex(ipSalt, clientIp);
    const contentHash = await hmacSha256Hex(
      ipSalt,
      `${email.toLowerCase()}|${message}`,
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
      console.error("Rate limit query error:", rateErr);
      return jsonResponse(500, { error: GENERIC_ERROR });
    }
    if ((recentCount ?? 0) >= RATE_LIMIT_MAX) {
      console.warn(`Rate limit hit for ip_hash ${ipHash.slice(0, 8)}…`);
      return jsonResponse(429, { error: GENERIC_RATE_LIMIT });
    }

    const { count: dupCount, error: dupErr } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("content_hash", contentHash)
      .gte("created_at", duplicateSince);
    if (dupErr) {
      console.error("Duplicate query error:", dupErr);
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
      const safeName = sanitizeFileName(uploadFile.name);
      const objectPath = `${crypto.randomUUID()}/${safeName.toLowerCase().endsWith(`.${extensionFor(detected)}`) ? safeName : `${safeName}.${extensionFor(detected)}`}`;
      const { error: uploadError } = await supabase.storage
        .from("contact-attachments")
        .upload(objectPath, buf, { contentType: detected, upsert: false });
      if (uploadError) {
        console.error("Attachment upload error:", uploadError);
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

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        source,
        page_url,
        ip_hash: ipHash,
        content_hash: contentHash,
        attachment_path: attachment?.path ?? null,
        attachment_name: attachment?.name ?? null,
        attachment_size: attachment?.size ?? null,
        attachment_mime: attachment?.mime ?? null,
      });

    if (dbError) {
      console.error("DB error:", dbError);
      if (attachment) {
        const { error: removeError } = await supabase.storage
          .from("contact-attachments")
          .remove([attachment.path]);
        if (removeError) {
          console.error("Orphan attachment cleanup failed:", removeError);
        }
      }
      return jsonResponse(500, { error: GENERIC_ERROR });
    }

    // Send email notifications
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailWarning: string | null = null;
    if (resendApiKey) {
      const emailInput = {
        name, email, phone, message, source, page_url, attachment,
      };
      const sendResend = (payload: Record<string, unknown>) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(payload),
        });

      try {
        // 1. Admin notification (Reply-To = validated customer address)
        const adminEmailRes = await sendResend(
          buildAdminEmail(emailInput, "csikimara@gmail.com"),
        );
        if (!adminEmailRes.ok) {
          console.error("Admin email send error:", await adminEmailRes.text());
          emailWarning = "admin_email_failed";
        }

        // 2. Confirmation email to the user (Reply-To = northwind@northwind.hu)
        const userEmailRes = await sendResend(buildUserEmail(emailInput));
        if (!userEmailRes.ok) {
          console.error("User confirmation email error:", await userEmailRes.text());
          emailWarning = emailWarning ?? "user_email_failed";
        }
      } catch (mailErr) {
        console.error("Email send exception:", mailErr);
        emailWarning = "email_exception";
      }
    } else {
      console.warn("RESEND_API_KEY not set, skipping email notifications");
      emailWarning = "resend_not_configured";
    }

    return jsonResponse(200, { success: true, emailWarning });
  } catch (error) {
    console.error("Unexpected error:", error);
    return jsonResponse(500, { error: GENERIC_ERROR });
  }
});
