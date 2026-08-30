import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  AirVent,
  ThermometerSun,
  SprayCan,
  Snowflake,
  Images,
} from "lucide-react";
import zsakosMosasPoster from "@/assets/zsakos-mosas-poster.webp";

const Footer = lazy(() => import("@/components/Footer"));
const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));

const services = [
  {
    icon: AirVent,
    title: "Klímaszerelés – Komfort és tisztaság az Ön otthonában",
    galleryHref: "/referenciak/lakossagi-split",
    short:
      "Prémium split és multi-split rendszerek telepítése lakásokba és családi házakba.",
    paragraphs: [
      "Egy jól kiválasztott klíma nemcsak hűt, hanem otthona kényelmét is szolgálja. A szerelés során a technikai paraméterek és a helyiségek adottságai alapján segítünk megfelelő zajszintű és energiahatékonyságú készüléket választani.",
      "A Northwind csapatánál a szakszerű telepítés (vákuumozás, precíz bekötés) alapkövetelmény. Ipari porszívót és munkaterület-védelmet használunk, a készüléket pedig a gyártói előírások szerint helyezzük üzembe.",
    ],
  },
  {
    icon: ThermometerSun,
    title: "Hőszivattyús rendszerek – Korszerű fűtési megoldás",
    galleryHref: "/referenciak/hoszivattyu",
    short:
      "Megfelelő méretezéssel energiahatékony hűtés, fűtés és melegvíz-ellátás egy rendszerrel.",
    paragraphs: [
      "A hőszivattyú a külső levegő energiáját hasznosítva biztosíthat fűtést, hűtést és használati melegvizet. A feltételeknek megfelelő berendezés külön mért áramkörrel a fűtési idényben H árszabásra is jogosult lehet; az igénybevételt az áramszolgáltató bírálja el.",
      "A kivitelezés alapja a hőveszteség, a hőleadók és az elektromos hálózat felmérése. A várható teljesítményt és fogyasztást a kiválasztott modell műszaki adatai és az épület adottságai alapján adjuk meg.",
    ],
  },
  {
    icon: Snowflake,
    title: "Rejtett légcsatornázható rendszerek – Láthatatlan elegancia",
    galleryHref: "/referenciak/legcsatornazhato",
    short:
      "Esztétikus klímamegoldás igényes otthonokba, ahol a technika észrevétlen marad.",
    paragraphs: [
      "A légcsatornázható rendszer esztétikus megoldás lehet, ha Ön nem szeretne beltéri egységeket látni a falakon, vagy ha a tagolt terek és tetőtéri adottságok miatt a hagyományos split klíma nem előnyös.",
      "A padlástérbe vagy álmennyezetbe rejtett berendezés diszkrét befúvórácsokon keresztül kezeli a helyiségek levegőjét. A megfelelő tervezés mérsékelheti a közvetlen huzatérzetet és a lakótérbe jutó géphangot; az elérhető komfort mindig az épület és a kialakítás adottságaitól függ.",
    ],
  },
  {
    icon: SprayCan,
    title: "Prémium zsákos mélymosás – Alapos tisztítás",
    galleryHref: "/referenciak/karbantartas",
    short:
      "Átfogó tisztítás, amely segít eltávolítani a beltéri egységben felgyűlt szennyeződést.",
    paragraphs: [
      "A hagyományos tisztítás gyakran csak a könnyen elérhető felületeket érinti. A Northwind mélymosása során speciális mosózsákot és erre alkalmas mosóberendezést használunk; a munkaterületet letakarjuk és védjük. Az eljárás segít eltávolítani a hozzáférhető felületeken lerakódott port és szennyeződést, valamint mérsékelheti a szennyeződésből eredő kellemetlen szagokat.",
      "A folyamat részeként szükség szerint a kültéri egységet is megtisztítjuk a pollentől és más szennyeződésektől. A rendszeres, szakszerű tisztítás segíti a megfelelő hőcserét és a készülék gyártói paraméterekhez közeli működését.",
    ],
  },
];

const LakossagiKlima = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Lakossági Klíma – Klímaszerelés, hőszivattyú, klímamosás | Northwind Hűtéstechnika"
        description="Lakossági klímamegoldások: split és multi-split klímaszerelés, hőszivattyú telepítés és prémium zsákos klímamosás Budapesten és Pest vármegyében."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-24">
        {/* Page intro */}
        <section className="py-12 sm:py-16 bg-secondary/30 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-8">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Vissza a kezdőlapra
              </Link>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                Lakossági szolgáltatások
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Lakossági <span className="text-gradient">klímamegoldások</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Klímaszerelés, hőszivattyú telepítés és prémium zsákos klímamosás –
                otthonokba és kisebb irodákba, 1993 óta gyűjtött szakmai tapasztalattal.
              </p>
            </div>
          </div>
        </section>

        {/* Service cards */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="relative rounded-2xl p-6 sm:p-7 bg-card border-2 border-primary/15 flex flex-col cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5">
                    <s.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    {s.title}
                  </h2>
                  <p className="text-base font-medium text-foreground/80 mb-4">
                    {s.short}
                  </p>
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground flex-1">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {s.galleryHref && (
                    <Link
                      to={s.galleryHref}
                      className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all self-start"
                    >
                      <Images className="w-4 h-4" />
                      Referenciák megtekintése
                    </Link>
                  )}
                </article>
              ))}
            </div>

            {/* Zsákos mosás videó */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Tekintse meg folyamatunkat munka közben!
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Prémium zsákos mélymosás – élesben, az Ön otthonában is így dolgozunk.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/15 bg-black shadow-card">
                <video
                  src="https://northwind.hu/galeria/karbantartas/zsakos-mosas.mp4"
                  poster={zsakosMosasPoster}
                  controls
                  preload="metadata"
                  playsInline
                  aria-label="Prémium zsákos klímamosás bemutató videó"
                  className="w-full h-auto block"
                >
                  A böngészője nem támogatja a videó lejátszást.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Kérjen személyre szabott ajánlatot otthoni klímájára!
            </h2>
            <p className="text-primary-foreground max-w-2xl mx-auto mb-8">
              1993 óta gyűjtött szakmai tapasztalattal segítünk megtalálni az Ön igényeihez
              legjobban illő lakossági megoldást.
            </p>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/#kapcsolat">
                Ajánlatkérés
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-4 items-end"><FujitsuFloatingButton /></div>
      </Suspense>
    </div>
  );
};

export default LakossagiKlima;
