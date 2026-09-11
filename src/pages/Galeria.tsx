import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { loadGalleryReferences } from "@/hooks/useGalleryReferences";

type GalleryMeta = {
  title: string;
  description: string;
  intro: string;
  focusPoints: [string, string, string];
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
    intro:
      "A galériában a Northwind lakossági és üzleti kivitelezései között lehet böngészni. A képek nem önmagukban állnak: a bemutatott munkáknál a megfelelő gépválasztás, a rendezett csővezetés, a későbbi hozzáférhetőség és az átadás előtti ellenőrzés egyaránt a kivitelezés része.",
    focusPoints: [
      "A feladathoz és az épülethez illesztett megoldás",
      "Rendezett, szervizelhető kivitelezés",
      "Lakossági, hőszivattyús és ipari tapasztalat",
    ],
    backHref: "/",
    backLabel: "Vissza a kezdőlapra",
  },
  "lakossagi-split": {
    title: "Lakossági split és multi-split referenciák",
    description: "Otthoni klímaszerelési munkáink – split és multi-split rendszerek.",
    intro:
      "Egy lakossági klímánál nemcsak a készülék típusa számít. A beltéri és kültéri egység helyét, a csőnyomvonalat, a kondenzvíz biztonságos elvezetését, a zajterhelést és a karbantarthatóságot együtt kell megtervezni. A referenciaanyagok ezeket a gyakorlati részleteket is bemutatják.",
    focusPoints: [
      "Split és multi-split rendszerek",
      "Átgondolt elhelyezés és csőnyomvonal",
      "Beüzemelés és dokumentált átadás",
    ],
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  hoszivattyu: {
    title: "Hőszivattyús rendszereink",
    description: "Levegő-levegő és levegő-víz hőszivattyús referenciamunkáink.",
    intro:
      "A hőszivattyú kiválasztását az épület hőigénye, a hőleadók, a használati melegvíz-igény és a villamos hálózat adottságai alapján kell elvégezni. A galériában levegő–levegő és levegő–víz rendszerek kivitelezési megoldásai jelennek meg, a kültéri elhelyezéstől a gépészeti csatlakozásokig.",
    focusPoints: [
      "Hőigényhez méretezett berendezés",
      "Gépészeti és villamos csatlakozások összehangolása",
      "Szabályozás és hosszú távú karbantarthatóság",
    ],
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  legcsatornazhato: {
    title: "Rejtett légcsatornázható rendszerek",
    description: "Álmennyezetbe és padlástérbe rejtett, esztétikus klímamegoldások.",
    intro:
      "A légcsatornázható klíma úgy biztosít egyenletes komfortot, hogy a beltéri egység és a légelosztás nagy része rejtve marad. A jó eredményhez pontos légmennyiség, megfelelő befúvó- és visszaszívó felületek, zajcsillapítás, kondenzvíz-elvezetés és később is elérhető szerviznyílás szükséges.",
    focusPoints: [
      "Rejtett beltéri egység és rendezett légelosztás",
      "Légmennyiséghez választott csatornák és rácsok",
      "Zajcsillapítás és biztos szervizhozzáférés",
    ],
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  karbantartas: {
    title: "Karbantartás és prémium zsákos klímamosás",
    description: "Alapos klímamosási és rendszeres karbantartási referenciáink.",
    intro:
      "A rendszeres karbantartás célja a lerakódások eltávolítása, a kondenzvíz útjának ellenőrzése és a berendezés üzemi állapotának felmérése. A zsákos mosásnál a tisztítás ellenőrzött módon történik, miközben a környezetet védjük a lemosott szennyeződéstől és a tisztítófolyadéktól.",
    focusPoints: [
      "Beltéri egység ellenőrzött, zsákos tisztítása",
      "Kondenzvíz-elvezetés és szűrők vizsgálata",
      "Rendellenes zajok és működés ellenőrzése",
    ],
    backHref: "/lakossagi-klima",
    backLabel: "Vissza a lakossági szolgáltatásokhoz",
  },
  "ipari-hutes": {
    title: "Ipari hűtés és Chiller referenciák",
    description: "Komplex ipari hűtési rendszerek és folyadékhűtő telepítések.",
    intro:
      "Ipari és kereskedelmi környezetben a hűtés rendelkezésre állása közvetlenül befolyásolhatja az üzemmenetet. A folyadékhűtők, fan-coil hálózatok és kapcsolódó gépészeti egységek kialakításánál ezért a teljesítmény mellett a szabályozhatóság, a tartalékok és a gyors szervizelhetőség is fontos tervezési szempont.",
    focusPoints: [
      "Chiller- és fan-coil rendszerek",
      "Üzemi igényekhez igazított gépészeti kialakítás",
      "Diagnosztizálható és karbantartható rendszer",
    ],
    backHref: "/#ipari",
    backLabel: "Vissza az ipari szolgáltatásokhoz",
  },
  legtechnika: {
    title: "Légtechnika és AHU referenciák",
    description: "Központi légkezelők, szűréstechnika és hővisszanyerő rendszerek.",
    intro:
      "A központi légtechnika feladata nemcsak a levegő mozgatása: a szükséges frisslevegő-mennyiséget, a szűrést, a hővisszanyerést, a zajt és az üzemi szabályozást rendszerként kell kezelni. A referenciák légkezelőkhöz, csatornahálózatokhoz és kapcsolódó hűtési-fűtési egységekhez mutatnak kivitelezési példákat.",
    focusPoints: [
      "Légkezelők és csatornahálózatok",
      "Szűrés, hővisszanyerés és beszabályozás",
      "Tisztítható, hozzáférhető gépészeti kialakítás",
    ],
    backHref: "/#ipari",
    backLabel: "Vissza az ipari szolgáltatásokhoz",
  },
  "fujitsu-lakossagi": {
    title: "Fujitsu lakossági split referenciák",
    description: "Telepített Fujitsu split és multi-split rendszerek otthonokba.",
    intro:
      "A Fujitsu lakossági rendszereknél a helyiség terheléséhez és használatához választjuk ki a megfelelő készüléket, majd ehhez igazítjuk az egységek helyét és a nyomvonalat. A kiterjesztett gyártói garancia csak az aktuális regisztrációs és karbantartási feltételek teljesülése mellett vehető igénybe.",
    focusPoints: [
      "Fujitsu split és multi-split kivitelezések",
      "Helyiséghez és használathoz illesztett gépválasztás",
      "Garanciafeltételekhez igazodó dokumentálás",
    ],
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "lakossagi-split",
    filenamePrefix: "fujitsu_",
  },
  "fujitsu-waterstage": {
    title: "Fujitsu Waterstage hőszivattyú referenciák",
    description: "Levegő-víz hőszivattyús rendszereink Fujitsu Waterstage egységekkel.",
    intro:
      "A Fujitsu Waterstage levegő–víz hőszivattyú az épület fűtését, hűtését és a kialakítástól függően a használati melegvíz készítését is elláthatja. A kivitelezés előtt ellenőrizni kell a méretezési hőigényt, a hőleadó rendszert, a hidraulikai kialakítást és a villamos teljesítményt.",
    focusPoints: [
      "Waterstage kültéri és hidraulikus egységek",
      "Fűtési rendszerhez illesztett hidraulika",
      "Szabályozás, beüzemelés és átadás",
    ],
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "hoszivattyu",
    filenamePrefix: "fujitsu_",
  },
  "fujitsu-legcsatornazhato": {
    title: "Fujitsu légcsatornázható referenciák",
    description: "Álmennyezetbe rejtett Fujitsu légcsatornázható megoldások.",
    intro:
      "A Fujitsu légcsatornázható rendszerek diszkréten illeszthetők lakó- és üzleti terekbe, de a komfortot a teljes légoldali kialakítás határozza meg. A gépválasztás mellett a külső statikus nyomást, a befúvási irányokat, a visszaszívást, a hangcsillapítást és a karbantartási hozzáférést is megtervezzük.",
    focusPoints: [
      "Rejtett Fujitsu beltéri egységek",
      "Helyiségenként tervezett befúvás és visszaszívás",
      "Akusztikai és szervizelési szempontok",
    ],
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "legcsatornazhato",
    filenamePrefix: "fujitsu_",
  },
  "fujitsu-vrf": {
    title: "Fujitsu VRF és folyadékhűtő referenciák",
    description: "Ipari és kereskedelmi Fujitsu VRF rendszerek és chillerek.",
    intro:
      "A Fujitsu VRF és folyadékhűtős rendszerek több zóna vagy nagyobb épület összehangolt hűtésére és fűtésére alkalmasak. Ilyen feladatnál a részterhelési működés, a csőhálózat, a központi vezérlés, a hibafelügyelet és a szervizelés egyaránt része a műszaki koncepciónak.",
    focusPoints: [
      "Többzónás VRF és folyadékhűtős megoldások",
      "Központi vezérlés és üzemi felügyelet",
      "Bővíthető, diagnosztizálható rendszerkialakítás",
    ],
    backHref: "/fujitsu",
    backLabel: "Vissza a Fujitsu oldalra",
    folder: "ipari-hutes",
    filenamePrefix: "fujitsu_",
  },
};

const FALLBACK_META: GalleryMeta = {
  title: "Referenciagaléria",
  description: "Northwind Hűtéstechnika referenciamunkái.",
  intro: "Northwind Hűtéstechnika referenciamunkái.",
  focusPoints: ["Szakszerű kivitelezés", "Rendezett munkaterület", "Karbantartható megoldás"],
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

const normaliseManifestText = (value: unknown, maxLength: number) =>
  typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, maxLength)
    : "";

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
    const referenceBrand = prefix === "fujitsu_" ? "fujitsu" as const : undefined;
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
          const suppliedAlt = normaliseManifestText(
            typeof item === "string" ? undefined : item.alt,
            300,
          );
          const suppliedCaption = normaliseManifestText(
            typeof item === "string" ? undefined : item.caption,
            500,
          );
          return {
            src,
            alt: suppliedAlt || meta.title,
            title: suppliedCaption || undefined,
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

    Promise.all([
      loadGalleryReferences(folderNames, referenceBrand).catch(() => []),
      Promise.all(folderNames.map((folder) => loadFolder(folder).catch(() => []))),
    ])
      .then(([managedImages, legacyLists]) => {
        if (cancelled) return;
        const seen = new Set<string>();
        const list = [...managedImages, ...legacyLists.flat()].filter((item) => {
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
            <div className="max-w-4xl mx-auto mb-10 rounded-2xl border border-border/60 bg-secondary/25 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Szakmai szempontok a kivitelezésnél
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">{meta.intro}</p>
              <ul className="grid gap-3 sm:grid-cols-3" aria-label="Kiemelt szakmai szempontok">
                {meta.focusPoints.map((point) => (
                  <li
                    key={point}
                    className="rounded-xl border border-primary/15 bg-background px-4 py-3 text-sm font-medium text-foreground"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                A közzétett képeket és leírásokat megjelenés előtt személyes adatok, arcok,
                rendszámok és helyazonosító adatok szempontjából ellenőrizzük.
              </p>
            </div>

            {status === "loading" && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" aria-hidden="true" />
                <p className="text-sm">Képek betöltése...</p>
              </div>
            )}

            {status === "empty" && (
              <div className="max-w-xl mx-auto text-center py-16 px-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5">
                <ImageOff className="w-12 h-12 mx-auto mb-4 text-primary/70" aria-hidden="true" />
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
                  <figure key={media.src} className="min-w-0">
                    <button
                      type="button"
                      aria-label={`${media.alt} megnyitása`}
                      onClick={() => setOpenIndex(i)}
                      className="group relative block w-full aspect-square overflow-hidden rounded-xl border-2 border-primary/15 bg-secondary/40 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </button>
                    {media.title && (
                      <figcaption className="px-1 pt-2 text-sm leading-snug text-muted-foreground">
                        {media.title}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-border/50 bg-secondary/30 py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Hasonló megoldást keres?
              </h2>
              <p className="text-muted-foreground mb-6">
                Írja meg röviden a feladatot, vagy hívjon minket; a helyszín és az igények
                alapján egyeztetjük a következő lépést.
              </p>
              <Button asChild size="lg">
                <Link to="/#kapcsolat">Kapcsolatfelvétel</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
