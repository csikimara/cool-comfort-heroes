# Northwind weboldal – adatvédelmi üzemeltetési rend

Ez a belső ellenőrzőlista a nyilvános adatkezelési tájékoztató gyakorlati betartását segíti.
Nem kerül ki a weboldalra.

A jogos érdekre alapított folyamatok részletes vizsgálata a
`docs/jogoserdek-erdekmerlegeles.md` dokumentumban található. A tervezet csak a
valós technikai beállítások ellenőrzése és az adatkezelő dátummal ellátott
jóváhagyása után tekinthető véglegesnek.

## Felelősség és rendszeres ellenőrzés

- Felelős: a Northwind Hűtéstechnika Kft. ügyvezetője vagy az általa kijelölt adminisztrátor.
- Negyedévente ellenőrizni és törölni kell az adminfelületen a 2 évnél régebbi, jogi megőrzés alatt nem álló megkereséseket. A két ellenőrzés között sem maradhat el úgy ciklus, hogy a rendes megőrzés meghaladja a 27 hónapot.
- A beérkező üzeneteket hetente át kell nézni; a fogyasztói panaszt az adminfelületen haladéktalanul „Fogyasztói panasz” jelöléssel kell ellátni, és a válasz másolatát ugyanahhoz az ügyhöz vagy a céges postafiókban visszakereshetően meg kell őrizni.
- Az első automatizált törlés előtt a korábbi adatbázis- és postafiók-állományt
  kézzel át kell tekinteni, hogy a régi fogyasztói panaszok és válaszmásolataik
  megfelelő besorolást és jogi megőrzési védelmet kapjanak.
- Az aktív panaszbesorolást az adminfelület nem oldhatja fel. Téves besorolás
  korrigálása csak dokumentált indokkal, kijelölt felelős jóváhagyásával és
  szolgáltatási szerepkörből/adatbázis-adminisztrációval történhet.
- A „Lejárt adatok törlése” művelet a megkereséseket és a hozzájuk tartozó privát csatolmányokat együtt törli, de az aktív jogi megőrzési zárolást kihagyja.
- Ugyanekkor a céges postafiókból is törölni kell a 2 évnél régebbi webes megkereséseket és az ezekről készült értesítéseket; a Törölt elemek mappát is üríteni kell a szolgáltató biztonsági mentési rendjének figyelembevételével. A rendes megőrzés itt sem haladhatja meg a 27 hónapot.
- Évente ellenőrizni kell, hogy a weboldal kapott-e új követőkódot, beágyazást, űrlapot vagy adatfeldolgozót.
- A tárhely- és platformnaplók megőrzési beállítását, valamint a szolgáltatási csomag szerinti naplómegőrzést évente és minden csomagváltáskor ellenőrizni kell; külön hosszú távú log drain nem kapcsolható be új adatvédelmi vizsgálat nélkül.
- Munkatárs távozásakor az adminjogosultságát azonnal vissza kell vonni.
- Referencia- vagy akciókép feltöltése előtt törölni kell az EXIF/GPS metaadatot, és ki kell takarni az azonosítható arcot, rendszámot, címet, iratot vagy más ügyféladatot. Azonosítható személy csak dokumentált megfelelő jogalappal és képmásfelhasználási engedéllyel szerepelhet.
- A félbehagyott vagy lecserélt akcióképek árva Storage-objektumait rendszeresen
  fel kell mérni, és csak az adatbázis-hivatkozások dokumentált ellenőrzése után
  szabad törölni.
- Ha az érintett a kéréshez nem szükséges különleges adatot, okmánymásolatot,
  bankkártyaadatot vagy más túlzott adatkört küld, azt nem szabad további
  rendszerbe vagy levelezésbe átmásolni. A hozzáférést azonnal korlátozni kell,
  majd a szükségesség és az esetleges jogi megőrzési ok dokumentált vizsgálata
  után törölni vagy visszafordíthatatlanul kitakarni kell; szükség esetén az
  érintettet biztonságos újraküldésre kell kérni.
- Gyártói fotó, logó, videó vagy ismert személy képmása csak igazolható felhasználási engedéllyel tehető közzé; az engedélyt a tartalom használatáig meg kell őrizni.
- Adminból közzétett akció csak ellenőrzött időtartammal, készlet- és jogosultsági feltételekkel jelenhet meg. Árleszállítás közlése előtt külön ellenőrizni kell a fogyasztói ár feltüntetésére és a korábbi árra vonatkozó mindenkori szabályokat; a szabad szöveges akciómodul önmagában ezt nem kényszeríti ki.
- A webes űrlap nem hoz létre szerződést. A későbbi ajánlat- és szerződéskötési
  folyamatban külön, igazolhatóan át kell adni az adott fogyasztói ügyletre
  vonatkozó szerződéskötés előtti, elállási/felmondási, szavatossági és jótállási
  tájékoztatást; ezt a honlap impresszuma önmagában nem helyettesíti.
- A cégadatokat élesítés előtt friss, hiteles cégkivonattal kell összevetni; a „szakmai tapasztalat 1993 óta” állítás alapjául szolgáló iratot vagy más ellenőrizhető bizonyítékot belsőleg meg kell őrizni.
- A jogosérdek-érdekmérlegelési teszteket évente, valamint minden ott felsorolt változási eseménynél felül kell vizsgálni, és a jóváhagyott példányt meg kell őrizni.

## Adatfeldolgozói dokumentumok

Aktuális példányt vagy elérési hivatkozást kell megőrizni az alábbiakhoz:

