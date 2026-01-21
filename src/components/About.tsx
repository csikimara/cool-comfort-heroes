import { CheckCircle2, Award, Users, Clock } from "lucide-react";

const features = [
  "Ingyenes helyszíni felmérés",
  "Garanciális munkavégzés",
  "Rugalmas időpontok",
  "Transzparens árazás",
  "Gyors reakcióidő",
  "Professzionális eszközök",
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
              Több mint 15 év{" "}
              <span className="text-gradient">szakmai tapasztalat</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A Northwind Hűtéstechnika Kft. 2008 óta foglalkozik klímaberendezések és 
              légtechnikai rendszerek telepítésével, karbantartásával. Szakembereink 
              folyamatosan képzik magukat, hogy a legmodernebb technológiákkal szolgálhassuk 
              ki ügyfeleinket.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">ISO 9001</div>
                  <div className="text-sm text-muted-foreground">Minősítés</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">12+</div>
                  <div className="text-sm text-muted-foreground">Szakember</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24 óra</div>
                  <div className="text-sm text-muted-foreground">Reakcióidő</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Image placeholder with design */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-elevated">
              <div className="aspect-[4/3] bg-gradient-hero flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                    <Award className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Megbízható partner
                  </h3>
                  <p className="text-primary-foreground/80">
                    Több ezer elégedett ügyfél országszerte
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
