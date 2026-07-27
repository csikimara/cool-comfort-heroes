ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS content_hash text;

CREATE INDEX IF NOT EXISTS contact_messages_ip_hash_created_at_idx
  ON public.contact_messages (ip_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS contact_messages_content_hash_created_at_idx
  ON public.contact_messages (content_hash, created_at DESC);

-- Remove the anon INSERT policy: all submissions must go through the
-- send-contact-email edge function (service_role bypasses RLS) so the
-- Turnstile + rate-limit checks cannot be skipped by hitting the Data API.
DROP POLICY IF EXISTS "Public can submit valid contact messages" ON public.contact_messages;

-- Also revoke the anon INSERT grant so PostgREST rejects the request early.
REVOKE INSERT ON public.contact_messages FROM anon;