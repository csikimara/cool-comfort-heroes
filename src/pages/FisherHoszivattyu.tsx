import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ThermometerSnowflake,
  Cpu,
  Clock,
  Droplets,
  Flame,
  Gauge,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  ArrowLeft,
} from "lucide-react";
import composite from "@/assets/fisher-eheatr-composite.png";
import controller from "@/assets/fisher-controller.png";
import erp35 from "@/assets/fisher-erp-35.png";
import erp55 from "@/assets/fisher-erp-55.png";
import fisherLogo from "@/assets/fisher-logo.png";
import nemethLajos from "@/assets/nemeth-lajos-fisher.png";

const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));
const FisherFloatingButton = lazy(() => import("@/components/FisherFloatingButton"));
const FisherContactForm = lazy(() => import("@/components/fisher/FisherContactForm"));

const NAVY = "#1f3d66";
const LIGHT = "#007ec6";
const FISHER_HP_URL =
  "https://www.fisherklima.hu/termekek/hoszivattyu-berendezesek/osztott-split-hoszivattyu#sp-main-body";

const scrollToContactForm = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  if (typeof window === "undefined") return;
  const el = document.getElementById("fisher-contact-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const lineup = [
  { kw: "8 kW", note: "Kisebb családi házakhoz" },
  { kw: "10 kW", note: "Átlagos méretű otthonokhoz" },
  { kw: "12 kW", note: "Nagyobb családi házakhoz" },
  { kw: "16 kW", note: "Kiemelt fűtési igényhez" },
];

const smartFeatures = [
  { icon: Clock, text: "Heti időzítés" },
  { icon: Droplets, text: "HMV sterilizálás" },
  { icon: Flame, text: "Kiegészítő fűtés vezérlés" },
  { icon: ThermometerSnowflake, text: "Beépített hőmérséklet érzékelő" },
];

