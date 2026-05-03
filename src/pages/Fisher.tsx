import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Wind,
  Sparkles,
  Wifi,
  ThermometerSnowflake,
  CheckCircle2,
  Sun,
  ArrowRight,
  Award,
  Star,
  Flame,
  Droplets,
  Palette,
  Sparkle,
  ExternalLink,
  Phone,
} from "lucide-react";
import nemethLajos from "@/assets/nemeth-lajos-placeholder.jpg";
import fisherMascot from "@/assets/fisher-mascot.png";

const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));
const FisherFloatingButton = lazy(() => import("@/components/FisherFloatingButton"));

declare global {
  interface Window {
    tidioChatApi?: { open: () => void; show?: () => void };
  }
}

const openTidio = (e: React.MouseEvent) => {
  e.preventDefault();
  if (typeof window !== "undefined" && window.tidioChatApi?.open) {
    window.tidioChatApi.open();
  }
};

const benefits = [
  { icon: Wind, title: "Extra csendes működés", text: "Halk üzem, ideális hálószobákba és nappalikba." },
  { icon: Sparkles, title: "Plazmaszűrő", text: "Hatékony szűrés allergiásoknak – tisztább beltéri levegő." },
  { icon: Wifi, title: "Beépített Wi-Fi", text: "Okosvezérlés telefonról, bárhonnan, bármikor." },
  { icon: ThermometerSnowflake, title: "Fűtés -22°C-ig", text: "Stabil fűtési teljesítmény extrém hidegben is." },
];

