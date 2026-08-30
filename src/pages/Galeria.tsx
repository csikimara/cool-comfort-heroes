import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import {
  GALLERY_BASE_URL,
  isGalleryVideoUrl,
  MAX_GALLERY_ITEMS_PER_MANIFEST,
  MAX_GALLERY_ITEMS_TOTAL,
  readGalleryManifestText,
  safeGalleryMediaUrl,
} from "@/lib/gallery-media-url";

type GalleryMeta = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  /** Actual server folder under /galeria/. Defaults to slug. */
  folder?: string;
  /** Optional filename prefix filter (e.g. "fujitsu_"). */
  filenamePrefix?: string;
};

export const GALLERY_META: Record<string, GalleryMeta> = {
  osszes: {
    title: "Összes referenciamunkánk",
    description: "Válogatás lakossági, hőszivattyús, légtechnikai és ipari munkáinkból.",
    backHref: "/",
    backLabel: "Vissza a kezdőlapra",
  },
  "lakossagi-split": {
    title: "Lakossági split és multi-split referenciák",
    description: "Otthoni klímaszerelési munkáink – split és multi-split rendszerek.",
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  hoszivattyu: {
    title: "Hőszivattyús rendszereink",
    description: "Levegő-levegő és levegő-víz hőszivattyús referenciamunkáink.",
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  legcsatornazhato: {
    title: "Rejtett légcsatornázható rendszerek",
    description: "Álmennyezetbe és padlástérbe rejtett, esztétikus klímamegoldások.",
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  karbantartas: {
    title: "Karbantartás és prémium zsákos klímamosás",
    description: "Alapos klímamosási és rendszeres karbantartási referenciáink.",
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  "ipari-hutes": {
    title: "Ipari hűtés és Chiller referenciák",
    description: "Komplex ipari hűtési rendszerek és folyadékhűtő telepítések.",
    backHref: "/#ipari",
    backLabel: "Vissza az ipari szolgáltatásokhoz",
  },
  legtechnika: {
    title: "Légtechnika és AHU referenciák",
    description: "Központi légkezelők, szűréstechnika és hővisszanyerő rendszerek.",
    backHref: "/#ipari",
    backLabel: "Vissza az ipari szolgáltatásokhoz",
  },
  "fujitsu-lakossagi": {
    title: "Fujitsu lakossági split referenciák",
    description: "Telepített Fujitsu split és multi-split rendszerek otthonokba.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "lakossagi-split",
    filenamePrefix: "fujitsu_",
  },
  "fujitsu-waterstage": {
    title: "Fujitsu Waterstage hőszivattyú referenciák",
    description: "Levegő-víz hőszivattyús rendszereink Fujitsu Waterstage egységekkel.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "hoszivattyu",
    filenamePrefix: "fujitsu_",
  },
  "fujitsu-legcsatornazhato": {
    title: "Fujitsu légcsatornázható referenciák",
    description: "Álmennyezetbe rejtett Fujitsu légcsatornázható megoldások.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "legcsatornazhato",
    filenamePrefix: "fujitsu_",
  },
  "fujitsu-vrf": {
    title: "Fujitsu VRF és folyadékhűtő referenciák",
    description: "Ipari és kereskedelmi Fujitsu VRF rendszerek és chillerek.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "ipari-hutes",
    filenamePrefix: "fujitsu_",
  },
};

const FALLBACK_META: GalleryMeta = {
  title: "Referenciagaléria",
  description: "Northwind Hűtéstechnika referenciamunkái.",
  backHref: "/",
  backLabel: "Vissza a kezdőlapra",
};

export const galleryJsonLd = (slug: string, title: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kezdőlap", item: "https://northwind.hu/" },
    { "@type": "ListItem", position: 2, name: title, item: `https://northwind.hu/referenciak/${slug}` },
  ],
});

const ALL_GALLERY_FOLDERS = [
  "lakossagi-split",
  "hoszivattyu",
  "legcsatornazhato",
  "karbantartas",
  "ipari-hutes",
  "legtechnika",
] as const;

type Manifest = {
  images?: Array<string | { src: string; alt?: string; caption?: string }>;
  files?: string[];
};

type LoadedImage = {
  src: string;
  alt: string;
  title?: string;
  type: "image" | "video";
};

const GALLERY_FETCH_TIMEOUT_MS = 10_000;

const Galeria = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const knownMeta = GALLERY_META[slug];
  const meta = knownMeta ?? FALLBACK_META;

  const [images, setImages] = useState<LoadedImage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImages([]);

    // Only the explicitly published galleries may trigger manifest requests.
    // Unknown route segments render the 404 page and perform no fetch.
    if (!knownMeta) {
      setStatus("empty");
      return () => {
        cancelled = true;
      };
    }

    const prefix = meta.filenamePrefix?.toLowerCase();
    const folderNames = slug === "osszes"
      ? [...ALL_GALLERY_FOLDERS]
      : [meta.folder ?? slug];
    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      GALLERY_FETCH_TIMEOUT_MS,
    );

    const loadFolder = async (folderName: string): Promise<LoadedImage[]> => {
      const folder = `${GALLERY_BASE_URL}/${folderName}`;
      const res = await fetch(`${folder}/index.php`, {
        cache: "no-store",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        signal: controller.signal,
      });
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
      return data.images
        .slice(0, MAX_GALLERY_ITEMS_PER_MANIFEST)
        .map((item) => {
          if (
            typeof item !== "string" &&
            (item === null || typeof item !== "object" || typeof item.src !== "string")
          ) {
            return null;
          }
          const source = typeof item === "string" ? item : item.src;
          const src = safeGalleryMediaUrl(folderName, source);
          if (!src) return null;
          return {
            src,
            alt:
              typeof item !== "string" && typeof item.alt === "string"
                ? item.alt.slice(0, 300)
                : meta.title,
            title:
              typeof item !== "string" && typeof item.caption === "string"
                ? item.caption.slice(0, 500)
                : undefined,
            type: isGalleryVideoUrl(src) ? "video" : "image",
          } as LoadedImage;
        })
        .filter((item): item is LoadedImage => item !== null)
        .filter((i) => {
          if (!i.src) return false;
          if (!prefix) return true;
          const name = i.src.split("/").pop()?.toLowerCase() ?? "";
          return name.startsWith(prefix);
        });
    };

    Promise.all(folderNames.map((folder) => loadFolder(folder).catch(() => [])))
      .then((lists) => {
        if (cancelled) return;
        const seen = new Set<string>();
        const list = lists.flat().filter((item) => {
          if (seen.has(item.src)) return false;
          seen.add(item.src);
          return true;
        }).slice(0, MAX_GALLERY_ITEMS_TOTAL);
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
  }, [slug, knownMeta, meta.title, meta.folder, meta.filenamePrefix]);

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

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(meta.backHref);
    }
  };

  if (!knownMeta) return <NotFound />;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${meta.title} | Northwind Hűtéstechnika`}
        description={meta.description}
      />
      {knownMeta && <JsonLd data={galleryJsonLd(slug, knownMeta.title)} />}
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-24">
        <section className="py-10 sm:py-14 bg-secondary/30 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Vissza
              </button>
              <Link
                to={meta.backHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-border text-foreground/70 text-sm font-medium hover:bg-secondary transition-all"
              >
                {meta.backLabel}
              </Link>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
                Referenciák
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                {meta.title}
              </h1>
              <p className="text-base text-muted-foreground">{meta.description}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            {status === "loading" && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
                <p className="text-sm">Képek betöltése...</p>
              </div>
            )}

            {status === "empty" && (
              <div className="max-w-xl mx-auto text-center py-16 px-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5">
                <ImageOff className="w-12 h-12 mx-auto mb-4 text-primary/70" />
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Referencia képek feltöltés alatt...
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Hamarosan friss munkáinkat is feltöltjük ebbe a galériába.
                  Addig is keressen minket bátran!
                </p>
                <Button asChild>
                  <Link to="/#kapcsolat">Kapcsolatfelvétel</Link>
                </Button>
              </div>
            )}

            {status === "ready" && (
              <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {images.map((media, i) => (
                  <button
                    key={media.src}
                    type="button"
                    aria-label={`${media.alt} megnyitása`}
                    onClick={() => setOpenIndex(i)}
                    className="group relative aspect-square overflow-hidden rounded-xl border-2 border-primary/15 bg-secondary/40 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={media.src}
                        alt={media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Lightbox
        open={openIndex >= 0}
        index={openIndex < 0 ? 0 : openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
        plugins={[Video]}
      />
    </div>
  );
};

export default Galeria;
