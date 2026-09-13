# Northwind weboldal – GDPR 30. cikk szerinti adatkezelési tevékenységek nyilvántartása

Ez a dokumentum a Northwind Hűtéstechnika Kft. weboldalához kapcsolódó, rendszeres személyesadat-kezelések belső nyilvántartása a GDPR 30. cikk (1) bekezdése alapján. Nem kerül ki a weboldalra. A nyilvántartást a tényleges technikai és üzleti működéssel együtt kell naprakészen tartani.

- Adatkezelő: Northwind Hűtéstechnika Kft.
- Székhely: 1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó
- E-mail: northwind@northwind.hu
- Telefon: +36 70 409 9760
- Nyilvántartás verziója: 1.0 – tervezet
- Elkészítés / felülvizsgálat dátuma: 2026. szeptember 13.
- Jóváhagyó neve és tisztsége: ______________________________
- Jóváhagyás dátuma: ______________________________
- Következő rendes felülvizsgálat: 2027. szeptember 13., illetve korábban minden lényeges adatkezelési vagy technikai változáskor

## 1. Webes kapcsolatfelvétel és ajánlatkérés

- **Érintettek kategóriái:** érdeklődők, ajánlatkérők, leendő vagy meglévő ügyfelek, az ő nevükben kapcsolatot tartó személyek.
- **Személyes adatok kategóriái:** név, e-mail-cím, opcionális telefonszám, üzenet tartalma, opcionális csatolmány és annak metaadatai, a beküldés forrására és időpontjára vonatkozó technikai kísérőadatok.
- **Cél:** megkeresés megválaszolása, felmérés/ajánlat/szolgáltatás előkészítése.
- **Jogalap:** GDPR 6. cikk (1) b) szerződést megelőző lépésnél; egyéb általános megkeresésnél GDPR 6. cikk (1) f) jogos érdek.
- **Címzettek / adatfeldolgozók:** Supabase, Inc.; Plus Five Five, Inc. / Resend; Websupport Magyarország Kft. / Magyar Hosting; jogosult Northwind-adminisztrátorok.
- **Harmadik ország / nemzetközi továbbítás:** az érintett szolgáltatók vagy al-adatfeldolgozóik EU/EGT-n kívüli adatkezelése esetén a szolgáltató aktuális DPA-ja szerinti megfelelőségi határozat, EU–USA Data Privacy Framework – ha alkalmazható – és/vagy az Európai Bizottság 2021/914 szerinti SCC-k, szükség esetén kiegészítő intézkedésekkel. Az aktuális szolgáltatói listát évente és szolgáltatóváltáskor ellenőrizni kell.
- **Megőrzés:** a beérkezéstől számított 2 év után a következő negyedéves törlési ciklusban, legfeljebb 27 hónap; szerződés, jogi igény vagy fogyasztói panasz esetén az adott külön megőrzési szabály szerint.
- **Fő biztonsági intézkedések:** HTTPS/TLS; privát csatolmánytárolás; időben korlátozott letöltési URL; RLS és szerepkör-alapú hozzáférés; admin MFA/AAL2; 15 perces admin-inaktivitási kijelentkeztetés; fájltípus- és méretkorlát; Turnstile; szerveroldali validáció; napló- és titokkezelési korlátozások; lejárt adatok dokumentált törlése.

## 2. Írásbeli fogyasztói panaszok

- **Érintettek kategóriái:** panaszos fogyasztók és képviselőik.
- **Személyes adatok kategóriái:** azonosító és kapcsolattartási adatok, panasz tartalma, csatolmányok, kivizsgálási adatok, válasz és kézbesítéshez szükséges adatok.
- **Cél:** panasz kivizsgálása, megválaszolása, jogszabályi kötelezettség igazolása.
- **Jogalap:** GDPR 6. cikk (1) c); 1997. évi CLV. törvény 17/A. §.
- **Címzettek / adatfeldolgozók:** Supabase, Inc.; Plus Five Five, Inc. / Resend; Websupport Magyarország Kft. / Magyar Hosting; jogosult Northwind-adminisztrátorok; jogszabály alapján hatóság vagy békéltető testület.
- **Harmadik ország / nemzetközi továbbítás:** ugyanazok a szolgáltatói garanciák, mint a webes kapcsolatfelvételnél; a tényleges továbbítási láncot a szolgáltatói DPA-k és al-adatfeldolgozói listák alapján kell dokumentálni.
- **Megőrzés:** az írásbeli panasz és a válasz másolata a válasz megküldésétől 3 év. A webes rendszer a 30 napos válaszadási határidőt lefedő, beérkezéstől számított 3 év 31 napos technikai zárolást alkalmaz.
- **Fő biztonsági intézkedések:** jogi megőrzési zárolás; rutin törlésből való kizárás; korlátozott adminhozzáférés; MFA/AAL2; privát csatolmányok; dokumentált besorolás és feloldási eljárás.

## 3. Spam-, duplikáció- és visszaélés-védelem

