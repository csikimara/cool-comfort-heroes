import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Wind,
  Award,
  ThermometerSnowflake,
  CheckCircle2,
  Sun,
  ArrowRight,
  Star,
  Flame,
  Droplets,
  Palette,
  Sparkle,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import nemethLajos from "@/assets/nemeth-lajos-fisher.png";
import fisherLogo from "@/assets/fisher-logo.png";

const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));
const FisherContactForm = lazy(() => import("@/components/fisher/FisherContactForm"));
const BrandGallery = lazy(() => import("@/components/BrandGallery"));

const scrollToContactForm = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  if (typeof window === "undefined") return;
  const el = document.getElementById("fisher-contact-form");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const introCards = [
  {
    icon: ShieldCheck,
    title: "Akár 6 év kiterjesztett garancia",
    text: "Jogosult lakossági oldalfali modellekre, regisztrációval és dokumentált karbantartással.",
  },
  {
    icon: Award,
    title: "Németh Lajos ajánlásával",
    text: "Többszörös Business Superbrands díjas márka.",
  },
  {
    icon: Wind,
    title: "Egyes modelleknél 19 dB(A)-tól",
    text: "A legalacsonyabb megadott beltéri zajszint modelltől és ventilátorfokozattól függ.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Fűtés akár -30°C-ig",
    text: "A Nordic sorozat egyes modelljei műszaki adatlapjuk szerint akár -30°C-os külső hőmérsékletig használhatók fűtésre.",
  },
];

const splitModels = [
  {
    id: "special",
    badge: "Komfort funkciók",
    name: "Fisher SPECIAL EDITION",
    tagline: "„Ne fújj rám” funkció a közvetlen huzatérzet mérséklésére",
    description:
      "Az innovatív „Ne fújj rám” funkció segítségével mérsékelhető a közvetlen huzathatás. A beltéri ventilátor fokozatmentesen állítható. Az aktív tisztító funkció támogatja a hőcserélő tisztán tartását. Wi-Fi-n keresztül könnyen szabályozható beltéri egység.",
    warranty6: false,
    icon: Wind,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/special-edition-sorozat",
    catalogLabel: "SPECIAL EDITION árai és paraméterei",
  },
  {
    id: "summer",
    badge: "Gazdaságos",
    name: "Fisher SUMMER",
    tagline: "Gazdaságos hűtés, fűtés -15°C-ig",
    description:
      "Elsősorban lakások hűtésére, valamint a modell műszaki határain belül átmeneti időszaki fűtésre használható. Szűrői támogatják a levegő szűrését; a tényleges fogyasztás a beállítástól, a méretezéstől és az épület adottságaitól függ.",
    warranty6: true,
    icon: Sun,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/summer-sorozat",
    catalogLabel: "SUMMER árai és paraméterei",
  },
  {
    id: "comfort-plus",
    badge: "Prémium modell",
    name: "Fisher COMFORT PLUS",
    tagline: "Fűtésre optimalizált (-22°C), feltételekkel akár 6 év garancia",
    description:
      "A Comfort Plus hűtésre és fűtésre is használható. Az energiaosztályt, a működési hőmérséklet-tartományt és a várható fogyasztást a kiválasztott modell adatlapja alapján ellenőrizzük.",
    warranty6: true,
    icon: Star,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/comfort-plus-sorozat",
    catalogLabel: "COMFORT PLUS árai és paraméterei",
  },
  {
    id: "nordic",
    badge: "Extrém hideg",
    name: "Fisher NORDIC",
    tagline: "Prémium fűtés -30°C-ig, A+++ hatékonyság",
    description:
      "Fűtésre optimalizált sorozat; egyes modelljei műszaki adatlapjuk szerint akár -30°C-os külső hőmérsékletig használhatók fűtésre, és A+++ energiaosztályt is elérhetnek. Önálló vagy kiegészítő fűtésre csak hőveszteség-számítás és modellspecifikus méretezés után javasolható.",
    warranty6: true,
    icon: Flame,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/nordic-sorozat",
    catalogLabel: "NORDIC árai és paraméterei",
  },
  {
    id: "black",
    badge: "Dizájn",
    name: "Fisher BLACK",
    tagline: "Tükrös fekete előlap, elegáns megjelenés",
    description:
      "Az esztétikus, tükrös előlappal rendelkező fekete készülék a Fisher sorozatokra jellemző kényelmi funkciókkal érhető el. A pontos felszereltség és műszaki paraméterek modellenként eltérhetnek.",
    warranty6: false,
    icon: Sparkle,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/black-sorozat",
    catalogLabel: "BLACK árai és paraméterei",
  },
  {
    id: "art",
    badge: "Egyedi panel",
    name: "Fisher ART",
    tagline: "Cserélhető mágneses panelek, egyedi design",
    description:
      "Ez az exkluzív klímaberendezés külsejében és működésében is igazodik az egyedi igényekhez. Cserélhető mágneses design panelek segítségével a belső térhez alakítható. A 180°-ban állítható légterelő lapátok pontos légirányítást tesznek lehetővé. Aktív tisztító funkciója támogatja a hőcserélő tisztán tartását.",
    warranty6: true,
    icon: Palette,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/art-sorozat",
    catalogLabel: "ART árai és paraméterei",
  },
];

