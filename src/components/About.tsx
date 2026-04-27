import { CheckCircle2, ClipboardCheck, ShieldCheck, Cpu, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ClipboardCheck,
    title: "Ingyenes helyszíni felmérés",
    desc: "Személyesen mérjük fel ingatlana adottságait, hogy az Ön igényeihez legoptimálisabb Fujitsu rendszert javasoljuk.",
  },
  {
    icon: ShieldCheck,
    title: "Valódi garanciális biztonság",
    desc: "1993 óta vagyunk jelen a piacon – ez a garancia arra, hogy a telepítés után is elérhetőek maradunk és felelősséget vállalunk munkánkért.",
  },
  {
    icon: Cpu,
    title: "Válogatott japán technológia",
    desc: "Kizárólag prémium márkákat telepítünk, amelyek évtizedekig megbízhatóan és halkan szolgálják az Ön kényelmét.",
  },
  {
    icon: Wrench,
    title: "Mérnöki precizitás és tisztaság",
    desc: "30+ év rutinnal nincs váratlan technikai akadály. A pormentes munkavégzés nálunk alapkövetelmény.",
  },
];

const About = () => {
  return (
    <section id="rolunk" className="py-20 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Rólunk
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Csapatunk 33 év szakmai tapasztalatával a prémium klímatechnika{" "}
              <span className="text-gradient">világában</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Csapatunk 33 év szakmai tapasztalatával a prémium klímatechnika világában nyújtunk kiemelkedő szolgáltatást.
              1993 óta foglalkozunk klíma- és légtechnikával, így az elmúlt három évtizedben a piac összes 
              jelentős márkáját megismertük. A <strong>Northwind Hűtéstechnika Kft.</strong> 2009 óta biztosít stabil 
              vállalkozói hátteret ehhez a szakértelemhez. Számunkra a munka nem a telepítésnél ér véget, hanem a sokéves, 
              zavartalan üzemeltetésnél kezdődik. A legmagasabb minőségű japán rendszerekre 
              specializálódtunk, és az elmúlt évek tapasztalatai alapján kiemelt bizalmat szavazunk a <strong>Fujitsu</strong> megoldásainak. 
              Ez a technológia teremti meg a legjobb egyensúlyt a precizitás, a csend és a hosszú távú megbízhatóság között. 
              Bár elsősorban a japán Fujitsu mérnöki megoldásait ajánljuk, egyedi igény esetén egyéb prémium japán márkák telepítését is vállaljuk. 
              Javítás és karbantartás terén márkafüggetlen szakértelemmel állunk rendelkezésre: legyen szó bármilyen típusról, 33 év rutinnal orvosoljuk a hibákat. 
              Nálunk nem egy névtelen alvállalkozó, hanem több évtizedes csapatrutin érkezik a helyszínre.
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

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="#kapcsolat">Kérjen ingyenes szaktanácsadást!</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/reszletek">
                  Tovább a részletes aloldalra
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-elevated">
              <div className="aspect-[4/3] bg-gradient-hero flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    33 év szakmai tapasztalat
                  </h3>
                  <p className="text-primary-foreground/80">
                    1993 óta a szakmában · Northwind Kft. 2009 óta
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements - hidden on mobile to prevent overflow */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10 hidden sm:block" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
