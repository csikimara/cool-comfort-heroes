import { useState, ReactNode } from "react";
import {
  AirVent,
  Wrench,
  ThermometerSun,
  SprayCan,
  Wind,
  Fan,
  ArrowRight,
  Info,
  Factory,
  Receipt,
  Home,
  LucideIcon,
} from "lucide-react";
import ServiceDetailModal from "./ServiceDetailModal";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedDescription?: string;
  extraContent?: ReactNode;
}

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
  service?: Service;
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
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-black">
          <video
            src="https://northwind.hu/video/zsakos-mosas.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto block"
          >
            A böngésződ nem támogatja a videó lejátszását.
          </video>
        </div>
        <p className="text-xs text-muted-foreground/70 text-center mt-2">
          Zsákos klímamosás folyamata – a hang bekapcsolásához kattints a hangerő ikonra
        </p>
      </>
    ),
  },
];

const findService = (title: string) => services.find((s) => s.title === title)!;

const pillars: Pillar[] = [
  {
    icon: Home,
    title: "Lakossági Klíma és Hőszivattyú",
    description:
      "Professzionális split és multi-split klímaberendezések, valamint energiahatékony hőszivattyúk telepítése otthonokba és irodákba.",
    href: "#kapcsolat",
    cta: "Részletek megnyitása",
    service: findService("Klímaszerelés"),
  },
  {
    icon: Factory,
    title: "Ipari Folyadékhűtők (Chiller) és Fan-coil",
    description:
      "Komplex ipari hűtéstechnikai megoldások: folyadékhűtők (chillerek), fan-coil rendszerek tervezése, telepítése és szervize.",
    href: "/reszletek#ipari",
    cta: "Ipari megoldások",
  },
  {
    icon: Wind,
    title: "Légtechnika és Szellőzés (AHU)",
    description:
      "Komplex szellőztető és légkezelő rendszerek (AHU) tervezése és kivitelezése lakossági, kereskedelmi és ipari környezetben.",
    href: "#kapcsolat",
    cta: "Részletek megnyitása",
    service: findService("Légtechnikai szerelés"),
  },
  {
    icon: Wrench,
    title: "Szerviz és Prémium Karbantartás",
    description:
      "Rendszeres éves felülvizsgálat, márkafüggetlen javítás és prémium zsákos klímamosás a hosszú élettartamért és optimális hatékonyságért.",
    href: "#kapcsolat",
    cta: "Részletek megnyitása",
    service: findService("Karbantartás"),
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleCardClick = (pillar: Pillar, e: React.MouseEvent) => {
    if (pillar.service) {
      e.preventDefault();
      setSelectedService(pillar.service);
    }
  };

  const renderPillar = (pillar: Pillar, index: number) => (
    <a
      key={pillar.title}
      href={pillar.href}
      onClick={(e) => handleCardClick(pillar, e)}
      className="group relative rounded-2xl p-6 sm:p-7 border bg-gradient-card border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 block h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <pillar.icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
        {pillar.title}
      </h3>
      <p className="text-base leading-relaxed mb-4 text-muted-foreground">
        {pillar.description}
      </p>
      <span className="card-cta">
        {pillar.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
    </a>
  );

  return (
    <section id="szolgaltatasok" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
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

        {/* 4 Pillar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => renderPillar(pillar, index))}
        </div>

        {/* CTA to details page */}
        <div className="mt-12 text-center">
          <a
            href="/reszletek"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated hover:bg-primary/90 transition-all duration-300 group text-base"
          >
            Ipari Megoldások
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <nav
            aria-label="Gyors navigáció a részletek oldalra"
            className="mt-6 max-w-2xl mx-auto grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              { href: "/reszletek#rolunk", label: "Rólunk", Icon: Info },
              { href: "/reszletek#ipari", label: "Ipari hűtés", Icon: Factory },
              { href: "/reszletek#arazas", label: "Árazás", Icon: Receipt },
              { href: "/reszletek#karbantartas-idovonal", label: "Karbantartás", Icon: Wrench },
            ].map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-card border-2 border-primary/20 text-foreground font-semibold shadow-sm hover:border-primary hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-sm sm:text-base group-hover:text-primary transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </nav>
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
