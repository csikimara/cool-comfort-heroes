-- The anti-abuse hashes are needed only for the 15-minute rate-limit and the
-- 1-hour duplicate window. Keeping them for the full lifetime of a contact
-- message would violate data minimisation and storage limitation.

CREATE EXTENSION IF NOT EXISTS pg_cron;

UPDATE public.contact_messages
SET ip_hash = NULL,
    content_hash = NULL
WHERE created_at < now() - interval '24 hours'
  AND (ip_hash IS NOT NULL OR content_hash IS NOT NULL);

CREATE INDEX IF NOT EXISTS contact_messages_expiring_hashes_idx
  ON public.contact_messages (created_at)
  WHERE ip_hash IS NOT NULL OR content_hash IS NOT NULL;

SELECT cron.schedule(
  'northwind-clear-contact-abuse-hashes',
  '*/15 * * * *',
  $cron$
    UPDATE public.contact_messages
    SET ip_hash = NULL,
        content_hash = NULL
    WHERE created_at < now() - interval '24 hours'
      AND (ip_hash IS NOT NULL OR content_hash IS NOT NULL)
  $cron$
);
