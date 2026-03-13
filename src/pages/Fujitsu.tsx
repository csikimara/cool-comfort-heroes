import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AirVent, Shield, Zap, ThermometerSun, Award, CheckCircle2, User, Settings } from "lucide-react";
import fujitsuInstallation from "@/assets/fujitsu-installation.png";

const features = [
  {
    icon: Shield,
    title: "10 év garancia",
    description: "Fujitsu klímák regisztrációjával akár 10 év kiterjesztett garancia.",
  },
  {
    icon: Zap,
    title: "A+++ energiaosztály",
    description: "A Fujitsu KG sorozat A+++ besorolású, minimális üzemeltetési költséggel.",
  },
  {
    icon: AirVent,
    title: "Csendes működés",
    description: "Piacvezető zajszint már 19 dB(A)-tól – ideális hálószobákba.",
  },
  {
    icon: ThermometerSun,
    title: "Fűtés akár -25°C-ig",
    description: "A KG sorozat extrém hidegben is stabil, gazdaságos fűtést biztosít.",
  },
];

const sellingPoints = [
  {
    icon: AirVent,
    text: "Halk működés hálószobába – már 19 dB(A)-tól, ami halkabb, mint a suttogás.",
  },
  {
    icon: User,
    text: "Human Sensor technológia – automatikusan csökkenti a fogyasztást, ha nincs senki a szobában.",
  },
  {
    icon: Settings,
    text: "Hosszú távú megbízhatóság – évtizedekig garantált alkatrészellátás és szervizháttér.",
  },
];

const Fujitsu = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight">FUJITSU</span>
              <span className="text-2xl sm:text-3xl font-light">KG SOROZAT</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              A prémium megoldás fűtésre és hűtésre – A+++ hatékonysággal
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Japán precizitás, amely akár -25°C-os hidegben is megbízható fűtést nyújt.
              Hivatalos Fujitsu partnerként 33 év szakmai tapasztalattal állunk rendelkezésére.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-white/90 hover:text-red-700 font-semibold"
                asChild
              >
                <a href="/#kapcsolat">Ajánlatkérés</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
                asChild
              >
                <a href="https://www.fujitsuklima.hu/klimak" target="_blank" rel="noopener noreferrer">
                  Termékek megtekintése
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              Miért a Fujitsu KG sorozat?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Japán precizitás, A+++ hatékonyság
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-gradient-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Points + Installation Photo */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                Előnyök
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                Miért választják ügyfeleink a Fujitsu KG-t?
              </h2>
              
              <ul className="space-y-6">
                {sellingPoints.map((point) => (
                  <li key={point.text} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <point.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-foreground leading-relaxed">{point.text}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 rounded-xl border border-border/50 bg-background">
              <p className="text-muted-foreground text-sm leading-relaxed">
                  <strong className="text-foreground">33 év szakmai tapasztalattal</strong> és hivatalos Fujitsu partnerként 
                  segítünk a legmegfelelőbb modell kiválasztásában Budapesten és Pest vármegyében. 
                  A Northwind Hűtéstechnika 2009 óta biztosít stabil vállalkozói hátteret ehhez a tudáshoz.
                </p>
              </div>
            </div>

            {/* Installation Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-[4/3]">
              <img 
                src={fujitsuInstallation} 
                alt="Professzionális Fujitsu KG beltéri egység telepítés egy elegáns nappaliban" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Entry-level cooling section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Megbízható hűtés
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Megbízható hűtés kompromisszumok nélkül
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Nem mindenkinek van szüksége a csúcskategóriás KG sorozatra. A Fujitsu belépő szintű modelljei 
                is japán minőséget képviselnek – elérhető áron, évtizedes élettartammal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="rounded-2xl p-6 border border-border/50 bg-gradient-card shadow-card text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AirVent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Japán minőség</h3>
                <p className="text-sm text-muted-foreground">Megbízható alkatrészek és összeszerelés, amely évtizedekig szolgál.</p>
              </div>
              <div className="rounded-2xl p-6 border border-border/50 bg-gradient-card shadow-card text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Elérhető ár</h3>
                <p className="text-sm text-muted-foreground">Prémium technológia ésszerű költségvetéssel, rejtett díjak nélkül.</p>
              </div>
              <div className="rounded-2xl p-6 border border-border/50 bg-gradient-card shadow-card text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Évtizedes élettartam</h3>
                <p className="text-sm text-muted-foreground">Garantált alkatrészellátás és szervizháttér a teljes életciklusra.</p>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Japán minőség, elérhető áron, évtizedes élettartammal – kérjen személyre szabott ajánlatot!
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section id="kapcsolat" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Kérjen ajánlatot Fujitsu KG klímára
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vegye fel velünk a kapcsolatot és segítünk kiválasztani az Önnek megfelelő Fujitsu modellt 
              – 33 éves tapasztalattal, Budapesten és Pest vármegyében.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              asChild
            >
              <a href="/#kapcsolat" className="inline-flex items-center gap-2">
                Ajánlatkérés
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fujitsu;
