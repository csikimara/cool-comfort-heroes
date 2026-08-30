# Northwind – élesítési és visszaellenőrzési lista

Az élesítés három összetartozó részből áll: Supabase-adatbázis, Supabase Edge Function és a Magyar Hosting tárhelyén lévő statikus weboldal. A sorrend kötelező.

## 1. Előkészítés

- Készüljön visszaállítható mentés az éles adatbázisról és a két Storage bucketről (`contact-attachments`, `promo-images`).
- Fusson le hibamentesen: `bun run typecheck`, `bun run lint`, `bun run test`, `bun run build`.
- A kiadás kizárólag a felülvizsgált commitból készüljön; a `dist/` tartalmát ne keverjük korábbi builddel.
- A Vite fejlesztői vagy preview szervert nem szabad éles szolgáltatásként
  futtatni. Alapértelmezetten csak a helyi gépen figyel; hálózati `--host`
  felülbírálás kizárólag rövid, elkülönített teszthez használható.
- Ellenőrizni kell, hogy nincs valós titok a Gitben vagy a `dist/` mappában.
- A `VITE_FLOW_API_BASE_URL` maradjon üres; a jelenlegi Northwind Flow-réteg
  külön adatvédelmi, szerződéses és biztonsági jóváhagyás nélkül nem aktiválható.
- Friss, hiteles cégkivonattal ellenőrizni kell a cégnév, székhely, cégjegyzékszám,
  adószám és képviselet adatait; a „szakmai tapasztalat 1993 óta” állítást
  ellenőrizhető belső dokumentummal kell alátámasztani.
- Jóvá kell hagyni és dátummal/aláírással ellátni a
  `docs/jogoserdek-erdekmerlegeles.md` dokumentumot.
- Le kell tárolni az aktuális adatfeldolgozói feltételeket/DPA-kat és a közzétett
  gyártói, referencia- és személyt ábrázoló képek felhasználási engedélyeit.
- Minden aktív akció címét, időtartamát, feltételeit és esetleges árleszállítási közlését külön fogyasztóvédelmi tartalmi ellenőrzéssel kell jóváhagyni.
- A fogyasztói ajánlat-, megrendelő-, szerződés- és átadás-átvételi mintákat külön
  jogi ellenőrzésnek kell alávetni. Különösen ellenőrizendő a teljes díj és járulékos
  költségek előzetes közlése, az üzlethelyiségen kívül/távollévők között kötött
  szerződések 45/2014. (II. 26.) Korm. rendelet szerinti tájékoztatása és
  nyilatkozatai, az elállási/felmondási jog, a sürgős teljesítés kifejezett kérése,
  továbbá a szavatossági és kötelező jótállási dokumentumok átadása.
- A gyártói/importőri kiterjesztett garancia anyagait el kell választani a
  jogszabályon alapuló fogyasztói jogoktól; az aktuális 151/2003. (IX. 22.)
  Korm. rendelet szerinti jótállási és tájékoztatási folyamatot az értékesítés és
  átadás tényleges módjára kell kialakítani.
- Minden közzétett helyi és távoli médiát ellenőrizni kell EXIF/GPS, arc,
  rendszám, cím, irat és más ügyféladat szempontjából.
- A jogosult munkatársakkal ki kell próbálni a szükségtelen különleges adat,
  okmánymásolat, bankkártyaadat és feltételezett kártevő csatolmány kezelésének
  elkülönített, másolásmentes törlési/incidenskezelési eljárását.
- A már meglévő adatbázis- és postafiók-állományban külön fel kell mérni a
  fogyasztói panaszokat és a hozzájuk tartozó válaszmásolatokat, mielőtt bármely
  tömeges megőrzési/törlési művelet elindul.
- A domain tényleges MX-/postafiók-szolgáltatóját és annak megőrzési, naplózási,
  mentési beállításait a Magyar Hosting ügyfélfiókban vagy szolgáltatói
  visszaigazolással ellenőrizni kell; a felhasználói közlést ez nem helyettesíti.
- A Supabase projekt tényleges elsődleges régióját, csomagját, mentési és
  naplómegőrzési beállításait az éles projektben dokumentálni kell.

## 2. Adatbázis-migrációk

- A még nem alkalmazott `supabase/migrations/*.sql` fájlok időbélyeg szerinti sorrendben fussanak le.
- Külön ellenőrizendő az atomi kapcsolatfelvételi RPC, a 24 órás abuse-hash takarítás, az akcióhivatkozás-korlát és a promóciós bucket méret/MIME korlátja.
- Külön próbával ellenőrizendő a fogyasztóipanasz-jelölő RPC és az, hogy az aktív jogi zárolást a „Lejárt adatok törlése”, valamint a Storage törlési szabálya a csatolmányra is kikényszeríti.
- Anonim próbával igazolni kell, hogy csak aktuálisan aktív akcióhoz tartozó
  `promo-images` objektumhoz készíthető aláírt URL; inaktív, jövőbeli, lejárt és
  árva képhez nem. MFA/AAL2 adminból az előnézetnek továbbra is működnie kell.