export const fisherJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Fisher klíma modellek – Northwind Hűtéstechnika",
  itemListElement: splitModels.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.name,
    description: m.tagline,
  })),
};

const Fisher = () => {

  return (
    <div className="fisher-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Fisher Klíma Telepítés és Garancia | Northwind Hűtéstechnika"
        description="Fisher split klímák: egyes lakossági oldalfali modellekre, feltételekkel akár 6 év kiterjesztett garancia. Szakszerű szerelés és karbantartás."
      />
      <JsonLd data={fisherJsonLd} />
      <Header />
      <Suspense fallback={null}>
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-4 items-end"><FujitsuFloatingButton /></div>
      </Suspense>

      <main id="main-content" tabIndex={-1}>
        {/* Back to Northwind home */}
        <div className="bg-white pt-28 pb-2">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full text-white hover:opacity-90 transition-opacity shadow-sm"
              style={{ backgroundColor: "#1f3d66" }}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Vissza a Northwind kezdőlapjára
            </Link>
          </div>
        </div>

        {/* Hero – mirroring Fujitsu hero layout */}
        <section className="relative pt-10 pb-24 overflow-hidden bg-white">
          <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: "#1f3d66" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <img
                src={fisherLogo}
                alt="Fisher Klíma hivatalos logó - Northwind"
                className="mx-auto mb-6 h-14 sm:h-16 w-auto"
                width={360}
                height={120}
                loading="eager"
                decoding="async"
              />
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border"
                style={{
                  backgroundColor: "rgba(31,61,102,0.08)",
                  borderColor: "rgba(31,61,102,0.3)",
                  color: "#1f3d66",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Fisher klímamegoldások
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] text-foreground">
                Northwind – <span style={{ color: "#1f3d66" }}>Fisher</span> megoldások
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-9 max-w-2xl mx-auto leading-relaxed">
                Szakmai tapasztalat 1993 óta, hivatalos importőri háttérrel és az adott termékre
                vonatkozó garanciafeltételekkel.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#1f3d66" }}
                  onClick={scrollToContactForm}
                >
                  Kérjen egyedi Fisher tervezést
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent hover:text-white"
                  style={{ borderColor: "#1f3d66", color: "#1f3d66" }}
                  asChild
                >
                  <a href="#fisher-garancia">Az akár 6 éves garancia részletei</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro cards – Miért a Fisher? */}
        <section className="py-16 sm:py-20 bg-secondary" aria-label="Miért a Fisher?">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span
                className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: "#1f3d66" }}
              >
                Miért a Fisher?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Megbízhatóság, csend és komfort
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {introCards.map((c) => (
                <div
                  key={c.title}
                  className="bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(31,61,102,0.08)" }}
                  >
                    <c.icon className="w-6 h-6" style={{ color: "#1f3d66" }} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Németh Lajos trust block */}
        <section className="py-14 sm:py-20 bg-white" aria-label="Németh Lajos ajánlása">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div
                className="rounded-3xl border-2 shadow-elevated bg-white overflow-hidden grid sm:grid-cols-[auto,1fr] items-center gap-6 sm:gap-10 p-6 sm:p-10"
                style={{ borderColor: "rgba(0,126,198,0.25)" }}
              >
                <img
                  src={nemethLajos}
                  alt="Németh Lajos meteorológus Fisher klímát ajánl"
                  width={360}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-44 sm:w-56 h-auto mx-auto"
                />
                <div className="text-center sm:text-left">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 text-white"
                    style={{ backgroundColor: "#1f3d66" }}
                  >
                    <ShieldCheck className="w-3 h-3" />Akár 6 év
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
                    Németh Lajos meteorológus a Fishert ajánlja
                  </h3>
                  <p
                    className="text-sm sm:text-base font-semibold mb-2"
                    style={{ color: "#1f3d66" }}
                  >
                    <Award className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                    Megbízható minőség kedvező áron.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Többszörös Business Superbrands díjas márka – a Fisher{" "}
                    <a
                      href="https://www.fisherklima.hu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      aktuális hivatalos oldala
                    </a>{" "}
                    szerint, az adott termék garanciafeltételeivel és a Northwind
                    szakszerű telepítésével.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split lineup – 3 column white cards */}
        <section
          id="fisher-termekek"
          className="py-20 sm:py-24 bg-secondary"
          aria-label="Fisher split klíma sorozatok"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span
                className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: "#1f3d66" }}
              >
                Split klíma sorozatok
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Válogatott Fisher oldalfali sorozatok
              </h2>
              <p className="text-base text-muted-foreground">
                Hat bemutatott sorozat – a hűtési célú modellektől a fűtésre optimalizált és egyedi megjelenésű változatokig.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {splitModels.map((m) => (
                <article
                  key={m.id}
                  className="rounded-2xl bg-white border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col p-6 sm:p-7"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(31,61,102,0.08)" }}
                    >
                      <m.icon className="w-6 h-6" style={{ color: "#1f3d66" }} />
                    </div>
                    <div className="ml-auto flex items-center gap-2 flex-wrap justify-end">
                      {m.warranty6 && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: "#1f3d66" }}
                          title="Feltételekkel akár 6 év kiterjesztett garancia"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          Akár 6 év
                        </span>
                      )}
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(0,126,198,0.1)",
                          color: "#1f3d66",
                        }}
                      >
                        {m.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1.5 leading-tight">
                    {m.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{ color: "#0077bd" }}
                  >
                    {m.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {m.description}
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <Button
                      className="w-full text-white hover:opacity-90 min-h-[44px]"
                      style={{ backgroundColor: "#1f3d66" }}
                      onClick={scrollToContactForm}
                    >
                      Ajánlatot kérek
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent min-h-[44px] text-xs sm:text-sm whitespace-normal h-auto py-2.5"
                      style={{ borderColor: "#0077bd", color: "#0077bd" }}
                      asChild
                    >
                      <a
                        href={m.catalogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>{m.catalogLabel}</span>
                      </a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reference gallery – Fisher splits only */}
        <Suspense fallback={null}>
          <BrandGallery
            slug="lakossagi-split"
            filenamePrefix="fisher_"
            title="Referenciáink: Fisher Split Klíma Telepítések"
            accent="#1f3d66"
            bgClassName="bg-white"
            defaultAlt="Fisher split klíma telepítés referencia – Northwind"
            buttonOnly
            buttonLabel="Megnézem a Fisher klíma referenciákat"
          />
        </Suspense>

        {/* Heat pump section */}
        <section
          className="py-20 sm:py-24 bg-white"
          aria-label="Fisher levegő-víz hőszivattyúk"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span
                className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: "#1f3d66" }}
              >
                Hőszivattyú megoldás
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Fisher Levegő-Víz Hőszivattyúk
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Link
                to="/fisher-hoszivattyu"
                className="group block rounded-3xl bg-white border-2 shadow-card p-7 sm:p-10 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ borderColor: "rgba(31,61,102,0.18)" }}
                aria-label="Fisher Osztott (Split) Hőszivattyú részletes oldala"
              >
                <div className="grid sm:grid-cols-[auto,1fr] gap-6 items-start">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
                    style={{ background: "linear-gradient(135deg, #1f3d66 0%, #0077bd 100%)" }}
                  >
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                      Fisher Osztott (Split) Hőszivattyú
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-5">
                      Fűtési és melegvíz-ellátási megoldás családi házakhoz. A várható
                      teljesítményt és üzemeltetési költséget helyszíni felmérés és méretezés alapján vizsgáljuk.
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {[
                        "R32 hűtőközeg – a pontos környezeti adatok a termékdokumentációban",
                        "A H árszabási jogosultság műszaki feltételeinek ellenőrzése",
                        "Garancia az adott modell és szerződés feltételei szerint",
                      ].map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/85"
                        >
                          <CheckCircle2
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: "#0077bd" }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <span
                      className="inline-flex items-center gap-2 text-base font-semibold"
                      style={{ color: "#1f3d66" }}
                    >
                      Részletek és modellek
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>

              {/*
                Pixel-perfect CTA row — all three buttons share the EXACT same
                box model (h-14, w-full, px-6, rounded-md, text-sm, leading-none,
                gap-2, w-4 h-4 icons). The outline button uses an inset
                box-shadow ring instead of a border so it doesn't add 2px to its
                size. Hover/focus/active/disabled effects use opacity, ring and
                shadow only — never width/height changes — so there is zero
                layout shift between states.
              */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-stretch">
                <a
                  href="#fisher-contact-form"
                  className="group inline-flex items-center justify-center gap-2 h-14 w-full px-6 rounded-md text-white font-medium text-sm leading-none shadow transition-opacity hover:opacity-90 active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1f3d66] box-border"
                  style={{ backgroundColor: "#1f3d66" }}
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="leading-none">Ajánlatot kérek</span>
                </a>
                <a
                  href="https://www.fisherklima.hu/termekek/hoszivattyu-berendezesek/osztott-split-hoszivattyu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 h-14 w-full px-6 rounded-md font-medium text-sm leading-none bg-transparent transition-colors hover:bg-[#0077bd]/10 active:bg-[#0077bd]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0077bd] box-border"
                  style={{
                    color: "#0077bd",
                    boxShadow: "inset 0 0 0 2px #0077bd",
                  }}
                >
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="leading-none">e-HeatR hőszivattyúk árai</span>
                </a>
                <Suspense fallback={null}>
                  <BrandGallery
                    slug="hoszivattyu"
                    filenamePrefix="fisher_"
                    title="Fisher e-HeatR hőszivattyú referenciák"
                    accent="#1f3d66"
                    defaultAlt="Fisher e-HeatR hőszivattyú telepítés referencia – Northwind"
                    buttonOnly
                    inline
                    buttonLabel="Hőszivattyú referenciák"
                    buttonClassName="group inline-flex items-center justify-center gap-2 h-14 w-full px-6 rounded-md text-white font-medium text-sm leading-none shadow transition-opacity hover:opacity-90 active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1f3d66] disabled:opacity-70 disabled:cursor-wait box-border"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* 6-year warranty + closing CTA */}
        <section
          id="fisher-garancia"
          className="py-20 sm:py-24 text-white"
          style={{ background: "linear-gradient(135deg, #1f3d66 0%, #0077bd 100%)" }}
          aria-label="Fisher kiterjesztett garancia és felmérés"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-5 opacity-90" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Akár 6 év kiterjesztett Fisher garancia
              </h2>
              <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                A Columbus Klíma kiterjesztett garanciája a feltételeknek megfelelő, lakossági
                komfortcélra használt Fisher oldalfali mono és multi split készülékekre érhető el.
                A készüléket az üzembe helyezéstől számított 90 napon belül regisztrálni kell,
                és a használat, valamint a környezet alapján meghatározott gyakoriságú karbantartást
                számlával vagy munkalappal igazolni kell. A karbantartást bármely megfelelő
                képesítéssel és érvényes F-gáz jogosultsággal rendelkező szakember elvégezheti.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90"
                  style={{ color: "#1f3d66" }}
                  onClick={scrollToContactForm}
                >
                  Felmérést kérek
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 bg-black/10 text-white hover:bg-black/20"
                  asChild
                >
                  <a href="tel:+36704099760">
                    <Phone className="w-4 h-4" />
                    +36 70 409 9760
                  </a>
                </Button>
              </div>
              <p className="text-sm mt-10">
                A Fisher klímák magyarországi importőre: Columbus Klímaértékesítő Kft.{" "}
                <a
                  href="https://www.fisherklima.hu/tamogatas/kiterjesztett-garancia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Hivatalos garanciafeltételek
                </a>.
                A kiterjesztett gyártói/importőri garancia nem korlátozza a fogyasztó
                jogszabályon alapuló szavatossági és kötelező jótállási jogait.
              </p>
            </div>
          </div>
        </section>

        {/* Combined Contact Zone: button block + message form */}
        <section
          id="contact"
          className="py-20 sm:py-24 bg-secondary scroll-mt-24"
          aria-label="Kapcsolatfelvétel és szakmai konzultáció"
        >
          <div className="container mx-auto px-4 space-y-10">
            {/* Top: button block */}
            <div
              className="max-w-3xl mx-auto rounded-3xl bg-card border-2 p-8 sm:p-12 text-center shadow-xl"
              style={{ borderColor: "rgba(31,61,102,0.3)" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "#1f3d66" }}
              >
                <Award className="w-8 h-8 text-white" />
              </div>
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: "#1f3d66" }}
              >
                Szakmai konzultáció és felmérés
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
                Kérjen egyedi Fisher tervezést és ajánlatot a Northwind szakértőitől
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                1993 óta gyűjtött hűtéstechnikai szakmai tapasztalattal.
                Helyszíni felmérés és szakszerű rendszervázlat – kötelezettségek nélkül.
                Egyes lakossági oldalfali split Fisher klímákra a hivatalos feltételek
                teljesítésével akár 6 év kiterjesztett garancia érhető el. Más termékek
                jótállási és garanciális feltételeit az adott ajánlat és gyártói dokumentáció tartalmazza.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#1f3d66" }}
                  asChild
                >
                  <a href="tel:+36704099760">
                    <Phone className="w-4 h-4" />
                    Hívás most
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#1f3d66" }}
                  asChild
                >
                  <a href="#fisher-contact-form">
                    <Mail className="w-4 h-4" />
                    E-mail küldése
                  </a>
                </Button>
              </div>
            </div>

            {/* Elegant divider */}
            <div className="max-w-2xl mx-auto flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(31,61,102,0.35))" }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: "#1f3d66" }}
              >
                vagy írjon nekünk
              </span>
              <span className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(31,61,102,0.35))" }} />
            </div>

            {/* Bottom: message form */}
            <Suspense fallback={null}>
              <FisherContactForm />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Fisher;
