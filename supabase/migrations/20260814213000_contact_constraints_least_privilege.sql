-- Defence in depth for contact data. New rows must satisfy the same limits as
-- the Edge Function even if a future server-side caller contains a bug.
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_fields_valid
  CHECK (
    length(btrim(name)) BETWEEN 1 AND 100
    AND name !~ '[[:cntrl:]]'
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^[:space:]@,;:]+@[^[:space:]@,;:]+\.[^[:space:]@,;:]+$'
    AND length(split_part(email, '@', 1)) BETWEEN 1 AND 64
    AND left(split_part(email, '@', 1), 1) <> '.'
    AND right(split_part(email, '@', 1), 1) <> '.'
    AND position('..' in split_part(email, '@', 1)) = 0
    AND length(btrim(message)) BETWEEN 1 AND 5000
    AND translate(message, E'\n\r\t', '') !~ '[[:cntrl:]]'
    AND (
      phone IS NULL
      OR (
        length(phone) <= 50
        AND phone ~ '^\+?[0-9][0-9 ()/.-]*$'
        AND length(regexp_replace(phone, '[^0-9]', '', 'g')) BETWEEN 6 AND 20
      )
    )
    AND (
      source IS NULL
      OR source IN (
        'Főoldal – Northwind Hűtéstechnika Kft.',
        'Fisher oldal – Northwind Hűtéstechnika Kft.',
        'Fujitsu oldal – Northwind Hűtéstechnika Kft.'
      )
    )
    AND (
      page_url IS NULL
      OR (
        length(page_url) <= 500
        AND page_url ~ '^https://(www\.)?northwind\.hu/(fisher|fujitsu)?$'
      )
      OR (
        length(page_url) <= 500
        AND page_url ~ '^https://cool-comfort-heroes\.lovable\.app/(fisher|fujitsu)?$'
      )
    )
    AND (ip_hash IS NULL OR ip_hash ~ '^[0-9a-f]{64}$')
    AND (content_hash IS NULL OR content_hash ~ '^[0-9a-f]{64}$')
    AND (
      (
        attachment_path IS NULL
        AND attachment_name IS NULL
        AND attachment_size IS NULL
        AND attachment_mime IS NULL
      )
      OR (
        attachment_path IS NOT NULL
        AND attachment_path ~ '^[0-9a-f-]{36}/[A-Za-z0-9._-]{1,200}$'
        AND attachment_name IS NOT NULL
        AND length(attachment_name) BETWEEN 1 AND 200
        AND attachment_size BETWEEN 1 AND 10485760
        AND attachment_mime IN ('application/pdf', 'image/jpeg', 'image/png')
      )
    )
  ) NOT VALID;

-- The browser admin only needs SELECT and DELETE on contact records, and
-- SELECT/DELETE on their private attachments. All inserts use service_role.
DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
REVOKE INSERT, UPDATE ON public.contact_messages FROM authenticated;

DROP POLICY IF EXISTS "Admins can update contact attachments" ON storage.objects;

UPDATE storage.buckets
SET
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png']
WHERE id = 'contact-attachments';
