import { useEffect, useMemo, useState } from "react";
import { Images, Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Manifest = {
  images?: Array<string | { src: string; alt?: string; caption?: string }>;
  files?: string[];
};

type LoadedImage = { src: string; alt: string; title?: string };

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

const BASE = "https://northwind.hu/galeria";

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
  const [images, setImages] = useState<LoadedImage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [showEmptyNotice, setShowEmptyNotice] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImages([]);

    const folder = `${BASE}/${slug}`;
    const altFallback = defaultAlt ?? title;

    fetch(`${folder}/index.php`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = (await res.json()) as Manifest | string[];
        const data: Manifest = Array.isArray(raw)
          ? { images: raw }
          : { images: raw.images ?? raw.files ?? [] };
        if (cancelled) return;

        const list = (data.images ?? [])
          .map((item) => {
            if (typeof item === "string") {
              return { src: `${folder}/${item}`, alt: altFallback };
            }
            return {
              src: item.src.startsWith("http") ? item.src : `${folder}/${item.src}`,
              alt: item.alt ?? altFallback,
              title: item.caption,
            };
          })
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
      });

    return () => {
      cancelled = true;
    };
  }, [slug, filenamePrefix, defaultAlt, title]);

  const slides = useMemo(
    () => images.map((i) => ({ src: i.src, alt: i.alt, title: i.title })),
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
        />
        {showEmptyNotice && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Referenciák hamarosan"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowEmptyNotice(false)}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />
            <div
              className="relative max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${accent}14` }}
              >
                <Images className="w-7 h-7" style={{ color: accent }} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Referenciáink hamarosan feltöltésre kerülnek!
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Dolgozunk a galéria frissítésén – hamarosan visszatérünk friss
                képekkel a legutóbbi telepítéseinkről.
              </p>
              <button
                type="button"
                onClick={() => setShowEmptyNotice(false)}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accent }}
              >
                Bezárás
              </button>
            </div>
          </div>
        )}
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
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setOpenIndex(i)}
                className="group relative mb-3 sm:mb-4 block w-full overflow-hidden rounded-xl border-2 bg-secondary/40 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: `${accent}26`,
                }}
                aria-label={`${img.alt} – nagyítás`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                />
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
      />
    </section>
  );
};

export default BrandGallery;