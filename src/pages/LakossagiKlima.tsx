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

const Footer = lazy(() => import("@/components/Footer"));
const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));

const services = [
  {
    icon: AirVent,
    title: "Klímaszerelés – Komfort és tisztaság az Ön otthonában",
    galleryHref: "/galeria/lakossagi-split/",
    short:
      "Prémium split és multi-split rendszerek telepítése lakásokba és családi házakba.",
    paragraphs: [
      "Egy jól kiválasztott klíma nemcsak hűt, hanem észrevétlenül gondoskodik otthona kényelméről. A szerelés során nemcsak a technikai paraméterekre figyelünk, hanem a helyiségek adottságaihoz mérten segítünk kiválasztani azt a készüléket, amely a legcsendesebben és leghatékonyabban működik.",
      "A Northwind csapatánál a szakszerű telepítés (vákuumozás, precíz bekötés) alapkövetelmény, de nálunk a maximális tisztaság is az: ipari porszívóval, pormentesen dolgozunk, vigyázva lakása épségére. A precíz munka nálunk nemcsak halk működést, hanem alacsonyabb rezsiszámlát és hosszú élettartamot is jelent.",
    ],
  },
  {
    icon: ThermometerSun,
    title: "Hőszivattyú",
    galleryHref: "/galeria/hoszivattyu/",
    short:
      "Energiahatékony hőszivattyú rendszerek telepítése fűtésre és hűtésre.",
    paragraphs: [
      "A hőszivattyú a legkorszerűbb, környezetbarát gépészeti megoldás. A külső levegőből nyert energiát hasznosítja, így – különösen a kedvezményes H-tarifa igénylésével – drasztikusan csökkentheti az ingatlan rezsiköltségeit.",
      "A kivitelezés során gondoskodunk a hajszálpontos méretezésről, a szakszerű beépítésről és a finomhangolásról, hogy a rendszer a leghidegebb téli napokon is a legjobb hatásfokkal működjön.",
    ],
  },
  {
    icon: Snowflake,
    title: "Rejtett légcsatornázható megoldások családi házakba",
    galleryHref: "/galeria/legcsatornazhato/",
    short:
      "Esztétikus és láthatatlan klímamegoldás igényes otthonokba, családi házakba és lakásokba.",
    paragraphs: [
      "Esztétikus és láthatatlan klímamegoldás igényes otthonokba, családi házakba és lakásokba. Ideális választás, ha nem szeretne beltéri egységeket látni a falon, vagy ha a tagolt terek, tetőterek miatt a hagyományos split klíma nem esztétikus.",
      "A padlástérbe vagy álmennyezetbe rejtett gép észrevétlenül, diszkrét befúvórácsokon keresztül biztosít tökéletes, huzatmentes hőmérsékletet az egész lakásban.",
    ],
  },
  {
    icon: SprayCan,
    title: "Prémium Zsákos Klímamosás",
    galleryHref: "/galeria/karbantartas/",
    short:
      "Gyári higiénia helyreállítása: professzionális vegyszeres mélymosás, amely visszaadja a klíma eredeti tisztaságát, hatékonyságát és friss illatát.",
    paragraphs: [
      "A tisztítás során speciális mosózsákot használunk, amely lehetővé teszi a beltéri egység teljes, nagynyomású vegyszeres átmosását anélkül, hogy a fal vagy a bútorzat koszolódna. Ez az eljárás maradéktalanul eltávolítja a hőcserélőn lerakódott port, a penészgombát, megszünteti a kellemetlen szagokat, és elpusztítja a baktériumokat.",
      "A folyamat elengedhetetlen része a kültéri egység karbantartása is: nagynyomású vízzel szabadítjuk meg a hőcserélőt a lerakódott pollentől és szennyeződésektől. Ez javítja a hőleadást, csökkenti a zajszintet és védi a kompresszort a túlmelegedéstől.",
      "A rendszeres mélymosás nemcsak az Ön egészségét védi, hanem garantálja a készülék üzembiztos, energiatakarékos működését is.",
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
      <main className="pt-24">
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
                otthonokba és kisebb irodákba, 33 év szakmai tapasztalattal.
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
                    <a
                      href={s.galleryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all self-start"
                    >
                      <Images className="w-4 h-4" />
                      Referenciák megtekintése
                    </a>
                  )}
                </article>
              ))}
            </div>

            {/* Zsákos mosás videó */}
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-border/50 bg-black">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-auto block"
                >
                  <source src="https://northwind.hu/video/zsakos-mosas.mp4" type="video/mp4" />
                  A böngésződ nem támogatja a videó lejátszását.
                </video>
              </div>
              <p className="text-xs text-muted-foreground/70 text-center mt-2">
                Zsákos klímamosás folyamata – a hang bekapcsolásához kattints a hangerő ikonra
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Kérjen ingyenes ajánlatot otthoni klímájára!
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              33 év szakmai tapasztalattal segítünk megtalálni az Ön igényeihez
              legjobban illő lakossági megoldást.
            </p>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/#kapcsolat">
                Ingyenes ajánlatkérés
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FujitsuFloatingButton />
      </Suspense>
    </div>
  );
};

export default LakossagiKlima;