const FisherHoszivattyu = () => {
  return (
    <div className="fisher-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Fisher e-HeatR Hőszivattyú Telepítés | Gazdaságos Fűtés | Northwind"
        description="Akár -28°C-ig üzembiztos Fisher hőszivattyúk H-tarifával. Komplett fűtés, hűtés és melegvíz megoldások. Ingyenes helyszíni felmérés!"
      />
      <Header />
      <Suspense fallback={null}>
        <FujitsuFloatingButton />
      </Suspense>

      <main>
        {/* Back nav */}
        <div className="bg-white pt-28 pb-2">
          <div className="container mx-auto px-4 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full text-white hover:opacity-90 transition-opacity shadow-sm"
              style={{ backgroundColor: NAVY }}
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza a Northwind kezdőlapjára
            </Link>
            <Link
              to="/fisher"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border hover:opacity-80 transition-opacity"
              style={{ color: NAVY }}
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza a Fisher főoldalra
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="relative pt-6 pb-20 bg-white overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: NAVY }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <div>
                <img
                  src={fisherLogo}
                  alt="Fisher Klímaberendezések hivatalos logó"
                  className="mb-5 h-12 sm:h-14 w-auto"
                  width={300}
                  height={100}
                  loading="eager"
                  decoding="async"
                />
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border"
                  style={{
                    backgroundColor: "rgba(31,61,102,0.08)",
                    borderColor: "rgba(31,61,102,0.3)",
                    color: NAVY,
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Fisher hivatalos partner
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-5">
                  Fisher{" "}
                  <span style={{ color: NAVY }}>e-HeatR</span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3 text-foreground/80">
                    Komplett hőszivattyús megoldás a Northwind szakértőitől
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Levegő-víz osztott hőszivattyú családi házakhoz: csendes
                  kültéri egység, kompakt beltéri modul és intelligens
                  érintőképernyős vezérlés – egy rendszerben.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="text-white hover:opacity-90"
                    style={{ backgroundColor: NAVY }}
                    onClick={scrollToContactForm}
                  >
                    Egyedi tervezést kérek
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent"
                    style={{ borderColor: NAVY, color: NAVY }}
                    asChild
                  >
                    <a href={FISHER_HP_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Aktuális árak a gyártónál
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div
                  className="rounded-3xl p-6 sm:p-8 border-2 shadow-elevated"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(31,61,102,0.06) 0%, rgba(0,126,198,0.08) 100%)",
                    borderColor: "rgba(31,61,102,0.18)",
                  }}
                >
                  <img
                    src={composite}
                    alt="Fisher e-HeatR hőszivattyú beltéri egység, kültéri egység és érintőképernyős vezérlő"
                    className="w-full h-auto block mx-auto"
                    width={500}
                    height={500}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Efficiency */}
        <section className="py-20 sm:py-24 bg-secondary" aria-label="Hatékonyság">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span
                className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: NAVY }}
              >
                Hatékonyság és teljesítmény
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Maximális hatékonyság minden rendszerhez
              </h2>
              <p className="text-base text-muted-foreground">
                A++ besorolás padlófűtéshez (35°C) és radiátoros rendszerekhez
                (55°C) egyaránt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {[
                { img: erp35, title: "Padlófűtés", temp: "35°C előremenő hőmérséklet", desc: "Ideális új építésű, alacsony hőmérsékletű rendszerekhez." },
                { img: erp55, title: "Radiátoros rendszer", temp: "55°C előremenő hőmérséklet", desc: "Meglévő radiátoros fűtéshez is kiváló választás." },
              ].map((b) => (
                <div
                  key={b.title}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-card hover:shadow-elevated transition-all duration-300 text-center"
                >
                  <img
                    src={b.img}
                    alt={`A++ energiaosztály – Erp ${b.temp}`}
                    className="w-32 h-auto mx-auto mb-5"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="text-xl font-bold mb-1" style={{ color: NAVY }}>
                    {b.title}
                  </h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: LIGHT }}>
                    {b.temp}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <div
              className="max-w-3xl mx-auto rounded-2xl px-6 py-5 flex items-start gap-4 border-2"
              style={{
                borderColor: "rgba(31,61,102,0.2)",
                backgroundColor: "rgba(0,126,198,0.06)",
              }}
            >
              <ThermometerSnowflake
                className="w-7 h-7 flex-shrink-0 mt-0.5"
                style={{ color: NAVY }}
              />
              <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                Megbízható fűtés akár <strong>-28°C-os</strong> külső
                hőmérséklet mellett is.
              </p>
            </div>
          </div>
        </section>

        {/* Smart Control */}
        <section className="py-20 sm:py-24 bg-white" aria-label="Intelligens vezérlés">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                <span
                  className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
                  style={{ color: NAVY }}
                >
                  Smart Control
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">
                  Érintőképernyős intelligens vezérlés
                </h2>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  Áttekinthető, modern kezelőfelület minden funkció eléréséhez –
                  egyszerűen és gyorsan.
                </p>

                <ul className="space-y-3 mb-7">
                  {smartFeatures.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(31,61,102,0.08)" }}
                      >
                        <f.icon className="w-5 h-5" style={{ color: NAVY }} />
                      </div>
                      <span className="text-base text-foreground/90 pt-1.5">{f.text}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl p-5 border-l-4"
                  style={{
                    borderColor: LIGHT,
                    backgroundColor: "rgba(0,126,198,0.06)",
                  }}
                >
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    <strong style={{ color: NAVY }}>Egyedi előny:</strong> A
                    kezelőegység kiemelhető, és a beltéri egységtől akár{" "}
                    <strong>100 méteres</strong> távolságra is elhelyezhető.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div
                  className="rounded-3xl p-8 sm:p-10 border-2 shadow-elevated flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #1f3d66 0%, #007ec6 100%)",
                    borderColor: "rgba(31,61,102,0.2)",
                  }}
                >
                  <img
                    src={controller}
                    alt="Fisher e-HeatR érintőképernyős hőszivattyú vezérlő"
                    className="w-full max-w-xs h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lineup */}
        <section className="py-20 sm:py-24 bg-secondary" aria-label="Termékkínálat">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span
                className="inline-block text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: NAVY }}
              >
                Teljesítmények
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Fisher e-HeatR teljesítményszintek
              </h2>
              <p className="text-base text-muted-foreground">
                Minden otthonhoz a megfelelő méretű hőszivattyú – válassza ki a
                fűtési igényének megfelelő modellt.
              </p>
            </div>

            {/* Featured composite image */}
            <div className="max-w-2xl mx-auto mb-12">
              <div
                className="rounded-3xl p-6 sm:p-8 border-2 shadow-elevated"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(31,61,102,0.06) 0%, rgba(0,126,198,0.08) 100%)",
                  borderColor: "rgba(31,61,102,0.18)",
                }}
              >
                <img
                  src={composite}
                  alt="Fisher e-HeatR hőszivattyú beltéri egység, kültéri egység és érintőképernyős vezérlő"
                  className="w-full h-auto block mx-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {lineup.map((m) => (
                <article
                  key={m.kw}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col text-center"
                >
                  <div
                    className="inline-flex items-center justify-center gap-1.5 mx-auto px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-3 text-white"
                    style={{ backgroundColor: NAVY }}
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    {m.kw}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-1">
                    {m.note}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-xs sm:text-sm whitespace-normal h-auto py-2.5 min-h-[44px]"
                    style={{ borderColor: LIGHT, color: LIGHT }}
                    asChild
                  >
                    <a
                      href={FISHER_HP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>Műszaki adatok és árak</span>
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Németh Lajos trust block */}
        <section className="py-16 sm:py-20 bg-white" aria-label="Németh Lajos ajánlása">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="rounded-3xl border-2 shadow-elevated bg-white grid sm:grid-cols-[auto,1fr] items-center gap-6 sm:gap-10 p-6 sm:p-10"
                style={{ borderColor: "rgba(0,126,198,0.25)" }}
              >
                <img
                  src={nemethLajos}
                  alt="Németh Lajos meteorológus a Fishert ajánlja"
                  width={360}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-40 sm:w-52 h-auto mx-auto"
                />
                <div className="text-center sm:text-left">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 text-white"
                    style={{ backgroundColor: NAVY }}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Meteorológus ajánlja
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
                    „Németh Lajos meteorológus a Fishert ajánlja!"
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A Fisher e-HeatR hőszivattyúk a Columbus Klíma hivatalos
                    garanciájával és a Northwind szakszerű telepítésével –
                    megbízható minőség kedvező áron.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* H-Tarifa */}
        <section className="py-20 sm:py-24 bg-white" aria-label="H-tarifa">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto rounded-3xl p-7 sm:p-12 border-2 shadow-elevated"
              style={{
                borderColor: "rgba(31,61,102,0.2)",
                background:
                  "linear-gradient(135deg, rgba(31,61,102,0.04) 0%, rgba(0,126,198,0.08) 100%)",
              }}
            >
              <div className="grid sm:grid-cols-[auto,1fr] gap-6 items-start">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
                  style={{ background: "linear-gradient(135deg, #1f3d66 0%, #007ec6 100%)" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span
                    className="inline-block text-sm font-bold uppercase tracking-wider mb-2"
                    style={{ color: NAVY }}
                  >
                    Költséghatékony üzemeltetés
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    H-tarifa: kedvezményes áram a fűtési szezonban
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-5">
                    A Fisher e-HeatR hőszivattyú kompatibilis a kedvezményes
                    H-tarifával, amely <strong>október 15. és április 15.</strong>{" "}
                    között jelentősen csökkenti a fűtés üzemeltetési költségét.
                    Saját, külön mért áramkörön keresztül a hőszivattyú a
                    legkedvezőbb áramdíjjal működtethető.
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Kedvezményes elektromos energia a fűtési időszakban",
                      "Külön mérőóra – átlátható, alacsony rezsi",
                      "A Northwind szakértői segítenek a rendszer beüzemelésében",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/85"
                      >
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: LIGHT }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Contact Zone */}
        <section
          id="contact"
          className="py-20 sm:py-24 bg-secondary scroll-mt-24"
          aria-label="Kapcsolatfelvétel és szakmai konzultáció"
        >
          <div className="container mx-auto px-4 space-y-10">
            <div
              className="max-w-3xl mx-auto rounded-3xl bg-card border-2 p-8 sm:p-12 text-center shadow-xl"
              style={{ borderColor: "rgba(31,61,102,0.3)" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: NAVY }}
              >
                <Award className="w-8 h-8 text-white" />
              </div>
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: NAVY }}
              >
                Szakmai konzultáció és felmérés
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
                Kérjen egyedi Fisher e-HeatR tervezést a Northwind szakértőitől
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                33 év hűtéstechnikai tapasztalattal rendelkező szakmai
                háttérrel. Helyszíni felmérés és szakszerű rendszervázlat –
                kötelezettségek nélkül. Hivatalos Columbus Klíma garancia a
                Fisher hőszivattyúkra.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: NAVY }}
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
                  style={{ backgroundColor: NAVY }}
                  asChild
                >
                  <a href="mailto:northwind@northwind.hu">
                    <Mail className="w-4 h-4" />
                    E-mail küldése
                  </a>
                </Button>
              </div>
            </div>

            <div className="max-w-2xl mx-auto flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(31,61,102,0.35))" }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: NAVY }}
              >
                vagy írjon nekünk
              </span>
              <span className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(31,61,102,0.35))" }} />
            </div>

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

export default FisherHoszivattyu;