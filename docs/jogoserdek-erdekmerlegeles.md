# Northwind weboldal – jogosérdek-érdekmérlegelési tesztek

Ez a belső dokumentum a Northwind Hűtéstechnika Kft. weboldalán a GDPR 6. cikk
(1) bekezdés f) pontjára alapított adatkezelések előzetes vizsgálata. Nem kerül ki
a weboldalra. A végleges példányt az adatkezelőnek jóvá kell hagynia, dátummal és
felelőssel kell ellátnia, majd minden lényeges technikai vagy üzleti változáskor,
de legalább évente felül kell vizsgálnia.

- Adatkezelő: Northwind Hűtéstechnika Kft.
- Dokumentumverzió: 1.0 – tervezet
- Elkészítés dátuma: 2026. augusztus 14.
- Jóváhagyó neve és tisztsége: ______________________________
- Jóváhagyás dátuma: ______________________________
- Következő rendes felülvizsgálat: ______________________________

## 1. Általános megkeresések megválaszolása

### Cél és érdek

Az olyan kapcsolatfelvétel megválaszolása, amely nem minősül ajánlatkérésnek vagy
más, az érintett kérésére tett szerződést megelőző lépésnek. Az adatkezelő jogos
érdeke, hogy a hozzá intézett szakmai, szolgáltatási vagy szervezési kérdésekre
válaszolni tudjon, az érintett pedig észszerűen számít a válaszra.

### Szükségesség

A név, e-mail-cím és az üzenet kezelése nélkül a megkeresés nem köthető a
feladóhoz és nem válaszolható meg. A telefonszám és a csatolmány opcionális. Az
adatokat nem használjuk fel hírlevélre vagy kéretlen közvetlen üzletszerzésre.
Kevésbé adatintenzív, azonos hatékonyságú megoldás nem áll rendelkezésre.

### Érintetti hatás és garanciák

- Az adatokat maga az érintett adja meg, meghatározott válaszadási célból.
- Az űrlap előre jelzi a kötelező és opcionális adatokat, és elérhetővé teszi az
  adatkezelési tájékoztatót.
- A rendes megőrzés két év után, a következő negyedéves törlési ciklusban véget
  ér, ezért legfeljebb 27 hónap; szerződés, jogi igény vagy fogyasztói panasz
  esetén külön jogalap és megőrzési szabály alkalmazandó.
- A hozzáférés jogosult adminokra korlátozott; a csatolmány privát tárhelyen van,
  időben korlátozott letöltési hivatkozással.
- Az érintett tiltakozhat, kérhet hozzáférést, helyesbítést, törlést vagy
  korlátozást. A tiltakozást egyedileg kell megvizsgálni.

### Mérlegelés és eredmény

Az adatkezelés az érintett által kezdeményezett kommunikáció szűk körére
korlátozódik, az érintett várakozásával összhangban áll, és nem jár profilalkotással
vagy marketingcélú továbbfelhasználással. A felsorolt garanciák mellett az
adatkezelő érdeke nem élvez aránytalan elsőbbséget az érintett jogaival szemben.
Az adatkezelés a jelen formában jogos érdekre alapítható.

## 2. Spam-, duplikáció- és visszaélés-védelem

### Cél és érdek

Az űrlap, a levelezés és a háttérrendszer elérhetőségének, integritásának és
biztonságának védelme automatizált vagy ismétlődő visszaéléssel szemben. Ez az
adatkezelő, a valódi érdeklődők és a rendszer más felhasználóinak közös érdeke.

### Szükségesség

A sebességkorlátozáshoz ugyanazon technikai forrás rövid időn belüli felismerése,
a duplikációvédelemhez ugyanazon beküldés rövid idejű azonosítása szükséges. Az
alkalmazás az eredeti IP-címet nem tárolja az adatbázisban: elkülönített
tartományjelöléssel és titkos szerveroldali kulccsal HMAC-SHA256 kivonatot képez.
Külön tartományjelöléssel készül az e-mail-cím és az üzenet tartalomkivonata. A
kivonatok álnevesített személyes adatok, nem anonim adatok.

### Érintetti hatás és garanciák

- Az IP- és tartalomkivonatok 24 órás időablakban törlődnek.
- A sebességkorlát 15 percen belül legfeljebb öt beküldést enged ugyanazon
  IP-kivonatról; a duplikációs ablak egy óra.
- A titkos HMAC-kulcs csak szerveroldalon található, más célra nem használható.
- A kivonatokból nem készül ügyfélprofil, és marketingcélra nem használhatók.
- A Cloudflare Turnstile technikai ellenőrzést végez; ennek igénybevételét és
  adattovábbítását a nyilvános tájékoztató ismerteti.
- Téves blokkolás esetén az érintett telefonon vagy e-mailben is kapcsolatba
  léphet az adatkezelővel.

