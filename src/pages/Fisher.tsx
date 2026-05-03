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

const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));
const FisherFloatingButton = lazy(() => import("@/components/FisherFloatingButton"));
const FisherContactForm = lazy(() => import("@/components/fisher/FisherContactForm"));

declare global {
  interface Window {
    tidioChatApi?: { open: () => void; show?: () => void };
  }
}

const openTidio = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  if (typeof window !== "undefined" && window.tidioChatApi?.open) {
    window.tidioChatApi.open();
  }
};

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
    title: "6 év kiterjesztett garancia",
    text: "Regisztrációhoz és évi kétszeri Northwind karbantartáshoz kötött.",
  },
  {
    icon: Award,
    title: "Németh Lajos ajánlásával",
    text: "6-szoros SuperBrands díjas megbízhatóság.",
  },
  {
    icon: Wind,
    title: "Extra csendes működés",
    text: "Akár 19 dB(A) zajszint – ideális hálószobákba is.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Fűtés akár -30°C-ig",
    text: "A Nordic sorozat extrém hidegben is stabil teljesítményt nyújt.",
  },
];

const splitModels = [
  {
    id: "special",
    badge: "Komfort újdonság",
    name: "Fisher SPECIAL EDITION",
    tagline: "„Ne fújj rám” funkció, huzatmentes befúvás",
    description:
      "Az innovatív „Ne fújj rám” funkció segítségével elkerülhető a huzathatás. A beltéri ventilátor fokozatmentesen állítható. Az aktív tisztító funkcióval sterilizálható a hőcserélő. Wifin keresztül könnyen szabályozható beltéri egység.",
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
      "Tökéletes megoldás lakása hűtésére, de fűtésszezon indulása előtt érkező hideg napokon akár a lakás fűtésére is használhatja. Speciális szűrői segítségével gondoskodik otthona megfelelő levegőminőségéről. Gazdaságos működése révén biztosítja az energiahatékonyságot.",
    warranty6: true,
    icon: Sun,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/summer-sorozat",
    catalogLabel: "SUMMER árai és paraméterei",
  },
  {
    id: "comfort-plus",
    badge: "Csúcsmodell",
    name: "Fisher COMFORT PLUS",
    tagline: "Fűtésre optimalizált (-22°C), 6 év garancia",
    description:
      "Az új Comfort Plus egész évben a kényelmet szolgálja, alacsony üzemeltetési költség és környezetbarát technológia mellett.",
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
      "Fűtésre optimalizált berendezés, akár -30°C-ig fűt. A+++ energiahatékonyságú, kiválthatja fűtési rendszerét akár erre a berendezésre. Sok extra kényelmi funkcióval felszerelt, hogy az Ön kényelmét maximálisan kiszolgálja.",
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
      "Fekete szépség, hűvös hatás: a stílus és a minőség tökéletes harmóniája. Az esztétikus, tükrös előlappal rendelkező fekete készülék a Fisher klímáknál megszokott gazdag felszereltséggel és kiemelkedő műszaki tulajdonságokkal rendelkezik.",
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
      "Ez az exkluzív klímaberendezés külsejében és működésében is igazodik az egyedi igényekhez. Cserélhető mágneses design panelek segítségével bármilyen környezetben a szoba díszévé tehető. A 180°-ban állítható légterelő lapátoknak köszönhetően eddig nem látott precizitás érhető el. Aktív tisztító funkciója por- és szennyeződésmentes légteret biztosít.",
    warranty6: true,
    icon: Palette,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/art-sorozat",
    catalogLabel: "ART árai és paraméterei",
  },
];

