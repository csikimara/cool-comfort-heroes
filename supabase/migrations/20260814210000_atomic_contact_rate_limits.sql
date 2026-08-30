-- Serialise the final rate-limit check and insertion. The Edge Function still
-- performs an early check before a possible upload; this RPC closes the small
-- race window between that check and INSERT when requests arrive concurrently.

CREATE OR REPLACE FUNCTION public.insert_contact_message_with_limits(
  p_name text,
  p_email text,
  p_phone text,
  p_message text,
  p_source text,
  p_page_url text,
  p_ip_hash text,
  p_content_hash text,
  p_attachment_path text,
  p_attachment_name text,
  p_attachment_size bigint,
  p_attachment_mime text
)
RETURNS TABLE (id uuid, outcome text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF auth.role() IS DISTINCT FROM 'service_role' THEN
    RAISE EXCEPTION 'service_role required' USING ERRCODE = '42501';
  END IF;

  IF p_ip_hash IS NULL OR p_content_hash IS NULL THEN
    RAISE EXCEPTION 'anti-abuse hashes required' USING ERRCODE = '22023';
  END IF;

  -- Consistent lock order: per-client limit first, duplicate content second.
  PERFORM pg_advisory_xact_lock(hashtextextended(p_ip_hash, 0));
  PERFORM pg_advisory_xact_lock(hashtextextended(p_content_hash, 1));

  IF (
    SELECT count(*)
    FROM public.contact_messages
    WHERE ip_hash = p_ip_hash
      AND created_at >= now() - interval '15 minutes'
  ) >= 5 THEN
    RETURN QUERY SELECT NULL::uuid, 'rate_limited'::text;
    RETURN;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.contact_messages
    WHERE content_hash = p_content_hash
      AND created_at >= now() - interval '1 hour'
  ) THEN
    RETURN QUERY SELECT NULL::uuid, 'duplicate'::text;
    RETURN;
  END IF;

  INSERT INTO public.contact_messages (
    name, email, phone, message, source, page_url,
    ip_hash, content_hash,
    attachment_path, attachment_name, attachment_size, attachment_mime
  ) VALUES (
    p_name, p_email, p_phone, p_message, p_source, p_page_url,
    p_ip_hash, p_content_hash,
    p_attachment_path, p_attachment_name, p_attachment_size, p_attachment_mime
  )
  RETURNING contact_messages.id INTO v_id;

  RETURN QUERY SELECT v_id, 'inserted'::text;
END;
$$;

REVOKE ALL ON FUNCTION public.insert_contact_message_with_limits(
  text, text, text, text, text, text, text, text, text, text, bigint, text
) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.insert_contact_message_with_limits(
  text, text, text, text, text, text, text, text, text, text, bigint, text
) TO service_role;
