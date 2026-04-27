import { Thermometer, Volume2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Thermometer,
    title: "Valódi fűtésre optimalizálva (Fujitsu KG sorozat)",
    desc: "A legtöbb olcsó klíma csak hűtésre jó igazán. A nálunk elérhető japán modellek akár -25°C-os külső hőmérséklet mellett is stabil, gazdaságos fűtést biztosítanak, kiváltva akár a gázfűtést is.",
  },
  {
    icon: Volume2,
    title: "Extrém csendes működés",
    desc: "A hálószobában a legfontosabb a nyugalom. A Fujitsu beltéri egységei olyan halkan dolgoznak, hogy észre sem veszi a működésüket, míg a kültéri egységek nem zavarják a szomszédokat sem.",
  },
  {
    icon: Settings,
    title: "Hosszú távú alkatrészellátás",
    desc: "Míg az olcsó kínai márkáknál pár év után sokszor nincs alkatrész, a Fujitsu esetében évtizedekig biztosított a szervizháttér. Ez a valódi fenntarthatóság.",
  },
];

const JapaneseTechnology = () => {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Japán technológia
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Miért a Fujitsu KG sorozat{" "}
            <span className="text-gradient">a legjobb választás fűtésre?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Egy klíma nem csak egy-két szezonra szól. Mi a <strong>Fujitsu</strong> rendszereivel 
            olyan megoldást kínálunk, amely 15-20 év múlva is ugyanolyan csendesen és hatékonyan működik, mint az első napon.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative rounded-2xl p-8 border bg-gradient-card border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 mx-auto">
                <pillar.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="#kapcsolat">Kérjen ingyenes helyszíni felmérést!</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JapaneseTechnology;