- **Érintettek kategóriái:** az űrlap beküldői és az űrlapot technikailag használó látogatók.
- **Személyes adatok kategóriái:** szerveroldali titkos kulccsal képzett IP-HMAC; e-mail- és üzenettartalom alapján képzett, elkülönített tartalomkivonat; Cloudflare Turnstile által kezelt technikai jelek.
- **Cél:** sebességkorlátozás, duplikált beküldések felismerése, robot- és visszaélés-védelem.
- **Jogalap:** GDPR 6. cikk (1) f), az informatikai rendszer biztonságához fűződő jogos érdek.
- **Címzettek / adatfeldolgozók:** Supabase, Inc.; Cloudflare, Inc.
- **Harmadik ország / nemzetközi továbbítás:** a szolgáltatók aktuális DPA-ja és adattovábbítási mechanizmusai szerint.
- **Megőrzés:** az alkalmazásszintű IP- és tartalomkivonat 24 órás időablak után a következő ütemezett törlési ciklusban törlődik; a szolgáltatói biztonsági naplókra az adott szolgáltató aktuális megőrzési szabálya irányadó.
- **Fő biztonsági intézkedések:** az eredeti IP-cím nem kerül alkalmazásszintű adatbázis-mezőbe; HMAC-SHA256 szerveroldali titokkal; elkülönített tartományjelölések; rate limit; Turnstile; rövid megőrzés; marketing- és profilalkotási cél kizárása.

## 4. Technikai hozzáférési és biztonsági naplók

- **Érintettek kategóriái:** weboldallátogatók, űrlapbeküldők, adminisztrátorok.
- **Személyes adatok kategóriái:** IP-cím, időpont, kért URL/végpont, HTTP-válaszkód, user agent, esetleges referrer, biztonsági és hibadiagnosztikai metaadatok.
- **Cél:** szolgáltatás kiszolgálása, hibakeresés, rendelkezésre állás, incidens- és visszaélésészlelés.
- **Jogalap:** GDPR 6. cikk (1) f), rendszerbiztonsági jogos érdek.
- **Címzettek / adatfeldolgozók:** Websupport Magyarország Kft. / Magyar Hosting; Supabase, Inc.; Cloudflare, Inc.; szükség esetén az adott szolgáltató szerződéses al-adatfeldolgozói.
- **Harmadik ország / nemzetközi továbbítás:** az adott szolgáltató aktuális DPA-ja és al-adatfeldolgozói listája szerinti garanciákkal.
- **Megőrzés:** a Magyar Hosting tényleges éles csomagjának hozzáférési naplómegőrzési ideje: **ELLENŐRIZENDŐ ÉS IDE BEÍRANDÓ**. Supabase/Cloudflare és más platformnaplóknál az aktuális csomag és szerződés szerinti, biztonsági célhoz szükséges idő. Külön hosszú távú log drain nincs engedélyezve.
- **Fő biztonsági intézkedések:** hozzáférés csak üzemeltetési/incidenskezelési feladathoz; alkalmazáskód nem naplózhat teljes IP-címet vagy űrlaptartalmat; hozzáférés-védelem; TLS; rendszeres szolgáltatói és megőrzési felülvizsgálat.

## 5. Zárt adminfelület hozzáférés-kezelése

- **Érintettek kategóriái:** jogosult Northwind-munkatársak vagy szerződéses közreműködők.
- **Személyes adatok kategóriái:** e-mail-cím, felhasználói azonosító, jelszó-lenyomat a hitelesítési szolgáltatónál, szerepkör, munkamenet- és időbélyegadatok, TOTP MFA-faktor azonosítója és ellenőrzési adatai.
- **Cél:** adminfelület védelme, jogosultságkezelés, ügyféladatok és nyilvános tartalom jogosulatlan hozzáférésének megakadályozása.
- **Jogalap:** GDPR 6. cikk (1) f) rendszerbiztonsági jogos érdek; a munkaviszony vagy szerződés kezelésének külön jogalapja az érintett jogviszony szerint.
- **Címzettek / adatfeldolgozók:** Supabase, Inc.; kizárólag jogosult Northwind-adminisztrátorok.
- **Harmadik ország / nemzetközi továbbítás:** Supabase aktuális DPA-ja és al-adatfeldolgozói listája szerinti garanciákkal.
- **Megőrzés:** a hozzáférési igény fennállásáig, majd a fiók/jogosultság megszüntetéséig; a szolgáltatói hitelesítési és biztonsági naplók az aktuális csomag szerint.
- **Fő biztonsági intézkedések:** TOTP MFA; adminműveletek csak AAL2 munkamenetből; szerepkör-alapú hozzáférés; sessionStorage-alapú tab-szintű munkamenet; 15 perc inaktivitási kijelentkeztetés; azonnali hozzáférés-visszavonás távozáskor; minimális adminfiókszám.

## 6. Szerződéses, teljesítési és számlázási adatok

