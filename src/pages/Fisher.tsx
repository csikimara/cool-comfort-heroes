import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Wind,
  Sparkles,
  Wifi,
  ThermometerSnowflake,
  CheckCircle2,
  Snowflake,
  Sun,
  ArrowRight,
} from "lucide-react";
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
  { icon: Wind, title: "Extra csendes", text: "Halk működés, ideális hálószobákba és nappalikba." },
  { icon: Sparkles, title: "Plazmaszűrő", text: "Hatékony szűrés allergiásoknak – tisztább beltéri levegő." },
  { icon: Wifi, title: "Beépített Wi-Fi", text: "Okosvezérlés telefonról, bárhonnan, bármikor." },
  { icon: ThermometerSnowflake, title: "Fűtés -22°C-ig", text: "Stabil fűtési teljesítmény extrém hidegben is." },
];

const products = [
  {
    icon: Sun,
    name: "Fisher Comfort Plus",
    tagline: "A legsokoldalúbb készülék fűtésre és hűtésre.",
    points: [
      "Magas SCOP és SEER hatékonyság",
      "Plazmaszűrő és Wi-Fi alapfelszereltségben",
      "Halk éjszakai üzemmód",
    ],
  },
  {
    icon: Snowflake,
    name: "Fisher Summer",
    tagline: "Gazdaságos és hatékony hűtés a nyári napokra.",
    points: [
      "Optimalizált hűtési teljesítmény",
      "Kedvező ár-érték arány",
      "Megbízható, hosszú élettartam",
    ],
  },
];

const Fisher = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Fisher Klímatechnika – Prémium kényelem 6 év garanciával | Northwind"
        description="Fisher klímák Budapesten: prémium kényelem, 6 év kiterjesztett garancia, Plazmaszűrő, beépített Wi-Fi és fűtés -22°C-ig. Ingyenes felmérés a Northwind szakembereitől."
      />
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
                  Fisher Klímatechnika –{" "}
                  <span className="block sm:inline">Prémium kényelem 6 év garanciával</span>
                </h1>
                <p className="text-base sm:text-lg text-primary-foreground/90 max-w-xl mx-auto lg:mx-0 mb-8">
                  A Fisher klímák a magyar piac egyik legmegbízhatóbb szereplői. Kiváló ár-érték arányuk
                  mellett a 6 év kiterjesztett garancia (szakszerű telepítés esetén) nyugalmat biztosít
                  minden felhasználónak.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button variant="hero" size="lg" className="group" onClick={openTidio} asChild>
                    <a href="#" onClick={openTidio}>
                      Ingyenes felmérést kérek
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="#fisher-termekek">Kiemelt termékek</a>
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

        {/* Featured products */}
        <section id="fisher-termekek" className="py-20 sm:py-24 bg-secondary/40" aria-label="Kiemelt Fisher termékek">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-3">
                Kiemelt termékek
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                A két legnépszerűbb Fisher modell
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {products.map((p) => (
                <article
                  key={p.name}
                  className="rounded-2xl p-7 sm:p-8 bg-card border-2 border-border hover:border-primary/40 transition-all flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <p.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-sm font-semibold text-foreground/80 mt-1">{p.tagline}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" onClick={openTidio} className="self-start">
                    Ajánlatot kérek
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24 bg-gradient-hero text-primary-foreground" aria-label="Ingyenes felmérés CTA">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-5 opacity-90" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Készen áll a tökéletes klímakomfortra?
              </h2>
              <p className="text-base sm:text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Vegye fel velünk a kapcsolatot – kollégáink ingyenes helyszíni felmérést és személyre
                szabott ajánlatot készítenek a Fisher kínálatából.
              </p>
              <Button variant="hero" size="lg" className="group" onClick={openTidio} asChild>
                <a href="#" onClick={openTidio}>
                  Ingyenes felmérést kérek
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Fisher;