import { Wind, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-lg border-b border-border/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                <Wind className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground leading-tight">Northwind</h1>
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

      {/* Content */}
      <main className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Adatvédelmi Szabályzat
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Hatályos: 2024. január 1-től
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Adatkezelő adatai</h2>
              <ul className="space-y-2 list-none pl-0">
                <li><strong>Cégnév:</strong> Northwind Hűtéstechnika Kft.</li>
                <li><strong>Székhely:</strong> 1118 Budapest, Torbágy u. 16.</li>
                <li><strong>E-mail:</strong> northwind@northwind.hu</li>
                <li><strong>Telefon:</strong> +36 70 409 9760</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Az adatkezelés jogalapja</h2>
              <p>
                Az adatkezelés az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR), 
                valamint az információs önrendelkezési jogról és az információszabadságról szóló 
                2011. évi CXII. törvény (Infotv.) rendelkezései alapján történik.
              </p>
              <p className="mt-4">Az adatkezelés jogalapjai:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont)</li>
                <li>Szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont)</li>
                <li>Jogi kötelezettség teljesítése (GDPR 6. cikk (1) bekezdés c) pont)</li>
                <li>Jogos érdek érvényesítése (GDPR 6. cikk (1) bekezdés f) pont)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Kezelt adatok köre és célja</h2>
              
              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.1 Kapcsolatfelvételi űrlap</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> név, e-mail cím, telefonszám (opcionális), üzenet tartalma</li>
                <li><strong>Cél:</strong> kapcsolatfelvétel, ajánlatkérés megválaszolása</li>
                <li><strong>Megőrzési idő:</strong> a kapcsolatfelvételtől számított 2 év, vagy az érintett törlési kérelméig</li>
                <li><strong>Jogalap:</strong> az érintett hozzájárulása</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.2 Szerződéses adatok</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> név, cím, e-mail, telefonszám, számlázási adatok</li>
                <li><strong>Cél:</strong> szerződés teljesítése, számla kiállítása</li>
                <li><strong>Megőrzési idő:</strong> számviteli bizonylatok esetén 8 év (Sztv. 169. §)</li>
                <li><strong>Jogalap:</strong> szerződés teljesítése, jogi kötelezettség</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Cookie-k (sütik) használata</h2>
              <p>
                Weboldalunk technikai cookie-kat használ a weboldal megfelelő működésének biztosítása 
                érdekében. Ezek a sütik elengedhetetlenek a weboldal alapvető funkcióinak működéséhez.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Technikai cookie-k:</strong> munkamenet azonosítók, beállítások tárolása</li>
                <li><strong>Megőrzési idő:</strong> a munkamenet végéig, vagy legfeljebb 30 nap</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Adattovábbítás</h2>
              <p>
                Személyes adatait harmadik félnek nem adjuk át, kivéve:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Jogszabályi kötelezettség esetén a hatóságok részére</li>
                <li>Szerződés teljesítéséhez szükséges adatfeldolgozóknak (pl. könyvelő, futárszolgálat)</li>
              </ul>
              <p className="mt-4">
                Adatfeldolgozóink az Európai Unió területén belül működnek, megfelelő adatvédelmi 
                garanciákat biztosítanak.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Az érintettek jogai</h2>
              <p>A GDPR alapján Ön jogosult:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Hozzáférési jog:</strong> tájékoztatást kérhet az Önről kezelt adatokról</li>
                <li><strong>Helyesbítési jog:</strong> kérheti pontatlan adatainak javítását</li>
                <li><strong>Törlési jog:</strong> kérheti adatai törlését ("elfeledtetéshez való jog")</li>
                <li><strong>Korlátozási jog:</strong> kérheti az adatkezelés korlátozását</li>
                <li><strong>Adathordozhatóság:</strong> kérheti adatai átadását géppel olvasható formátumban</li>
                <li><strong>Tiltakozási jog:</strong> tiltakozhat az adatkezelés ellen</li>
                <li><strong>Hozzájárulás visszavonása:</strong> bármikor visszavonhatja hozzájárulását</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Jogorvoslati lehetőségek</h2>
              <p>
                Amennyiben úgy érzi, hogy megsértettük személyes adatai védelméhez való jogát, 
                az alábbi lehetőségek állnak rendelkezésére:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Panasz benyújtása a felügyeleti hatósághoz:</strong><br />
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)<br />
                  Cím: 1055 Budapest, Falk Miksa utca 9-11.<br />
                  Telefon: +36 1 391 1400<br />
                  E-mail: ugyfelszolgalat@naih.hu<br />
                  Weboldal: www.naih.hu
                </li>
                <li><strong>Bírósági jogorvoslat:</strong> Az Ön lakóhelye vagy tartózkodási helye szerint illetékes törvényszékhez fordulhat.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Adatbiztonság</h2>
              <p>
                Az adatkezelő megfelelő technikai és szervezési intézkedéseket alkalmaz a személyes 
                adatok védelme érdekében:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>SSL/TLS titkosítás a weboldalon</li>
                <li>Hozzáférés-szabályozás és jelszóvédelem</li>
                <li>Rendszeres biztonsági mentések</li>
                <li>Tűzfal és vírusvédelem alkalmazása</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Szabályzat módosítása</h2>
              <p>
                Az adatkezelő fenntartja a jogot jelen adatvédelmi szabályzat módosítására. 
                A módosításokról a weboldalon tájékoztatjuk az érintetteket. A szabályzat 
                módosítása a közzétételt követően lép hatályba.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Kapcsolatfelvétel</h2>
              <p>
                Adatvédelmi kérdéseivel, kérelmeivel forduljon hozzánk az alábbi elérhetőségeken:
              </p>
              <ul className="space-y-2 mt-4 list-none pl-0">
                <li><strong>E-mail:</strong> northwind@northwind.hu</li>
                <li><strong>Telefon:</strong> +36 70 409 9760</li>
                <li><strong>Levélcím:</strong> 1118 Budapest, Torbágy u. 16.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
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

export default PrivacyPolicy;
