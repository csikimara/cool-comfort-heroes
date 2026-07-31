import { Wind, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Adatvédelmi Szabályzat | Northwind Hűtéstechnika Kft."
        description="A Northwind Hűtéstechnika Kft. adatvédelmi szabályzata. Tájékoztatás a személyes adatok kezeléséről, cookie-k használatáról és az érintettek jogairól."
      />

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-lg border-b border-border/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                <Wind className="w-7 h-7 text-primary-foreground" />
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

      {/* Content */}
      <main className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Adatvédelmi Szabályzat
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Hatályos: 2026. július 31-től. Ez a tájékoztató a weboldal jelenlegi, tényleges
              műszaki működése alapján készült; jogi megfelelőségi garanciát nem tartalmaz,
              szakmai (jogi) felülvizsgálata javasolt.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Adatkezelő adatai</h2>
              <ul className="space-y-2 list-none pl-0">
                <li><strong>Cégnév:</strong> Northwind Hűtéstechnika Kft.</li>
                <li><strong>Székhely:</strong> 1118 Budapest, Torbágy u. 16.</li>
                <li><strong>E-mail:</strong> northwind@northwind.hu</li>
                <li><strong>Telefon:</strong> +36 70 409 9760</li>
                <li><strong>Weboldal:</strong> northwind.hu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Milyen adatokat kezelünk a weboldalon?</h2>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.1 Kapcsolatfelvételi és ajánlatkérő űrlapok</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> név, e-mail cím, telefonszám (opcionális), az üzenet tartalma.</li>
                <li><strong>Csatolt fájl (opcionális):</strong> PDF, JPG/JPEG vagy PNG, legfeljebb 10 MB (fájlnév, méret, fájltípus és a fájl tartalma).</li>
                <li><strong>Technikai kísérő adatok:</strong> a beküldés forrása (melyik űrlap/oldalrész), a beküldés oldalának címe (page&nbsp;URL), a beküldés időpontja.</li>
                <li><strong>Cél:</strong> a megkeresés megválaszolása, ajánlatadás, a szolgáltatás (felmérés, telepítés, hibafelvétel, karbantartás) előkészítése.</li>
                <li><strong>Jogalap:</strong> az Ön hozzájárulása (GDPR 6. cikk (1) a)); a hozzájárulást az űrlap kötelező jelölőnégyzetével adja meg. Ha a megkeresésből szerződés jön létre, az adatkezelés a szerződés teljesítésén (GDPR 6. cikk (1) b)) alapul.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.2 Visszaélés- és spamvédelem</h3>
              <p>
                A beküldések visszaélésszerű használatának megelőzése érdekében a rendszer nem tárolja
                el az Ön IP-címét eredeti formában. Ehelyett az IP-címből titkos kulccsal (sózással)
                visszafejthetetlen kivonatot (HMAC-SHA256) készít, és ezt tárolja. Ugyanígy készül
                egy tartalomkivonat is az e-mail-címből és az üzenet szövegéből, kizárólag a
                duplikált beküldések felismerésére.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Kezelt adatok:</strong> sózott IP-kivonat, tartalomkivonat.</li>
                <li><strong>Cél:</strong> sebességkorlátozás (15 percen belül legfeljebb 5 beküldés ugyanarról az IP-kivonatról), duplikált beküldések kiszűrése (1 órás időablak).</li>
                <li><strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f)) – a weboldal és a levelezés védelme az automatizált visszaélésekkel szemben.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.3 Adminisztrációs (belső) hozzáférés</h3>
              <p>
                A weboldalon zárt adminfelület működik (akciók/bannerek kezelése). Ehhez a jogosult
                munkatárs e-mail-címmel és jelszóval jelentkezik be, a hitelesítési rendszer a
                bejelentkezéshez tartozó technikai adatokat (felhasználói azonosító, e-mail-cím,
                titkosított jelszó-lenyomat, munkamenet- és időbélyeg-adatok), valamint a
                felhasználóhoz rendelt jogosultsági (szerepkör) adatot kezeli.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Cél:</strong> a tartalomkezelés biztonságos működtetése, jogosulatlan hozzáférés megakadályozása.</li>
                <li><strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f)), illetve munkaviszonnyal/szerződéssel összefüggő adatkezelés.</li>
                <li><strong>Megjegyzés:</strong> az adminfelület nem nyilvános, és nem tesz elérhetővé személyes adatot a weboldal látogatói számára.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.4 Szerződéses és számlázási adatok</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> név, cím, e-mail, telefonszám, számlázási adatok.</li>
                <li><strong>Cél:</strong> szerződés teljesítése, számla kiállítása.</li>
                <li><strong>Jogalap:</strong> szerződés teljesítése, illetve jogi kötelezettség (számviteli előírások).</li>
                <li><strong>Megőrzés:</strong> számviteli bizonylatok esetén 8 év (Sztv. 169. §). Ez az adatkezelés a weboldalon kívül, a cég saját ügyviteli rendszerében történik.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Adatfeldolgozók és igénybe vett szolgáltatások</h2>
              <p>
                Az alábbi szolgáltatásokat a weboldal tényleges működése igazolja. Az egyes
                szolgáltatók pontos adatkezelési feltételeit és adattovábbítási garanciáit a saját
                adatvédelmi dokumentumaik tartalmazzák.
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>
                  <strong>Supabase (adatbázis, hitelesítés, fájltárolás, szerveroldali függvények):</strong>{" "}
                  az űrlapbeküldések adatai, a csatolt fájlok, az admin bejelentkezési és jogosultsági
                  adatok, valamint az akciókhoz feltöltött képek tárolása és feldolgozása. A csatolmányok
                  és az akcióképek nem nyilvános (privát) tárolókba kerülnek.
                </li>
                <li>
                  <strong>Cloudflare (Turnstile robotvédelem):</strong> az űrlap beküldése előtt
                  ellenőrzi, hogy a beküldő nem automatizált robot. Ehhez a böngésző technikai
                  adatai és az IP-cím a szolgáltatóhoz kerülnek; az ellenőrző jelzést a szerver
                  a Cloudflare felé validálja.
                </li>
                <li>
                  <strong>Resend (e-mail-küldés):</strong> az űrlapbeküldésről szóló belső értesítő,
                  valamint az Önnek küldött automatikus visszaigazoló e-mail kiküldése. Az e-mailek
                  tartalmazzák a megadott nevet, e-mail-címet, telefonszámot és az üzenet szövegét.
                </li>
                <li>
                  <strong>cPanel-alapú webtárhely-szolgáltatás (northwind.hu):</strong> a weboldal
                  látogatható felületének (frontend) kiszolgálása, valamint a szolgáltatónál
                  szokásosan képződő szerveroldali naplók.
                </li>
                <li>
                  <strong>Egyéb címzettek:</strong> jogszabályi kötelezettség esetén a hatóságok,
                  illetve a szerződés teljesítéséhez, könyveléshez igénybe vett közreműködők.
                </li>
              </ul>
              <p className="mt-4">
                Személyes adatait ezen kívül harmadik félnek nem adjuk át, és nem használjuk
                automatizált döntéshozatalra vagy profilalkotásra.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Adattovábbítás az EU/EGT-n kívülre</h2>
              <p>
                A fenti szolgáltatók egy része az Egyesült Államokban bejegyzett vállalkozás, ezért
                nem zárható ki, hogy az adatkezelés részben az Európai Unión/EGT-n kívül történik.
                Ezt az egyes szolgáltatások konkrét szerverhelye és a szolgáltatókkal fennálló
                szerződéses feltételek határozzák meg. A jelen weboldal kódja alapján nem
                igazolható, hogy minden adatfeldolgozó kizárólag az EU/EGT területén működne,
                ezért ilyen állítást nem teszünk.
              </p>
              <p className="mt-4">
                Az EU/EGT-n kívüli továbbítás jogi garanciáit (pl. az Európai Bizottság
                általános szerződési feltételei, illetve megfelelőségi határozat alapján történő
                továbbítás) a szolgáltatókkal kötött szerződések és azok adatfeldolgozási
                kiegészítései tartalmazzák. Az adatkezelő kötelezettséget vállal arra, hogy
                a szolgáltatói szerződések és adattovábbítási garanciák pontos tartalmát
                dokumentálja, és ezt a tájékoztatót ennek megfelelően pontosítja.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Megőrzési idők</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Űrlapbeküldések és csatolt fájlok:</strong> célunk a megkereséstől számított
                  legfeljebb 2 éves megőrzés, illetve törlés az Ön kérésére.
                </li>
                <li>
                  <strong>Visszaélés-védelmi kivonatok (IP- és tartalomkivonat):</strong> az űrlapbeküldés
                  rekordjával együtt tárolódnak, így annak törlésével együtt szűnnek meg.
                </li>
                <li>
                  <strong>Admin hitelesítési adatok:</strong> a hozzáférés fennállásáig, a jogosultság
                  visszavonásáig.
                </li>
                <li>
                  <strong>Számviteli bizonylatok:</strong> 8 év (jogszabályi kötelezettség).
                </li>
              </ul>
              <p className="mt-4">
                <strong>Fontos, tényszerű megjegyzés:</strong> a beküldések és a csatolt fájlok
                automatikus (időzített) törlése jelenleg technikailag nincs megvalósítva a
                rendszerben. A megőrzési idő betartása ezért ma kézi törléssel biztosított;
                az automatikus törlés bevezetése nyitott technikai teendő.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Sütik és böngészőoldali tárolás</h2>
              <p>
                A weboldal nem használ marketing- vagy analitikai célú követő sütiket, és nem
                működik rajta hirdetési vagy látogatáselemző követőkód.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Admin munkamenet (localStorage):</strong> az adminfelületre való bejelentkezés
                  után a hitelesítési munkamenet (hozzáférési és megújító token) a böngésző
                  localStorage tárolójában marad, hogy a bejelentkezés ne szűnjön meg az oldal
                  újratöltésekor. Ez a tárolás kizárólag a bejelentkezett munkatársat érinti,
                  és kijelentkezéskor, illetve a böngészőadatok törlésekor megszűnik.
                </li>
                <li>
                  <strong>Cloudflare Turnstile:</strong> a robotellenőrzés működéséhez a szolgáltató
                  saját, biztonsági célú technikai tárolást/sütit használhat az űrlapot tartalmazó
                  oldalakon.
                </li>
                <li>
                  <strong>Szükséges technikai tárolás:</strong> a weboldal megjelenítéséhez, illetve a
                  tárhelyszolgáltató működéséhez kapcsolódó technikai adatok.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Adatbiztonság</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Titkosított (HTTPS/TLS) kapcsolat a weboldal és a szerveroldali szolgáltatások között.</li>
                <li>A beküldött csatolmányok és az akcióképek nem nyilvános tárolóban vannak, közvetlen nyilvános URL-lel nem érhetők el.</li>
                <li>Az adatbázisban sorszintű hozzáférés-szabályozás működik: a beküldött üzeneteket csak adminjogosultsággal rendelkező, bejelentkezett felhasználó érheti el.</li>
                <li>Az IP-cím nem eredeti formában, hanem titkos kulccsal sózott kivonatként tárolódik.</li>
                <li>Robotvédelem és sebességkorlátozás az űrlapokon.</li>
                <li>Jelszóval védett, szerepkörhöz kötött adminhozzáférés.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Az Ön jogai</h2>
              <p>A GDPR alapján Ön jogosult:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Hozzáférési jog:</strong> tájékoztatást kérhet az Önről kezelt adatokról.</li>
                <li><strong>Helyesbítési jog:</strong> kérheti pontatlan adatainak javítását.</li>
                <li><strong>Törlési jog:</strong> kérheti adatai és a feltöltött fájlok törlését.</li>
                <li><strong>Korlátozási jog:</strong> kérheti az adatkezelés korlátozását.</li>
                <li><strong>Adathordozhatóság:</strong> kérheti adatai átadását géppel olvasható formátumban.</li>
                <li><strong>Tiltakozási jog:</strong> tiltakozhat a jogos érdeken alapuló adatkezelés ellen.</li>
                <li>
                  <strong>Hozzájárulás visszavonása:</strong> az űrlapon adott hozzájárulást bármikor,
                  indokolás nélkül visszavonhatja a northwind@northwind.hu címen. A visszavonás a
                  korábbi adatkezelés jogszerűségét nem érinti.
                </li>
              </ul>
              <p className="mt-4">
                Kérelmét a lent megadott elérhetőségeken jelezheti; a megkeresésre a jogszabályi
                határidőn belül válaszolunk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Jogorvoslati lehetőségek</h2>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Panasz a felügyeleti hatósághoz:</strong><br />
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)<br />
                  Cím: 1055 Budapest, Falk Miksa utca 9-11.<br />
                  Postacím: 1363 Budapest, Pf. 9.<br />
                  Telefon: +36 1 391 1400<br />
                  E-mail: ugyfelszolgalat@naih.hu<br />
                  Weboldal: www.naih.hu
                </li>
                <li><strong>Bírósági jogorvoslat:</strong> az Ön lakóhelye vagy tartózkodási helye szerint illetékes törvényszékhez fordulhat.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. A tájékoztató módosítása</h2>
              <p>
                Az adatkezelő fenntartja a jogot jelen tájékoztató módosítására, különösen a
                weboldal működésének vagy az igénybe vett szolgáltatások változása esetén.
                A módosítás a weboldalon való közzétételt követően lép hatályba.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Kapcsolatfelvétel</h2>
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
