import { 
  AirVent, 
  Wrench, 
  ThermometerSun, 
  Building2, 
  SprayCan, 
  Wind,
  Fan,
  ArrowRight,
  SearchCheck
} from "lucide-react";

const services = [
  {
    icon: AirVent,
    title: "Klímaszerelés",
    description: "Professzionális split és multi-split klímaberendezések telepítése otthonokba és irodákba.",
  },
  {
    icon: null, // Fujitsu uses custom branding
    title: "Fujitsu Partner",
    description: "Hivatalos Fujitsu klíma értékesítési és szerelési partner. Prémium minőség, akár 10 év garanciával.",
    isFujitsu: true,
    link: "/fujitsu",
  },
  {
    icon: Wrench,
    title: "Karbantartás",
    description: "Rendszeres klíma karbantartás a hosszú élettartam és optimális működés érdekében.",
  },
  {
    icon: Wind,
    title: "Légtechnikai szerelés",
    description: "Komplex szellőztető és légkezelő rendszerek tervezése és kivitelezése.",
  },
  {
    icon: ThermometerSun,
    title: "Hőszivattyú",
    description: "Energiahatékony hőszivattyú rendszerek telepítése fűtéshez és hűtéshez egyaránt.",
  },
  {
    icon: Building2,
    title: "Irodaház hűtés",
    description: "Nagyméretű irodaházak hűtési rendszereinek karbantartása és javítása.",
  },
  {
    icon: SprayCan,
    title: "Klímatisztítás",
    description: "Professzionális klímatisztítás és fertőtlenítés az egészséges levegőért.",
  },
  {
    icon: Fan,
    title: "Fan-coilok",
    description: "Fan-coil berendezések telepítése, karbantartása és javítása.",
  },
  {
    icon: AirVent,
    title: "Légkezelők",
    description: "Központi légkezelő egységek szerelése és szervize ipari környezetben.",
  },
  {
    icon: SearchCheck,
    title: "Kötelező szivárgásvizsgálat",
    description: "Az EU 517/2014 rendelet értelmében az 5 tonna CO₂-egyenértéket meghaladó hűtőközeget tartalmazó berendezések évente kötelező szivárgásvizsgálatra kötelezettek. Akkreditált szakembereink elvégzik a vizsgálatot és kiállítják a szükséges dokumentációt.",
  },
];

const Services = () => {
  return (
    <section id="szolgaltatasok" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Szolgáltatásaink
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Teljes körű klíma és{" "}
            <span className="text-gradient">légtechnikai megoldások</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Legyen szó otthoni klímaszerelésről vagy komplex ipari légtechnikai rendszerekről, 
            tapasztalt szakembereink minden igényt kielégítenek.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const isFujitsu = 'isFujitsu' in service && service.isFujitsu;
            
            return (
              <a
                key={service.title}
                href={isFujitsu ? service.link : "#kapcsolat"}
                className={`group relative rounded-2xl p-6 border shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 block ${
                  isFujitsu 
                    ? "bg-gradient-to-br from-red-600 to-red-700 border-red-500/50 text-white" 
                    : "bg-gradient-card border-border/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${
                  isFujitsu ? "bg-white/20" : "bg-gradient-hero"
                }`}>
                  {isFujitsu ? (
                    <span className="text-xl font-bold text-white tracking-tight">FJ</span>
                  ) : (
                    service.icon && <service.icon className="w-7 h-7 text-primary-foreground" />
                  )}
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                  isFujitsu ? "text-white" : "text-foreground group-hover:text-primary"
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  isFujitsu ? "text-white/90" : "text-muted-foreground"
                }`}>
                  {service.description}
                </p>

                {/* Link */}
                <span 
                  className={`inline-flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isFujitsu ? "text-white" : "text-primary"
                  }`}
                >
                  {isFujitsu ? "Tovább" : "Részletek"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Decorative gradient */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                  isFujitsu ? "bg-white" : "bg-gradient-hero"
                }`} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
