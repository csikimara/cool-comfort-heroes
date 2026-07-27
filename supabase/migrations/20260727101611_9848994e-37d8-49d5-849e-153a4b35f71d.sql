ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS page_url text,
  ADD COLUMN IF NOT EXISTS attachment_path text,
  ADD COLUMN IF NOT EXISTS attachment_name text,
  ADD COLUMN IF NOT EXISTS attachment_size bigint,
  ADD COLUMN IF NOT EXISTS attachment_mime text;

-- Replace the public insert policy to include new optional fields and forbid
-- attachment metadata from being set directly by anonymous submitters.
DROP POLICY IF EXISTS "Public can submit valid contact messages" ON public.contact_messages;

CREATE POLICY "Public can submit valid contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(phone) <= 50)
  AND (source IS NULL OR length(source) <= 100)
  AND (page_url IS NULL OR length(page_url) <= 500)
  AND attachment_path IS NULL
  AND attachment_name IS NULL
  AND attachment_size IS NULL
  AND attachment_mime IS NULL
);