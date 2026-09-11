import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export const REFERENCE_BUCKET = "reference-images";
export const REFERENCE_SIGNED_URL_TTL_SECONDS = 60 * 60;

export const REFERENCE_CATEGORIES = [
  { value: "lakossagi-split", label: "Lakossági split / multi-split" },
  { value: "hoszivattyu", label: "Hőszivattyú" },
  { value: "legcsatornazhato", label: "Légcsatornázható rendszer" },
  { value: "karbantartas", label: "Karbantartás és klímamosás" },
  { value: "ipari-hutes", label: "Ipari hűtés / chiller / VRF" },
  { value: "legtechnika", label: "Légtechnika / AHU" },
] as const;

export const REFERENCE_BRANDS = [
  { value: "general", label: "Általános / egyéb" },
  { value: "fujitsu", label: "Fujitsu" },
  { value: "fisher", label: "Fisher" },
] as const;

export type ReferenceCategory = (typeof REFERENCE_CATEGORIES)[number]["value"];
export type ReferenceBrand = (typeof REFERENCE_BRANDS)[number]["value"];
export type GalleryItem = {
  id: string;
  category: string;
  brand: string;
  title: string;
  caption: string | null;
  image_path: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type GalleryItemInsert = Omit<GalleryItem, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type GalleryDatabase = Omit<Database, "public"> & {
  public: Omit<Database["public"], "Tables"> & {
    Tables: Database["public"]["Tables"] & {
      gallery_items: {
        Row: GalleryItem;
        Insert: GalleryItemInsert;
        Update: Partial<GalleryItemInsert>;
        Relationships: [];
      };
    };
  };
};

export const gallerySupabase = supabase as unknown as SupabaseClient<GalleryDatabase>;

export type ReferenceMedia = {
  src: string;
  alt: string;
  title?: string;
  type: "image";
};

export const getReferenceSignedUrls = async (paths: string[]) => {
  if (paths.length === 0) return new Map<string, string>();
  const { data, error } = await gallerySupabase.storage
    .from(REFERENCE_BUCKET)
    .createSignedUrls(paths, REFERENCE_SIGNED_URL_TTL_SECONDS);
  if (error) throw error;
  return new Map(
    (data ?? [])
      .filter((item): item is typeof item & { signedUrl: string } => Boolean(item.signedUrl))
      .map((item) => [item.path, item.signedUrl]),
  );
};

export const loadGalleryReferences = async (
  categories: readonly string[],
  brand?: ReferenceBrand,
): Promise<ReferenceMedia[]> => {
  if (categories.length === 0) return [];
  let query = gallerySupabase
    .from("gallery_items")
    .select("*")
    .eq("is_active", true)
    .in("category", [...categories])
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (brand) query = query.eq("brand", brand);
  const { data, error } = await query;
  if (error) throw error;
  const items = (data ?? []) as GalleryItem[];
  const urls = await getReferenceSignedUrls(items.map((item) => item.image_path));
  return items.flatMap((item) => {
    const src = urls.get(item.image_path);
    return src
      ? [{ src, alt: item.title, title: item.caption ?? undefined, type: "image" as const }]
      : [];
  });
};
