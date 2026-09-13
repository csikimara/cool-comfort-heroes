# GDPR felülvizsgálat – 2026. szeptember 13.

Ez a belső feljegyzés a Northwind weboldal 2026. szeptember 13-i adatvédelmi felülvizsgálatának eredménye. Nem kerül ki a nyilvános weboldalra.

## Ellenőrzött és megfelelőnek talált elemek

- A kapcsolatfelvételi űrlap jelölőnégyzete a tájékoztató megismerését igazolja, nem hozzájárulást kér olyan adatkezeléshez, amelynek jogalapja szerződést megelőző lépés vagy jogos érdek.
- A nyilvános tájékoztató külön kezeli a szerződést megelőző kapcsolatfelvételt, az általános megkeresést, a spam- és visszaélés-védelmet, a technikai naplózást, az adminhozzáférést, a fogyasztói panaszokat és a számlázási adatokat.
- Az írásbeli fogyasztói panasz és válasz másolatának 3 éves megőrzése megfelel a fogyasztóvédelmi törvény szerinti kötelezettségnek; a 3 év 31 napos technikai zárolás a 30 napos válaszadási idő lefedésére szolgál.
- A Resend alapértelmezett e-mail-adatmegőrzése a dokumentációban 30 napként szerepel; ettől eltérő vállalati beállítást csak tényleges fiókbeállítás alapján szabad közölni.
- A weboldal jelenlegi dokumentált állapotában nincs Google Analytics, Meta Pixel vagy más nem szükséges marketing/analitikai követő, ezért hozzájárulást kérő sütisáv nem szükséges.
- A Cloudflare Turnstile használata és adatkezelési szerepköre a tájékoztatóban elkülönítetten szerepel.
- A nyilvános oldal nem használ automatizált döntéshozatalt vagy profilalkotást a beküldött ügyféladatokra.

## Javítandó nyilvános tájékoztató

### 1. Supabase jogi személy neve

A jelenlegi nyilvános tájékoztató `Supabase Pte. Ltd.`-et nevez meg adatfeldolgozóként. A 2026-ban elérhető Supabase Data Processing Addendum szerződő adatfeldolgozóként `Supabase, Inc.`-et azonosítja; a Supabase Pte. Ltd. az al-adatfeldolgozói körben jelenhet meg.

**Teendő:** a `src/pages/PrivacyPolicy.tsx` adatfeldolgozói felsorolásában a fő szolgáltató nevét `Supabase, Inc.`-re kell módosítani, és az ehhez kötött regressziós tesztet is frissíteni kell.

### 2. Lovable naplómegőrzés

A jelenlegi tájékoztató a Lovable fejlesztési környezet naplóadataira fix „legfeljebb 90 nap” időtartamot ír. A 2026. szeptember 9-től hatályos Lovable adatvédelmi tájékoztató nem ad minden ilyen naplóra általános, fix 90 napos időt, hanem célhoz kötött megőrzést alkalmaz.

**Teendő:** a fix 90 napos állítást el kell távolítani, és helyette a tényleges szolgáltatói tájékoztató/csomag szerinti, célhoz szükséges megőrzésre kell hivatkozni. Valódi ügyféladat Lovable preview környezetben továbbra sem használható.

### 3. Nyilvános tájékoztató verziója

Mivel a fenti két módosítás a nyilvános adatkezelési tájékoztató tartalmi frissítése, a jelenlegi `Verzió: 2.6` verziószámot emelni kell, és a hatálybalépés dátumát a tényleges élesítés dátumára kell állítani.

## Belső dokumentáció

A GDPR 30. cikk szerinti teljesebb adatkezelési tevékenység-nyilvántartás külön fájlban elkészült:

`docs/adatkezelesi-tevekenysegek-nyilvantartasa.md`

A dokumentum már tartalmazza:

- az érintettek kategóriáit,
- a személyes adatok kategóriáit,
- a célokat és jogalapokat,
- a címzetteket/adatfeldolgozókat,
- az EU/EGT-n kívüli továbbítás és garanciák dokumentálását,
- a törlési/megőrzési határidőket,
- a fő technikai és szervezési biztonsági intézkedéseket.

## Még igazolandó, fiók- vagy szolgáltatói hozzáférést igénylő tételek

1. Supabase: az éles projekt elsődleges régiója, csomagja, mentési és naplómegőrzési beállítása.
2. Magyar Hosting: az éles tárhelycsomag hozzáférési naplóinak pontos megőrzési ideje és beállíthatósága.
3. Lovable: a tényleges előfizetési szint és az arra alkalmazandó DPA/státusz.
4. Resend: a tényleges retention beállítás, ha az alapértelmezettől eltér.
5. Jogosérdek-érdekmérlegelési teszt: jóváhagyó neve/tisztsége, jóváhagyási dátum és következő felülvizsgálat kitöltése.
6. GDPR 30. cikk szerinti nyilvántartás: jóváhagyó neve/tisztsége és jóváhagyási dátum kitöltése.

## Biztonsági szabály a módosítások élesítéséhez

A nyilvános privacy-oldal változtatásait csak a kapcsolódó regressziós tesztekkel együtt szabad a `main` ágba egyesíteni. Az éles weboldalra csak sikeres typecheck, lint, teszt és build után kerüljön ki új build.
