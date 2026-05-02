import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

type GalleryMeta = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
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
  },
  "fujitsu-waterstage": {
    title: "Fujitsu Waterstage hőszivattyú referenciák",
    description: "Levegő-víz hőszivattyús rendszereink Fujitsu Waterstage egységekkel.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
  },
  "fujitsu-legcsatornazhato": {
    title: "Fujitsu légcsatornázható referenciák",
    description: "Álmennyezetbe rejtett Fujitsu légcsatornázható megoldások.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
  },
  "fujitsu-vrf": {
    title: "Fujitsu VRF és folyadékhűtő referenciák",
    description: "Ipari és kereskedelmi Fujitsu VRF rendszerek és chillerek.",
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
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
};

type LoadedImage = { src: string; alt: string; title?: string };

const Galeria = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const meta = GALLERY_META[slug] ?? FALLBACK_META;

  const [images, setImages] = useState<LoadedImage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImages([]);

    const folder = `${BASE}/${slug}`;

    fetch(`${folder}/index.json`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Manifest;
        if (cancelled) return;

        const list = (data.images ?? [])
          .map((item) => {
            if (typeof item === "string") {
              return { src: `${folder}/${item}`, alt: meta.title };
            }
            return {
              src: item.src.startsWith("http") ? item.src : `${folder}/${item.src}`,
              alt: item.alt ?? meta.title,
              title: item.caption,
            };
          })
          .filter((i) => !!i.src);

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
  }, [slug, meta.title]);

  const slides = useMemo(
    () => images.map((i) => ({ src: i.src, alt: i.alt, title: i.title })),
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
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setOpenIndex(i)}
                    className="group relative aspect-square overflow-hidden rounded-xl border-2 border-primary/15 bg-secondary/40 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
      />
    </div>
  );
};

export default Galeria;