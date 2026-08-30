-- Enforce an AAL2 (MFA-verified) session for every operation guarded by the
-- central role helper. Service-role calls from trusted Edge Functions remain
-- available. Because all admin RLS and Storage policies call has_role(), this
-- single guard also protects messages, attachments, promotions and roles.
CREATE OR REPLACE FUNCTION public.has_role(
  _user_id uuid,
  _role public.app_role
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT
    auth.role() = 'service_role'
    OR (
      auth.uid() = _user_id
      AND COALESCE(auth.jwt() ->> 'aal', '') = 'aal2'
      AND EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
      )
    )
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role)
  TO authenticated, service_role;

-- Align the technical complaint hold with the public notice: receipt time plus
-- three years and 31 days (the normal 30-day written-response deadline plus a
-- one-day safety margin). Once active, the browser-accessible RPC cannot remove
-- the hold. A genuinely mistaken classification needs a documented,
-- service-role/database correction instead of an unaudited UI toggle.
CREATE OR REPLACE FUNCTION public.set_contact_message_complaint_status(
  p_id uuid,
  p_is_complaint boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_created_at timestamptz;
  v_is_complaint boolean;
  v_legal_hold_until timestamptz;
BEGIN
  IF auth.uid() IS NULL
    OR NOT public.has_role(auth.uid(), 'admin'::public.app_role)
  THEN
    RAISE EXCEPTION 'admin role with aal2 required' USING ERRCODE = '42501';
  END IF;

  SELECT created_at, is_consumer_complaint, legal_hold_until
  INTO v_created_at, v_is_complaint, v_legal_hold_until
  FROM public.contact_messages
  WHERE id = p_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'contact message not found' USING ERRCODE = 'P0002';
  END IF;

  IF p_is_complaint THEN
    UPDATE public.contact_messages
    SET
      is_consumer_complaint = true,
      legal_hold_until = GREATEST(
        COALESCE(legal_hold_until, '-infinity'::timestamptz),
        v_created_at + interval '3 years 31 days'
      )
    WHERE id = p_id;
    RETURN;
  END IF;

  IF v_is_complaint
    AND v_legal_hold_until IS NOT NULL
    AND v_legal_hold_until > now()
  THEN
    RAISE EXCEPTION 'active legal hold cannot be cleared through this RPC'
      USING ERRCODE = '42501';
  END IF;

  UPDATE public.contact_messages
  SET is_consumer_complaint = false,
      legal_hold_until = NULL
  WHERE id = p_id;
END;
$$;

REVOKE ALL ON FUNCTION public.set_contact_message_complaint_status(uuid, boolean)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_contact_message_complaint_status(uuid, boolean)
  TO authenticated;
