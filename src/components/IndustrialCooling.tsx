import { Droplets, Wind, Wrench, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Droplets,
    title: "Ipari hűtés és Chiller rendszerek",
    desc: "Komplett vizes rendszerek (Chiller) és Fan-coil hálózatok tervezése, telepítése és szervizelése. Meglévő rendszerek optimalizálása a maximális energiahatékonyság érdekében.",
  },
  {
    icon: Snowflake,
    title: "Légcsatornázható és Félipari megoldások",
    desc: "Esztétikus, rejtett kivitelű légcsatornázható split rendszerek (Fujitsu) telepítése. Ideális megoldás tagolt terekbe, irodákba vagy tetőterekbe, ahol a hagyományos beltéri egységek elhelyezése nem esztétikus vagy nem megoldható.",
  },
  {
    icon: Wind,
    title: "Központi Légkezelés (AHU) és Szellőzés",
    desc: "Központi légkezelő egységek telepítése, műszaki felülvizsgálata és karbantartása. Gondoskodunk a folyamatos friss levegőről, a szűrésről és az optimális páratartalomról ipari és kereskedelmi környezetben.",
  },
  {
    icon: Wrench,
    title: "Szerviz és Megelőző Karbantartás",
    desc: "Gyors hibaelhárítás és márkafüggetlen javítás ipari berendezéseken. Megelőző karbantartási szerződéseinkkel segítünk elkerülni a váratlan leállásokat és a magas javítási költségeket.",
  },
];

const IndustrialCooling = () => {
  return (
    <section id="ipari" className="py-20 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            A <strong>Northwind Hűtéstechnika Kft.</strong> 1993 óta nyújt professzionális támogatást ipari és kereskedelmi
            partnerei számára. Nem csupán berendezéseket telepítünk, hanem komplex gépészeti rendszerekben gondolkodunk:
            a folyadékhűtős rendszerektől a speciális, légcsatornázható félipari megoldásokig. Ez utóbbi különösen ideális
            olyan irodákba vagy tagolt terekbe, ahol a hagyományos split klímák elhelyezése nem esztétikus vagy nem
            megoldható. Precíz mérnöki tervezéssel és szakszerű kivitelezéssel garantáljuk a huzatmentes, optimális
            légelosztást és az üzembiztos működést.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-2xl p-8 border bg-gradient-card border-border/50 shadow-card text-center cursor-default"
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