const Fisher = () => {
  const fisherJsonLd = {
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

  return (
    <div className="fisher-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Northwind – Az Ön kiemelt Fisher partnere | Fisher Klímaberendezések"
        description="Hivatalos Fisher partner Budapesten. 33 év tapasztalat, 6 év kiterjesztett garancia. Special Edition, Summer, Comfort Plus, Nordic, Black, Art sorozatok és osztott hőszivattyú."
      />
      <JsonLd data={fisherJsonLd} />
      <Header />
      <Suspense fallback={null}>
        <FujitsuFloatingButton />
        <FisherFloatingButton />
      </Suspense>

      <main>
        {/* Hero – mirroring Fujitsu hero layout */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-white">
          <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: "#1f3d66" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border"
                style={{
                  backgroundColor: "rgba(31,61,102,0.08)",
                  borderColor: "rgba(31,61,102,0.3)",
                  color: "#1f3d66",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Hivatalos Fisher partner
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] text-foreground">
                Northwind – Az Ön kiemelt{" "}
                <span style={{ color: "#1f3d66" }}>Fisher</span> partnere
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-9 max-w-2xl mx-auto leading-relaxed">
                Több mint 33 év tapasztalat és hivatalos Columbus Klíma garancia minden telepített
                rendszer mögött.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#1f3d66" }}
                  onClick={openTidio}
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
                  <a href="#fisher-garancia">6 éves garancia részletei</a>
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
                className="rounded-3xl overflow-hidden border-2 shadow-elevated"
                style={{ borderColor: "rgba(0,126,198,0.25)" }}
              >
                <div style={{ backgroundColor: "#1f3d66" }}>
                  <img
                    src={nemethLajos}
                    alt="Németh Lajos meteorológus a Fishert ajánlja – Superbrands díjas minőség"
                    width={1460}
                    height={310}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block"
                  />
                </div>
                <div
                  className="px-6 py-6 sm:px-10 sm:py-7 text-center"
                  style={{ backgroundColor: "rgba(0,126,198,0.08)" }}
                >
                  <p className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">
                    „Németh Lajos meteorológus a Fishert ajánlja!"
                  </p>
                  <p
                    className="text-sm sm:text-base mt-1.5"
                    style={{ color: "#1f3d66" }}
                  >
                    <Award className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                    Megbízható minőség kedvező áron.
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
                A Fisher teljes oldalfali kínálata
              </h2>
              <p className="text-base text-muted-foreground">
                Hat sorozat – a gazdaságos hűtéstől a sarkvidéki fűtésig és az egyedi dizájnig.
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
                          title="6 év kiterjesztett garancia"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          6 év garancia
                        </span>
                      )}
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(0,126,198,0.1)",
                          color: "#007ec6",
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
                    style={{ color: "#007ec6" }}
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
                      style={{ borderColor: "#007ec6", color: "#007ec6" }}
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
              <article
                className="rounded-3xl bg-white border-2 shadow-card p-7 sm:p-10"
                style={{ borderColor: "rgba(31,61,102,0.18)" }}
              >
                <div className="grid sm:grid-cols-[auto,1fr] gap-6 items-start">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
                    style={{ background: "linear-gradient(135deg, #1f3d66 0%, #007ec6 100%)" }}
                  >
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                      Fisher Osztott (Split) Hőszivattyú
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-5">
                      Megbízható fűtés és melegvíz-ellátás családi házak részére. Modern technológia,
                      kedvező üzemeltetési költség és a Northwind szakszerű telepítése.
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {[
                        "R32 hűtőközeg – modern és környezetbarát",
                        "H-tarifa kompatibilitás – kedvezőbb rezsi",
                        "3 év teljes körű gyártói garancia",
                      ].map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/85"
                        >
                          <CheckCircle2
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: "#007ec6" }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="group text-white hover:opacity-90"
                        style={{ backgroundColor: "#1f3d66" }}
                        onClick={scrollToContactForm}
                      >
                        Ajánlatot kérek
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent"
                        style={{ borderColor: "#007ec6", color: "#007ec6" }}
                        asChild
                      >
                        <Link
                          to="/fisher-hoszivattyu"
                          className="inline-flex items-center gap-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Részletek és modellek
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 6-year warranty + closing CTA */}
        <section
          id="fisher-garancia"
          className="py-20 sm:py-24 text-white"
          style={{ background: "linear-gradient(135deg, #1f3d66 0%, #007ec6 100%)" }}
          aria-label="6 éves garancia és ingyenes felmérés"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-5 opacity-90" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                6 év nyugalom – Northwind garanciával
              </h2>
              <p className="text-base sm:text-lg opacity-95 mb-8 max-w-2xl mx-auto">
                A 6 év kiterjesztett Fisher garancia hivatalos regisztrációhoz és évi kétszeri
                Northwind karbantartáshoz kötött. Mindkettőt nálunk hivatalból elvégezzük.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90"
                  style={{ color: "#1f3d66" }}
                  onClick={openTidio}
                >
                  Ingyenes felmérést kérek
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <a href="tel:+36704099760">
                    <Phone className="w-4 h-4" />
                    +36 70 409 9760
                  </a>
                </Button>
              </div>
              <p className="text-sm opacity-80 mt-10">
                A Fisher klímák magyarországi importőre: Columbus Klímaértékesítő Kft.
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
                33 év hűtéstechnikai tapasztalattal rendelkező szakmai háttérrel.
                Helyszíni felmérés és szakszerű rendszervázlat – kötelezettségek nélkül.
                Hivatalos Columbus Klíma garancia: 6 év az oldalfali split Fisher
                klímákra (regisztrációval és évi kétszeri Northwind karbantartással),
                3 év a hőszivattyúkra.
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
                  <a href="mailto:northwind@northwind.hu">
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