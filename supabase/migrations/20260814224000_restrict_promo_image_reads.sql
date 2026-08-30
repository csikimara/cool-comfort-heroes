-- The legacy SELECT policy exposed every object in the promotions bucket,
-- including images for inactive, future or expired promotions. Public clients
-- may create a short-lived signed URL only for a currently published row;
-- AAL2-protected admins retain access to all promotion images.
DROP POLICY IF EXISTS "Anyone can read promo images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read current promo images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can read all promo images" ON storage.objects;

CREATE POLICY "Public can read current promo images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'promo-images'
  AND EXISTS (
    SELECT 1
    FROM public.promotions AS promotion
    WHERE promotion.image_path = storage.objects.name
      AND promotion.is_active = true
      AND (
        promotion.starts_at IS NULL
        OR promotion.starts_at <= (now() AT TIME ZONE 'Europe/Budapest')::date
      )
      AND (
        promotion.ends_at IS NULL
        OR promotion.ends_at >= (now() AT TIME ZONE 'Europe/Budapest')::date
      )
  )
);

CREATE POLICY "Admins can read all promo images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'promo-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
