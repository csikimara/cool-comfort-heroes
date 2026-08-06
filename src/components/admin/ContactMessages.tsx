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
import { Download, Loader2, Mail, Paperclip, Phone } from "lucide-react";

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

export type ContactMessage = {
  id: string;
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
  "id,name,email,phone,message,created_at,source,page_url,attachment_name,attachment_size,attachment_mime,attachment_path";

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

/**
 * Creates a short-lived signed URL for an attachment.
 * The path must come from an RLS-protected contact_messages record.
 */
export const createAttachmentSignedUrl = async (
  path: string,
): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from(ATTACHMENT_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
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

  const load = useCallback(
    async (pageIndex: number) => {
      setLoading(true);
      const from = pageIndex * PAGE_SIZE;
      const { data, error, count } = await supabase
        .from("contact_messages")
        .select(CONTACT_MESSAGE_COLUMNS, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      setLoading(false);
      if (error) {
        toast({
          title: "Betöltési hiba",
          description: "A megkeresések betöltése nem sikerült.",
          variant: "destructive",
        });
        return;
      }
      setItems((data ?? []) as ContactMessage[]);
      setTotal(count ?? 0);
    },
    [toast],
  );

  useEffect(() => {
    load(page);
  }, [load, page]);

  // Deep link from the internal notification e-mail: /admin?megkereses=<uuid>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("megkereses");
    if (!id || items.length === 0) return;
    const match = items.find((m) => m.id === id);
    if (match) setSelected(match);
  }, [items]);

  const openAttachment = async (message: ContactMessage) => {
    if (!message.attachment_path) return;
    setDownloading(true);
    const url = await createAttachmentSignedUrl(message.attachment_path);
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

  const lastPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);

  return (
    <section className="rounded-2xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <h2 className="font-semibold text-foreground">
          Megkeresések {total > 0 && <span className="text-muted-foreground font-normal">({total})</span>}
        </h2>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
      </div>

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
                    Csatolmány megnyitása
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    A hivatkozás 5 percig érvényes, és csak Neked készül.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Ehhez az üzenethez nem tartozik csatolmány.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactMessages;
