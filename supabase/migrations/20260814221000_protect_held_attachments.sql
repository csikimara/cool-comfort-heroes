-- A held consumer complaint must retain its attachment as well as its database
-- row. Enforce that rule in Storage RLS, not only in the admin interface.
CREATE INDEX IF NOT EXISTS contact_messages_attachment_path_idx
  ON public.contact_messages (attachment_path)
  WHERE attachment_path IS NOT NULL;

DROP POLICY IF EXISTS "Admins can delete contact attachments" ON storage.objects;
CREATE POLICY "Admins can delete contact attachments outside legal hold"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'contact-attachments'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
  AND NOT EXISTS (
    SELECT 1
    FROM public.contact_messages AS message
    WHERE message.attachment_path = storage.objects.name
      AND message.legal_hold_until > now()
  )
);
