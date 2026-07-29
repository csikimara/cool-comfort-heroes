import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Promotion = {
  id: string;
  title: string;
  description: string | null;
  button_label: string | null;
  button_url: string | null;
  image_path: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
  sort_order: number;
};

export const PROMO_BUCKET = "promo-images";

export async function getPromoImageUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabase.storage.from(PROMO_BUCKET).createSignedUrl(path, 60 * 60 * 24);
  return data?.signedUrl ?? null;
}

const isCurrent = (p: Promotion) => {
  const today = new Date().toISOString().slice(0, 10);
  if (p.starts_at && p.starts_at > today) return false;
  if (p.ends_at && p.ends_at < today) return false;
  return p.is_active;
};

/** Public promotions: only active items inside their date range, in the configured order. */
export function usePublicPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (cancelled) return;
      const rows = ((data ?? []) as Promotion[]).filter(isCurrent);
      if (error) {
        setPromotions([]);
      } else {
        setPromotions(rows);
        const entries = await Promise.all(
          rows
            .filter((r) => r.image_path)
            .map(async (r) => [r.id, await getPromoImageUrl(r.image_path)] as const),
        );
        if (!cancelled) {
          setImages(
            Object.fromEntries(entries.filter(([, url]) => !!url) as [string, string][]),
          );
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { promotions, images, loading };
}