- Ellenőrizni kell, hogy a `has_role` függvény más felhasználó UUID-jára bejelentkezett kliensből nem ad szerepkör-információt.
- A `promotions_button_url_safe` korlát kezdetben `NOT VALID`: a régi akciósorokat külön ellenőrizni kell, majd tiszta adatoknál végrehajtani:

```sql
ALTER TABLE public.promotions
VALIDATE CONSTRAINT promotions_button_url_safe;

ALTER TABLE public.promotions
VALIDATE CONSTRAINT promotions_content_valid;

ALTER TABLE public.contact_messages
VALIDATE CONSTRAINT contact_messages_fields_valid;

ALTER TABLE public.contact_messages
VALIDATE CONSTRAINT contact_messages_complaint_hold_consistent;
```

## 2/A. Supabase Auth

- Mivel nincs nyilvános felhasználói funkció, az új felhasználók önkiszolgáló regisztrációja, az anonim bejelentkezés és minden nem használt külső belépési szolgáltató legyen kikapcsolva.
- A Site URL kizárólag `https://northwind.hu` legyen; az engedélyezett átirányítási URL-ek közül minden fejlesztői, előnézeti és már nem használt cím kerüljön ki.
- Az admin e-mail-címe legyen ellenőrzött, a projektben elérhető legerősebb észszerű jelszóházirend és bejelentkezési korlátozás legyen beállítva.
- A TOTP MFA legyen engedélyezve. Minden adminfióknál külön kell igazolni, hogy AAL1 munkamenetből az adatbázis és a Storage megtagadja az adminműveleteket, AAL2-ből pedig az engedélyezett műveletek működnek.
- Az adminfiók-helyreállítás legyen dokumentált, két személy által ellenőrizhető eljárás; helyreállítás után a régi MFA-faktort és minden aktív munkamenetet vissza kell vonni.

## 3. Edge Function

- Beállítandó szerveroldali titkok: `TURNSTILE_SECRET_KEY`, `IP_HASH_SALT`, `RESEND_API_KEY`. Az `IP_HASH_SALT` legalább 32 véletlen bájt/karakter legyen, és ne legyen más API-kulcs újrafelhasználva.
- Próbalevéllel ellenőrizni kell, hogy a kódban rögzített adminértesítés kizárólag a `northwind@northwind.hu` céges postafiókba érkezik.
- A `northwind.hu` küldő domaint a Resendben igazolni kell; az SPF- és DKIM-
  rekordok legyenek érvényesek, a DMARC-házirend és jelentésfogadás pedig legyen
  dokumentált. Külön ellenőrizendő a kézbesítés, a visszapattanás és a válaszcím.
- Az `ALLOW_LOCALHOST_CORS` élesben ne legyen `true`.
- Az `ALLOW_LOVABLE_PREVIEW` élesben ne legyen `true`; a Lovable előnézeti űrlap csak felügyelt, fiktív teszt erejéig engedélyezhető.
- Csak az adatbázis-migrációk sikeres lefutása után kerüljön ki a `send-contact-email` új verziója.

## 4. Magyar Hosting

- A friss `dist/` teljes tartalmát kell feltölteni a domain dokumentumgyökerébe, a rejtett `dist/.htaccess` fájllal együtt.
- A korábbi, repón kívüli `/contact.php` űrlapkezelőt az éles tárhelyről fizikailag
  el kell távolítani. A kiadott `.htaccess` tartalék védelemként 410 Gone
  válasszal tiltja; élesben ellenőrizni kell, hogy a fájl GET-, HEAD-, OPTIONS-
  és POST-kérésre sem futtatható. Az új űrlap kizárólag a
  `send-contact-email` Supabase Edge Functiont használhatja.
- A tárhely dokumentumgyökerében teljes fájlleltárt kell készíteni. A statikus
  kiadáshoz nem tartozó PHP-, mentés-, napló-, ideiglenes és konfigurációs
  fájlokat külön felül kell vizsgálni; ismeretlen vagy már nem használt
  futtatható fájl nem maradhat nyilvánosan elérhető. A régi `contact.php`
  által esetleg használt jelszót vagy API-/SMTP-kulcsot vissza kell vonni és
  cserélni, a szükségtelenül fennmaradt feltöltéseket és naplókat pedig a jogi
  megőrzések ellenőrzése után törölni kell.
- A repón kívüli galéria-`index.php` fájlok forrását külön biztonsági
  felülvizsgálatnak kell alávetni: csak GET/OPTIONS, rögzített könyvtár,
  engedélyezett kép- és videókiterjesztések, útvonalbejárás tiltása, darabszám-
  és válaszméretkorlát, JSON-hibatűrés, valamint könyvtárlistázás tiltása
  szükséges. A kliensoldali 512 KB/500 elem korlát nem helyettesíti ezt.
