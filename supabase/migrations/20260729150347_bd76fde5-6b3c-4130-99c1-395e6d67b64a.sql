CREATE POLICY "Anyone can read promo images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'promo-images');

CREATE POLICY "Admins can upload promo images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'promo-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update promo images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'promo-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'promo-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete promo images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'promo-images' AND public.has_role(auth.uid(), 'admin'));