const splitModels = [
  {
    id: "special",
    badge: "Komfort újdonság",
    name: "Fisher SPECIAL EDITION",
    tagline: "„Ne fújj rám” funkció & fokozatmentes ventilátor",
    description:
      "A Special Edition a legfinomabb komfortélményt nyújtja: a „Ne fújj rám” mód automatikusan eltereli a légáramot, fokozatmentes ventilátorszabályzással.",
    highlights: [
      "„Ne fújj rám” intelligens légterelés",
      "Fokozatmentes ventilátor-szabályozás",
      "Csendes éjszakai üzemmód",
      "Beépített Wi-Fi vezérlés",
    ],
    icon: Wind,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/special-edition-sorozat",
  },
  {
    id: "summer",
    badge: "Gazdaságos",
    name: "Fisher SUMMER",
    tagline: "Gazdaságos hűtés, fűtés -15°C-ig",
    description:
      "A Summer sorozat a kedvező ár-érték arány bajnoka: optimalizált hűtési teljesítmény és megbízható fűtés -15°C-os hidegig.",
    highlights: [
      "Energiahatékony hűtés",
      "Fűtés stabilan -15°C-ig",
      "Kedvező ár-érték arány",
      "Megbízható, hosszú élettartam",
    ],
    icon: Sun,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/summer-sorozat",
  },
  {
    id: "comfort-plus",
    badge: "Csúcsmodell",
    name: "Fisher COMFORT PLUS",
    tagline: "Zászlóshajó, fűtés -22°C-ig, 6 év garancia",
    description:
      "A Fisher kínálat zászlóshajója. Magas SCOP/SEER értékek, fűtés -22°C-os hidegig és 6 év kiterjesztett garancia szakszerű telepítés esetén.",
    highlights: [
      "Zászlóshajó modell, prémium felszereltség",
      "Fűtés akár -22°C-ig stabilan",
      "6 év kiterjesztett garancia",
      "Plazmaszűrő és Wi-Fi alapfelszereltségben",
    ],
    icon: Star,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/comfort-plus-sorozat",
  },
  {
    id: "nordic",
    badge: "Extrém hideg",
    name: "Fisher NORDIC",
    tagline: "Fűtés -30°C-ig, A+++ hatékonyság",
    description:
      "Sarkvidéki teljesítmény: a Nordic sorozat -30°C-ig is megbízható fűtést biztosít, A+++ szezonális energiaosztállyal.",
    highlights: [
      "Extrém fűtés akár -30°C-ig",
      "A+++ szezonális energiaosztály",
      "Optimalizált hidegindítás",
      "Hosszú élettartamú kompresszor",
    ],
    icon: Flame,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/nordic-sorozat",
  },
  {
    id: "black",
    badge: "Dizájn",
    name: "Fisher BLACK",
    tagline: "Tükörfényes, elegáns megjelenés",
    description:
      "Tükörfényes fekete burkolat, modern, igényes belső terekbe. Letisztult formavilág, prémium dizájnérzet.",
    highlights: [
      "Tükörfényes fekete kivitel",
      "Modern, elegáns dizájn",
      "Csendes üzem",
      "Beépített Wi-Fi vezérlés",
    ],
    icon: Sparkle,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/black-sorozat",
  },
  {
    id: "art",
    badge: "Egyedi panel",
    name: "Fisher ART",
    tagline: "Cserélhető mágneses panelek, 180° légterelés",
    description:
      "Otthonához illő egyéniség: cserélhető mágneses előlapok és 180°-os légterelés a maximális komfortért.",
    highlights: [
      "Cserélhető mágneses panelek",
      "180°-os légterelés",
      "Egyedi, dekoratív megjelenés",
      "Csendes komfort üzem",
    ],
    icon: Palette,
    catalogUrl:
      "https://www.fisherklima.hu/termekek/kereskedelmi-klimaberendezesek/oldalfali/art-sorozat",
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
      description: m.description,
    })),
  };

  return (
    <div className="fisher-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Fisher Klímaberendezések – Prémium kényelem 6 év garanciával | Northwind"
        description="Fisher klímák Budapesten: Special Edition, Summer, Comfort Plus, Nordic, Black, Art sorozatok és osztott hőszivattyú. 6 év garancia, ingyenes felmérés a Northwind szakembereitől."
      />
      <JsonLd data={fisherJsonLd} />
      <Header />
      <Suspense fallback={null}>
        <FujitsuFloatingButton />
        <FisherFloatingButton />
      </Suspense>

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 sm:pb-28 overflow-hidden bg-gradient-hero text-primary-foreground">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-foreground/15 border border-primary-foreground/30 text-xs font-bold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Hivatalos Fisher partner
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                  Fisher Klímaberendezések –{" "}
                  <span className="block sm:inline">Prémium kényelem 6 év garanciával</span>
                </h1>
                <p className="text-base sm:text-lg text-primary-foreground/90 max-w-xl mx-auto lg:mx-0 mb-8">
                  A Fisher klímák a magyar piac egyik legmegbízhatóbb szereplői. Kiváló ár-érték
                  arányuk mellett a 6 év kiterjesztett garancia (szakszerű telepítés esetén) nyugalmat
                  biztosít minden felhasználónak.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href="#" onClick={openTidio}>
                      Ingyenes felmérést kérek
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="#fisher-termekek">Termékpaletta</a>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src={fisherMascot}
                  alt="Fisher klíma kabala – sárga esőkabátos szerelő figura"
                  width={768}
                  height={1024}
                  className="w-56 sm:w-72 lg:w-80 h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Trust block – Németh Lajos */}
        <section
          className="py-16 sm:py-20"
          style={{ backgroundColor: "#b5c334" }}
          aria-label="Németh Lajos ajánlása"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-[auto,1fr] gap-6 sm:gap-10 items-center">
              <div className="flex justify-center sm:justify-start">
                <img
                  src={nemethLajos}
                  alt="Németh Lajos meteorológus ajánlása – placeholder"
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-elevated"
                />
              </div>
              <div className="text-center sm:text-left text-white">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase tracking-wider mb-4">
                  <Award className="w-3.5 h-3.5" />
                  Bizalom és minőség
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                  Németh Lajos ajánlásával
                </h2>
                <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                  <strong>6x SuperBrands díjas minőség.</strong> A Fisher márkát a magyar fogyasztók
                  és szakemberek évek óta a legmegbízhatóbb klímamárkák között tartják számon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-background" aria-label="Fisher előnyök">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-3">
                Miért a Fisher?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Komfort, tisztaság és okosság – egy készülékben
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="group bg-card rounded-2xl p-6 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <b.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Split lineup */}
        <section
          id="fisher-termekek"
          className="py-20 sm:py-24 bg-secondary"
          aria-label="Fisher split klíma sorozatok"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-3">
                Split klíma sorozatok
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                A Fisher teljes oldalfali kínálata
              </h2>
              <p className="text-base text-muted-foreground">
                Hat különböző sorozat – a gazdaságos hűtéstől a sarkvidéki fűtésig és az egyedi dizájnig.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {splitModels.map((m) => (
                <article
                  key={m.id}
                  className="rounded-2xl bg-card border-2 border-border hover:border-primary/40 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #1f3d66 0%, #007ec6 100%)" }}
                    >
                      <m.icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {m.badge}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground">{m.name}</h3>
                    <span className="block text-sm font-semibold text-accent mb-3">{m.tagline}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {m.description}
                    </p>

                    <ul className="space-y-2.5 mb-6 flex-1">
                      {m.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-3">
                      <Button
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px]"
                        onClick={openTidio}
                      >
                        Ajánlatkérés
                      </Button>
                      <Button size="lg" variant="outline" className="w-full min-h-[48px]" asChild>
                        <a
                          href={m.catalogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4 shrink-0" />
                          <span>Műszaki adatok</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Heat pump section */}
        <section className="py-20 sm:py-24 bg-background" aria-label="Fisher osztott hőszivattyú">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-3xl border-2 border-primary/20 bg-card p-7 sm:p-12 shadow-card">
              <div className="grid lg:grid-cols-[auto,1fr] gap-8 items-start">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto lg:mx-0"
                  style={{ background: "linear-gradient(135deg, #1f3d66 0%, #007ec6 100%)" }}
                >
                  <Droplets className="w-10 h-10 text-white" />
                </div>
                <div>
                  <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-2">
                    Hőszivattyú megoldás
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    Fisher Osztott (Split) Hőszivattyú
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Megbízható fűtés és melegvíz-ellátás családi házak részére.{" "}
                    <strong className="text-foreground">35°C-os előremenő hőmérsékletre</strong>{" "}
                    méretezett rendszer, modern <strong className="text-foreground">R32 hűtőközeg</strong>{" "}
                    és teljes <strong className="text-foreground">H-tarifa</strong> kompatibilitás
                    a kedvezményes áramfelhasználáshoz.
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {[
                      "Megbízható fűtés és HMV egyetlen rendszerből",
                      "35°C előremenő hőmérséklet – padlófűtéshez optimális",
                      "R32 hűtőközeg – modern és környezetbarát",
                      "H-tarifa kompatibilitás – kedvezőbb rezsi",
                      "3 év teljes körű gyártói garancia",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="group" onClick={openTidio}>
                      Felmérést kérek
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a
                        href="https://www.fisherklima.hu/termekek/hoszivattyu-berendezesek/osztott-split-hoszivattyu#sp-main-body"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Hivatalos termékadatok
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section
          className="py-20 sm:py-24 bg-gradient-hero text-primary-foreground"
          aria-label="Ingyenes felmérés CTA"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-5 opacity-90" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Készen áll a tökéletes klímakomfortra?
              </h2>
              <p className="text-base sm:text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Vegye fel velünk a kapcsolatot – kollégáink ingyenes helyszíni felmérést és
                személyre szabott ajánlatot készítenek a Fisher kínálatából.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href="#" onClick={openTidio}>
                    Ingyenes felmérést kérek
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
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
      </main>

      <Footer />
    </div>
  );
};

export default Fisher;