- Az előző kiadás másolatát a tárhelyen kívül, hozzáférés-védetten kell megőrizni a gyors visszaállításhoz.
- HTTPS legyen kötelező; az első ellenőrzéskor meg kell nézni, hogy a tárhely valóban kiadja-e a `.htaccess` biztonsági fejléceit.
- A Magyar Hostingtól írásban be kell kérni az éles tárhelycsomag hozzáférési naplóinak pontos megőrzési idejét és a beállíthatóságát. A biztonsági célhoz szükséges legrövidebb elérhető időt kell választani, az eredményt dokumentálni, és a nyilvános adatkezelési tájékoztatót szükség esetén a tényleges időtartamhoz kell igazítani.

## 5. Éles füstpróba

- Kezdőlap, szolgáltatási oldalak, Fujitsu/Fisher oldalak, referenciák, impresszum, adatvédelem, 404 és mobilmenü.
- Egy fiktív tesztmegkeresés csatolmány nélkül és egy engedélyezett tesztcsatolmánnyal.
- Ellenőrizni kell: Turnstile, adatbázisrekord, céges értesítés, ügyfél-visszaigazolás, adminlista és csatolmány-letöltés.
- A `contact-attachments` bucketben az adatbázisrekordhoz nem kapcsolódó, korábbi anonim feltöltésből származó árva objektumokat fel kell mérni, majd dokumentált ellenőrzés után törölni; az új anonim feltöltési RLS-próbának sikertelennek kell lennie.
- A `promo-images` bucket adatbázisrekordhoz nem kapcsolódó, lecserélt vagy
  félbehagyott feltöltéseit is fel kell mérni; csak dokumentált keresztellenőrzés
  után törölhetők.
- A tesztadatot azonnal törölni kell az adminfelületről, a Storage-ból és a céges postafiókból.
- Hibás fájltípus, 10 MB feletti fájl, ismételt beküldés és tiltott origin próbája legyen visszautasítva.
- Az adminfiókon MFA, minimális számú adminjog és működő kijelentkezés legyen ellenőrizve.
- Ellenőrizni kell, hogy az adminoldal 15 perc felhasználói inaktivitás után kijelentkeztet, beleértve azt is, amikor a böngészőfül közben háttérben volt.
- Az adminoldal ne legyen élesíthető addig, amíg a TOTP-beállítás és belépés
  kipróbálása, valamint az AAL1 munkamenet adatbázis- és Storage-szintű
  visszautasítása meg nem történt.
- Ellenőrizni kell, hogy az admin munkamenet csak `sessionStorage` tárolóban jelenik meg, és a régi `localStorage` token eltűnik.
- A Resend fiók megőrzését (alapértelmezetten 30 nap) és a Lovable fiók/előnézet naplómegőrzését össze kell vetni a 2.6-os adatkezelési tájékoztatóval.

## 6. Külső ellenőrzés

- Böngészőben ellenőrizendő a CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` és `Permissions-Policy` válaszfejléc.
- A forráskódban és a hálózati panelen ne jelenjen meg Google Analytics, Meta Pixel vagy más nem jóváhagyott követő.
- A `http://northwind.hu/` és minden `www` kérés egyetlen 301-es lépésben a
  megfelelő `https://northwind.hu/...` URL-re irányítson; a `/contact.php`
  közvetlenül se HTTP-n, se HTTPS-en ne legyen futtatható.
- A `robots.txt` és `sitemap.xml` legyen elérhető; az `/admin` és `/auth` ne kerüljön indexbe.
- Egy nem létező URL valódi HTTP 404 státuszt adjon, ne 200-as „soft 404”
  választ; a saját 404-oldal tartalma és `noindex` jelzése ettől még jelenjen meg.
- Az élesítést követő 24 órában ellenőrizni kell a Supabase Edge Function és Auth naplóit, de személyes adatot vagy teljes IP-címet naplózni tilos.
- A kiadás előtt és minden függőségfrissítéskor hiteles csomag-adatbázissal
  sérülékenységi ellenőrzést kell futtatni; súlyos vagy kritikus, ténylegesen
  érintő találat mellett az oldal nem élesíthető.
- Mobil és asztali böngészőben kézi billentyűzet-, fókusz-, kontraszt-, nagyítás-
  és űrlaphiba-ellenőrzést kell végezni.
- A feltöltött PDF- és képcsatolmányokhoz élesben kártevő-ellenőrzést vagy
  igazoltan elkülönített, biztonságos feldolgozási eljárást kell biztosítani;
  a fájlkiterjesztés, MIME-típus és fájlfejléc ellenőrzése önmagában nem
  kártevővizsgálat.

## 7. Visszaállítási feltétel

Azonnali visszaállítás szükséges, ha az űrlap adatot veszít, jogosulatlan hozzáférés látszik, a titkok kliensoldalra kerülnek, vagy a jogi oldalak/HTTPS nem érhetők el. Az adatbázis-migrációt csak bizonyítottan biztonságos, adatvesztésmentes eljárással szabad visszafordítani.
