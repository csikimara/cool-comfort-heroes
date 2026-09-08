import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  isLegalHoldActive,
  retentionEligibilityFilter,
} from "@/lib/contact-retention";
import { Download, Loader2, Mail, Paperclip, Phone, ShieldAlert, Trash2 } from "lucide-react";

/**
 * "Megkeresések" admin module.
 *
 * Security notes:
 * - Reads go through the anon client, so the admin-only RLS SELECT policy on
 *   public.contact_messages is the real protection layer.
 * - Attachment paths never appear in markup, links or logs. A signed URL is
 *   created on click only, valid for 5 minutes, and never persisted.
 */

export const ATTACHMENT_BUCKET = "contact-attachments";
/** Signed URLs for private attachments are valid for 5 minutes. */
export const SIGNED_URL_TTL_SECONDS = 300;
export const PAGE_SIZE = 10;
const CONTACT_RETENTION_YEARS = 2;

const retentionCutoffIso = (now = new Date()): string => {
  const cutoff = new Date(now);
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - CONTACT_RETENTION_YEARS);
  return cutoff.toISOString();
};

export type ContactMessage = {
  id: string;
  is_consumer_complaint: boolean;
  legal_hold_until: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  source: string | null;
  page_url: string | null;
  attachment_name: string | null;
  attachment_size: number | null;
  attachment_mime: string | null;
  attachment_path: string | null;
};

/** Only these columns are selected — no internal hashes reach the browser. */
export const CONTACT_MESSAGE_COLUMNS =
  "id,name,email,phone,message,created_at,source,page_url,attachment_name,attachment_size,attachment_mime,attachment_path,is_consumer_complaint,legal_hold_until";

export const formatHungarianDate = (iso: string): string =>
  new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Budapest",
  }).format(new Date(iso));

export const formatFileSize = (bytes: number | null): string =>
  bytes ? `${Math.max(1, Math.round(bytes / 1024))} KB` : "";

export const hasAttachment = (m: ContactMessage): boolean =>
  !!m.attachment_path && !!m.attachment_name;

/** Keeps legacy database values out of the signed URL download parameter. */
export const safeAttachmentDownloadName = (name?: string | null): string | true => {
  const cleaned = (name ?? "")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N} ._-]+/gu, "_")
    .replace(/^\.+/, "")
    .trim()
    .slice(0, 120);
  return cleaned || true;
};

/**
 * Creates a short-lived signed URL for an attachment.
 * The path must come from an RLS-protected contact_messages record.
 */
export const createAttachmentSignedUrl = async (
  path: string,
  downloadName?: string | null,
): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from(ATTACHMENT_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS, {
      download: safeAttachmentDownloadName(downloadName),
    });
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
};

