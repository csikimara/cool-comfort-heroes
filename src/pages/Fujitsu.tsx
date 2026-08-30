import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FujitsuHero from "@/components/fujitsu/FujitsuHero";
import FujitsuModelCard from "@/components/fujitsu/FujitsuModelCard";
import FujitsuSummary from "@/components/fujitsu/FujitsuSummary";
import FujitsuContactForm from "@/components/fujitsu/FujitsuContactForm";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { Link } from "react-router-dom";
import { useScrollToHash } from "@/hooks/useScrollToHash";
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
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import fujitsuInstallation from "@/assets/fujitsu-installation.webp";

const features = [
  {
    icon: Shield,
    title: "Akár 10 év kiterjesztett garancia",
    description: "Jogosult lakossági oldalfali modellekre, regisztrációval és dokumentált, előírás szerinti karbantartással.",
  },
  {
    icon: Zap,
    title: "A+++ energiaosztály",
    description: "A KJ sorozat egyes változatai A+++ besorolásúak hűtésben és fűtésben egyaránt; a pontos érték modellenként ellenőrizendő.",
  },
  {
    icon: AirVent,
    title: "Csendes működés",
    description: "Egyes modellek alacsony ventilátorfokozaton 19 dB(A)-tól üzemelnek.",
  },
  {
    icon: ThermometerSun,
    title: "Fűtés akár -25°C-ig",
    description: "A KJ sorozat egyes modelljei műszaki adatlapjuk szerint akár -25°C-os külső hőmérsékletig használhatók fűtésre.",
  },
];

const sellingPoints = [
  {
    icon: AirVent,
    text: "Halk működés hálószobába – egyes modelleknél, alacsony ventilátorfokozaton már 19 dB(A)-tól.",
  },
  {
    icon: User,
    text: "Human Sensor technológia – az erre képes modellek távollét érzékelésekor takarékosabb üzemre válthatnak.",
  },
  {
    icon: Settings,
    text: "Szervizháttér – hazai importőri támogatással; az alkatrészelérhetőséget mindig az adott modellnél ellenőrizzük.",
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
      "Elsősorban megbízható nyári hűtésre. Japán fejlesztés, csendes működés és hazai importőri háttér – felesleges extrák nélkül.",
    highlights: [
      "Hűtés A++ / Fűtés A+ energiaosztály",
      "Japán megbízhatóság elérhető áron",
      "Csendes működés lakásokba",
      "Hazai importőri és szervizháttér",
    ],
    icon: Snowflake,
    accentClass: "from-sky-700 to-sky-800",
    badgeClass: "bg-sky-100 text-sky-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/eco-sorozat-kl",
    catalogLabel: "KL sorozat árai és paraméterei",
  },
  {
    id: "km",
    badge: "Standard – Kiegyensúlyozott kivitel",
    name: "Fujitsu KM sorozat (Standard)",
    subtitle: "Sokoldalú standard modell",
    tagline: "Hűtés A++ / Fűtés A++ – Fekete kivitelben is",
    description:
      "Hűtésre és fűtésre is használható standard sorozat, egyes változatoknál elegáns fekete kivitelben. A pontos felszereltség és energiaosztály modellenként ellenőrizendő.",
    highlights: [
      "Hűtés A++ / Fűtés A++ energiaosztály",
      "Elérhető modern fekete (Black) dizájnban",
      "Hűtésre és fűtésre is használható kivitel",
      "Hazai importőri és szervizháttér",
    ],
    icon: Sun,
    accentClass: "from-amber-800 to-orange-800",
    badgeClass: "bg-amber-100 text-amber-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/standard-sorozat-km",
    catalogLabel: "KM sorozat árai és paraméterei",
  },
  {
    id: "kj",
    badge: "Prémium design sorozat",
    name: "Fujitsu KJ sorozat",
    subtitle: "Prémium megjelenés és hatékonyság",
    tagline: "Hűtés A+++ / Fűtés A+++ – Prémium megjelenés",
    description:
      "Prémium Fujitsu sorozat A+++ energiaosztályú változatokkal. Egyes modelljei műszaki adatlapjuk szerint akár -25°C-os külső hőmérsékletig használhatók fűtésre; fekete kivitelben is elérhető.",
    highlights: [
      "A+++ / A+++ energiaosztály hűtésben és fűtésben",
      "Elérhető modern fekete (Black) dizájnban",
      "Egyes modellek használhatók fűtésre akár -25°C-ig",
      "Human Sensor – távollétkor takarékosabb üzemre válthat",
      "Egyes modelleknél 19 dB(A)-tól, alacsony fokozaton",
    ],
    icon: Star,
    accentClass: "from-red-700 to-red-800",
    badgeClass: "bg-red-100 text-red-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/design-sorozat-kj",
    catalogLabel: "KJ sorozat árai és paraméterei",
  },
  {
    id: "kg",
    badge: "Fűtésre is választható",
    name: "Fujitsu KG sorozat",
    subtitle: "Fűtésre optimalizált sorozat",
    tagline: "A++ / A+++ hatékonyság",
    description:
      "Fűtésre is tervezett sorozat; a használható külső hőmérséklet, a leadott teljesítmény és a fogyasztás a kiválasztott modelltől és a méretezéstől függ.",
    highlights: [
      "Egyes modelleknél A+++ fűtési energiaosztály",
      "A működési hőmérséklet-tartomány modellenként ellenőrizendő",
      "Human Sensor technológia",
      "Hazai importőri és szervizháttér",
    ],
    icon: Flame,
    accentClass: "from-emerald-700 to-emerald-800",
    badgeClass: "bg-emerald-100 text-emerald-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/design-sorozat-kg",
    catalogLabel: "KG sorozat árai és paraméterei",
  },
  {
    id: "parapet",
    badge: "Padlóra állítható – Konzol",
    name: "Fujitsu Parapet (Konzol) sorozat",
    subtitle: "Padlóra állítható inverteres klíma",
    tagline: "Prémium komfort és hatékony fűtés",
    description:
      "Padlóra állítható, kétirányú légkifúvású inverteres egység. Fűtésben alul és felül is fúj, radiátorszerű hőérzetet támogatva már a padlószinttől. Megfelelő hely és szerelési távolságok esetén ablak alá, parapet falra vagy tetőtéri ferde sík alá is elhelyezhető.",
    highlights: [
      "Kétirányú légkifúvás – fűtésben alul és felül is fúj",
      "Radiátorszerű, egyenletes hőérzet padlószinttől",
      "Megfelelő szerelési feltételeknél tetőtérbe vagy ablak alá is elhelyezhető",
      "Csendes inverteres működés a modelladatok szerint",
      "Katechin szűrő a levegőszűrés támogatására",
    ],
    icon: ArrowUpDown,
    accentClass: "from-indigo-700 to-indigo-800",
    badgeClass: "bg-indigo-100 text-indigo-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/padlora",
    catalogLabel: "Parapet (Konzol) árai és paraméterei",
    note: "Ár: Kérjen egyedi árajánlatot a telepítéssel együtt!",
  },
  {
    id: "nocria-x",
    badge: "Nocria X – Prémium modell",
    name: "Fujitsu Nocria X (ASYG-KXCA)",
    subtitle: "Prémium inverteres modell",
    tagline: "High-tech luxuskomfort és dizájn",
    description:
      "A Nocria X Dual Blaster oldalsó kiegészítő ventilátorai segítenek mérsékelni a közvetlen huzatérzetet. Automatikus szűrőtisztítással és Human Sensor mozgásérzékelővel rendelkezik; a pontos funkciókat a modell adatlapja tartalmazza.",
    highlights: [
      "Dual Blaster technológia – közvetlen huzatérzetet mérséklő légáram",
      "Automatikus szűrőtisztítás külön porgyűjtő dobozba",
      "Human Sensor – a beállítástól függően módosíthatja a légáramot és az üzemet",
      "Prémium dizájn és kivitel",
      "Automatikus szűrőtisztítás a karbantartás támogatására",
    ],
    icon: Sparkles,
    accentClass: "from-purple-700 to-fuchsia-800",
    badgeClass: "bg-purple-100 text-purple-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/oldalfali-klima/nocriax-sorozat",
    catalogLabel: "Nocria X árai és paraméterei",
    note: "Ár: Kérjen egyedi árajánlatot a prémium telepítéssel együtt!",
  },
];

