import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FujitsuHero from "@/components/fujitsu/FujitsuHero";
import FujitsuModelCard from "@/components/fujitsu/FujitsuModelCard";
import FujitsuSummary from "@/components/fujitsu/FujitsuSummary";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { Shield, Zap, AirVent, ThermometerSun, Snowflake, Sun, Flame, Star, User, Settings } from "lucide-react";
import fujitsuInstallation from "@/assets/fujitsu-installation.png";

const features = [
  {
    icon: Shield,
    title: "10 év garancia",
    description: "Fujitsu klímák regisztrációjával akár 10 év kiterjesztett garancia.",
  },
  {
    icon: Zap,
    title: "A+++ energiaosztály",
    description: "Az új KJ sorozat A+++ besorolású hűtésben és fűtésben egyaránt.",
  },
  {
    icon: AirVent,
    title: "Csendes működés",
    description: "Piacvezető zajszint már 19 dB(A)-tól – ideális hálószobákba.",
  },
  {
    icon: ThermometerSun,
    title: "Fűtés akár -25°C-ig",
    description: "A KJ sorozat extrém hidegben is stabil, gazdaságos fűtést biztosít.",
  },
];

const sellingPoints = [
  {
    icon: AirVent,
    text: "Halk működés hálószobába – már 19 dB(A)-tól, ami halkabb, mint a suttogás.",
  },
  {
    icon: User,
    text: "Human Sensor technológia – automatikusan csökkenti a fogyasztást, ha nincs senki a szobában.",
  },
  {
    icon: Settings,
    text: "Hosszú távú megbízhatóság – évtizedekig garantált alkatrészellátás és szervizháttér.",
  },
];

const models = [
  {
    id: "kl",
    badge: "ECO – Belépő szint",
    name: "Fujitsu KL sorozat (ECO)",
    subtitle: "A racionális belépő modell",
    tagline: "Hűtés A++ / Fűtés A+",
    description:
      "Elsősorban megbízható nyári hűtésre. Japán minőség, hosszú élettartam és garantált alkatrészellátás – felesleges extrák nélkül.",
    highlights: [
      "Hűtés A++ / Fűtés A+ energiaosztály",
      "Japán megbízhatóság elérhető áron",
      "Csendes működés lakásokba",
      "Hosszú élettartam, évtizedes szervizháttér",
    ],
    icon: Snowflake,
    accentClass: "from-sky-500 to-sky-600",
    badgeClass: "bg-sky-100 text-sky-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/eco-sorozat-kl",
    catalogLabel: "KL (ECO) részletek és árak",
  },
  {
    id: "km",
    badge: "Standard – Legjobb ár-érték",
    name: "Fujitsu KM sorozat (Standard)",
    subtitle: "A sokoldalú közönségkedvenc",
    tagline: "Hűtés A++ / Fűtés A++ – Fekete kivitelben is",
    description:
      "Hűtésre és fűtésre egyaránt kiváló. Évek óta a legkeresettebb Fujitsu modell – most már elegáns fekete kivitelben is, prémium megjelenés standard áron.",
    highlights: [
      "Hűtés A++ / Fűtés A++ energiaosztály",
      "Elérhető modern fekete (Black) dizájnban",
      "Évek óta a legkelendőbb Fujitsu modell",
      "Kiváló ár-érték arány",
    ],
    icon: Sun,
    accentClass: "from-amber-500 to-orange-500",
    badgeClass: "bg-amber-100 text-amber-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/standard-sorozat-km",
    catalogLabel: "KM (Standard) részletek és árak",
  },
  {
    id: "kj",
    badge: "Új prémium csúcsmodell",
    name: "Fujitsu KJ sorozat",
    subtitle: "Az új prémium modell",
    tagline: "Hűtés A+++ / Fűtés A+++ – Prémium megjelenés",
    description:
      "A legújabb Fujitsu csúcsmodell, a legmagasabb hatékonysággal. Akár -25°C-os extrém hidegben is stabil, gazdaságos teljesítmény – elegáns fekete kivitelben is elérhető.",
    highlights: [
      "A+++ / A+++ energiaosztály hűtésben és fűtésben",
      "Elérhető modern fekete (Black) dizájnban",
      "Stabil fűtés akár -25°C-ig",
      "Human Sensor – automatikus energiamegtakarítás",
      "19 dB(A) suttogó üzemmód",
    ],
    icon: Star,
    accentClass: "from-red-500 to-red-600",
    badgeClass: "bg-red-100 text-red-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima",
    catalogLabel: "KJ sorozat részletek és árak",
  },
  {
    id: "kg",
    badge: "Bizonyított fűtésbajnok",
    name: "Fujitsu KG sorozat",
    subtitle: "A bizonyított fűtésbajnok",
    tagline: "A++ / A+++ hatékonyság",
    description:
      "Évek óta bizonyított, megbízható fűtési megoldás. Extrém hidegben is stabil teljesítmény – továbbra is elérhető kínálatunkban.",
    highlights: [
      "A+++ energiaosztály, minimális rezsiköltség",
      "Stabil fűtés akár -25°C-ig",
      "Human Sensor technológia",
      "Évek óta bizonyított megbízhatóság",
    ],
    icon: Flame,
    accentClass: "from-emerald-500 to-emerald-600",
    badgeClass: "bg-emerald-100 text-emerald-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/design-sorozat-kg",
    catalogLabel: "KG sorozat részletek és árak",
  },
];

const fujitsuJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Fujitsu klíma modellek – Northwind Hűtéstechnika",
  itemListElement: models.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.name,
    description: m.description,
  })),
};

const Fujitsu = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fujitsu Klíma Útmutató | KL, KM, KJ, KG sorozat – Northwind"
        description="Melyik Fujitsu klíma való Önnek? KL (ECO), KM (Standard), KJ és KG sorozat összehasonlítás. Hivatalos Fujitsu partner, 33 év tapasztalat, Budapest."
      />
      <JsonLd data={fujitsuJsonLd} />
      <Header />
      <main>
        <FujitsuHero />

        {/* Features section */}
        <section className="py-20" aria-label="Fujitsu előnyök">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                Miért a Fujitsu?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Japán precizitás, A+++ hatékonyság
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-gradient-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buying Guide */}
        <section className="py-20 bg-muted/30" aria-label="Fujitsu modell összehasonlítás">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                Vásárlási útmutató
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Melyik Fujitsu modell illik Önhöz?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Négy sorozat, négy különböző igényre szabva – a nyári hűtéstől az egész éves prémium fűtésig.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {models.map((model) => (
                <FujitsuModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>
        </section>

        {/* Selling Points + Installation Photo */}
        <section className="py-20" aria-label="Fujitsu telepítés előnyei">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                  Előnyök
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                  Miért választják ügyfeleink a Fujitsu-t?
                </h2>

                <ul className="space-y-6">
                  {sellingPoints.map((point) => (
                    <li key={point.text} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shrink-0 mt-0.5">
                        <point.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-foreground leading-relaxed">{point.text}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-5 rounded-xl border border-border/50 bg-background">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground">33 év szakmai tapasztalattal</strong> és hivatalos Fujitsu partnerként
                    segítünk a legmegfelelőbb modell kiválasztásában Budapesten és Pest vármegyében.
                    A Northwind Hűtéstechnika 2009 óta biztosít stabil vállalkozói hátteret ehhez a tudáshoz.
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-[4/3]">
                <img
                  src={fujitsuInstallation}
                  alt="Professzionális Fujitsu klíma beltéri egység telepítés egy budapesti lakásban – Northwind Hűtéstechnika"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </section>

        <FujitsuSummary />
      </main>
      <Footer />
    </div>
  );
};

export default Fujitsu;