const ContactMessages = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [markingComplaint, setMarkingComplaint] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);

  const load = useCallback(
    async (pageIndex: number) => {
      setLoading(true);
      const from = pageIndex * PAGE_SIZE;
      const [messagesResult, retentionResult] = await Promise.all([
        supabase
          .from("contact_messages")
          .select(CONTACT_MESSAGE_COLUMNS, { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, from + PAGE_SIZE - 1),
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .lt("created_at", retentionCutoffIso())
          .or(retentionEligibilityFilter()),
      ]);
      setLoading(false);
      if (messagesResult.error || retentionResult.error) {
        toast({
          title: "Betöltési hiba",
          description: "A megkeresések betöltése nem sikerült.",
          variant: "destructive",
        });
        return;
      }
      setItems((messagesResult.data ?? []) as unknown as ContactMessage[]);
      setTotal(messagesResult.count ?? 0);
      setExpiredCount(retentionResult.count ?? 0);
    },
    [toast],
  );

  useEffect(() => {
    load(page);
  }, [load, page]);

  // Deep link from the internal notification e-mail: /admin?megkereses=<uuid>.
  // Query the RLS-protected record directly so older messages outside page 1
  // can still be opened.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("megkereses");
    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return;
    }
    let cancelled = false;
    supabase
      .from("contact_messages")
      .select(CONTACT_MESSAGE_COLUMNS)
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setSelected(data as unknown as ContactMessage);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openAttachment = async (message: ContactMessage) => {
    if (!message.attachment_path) return;
    setDownloading(true);
    const url = await createAttachmentSignedUrl(message.attachment_path, message.attachment_name);
    setDownloading(false);
    if (!url) {
      toast({
        title: "A csatolmány nem elérhető",
        description:
          "A fájl időközben törlődött, vagy nincs jogosultságod a megnyitásához.",
        variant: "destructive",
      });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const removeAttachments = async (paths: string[]): Promise<boolean> => {
    for (let index = 0; index < paths.length; index += 100) {
      const { error } = await supabase.storage
        .from(ATTACHMENT_BUCKET)
        .remove(paths.slice(index, index + 100));
      if (error) return false;
    }
    return true;
  };

  const deleteSelectedMessage = async () => {
    if (!selected) return;
    if (isLegalHoldActive(selected)) {
      toast({
        title: "Jogi megőrzés alatt",
        description: "A fogyasztói panasz és csatolmánya az aktív kötelező megőrzési idő alatt nem törölhető.",
        variant: "destructive",
      });
      return;
    }
    const confirmed = window.confirm(
      "Biztosan végleg törlöd ezt a megkeresést és a hozzá tartozó csatolmányt?",
    );
    if (!confirmed) return;

    setDeleting(true);
    // Delete the RLS-protected database row first and ask PostgREST which row
    // was actually removed. This prevents attachment loss if the row delete is
    // rejected (for example because a legal hold became active meanwhile).
    const { data: deleted, error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", selected.id)
      .select("id,attachment_path")
      .maybeSingle();
    if (error || !deleted) {
      setDeleting(false);
      toast({
        title: "Törlés sikertelen",
        description: "A megkeresés nem törölhető; ellenőrizze a jogi megőrzési státuszt.",
        variant: "destructive",
      });
      return;
    }

    const attachmentRemoved = !deleted.attachment_path
      || await removeAttachments([deleted.attachment_path]);
    setDeleting(false);
    setSelected(null);
    toast(attachmentRemoved
      ? { title: "Megkeresés törölve" }
      : {
          title: "A megkeresés törölve",
          description: "A csatolmány takarítása nem sikerült; kézi Storage-ellenőrzés szükséges.",
          variant: "destructive",
        });
    await load(page);
  };

  const deleteExpiredMessages = async () => {
    if (expiredCount === 0) return;
    const confirmed = window.confirm(
      `Biztosan végleg törlöd a 2 évnél régebbi megkereséseket (${expiredCount} db) és a csatolmányaikat?`,
    );
    if (!confirmed) return;

    setDeleting(true);
    const { data, error: selectError } = await supabase
      .from("contact_messages")
      .select("id,attachment_path")
      .lt("created_at", retentionCutoffIso())
      .or(retentionEligibilityFilter())
      .limit(500);
    if (selectError) {
      setDeleting(false);
      toast({
        title: "Törlés sikertelen",
        description: "A lejárt megkeresések lekérdezése nem sikerült.",
        variant: "destructive",
      });
      return;
    }

    const expired = (data ?? []) as Array<{ id: string; attachment_path: string | null }>;
    const ids = expired.map((message) => message.id);
    const { data: deletedRows, error: deleteError } = ids.length
      ? await supabase
          .from("contact_messages")
          .delete()
          .in("id", ids)
          .select("id,attachment_path")
      : { data: [], error: null };
    if (deleteError) {
      setDeleting(false);
      toast({
        title: "Törlés sikertelen",
        description: "A lejárt megkeresések törlése nem sikerült.",
        variant: "destructive",
      });
      return;
    }

    // RLS may have excluded a row whose legal hold changed after the initial
    // list query. Remove files only for rows confirmed as deleted above.
    const deleted = (deletedRows ?? []) as Array<{ id: string; attachment_path: string | null }>;
    const paths = deleted
      .map((message) => message.attachment_path)
      .filter((path): path is string => !!path);
    const attachmentsRemoved = await removeAttachments(paths);
    setDeleting(false);
    setPage(0);
    toast(attachmentsRemoved
      ? {
          title: "Lejárt adatok törölve",
          description: `${deleted.length} megkeresés és a hozzájuk tartozó csatolmányok törlődtek.`,
        }
      : {
          title: "A lejárt megkeresések törölve",
          description: `${deleted.length} rekord törlődött, de egy vagy több árva csatolmány kézi Storage-ellenőrzést igényel.`,
          variant: "destructive",
        });
    await load(0);
  };

  const markConsumerComplaint = async () => {
    if (!selected || selected.is_consumer_complaint) return;
    const confirmed = window.confirm(
      "Fogyasztói panaszként jelölöd? A beérkezéstől számított 3 év 31 napos jogi zárolás a felületen nem oldható fel.",
    );
    if (!confirmed) return;

    setMarkingComplaint(true);
    // A generált adatbázis-típusok nem tartalmazzák ezt az RPC-t, ezért lazán
    // tipizált hívást használunk (a függvény a migrációkban létezik).
    const rpc = (supabase as unknown as {
      rpc: (
        fn: string,
        args: Record<string, unknown>,
      ) => Promise<{ error: { message: string } | null }>;
    }).rpc;
    const { error } = await rpc("set_contact_message_complaint_status", {
      p_id: selected.id,
      p_is_complaint: true,
    });
    setMarkingComplaint(false);
    if (error) {
      toast({
        title: "A besorolás nem sikerült",
        description: "A megkeresés megőrzési státusza nem változott.",
        variant: "destructive",
      });
      return;
    }
    setSelected(null);
    toast({
      title: "Fogyasztói panaszként megjelölve",
    });
    await load(page);
  };

  const lastPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);

  return (
    <section className="rounded-2xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <h2 className="font-semibold text-foreground">
          Megkeresések {total > 0 && <span className="text-muted-foreground font-normal">({total})</span>}
        </h2>
        <div className="flex items-center gap-3">
          {expiredCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              disabled={deleting || loading}
              onClick={deleteExpiredMessages}
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Lejárt adatok törlése ({expiredCount})
            </Button>
          )}
          {loading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Adatmegőrzés: az általános megkeresések 2 év után törlésre esedékesek; a negyedéves felülvizsgálati ciklus felső határa 27 hónap. A megjelölt fogyasztói panaszokat és csatolmányaikat az aktív jogi zárolás alatt a rutin törlés kihagyja.
      </p>

      {!loading && items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Még nem érkezett megkeresés.</p>
      ) : (
        <ul className="divide-y divide-border/60">
          {items.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setSelected(m)}
                className="w-full text-left py-4 hover:bg-secondary/40 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      {formatHungarianDate(m.created_at)}
                    </p>
                    <p className="font-medium text-foreground truncate">{m.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{m.email}</p>
                    {m.phone && (
                      <p className="text-sm text-muted-foreground truncate">{m.phone}</p>
                    )}
                    <p className="text-sm text-foreground/80 mt-1 line-clamp-2">
                      {m.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {m.source && <Badge variant="secondary">{m.source}</Badge>}
                    {m.is_consumer_complaint && (
                      <Badge variant="destructive" className="gap-1">
                        <ShieldAlert className="w-3 h-3" /> Fogyasztói panasz
                      </Badge>
                    )}
                    {hasAttachment(m) && (
                      <Badge variant="outline" className="gap-1">
                        <Paperclip className="w-3 h-3" /> Csatolmány
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between gap-3 mt-4">
          <Button variant="outline" size="sm" disabled={page === 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}>
            Előző
          </Button>
          <span className="text-xs text-muted-foreground">
            {page + 1}. / {lastPage + 1} oldal
          </span>
          <Button variant="outline" size="sm" disabled={page >= lastPage || loading}
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}>
            Következő
          </Button>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-left">{selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                {formatHungarianDate(selected.created_at)}
              </p>
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-foreground break-all">
                  <Mail className="w-4 h-4 shrink-0 text-muted-foreground" />
                  {selected.email}
                </p>
                {selected.phone && (
                  <p className="flex items-center gap-2 text-foreground">
                    <Phone className="w-4 h-4 shrink-0 text-muted-foreground" />
                    {selected.phone}
                  </p>
                )}
              </div>
              <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-muted-foreground">
                {selected.source && (
                  <>
                    <dt>Forrás:</dt>
                    <dd className="text-foreground break-all">{selected.source}</dd>
                  </>
                )}
                {selected.page_url && (
                  <>
                    <dt>Oldal:</dt>
                    <dd className="text-foreground break-all">{selected.page_url}</dd>
                  </>
                )}
              </dl>
              <div className="rounded-xl bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground mb-2">Üzenet</p>
                <p className="text-foreground whitespace-pre-line break-words">
                  {selected.message}
                </p>
              </div>
              {selected.is_consumer_complaint && selected.legal_hold_until && (
                <p className="text-xs text-destructive">
                  Fogyasztói panasz: rutin törléssel nem távolítható el eddig: {formatHungarianDate(selected.legal_hold_until)}.
                </p>
              )}
              {hasAttachment(selected) ? (
                <div className="space-y-2">
                  <p className="text-muted-foreground break-all">
                    <Paperclip className="w-4 h-4 inline mr-1" />
                    {selected.attachment_name}
                    {selected.attachment_size ? ` · ${formatFileSize(selected.attachment_size)}` : ""}
                  </p>
                  <Button
                    className="w-full"
                    disabled={downloading}
                    onClick={() => openAttachment(selected)}
                  >
                    {downloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Csatolmány letöltése
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    A hivatkozás 5 percig érvényes, és csak Neked készül. A rendszer
                    fájltípus-aláírást ellenőriz, de vírusellenőrzést nem végez; a fájlt
                    csak naprakész, védett eszközön nyisd meg.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Ehhez az üzenethez nem tartozik csatolmány.</p>
              )}
              <Button
                variant="outline"
                className="w-full"
                disabled={markingComplaint || deleting || selected.is_consumer_complaint}
                onClick={markConsumerComplaint}
              >
                {markingComplaint ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ShieldAlert className="w-4 h-4 mr-2" />
                )}
                {selected.is_consumer_complaint
                  ? "Panaszbesorolás jogilag zárolva"
                  : "Fogyasztói panaszként megjelölés"}
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                disabled={deleting || isLegalHoldActive(selected)}
                onClick={deleteSelectedMessage}
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                {isLegalHoldActive(selected) ? "Jogi megőrzés alatt" : "Megkeresés végleges törlése"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactMessages;
