import { Droplets, Wind, Wrench, Snowflake, Images, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Droplets,
    title: "Ipari hűtés és Chiller (folyadékhűtő) rendszerek – Teljes körű mérnöki kivitelezés",
    galleryHref: "/referenciak/ipari-hutes",
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
    title: "Légcsatornázható és Félipari megoldások – Kompromisszumok nélküli komfort",
    galleryHref: "/referenciak/legcsatornazhato",
    desc: "A légcsatornázható rendszerek ott nyújtanak megoldást, ahol a fali split klímák telepítése esztétikailag vagy technikailag nem előnyös. A padlástérbe vagy álmennyezetbe rejtett berendezések láthatatlanul, diszkrét rácsokon keresztül biztosítanak tökéletes légelosztást.",
    bullets: [
      "Tagolt terek kezelése: egyetlen rendszerrel több kisebb helyiség (hálószobák, tárgyalók) egyidejű hűtése és fűtése.",
      "Ipari védelem: szennyezett üzemi környezetben a gépet a hűtött téren kívül helyezzük el, védve a portól és növelve az élettartamot.",
      "Huzatmentes kialakítás: a befúvási pontok precíz elhelyezésével megszüntetjük a közvetlen hideg légáramot, egyenletes komfortot teremtve.",
      "Csendes üzem: a géphang a lakótéren kívül marad, ideális hálószobákba és csendes irodai környezetbe egyaránt.",
    ],
  },
  {
    icon: Wind,
    title: "Központi Légkezelés (AHU) és Szűréstechnika – Az egészséges munkakörnyezet alapja",
    galleryHref: "/referenciak/legtechnika",
    desc: "Egy épület levegőminősége és energiahatékonysága a légkezelő rendszer (AHU) állapotán múlik. Szolgáltatásunk a teljes körű gépészeti felülvizsgálattól a precíz szűrőmenedzsmentig terjed, biztosítva az irodák és ipari csarnokok folyamatos frisslevegő-ellátását.",
    bullets: [
      "Szűrőmenedzsment: rendszeres csere és ellenőrzés a G4-es osztálytól egészen az F9-es finomszűrőkig a belső levegő tisztaságáért.",
      "Hővisszanyerő blokkok: lemezes és rotációs hőcserélők tisztítása és hatásfok-ellenőrzése a rezsiköltségek minimalizálása érdekében.",
      "Higiéniai karbantartás: csepptálcák és belső szekciók szakszerű fertőtlenítése az egészséges munkakörnyezetért.",
      "Műszaki diagnosztika: ventilátorok, motorok és zsalumozgatók állapotfelmérése és szükség szerinti javítása.",
    ],
  },
  {
    icon: Wrench,
    title: "Márkafüggetlen Ipari Szerviz és Karbantartás – Üzembiztonság felsőfokon",
    galleryHref: "/referenciak/karbantartas",
    desc: "Az ipari hűtési rendszerek zavartalan működése nem szerencse, hanem tudatos karbantartás kérdése. Szervizszolgáltatásunk a gyors reakcióidőre és a precíz, műszeres diagnosztikára épül, hogy partnereinknek ne kelljen tartaniuk a drága leállásoktól.",
    bullets: [
      "Márkafüggetlen javítás: 33 éves tapasztalattal szervizelünk bármilyen típusú ipari hűtő- és légkezelő berendezést gyártótól függetlenül.",
      "Műszeres diagnosztika: modern mérőeszközökkel végzett hibafeltárás, hőkamerás ellenőrzés és elektromos paraméter-analízis a pontos javításért.",
      "Karbantartási szerződések: egyedi igényekre szabott, ütemezett felülvizsgálatok, garantált élettartam és prioritást élvező hibaelhárítás.",
      "Jogi megfelelőség: kötelező szivárgásvizsgálatok elvégzése és adminisztrációja a hatályos uniós és hazai szabályozások szerint.",
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
              id={`ipari-0${idx + 1}`}
              style={idx === 0 ? { scrollMarginTop: "120px" } : undefined}
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
