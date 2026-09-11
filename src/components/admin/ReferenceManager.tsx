import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Image as ImageIcon, Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  getReferenceSignedUrls,
  gallerySupabase,
  REFERENCE_BRANDS,
  REFERENCE_BUCKET,
  REFERENCE_CATEGORIES,
  type GalleryItem,
  type ReferenceBrand,
  type ReferenceCategory,
} from "@/hooks/useGalleryReferences";
import {
  processReferenceImage,
  type ProcessedReferenceImage,
} from "@/lib/reference-image";

type EditorState = {
  id?: string;
  category: ReferenceCategory;
  brand: ReferenceBrand;
  title: string;
  caption: string;
  image_path: string | null;
  is_active: boolean;
  sort_order: number;
};

type ListedItem = GalleryItem & { previewUrl?: string };

const emptyEditor: EditorState = {
  category: "lakossagi-split",
  brand: "general",
  title: "",
  caption: "",
  image_path: null,
  is_active: true,
  sort_order: 0,
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const percentage = (factor: number) => {
  const change = Math.round((factor - 1) * 100);
  return change === 0 ? "nincs módosítás" : `${change > 0 ? "+" : ""}${change}%`;
};

const ReferenceManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ListedItem[]>([]);
  const [editor, setEditor] = useState<EditorState>(emptyEditor);
  const [processed, setProcessed] = useState<ProcessedReferenceImage | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await gallerySupabase
      .from("gallery_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Betöltési hiba", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const rows = (data ?? []) as GalleryItem[];
    try {
      const urls = await getReferenceSignedUrls(rows.map((item) => item.image_path));
      setItems(rows.map((item) => ({ ...item, previewUrl: urls.get(item.image_path) })));
    } catch (urlError) {
      setItems(rows);
      toast({
        title: "Az előnézetek nem tölthetők be",
        description: urlError instanceof Error ? urlError.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => () => {
    if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
  }, [localPreviewUrl]);

  const currentPreviewUrl = useMemo(() => {
    if (localPreviewUrl) return localPreviewUrl;
    return items.find((item) => item.id === editor.id)?.previewUrl ?? null;
  }, [editor.id, items, localPreviewUrl]);

  const reset = () => {
    setEditor(emptyEditor);
    setProcessed(null);
    setLocalPreviewUrl(null);
    setPrivacyConfirmed(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectFile = async (file: File) => {
    setProcessing(true);
    setProcessed(null);
    try {
      const result = await processReferenceImage(file);
      setProcessed(result);
      setLocalPreviewUrl(URL.createObjectURL(result.file));
      setPrivacyConfirmed(false);
      toast({
        title: "A kép elkészült",
        description: "Méretezés, fény- és kontrasztjavítás, valamint webes tömörítés kész.",
      });
    } catch (error) {
      toast({
        title: "A kép nem dolgozható fel",
        description: error instanceof Error ? error.message : "Ismeretlen hiba",
        variant: "destructive",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setProcessing(false);
    }
  };

  const save = async () => {
    if (!editor.title.trim()) {
      toast({ title: "Hiányzó képleírás", description: "Írd le röviden, mi látható a képen.", variant: "destructive" });
      return;
    }
    if (!editor.image_path && !processed) {
      toast({ title: "Hiányzó kép", description: "Válassz ki egy képet.", variant: "destructive" });
      return;
    }
    if (processed && !privacyConfirmed) {
      toast({
        title: "Ellenőrzés szükséges",
        description: "Jelöld be, hogy a képen nincs felismerhető személy vagy más személyes adat.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const oldPath = editor.image_path;
    let newPath: string | null = null;
    try {
      if (processed) {
        newPath = processed.file.name;
        const { error: uploadError } = await supabase.storage
          .from(REFERENCE_BUCKET)
          .upload(newPath, processed.file, {
            cacheControl: "3600",
            contentType: "image/webp",
            upsert: false,
          });
        if (uploadError) throw uploadError;
      }

      const payload = {
        category: editor.category,
        brand: editor.brand,
        title: editor.title.trim(),
        caption: editor.caption.trim() || null,
        image_path: newPath ?? oldPath as string,
        is_active: editor.is_active,
        sort_order: Math.max(-10000, Math.min(10000, Number(editor.sort_order) || 0)),
      };
      const { error: databaseError } = editor.id
        ? await gallerySupabase.from("gallery_items").update(payload).eq("id", editor.id)
        : await gallerySupabase.from("gallery_items").insert(payload);
      if (databaseError) throw databaseError;

      if (newPath && oldPath && oldPath !== newPath) {
        const { error: cleanupError } = await supabase.storage.from(REFERENCE_BUCKET).remove([oldPath]);
        if (cleanupError) {
          toast({
            title: "A referencia mentve",
            description: "A korábbi képfájl törlése nem sikerült; később kézi takarítás szükséges.",
            variant: "destructive",
          });
        }
      } else {
        toast({ title: "Referencia mentve", description: "A galéria frissült." });
      }
      reset();
      await load();
    } catch (error) {
      if (newPath) await supabase.storage.from(REFERENCE_BUCKET).remove([newPath]);
      toast({
        title: "Mentés sikertelen",
        description: error instanceof Error ? error.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: ListedItem) => {
    setEditor({
      id: item.id,
      category: item.category as ReferenceCategory,
      brand: item.brand as ReferenceBrand,
      title: item.title,
      caption: item.caption ?? "",
      image_path: item.image_path,
      is_active: item.is_active,
      sort_order: item.sort_order,
    });
    setProcessed(null);
    setLocalPreviewUrl(null);
    setPrivacyConfirmed(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (item: GalleryItem) => {
    if (!window.confirm(`Biztosan törlöd ezt a referenciát: „${item.title}”?`)) return;
    const { error } = await gallerySupabase.from("gallery_items").delete().eq("id", item.id);
    if (error) {
      toast({ title: "Törlés sikertelen", description: error.message, variant: "destructive" });
      return;
    }
    const { error: imageError } = await supabase.storage.from(REFERENCE_BUCKET).remove([item.image_path]);
    if (imageError) {
      toast({
        title: "A bejegyzés törölve",
        description: "A képfájl automatikus törlése nem sikerült; kézi takarítás szükséges.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Referencia törölve" });
    }
    if (editor.id === item.id) reset();
    await load();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            {editor.id ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editor.id ? "Referencia szerkesztése" : "Új referencia feltöltése"}
          </h2>
          <p className="text-sm text-muted-foreground">
            A kiválasztott kép automatikusan egységes méretet, finom fény- és kontrasztjavítást, valamint webes tömörítést kap.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference-category">Kategória *</Label>
              <select
                id="reference-category"
                value={editor.category}
                onChange={(event) => setEditor({ ...editor, category: event.target.value as ReferenceCategory })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {REFERENCE_CATEGORIES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference-brand">Márka</Label>
              <select
                id="reference-brand"
                value={editor.brand}
                onChange={(event) => setEditor({ ...editor, brand: event.target.value as ReferenceBrand })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {REFERENCE_BRANDS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference-title">Mi látható a képen? *</Label>
            <Input
              id="reference-title"
              value={editor.title}
              maxLength={300}
              placeholder="Például: Fujitsu kültéri egység rendezett csövezéssel"
              onChange={(event) => setEditor({ ...editor, title: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference-caption">Képaláírás</Label>
            <Textarea
              id="reference-caption"
              rows={3}
              value={editor.caption}
              maxLength={500}
              placeholder="Rövid, nyilvánosan megjelenő kiegészítés (nem kötelező)"
              onChange={(event) => setEditor({ ...editor, caption: event.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference-image">Fénykép * (JPG, PNG vagy WebP; max. 25 MB)</Label>
            <Input
              ref={fileInputRef}
              id="reference-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={processing || saving}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void selectFile(file);
              }}
            />
            {processing && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> A kép javítása folyamatban…</p>}
          </div>

          {processed && (
            <div className="rounded-xl bg-secondary/60 p-4 text-sm space-y-1">
              <p className="font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Automatikus javítás elkészült</p>
              <p>{processed.originalWidth}×{processed.originalHeight} → {processed.width}×{processed.height} képpont</p>
              <p>{formatBytes(processed.originalBytes)} → {formatBytes(processed.file.size)}</p>
              <p>Fényerő: {percentage(processed.brightness)} · Kontraszt: {percentage(processed.contrast)}</p>
              <p>A helyadatok és más fényképadatok eltávolítva.</p>
            </div>
          )}

          {processed && (
            <label className="flex items-start gap-3 rounded-xl border border-border/60 p-4 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={privacyConfirmed}
                onChange={(event) => setPrivacyConfirmed(event.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>Ellenőriztem: a képen nincs felismerhető személy, rendszám, pontos cím vagy más személyes adat.</span>
            </label>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference-order">Sorrend</Label>
              <Input
                id="reference-order"
                type="number"
                min={-10000}
                max={10000}
                value={editor.sort_order}
                onChange={(event) => setEditor({ ...editor, sort_order: Number(event.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference-active">Megjelenjen a honlapon</Label>
              <div className="h-10 flex items-center">
                <Switch id="reference-active" checked={editor.is_active} onCheckedChange={(value) => setEditor({ ...editor, is_active: value })} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={() => void save()} disabled={saving || processing}>
              {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mentés…</> : <><Upload className="w-4 h-4 mr-2" /> Mentés</>}
            </Button>
            {editor.id && <Button variant="outline" onClick={reset}>Mégse</Button>}
          </div>
        </section>

        <section className="rounded-2xl border border-border/50 bg-card p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4"><ImageIcon className="w-4 h-4" /> Előnézet</h2>
          {currentPreviewUrl ? (
            <figure className="overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
              <img src={currentPreviewUrl} alt={editor.title || "Referencia előnézete"} className="w-full h-auto max-h-[520px] object-contain" />
              {(editor.title || editor.caption) && (
                <figcaption className="p-4">
                  <p className="font-medium">{editor.title}</p>
                  {editor.caption && <p className="text-sm text-muted-foreground mt-1">{editor.caption}</p>}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className="min-h-64 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground text-center p-6">
              <ImageIcon className="w-10 h-10 mb-3" />
              <p>A kiválasztott és automatikusan javított kép itt jelenik meg.</p>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-border/50 bg-card p-6">
        <h2 className="font-semibold text-foreground mb-4">Feltöltött referenciák ({items.length})</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Betöltés…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Még nincs az új kezelőből feltöltött referencia.</p>
        ) : (
          <ul className="divide-y divide-border/60">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {item.previewUrl ? <img src={item.previewUrl} alt="" className="w-16 h-12 rounded-md object-cover shrink-0" /> : <div className="w-16 h-12 rounded-md bg-secondary shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-medium truncate">#{item.sort_order} — {item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{REFERENCE_CATEGORIES.find((entry) => entry.value === item.category)?.label ?? item.category} · {REFERENCE_BRANDS.find((entry) => entry.value === item.brand)?.label ?? item.brand} · {item.is_active ? "Látható" : "Elrejtve"}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" aria-label={`Referencia szerkesztése: ${item.title}`} onClick={() => edit(item)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" aria-label={`Referencia törlése: ${item.title}`} onClick={() => void remove(item)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ReferenceManager;
