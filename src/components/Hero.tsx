import { Button } from "@/components/ui/button";
import { ArrowRight, Snowflake, ThermometerSnowflake, Wind } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        
        {/* Floating snowflakes */}
        <Snowflake className="absolute top-32 right-[20%] w-8 h-8 text-primary-foreground/20 animate-float" style={{ animationDelay: "0s" }} />
        <Snowflake className="absolute top-48 left-[15%] w-6 h-6 text-primary-foreground/15 animate-float" style={{ animationDelay: "1s" }} />
        <Snowflake className="absolute bottom-40 right-[30%] w-10 h-10 text-primary-foreground/10 animate-float" style={{ animationDelay: "2s" }} />
        <ThermometerSnowflake className="absolute top-[40%] left-[8%] w-12 h-12 text-primary-foreground/10 animate-float" style={{ animationDelay: "1.5s" }} />
        <Wind className="absolute bottom-32 left-[25%] w-8 h-8 text-primary-foreground/15 animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-8 animate-fade-up">
            <Snowflake className="w-4 h-4" />
            Professzionális klíma megoldások
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Klímaszerelés Budapesten és Pest vármegyében{" "}
            <span className="relative">
              – 33 év szakmai tapasztalattal
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 2 100 2 150 6C200 10 250 8 298 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary-foreground/40" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Klímaszerelés, karbantartás, hőszivattyúk és komplex légtechnikai megoldások 
            lakossági és ipari ügyfelek részére. A Northwind Hűtéstechnika 2009 óta biztosít stabil vállalkozói hátteret 
            a 33 éves szakmai tapasztalathoz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              variant="heroOutline" 
              size="lg" 
              className="group"
              asChild
            >
              <a href="#kapcsolat">
                Ingyenes felmérés
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#szolgaltatasok">Szolgáltatásaink</a>
            </Button>
          </div>

          {/* Trust text */}
          <p className="text-sm text-primary-foreground/70 mt-6 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            Korrekt elszámolás: Nincsenek rejtett költségek és váratlan kiszállási díjak. Amit a felméréskor rögzítünk, az a végösszeg.
          </p>

          {/* Trust badges */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/20 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-primary-foreground/70">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">33+</div>
                <div className="text-sm">Év tapasztalat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">2000+</div>
                <div className="text-sm">Elégedett ügyfél</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">100%</div>
                <div className="text-sm">Garanciális munka</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
