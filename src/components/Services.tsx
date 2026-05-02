import {
  Wrench,
  Wind,
  ArrowRight,
  Factory,
  Home,
  Images,
  LucideIcon,
} from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const pillars: Pillar[] = [
  {
    icon: Home,
    title: "Lakossági Klíma és Hőszivattyú",
    description:
      "Professzionális split és multi-split klímaberendezések, valamint energiahatékony hőszivattyúk telepítése otthonokba és irodákba.",
    href: "/lakossagi-klima",
    cta: "Lakossági megoldások",
  },
  {
    icon: Factory,
    title: "Ipari Folyadékhűtők (Chiller) és Fan-coil",
    description:
      "Komplex ipari hűtéstechnikai megoldások: folyadékhűtők (chillerek), fan-coil rendszerek tervezése, telepítése és szervize.",
    href: "/reszletek#ipari",
    cta: "Ipari megoldások",
  },
  {
    icon: Wind,
    title: "Légtechnika és Szellőzés (AHU)",
    description:
      "Komplex szellőztető és légkezelő rendszerek (AHU) tervezése és kivitelezése lakossági, kereskedelmi és ipari környezetben.",
    href: "/reszletek#ipari",
    cta: "Légtechnikai megoldások",
  },
  {
    icon: Wrench,
    title: "Szerviz és Prémium Karbantartás",
    description:
      "Rendszeres éves felülvizsgálat, márkafüggetlen javítás és prémium zsákos klímamosás a hosszú élettartamért és optimális hatékonyságért.",
    href: "/reszletek#ipari",
    cta: "Szerviz részletek",
  },
];

const Services = () => {
  const renderPillar = (pillar: Pillar, index: number) => (
    <a
      key={pillar.title}
      href={pillar.href}
      className="group relative rounded-2xl p-6 sm:p-7 border bg-gradient-card border-border/50 shadow-card block h-full cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated hover:border-primary/40"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5">
        <pillar.icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {pillar.title}
      </h3>
      <p className="text-base leading-relaxed mb-4 text-muted-foreground">
        {pillar.description}
      </p>
      <span className="card-cta">
        {pillar.cta}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );

  return (
    <section id="szolgaltatasok" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Szolgáltatásaink
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Teljes körű klíma és{" "}
            <span className="text-gradient">légtechnikai megoldások</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Legyen szó otthoni klímaszerelésről vagy komplex ipari légtechnikai rendszerekről, 
            tapasztalt szakembereink minden igényt kielégítenek.
          </p>
        </div>

        {/* 4 Pillar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => renderPillar(pillar, index))}
        </div>

        {/* Main Gallery CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/galeria/osszes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-hero text-primary-foreground font-semibold text-base sm:text-lg shadow-elevated hover:-translate-y-0.5 hover:shadow-soft transition-all"
          >
            <Images className="w-5 h-5" />
            Tekintse meg összes referenciánkat
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
