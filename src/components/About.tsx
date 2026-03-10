import { CheckCircle2, Award } from "lucide-react";

const features = [
  {
    title: "Ingyenes helyszíni felmérés",
    desc: "Személyesen mérjük fel ingatlanát, hogy az Ön igényeihez és a lakás lehetőségeihez legoptimálisabb (Fujitsu vagy Daikin) rendszert javasoljuk.",
  },
  {
    title: "Valódi garanciális biztonság",
    desc: "32 év szakmai múlt a garancia arra, hogy a telepítés után is elérhetőek maradunk. Hosszú távú felelősséget vállalunk a munkánkért.",
  },
  {
    title: "Válogatott japán márkák",
    desc: "Kizárólag prémium technológiát telepítünk (Fujitsu, Daikin), amelyek évtizedekig megbízhatóan, halkan és takarékosan szolgálják Önt.",
  },
  {
    title: "30 éves szakmai rutin",
    desc: "1993 óta gyűjtött tapasztalatunk a biztosíték arra, hogy nincs váratlan technikai akadály – a precizitás és tisztaság alapkövetelmény.",
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
              32 év prémium klímatechnika –{" "}
              <span className="text-gradient">Garanciával és Japán minőséggel</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              1993 óta válogatom meg, mit teszek fel ügyfeleim falára. Pályafutásomat a legmagasabb 
              minőségű japán rendszerekre alapoztam: szívesen dolgozom a patinás <strong>Daikin</strong> modellekkel, 
              de az elmúlt évek tapasztalatai alapján kiemelt bizalmat szavazok a <strong>Fujitsu</strong> megoldásainak. 
              Ez a technológia teremti meg ma a legjobb egyensúlyt a precizitás, a csend és a hosszú távú 
              megbízhatóság között. Nem csak klímát szerelek, hanem nyugalmat – én magam is ezekkel a 
              gépekkel alszom nyugodtan.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-foreground font-semibold block mb-1">{feature.title}</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</span>
                  </div>
                </div>
              ))}
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
                    1993 óta megbízható partner
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
