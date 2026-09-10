CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  brand text NOT NULL DEFAULT 'general',
  title text NOT NULL,
  caption text,
  image_path text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT gallery_items_category_valid CHECK (
    category IN ('lakossagi-split', 'hoszivattyu', 'legcsatornazhato', 'karbantartas', 'ipari-hutes', 'legtechnika')
  ),
  CONSTRAINT gallery_items_brand_valid CHECK (brand IN ('general', 'fujitsu', 'fisher')),
  CONSTRAINT gallery_items_title_valid CHECK (char_length(btrim(title)) BETWEEN 1 AND 300),
  CONSTRAINT gallery_items_caption_valid CHECK (caption IS NULL OR char_length(caption) <= 500),
  CONSTRAINT gallery_items_sort_order_valid CHECK (sort_order BETWEEN -10000 AND 10000),
  CONSTRAINT gallery_items_image_path_valid CHECK (
    lower(image_path) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$'
  )
);

CREATE INDEX gallery_items_public_order_idx
  ON public.gallery_items (category, brand, sort_order, created_at DESC)
  WHERE is_active = true;

CREATE TRIGGER update_gallery_items_updated_at
  BEFORE UPDATE ON public.gallery_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallery_items FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;

CREATE POLICY "Public can read active gallery items"
  ON public.gallery_items FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can read all gallery items"
  ON public.gallery_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert gallery items"
  ON public.gallery_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update gallery items"
  ON public.gallery_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete gallery items"
  ON public.gallery_items FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('reference-images', 'reference-images', false, 5242880, ARRAY['image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public can read active reference images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (
    bucket_id = 'reference-images'
    AND EXISTS (
      SELECT 1 FROM public.gallery_items AS item
      WHERE item.image_path = storage.objects.name
        AND item.is_active = true
    )
  );

CREATE POLICY "Admins can read all reference images"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'reference-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Admins can upload reference images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'reference-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Admins can update reference images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'reference-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  )
  WITH CHECK (
    bucket_id = 'reference-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Admins can delete reference images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'reference-images'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );
