-- Enforce the same image restrictions at Storage level as in the admin UI.
-- This protects the bucket even if a client bypasses browser-side checks.
UPDATE storage.buckets
SET
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'promo-images';
