import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AirVent, Shield, Zap, ThermometerSun, Phone, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "10 év garancia",
    description: "Fujitsu klímák regisztrációjával akár 10 év kiterjesztett garancia.",
  },
  {
    icon: Zap,
    title: "Alacsony fogyasztás",
    description: "Energiahatékony inverter technológia a minimális üzemeltetési költségért.",
  },
  {
    icon: AirVent,
    title: "Csendes működés",
    description: "Piacvezető zajszint már 19 dB(A)-tól beltéri egységeknél.",
  },
  {
    icon: ThermometerSun,
    title: "Fűtés-hűtés",
    description: "Egész évben használható fűtésre és hűtésre egyaránt.",
  },
];

const Fujitsu = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero section - Fujitsu branded */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Red gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Fujitsu logo text */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight">FUJITSU</span>
              <span className="text-2xl sm:text-3xl font-light">KLÍMA</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Hivatalos Fujitsu Partner
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Prémium japán minőség, professzionális telepítéssel. 
              Válasszon a Fujitsu klíma termékek széles választékából.
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
              Miért Fujitsu?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Japán precizitás, világszínvonalú minőség
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

      {/* CTA section */}
      <section id="kapcsolat" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Kérjen ajánlatot Fujitsu klímára
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vegye fel velünk a kapcsolatot és segítünk kiválasztani az Önnek megfelelő Fujitsu klímát.
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
