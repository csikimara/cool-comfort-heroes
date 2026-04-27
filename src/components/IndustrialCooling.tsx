import { Droplets, Wind, Wrench, ClipboardCheck } from "lucide-react";
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
              className="relative rounded-2xl p-8 border bg-gradient-card border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 text-center"
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
