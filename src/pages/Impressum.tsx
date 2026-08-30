import { ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Impresszum | Northwind Hűtéstechnika Kft."
        description="A northwind.hu üzemeltetőjének kötelező cégadatai és elérhetőségei."
      />

      <header className="bg-background/80 backdrop-blur-lg border-b border-border/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground leading-tight">Northwind</span>
                <p className="text-xs text-muted-foreground">Hűtéstechnika Kft.</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza a főoldalra
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-12 sm:py-20">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Impresszum</h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. A szolgáltató adatai</h2>
              <dl className="grid sm:grid-cols-[minmax(12rem,auto),1fr] gap-x-6 gap-y-3">
                <dt className="font-semibold text-foreground">Teljes cégnév</dt>
                <dd>Northwind Hűtéstechnika Építőipari és Szolgáltató Korlátolt Felelősségű Társaság</dd>
                <dt className="font-semibold text-foreground">Rövidített cégnév</dt>
                <dd>Northwind Hűtéstechnika Kft.</dd>
                <dt className="font-semibold text-foreground">Székhely</dt>
                <dd>1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó</dd>
                <dt className="font-semibold text-foreground">Cégjegyzékszám</dt>
                <dd>01-09-921672</dd>
                <dt className="font-semibold text-foreground">Nyilvántartó bíróság</dt>
                <dd>Fővárosi Törvényszék Cégbírósága</dd>
                <dt className="font-semibold text-foreground">Adószám</dt>
                <dd>14823330-2-43</dd>
                <dt className="font-semibold text-foreground">Képviselő</dt>
                <dd>Csiki-Mara Zsolt Dezső ügyvezető</dd>
              </dl>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Elérhetőség</h2>
              <ul className="space-y-2 list-none pl-0">
                <li><strong>E-mail:</strong> <a href="mailto:northwind@northwind.hu">northwind@northwind.hu</a></li>
                <li><strong>Telefon:</strong> <a href="tel:+36704099760">+36 70 409 9760</a></li>
                <li><strong>Weboldal:</strong> northwind.hu</li>
                <li><strong>Szolgáltatási terület:</strong> Budapest és Pest vármegye</li>
              </ul>
              <p className="mt-4">
                A székhely nem ügyfélfogadási hely. A szolgáltatásokat kiszállással, előzetes
                telefonos vagy írásos egyeztetés alapján végezzük.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Tárhelyszolgáltató</h2>
              <dl className="grid sm:grid-cols-[minmax(12rem,auto),1fr] gap-x-6 gap-y-3">
                <dt className="font-semibold text-foreground">Márkanév</dt>
                <dd>Magyar Hosting</dd>
                <dt className="font-semibold text-foreground">Cégnév</dt>
                <dd>Websupport Magyarország Kft.</dd>
                <dt className="font-semibold text-foreground">Székhely</dt>
                <dd>1119 Budapest, Fehérvári út 97-99.</dd>
                <dt className="font-semibold text-foreground">Cégjegyzékszám</dt>
                <dd>01-09-381419</dd>
                <dt className="font-semibold text-foreground">Adószám</dt>
                <dd>25138205-2-43</dd>
                <dt className="font-semibold text-foreground">Elérhetőség</dt>
                <dd><a href="mailto:info@mhosting.hu">info@mhosting.hu</a>, +36 1 700 2323</dd>
                <dt className="font-semibold text-foreground">Weboldal</dt>
                <dd><a href="https://www.mhosting.hu/" target="_blank" rel="noopener noreferrer">www.mhosting.hu</a></dd>
              </dl>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Hatósági nyilvántartás</h2>
              <p>
                A Northwind Hűtéstechnika Kft. a Nemzeti Klímavédelmi Hatóság Klímagáz
                adatbázisában nyilvántartott, országos szolgáltatási területű képesített
                vállalkozás. A nyilvántartás a{" "}
                <a
                  href="https://nemzetiklimavedelmihatosag.kormany.hu/kereso.php?internet=&terulet_id=3777&terulet_tipus=2&tevekenyseg_id=14"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hatósági vállalkozáskeresőben
                </a>{" "}
                ellenőrizhető.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. A weboldal rendeltetése</h2>
              <p>
                A weboldal a Northwind Hűtéstechnika Kft. szolgáltatásait mutatja be, és
                kapcsolatfelvételi lehetőséget biztosít. A kapcsolatfelvételi űrlap elküldése
                önmagában nem hoz létre szerződést és nem jelent előzetes árajánlatot. Tételes
                ajánlat a szükséges helyszíni felmérést és szakmai egyeztetést követően készül.
              </p>
              <p className="mt-4">
                A honlapon nincs kosár, online fizetés vagy online szerződéskötés. Fogyasztói
                szerződés megkötése előtt az adott ügyletre irányadó teljes díjról,
                teljesítési feltételekről, kellékszavatosságról, termékszavatosságról,
                jótállásról, panaszkezelésről és – ha alkalmazandó – az elállási/felmondási
                jogról külön, tartós adathordozón adunk tájékoztatást.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Szerzői jog</h2>
              <p>
                A weboldal saját szövegei, képei és egyéb tartalmai szerzői jogi védelem alatt
                állnak. Ezek engedély nélküli másolása, módosítása vagy üzleti célú felhasználása
                nem megengedett. A gyártói márkanevek és védjegyek a jogosultjaik tulajdonát képezik.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Panasz és vitarendezés</h2>
              <p>
                A weboldallal vagy a szolgáltatással kapcsolatos kérdését, észrevételét vagy
                panaszát a fenti e-mail-címen, telefonszámon vagy a székhelyre küldött levélben
                jelezheti. Az írásbeli panaszt főszabály szerint a beérkezését követő 30 napon
                belül írásban, érdemben és igazolható módon megválaszoljuk. Elutasítás esetén
                tájékoztatást adunk az ügyben eljárni jogosult hatóságról vagy békéltető
                testületről. Az írásbeli panaszt és az arra adott válasz másolatát a
                fogyasztóvédelmi törvény szerinti 3 évig megőrizzük.
              </p>
              <p className="mt-4">
                Fogyasztói jogvita bíróságon kívüli rendezésére a fogyasztó lakóhelye vagy
                tartózkodási helye szerint illetékes békéltető testülethez fordulhat. Budapesti
                illetékesség esetén: <strong>Budapesti Békéltető Testület</strong>, 1016 Budapest,
                Krisztina krt. 99. III. em. 310.; levelezési cím: 1253 Budapest, Pf. 10.;
                telefon: +36 1 488 2131; e-mail:{" "}
                <a href="mailto:bekelteto.testulet@bkik.hu">bekelteto.testulet@bkik.hu</a>;{" "}
                <a href="https://bekeltet.bkik.hu/" target="_blank" rel="noopener noreferrer">
                  bekeltet.bkik.hu
                </a>.
              </p>
              <p className="mt-4">
                Fogyasztóvédelmi hatósági ügyben a fogyasztó a lakóhelye szerint illetékes
                kormányhivatalhoz fordulhat. Budapesti illetékesség esetén:{" "}
                <strong>Budapest Főváros Kormányhivatala, Fogyasztóvédelmi Főosztály</strong>,
                1117 Budapest, Prielle Kornélia utca 4/b.; telefon: +36 1 450 2598; e-mail:{" "}
                <a href="mailto:fogyasztovedelem@bfkh.gov.hu">fogyasztovedelem@bfkh.gov.hu</a>;{" "}
                <a
                  href="https://kormanyhivatalok.hu/kormanyhivatalok/budapest/megye/szervezet/fogyasztovedelmi-foosztaly"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hivatalos elérhetőség
                </a>.
              </p>
              <p className="mt-4">
                A gyártói vagy importőri kiterjesztett garancia nem korlátozza a fogyasztót
                megillető, jogszabályon alapuló kellékszavatossági, termékszavatossági és
                kötelező jótállási jogokat.
              </p>
              <p className="mt-4">
                A személyes adatok kezeléséről az{" "}
                <Link to="/adatvedelem">adatkezelési tájékoztató</Link> ad részletes információt.
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-background/50 text-sm">
            © 2026 Northwind Hűtéstechnika Kft. Minden jog fenntartva.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Impressum;
