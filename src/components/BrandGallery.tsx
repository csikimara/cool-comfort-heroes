import { useEffect, useMemo, useState } from "react";
import { Images, Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GALLERY_BASE_URL,
  isGalleryVideoUrl,
  MAX_GALLERY_ITEMS_PER_MANIFEST,
  readGalleryManifestText,
  safeGalleryMediaUrl,
} from "@/lib/gallery-media-url";

type Manifest = {
  images?: Array<string | { src: string; alt?: string; caption?: string }>;
  files?: string[];
};

type LoadedMedia = {
  src: string;
  alt: string;
  title?: string;
  type: "image" | "video";
};

interface BrandGalleryProps {
  /** Folder slug under https://northwind.hu/galeria/ (e.g. "lakossagi-split"). */
  slug: string;
  /** Filename prefix to filter by (e.g. "fisher_", "fujitsu_"). */
  filenamePrefix: string;
  /** Section title shown above the grid. */
  title: string;
  /** Optional subtitle/eyebrow above the title. */
  eyebrow?: string;
  /** Optional descriptive paragraph under the title. */
  description?: string;
  /** Brand accent color (hex), defaults to Northwind Navy Blue. */
  accent?: string;
  /** Section background tailwind class. */
  bgClassName?: string;
  /** Default alt text used when manifest entries omit one. */
  defaultAlt?: string;
  /** When true, render a single centered CTA button that opens the lightbox. */
  buttonOnly?: boolean;
  /** Custom label for the CTA button (buttonOnly mode). */
  buttonLabel?: string;
  /** When true (with buttonOnly), render only the button + lightbox/modal,
   *  without the surrounding `<section>` wrapper, so the button can sit inline
   *  next to other CTAs. */
  inline?: boolean;
  /** Extra classes for the inline button (buttonOnly mode). */
  buttonClassName?: string;
}

const GALLERY_FETCH_TIMEOUT_MS = 10_000;

const getFilename = (src: string) => {
  const cleaned = src.split("?")[0].split("#")[0];
  const parts = cleaned.split("/");
  return parts[parts.length - 1] ?? "";
};

