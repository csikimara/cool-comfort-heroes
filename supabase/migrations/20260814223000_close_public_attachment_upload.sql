-- Contact attachments must be uploaded exclusively by the validated Edge Function
-- with the service-role key. Remove the legacy browser upload policy so an
-- anonymous or merely authenticated caller cannot bypass Turnstile, rate
-- limits, signature checks and the atomic contact-message insert.
DROP POLICY IF EXISTS "Anyone can upload contact attachments" ON storage.objects;
