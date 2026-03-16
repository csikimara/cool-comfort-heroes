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
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactFormData = await req.json();

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Érvénytelen email cím." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({ name, email, phone: phone || null, message });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Hiba történt az üzenet mentésekor." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notifications
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
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
          subject: `Új ajánlatkérés: ${name}`,
          html: `
            <h2>Új üzenet érkezett a weboldalról</h2>
            <p><strong>Név:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || "Nem adott meg"}</p>
            <hr />
            <p><strong>Üzenet:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!adminEmailRes.ok) {
        console.error("Admin email send error:", await adminEmailRes.text());
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
          subject: "Köszönjük megkeresését! – Northwind Hűtéstechnika",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #1a7ab5, #2a8fc2); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Northwind Hűtéstechnika</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Professzionális klíma megoldások 1993 óta</p>
              </div>
              <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                <h2 style="color: #1a7ab5; margin-top: 0;">Kedves ${name}!</h2>
                <p style="color: #374151; line-height: 1.6;">
                  Köszönjük, hogy felkereste a Northwind Hűtéstechnikát! Üzenetét sikeresen megkaptuk.
                </p>
                <p style="color: #374151; line-height: 1.6;">
                  Munkatársunk hamarosan felveszi Önnel a kapcsolatot a megadott elérhetőségein.
                </p>
                <div style="background: #f0f7fc; border-left: 4px solid #1a7ab5; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0 0 5px; color: #6b7280; font-size: 14px;"><strong>Az Ön üzenete:</strong></p>
                  <p style="margin: 0; color: #374151;">${message.replace(/\n/g, "<br>")}</p>
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
      }
    } else {
      console.warn("RESEND_API_KEY not set, skipping email notifications");
    }

    return new Response(
      JSON.stringify({ success: true }),
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
