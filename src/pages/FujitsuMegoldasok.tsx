import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  Award,
  CheckCircle2,
  AirVent,
  Droplets,
  Snowflake,
  Factory,
  Images,
  Phone,
  Mail,
} from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/fujitsu-hero-interior.jpg";

const Footer = lazy(() => import("@/components/Footer"));

const services = [
  {
    icon: AirVent,
    title: "Lakossági Split rendszerek",
    tagline: "Komfort és csendes, japán precizitás.",
    body:
      "A Fujitsu lakossági split sorozatai (KL, KM, KJ, KG) kategóriájuk legcsendesebb működését nyújtják, kiemelkedő szezonális hatásfok mellett. Mérnökeink a helyiség adottságaihoz méretezve választják ki azt a beltéri egységet, amely a legkisebb energiafogyasztás mellett biztosítja a tökéletes komfortot.",
    bullets: [
      "Akár 19 dB(A) belső hangnyomás éjszakai üzemmódban",
      "Human Sensor és precíz légirányítás a huzatmentes komfortért",
      "A++++ szezonális energiaosztály a top sorozatokon",
    ],
    galleryHref: "/referenciak/fujitsu-lakossagi",
  },
  {
    icon: Droplets,
    title: "Waterstage Hőszivattyúk",
    tagline: "Hatékony fűtés, hűtés és használati melegvíz egyetlen rendszerből.",
    body:
      "A Fujitsu Waterstage levegő-víz hőszivattyúk a legkorszerűbb invertertechnológiával kínálnak fenntartható megoldást padlófűtéshez, radiátoros rendszerekhez és HMV-előállításhoz. Mérnöki méretezéssel garantáljuk, hogy rendszere a leghidegebb téli napokon is stabil COP-pal működjön.",
    bullets: [
      "Magas SCOP érték a kedvezményes H-tarifa kihasználásához",
      "Csendes kültéri egységek, lakókörnyezetbe is barátságosak",
      "Integrált HMV-vezérlés és okos rendszerfelügyelet",
    ],
    galleryHref: "/referenciak/fujitsu-waterstage",
  },
  {
    icon: Snowflake,
    title: "Légcsatornázható megoldások",
    tagline: "Láthatatlan elegancia – a technika a háttérben marad.",
    body:
      "Igényes otthonokba és reprezentatív irodákba ajánljuk a Fujitsu álmennyezetbe rejthető légcsatornázható egységeit. A diszkrét befúvórácsok mögött rejlő rendszer egyenletes, huzatmentes komfortot teremt, miközben a belső tér letisztult marad.",
    bullets: [
      "Álmennyezetbe vagy padlástérbe rejtett kültéri egységek",
      "Több helyiség egyidejű kiszolgálása egyetlen rendszerről",
      "Magas statikus nyomás – hosszú légcsatorna-szakaszokhoz is",
    ],
    galleryHref: "/referenciak/fujitsu-legcsatornazhato",
  },
  {
    icon: Factory,
    title: "Ipari VRF és Folyadékhűtők",
    tagline: "Mérnöki precizitás kereskedelmi és ipari léptékben.",
    body:
      "A Fujitsu VRF rendszerek és folyadékhűtők irodaházak, szállodák és ipari létesítmények számára biztosítanak skálázható, energiahatékony klímamegoldást. A teljes körű kivitelezést – tervezéstől hivatalos beüzemelésig – házon belül kezeljük.",
    bullets: [
      "Egyidejű hűtés-fűtés (3-csöves VRF) zónánkénti szabályzással",
      "Központi BMS-integráció és távoli rendszerfelügyelet",
      "Hivatalos műszaki beüzemelés a gyári garancia megőrzésével",
    ],
    galleryHref: "/referenciak/fujitsu-vrf",
  },
];

const authorityPoints = [
  {
    icon: Award,
    title: "Hivatalos Columbus Klíma partner",
    text: "A Columbus Klíma a Fujitsu hivatalos magyarországi disztribútora. Partneri minősítésünk garantálja a hozzáférést az eredeti alkatrészekhez és a műszaki támogatáshoz.",
  },
  {
    icon: Wrench,
    title: "33 év mérnöki tapasztalat",
    text: "1993 óta tervezünk és szerelünk hűtéstechnikai rendszereket. A Fujitsu portfólió mind lakossági, mind ipari oldalát mélyen ismerjük.",
  },
  {
    icon: ShieldCheck,
    title: "Szakszerű telepítés és dokumentáció",
    text: "Minden Fujitsu rendszerünket gyári előírás szerint vákuumozzuk, beüzemeljük és átadási dokumentációval látjuk el – ez a kiterjesztett garancia alapfeltétele.",
  },
];

