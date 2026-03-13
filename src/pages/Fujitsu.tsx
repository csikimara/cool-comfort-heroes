import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FujitsuHero from "@/components/fujitsu/FujitsuHero";
import FujitsuModelCard from "@/components/fujitsu/FujitsuModelCard";
import FujitsuSummary from "@/components/fujitsu/FujitsuSummary";
import { Snowflake, Sun, Flame } from "lucide-react";

const models = [
  {
    id: "kp",
    badge: "Belépő szint",
    name: "Fujitsu KP sorozat",
    subtitle: "A racionális belépő",
    tagline: "Megbízható hűtés elérhető áron",
    description:
      "Ideális választás nyári hűtésre, ahol a cél a megbízható, japán minőségű klíma – felesleges extrák nélkül. Hosszú élettartam, garantált alkatrészellátás és csendes működés jellemzi.",
    highlights: [
      "Japán megbízhatóság elérhető áron",
      "Csendes működés lakásokba",
      "Hosszú élettartam, évtizedes szervizháttér",
      "Egyszerű, megbízható technológia",
    ],
    icon: Snowflake,
    accentClass: "from-sky-500 to-sky-600",
    badgeClass: "bg-sky-100 text-sky-700",
  },
  {
    id: "km",
    badge: "Legjobb ár-érték",
    name: "Fujitsu KM sorozat",
    subtitle: "A sokoldalú mindenes",
    tagline: "Kiváló ár-érték arány",
    description:
      "Tökéletes választás, ha nemcsak nyáron hűtene, hanem átmeneti időszakban (tavasz/ősz) hatékonyan fűtene is. Kiváló kompromisszum a teljesítmény és az ár között.",
    highlights: [
      "Hatékony hűtés és fűtés egyaránt",
      "Kiváló ár-érték arány",
      "Átmeneti időszakban is gazdaságos",
      "Modern, energiatakarékos technológia",
    ],
    icon: Sun,
    accentClass: "from-amber-500 to-orange-500",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    id: "kg",
    badge: "Prémium csúcsmodell",
    name: "Fujitsu KG sorozat",
    subtitle: "A fűtésbajnok",
    tagline: "A++ / A+++ hatékonyság",
    description:
      "Az ultimate megoldás elsődleges fűtésre – akár extrém, -25°C-os hidegben is stabil és gazdaságos teljesítményt nyújt. Human Sensor technológia, suttogó üzemmód és csúcskategóriás hatékonyság.",
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

      {/* Buying Guide */}
      <section className="py-20">
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

      <FujitsuSummary />
      <Footer />
    </div>
  );
};

export default Fujitsu;
