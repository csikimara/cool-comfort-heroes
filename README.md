# Northwind Hűtéstechnika weboldal

A `northwind.hu` Vite + React weboldalának forrása. A nyilvános oldal statikus fájljai a Magyar Hosting tárhelyére kerülnek; a kapcsolatfelvételi űrlapot, az adminfelületet és az adatbázist a Supabase szolgálja ki.

## Helyi fejlesztés

Követelmény: Node.js és a `package.json`-ban rögzített Bun-verzió.

```sh
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev
```

Valós titkos kulcsot tilos `.env`, `.env.local`, forráskód vagy kliensoldali `VITE_*` változó alá tenni. A Supabase `anon`/publishable kulcs kliensoldali használatra való; a `service_role`, Turnstile- és Resend-kulcs kizárólag szerveroldali titok.

## Kötelező ellenőrzés build előtt

```sh
bun run typecheck
bun run lint
bun run test
bun run build
```

A kiadható statikus állományok a `dist/` mappába készülnek. A build létrehozza a statikus útvonalakat és a sitemapet is. A nyilvános oldalak teljes szöveges tartalma és az útvonal-specifikus strukturált adatok már a generált HTML-ben szerepelnek, ezért JavaScript futtatása nélkül is olvashatók a keresők és AI-rendszerek számára.

## Élesítés

Az adatbázis-migrációkat, az Edge Functiont és a statikus weboldalt összehangolt sorrendben kell élesíteni. A pontos lépések: [docs/elesitesi-ellenorzolista.md](docs/elesitesi-ellenorzolista.md).

Különösen fontos: a `20260814210000_atomic_contact_rate_limits.sql` migrációnak az új `send-contact-email` Edge Function előtt kell lefutnia, különben az űrlap nem tudja rögzíteni a megkeresést.

## Adatvédelem

A nyilvános tájékoztatót a `src/pages/PrivacyPolicy.tsx`, a belső eljárást a [docs/adatvedelmi-uzemeltetesi-rend.md](docs/adatvedelmi-uzemeltetesi-rend.md) tartalmazza. Új követőkód, beágyazás, adatfeldolgozó vagy űrlapmező csak adatvédelmi felülvizsgálat után kapcsolható be.
