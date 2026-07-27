import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  page_url?: string;
  attachment?: {
    path: string;
    name: string;
    size: number;
    mime: string;
  } | null;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const ALLOWED_MIMES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]);
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10 MB

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactFormData = await req.json();
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "").trim().slice(0, 100) || null;
    const page_url = (body.page_url ?? "").trim().slice(0, 500) || null;
    const attachment = body.attachment ?? null;

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Név, email és üzenet megadása kötelező." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Túl hosszú bemenet." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (phone && phone.length > 50) {
      return new Response(
        JSON.stringify({ error: "A telefonszám túl hosszú." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Érvénytelen email cím." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate attachment metadata (server-side)
    if (attachment) {
      if (
        typeof attachment.path !== "string" ||
        typeof attachment.name !== "string" ||
        typeof attachment.mime !== "string" ||
        typeof attachment.size !== "number"
      ) {
        return new Response(
          JSON.stringify({ error: "Érvénytelen csatolmány adatok." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!ALLOWED_MIMES.has(attachment.mime.toLowerCase())) {
        return new Response(
          JSON.stringify({ error: "Nem támogatott fájlformátum. Engedélyezett: PDF, JPG, JPEG, PNG." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (attachment.size <= 0 || attachment.size > MAX_ATTACHMENT_SIZE) {
        return new Response(
          JSON.stringify({ error: "A csatolt fájl mérete túl nagy (max. 10 MB)." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (attachment.path.length > 500 || attachment.name.length > 255) {
        return new Response(
          JSON.stringify({ error: "Érvénytelen csatolmány adatok." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Save to database FIRST — email failures must not lose the lead.
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        source,
        page_url,
        attachment_path: attachment?.path ?? null,
        attachment_name: attachment?.name ?? null,
        attachment_size: attachment?.size ?? null,
        attachment_mime: attachment?.mime ?? null,
      });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Hiba történt az üzenet mentésekor." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notifications
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailWarning: string | null = null;
    if (resendApiKey) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = phone ? escapeHtml(phone) : "Nem adott meg";
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
      const safeSource = source ? escapeHtml(source) : "Weboldal";
      const safePageUrl = page_url ? escapeHtml(page_url) : "";
      const safeAttachmentInfo = attachment
        ? `${escapeHtml(attachment.name)} (${Math.round(attachment.size / 1024)} KB)`
        : "Nincs";

      try {
      // 1. Admin notification
      const adminEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Northwind Weboldal <onboarding@resend.dev>",
          to: ["csikimara@gmail.com"],
          subject: `Új ajánlatkérés: ${name.replace(/[\r\n]/g, " ").slice(0, 120)}`,
          html: `
            <h2>Új üzenet érkezett a weboldalról</h2>
            <p><strong>Forrás:</strong> ${safeSource}${safePageUrl ? ` (<a href="${safePageUrl}">${safePageUrl}</a>)` : ""}</p>
            <p><strong>Név:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Telefon:</strong> ${safePhone}</p>
            <p><strong>Csatolmány:</strong> ${safeAttachmentInfo}</p>
            <hr />
            <p><strong>Üzenet:</strong></p>
            <p>${safeMessage}</p>
          `,
        }),
      });

      if (!adminEmailRes.ok) {
        console.error("Admin email send error:", await adminEmailRes.text());
        emailWarning = "admin_email_failed";
      }

      // 2. Confirmation email to the user
      const userEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Northwind Hűtéstechnika <onboarding@resend.dev>",
          to: [email],
          subject: "Megkeresését megkaptuk – Northwind Hűtéstechnika Kft.",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #1a7ab5, #2a8fc2); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Northwind Hűtéstechnika</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Professzionális klíma megoldások 1993 óta</p>
              </div>
              <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                <h2 style="color: #1a7ab5; margin-top: 0;">Tisztelt Ügyfelünk!</h2>
                <p style="color: #374151; line-height: 1.6;">
                  Megkaptuk a megkeresését és a csatolt fájlokat. Értesítjük, hogy munkatársunk hamarosan feldolgozza a megadott adatokat, és felveszi Önnel a kapcsolatot a megadott elérhetőségeken.
                </p>
                <p style="color: #374151; line-height: 1.6;">
                  Üdvözlettel:<br/><strong>Northwind Hűtéstechnika Kft.</strong>
                </p>
                <div style="background: #f0f7fc; border-left: 4px solid #1a7ab5; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0 0 5px; color: #6b7280; font-size: 14px;"><strong>Az Ön üzenete:</strong></p>
                  <p style="margin: 0; color: #374151;">${safeMessage}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                  <strong>Elérhetőségeink:</strong><br>
                  📞 +36 70 409 9760<br>
                  📧 northwind@northwind.hu<br>
                  📍 1118 Budapest, Torbágy u. 16.
                </p>
              </div>
              <div style="text-align: center; padding: 15px; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Northwind Hűtéstechnika. Minden jog fenntartva.
              </div>
            </div>
          `,
        }),
      });

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

    return new Response(
      JSON.stringify({ success: true, emailWarning }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Váratlan hiba történt." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
