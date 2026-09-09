import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("website legal compliance copy", () => {
  it("publishes the mandatory company details on a dedicated imprint page", () => {
    const imprint = read("src/pages/Impressum.tsx");
    const footer = read("src/components/Footer.tsx");
    const app = read("src/App.tsx");

    expect(imprint).toContain("01-09-921672");
    expect(imprint).toContain("14823330-2-43");
    expect(imprint).toContain("Fővárosi Törvényszék Cégbírósága");
    expect(imprint).toContain("Websupport Magyarország Kft.");
    expect(imprint).toContain("01-09-381419");
    expect(imprint).toContain("25138205-2-43");
    expect(imprint).toContain("Nemzeti Klímavédelmi Hatóság");
    expect(imprint).toContain("Budapesti Békéltető Testület");
    expect(imprint).toContain("Krisztina krt. 99. I. em. 111.");
    expect(imprint).not.toContain("Krisztina krt. 99. III. em. 310.");
    expect(imprint).toContain("https://bekeltet.bkik.hu/elerhetosegek");
    expect(imprint).toContain("30 napon");
    expect(footer).toContain('to="/impresszum"');
    expect(app).toContain('path="/impresszum"');
  });

  it("uses contract/pre-contract and legitimate interest instead of forced consent", () => {
    const forms = [
      "src/components/Contact.tsx",
      "src/components/fisher/FisherContactForm.tsx",
      "src/components/fujitsu/FujitsuContactForm.tsx",
    ].map(read).join("\n");
    const privacy = read("src/pages/PrivacyPolicy.tsx");

    expect(forms).toContain("Megismertem az");
    expect(forms).not.toContain("hozzájárulok");
    expect(forms).not.toContain("gdprAccepted");
    expect(privacy).toContain("GDPR 6. cikk (1) b)");
    expect(privacy).toContain("GDPR 6. cikk (1) f)");
    expect(privacy).toContain("nem hozzájárulás és nem az adatkezelés jogalapja");
    expect(privacy).toContain("Verzió: 2.6");
  });

  it("does not add a consent banner without non-essential trackers", () => {
    const privacy = read("src/pages/PrivacyPolicy.tsx");
    const publicSource = ["index.html", "src/App.tsx", "src/components/Footer.tsx"]
      .map(read)
      .join("\n");

    expect(privacy).toMatch(/nincs\s+szükség hozzájárulást kérő sütisávra/);
    expect(publicSource).not.toMatch(/google-analytics|googletagmanager|facebook\.net/i);
  });

  it("does not permit executable inline scripts in the production CSP", () => {
    const headers = read("public/.htaccess");
    const scriptPolicy = headers.match(/script-src[^;]+/)?.[0] ?? "";
    expect(scriptPolicy).toContain("script-src 'self'");
    expect(scriptPolicy).not.toContain("'unsafe-inline'");
    expect(read("index.html")).toContain('src="/canonical-host-guard.js"');

    const jsonLdBlocks = [
      ...read("index.html").matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((match) => match[1]);
    expect(jsonLdBlocks).toHaveLength(2);
    for (const block of jsonLdBlocks) {
      const hash = createHash("sha256").update(block).digest("base64");
      expect(scriptPolicy).toContain(`'sha256-${hash}'`);
    }
  });

  it("forces HTTPS without trusting a client-supplied forwarding header", () => {
    const headers = read("public/.htaccess");
    const checklist = read("docs/elesitesi-ellenorzolista.md");
    expect(headers).toContain("RewriteCond %{HTTPS} !=on");
    expect(headers).not.toContain("X-Forwarded-Proto");
    expect(headers).toContain("https://northwind.hu/$1 [R=301,L,QSA]");
    expect(headers).toContain("Options -Indexes -MultiViews");
    expect(headers).toContain("ErrorDocument 404 /404.html");
    expect(headers).toContain("RewriteRule ^contact\\.php$ - [G,L,NC]");
    expect(checklist).toContain("/contact.php");
    expect(checklist).toContain("410 Gone");
    expect(checklist).toContain("galéria-`index.php`");
    expect(checklist).toContain("soft 404");
  });

  it("automatically expires anti-abuse hashes", () => {
    const migration = read(
      "supabase/migrations/20260814190000_contact_abuse_hash_retention.sql",
    );

    expect(migration).toContain("CREATE EXTENSION IF NOT EXISTS pg_cron");
    expect(migration).toContain("northwind-clear-contact-abuse-hashes");
    expect(migration).toContain("created_at < now() - interval '24 hours'");
  });

  it("documents every active website processor and the real retention trigger", () => {
    const privacy = read("src/pages/PrivacyPolicy.tsx");
    const operations = read("docs/adatvedelmi-uzemeltetesi-rend.md");

    for (const provider of ["Supabase Pte. Ltd.", "Cloudflare, Inc.", "Plus Five Five, Inc.", "Lovable Labs Incorporated", "Websupport Magyarország Kft."]) {
      expect(privacy).toContain(provider);
    }
    expect(privacy).toContain("a beérkezéstől számított");
    expect(privacy).not.toContain("a megkeresés lezárásától");
    expect(privacy).toContain("legfeljebb 27 hónap");
    expect(privacy).toContain("Resend e-mail-küldési adatok");
    expect(privacy).toContain("Technikai hozzáférési és biztonsági naplók");
    expect(privacy).toContain("részben adatfeldolgozó, részben önálló adatkezelő");
    expect(privacy).toContain("A gyártói, hatósági, közösségi és más külső weboldalakra");
    expect(operations).toContain("kód a `northwind@northwind.hu`");
  });

  it("keeps admin refresh tokens tab-scoped instead of persistent", () => {
    const client = read("src/integrations/supabase/client.ts");
    const authStorage = read("src/lib/supabase-auth-storage.ts");
    const privacy = read("src/pages/PrivacyPolicy.tsx");
    expect(client).toContain("storage: getTabScopedAuthStorage()");
    expect(client).toContain("removeLegacyPersistentAuthToken(SUPABASE_PROJECT_ID)");
    expect(authStorage).toContain("window.localStorage.removeItem");
    expect(authStorage).toContain("memoryOnlyStorage");
    expect(privacy).toContain("Admin munkamenet (sessionStorage)");
  });

  it("uses the company mailbox for internal notifications", () => {
    const edge = read("supabase/functions/send-contact-email/index.ts");
    expect(edge).toContain("NORTHWIND_EMAIL");
    expect(edge).not.toContain("ADMIN_NOTIFICATION_EMAIL");
    expect(edge).not.toMatch(/@gmail\.com/i);
    expect(edge).not.toContain("await adminEmailRes.text()");
    expect(edge).not.toContain("await userEmailRes.text()");
  });

  it("serialises the final contact rate-limit check", () => {
    const migration = read("supabase/migrations/20260814210000_atomic_contact_rate_limits.sql");
    const edge = read("supabase/functions/send-contact-email/index.ts");
    expect(migration).toContain("pg_advisory_xact_lock");
    expect(migration).toContain("auth.role() IS DISTINCT FROM 'service_role'");
    expect(edge).toContain('"insert_contact_message_with_limits"');
  });

  it("only lets callers query their own role through the definer helper", () => {
    const migration = read(
      "supabase/migrations/20260814222000_enforce_admin_mfa_and_immutable_holds.sql",
    );
    expect(migration).toContain("auth.uid() = _user_id");
    expect(migration).toContain("auth.role() = 'service_role'");
    expect(migration).toContain("auth.jwt() ->> 'aal'");
    expect(migration).toContain("= 'aal2'");
    expect(migration).toContain("SET search_path = public, pg_temp");
    expect(migration).toContain(
      "REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon",
    );
  });

  it("keeps attachments protected while a consumer complaint is on legal hold", () => {
    const migration = read(
      "supabase/migrations/20260814221000_protect_held_attachments.sql",
    );
    expect(migration).toContain(
      'DROP POLICY IF EXISTS "Admins can delete contact attachments"',
    );
    expect(migration).toContain("message.attachment_path = storage.objects.name");
    expect(migration).toContain("message.legal_hold_until > now()");
  });

  it("removes the legacy public contact-attachment upload policy", () => {
    const migration = read(
      "supabase/migrations/20260814223000_close_public_attachment_upload.sql",
    );
    expect(migration).toContain(
      'DROP POLICY IF EXISTS "Anyone can upload contact attachments"',
    );
  });

  it("does not expose inactive or orphaned promotion images to the public", () => {
    const migration = read(
      "supabase/migrations/20260814224000_restrict_promo_image_reads.sql",
    );
    const hook = read("src/hooks/usePromotions.ts");
    expect(migration).toContain('DROP POLICY IF EXISTS "Anyone can read promo images"');
    expect(migration).toContain('CREATE POLICY "Public can read current promo images"');
    expect(migration).toContain("promotion.image_path = storage.objects.name");
    expect(migration).toContain("promotion.is_active = true");
    expect(migration).toContain('CREATE POLICY "Admins can read all promo images"');
    expect(hook).toContain("PROMO_SIGNED_URL_TTL_SECONDS = 60 * 60");
  });

  it("domain-separates IP and message anti-abuse hashes", () => {
    const edge = read("supabase/functions/send-contact-email/index.ts");
    expect(edge).toContain("`ip:${clientIp}`");
    expect(edge).toContain("`content:${email.toLowerCase()}|${message}`");
    expect(edge).toContain("byteLength < 32");
  });

  it("binds Turnstile tokens to the contact form action", () => {
    const widget = read("src/components/TurnstileWidget.tsx");
    const edge = read("supabase/functions/send-contact-email/index.ts");
    const cors = read("supabase/functions/_shared/cors.ts");
    expect(widget).toContain('action: "contact_form"');
    expect(edge).toContain('EXPECTED_TURNSTILE_ACTION = "contact_form"');
    expect(edge).toContain("data.action !== EXPECTED_TURNSTILE_ACTION");
    expect(edge).toContain("AbortSignal.timeout(OUTBOUND_FETCH_TIMEOUT_MS)");
    expect(edge).toContain("NETLIFY_DEPLOY_PREVIEW_HOSTNAME");
    expect(cors).toContain('"deploy-preview-7--cool-comfort-heroes.netlify.app"');
  });

  it("pins the Edge Function dependency and enforces promotion upload limits", () => {
    const edge = read("supabase/functions/send-contact-email/index.ts");
    const denoConfig = read("supabase/functions/send-contact-email/deno.json");
    const storageMigration = read("supabase/migrations/20260814212000_promo_bucket_limits.sql");

    expect(edge).toContain('from "@supabase/supabase-js"');
    expect(edge).not.toContain("esm.sh");
    expect(denoConfig).toContain("npm:@supabase/supabase-js@2.98.0");
    expect(storageMigration).toContain("file_size_limit = 5242880");
    expect(storageMigration).toContain("allowed_mime_types");
  });

  it("creates private storage buckets and constrains public promotion content", () => {
    const migration = read(
      "supabase/migrations/20260814215000_storage_and_promotion_constraints.sql",
    );
    expect(migration).toContain("'contact-attachments'");
    expect(migration).toContain("'promo-images'");
    expect(migration).toMatch(/'promo-images',[\s\S]*?false,[\s\S]*?5242880/);
    expect(migration).toContain("promotions_content_valid");
    expect(migration).toContain("starts_at <= ends_at");
  });

  it("keeps database promotion links free of credentials and encoded separators", () => {
    const migration = read("supabase/migrations/20260814211000_promotion_link_guard.sql");
    expect(migration).toContain("%(25)*(2f|5c)");
    expect(migration).toContain("^https://[a-z0-9]");
    expect(migration).not.toContain("LIKE 'https://%'");
  });

  it("enforces contact limits in the database and keeps admin grants minimal", () => {
    const migration = read("supabase/migrations/20260814213000_contact_constraints_least_privilege.sql");
    expect(migration).toContain("contact_messages_fields_valid");
    expect(migration).toContain("REVOKE INSERT, UPDATE ON public.contact_messages FROM authenticated");
    expect(migration).toContain("file_size_limit = 10485760");
    expect(migration).toContain("allowed_mime_types");
  });

  it("protects the mandatory three-year consumer-complaint retention", () => {
    const migration = read("supabase/migrations/20260814222000_enforce_admin_mfa_and_immutable_holds.sql");
    const privacy = read("src/pages/PrivacyPolicy.tsx");
    expect(migration).toContain("set_contact_message_complaint_status");
    expect(migration).toContain("v_created_at + interval '3 years 31 days'");
    expect(migration).toContain("active legal hold cannot be cleared");
    expect(migration).toContain("admin role with aal2 required");
    expect(privacy).toContain("1997. évi CLV. törvény 17/A. §");
  });
});
