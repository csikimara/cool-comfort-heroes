import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { Loader2, LogOut, Plus, Trash2, Pencil, Eye } from "lucide-react";
import { getPromoImageUrl, PROMO_BUCKET, type Promotion } from "@/hooks/usePromotions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactMessages from "@/components/admin/ContactMessages";
import { safePromotionUrl } from "@/lib/promotion-url";
import {
  ADMIN_IDLE_TIMEOUT_MS,
  clearAdminActivity,
  isAdminSessionIdle,
  readAdminLastActivity,
  recordAdminActivity,
} from "@/lib/admin-session";

type FormState = {
  id?: string;
  title: string;
  description: string;
  button_label: string;
  button_url: string;
  image_path: string | null;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  sort_order: number;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  button_label: "",
  button_url: "",
  image_path: null,
  starts_at: "",
  ends_at: "",
  is_active: true,
  sort_order: 0,
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState<Promotion[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const signOutAdmin = useCallback(async () => {
    clearAdminActivity();
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }, [navigate]);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("promotions")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      toast({ title: "Betöltési hiba", description: error.message, variant: "destructive" });
      return;
    }
    setItems((data ?? []) as Promotion[]);
  }, [toast]);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      if (!roles) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      const { data: assurance, error: assuranceError } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (!active) return;
      if (assuranceError || assurance?.currentLevel !== "aal2") {
        navigate("/auth?mfa=required", { replace: true });
        return;
      }

      if (isAdminSessionIdle()) {
        clearAdminActivity();
        await supabase.auth.signOut();
        navigate("/auth?reason=idle", { replace: true });
        return;
      }

      recordAdminActivity();
      setIsAdmin(true);
      setChecking(false);
      load();
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        clearAdminActivity();
        navigate("/auth", { replace: true });
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, load]);

  useEffect(() => {
    if (!isAdmin) return;

    let lastActivityAt = readAdminLastActivity() ?? Date.now();
    let timeoutId: number | undefined;
    let expiring = false;

    const expireSession = () => {
      if (expiring) return;
      expiring = true;
      window.clearTimeout(timeoutId);
      clearAdminActivity();
      void supabase.auth.signOut().finally(() => {
        navigate("/auth?reason=idle", { replace: true });
      });
    };

    const scheduleCheck = () => {
      window.clearTimeout(timeoutId);
      const remaining = Math.max(
        0,
        ADMIN_IDLE_TIMEOUT_MS - (Date.now() - lastActivityAt),
      );
      timeoutId = window.setTimeout(() => {
        if (Date.now() - lastActivityAt >= ADMIN_IDLE_TIMEOUT_MS) {
          expireSession();
          return;
        }
        scheduleCheck();
      }, remaining);
    };

    const recordActivity = () => {
      const now = Date.now();
      if (now - lastActivityAt >= ADMIN_IDLE_TIMEOUT_MS) {
        expireSession();
        return;
      }
      lastActivityAt = now;
      recordAdminActivity(lastActivityAt);
      scheduleCheck();
    };
    const checkAfterVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastActivityAt >= ADMIN_IDLE_TIMEOUT_MS) {
        expireSession();
        return;
      }
      scheduleCheck();
    };

    for (const event of ["pointerdown", "keydown", "touchstart"] as const) {
      window.addEventListener(event, recordActivity, { passive: true });
    }
    document.addEventListener("visibilitychange", checkAfterVisibilityChange);
    scheduleCheck();

    return () => {
      window.clearTimeout(timeoutId);
      for (const event of ["pointerdown", "keydown", "touchstart"] as const) {
        window.removeEventListener(event, recordActivity);
      }
      document.removeEventListener("visibilitychange", checkAfterVisibilityChange);
    };
  }, [isAdmin, navigate]);

  useEffect(() => {
    let cancelled = false;
    getPromoImageUrl(form.image_path).then((url) => {
      if (!cancelled) setPreviewUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [form.image_path]);

  const handleUpload = async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ title: "Nem támogatott formátum", description: "JPG, PNG vagy WebP kép tölthető fel.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast({ title: "Túl nagy fájl", description: "A kép legfeljebb 5 MB lehet.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = IMAGE_EXTENSIONS[file.type];
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(PROMO_BUCKET).upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
    });
    setUploading(false);
    if (error) {
      toast({ title: "Feltöltés sikertelen", description: error.message, variant: "destructive" });
      return;
    }
    setForm((f) => ({ ...f, image_path: path }));
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast({ title: "Hiányzó cím", description: "Az akció címe kötelező.", variant: "destructive" });
      return;
    }
    const buttonUrl = form.button_url.trim();
    if (buttonUrl && !safePromotionUrl(buttonUrl)) {
      toast({
        title: "Érvénytelen célhivatkozás",
        description: "Belső /útvonal, #szakasz, biztonságos https://, tel: vagy mailto: hivatkozás adható meg.",
        variant: "destructive",
      });
      return;
    }
    if (!!form.button_label.trim() !== !!buttonUrl) {
      toast({
        title: "Hiányos gombadatok",
        description: "A gombfeliratot és a célhivatkozást együtt kell megadni.",
        variant: "destructive",
      });
      return;
    }
    if (form.starts_at && form.ends_at && form.starts_at > form.ends_at) {
      toast({
        title: "Érvénytelen időszak",
        description: "A befejező dátum nem lehet korábbi a kezdő dátumnál.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      button_label: form.button_label.trim() || null,
      button_url: safePromotionUrl(buttonUrl),
      image_path: form.image_path,
      starts_at: form.starts_at || null,
      ends_at: form.ends_at || null,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    };
    const { error } = form.id
      ? await supabase.from("promotions").update(payload).eq("id", form.id)
      : await supabase.from("promotions").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Mentés sikertelen", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Mentve", description: "Az akció elmentve." });
    setForm(emptyForm);
    load();
  };

  const remove = async (promotion: Promotion) => {
    if (!window.confirm(`Biztosan törli ezt az akciót: „${promotion.title}”?`)) return;

    const { error } = await supabase.from("promotions").delete().eq("id", promotion.id);
    if (error) {
      toast({ title: "Törlés sikertelen", description: error.message, variant: "destructive" });
      return;
    }
    if (promotion.image_path) {
      const { error: imageError } = await supabase.storage
        .from(PROMO_BUCKET)
        .remove([promotion.image_path]);
      if (imageError) {
        toast({
          title: "Az akció törölve",
          description: "A hozzá tartozó kép automatikus törlése nem sikerült; kézi takarítás szükséges.",
          variant: "destructive",
        });
      }
    }
    if (form.id === promotion.id) setForm(emptyForm);
    load();
  };

  const edit = (p: Promotion) =>
    setForm({
      id: p.id,
      title: p.title,
      description: p.description ?? "",
      button_label: p.button_label ?? "",
      button_url: p.button_url ?? "",
      image_path: p.image_path,
      starts_at: p.starts_at ?? "",
      ends_at: p.ends_at ?? "",
      is_active: p.is_active,
      sort_order: p.sort_order,
    });

  if (checking) {
    return (
      <main id="main-content" tabIndex={-1} className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" aria-label="Adminjogosultság ellenőrzése" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <SEOHead title="Nincs jogosultság | Northwind" description="Adminfelület" noindex />
        <h1 className="text-2xl font-bold text-foreground">Nincs admin jogosultságod</h1>
        <p className="text-muted-foreground max-w-md">
          A fiókod be van jelentkezve, de nincs admin szerepköre. Kérd meg a rendszergazdát, hogy adja hozzá.
        </p>
        <Button variant="outline" onClick={signOutAdmin}>Kijelentkezés</Button>
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-secondary/40 py-10 px-4">
      <SEOHead title="Akciók kezelése | Northwind" description="Adminfelület az akciók és bannerek kezeléséhez." noindex />
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Adminfelület</h1>
          <Button variant="outline" size="sm" onClick={signOutAdmin}>
            <LogOut className="w-4 h-4 mr-2" /> Kijelentkezés
          </Button>
        </div>

        <Tabs
          defaultValue={
            new URLSearchParams(window.location.search).has("megkereses")
              ? "megkeresesek"
              : "akciok"
          }
        >
          <TabsList className="mb-6">
            <TabsTrigger value="akciok">Akciók és bannerek</TabsTrigger>
            <TabsTrigger value="megkeresesek">Megkeresések</TabsTrigger>
          </TabsList>

          <TabsContent value="akciok" className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <section className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              {form.id ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {form.id ? "Akció szerkesztése" : "Új akció"}
            </h2>

            <div className="space-y-2">
              <Label htmlFor="title">Cím *</Label>
              <Input id="title" value={form.title} maxLength={120}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Rövid leírás</Label>
              <Textarea id="desc" rows={3} value={form.description} maxLength={600}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="btn">Gombfelirat</Label>
                <Input id="btn" value={form.button_label} maxLength={60}
                  onChange={(e) => setForm({ ...form, button_label: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Célhivatkozás</Label>
                <Input id="url" value={form.button_url} maxLength={500} placeholder="/fujitsu vagy #kapcsolat"
                  onChange={(e) => setForm({ ...form, button_url: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from">Kezdő dátum</Label>
                <Input id="from" type="date" value={form.starts_at}
                  onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">Befejező dátum</Label>
                <Input id="to" type="date" value={form.ends_at}
                  onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Sorrend</Label>
                <Input id="order" type="number" min={-10000} max={10000} value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="active">Aktív</Label>
                <div className="h-10 flex items-center">
                  <Switch id="active" checked={form.is_active}
                    onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="img">Kép (JPG/PNG/WebP, max. 5 MB)</Label>
              <Input id="img" type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }} />
              {form.image_path && (
                <button type="button" className="text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => setForm({ ...form, image_path: null })}>
                  Kép eltávolítása
                </button>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={save} disabled={saving || uploading}>
                {saving ? "Mentés…" : "Mentés"}
              </Button>
              {form.id && (
                <Button variant="outline" onClick={() => setForm(emptyForm)}>Mégse</Button>
              )}
            </div>
          </section>

          {/* Preview */}
          <section className="rounded-2xl border border-border/50 bg-card p-6">
            <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4" /> Előnézet
            </h2>
            <article className="rounded-3xl overflow-hidden border border-border/50 bg-gradient-card shadow-elevated">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={form.title || "Előnézet"}
                  width={1200}
                  height={600}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{form.title || "Akció címe"}</h3>
                {form.description && (
                  <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{form.description}</p>
                )}
                {form.button_label && <Button className="w-full">{form.button_label}</Button>}
              </div>
            </article>
          </section>
        </div>

        {/* List */}
        <section className="rounded-2xl border border-border/50 bg-card p-6">
          <h2 className="font-semibold text-foreground mb-4">Meglévő akciók ({items.length})</h2>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">Még nincs rögzített akció.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {items.map((p) => (
                <li key={p.id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">
                      #{p.sort_order} — {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.is_active ? "Aktív" : "Kikapcsolva"}
                      {p.starts_at || p.ends_at ? ` · ${p.starts_at ?? "…"} – ${p.ends_at ?? "…"}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label={`Akció szerkesztése: ${p.title}`}
                      onClick={() => edit(p)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      aria-label={`Akció törlése: ${p.title}`}
                      onClick={() => remove(p)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
          </TabsContent>

          <TabsContent value="megkeresesek">
            <ContactMessages />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