### Mérlegelés és eredmény

A rendszerbiztonsági cél valós és szükséges, az alkalmazott adatkör és időtartam
szűk, az eredeti IP-cím adatbázisbeli tárolását pedig álnevesített kivonat váltja
ki. Az érintetti hatás alacsony, alternatív kapcsolatfelvétel rendelkezésre áll.
A jelen garanciákkal az adatkezelés jogos érdekre alapítható.

## 3. Technikai hozzáférési és biztonsági naplók

### Cél és érdek

A weboldal és a kapcsolódó szolgáltatások kiszolgálása, hibakeresése,
rendelkezésre állásának fenntartása, valamint biztonsági események észlelése és
kivizsgálása.

### Szükségesség

A webszerverek és infrastruktúra-szolgáltatók a kérések teljesítéséhez és a
hibák, támadások vizsgálatához korlátozott technikai naplókat képeznek. Ezekben
IP-cím, időpont, kért végpont, válaszkód, böngészőazonosító és esetenként hivatkozó
oldal szerepelhet. A Northwind nem kapcsol külön, hosszú távú naplóarchívumot.

### Érintetti hatás és garanciák

- A Magyar Hosting hozzáférési naplójának pontos megőrzési idejét és
  beállíthatóságát az éles tárhelycsomagra írásban kell ellenőrizni. A biztonsági
  célhoz szükséges legrövidebb elérhető időt kell választani; a valós időtartamot
  dokumentálni, és eltérés esetén a nyilvános tájékoztatót frissíteni kell.
- A Supabase és más szolgáltatók naplómegőrzését az aktuális csomag és szerződés
  szerint kell évente, illetve csomagváltáskor ellenőrizni.
- Naplóhoz csak az üzemeltetéshez vagy incidenskezeléshez szükséges jogosult férhet
  hozzá; teljes IP-cím vagy űrlaptartalom alkalmazásszintű naplóba nem írható.
- A napló nem használható marketingre, látogatói profilalkotásra vagy
  munkavállalói teljesítményfigyelésre.

### Mérlegelés és eredmény

Az online szolgáltatás biztonságos működtetése technikai naplózás nélkül nem
biztosítható észszerűen. A célkorlátozás, a hozzáférés-védelem és a rövid,
ellenőrzött megőrzés mellett az érintettekre gyakorolt hatás arányos. Az
adatkezelés a valós szolgáltatói megőrzések igazolása mellett jogos érdekre
alapítható.

## 4. Zárt adminfelület hozzáférés-kezelése

### Cél és érdek

A nyilvános tartalom, a beérkezett megkeresések és a csatolmányok jogosulatlan
megtekintésének vagy módosításának megakadályozása; az adminisztrátori műveletek
engedélyezése kizárólag a feladatot ellátó személyeknek.

### Szükségesség és garanciák

Az adminisztrátor e-mail-címe, technikai felhasználói azonosítója, hitelesítési
adatai és szerepköre nélkül a hozzáférés nem korlátozható megbízhatóan. A
jelszavakból csak a hitelesítési szolgáltató által képzett lenyomat kezelhető. A
szerepkör lekérdezése csak a saját felhasználóra vagy szolgáltatási szerepkörből
engedélyezett. Az adminfiókok száma minimális, a jogosultságot távozáskor azonnal
vissza kell vonni, a munkamenet böngészőbezárásig tartó `sessionStorage`-ot használ,
és az MFA-t az éles hitelesítési rendszerben ténylegesen kötelezővé kell tenni.

### Mérlegelés és eredmény

Az adatkezelés a biztonsági cél eléréséhez szükséges, kizárólag az erre jogosult
munkatársak vagy szerződéses közreműködők adatait érinti, és a munkakörrel
észszerűen együtt jár. Az érintett munkaviszonyára vagy szerződésére alkalmazandó
jogalapot külön is rögzíteni kell. A felsorolt garanciákkal a rendszerbiztonsági
rész jogos érdekre alapítható.

## 5. Felülvizsgálati események

Az érdekmérlegelést soron kívül újra kell végezni, ha új követőkód, marketingcél,
profilalkotás, új űrlapmező, új címzetti kör, hosszabb megőrzés, új
adatfeldolgozó, külső naplóarchívum, új adminszerepkör vagy jelentős biztonsági
változás kerül bevezetésre, illetve ha érintetti panasz vagy incidens azt indokolja.

## 6. Jóváhagyás

Az adatkezelő a fenti tényállást és garanciákat ellenőrizte, és csak azok tényleges
megvalósulása mellett hagyja jóvá a jogos érdekre alapított adatkezeléseket.

- Jóváhagyó aláírása: ______________________________
- Felülvizsgálatot végző személy: ______________________________
- Megjegyzés / eltérés és intézkedés: ______________________________
