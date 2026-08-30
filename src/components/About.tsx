import { ClipboardCheck, ShieldCheck, Cpu, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ClipboardCheck,
    title: "Helyszíni felmérés",
    desc: "Személyesen mérjük fel ingatlana adottságait, hogy az Ön igényeihez megfelelő rendszert javasoljunk.",
  },
  {
    icon: ShieldCheck,
    title: "Garanciális és szervizháttér",
    desc: "Szakmai múltunk 1993-ig nyúlik vissza, a Northwind Hűtéstechnika Kft. pedig 2009 óta működik. Célunk, hogy a telepítés után is elérhető szakmai partner maradjunk, és felelősséget vállaljunk munkánkért.",
  },
  {
    icon: Cpu,
    title: "Válogatott japán technológia",
    desc: "Bevált japán rendszereket ajánlunk, az adott helyiség igényeihez és a gyártói műszaki adatokhoz igazítva.",
  },
  {
    icon: Wrench,
    title: "Mérnöki precizitás és tisztaság",
    desc: "Az 1993 óta gyűjtött szakmai tapasztalatra építünk, és ipari porszívóval, a munkaterület védelmével dolgozunk.",
  },
];

const About = () => {
  return (
    <section id="rolunk" className="py-12 sm:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
              Rólunk
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Szakmai tapasztalat 1993 óta a prémium klímatechnika{" "}
              <span className="text-gradient">világában</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Szakmai múltunk 1993-ig nyúlik vissza, a Northwind Hűtéstechnika Kft. pedig 2009 óta működik.
              Az elmúlt több mint három évtizedben számos jelentős márkával dolgoztunk.
              Ez a folyamatosan épülő tapasztalat ad szakmai hátteret a munkáinkhoz. Számunkra a munka nem a telepítésnél ér véget: a későbbi karbantartásban és szervizben is számíthat ránk. Minőségi japán rendszerekre
              specializálódtunk, és az elmúlt évek tapasztalatai alapján kiemelt bizalmat szavazunk a <strong>Fujitsu</strong> megoldásainak. 
              Tapasztalataink alapján ez a technológia kedvező egyensúlyt kínál a precizitás, a csend és a hosszú távú szervizelhetőség között.
              Bár elsősorban a japán Fujitsu mérnöki megoldásait ajánljuk, egyedi igény esetén egyéb prémium japán márkák telepítését is vállaljuk. 
              Javítás és karbantartás terén számos elterjedt márkával dolgozunk; a javíthatóságot mindig a konkrét típus, a műszaki dokumentáció és az alkatrészellátás alapján állapítjuk meg.
              A helyszíni feladatot a munkához szükséges képesítéssel rendelkező szakember végzi.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <feature.icon className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-foreground font-semibold block mb-1">{feature.title}</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button variant="hero" size="lg" asChild>
                <a href="#kapcsolat">Kérjen szakmai konzultációt!</a>
              </Button>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-elevated">
              <div className="bg-gradient-hero flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-4 sm:py-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-primary-foreground leading-tight">
                    Szakmai tapasztalat 1993 óta
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-foreground leading-snug">
                    A Kft. 2009 óta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