const solutionCategories = [
  {
    icon: AirVent,
    title: "Lakossági Split",
    tagline: "Komfort és csendes, japán precizitás.",
    body:
      "Fujitsu KL, KM, KJ és KG sorozatok lakásokba és családi házakba. Méretezésnél a helyiség adottságai alapján választunk megfelelő teljesítményű, zajszintű és energiahatékonyságú egységet.",
    bullets: [
      "Akár 19 dB(A) suttogó éjszakai üzem",
      "Human Sensor és precíz légirányítás",
      "Akár A+++ szezonális energiaosztály",
    ],
    warrantyBadge: "Akár 10 év kiterjesztett garancia",
    warrantyNote:
      "A hivatalos regisztrációs, felhasználási és dokumentált karbantartási feltételek teljesítésével.",
    galleryHref: "/referenciak/fujitsu-lakossagi",
  },
  {
    icon: Droplets,
    title: "Waterstage Hőszivattyúk",
    tagline: "Hatékony fűtés, hűtés és melegvíz egyetlen rendszerből.",
    body:
      "Levegő-víz hőszivattyúk padlófűtéshez, radiátoros rendszerekhez és HMV-ellátáshoz. A várható teljesítményt és COP-ot a kiválasztott modell adatai, a külső hőmérséklet és az előremenő vízhőmérséklet alapján méretezzük.",
    bullets: [
      "SCOP- és műszaki feltételek ellenőrzése a H árszabási igényhez",
      "Csendes kültéri egységek lakókörnyezetbe",
      "Integrált HMV-vezérlés és okos felügyelet",
    ],
    warrantyBadge: "Termékspecifikus garancia",
    warrantyNote: "Az adott modell és ajánlat hivatalos feltételei szerint.",
    galleryHref: "/referenciak/fujitsu-waterstage",
  },
  {
    icon: Snowflake,
    title: "Légcsatornázható rendszerek",
    tagline: "Láthatatlan elegancia – a technika a háttérben marad.",
    body:
      "Álmennyezetbe vagy padlástérbe rejtett egységek igényes otthonokba és reprezentatív irodákba. Diszkrét befúvórácsok, tervezett légelosztás és a közvetlen huzathatás mérséklésének lehetősége.",
    bullets: [
      "Több helyiség egyetlen rendszerről",
      "Magas statikus nyomás hosszú légcsatornákhoz",
      "Letisztult belső tér – nincs látható egység",
    ],
    warrantyBadge: "Termékspecifikus garancia",
    warrantyNote: "Az adott modell és ajánlat hivatalos feltételei szerint.",
    galleryHref: "/referenciak/fujitsu-legcsatornazhato",
  },
  {
    icon: Factory,
    title: "Ipari VRF és Folyadékhűtők",
    tagline: "Mérnöki precizitás kereskedelmi és ipari léptékben.",
    body:
      "Skálázható VRF rendszerek és folyadékhűtők irodaházakhoz, szállodákhoz és ipari létesítményekhez. A tervezési és beüzemelési feladatokat az adott projekt és gyártói előírások szerint egyeztetjük.",
    bullets: [
      "Egyidejű hűtés-fűtés (3-csöves VRF)",
      "BMS-integráció és távoli felügyelet",
      "Gyártói előírások szerinti beüzemelés és dokumentálás",
    ],
    warrantyBadge: "Gyári garancia és szakmai szervizháttér",
    warrantyNote:
      "Projekt-specifikus gyártói garancia – részletek egyedi ajánlatban.",
    galleryHref: "/referenciak/fujitsu-vrf",
  },
];

