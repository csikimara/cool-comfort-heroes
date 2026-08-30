-- Written consumer complaints and the response copy must be retained for
-- three years. Admins may classify a message through a narrow RPC without
-- receiving general UPDATE permission over personal data fields.
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS is_consumer_complaint boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS legal_hold_until timestamptz;

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_complaint_hold_consistent
  CHECK (
    (is_consumer_complaint = false AND legal_hold_until IS NULL)
    OR (is_consumer_complaint = true AND legal_hold_until IS NOT NULL)
  ) NOT VALID;

CREATE INDEX IF NOT EXISTS contact_messages_retention_idx
  ON public.contact_messages (created_at, legal_hold_until);

DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;
CREATE POLICY "Admins can delete contact messages outside legal hold"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    AND (legal_hold_until IS NULL OR legal_hold_until <= now())
  );

CREATE OR REPLACE FUNCTION public.set_contact_message_complaint_status(
  p_id uuid,
  p_is_complaint boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'admin role required' USING ERRCODE = '42501';
  END IF;

  UPDATE public.contact_messages
  SET
    is_consumer_complaint = p_is_complaint,
    legal_hold_until = CASE
      WHEN p_is_complaint THEN GREATEST(
        COALESCE(legal_hold_until, '-infinity'::timestamptz),
        -- Covers the statutory three years from the response, which may be
        -- sent up to 30 days after receipt/classification.
        now() + interval '3 years 31 days'
      )
      ELSE NULL
    END
  WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'contact message not found' USING ERRCODE = 'P0002';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.set_contact_message_complaint_status(uuid, boolean)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_contact_message_complaint_status(uuid, boolean)
  TO authenticated;
