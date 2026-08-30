-- Ensure both buckets exist with explicit privacy and server-side upload limits.
-- The public site accesses promo images through signed URLs; contact attachments
-- must never be publicly readable.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'contact-attachments',
    'contact-attachments',
    false,
    10485760,
    ARRAY['application/pdf', 'image/jpeg', 'image/png']
  ),
  (
    'promo-images',
    'promo-images',
    false,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  )
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Database-level limits for admin-authored public promotion content. NOT VALID
-- keeps deployment possible when legacy rows need cleanup while enforcing the
-- rules for all new and changed rows.
ALTER TABLE public.promotions
  ADD CONSTRAINT promotions_content_valid
  CHECK (
    length(btrim(title)) BETWEEN 1 AND 120
    AND (description IS NULL OR length(description) <= 600)
    AND (
      (button_label IS NULL AND button_url IS NULL)
      OR (
        button_label IS NOT NULL
        AND length(btrim(button_label)) BETWEEN 1 AND 60
        AND button_url IS NOT NULL
      )
    )
    AND (
      image_path IS NULL
      OR image_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$'
    )
    AND (starts_at IS NULL OR ends_at IS NULL OR starts_at <= ends_at)
    AND sort_order BETWEEN -10000 AND 10000
  ) NOT VALID;