export const fujitsuJsonLd = {
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
  useScrollToHash();
  return (
    <div className="fujitsu-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Northwind Hűtéstechnika Kft. – Fujitsu Klíma és Hőszivattyú Specialisták"
        description="A Fujitsu hivatalos partnerlistáján szereplő budapesti kivitelező. Egyes lakossági oldalfali modellekre, feltételekkel akár 10 év kiterjesztett garancia."
      />
      <JsonLd data={fujitsuJsonLd} />
      <Header />
      <main id="main-content" tabIndex={-1}>
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
          aria-label="Fujitsu kiterjesztett garancia feltételei"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <span className="block text-xs sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider break-words">
                Columbus Klíma kiterjesztett garancia
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 leading-tight">
                Akár 10 év kiterjesztett garancia
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
                A Columbus Klíma kiterjesztett garanciája a feltételeknek megfelelő,
                lakossági komfortcélra használt Fujitsu oldalfali mono és multi split
                készülékekre érhető el. A jogosultság a hivatalos regisztrációhoz,
                a szükséges bizonylatok megőrzéséhez és az előírás szerinti, dokumentált
                karbantartáshoz kötött; a részleteket mindig az aktuális gyártói feltételek határozzák meg.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 text-left">
                {[
                  {
                    title: "Hivatalos regisztráció",
                    text: "A telepítést követően a Columbus Klíma rendszerében hivatalosan regisztráljuk a berendezést.",
                  },
                  {
                    title: "Dokumentált karbantartás",
                    text: "A gyakoriságot a használat és a környezet határozza meg; az elvégzést számlával vagy munkalappal kell igazolni.",
                  },
                  {
                    title: "Megőrzött dokumentumok",
                    text: "A számla, a beüzemelési jegyzőkönyv, a regisztráció és a karbantartási bizonylatok szükségesek.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-5 bg-black/10 backdrop-blur-sm border border-white/30"
                  >
                    <CheckCircle2 className="w-6 h-6 mb-3 opacity-90" />
                    <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs mt-8 max-w-2xl mx-auto">
                <a
                  href="https://www.fujitsuklima.hu/termektamogatas/kiterjesztett-garancia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  A Columbus Klíma aktuális, hivatalos garanciafeltételei
                </a>{" "}
                az irányadók; ajánlatkéréskor a kiválasztott modellre vonatkozó feltételeket is átadjuk.
                A kiterjesztett gyártói/importőri garancia nem korlátozza a fogyasztó
                jogszabályon alapuló szavatossági és kötelező jótállási jogait.
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
                Lakossági és projektmegoldásoknál szakmai gondossággal tervezünk,
                telepítünk és üzemeltetünk a bemutatott Fujitsu termékkörből.
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
                Több eltérő kialakítás és felhasználási cél – a nyári hűtéstől a fűtésre is méretezhető megoldásokig.
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
                    <strong className="text-foreground">1993 óta gyűjtött szakmai tapasztalattal</strong> és a Fujitsu hivatalos partnerlistáján szereplő kivitelezőként
                    segítünk a megfelelő modell kiválasztásában Budapesten és Pest vármegyében.
                    A Northwind Hűtéstechnika Kft. 2009 óta biztosít stabil szakmai hátteret ehhez a tudáshoz.
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
        <FujitsuContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Fujitsu;
