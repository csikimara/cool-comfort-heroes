import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

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

const GALLERY_META: Record<string, GalleryMeta> = {
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
    description: "Higiénikus, pormentes klímamosás és rendszeres karbantartás referenciái.",
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

const BASE = "https://northwind.hu/galeria";

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

const isVideoFile = (name: string) => /\.(mp4|webm|ogg|mov|m4v)$/i.test(name);

const Galeria = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const meta = GALLERY_META[slug] ?? FALLBACK_META;

  const [images, setImages] = useState<LoadedImage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [debug, setDebug] = useState<{
    url: string;
    httpStatus?: number;
    contentType?: string | null;
    rawSnippet?: string;
    parsedFiles?: unknown;
    finalUrls?: string[];
    error?: string;
  }>({ url: "" });

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImages([]);

    const folderName = meta.folder ?? slug;
    const folder = `${BASE}/${folderName}`;
    const prefix = meta.filenamePrefix?.toLowerCase();
    const fetchUrl = `${folder}/index.php`;
    setDebug({ url: fetchUrl });

    fetch(fetchUrl, { cache: "no-store" })
      .then(async (res) => {
        console.log(`[Galeria:${slug}] fetch status:`, res.status, res.headers.get("content-type"));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        console.log(`[Galeria:${slug}] raw response (first 200):`, text.slice(0, 200));
        setDebug((d) => ({
          ...d,
          httpStatus: res.status,
          contentType: res.headers.get("content-type"),
          rawSnippet: text.slice(0, 300),
        }));
        let raw: Manifest | string[];
        try {
          raw = JSON.parse(text);
        } catch (e) {
          console.error(`[Galeria:${slug}] JSON parse FAILED — a szerver HTML-t küldött (valószínűleg az .htaccess átirányítja az index.php-t a SPA-ra).`, e);
          setDebug((d) => ({ ...d, error: `JSON parse hiba: ${(e as Error).message}` }));
          throw e;
        }
        const data: Manifest = Array.isArray(raw)
          ? { images: raw }
          : { images: raw.images ?? raw.files ?? [] };
        console.log(`[Galeria:${slug}] parsed files:`, data.images);
        setDebug((d) => ({ ...d, parsedFiles: data.images }));
        if (cancelled) return;

        const list = (data.images ?? [])
          .map((item) => {
            if (typeof item === "string") {
              return {
                src: `${folder}/${item}`,
                alt: meta.title,
                type: isVideoFile(item) ? "video" : "image",
              } as LoadedImage;
            }
            const src = item.src.startsWith("http") ? item.src : `${folder}/${item.src}`;
            return {
              src,
              alt: item.alt ?? meta.title,
              title: item.caption,
              type: isVideoFile(src) ? "video" : "image",
            } as LoadedImage;
          })
          .filter((i) => {
            if (!i.src) return false;
            if (!prefix) return true;
            const name = i.src.split("/").pop()?.toLowerCase() ?? "";
            return name.startsWith(prefix);
          });
        console.log(`[Galeria:${slug}] final URLs:`, list.map((i) => i.src));
        setDebug((d) => ({ ...d, finalUrls: list.map((i) => i.src) }));

        if (list.length === 0) {
          setStatus("empty");
        } else {
          setImages(list);
          setStatus("ready");
        }
      })
      .catch((err) => {
        console.error(`[Galeria:${slug}] fetch FAILED:`, err?.message ?? err);
        setDebug((d) => ({ ...d, error: err?.message ?? String(err) }));
        if (!cancelled) setStatus("empty");
      });

    return () => {
      cancelled = true;
    };
  }, [slug, meta.title, meta.folder, meta.filenamePrefix]);

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

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${meta.title} | Northwind Hűtéstechnika`}
        description={meta.description}
      />
      <Header />
      <main className="pt-24">
        <section className="py-10 sm:py-14 bg-secondary/30 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-3">
              <button
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
            <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl border-2 border-yellow-400 bg-yellow-50 text-xs font-mono text-left overflow-x-auto">
              <div className="font-bold text-yellow-900 mb-2 text-sm uppercase">🐞 Debug Doboz (ideiglenes)</div>
              <div className="space-y-1 text-yellow-950 break-all">
                <div><b>Slug:</b> {slug}</div>
                <div><b>Fetch URL:</b> {debug.url}</div>
                <div><b>HTTP státusz:</b> {debug.httpStatus ?? "—"}</div>
                <div><b>Content-Type:</b> {debug.contentType ?? "—"}</div>
                <div><b>Filename prefix szűrő:</b> {meta.filenamePrefix ?? "(nincs)"}</div>
                <div><b>Nyers válasz (max 300 karakter):</b>
                  <pre className="whitespace-pre-wrap bg-white/70 p-2 rounded mt-1">{debug.rawSnippet ?? "—"}</pre>
                </div>
                <div><b>Parsed fájllista:</b>
                  <pre className="whitespace-pre-wrap bg-white/70 p-2 rounded mt-1">{debug.parsedFiles ? JSON.stringify(debug.parsedFiles, null, 2) : "—"}</pre>
                </div>
                <div><b>Generált végső URL-ek (img/video src):</b>
                  <pre className="whitespace-pre-wrap bg-white/70 p-2 rounded mt-1">{debug.finalUrls ? debug.finalUrls.join("\n") : "—"}</pre>
                </div>
                {debug.error && (
                  <div className="text-red-700"><b>HIBA:</b> {debug.error}</div>
                )}
              </div>
            </div>

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
        slides={slides as any}
        plugins={[Video]}
      />
    </div>
  );
};

export default Galeria;