import { Wind, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const PrivacyPolicy = () => {
  useScrollToHash();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Adatkezelési tájékoztató | Northwind Hűtéstechnika Kft."
        description="Tájékoztatás a Northwind Hűtéstechnika Kft. weboldalán végzett adatkezelésről, a technikai sütikről és az érintettek jogairól."
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
      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Adatkezelési tájékoztató
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Hatályos: 2026. augusztus 14-től. Verzió: 2.6. A tájékoztató a weboldal
              jelenlegi működését és a hozzá kapcsolódó adatkezeléseket ismerteti.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Adatkezelő adatai</h2>
              <ul className="space-y-2 list-none pl-0">
                <li><strong>Teljes cégnév:</strong> Northwind Hűtéstechnika Építőipari és Szolgáltató Korlátolt Felelősségű Társaság</li>
                <li><strong>Rövidített cégnév:</strong> Northwind Hűtéstechnika Kft.</li>
                <li><strong>Székhely és levelezési cím:</strong> 1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó</li>
                <li><strong>Cégjegyzékszám:</strong> 01-09-921672</li>
                <li><strong>Adószám:</strong> 14823330-2-43</li>
                <li><strong>E-mail:</strong> northwind@northwind.hu</li>
                <li><strong>Telefon:</strong> +36 70 409 9760</li>
                <li><strong>Weboldal:</strong> northwind.hu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Milyen adatokat kezelünk a weboldalon?</h2>
              <p>
                Az űrlapadatokat közvetlenül Ön adja meg. A technikai és biztonsági adatok
                a weboldal, a böngésző és az igénybe vett infrastruktúra működése során keletkeznek.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.1 Kapcsolatfelvételi és ajánlatkérő űrlapok</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> név, e-mail cím, telefonszám (opcionális), az üzenet tartalma.</li>
                <li><strong>Csatolt fájl (opcionális):</strong> PDF, JPG/JPEG vagy PNG, legfeljebb 10 MB (fájlnév, méret, fájltípus és a fájl tartalma).</li>
                <li><strong>Technikai kísérő adatok:</strong> a beküldés forrása (melyik űrlap/oldalrész), a beküldés oldalának protokollja, domainje és útvonala (a lekérdezési paraméterek és a # utáni rész nélkül), valamint a beküldés időpontja.</li>
                <li><strong>Cél:</strong> a megkeresés megválaszolása, ajánlatadás, a szolgáltatás (felmérés, telepítés, hibafelvétel, karbantartás) előkészítése.</li>
                <li><strong>Jogalap:</strong> ajánlatkérés, felmérés vagy más, szerződést megelőző kérés esetén a GDPR 6. cikk (1) b) pontja; egyéb általános megkeresés megválaszolásánál az adatkezelő jogos érdeke a GDPR 6. cikk (1) f) pontja alapján.</li>
                <li><strong>Kötelező és opcionális adatok:</strong> a név, az e-mail-cím és az üzenet szükséges a válaszadáshoz; ezek nélkül az űrlap nem küldhető el. A telefonszám és a csatolmány megadása önkéntes.</li>
                <li><strong>Az űrlap jelölőnégyzete:</strong> a tájékoztató megismerésének visszaigazolására szolgál, nem hozzájárulás és nem az adatkezelés jogalapja.</li>
                <li><strong>Marketing:</strong> az űrlapon megadott adatokat nem használjuk hírlevélre vagy közvetlen üzletszerzésre.</li>
              </ul>
              <p className="mt-4">
                Kérjük, csatolmányban ne küldjön egészségügyi, okmány-, bankkártya- vagy más,
                a megkereséshez nem szükséges érzékeny adatot.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.2 Visszaélés- és spamvédelem</h3>
              <p>
                A beküldések visszaélésszerű használatának megelőzése érdekében az alkalmazás
                adatbázisa nem tárolja el az Ön IP-címét eredeti formában. Ehelyett az IP-címből
                titkos kulccsal HMAC-SHA256 kivonatot készít, és ezt az álnevesített technikai
                adatot tárolja. A kivonatot is személyes adatként védjük; az nem jelent
                anonimizálást. Elkülönített bemenettel ugyanígy készül egy tartalomkivonat az
                e-mail-címből és az üzenet szövegéből, kizárólag a duplikált beküldések
                felismerésére. Az eredeti IP-cím ugyanakkor rövid ideig
                szerepelhet a tárhely- és platformszolgáltatók biztonsági hozzáférési naplóiban,
                a következő pontban leírtak szerint.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Kezelt adatok:</strong> titkos kulccsal képzett IP-kivonat, tartalomkivonat.</li>
                <li><strong>Cél:</strong> sebességkorlátozás (15 percen belül legfeljebb 5 beküldés ugyanarról az IP-kivonatról), duplikált beküldések kiszűrése (1 órás időablak).</li>
                <li><strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f)) – a weboldal és a levelezés védelme az automatizált visszaélésekkel szemben.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.3 Technikai hozzáférési és biztonsági naplók</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> IP-cím, időpont, kért URL vagy szolgáltatási végpont, HTTP-válaszkód, böngészőazonosító (user agent), valamint – ha a böngésző elküldi – hivatkozó oldal.</li>
                <li><strong>Cél:</strong> a weboldal és a kapcsolódó API-k kiszolgálása, hibakeresés, rendelkezésre állás, visszaélés- és incidensészlelés.</li>
                <li><strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f)) – az informatikai rendszer biztonságos és üzemszerű működtetése.</li>
                <li><strong>Megőrzés:</strong> a Magyar Hosting hozzáférési naplóinál az éles tárhelycsomagban és szolgáltatói beállításban meghatározott, a biztonsági célhoz szükséges legrövidebb elérhető idő; a Supabase és más infrastruktúra-szolgáltatók saját biztonsági naplóinál az aktuális szolgáltatási csomagban és adatfeldolgozási feltételekben meghatározott, a szolgáltatás biztonságához szükséges idő. A Northwind nem továbbítja ezeket külön, hosszú távú naplóarchívumba. Az aktuális időtartamról az adatkezelő elérhetőségén kérhető tájékoztatás.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.4 Adminisztrációs (belső) hozzáférés</h3>
              <p>
                A weboldalon zárt adminfelület működik (akciók/bannerek és beérkezett megkeresések kezelése). Ehhez a jogosult
                munkatárs e-mail-címmel és jelszóval jelentkezik be, a hitelesítési rendszer a
                bejelentkezéshez tartozó technikai adatokat (felhasználói azonosító, e-mail-cím,
                titkosított jelszó-lenyomat, munkamenet- és időbélyeg-adatok), valamint a
                felhasználóhoz rendelt jogosultsági (szerepkör) adatot kezeli. A kötelező
                kétlépcsős azonosításhoz a hitelesítő alkalmazásos TOTP-faktor azonosítója,
                beállítási és ellenőrzési adatai is a hitelesítési szolgáltatáshoz kerülnek.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Cél:</strong> a tartalomkezelés biztonságos működtetése, jogosulatlan hozzáférés megakadályozása.</li>
                <li><strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f)) – a weboldal tartalmának és az ügyféladatoknak a védelme, a hozzáférések elszámoltathatósága. A munkatárs vagy közreműködő jogviszonyára vonatkozó külön adatkezelés nem e technikai adminfolyamat része.</li>
                <li><strong>Megjegyzés:</strong> az adminfelület nem nyilvános, és nem tesz elérhetővé személyes adatot a weboldal látogatói számára.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.5 Szerződéses és számlázási adatok</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> név, cím, e-mail, telefonszám, számlázási adatok.</li>
                <li><strong>Cél:</strong> szerződés teljesítése, számla kiállítása.</li>
                <li><strong>Jogalap:</strong> szerződés teljesítése, illetve jogi kötelezettség (számviteli előírások).</li>
                <li><strong>Megőrzés:</strong> számviteli bizonylatok esetén 8 év (Sztv. 169. §). Ez az adatkezelés a weboldalon kívül, a cég saját ügyviteli rendszerében történik.</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.6 Fogyasztói panaszok</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kezelt adatok:</strong> a panaszos azonosító és kapcsolattartási adatai, a panasz tartalma, csatolmányai, az ügy kivizsgálásához szükséges adatok és a válasz másolata.</li>
                <li><strong>Cél:</strong> a fogyasztói panasz kivizsgálása, megválaszolása és a jogszabályi megőrzési kötelezettség igazolása.</li>
                <li><strong>Jogalap:</strong> jogi kötelezettség (GDPR 6. cikk (1) c); a fogyasztóvédelemről szóló 1997. évi CLV. törvény 17/A. §).</li>
                <li><strong>Megőrzés:</strong> az írásbeli panasz és az arra adott válasz másolata a válasz megküldésétől számított 3 év. A rendszer a válaszadás 30 napos határidejét is lefedő, a beérkezéstől számított 3 év 31 napos technikai zárolást alkalmaz; az adminisztrátor a beérkezett megkeresést panasszá minősíti, így a rutin törlés a jogi megőrzési idő alatt nem érinti.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Címzettek, adatfeldolgozók és igénybe vett szolgáltatások</h2>
              <p>
                A weboldal működtetéséhez az alábbi szolgáltatókat vesszük igénybe. Amikor a
                szolgáltató a Northwind nevében adatfeldolgozóként jár el, csak dokumentált
                utasítás és a szolgáltatás teljesítéséhez szükséges körben kezelhet adatot.
                Az ettől eltérő, önálló adatkezelői minőséget külön jelezzük.
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>
                  <strong>Supabase Pte. Ltd. (adatbázis, hitelesítés, fájltárolás, szerveroldali függvények):</strong>{" "}
                  az űrlapbeküldések adatai, a csatolt fájlok, az admin bejelentkezési és jogosultsági
                  adatok, valamint az akciókhoz feltöltött képek tárolása és feldolgozása. A kapcsolati
                  űrlap csatolmányai privát tárolóba kerülnek; az akcióképek viszont a weboldal
                  nyilvános tartalmai. Ezekhez személyes, bizalmas vagy harmadik fél jogait sértő
                  fájl nem tölthető fel. A felület időben korlátozott hivatkozást használ, de ez
                  nem minősül hozzáférés-védelmi vagy titkossági garanciának. A szolgáltató
                  platform- és Edge Function naplói az eredeti IP-címet és más kérési metaadatot
                  is tartalmazhatnak a csomag szerinti korlátozott megőrzési időben.{" "}
                  <a href="https://supabase.com/legal/customer-resources/data-processing-addendum" target="_blank" rel="noopener noreferrer">
                    Adatfeldolgozási feltételek
                  </a>.
                </li>
                <li>
                  <strong>Cloudflare, Inc. (Turnstile robotvédelem; részben adatfeldolgozó, részben önálló adatkezelő):</strong> az űrlap beküldése előtt
                  ellenőrzi, hogy a beküldő nem automatizált robot. Ehhez a böngésző technikai
                  adatai és az IP-cím a szolgáltatóhoz kerülnek; az ellenőrző jelzést a szerver
                  a Cloudflare felé validálja. A Cloudflare a weboldal védelméhez szükséges
                  jeleket a Northwind utasítására adatfeldolgozóként, a Turnstile felismerési
                  képességének fejlesztéséhez használt jeleket saját tájékoztatója szerint
                  önálló adatkezelőként kezeli.{" "}
                  <a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noopener noreferrer">
                    Turnstile adatvédelmi tájékoztató
                  </a>
                  {" és "}
                  <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noopener noreferrer">
                    adatfeldolgozási feltételek
                  </a>.
                </li>
                <li>
                  <strong>Plus Five Five, Inc. / Resend (e-mail-küldés):</strong> az űrlapbeküldésről szóló belső értesítő,
                  valamint az Önnek küldött automatikus visszaigazoló e-mail kiküldése. A belső
                  értesítő tartalmazza a megadott nevet, e-mail-címet, telefonszámot, az üzenet
                  szövegét, a beküldés technikai kísérőadatait és a csatolmány metaadatait. Az
                  ügyfél-visszaigazolás kizárólag a címzett e-mail-címét kezeli; a megadott nevet,
                  telefonszámot, az üzenet szövegét és a csatolmány tényét sem idézi vissza. A csatolt fájl tartalma egyik e-mailbe
                  sem kerül be.{" "}
                  <a href="https://resend.com/legal/dpa" target="_blank" rel="noopener noreferrer">
                    Adatfeldolgozási feltételek
                  </a>.
                </li>
                <li>
                  <strong>Lovable Labs Incorporated (fejlesztési és tesztkörnyezet):</strong>{" "}
                  1 Lincoln St, Boston, MA 02111, USA. A nyilvános weboldal éles tárhelye nem a
                  Lovable, de a fejlesztési/tesztváltozat kiszolgálásakor a szolgáltató technikai
                  kapcsolati és naplóadatokat kezelhet. A fejlesztési előnézet admin- és
                  bejelentkezési oldala a northwind.hu címre irányít, az előnézeti űrlapbeküldés
                  pedig alapértelmezetten tiltott; azt csak rövid, felügyelt tesztre lehet engedélyezni.{" "}
                  <a href="https://lovable.dev/data-processing-agreement" target="_blank" rel="noopener noreferrer">
                    Adatfeldolgozási feltételek
                  </a>.
                </li>
                <li>
                  <strong>Websupport Magyarország Kft. – Magyar Hosting márka (web- és e-mail-tárhely):</strong>{" "}
                  1119 Budapest, Fehérvári út 97-99.; a northwind.hu látogatható felületének
                  és a northwind.hu céges postafiókjának kiszolgálása, a szerződéses
                  szolgáltatási csomag szerinti mentése, valamint a szolgáltatáshoz szükséges
                  szerveroldali naplók kezelése. Elérhetőség:
                  info@mhosting.hu, +36 1 700 2323;{" "}
                  <a href="https://www.mhosting.hu/adatkezelesi-tajekoztato/" target="_blank" rel="noopener noreferrer">
                    szolgáltatói adatkezelési tájékoztató
                  </a>.
                </li>
                <li>
                  <strong>Egyéb címzettek:</strong> jogszabályi kötelezettség esetén a hatóságok,
                  illetve a szerződés teljesítéséhez, könyveléshez igénybe vett közreműködők.
                </li>
              </ul>
              <p className="mt-4">
                Az űrlapon megadott személyes adatait a fentieken kívül harmadik félnek nem
                adjuk át, és nem használjuk automatizált döntéshozatalra vagy profilalkotásra.
              </p>
              <p className="mt-4">
                A gyártói, hatósági, közösségi és más külső weboldalakra mutató egyszerű
                hivatkozások csak az Ön kattintása után nyitják meg a céloldalt. A céloldal
                üzemeltetője ilyenkor önálló adatkezelőként kaphatja meg az internetkapcsolathoz
                szükséges technikai adatokat (például az IP-címet és a böngészőazonosítót). A
                Northwind nem ágyazza be e szolgáltatók követőkódját a saját oldalába.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Adattovábbítás az EU/EGT-n kívülre</h2>
              <p>
                Egyes szolgáltatók vagy al-adatfeldolgozóik az EU/EGT területén kívül is
                kezelhetnek adatot. A Supabase adatfeldolgozási kiegészítése az Európai
                Bizottság 2021/914 számú általános szerződési feltételeit (SCC) építi be az
                alkalmazandó adattovábbításokra. A Resend és a Cloudflare szerződéses
                feltételei az EU–USA adatvédelmi keretrendszert alkalmazzák, amikor a címzett
                érvényes részvétele és a továbbítás köre ezt lehetővé teszi, a korlátozott
                továbbításokra pedig SCC-ket írnak elő. A Lovable adatfeldolgozási
                megállapodása az EU-n kívüli továbbításokra az SCC-ket építi be. Az
                al-adatfeldolgozókra és olyan esetre, amikor a megfelelőségi mechanizmus nem
                alkalmazható, a vonatkozó szerződéses garanciák és szükség esetén kiegészítő
                intézkedések irányadók. A garanciákról és azok másolatának elérhetőségéről az
                adatkezelő e-mailben ad további tájékoztatást.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Megőrzési idők</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Űrlapbeküldések, csatolt fájlok és a céges postafiókban lévő értesítési másolatok:</strong> a beérkezéstől számított
                  2 év elteltével törlésre kerülnek a soron következő negyedéves felülvizsgálatkor,
                  így a rendes megőrzés legfeljebb 27 hónap. Ez nem vonatkozik a fogyasztói panaszként besorolt ügyre. Ha a megkeresésből szerződés jön létre vagy jogi
                  igény merül fel, az érintett adatok a szerződéses, számviteli vagy igényérvényesítési
                  szabályok szerinti ideig őrizhetők meg.
                </li>
                <li>
                  <strong>Írásbeli fogyasztói panasz és válasza:</strong> a válasz megküldésétől
                  3 év a fogyasztóvédelmi törvény alapján; a rendszer a beérkezéstől számított
                  3 év 31 napos zárolással fedi le a válaszadási határidőt.
                </li>
                <li>
                  <strong>Visszaélés-védelmi kivonatok (IP- és tartalomkivonat):</strong> a
                  beérkezéstől számított 24 óra elteltével a következő, 15 percenként futó
                  ütemezett törlési ciklus eltávolítja a kivonatokat,
                  miközben maga a megkeresés a fenti megőrzési idő szerint maradhat meg.
                </li>
                <li>
                  <strong>Technikai hozzáférési naplók:</strong> a Magyar Hostingnál az éles
                  tárhelycsomagban és szolgáltatói beállításban meghatározott, a biztonsági
                  célhoz szükséges legrövidebb elérhető idő; a Supabase, Cloudflare és más infrastruktúra-szolgáltatók saját
                  biztonsági naplóinál a mindenkori szolgáltatási csomag és adatfeldolgozási
                  feltételek szerinti, a biztonsági célhoz szükséges idő.
                </li>
                <li>
                  <strong>Resend e-mail-küldési adatok és üzenettartalom:</strong> a szolgáltató
                  dokumentációja szerinti alapbeállításban 30 nap; ettől eltérő vállalati
                  beállítás esetén a tényleges fiókbeállítás az irányadó.
                </li>
                <li>
                  <strong>Lovable fejlesztési környezet naplóadatai:</strong> a szolgáltató
                  nyilvános tájékoztatója szerint legfeljebb 90 nap, jogszabályi kivétellel.
                </li>
                <li>
                  <strong>Adminfiók, szerepkör és MFA-faktor:</strong> a hozzáférési igény
                  fennállásáig, majd a jogosultság és a fiók megszüntetéséig; a szolgáltatói
                  hitelesítési és biztonsági naplók a Supabase aktuális csomagja szerinti ideig.
                </li>
                <li>
                  <strong>Számviteli bizonylatok:</strong> 8 év (jogszabályi kötelezettség).
                </li>
              </ul>
              <p className="mt-4">
                Az adminfelület jelzi a 2 évnél régebbi megkereséseket, és a hozzájuk tartozó
                privát csatolmányokkal együtt törölhetők; az aktív jogi megőrzési zárolás alatt
                álló fogyasztói panaszokat és csatolmányaikat a művelet kihagyja. Az adatkezelő
                a törlésre kijelölt adatokat legalább negyedévente felülvizsgálja és törli,
                ezért a rendes megőrzés felső határa 27 hónap.
              </p>
              <p className="mt-4">
                A törölt adat korlátozott hozzáférésű szolgáltatói biztonsági mentésben annak
                rendes felülírásáig még jelen lehet. A mentés csak katasztrófa-helyreállításra
                használható; visszaállítás esetén a korábban esedékessé vált törléseket ismét végre kell hajtani.
              </p>
            </section>

            <section id="sutik" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Sütik és böngészőoldali tárolás</h2>
              <p>
                A weboldal nem használ marketing- vagy analitikai célú követő sütiket, és nem
                működik rajta hirdetési vagy látogatáselemző követőkód. Emiatt jelenleg nincs
                szükség hozzájárulást kérő sütisávra.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Admin munkamenet (sessionStorage):</strong> az adminfelületre való bejelentkezés
                  után a hitelesítési munkamenet (hozzáférési és megújító token), valamint az
                  automatikus kijelentkeztetéshez szükséges utolsó adminaktivitás időpontja a böngésző
                  munkalaphoz kötött sessionStorage tárolójában marad, hogy a bejelentkezés ne
                  szűnjön meg az oldal újratöltésekor. Ha a böngésző ezt a tárolót letiltja, a
                  munkamenet csak memóriában marad és oldalfrissítéskor megszűnik. Ez a tárolás kizárólag a bejelentkezett
                  munkatársat érinti, 15 perc adminfelületi inaktivitás után automatikusan megszűnik, továbbá kijelentkezéskor, a munkalap bezárásakor, illetve a
                  böngészőadatok törlésekor megszűnik.
                </li>
                <li>
                  <strong>Cloudflare Turnstile:</strong> a robotellenőrzés működéséhez a szolgáltató
                  saját, biztonsági célú technikai tárolást/sütit használhat az űrlapot tartalmazó
                  oldalakon.
                </li>
                <li>
                  <strong>Fejlesztői előnézet tesztjelzője (sessionStorage):</strong> a Lovable
                  előnézeti címen kizárólag a szándékosan megadott <code>?teszt=1</code> kapcsoló
                  esetén kerül a böngésző munkalapjához kötött technikai jelző a tárolóba. A
                  jelző nem tartalmaz nevet vagy űrlapadatot, és a munkalap bezárásakor megszűnik.
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
                <li>A beküldött csatolmányok privát tárolóban vannak; csak jogosult admin kérhet hozzájuk rövid ideig érvényes letöltési hivatkozást.</li>
                <li>Az adatbázisban sorszintű hozzáférés-szabályozás működik: a beküldött üzeneteket csak adminjogosultsággal rendelkező, bejelentkezett felhasználó érheti el.</li>
                <li>A kapcsolati adatbázisban az IP-cím nem eredeti formában, hanem titkos kulccsal képzett, álnevesített kivonatként tárolódik; a szolgáltatói biztonsági naplókra a 2.3. pont vonatkozik.</li>
                <li>Robotvédelem és sebességkorlátozás az űrlapokon.</li>
                <li>Jelszóval, kötelező hitelesítő alkalmazásos második faktorral (MFA/AAL2) és szerepkörrel védett adminhozzáférés.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Az Ön jogai</h2>
              <p>A GDPR-ban meghatározott feltételek fennállása esetén Ön jogosult:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Hozzáférési jog:</strong> tájékoztatást kérhet az Önről kezelt adatokról.</li>
                <li><strong>Helyesbítési jog:</strong> kérheti pontatlan adatainak javítását.</li>
                <li><strong>Törlési jog:</strong> kérheti adatai és a feltöltött fájlok törlését, ha a megőrzésnek nincs elsőbbséget élvező jogalapja vagy kötelező oka.</li>
                <li><strong>Korlátozási jog:</strong> kérheti az adatkezelés korlátozását.</li>
                <li><strong>Adathordozhatóság:</strong> a szerződésen alapuló, automatizáltan kezelt, Ön által megadott adatoknál kérheti azok tagolt, géppel olvasható formátumú átadását.</li>
                <li><strong>Tiltakozási jog:</strong> tiltakozhat a jogos érdeken alapuló adatkezelés ellen.</li>
              </ul>
              <p className="mt-4">
                Kérelmét a lent megadott elérhetőségeken jelezheti. Indokolt személyazonossági
                kétség esetén az azonosításhoz szükséges további adatot kérhetünk. A kérelemre
                indokolatlan késedelem nélkül, főszabály szerint egy hónapon belül válaszolunk;
                összetett vagy több kérelemnél ez további két hónappal meghosszabbítható, amiről
                az első hónapon belül tájékoztatást adunk. A kérelmek teljesítése főszabály szerint
                díjmentes. A jogos érdeken alapuló adatkezelések érdekmérlegeléséről kérésre
                további tájékoztatást adunk.
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
                  Weboldal:{" "}
                  <a href="https://www.naih.hu/" target="_blank" rel="noopener noreferrer">www.naih.hu</a>
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
                <li><strong>Levélcím:</strong> 1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó</li>
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
