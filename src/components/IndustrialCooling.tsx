import { Droplets, Wind, Wrench, ClipboardCheck, Building2, Fan, AirVent } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ClipboardCheck,
    title: "Műszaki tanácsadás és precíz kivitelezés",
    desc: "Helyszíni felmérés alapján javasolunk optimális gépészeti megoldásokat irodaházak és üzemi területek részére, figyelembe véve a meglévő rendszerek adottságait.",
  },
  {
    icon: Droplets,
    title: "Folyadékhűtők és Fan-coil rendszerek",
    desc: "Komplett vizes rendszerek (Chiller) telepítése, beszabályozása és javítása. Meglévő hálózatok optimalizálása és szakszerű karbantartása a maximális hatékonyság érdekében.",
  },
  {
    icon: Wind,
    title: "Légkezelő gépek (AHU) és Szellőzés",
    desc: "Központi légkezelő egységek karbantartása, szűrőcsere és műszaki felülvizsgálata. Gondoskodunk a folyamatos friss levegőről az irodai terekben és ipari létesítményekben.",
  },
  {
    icon: Wrench,
    title: "Szerviz, Javítás és Karbantartás",
    desc: "Nem csak telepítünk: gyors hibaelhárítást vállalunk ipari berendezésekre is. Javítás és karbantartás terén márkafüggetlen szakértelemmel állunk rendelkezésre. Megelőző karbantartási szerződéseinkkel segítünk elkerülni a váratlan és drága leállásokat.",
  },
];

const additionalSystems = [
  {
    icon: Fan,
    title: "Fan-coilok",
    desc: "Fan-coil egységek (ventilátoros konvektorok) telepítése, beszabályozása és szervize irodaházakban, üzletekben és ipari létesítményekben. Hatékony, zónánként szabályozható hűtési és fűtési megoldás a központi vizes (Chiller) rendszerekhez kapcsolva.",
  },
  {
    icon: Building2,
    title: "Irodaház hűtés",
    desc: "Nagyméretű irodaházak hűtési rendszereinek karbantartása és javítása. A karbantartás során ellenőrizzük a hűtőköröket, tisztítjuk a hőcserélőket, beszabályozzuk a rendszert és elhárítjuk az esetleges hibákat. Célunk, hogy a hűtés a legmelegebb időszakban is megbízhatóan működjön, és az energiafelhasználás optimális maradjon.",
  },
  {
    icon: AirVent,
    title: "Légkezelők (AHU)",
    desc: "Központi légkezelő gépek (AHU) telepítése, szűrőcseréje, hővisszanyerő blokkok karbantartása és műszaki felülvizsgálata. Gondoskodunk a folyamatos friss levegő ellátásról, a megfelelő légcseréről és a páratartalom szabályozásáról ipari és kereskedelmi környezetben.",
  },
];

const IndustrialCooling = () => {
  return (
    <section id="ipari" className="py-20 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Ipari megoldások
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ipari folyadékhűtők (Chiller) és Fan-coil rendszerek{" "}
            <span className="text-gradient">karbantartása</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Az otthoni kényelem mellett évtizedes tapasztalattal rendelkezem nagy teljesítményű ipari rendszerek 
            telepítésében és szervizelésében. Tudom, hogy egy irodaház vagy üzem esetében a hűtés kiesése komoly 
            probléma – ezért kínálok gyors, gyakorlatias és megbízható megoldásokat <strong>1993 óta</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-2xl p-8 border bg-gradient-card border-border/50 shadow-card text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 mx-auto">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Additional industrial systems */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              További ipari és kereskedelmi rendszerek
            </h3>
            <p className="text-muted-foreground">
              Komplett szolgáltatásportfólió fan-coil rendszerektől irodaházi
              hűtésig és központi légkezelő gépekig.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalSystems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 sm:p-7 bg-card border-2 border-primary/15 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="#kapcsolat">Kérjen ipari konzultációt vagy ajánlatot!</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustrialCooling;
