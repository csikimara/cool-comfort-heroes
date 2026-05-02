import { Droplets, Wind, Wrench, Snowflake, Images, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    icon: Droplets,
    title: "Ipari hűtés és Chiller (folyadékhűtő) rendszerek – Teljes körű mérnöki kivitelezés",
    galleryHref: "/galeria/ipari-hutes/",
    desc: "Vállaljuk komplex ipari hűtési rendszerek tervezését és teljes körű, kulcsrakész kivitelezését, levéve a logisztikai és szervezési terhet az Ön válláról. A teljes folyamatot kézben tartjuk a tervezéstől az üzemeltetésig.",
    bullets: [
      "Projektmenedzsment és Logisztika: hatósági ügyintézés, útfoglalási engedélyek, daruzás vezénylése és precíz helyszíni letelepítés.",
      "Szakszerű Telepítés és Beüzemelés: chillerek hidraulikai bekötése, rendszerfeltöltés és hivatalos műszaki beüzemelés a gyári garancia megőrzésével.",
      "Fan-coil hálózatok: teljes belső vizes hálózat kiépítése, hidraulikai beszabályozása és a végponti egységek felszerelése.",
      "Üzemeltetési biztonság: garanciális és azon túli karbantartás, téli-nyári átállások és folyamatos energiahatékonysági optimalizálás.",
    ],
  },
  {
    icon: Snowflake,
    title: "Légcsatornázható és Félipari Split Megoldások",
    galleryHref: "/galeria/legcsatornazhato/",
    desc: "Speciális megoldások irodákba és csarnokokba. Légcsatornázható gépek telepítése, ahol a beltéri egységet a szennyezett téren kívül helyezzük el, így garantálva a gép védelmét és a tiszta levegő befúvását.",
    bullets: [
      "Légcsatornázható beltéri egységek álmennyezetbe rejtve",
      "Beltéri egység elhelyezése gépészeti helyiségben",
      "Tiszta, szűrt levegő befúvása irodákba és munkaterekre",
      "Huzatmentes, optimális légelosztás precíz tervezéssel",
    ],
  },
  {
    icon: Wind,
    title: "Központi Légkezelés (AHU) és Szűréstechnika",
    galleryHref: "/galeria/legtechnika/",
    desc: "Ipari légkezelő gépek műszaki felülvizsgálata, szűrőcseréje (G4–F9 szűrési osztályok) és hővisszanyerős szellőztető rendszerek karbantartása a folyamatos friss levegő és az előírt páratartalom biztosításához.",
    bullets: [
      "AHU egységek műszaki felülvizsgálata és üzembe helyezése",
      "Szűrőcsere G4–F9 szűrési osztályokban",
      "Hővisszanyerős szellőztető rendszerek karbantartása",
      "Páratartalom- és hőmérséklet-szabályozás finomhangolása",
    ],
  },
  {
    icon: Wrench,
    title: "Márkafüggetlen Ipari Szerviz és Karbantartás",
    galleryHref: "/galeria/karbantartas/",
    desc: "Gyors hibaelhárítás és precíz diagnosztika minden típusú ipari hűtőberendezéshez. Megelőző karbantartási szerződések irodaházak és ipari létesítmények részére a drága leállások elkerülése érdekében.",
    bullets: [
      "Gyors hibaelhárítás és precíz műszeres diagnosztika",
      "Márkafüggetlen javítás minden ipari berendezésen",
      "Megelőző karbantartási szerződések egyedi feltételekkel",
      "Tervezett karbantartás a váratlan leállások elkerüléséért",
    ],
  },
];

const IndustrialCooling = () => {
  return (
    <section id="ipari" className="py-20 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            A <strong>Northwind Hűtéstechnika Kft.</strong> 1993 óta nyújt professzionális támogatást ipari és kereskedelmi
            partnerei számára. Nem csupán berendezéseket telepítünk, hanem komplex gépészeti rendszerekben gondolkodunk:
            a folyadékhűtős rendszerektől a speciális, légcsatornázható félipari megoldásokig. Ez utóbbi különösen ideális
            olyan irodákba vagy tagolt terekbe, ahol a hagyományos split klímák elhelyezése nem esztétikus vagy nem
            megoldható. Precíz mérnöki tervezéssel és szakszerű kivitelezéssel garantáljuk a huzatmentes, optimális
            légelosztást és az üzembiztos működést.
          </p>
        </div>

        <div className="space-y-8 mb-12 max-w-5xl mx-auto">
          {sections.map((s, idx) => (
            <article
              key={s.title}
              className="relative rounded-2xl p-6 sm:p-10 border-2 border-primary/15 bg-gradient-card"
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span className="text-sm font-mono text-primary/60">0{idx + 1}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground mb-6">
                    {s.desc}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={s.galleryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    <Images className="w-4 h-4" />
                    Referenciák megtekintése
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="#kapcsolat">Kérjen ipari konzultációt vagy ajánlatot!</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustrialCooling;
