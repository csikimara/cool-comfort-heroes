import { Thermometer, Volume2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Thermometer,
    title: "Fűtésre tervezett modellek (Fujitsu KG sorozat)",
    desc: "Az erre tervezett Fujitsu modellek műszaki adatlapjuk szerint akár -25°C-os külső hőmérsékletig használhatók fűtésre. A tényleges teljesítmény és fogyasztás a modelltől, a méretezéstől és az épület adottságaitól függ.",
  },
  {
    icon: Volume2,
    title: "Alacsony zajszintű működés",
    desc: "Egyes Fujitsu beltéri egységek alacsony ventilátorfokozaton 19 dB(A)-tól üzemelnek. A kültéri elhelyezést mindig a helyi zajvédelmi és építési adottságokhoz igazítjuk.",
  },
  {
    icon: Settings,
    title: "Hazai importőri és szervizháttér",
    desc: "A modellválasztásnál az energiahatékonyság mellett a hazai importőri és szervizhátteret, valamint az aktuális alkatrészellátást is figyelembe vesszük.",
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
            <span className="text-gradient">fűtésre optimalizált megoldás?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Egy klíma hosszú távú döntés. A megfelelő méretezés, a dokumentált telepítés és a
            rendszeres karbantartás együtt segíti a <strong>Fujitsu</strong> rendszerek tartós,
            hatékony üzemét.
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
            <a href="#kapcsolat">Kérjen helyszíni felmérést!</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JapaneseTechnology;
