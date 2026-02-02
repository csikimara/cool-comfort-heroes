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
    description: "A klímaszerelés során felmérjük a helyiségek adottságait, kiválasztjuk a megfelelő teljesítményű készüléket, majd szakszerűen telepítjük a beltéri és kültéri egységet. A csövezést, elektromos bekötést, vákuumozást és beüzemelést is elvégezzük. A pontos telepítés biztosítja a csendes működést, az alacsony fogyasztást és a hosszú élettartamot.",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <a
              key={service.title}
              href="#kapcsolat"
              className="group relative rounded-2xl p-6 border bg-gradient-card border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                {service.description}
              </p>

              {/* Link */}
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Részletek
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