- **Érintettek kategóriái:** ügyfelek, megrendelők, számlafizetők, kapcsolattartók.
- **Személyes adatok kategóriái:** név, cím, e-mail, telefonszám, számlázási és teljesítési adatok, szerződéses dokumentumok adatai.
- **Cél:** szerződés teljesítése, kapcsolattartás, számla kiállítása, számviteli kötelezettségek teljesítése.
- **Jogalap:** GDPR 6. cikk (1) b) és c).
- **Címzettek:** a cég ügyviteli/számlázási szolgáltatói, könyvelő, jogszabály szerint hatóságok; a konkrét szolgáltatók nevét a tényleges ügyviteli folyamat szerint külön nyilván kell tartani.
- **Harmadik ország / nemzetközi továbbítás:** csak akkor, ha az adott tényleges ügyviteli vagy számlázási szolgáltató ilyen továbbítást végez; ebben az esetben a jogszerű garanciát dokumentálni kell.
- **Megőrzés:** számviteli bizonylatok a számviteli törvény szerinti 8 év; egyéb szerződéses adatok a konkrét jogi és igényérvényesítési megőrzés szerint.
- **Fő biztonsági intézkedések:** szükséges hozzáférési kör, jogosultságkezelés, megfelelő mentés és törlés, titkosított adatátvitel, szolgáltatói szerződések és hozzáférések rendszeres felülvizsgálata.

## 7. Referencia- és promóciós tartalom kezelése

- **Érintettek kategóriái:** kizárólag akkor releváns, ha közzétett képen/videón azonosítható természetes személy vagy személyhez köthető adat látható.
- **Személyes adatok kategóriái:** képmás, esetleges hang, helyszínre/címre utaló vagy egyéb azonosító képi adat.
- **Cél:** referencia vagy promóciós tartalom közzététele.
- **Jogalap:** az adott tartalom és személy szerint előzetesen dokumentálandó megfelelő jogalap; azonosítható személy képmásánál a szükséges képmásfelhasználási engedélyt is dokumentálni kell.
- **Címzettek:** a nyilvános weboldal látogatói; technikai tárolásnál Supabase, Inc.; webkiszolgálásnál Websupport Magyarország Kft. / Magyar Hosting.
- **Harmadik ország / nemzetközi továbbítás:** az érintett technikai szolgáltatók aktuális DPA-ja szerint.
- **Megőrzés:** a tartalom közzétételéig és a felhasználási jog fennállásáig; visszavont vagy lejárt tartalomnál a szükséges technikai törlési folyamat szerint.
- **Fő biztonsági intézkedések:** EXIF/GPS eltávolítás; arc/rendszám/cím/irat és szükségtelen ügyféladat kitakarása; felhasználási jog/engedély dokumentálása; árva Storage-objektumok dokumentált ellenőrzés utáni törlése.

## 8. Közös technikai és szervezési intézkedések összefoglalása

A fenti adatkezeléseknél – ahol az adott rendszerre alkalmazható – legalább az alábbi intézkedéseket kell fenntartani:

- HTTPS/TLS az adatátvitelhez.
- Minimális jogosultság és szerepkör-alapú hozzáférés.
- Adminisztrátori MFA/AAL2 és dokumentált helyreállítási eljárás.
- Privát ügyfélcsatolmány-tárolás és időben korlátozott letöltési hivatkozás.
- RLS/adatbázis-jogosultsági szabályok és szerveroldali bemenetellenőrzés.
- Turnstile, sebességkorlátozás és duplikációvédelem.
- Jelszavak, API-kulcsok és HMAC-titkok elkülönített, szerveroldali kezelése.
- Megőrzési határidők szerinti dokumentált törlés és jogi zárolás.
- Biztonsági mentések visszaállítása után a korábban esedékes törlések ismételt végrehajtása.
- Adatvédelmi incidensek dokumentálása és szükség esetén 72 órás NAIH-bejelentési folyamat.
- Szolgáltatói DPA-k, al-adatfeldolgozói listák, régiók és naplómegőrzések legalább éves ellenőrzése.

## 9. Még igazolandó tételek a végleges jóváhagyás előtt

1. Az éles Supabase projekt elsődleges régiója, szolgáltatási csomagja, mentési és biztonsági naplómegőrzési beállítása.
2. A Magyar Hosting éles csomagjának pontos hozzáférési naplómegőrzési ideje és annak beállíthatósága.
3. A Lovable tényleges előfizetési szintje és az alkalmazandó DPA/státusz; valódi ügyféladat a Lovable preview környezetben továbbra sem használható.
4. A Resend fiók tényleges megőrzési beállítása, ha az alapértelmezettől eltér.
5. Az ügyviteli/számlázási folyamat konkrét szolgáltatóinak és címzettjeinek naprakész belső listája.
6. A jóváhagyó neve, tisztsége és jóváhagyási dátuma.

A fenti ellenőrzések eredményét dátummal kell rögzíteni. Eltérés esetén a nyilvános adatkezelési tájékoztatót, ezt a nyilvántartást és szükség szerint a jogosérdek-érdekmérlegelési teszteket is frissíteni kell.
