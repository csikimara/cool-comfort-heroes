import { Phone, Flower2, Sun, Leaf, Snowflake, ShieldCheck, Wind, PiggyBank, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const phases = [
  {
    icon: Flower2,
    period: "Március - Április",
    title: "Tavaszi felkészítés",
    description:
      "A legideálisabb időszak. Ilyenkor még rugalmasabb az időpontfoglalás, és felkészülten várhatja az első forró napokat. A pollenszezon előtt tiszta szűrőkkel indíthatja a szezont.",
    highlight: true,
  },
  {
    icon: Sun,
    period: "Május - Augusztus",
    title: "Nyári csúcsüzem",
    description:
      "Ebben az időszakban a klíma folyamatosan dolgozik. Ha elmaradt a tavaszi tisztítás, ilyenkor is javasolt a felülvizsgálat, hogy elkerülje a váratlan leállást a legnagyobb hőségben.",
  },
  {
    icon: Leaf,
    period: "Szeptember - Október",
    title: "Őszi fűtési szezon",
    description:
      "Ha klímával is fűt (például a kiemelkedő hatékonyságú Fujitsu KG sorozattal), az őszi karbantartás elengedhetetlen. A tiszta hőcserélővel és a japán inverteres technológiával jelentősen csökkentheti a fűtési költségeit.",
  },
  {
    icon: Snowflake,
    period: "November - Február",
    title: "Téli biztonság",
    description:
      "Ebben az időszakban az ipari rendszerek és a szerverhűtők stabil működésére koncentrálunk. Lakossági ügyfeleinknek ilyenkor végezzük a komplexebb javításokat.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Garancia megőrzése",
    description: "A gyártói garancia feltétele a dokumentált, rendszeres karbantartás.",
  },
  {
    icon: Wind,
    title: "Tisztább levegő",
    description: "Tiszta szűrők és hőcserélő – egészségesebb beltéri klíma az otthonában.",
  },
  {
    icon: PiggyBank,
    title: "Alacsonyabb rezsi",
    description: "Karbantartott klíma akár 25%-kal kevesebb áramot fogyaszt.",
  },
  {
    icon: Clock,
    title: "Hosszabb élettartam",
    description: "A megelőző karbantartás évekkel meghosszabbítja a készülék életét.",
  },
];

const MaintenanceTimeline = () => {
  return (
    <section className="py-20 sm:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Karbantartási Idővonal
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mikor érdemes{" "}
            <span className="text-gradient">klímakarbantartást</span> kérni?
          </h2>
          <p className="text-sm font-semibold text-primary mb-4">
            Március-Április: Tavaszi felkészítés | Szeptember-Október: Fűtési szezon előtti tisztítás (Fujitsu KG modellekhez elengedhetetlen).
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ne várja meg a kánikulát vagy az első fagyokat! A rendszeres
            felülvizsgálat nem csak a garancia feltétele, hanem a gazdaságos és
            higiénikus működés alapja is. 1993 óta látjuk: aki időben lép, az
            nyugodtan pihenhet.
          </p>
        </div>

        {/* Why it matters – mini infographic */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-primary mb-6">
            Miért fontos a rendszeres karbantartás?
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-card rounded-2xl p-5 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-3">
                  <b.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-foreground mb-1.5">
                  {b.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-translate-x-px" />

            {phases.map((phase, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={phase.title}
                  className={`relative flex items-start gap-6 mb-12 last:mb-0 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Icon dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-card border-4 border-background ${
                        phase.highlight
                          ? "bg-gradient-hero"
                          : "bg-primary/80"
                      }`}
                    >
                      <phase.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-16 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                      isLeft ? "sm:pr-4 sm:text-right" : "sm:pl-4"
                    }`}
                  >
                    <div
                      className={`bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 ${
                        phase.highlight
                          ? "ring-2 ring-primary/30"
                          : ""
                      }`}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                        {phase.period}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {phase.description}
                      </p>
                      {phase.highlight && (
                        <span className="inline-block mt-3 text-xs font-semibold text-primary">
                          ★ Legjobb időszak
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg font-semibold text-foreground mb-4">
            Foglaljon időpontot még ma!
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="tel:+36704099760">
              <Phone className="w-5 h-5" />
              +36 70 409 9760
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceTimeline;