- Supabase adatfeldolgozási kiegészítés (DPA) és al-adatfeldolgozói lista.
- Resend adatfeldolgozási kiegészítés és al-adatfeldolgozói lista.
- A Resend fiók tényleges megőrzési beállítását dokumentálni kell; az alapértelmezett szolgáltatói adatmegőrzés jelenleg 30 nap. Az e-mail-tartalom tárolásának kikapcsolása csak akkor állítható a tájékoztatóba, ha azt a fiókban ténylegesen aktiválták.
- Cloudflare adatfeldolgozási kiegészítés és Turnstile adatvédelmi feltételek.
- Lovable Labs Incorporated adatfeldolgozási kiegészítése és al-adatfeldolgozói listája, amíg a fejlesztési/tesztkörnyezet használatban marad.
- Websupport Magyarország Kft. (Magyar Hosting márka) tárhelyszolgáltatási szerződése és adatkezelési/adatfeldolgozási feltételei. Székhely: 1119 Budapest, Fehérvári út 97-99.; cégjegyzékszám: 01-09-381419; adószám: 25138205-2-43; info@mhosting.hu.
- Az adminértesítések címzettjét a kód a `northwind@northwind.hu` céges postafiókra rögzíti. Más cím csak előzetes adatvédelmi vizsgálat, megfelelő szerződéses garancia, a nyilvános tájékoztató frissítése és felülvizsgált kódmódosítás után állítható be.

## Adatkezelési tevékenységek nyilvántartása

| Adatkezelés | Adatok | Cél és jogalap | Címzettek | Megőrzés |
|---|---|---|---|---|
| Webes megkeresés | név, e-mail, opcionális telefon, üzenet, opcionális csatolmány | válasz, felmérés/ajánlat előkészítése; GDPR 6. cikk (1) b), illetve f) | Supabase, Resend, Magyar Hosting e-mail, jogosult admin | 2 év után a következő negyedéves törléskor, legfeljebb 27 hónap; kivéve szerződés/jogi igény |
| Írásbeli fogyasztói panasz | panaszos és elérhetősége, panasz, melléklet, kivizsgálási adatok, válasz | jogi kötelezettség; GDPR 6. cikk (1) c), Fgytv. 17/A. § | Supabase, Resend, Magyar Hosting e-mail, jogosult admin, szükség esetén hatóság/békéltető testület | a válasz másolata a megküldéstől 3 év; technikai zárolás a beérkezéstől 3 év 31 nap |
| Spam- és visszaélés-védelem | sózott IP- és tartalomkivonat, Turnstile technikai adatok | rendszerbiztonság; jogos érdek | Supabase, Cloudflare | kivonatok 24 órás időablakban |
| Adminhozzáférés | e-mail, jogosultság, munkamenetadat | zárt adminfelület működtetése; jogos érdek/szerződés | Supabase | hozzáférés fennállásáig |
| Számlázás és teljesítés | ügyfél- és számlázási adatok | szerződés és jogi kötelezettség | könyvelő, számlázó, hatóság | számviteli bizonylat 8 év |

## Érintetti kérelem kezelése

1. A kérelem beérkezésének dátumát rögzíteni kell.
2. Kétség esetén csak a szükséges mértékben kell ellenőrizni a kérelmező személyazonosságát.
3. Meg kell keresni az érintett adatokat az adminfelületen, a levelezésben és az ügyviteli rendszerben.
4. A hozzáférést, javítást, törlést vagy korlátozást indokolatlan késedelem nélkül, főszabály szerint egy hónapon belül kell teljesíteni vagy megindokolt választ adni.
5. A teljesítés tényét és dátumát belső feljegyzésben kell rögzíteni, magát a törölt személyes adatot nem szabad újramásolni a feljegyzésbe.

## Adatvédelmi incidens

1. Az érintett hozzáférést vagy adatvesztést azonnal meg kell állítani, a jelszavakat és kulcsokat szükség esetén cserélni kell.
2. Rögzíteni kell az esemény idejét, az érintett adatok körét, a várható következményt és a megtett intézkedéseket.
3. Értékelni kell az érintettek jogaira jelentett kockázatot.
4. Bejelentésköteles incidensnél a NAIH értesítési határideje főszabály szerint 72 óra a tudomásszerzéstől; magas kockázatnál az érintetteket is tájékoztatni kell.

## Változtatási szabály

- Google Analytics, Meta Pixel, hirdetési remarketing vagy más nem szükséges követő csak előzetes hozzájárulás-kezelés és a tájékoztató frissítése után kapcsolható be.
- Külső térkép, videó vagy közösségi beágyazás előtt ellenőrizni kell, hogy betöltéskor továbbít-e személyes vagy technikai adatot.
- Új űrlapmező csak akkor vehető fel, ha valóban szükséges, és a cél, jogalap, megőrzés szerepel a tájékoztatóban.
- Az élesítés után próbalevéllel ellenőrizni kell, hogy a kódban rögzített adminértesítés a `northwind@northwind.hu` postafiókba érkezik.
- Az adminfiókokon többtényezős hitelesítést (MFA) kell bekapcsolni; az
  alkalmazás és az adatbázis-szabályok csak AAL2-szintű munkamenetből engednek
  adminműveletet. A hitelesítő alkalmazás helyreállítási eljárását a weboldaltól
  elkülönítve, biztonságosan kell megőrizni és rendszeresen kipróbálni.
- A Lovable fejlesztési/tesztkörnyezet űrlapbeküldése alapértelmezetten tiltott. Az `ALLOW_LOVABLE_PREVIEW=true` csak rövid, felügyelt tesztre állítható be; ott kizárólag fiktív tesztadat használható, majd a kapcsolót vissza kell állítani és a tesztadatot minden rendszerből törölni kell.
- Biztonsági mentésből történő visszaállítás után újra le kell futtatni a lejárt adatok törlését, és ellenőrizni kell, hogy korábban teljesített érintetti törlésből származó adat nem vált ismét aktívan hozzáférhetővé.
