import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FujitsuHero from "@/components/fujitsu/FujitsuHero";
import FujitsuModelCard from "@/components/fujitsu/FujitsuModelCard";
import FujitsuSummary from "@/components/fujitsu/FujitsuSummary";
import FujitsuFloatingButton from "@/components/FujitsuFloatingButton";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  AirVent,
  ThermometerSun,
  Snowflake,
  Sun,
  Flame,
  Star,
  User,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Factory,
  Images,
} from "lucide-react";
import fujitsuInstallation from "@/assets/fujitsu-installation.png";

const features = [
  {
    icon: Shield,
    title: "10 év kiterjesztett garancia",
    description: "Kizárólag Fujitsu oldalfali split klímákra – hivatalos regisztrációval és évi kétszeri Northwind karbantartással.",
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
    catalogLabel: "Hivatalos magyarországi árlista megnyitása",
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
    catalogLabel: "Hivatalos magyarországi árlista megnyitása",
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
    catalogLabel: "Hivatalos magyarországi árlista megnyitása",
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
    catalogLabel: "Hivatalos magyarországi árlista megnyitása",
  },
];

const solutionCategories = [
  {
    icon: AirVent,
    title: "Lakossági Split",
    tagline: "Komfort és csendes, japán precizitás.",
    body:
      "Fujitsu KL, KM, KJ és KG sorozatok lakásokba és családi házakba. Méretezésnél a helyiség adottságai alapján választjuk ki a leghalkabb és leghatékonyabb egységet.",
    bullets: [
      "Akár 19 dB(A) suttogó éjszakai üzem",
      "Human Sensor és precíz légirányítás",
      "Akár A+++ szezonális energiaosztály",
    ],
    warrantyBadge: "10 év kiterjesztett garancia",
    warrantyNote:
      "Hivatalos regisztrációval és évi kétszeri Northwind karbantartással.",
    galleryHref: "/referenciak/fujitsu-lakossagi",
  },
  {
    icon: Droplets,
    title: "Waterstage Hőszivattyúk",
    tagline: "Hatékony fűtés, hűtés és melegvíz egyetlen rendszerből.",
    body:
      "Levegő-víz hőszivattyúk padlófűtéshez, radiátoros rendszerekhez és HMV-ellátáshoz. Mérnöki méretezéssel garantáljuk a stabil COP-ot a leghidegebb téli napokon is.",
    bullets: [
      "Magas SCOP a kedvezményes H-tarifához",
      "Csendes kültéri egységek lakókörnyezetbe",
      "Integrált HMV-vezérlés és okos felügyelet",
    ],
    warrantyBadge: "3 év teljes körű gyártói garancia",
    warrantyNote: "Gyári garancia és mérnöki szervizháttér.",
    galleryHref: "/referenciak/fujitsu-waterstage",
  },
  {
    icon: Snowflake,
    title: "Légcsatornázható rendszerek",
    tagline: "Láthatatlan elegancia – a technika a háttérben marad.",
    body:
      "Álmennyezetbe vagy padlástérbe rejtett egységek igényes otthonokba és reprezentatív irodákba. Diszkrét befúvórácsok, egyenletes és huzatmentes komfort.",
    bullets: [
      "Több helyiség egyetlen rendszerről",
      "Magas statikus nyomás hosszú légcsatornákhoz",
      "Letisztult belső tér – nincs látható egység",
    ],
    warrantyBadge: "3 év teljes körű gyártói garancia",
    warrantyNote: "Gyári garancia és mérnöki szervizháttér.",
    galleryHref: "/referenciak/fujitsu-legcsatornazhato",
  },
  {
    icon: Factory,
    title: "Ipari VRF és Folyadékhűtők",
    tagline: "Mérnöki precizitás kereskedelmi és ipari léptékben.",
    body:
      "Skálázható VRF rendszerek és folyadékhűtők irodaházakhoz, szállodákhoz és ipari létesítményekhez. Tervezéstől hivatalos beüzemelésig házon belül.",
    bullets: [
      "Egyidejű hűtés-fűtés (3-csöves VRF)",
      "BMS-integráció és távoli felügyelet",
      "Hivatalos beüzemelés a gyári garanciáért",
    ],
    warrantyBadge: "Gyári garancia és mérnöki szervizháttér",
    warrantyNote:
      "Projekt-specifikus gyártói garancia – részletek egyedi ajánlatban.",
    galleryHref: "/referenciak/fujitsu-vrf",
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
    <div className="fujitsu-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Fujitsu Megoldások | Northwind – Hivatalos Columbus Klíma partner"
        description="Northwind – az Ön kiemelt Fujitsu partnere. 33 év mérnöki tapasztalat, hivatalos Columbus Klíma 10 éves kiterjesztett garancia. Lakossági, hőszivattyú, légcsatornázható és ipari VRF megoldások."
      />
      <JsonLd data={fujitsuJsonLd} />
      <Header />
      <main>
        <FujitsuHero />

        {/* Features section */}
        <section className="py-20" aria-label="Fujitsu előnyök">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-4">
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
                  className="group bg-card rounded-2xl p-6 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10-year Columbus Klíma warranty */}
        <section
          id="garancia"
          className="py-20 sm:py-28 bg-gradient-hero text-primary-foreground relative overflow-hidden"
          aria-label="10 éves Columbus Klíma kiterjesztett garancia"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider opacity-90">
                Columbus Klíma kiterjesztett garancia
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 leading-tight">
                10 év nyugalom – mérnöki garanciával
              </h2>
              <p className="text-lg sm:text-xl opacity-95 leading-relaxed mb-10 max-w-3xl mx-auto">
                A Columbus Klíma 10 éves kiterjesztett garanciája{" "}
                <strong>kizárólag a Fujitsu oldalfali split (lakossági) klímákra</strong>{" "}
                érvényes. Hőszivattyúkra, légcsatornázható és ipari rendszerekre
                a gyártó 3 év teljes körű garanciát biztosít. A 10 éves védelem
                feltételekhez kötött – ezeket nálunk hivatalból teljesítjük.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 text-left">
                {[
                  {
                    title: "Hivatalos regisztráció",
                    text: "A telepítést követően a Columbus Klíma rendszerében hivatalosan regisztráljuk a berendezést.",
                  },
                  {
                    title: "Évi kétszeri karbantartás",
                    text: "Évente kétszer, hivatalos partnerként a Northwind által dokumentált, teljes körű karbantartás szükséges.",
                  },
                  {
                    title: "Eredeti alkatrészek",
                    text: "Csak gyári Fujitsu / Columbus Klíma által szállított alkatrészek a teljes garanciaidő alatt.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-5 bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <CheckCircle2 className="w-6 h-6 mb-3 opacity-90" />
                    <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs opacity-70 mt-8 max-w-2xl mx-auto">
                A garancia részletes feltételeit a Columbus Klíma hivatalos
                tájékoztatója tartalmazza. Ajánlatkéréskor minden vonatkozó
                feltételt tételesen átadunk.
              </p>
            </div>
          </div>
        </section>

        {/* Solution categories */}
        <section className="py-20 sm:py-24 bg-background" aria-label="Fujitsu megoldási kategóriák">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Fujitsu portfólió
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-foreground">
                Megoldások a lakástól az iparig
              </h2>
              <p className="text-base text-muted-foreground">
                Minden szegmensben mérnöki gondossággal tervezünk, telepítünk és
                üzemeltetünk – a Fujitsu teljes termékskálájáról.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {solutionCategories.map((s, i) => (
                <article
                  key={s.title}
                  className="rounded-2xl p-7 sm:p-8 bg-card border-2 border-border hover:border-primary/40 transition-all flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-mono text-primary/70">0{i + 1}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground/80 mb-3">{s.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.body}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mb-5 rounded-xl p-3.5 border flex items-start gap-2.5 ${
                      s.title === "Lakossági Split"
                        ? "bg-primary/10 border-primary/30"
                        : "bg-secondary border-border"
                    }`}
                  >
                    <ShieldCheck
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        s.title === "Lakossági Split" ? "text-primary" : "text-foreground/60"
                      }`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-bold leading-tight ${
                          s.title === "Lakossági Split" ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {s.warrantyBadge}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {s.warrantyNote}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={s.galleryHref}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all self-start"
                  >
                    <Images className="w-4 h-4" />
                    Fujitsu referenciák
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Buying Guide */}
        <section className="py-20 bg-secondary" aria-label="Fujitsu modell összehasonlítás">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-4">
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
                <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-4">
                  Előnyök
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                  Miért választják ügyfeleink a Fujitsu-t?
                </h2>

                <ul className="space-y-6">
                  {sellingPoints.map((point) => (
                    <li key={point.text} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <point.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <p className="text-foreground leading-relaxed">{point.text}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-5 rounded-xl border-2 border-primary/20 bg-card">
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
      <FujitsuFloatingButton />
    </div>
  );
};

export default Fujitsu;
