import { useState, ReactNode } from "react";
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
  ImageIcon,
  LucideIcon
} from "lucide-react";
import ServiceDetailModal from "./ServiceDetailModal";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedDescription?: string;
  extraContent?: ReactNode;
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
    description: "Rendszeres éves felülvizsgálat a biztonságos működésért. Hosszú élettartam és optimális hatékonyság.",
    detailedDescription: "A rendszeres karbantartás és klímatisztítás alapvető feltétele annak, hogy a klíma hosszú távon megbízhatóan, csendesen és energiatakarékosan működjön. Javítás és karbantartás terén márkafüggetlen szakértelemmel állunk rendelkezésre: legyen szó bármilyen típusról, 33 év rutinnal orvosoljuk a hibákat.\n\nA folyamat során eltávolítjuk a készülékben felgyülemlett port, gombát és baktériumokat, amelyek kellemetlen szagokat, allergiás tüneteket vagy akár komoly meghibásodást is okozhatnak. Ellenőrizzük a hűtőközeg mennyiségét, a csatlakozásokat, a kondenzvíz elvezetését, a ventilátor működését és a készülék általános műszaki állapotát.\n\nHa a klímát csak hűtésre használják, akkor évi 1 alkalom karbantartás elegendő. Amennyiben fűtésre is használják, a készülék sokkal nagyobb terhelést kap, ezért évi 2 alkalom javasolt a biztonságos és hatékony működés érdekében. A tiszta és karbantartott klíma egészségesebb levegőt biztosít, kevesebb energiát fogyaszt, és jelentősen meghosszabbítja a berendezés élettartamát.",
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
    detailedDescription: "A hőszivattyú korszerű, környezetbarát megoldás fűtésre és hűtésre egyaránt. A levegőből vagy talajból nyert energiát hasznosítja, így jelentősen csökkenti a rezsiköltségeket. A telepítés során gondoskodunk a megfelelő méretezésről, beépítésről és beállításról, hogy a rendszer a lehető legjobb hatásfokkal működjön.",
  },
  {
    icon: Building2,
    title: "Irodaház hűtés",
    description: "Nagyméretű irodaházak hűtési rendszereinek karbantartása és javítása.",
    detailedDescription: "Nagyobb épületekben a hűtési rendszerek folyamatos, stabil működése elengedhetetlen. A karbantartás során ellenőrizzük a hűtőköröket, tisztítjuk a hőcserélőket, beszabályozzuk a rendszert és elhárítjuk az esetleges hibákat. Célunk, hogy a hűtés a legmelegebb időszakban is megbízhatóan működjön, és az energiafelhasználás optimális maradjon.",
  },
  {
    icon: SprayCan,
    title: "Prémium Zsákos Klímamosás",
    description: "Gyári higiénia helyreállítása: professzionális vegyszeres mélymosás, amely visszaadja a klíma eredeti tisztaságát és hatékonyságát.",
    detailedDescription: "A professzionális klímatisztítás során speciális tisztítózsákot használunk, amely lehetővé teszi a beltéri egység teljes, vegyszeres átmosását anélkül, hogy a fal vagy a helyiség koszolódna. A zsákos mosás eltávolítja a hőcserélőn és a ventilátoron lerakódott port, gombát, nyálkás szennyeződéseket és baktériumokat, amelyek kellemetlen szagokat, allergiás tüneteket és hatásfokromlást okozhatnak.\n\nA tisztítás része a kültéri egység alapos mosása is: nagy nyomású vízzel és megfelelő tisztítószerekkel eltávolítjuk a hőcserélőről a port, pollent, rovarokat és egyéb lerakódásokat. Ez javítja a hűtési-fűtési teljesítményt, csökkenti a zajszintet és növeli a kompresszor élettartamát.\n\nA rendszeres, alapos klímatisztítás nemcsak egészségesebb levegőt biztosít, hanem jelentősen javítja a készülék hatékonyságát és megbízhatóságát is.",
    extraContent: (
      <>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 my-6">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <SprayCan className="w-5 h-5 text-primary" />
            Miért szükséges a mélytisztítás?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Idővel a klíma belsejében gomba, baktérium és allergén halmozódik fel – ezek kellemetlen szagokat, 
            egészségügyi problémákat és hatásfokromlást okozhatnak. A zsákos mélymosás mindezt eltávolítja, 
            míg a hagyományos karbantartás csak a felületet tisztítja.
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-muted/30 h-48 flex flex-col items-center justify-center gap-3">
          <ImageIcon className="w-10 h-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground/70 font-medium">Előtte / Utána fotó helye</p>
        </div>
      </>
    ),
  },
  {
    icon: Fan,
    title: "Fan-coilok",
    description: "Fan-coil berendezések telepítése, karbantartása és javítása.",
    detailedDescription: "A fan-coil rendszerek vízalapú hűtést és fűtést biztosítanak, ezért különösen fontos a tiszta hőcserélő és a megfelelő légáramlás. Telepítést, karbantartást és javítást is vállalunk, hogy a berendezések csendesen, hatékonyan és hosszú távon működjenek. Ideális megoldás irodákban, szállodákban és intézményekben.",
  },
  {
    icon: AirVent,
    title: "Légkezelők",
    description: "Központi légkezelő egységek szerelése és szervize ipari környezetben.",
    detailedDescription: "A légkezelők felelnek a levegő szűréséért, hőmérsékletének és páratartalmának szabályozásáért. Ipari környezetben kiemelten fontos a folyamatos, megbízható működés. A telepítés mellett rendszeres szervizt is biztosítunk, hogy a rendszer mindig tiszta, hatékony és üzembiztos legyen.",
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
              <h3 className="text-xl sm:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed mb-4 text-muted-foreground">
                {service.description}
              </p>

              {/* Always-visible link affordance (mobile-friendly) */}
              <span className="card-cta">
                {service.detailedDescription ? "Részletek megnyitása" : "Ajánlatkérés"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            </a>
          ))}
        </div>

        {/* CTA to details page */}
        <div className="mt-12 text-center">
          <a
            href="/reszletek"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated hover:bg-primary/90 transition-all duration-300 group text-base"
          >
            Részletek
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            Rólunk · Ipari hűtés · Árazás · Karbantartás
          </p>
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
          extraContent={selectedService.extraContent}
        />
      )}
    </section>
  );
};

export default Services;
