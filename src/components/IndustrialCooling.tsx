import { Droplets, Wind, Wrench, Snowflake, Images, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Droplets,
    title: "Ipari hűtés és Chiller (folyadékhűtő) rendszerek – Projektalapú szakmai kivitelezés",
    galleryHref: "/referenciak/ipari-hutes",
    desc: "Komplex ipari hűtési rendszerek tervezését és kivitelezését a felmérés után egyeztetett műszaki tartalom és felelősségi kör szerint vállaljuk. A projektben rögzített feladatokat a tervezéstől az átadásig összehangoljuk.",
    bullets: [
      "Projektmenedzsment és logisztika: az ajánlatban rögzített körben engedélyezési egyeztetés, daruzás és helyszíni letelepítés szervezése.",
      "Szakszerű telepítés és beüzemelés: chillerek hidraulikai bekötése, rendszerfeltöltés és a gyártói előírások szerinti műszaki beüzemelés a garanciafeltételek figyelembevételével.",
      "Fan-coil hálózatok: teljes belső vizes hálózat kiépítése, hidraulikai beszabályozása és a végponti egységek felszerelése.",
      "Üzemeltetési támogatás: a vállalási és gyártói feltételek szerinti garanciális, illetve azon túli karbantartás, téli-nyári átállás és időszakos működési felülvizsgálat.",
    ],
  },
  {
    icon: Snowflake,
    title: "Légcsatornázható és félipari megoldások – Tervezett komfort",
    galleryHref: "/referenciak/legcsatornazhato",
    desc: "A légcsatornázható rendszerek ott nyújtanak megoldást, ahol a fali split klímák telepítése esztétikailag vagy technikailag nem előnyös. A padlástérbe vagy álmennyezetbe rejtett berendezések diszkrét rácsokon keresztül, tervezett légelosztással működnek.",
    bullets: [
      "Tagolt terek kezelése: egyetlen rendszerrel több kisebb helyiség (hálószobák, tárgyalók) egyidejű hűtése és fűtése.",
      "Ipari védelem: ahol a műszaki feltételek engedik, szennyezett üzemi környezetben a gép a kezelt téren kívül helyezhető el a porterhelés mérséklésére.",
      "Közvetlen huzathatást mérséklő kialakítás: a befúvási pontok tervezett elhelyezésével csökkenthető a közvetlen hideg légáram.",
      "Csendesebb beltéri környezet: megfelelő gépelhelyezéssel a géphang jelentős része a kezelt téren kívül tartható.",
    ],
  },
  {
    icon: Wind,
    title: "Központi légkezelés (AHU) és szűréstechnika – A megfelelő levegőminőség támogatása",
    galleryHref: "/referenciak/legtechnika",
    desc: "Egy épület levegőminőségét és energiahatékonyságát jelentősen befolyásolja a légkezelő rendszer (AHU) állapota. Szolgáltatásunk a gépészeti felülvizsgálattól a szűrőmenedzsmentig terjed, támogatva az irodák és ipari csarnokok tervezett frisslevegő-ellátását.",
    bullets: [
      "Szűrőmenedzsment: rendszeres csere és ellenőrzés a G4-es osztálytól egészen az F9-es finomszűrőkig a belső levegő tisztaságáért.",
      "Hővisszanyerő blokkok: lemezes és rotációs hőcserélők tisztítása és hatásfok-ellenőrzése az energiahatékony működés támogatására.",
      "Higiéniai karbantartás: csepptálcák és belső szekciók tisztítása, szükség esetén szakszerű fertőtlenítése.",
      "Műszaki diagnosztika: ventilátorok, motorok és zsalumozgatók állapotfelmérése és szükség szerinti javítása.",
    ],
  },
  {
    icon: Wrench,
    title: "Márkafüggetlen ipari szerviz és karbantartás",
    galleryHref: "/referenciak/karbantartas",
    desc: "Az ipari hűtési rendszerek üzembiztonságát a tudatos karbantartás is támogatja. Szervizszolgáltatásunk a gyors reakcióra és a műszeres diagnosztikára épül, hogy csökkenthető legyen a váratlan, költséges leállások kockázata.",
    bullets: [
      "Márkafüggetlen hibafeltárás: számos ipari hűtő- és légkezelő berendezést vizsgálunk; a javíthatóság a konkrét típus, dokumentáció és alkatrészellátás függvénye.",
      "Műszeres diagnosztika: modern mérőeszközökkel végzett hibafeltárás, hőkamerás ellenőrzés és elektromos paraméter-analízis a pontos javításért.",
      "Karbantartási szerződések: egyedi igényekre szabott, ütemezett felülvizsgálatok az üzembiztonság és a tervezhető hibaelhárítás támogatására.",
      "Klímagáz-adminisztráció: az érintett berendezéseknél szükséges szivárgásvizsgálatok és nyilvántartási feladatok elvégzése a mindenkor hatályos szabályok szerint.",
    ],
  },
];

const IndustrialCooling = () => {
  return (
    <section id="ipari" className="scroll-mt-24 py-20 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Szakmai múltunk 1993-ig nyúlik vissza, a <strong>Northwind Hűtéstechnika Kft.</strong> pedig 2009 óta támogat ipari és kereskedelmi
            partnereinket. Nem csupán berendezéseket telepítünk, hanem komplex gépészeti rendszerekben gondolkodunk:
            a folyadékhűtős rendszerektől a speciális, légcsatornázható félipari megoldásokig. Ez utóbbi megfelelő választás lehet
            olyan irodákba vagy tagolt terekbe, ahol a hagyományos split klímák elhelyezése nem esztétikus vagy nem
            megoldható. Precíz szakmai tervezéssel és szakszerű kivitelezéssel törekszünk az egyenletes,
            közvetlen huzathatást kerülő légelosztásra és az üzembiztos működésre.
          </p>
        </div>

        <div className="space-y-8 mb-12 max-w-5xl mx-auto">
          {sections.map((s, idx) => (
            <article
              key={s.title}
              id={`ipari-0${idx + 1}`}
              className="relative scroll-mt-28 rounded-2xl p-6 sm:p-10 border-2 border-primary/15 bg-gradient-card"
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span className="text-sm font-mono text-primary/60">0{idx + 1}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {s.title}
                    </h2>
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
                  <Link
                    to={s.galleryHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    <Images className="w-4 h-4" />
                    Referenciák megtekintése
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustrialCooling;