const FujitsuMegoldasok = () => {
  return (
    <div className="fujitsu-brand min-h-screen bg-background text-foreground">
      <SEOHead
        title="Fujitsu Megoldások | Northwind – Hivatalos Columbus Klíma partner"
        description="Fujitsu lakossági és ipari klímarendszerek tervezése és telepítése. 10 éves kiterjesztett Columbus Klíma garancia, 33 év mérnöki tapasztalat."
      />
      <Header />

      <main className="pt-24">
        {/* HERO */}
        <section className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Hivatalos Fujitsu partner
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 text-foreground">
                  Northwind – Az Ön kiemelt{" "}
                  <span className="text-primary">Fujitsu</span> partnere
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                  33 év mérnöki tapasztalat és hivatalos Columbus Klíma garancia
                  – minden telepített rendszer mögött.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link to="/#kapcsolat">
                      Egyedi Fujitsu tervezés
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#garancia">10 éves garancia részletei</a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10" />
                <img
                  src={heroImage}
                  alt="Fujitsu lakossági split klíma modern, letisztult belső térben"
                  width={1536}
                  height={1024}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AUTHORITY */}
        <section className="py-16 sm:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Miért minket válasszon?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-foreground">
                Hivatalos partnerség, dokumentált szakértelem
              </h2>
              <p className="text-base text-muted-foreground">
                Mély szakmai tudásunk a teljes Fujitsu portfólióra kiterjed –
                a lakossági split rendszerektől az ipari VRF megoldásokig.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {authorityPoints.map((p) => (
                <article
                  key={p.title}
                  className="rounded-2xl p-7 bg-card border-2 border-border hover:border-primary/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
                    <p.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10 YEAR WARRANTY */}
        <section
          id="garancia"
          className="py-20 sm:py-28 bg-gradient-hero text-primary-foreground relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider opacity-90">
                Columbus Klíma kiterjesztett garancia
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 leading-tight">
                10 év nyugalom – mérnöki garanciával
              </h2>
              <p className="text-lg sm:text-xl opacity-95 leading-relaxed mb-10 max-w-3xl mx-auto">
                A Fujitsu lakossági klímákra a Columbus Klíma 10 éves
                kiterjesztett garanciát biztosít. Ez a piacon egyedülálló
                védelem azonban kötött feltételekhez köthető – ezeket nálunk
                hivatalból teljesítjük.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 text-left">
                {[
                  {
                    title: "Hivatalos partner telepítés",
                    text: "A telepítést a Columbus Klíma által minősített szakember végzi – mint a Northwind csapata.",
                  },
                  {
                    title: "Éves szakszerű karbantartás",
                    text: "Évente legalább egyszer hivatalos partner által dokumentált, teljes körű karbantartás szükséges.",
                  },
                  {
                    title: "Eredeti alkatrészek",
                    text: "Csak gyári Fujitsu / Columbus Klíma által szállított alkatrészek beépítése a teljes garanciaidő alatt.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-5 bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <CheckCircle2 className="w-6 h-6 mb-3 opacity-90" />
                    <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs opacity-70 mt-8 max-w-2xl mx-auto">
                A garancia részletes feltételeit a Columbus Klíma hivatalos
                tájékoztatója tartalmazza. Ajánlatkéréskor minden vonatkozó
                feltételt tételesen átadunk.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Fujitsu portfólió
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-foreground">
                Megoldások a lakástól az iparig
              </h2>
              <p className="text-base text-muted-foreground">
                Minden szegmensben mérnöki gondossággal tervezünk, telepítünk
                és üzemeltetünk – a Fujitsu teljes termékskálájáról.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {services.map((s, i) => (
                <article
                  key={s.title}
                  className="group rounded-2xl p-7 sm:p-8 bg-card border-2 border-border hover:border-primary/40 transition-all flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-mono text-primary/70">
                        0{i + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground/80 mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {s.body}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-foreground/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={s.galleryHref}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all self-start"
                  >
                    <Images className="w-4 h-4" />
                    Fujitsu referenciák
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto rounded-3xl bg-card border-2 border-primary/30 p-8 sm:p-12 text-center shadow-xl">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Személyes konzultáció
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-foreground">
                Kérjen egyedi Fujitsu tervezést és ajánlatot Csiki-Mara Zsolttól
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Mérnöki konzultáció, helyszíni felmérés és személyre szabott
                rendszerterv – kötelezettség nélkül. A 10 éves Columbus Klíma
                garancia minden ajánlatunk része.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/#kapcsolat">
                    Ajánlatkérés
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+36704099760">
                    <Phone className="w-4 h-4" />
                    +36 70 409 9760
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:northwind@northwind.hu">
                    <Mail className="w-4 h-4" />
                    northwind@northwind.hu
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default FujitsuMegoldasok;