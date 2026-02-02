import { useState } from "react";
import { 
  AirVent, 
  Wrench, 
  ThermometerSun, 
  Building2, 
  SprayCan, 
  Wind,
  Fan,
  ArrowRight,
  SearchCheck,
  LucideIcon
} from "lucide-react";
import ServiceDetailModal from "./ServiceDetailModal";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedDescription?: string;
}

const services: Service[] = [
  {
    icon: AirVent,
    title: "Klímaszerelés",
    description: "Professzionális split és multi-split klímaberendezések telepítése otthonokba és irodákba.",
    detailedDescription: "A klímaszerelés során felmérjük a helyiségek adottságait, kiválasztjuk a megfelelő teljesítményű készüléket, majd szakszerűen telepítjük a beltéri és kültéri egységet. A csövezést, elektromos bekötést, vákuumozást és beüzemelést is elvégezzük. A pontos telepítés biztosítja a csendes működést, az alacsony fogyasztást és a hosszú élettartamot.",
  },
  {
    icon: Wrench,
    title: "Karbantartás",
    description: "Rendszeres klíma karbantartás a hosszú élettartam és optimális működés érdekében.",
    detailedDescription: "A rendszeres karbantartás és klímatisztítás alapvető feltétele annak, hogy a klíma hosszú távon megbízhatóan, csendesen és energiatakarékosan működjön. A folyamat során eltávolítjuk a készülékben felgyülemlett port, gombát és baktériumokat, amelyek kellemetlen szagokat, allergiás tüneteket vagy akár komoly meghibásodást is okozhatnak. Ellenőrizzük a hűtőközeg mennyiségét, a csatlakozásokat, a kondenzvíz elvezetését, a ventilátor működését és a készülék általános műszaki állapotát.\n\nHa a klímát csak hűtésre használják, akkor évi 1 alkalom karbantartás elegendő. Amennyiben fűtésre is használják, a készülék sokkal nagyobb terhelést kap, ezért évi 2 alkalom javasolt a biztonságos és hatékony működés érdekében. A tiszta és karbantartott klíma egészségesebb levegőt biztosít, kevesebb energiát fogyaszt, és jelentősen meghosszabbítja a berendezés élettartamát.",
  },
  {
    icon: Wind,
    title: "Légtechnikai szerelés",
    description: "Komplex szellőztető és légkezelő rendszerek tervezése és kivitelezése.",
    detailedDescription: "A légtechnikai rendszerek biztosítják az épületek friss levegő ellátását, a megfelelő légcserét és a páratartalom szabályozását. Vállaljuk komplett szellőztető rendszerek tervezését és kivitelezését ipari, kereskedelmi és lakossági környezetben egyaránt.\n\nLakások esetében foglalkozunk konyhai páraelszívók, WC- és fürdőszobai ventilátorok, valamint egyhelyiséges hővisszanyerős szellőztetők telepítésével és cseréjével is. Ezek segítenek megelőzni a penészedést, javítják a levegő minőségét és biztosítják a folyamatos friss levegő utánpótlást.\n\nA nagyobb rendszereknél kiépítjük a csőhálózatot, telepítjük a légkezelő egységeket, elvégezzük a beszabályozást és gondoskodunk a hosszú távú, hatékony működésről. Egy jól megtervezett légtechnikai rendszer komfortosabbá, egészségesebbé és energiatakarékosabbá teszi a helyiségeket.",
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleCardClick = (service: Service, e: React.MouseEvent) => {
    if (service.detailedDescription) {
      e.preventDefault();
      setSelectedService(service);
    }
  };

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
              onClick={(e) => handleCardClick(service, e)}
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
                {service.detailedDescription ? "Részletek" : "Ajánlatkérés"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            </a>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          description={selectedService.detailedDescription || selectedService.description}
          icon={selectedService.icon}
        />
      )}
    </section>
  );
};

export default Services;
