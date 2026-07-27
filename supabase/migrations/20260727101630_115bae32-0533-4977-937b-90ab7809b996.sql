-- Public (anon + authenticated) uploads only, restricted by mime + size + bucket
CREATE POLICY "Anyone can upload contact attachments"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'contact-attachments'
  AND (lower(coalesce(metadata->>'mimetype', '')) IN (
    'application/pdf', 'image/jpeg', 'image/jpg', 'image/png'
  ))
  AND coalesce((metadata->>'size')::bigint, 0) <= 10485760
);

CREATE POLICY "Admins can view contact attachments"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'contact-attachments'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update contact attachments"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'contact-attachments'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'contact-attachments'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete contact attachments"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'contact-attachments'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);