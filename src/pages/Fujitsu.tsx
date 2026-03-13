import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FujitsuHero from "@/components/fujitsu/FujitsuHero";
import FujitsuModelCard from "@/components/fujitsu/FujitsuModelCard";
import FujitsuSummary from "@/components/fujitsu/FujitsuSummary";
import { Shield, Zap, AirVent, ThermometerSun, Snowflake, Sun, Flame, User, Settings } from "lucide-react";
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

const models = [
  {
    id: "kp",
    badge: "Belépő szint",
    name: "Fujitsu KP sorozat",
    subtitle: "A racionális belépő",
    tagline: "Megbízható hűtés elérhető áron",
    description:
      "Elsősorban megbízható nyári hűtésre. Japán minőség, hosszú élettartam és garantált alkatrészellátás – felesleges extrák nélkül.",
    highlights: [
      "Japán megbízhatóság elérhető áron",
      "Csendes működés lakásokba",
      "Hosszú élettartam, évtizedes szervizháttér",
      "Egyszerű, megbízható technológia",
    ],
    icon: Snowflake,
    accentClass: "from-sky-500 to-sky-600",
    badgeClass: "bg-sky-100 text-sky-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/split-klima/kp-sorozat",
  },
  {
    id: "km",
    badge: "Legjobb ár-érték",
    name: "Fujitsu KM sorozat",
    subtitle: "A sokoldalú kedvenc",
    tagline: "Kiváló ár-érték arány",
    description:
      "Átmeneti időszaki fűtésre és hűtésre egyaránt tökéletes. Kiváló kompromisszum a teljesítmény és az ár között.",
    highlights: [
      "Hatékony hűtés és fűtés egyaránt",
      "Kiváló ár-érték arány",
      "Átmeneti időszakban is gazdaságos",
      "Modern, energiatakarékos technológia",
    ],
    icon: Sun,
    accentClass: "from-amber-500 to-orange-500",
    badgeClass: "bg-amber-100 text-amber-700",
    catalogUrl: "https://www.fujitsuklima.hu/klimak/split-klima/km-sorozat",
  },
  {
    id: "kg",
    badge: "Prémium csúcsmodell",
    name: "Fujitsu KG sorozat",
    subtitle: "A fűtésbajnok",
    tagline: "A++ / A+++ hatékonyság",
    description:
      "Elsődleges fűtésre, a legmagasabb hatékonysággal – akár -25°C-os extrém hidegben is stabil, gazdaságos teljesítményt nyújt.",
    highlights: [
      "A+++ energiaosztály, minimális rezsiköltség",
      "Stabil fűtés akár -25°C-ig",
      "Human Sensor – automatikus energiamegtakarítás",
      "19 dB(A) suttogó üzemmód",
    ],
    icon: Flame,
    accentClass: "from-red-500 to-red-600",
    badgeClass: "bg-red-100 text-red-700",
  },
];

const Fujitsu = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FujitsuHero />

      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              Miért a Fujitsu?
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
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              Vásárlási útmutató
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Melyik Fujitsu modell illik Önhöz?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Három sorozat, három különböző igényre szabva – a nyári hűtéstől az egész éves fűtésig.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <FujitsuModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Selling Points + Installation Photo */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                Előnyök
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                Miért választják ügyfeleink a Fujitsu-t?
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

            <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-[4/3]">
              <img
                src={fujitsuInstallation}
                alt="Professzionális Fujitsu klíma beltéri egység telepítés"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <FujitsuSummary />
      <Footer />
    </div>
  );
};

export default Fujitsu;