const BrandGallery = ({
  slug,
  filenamePrefix,
  title,
  eyebrow,
  description,
  accent = "#1f3d66",
  bgClassName = "bg-white",
  defaultAlt,
  buttonOnly = false,
  buttonLabel,
  inline = false,
  buttonClassName,
}: BrandGalleryProps) => {
  const [images, setImages] = useState<LoadedMedia[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [showEmptyNotice, setShowEmptyNotice] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImages([]);

    if (!/^[a-z0-9-]{1,80}$/i.test(slug)) {
      setStatus("empty");
      return () => {
        cancelled = true;
      };
    }

    const folder = `${GALLERY_BASE_URL}/${slug}`;
    const altFallback = defaultAlt ?? title;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      GALLERY_FETCH_TIMEOUT_MS,
    );

    fetch(`${folder}/index.php`, {
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await readGalleryManifestText(res);
        const raw: Manifest | string[] = JSON.parse(text);
        if (!Array.isArray(raw) && (raw === null || typeof raw !== "object")) {
          throw new Error("Invalid gallery manifest");
        }
        const data: Manifest = Array.isArray(raw)
          ? { images: raw }
          : { images: raw.images ?? raw.files ?? [] };
        if (!Array.isArray(data.images)) {
          throw new Error("Invalid gallery manifest items");
        }
        if (cancelled) return;

        const list = data.images
          .slice(0, MAX_GALLERY_ITEMS_PER_MANIFEST)
          .map((item) => {
            if (
              typeof item !== "string" &&
              (item === null || typeof item !== "object" || typeof item.src !== "string")
            ) {
              return null;
            }
            const source = typeof item === "string" ? item : item.src;
            const src = safeGalleryMediaUrl(slug, source);
            if (!src) return null;
            return {
              src,
              alt:
                typeof item !== "string" && typeof item.alt === "string"
                  ? item.alt.slice(0, 300)
                  : altFallback,
              title:
                typeof item !== "string" && typeof item.caption === "string"
                  ? item.caption.slice(0, 500)
                  : undefined,
              type: isGalleryVideoUrl(src) ? "video" : "image",
            } as LoadedMedia;
          })
          .filter((item): item is LoadedMedia => item !== null)
          .filter((i) => {
            if (!i.src) return false;
            const name = getFilename(i.src).toLowerCase();
            return name.startsWith(filenamePrefix.toLowerCase());
          });

        if (list.length === 0) {
          setStatus("empty");
        } else {
          setImages(list);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("empty");
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [slug, filenamePrefix, defaultAlt, title]);

  const slides = useMemo(
    () =>
      images.map((i) =>
        i.type === "video"
          ? {
              type: "video" as const,
              sources: [{ src: i.src, type: "video/mp4" }],
              autoPlay: true,
              loop: true,
              muted: true,
              playsInline: true,
              controls: true,
              width: 1280,
              height: 720,
            }
          : { src: i.src, alt: i.alt, title: i.title }
      ),
    [images]
  );

  if (buttonOnly) {
    const isEmpty = status === "empty";
    const handleClick = () => {
      if (isEmpty) {
        setShowEmptyNotice(true);
      } else {
        setOpenIndex(0);
      }
    };
    const buttonEl = (
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "loading"}
        className={
          buttonClassName ??
          "inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-full text-white font-semibold text-base sm:text-lg shadow-elevated hover:-translate-y-0.5 hover:shadow-soft transition-all disabled:opacity-70 disabled:cursor-wait"
        }
        style={{ backgroundColor: accent }}
        aria-label={buttonLabel ?? title}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 shrink-0 animate-spin" aria-hidden="true" />
        ) : (
          <Images className="w-4 h-4 shrink-0" aria-hidden="true" />
        )}
        <span className="leading-none">{buttonLabel ?? title}</span>
      </button>
    );
    const overlays = (
      <>
        <Lightbox
          open={openIndex >= 0}
          index={openIndex < 0 ? 0 : openIndex}
          close={() => setOpenIndex(-1)}
          slides={slides}
          plugins={[Video]}
        />
        <Dialog open={showEmptyNotice} onOpenChange={setShowEmptyNotice}>
          <DialogContent className="max-w-md rounded-2xl p-8 text-center shadow-elevated">
            <DialogHeader className="items-center text-center sm:text-center">
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${accent}14` }}
              >
                <Images className="w-7 h-7" style={{ color: accent }} aria-hidden="true" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Referenciáink hamarosan feltöltésre kerülnek!
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Dolgozunk a galéria frissítésén – hamarosan visszatérünk friss
                képekkel a legutóbbi telepítéseinkről.
              </DialogDescription>
            </DialogHeader>
              <DialogClose
                type="button"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accent }}
              >
                Bezárás
              </DialogClose>
          </DialogContent>
        </Dialog>
      </>
    );

    if (inline) {
      return (
        <>
          {buttonEl}
          {overlays}
        </>
      );
    }

    return (
      <section className={`relative z-10 py-12 sm:py-16 ${bgClassName}`} aria-label={title}>
        <div className="container mx-auto px-4 flex justify-center">
          {buttonEl}
        </div>
        {overlays}
      </section>
    );
  }

  // Hide the inline grid section entirely when there's nothing to show.
  if (status === "empty") return null;

  return (
    <section className={`py-16 sm:py-20 ${bgClassName}`} aria-label={title}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          {eyebrow && (
            <span
              className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
              style={{ color: accent }}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-base text-muted-foreground">{description}</p>
          )}
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-7 h-7 animate-spin mb-3" style={{ color: accent }} />
            <p className="text-sm">Képek betöltése...</p>
          </div>
        )}

        {status === "ready" && (
          <div
            className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]"
          >
            {images.map((media, i) => (
              <button
                key={media.src}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative mb-3 sm:mb-4 block w-full overflow-hidden rounded-xl border-2 bg-secondary/40 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: `${accent}26`,
                }}
                aria-label={`${media.alt} – nagyítás`}
              >
                {media.type === "video" ? (
                  <video
                    src={media.src}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    onFocus={(e) => e.currentTarget.play().catch(() => {})}
                    onClick={(e) => {
                      const v = e.currentTarget;
                      if (v.paused) v.play().catch(() => {});
                    }}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <img
                    src={media.src}
                    alt={media.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(180deg, transparent 60%, ${accent}40 100%)`,
                  }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={openIndex >= 0}
        index={openIndex < 0 ? 0 : openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
        plugins={[Video]}
      />
    </section>
  );
};

export default BrandGallery;
