# Northwind Flow – API integrációs réteg

Ez a dokumentum leírja, hogyan tud a **Northwind Flow** backend csatlakozni a
weboldal API-rétegéhez (`src/lib/api/`). A jelenlegi kapcsolatfelvételi
működés változatlan; a Flow integráció addig inaktív, amíg a
`VITE_FLOW_API_BASE_URL` nincs beállítva.

## Felépítés

```text
src/lib/api/
  config.ts        Bázis URL, verzió, timeout, retry – mind env-változóból
  errors.ts        ApiError osztály + magyar felhasználói üzenetek
  client.ts        fetch wrapper: timeout, retry, hibanormalizálás
  endpoints.ts     Végpont útvonalak, egyenként env-változóval felülírhatók
  types.ts         TypeScript interfészek (kérés/válasz szerződések)
  modules/
    contact.ts     Jelenlegi működés (Supabase Storage + edge function)
    leads.ts       Új érdeklődő létrehozása
    waitlist.ts    Várólista-kezelés
    customers.ts   Ügyfél létrehozása
    workOrders.ts  Munkalap indítása
    calendar.ts    Szabad időpontok + naptárfoglalás
    status.ts      Státuszlekérdezés
  index.ts         Egységes `api` objektum
```

Használat a frontendről:

```ts
import { api, toUserMessage } from "@/lib/api";

try {
  const lead = await api.leads.create({ name, email, source: "Főoldal" });
} catch (e) {
  toast({ description: toUserMessage(e) });
}
```

## Környezeti változók

| Változó | Alapérték | Leírás |
| --- | --- | --- |
| `VITE_FLOW_API_BASE_URL` | *(üres)* | A Flow backend gyökér URL-je. Üresen a réteg `not_configured` hibát dob. |
| `VITE_FLOW_API_VERSION` | `/api/v1` | Verzió-előtag. |
| `VITE_FLOW_API_CLIENT_KEY` | *(üres)* | Publikus kliens kulcs, `X-Api-Key` fejlécben. Titkos kulcs ide soha nem kerülhet. |
| `VITE_FLOW_API_TIMEOUT_MS` | `15000` | Kérésenkénti időtúllépés. |
| `VITE_FLOW_API_RETRIES` | `2` | Újrapróbálkozások száma. |
| `VITE_FLOW_API_RETRY_DELAY_MS` | `400` | Backoff alapkésleltetés (exponenciális). |
| `VITE_FLOW_EP_*` | lásd `endpoints.ts` | Egy-egy végpont útvonalának felülírása. |

## Elvárt HTTP szerződés

Minden végpont a `${BASE_URL}${VERSION}` prefix alatt él, JSON-t fogad és ad.

Sikeres válasz (a `data` mező kicsomagolásra kerül; sima JSON is elfogadott):

```json
{ "data": { "id": "lead_123", "status": "new" }, "requestId": "req_abc" }
```

Hibás válasz (4xx/5xx):

```json
{ "error": "Hiányzó e-mail cím", "code": "validation_error", "details": { "field": "email" } }
```

Státuszkód-leképezés a kliensben: `400/422 → validation`, `401/403 →
unauthorized`, `429 → rate_limited`, `5xx → http` (újrapróbálható),
hálózati hiba → `network`, timeout → `timeout`.

## Végpontok

| Modul | Metódus | Útvonal | Kérés / Válasz típus |
| --- | --- | --- | --- |
| leads | POST | `/leads` | `CreateLeadInput` → `Lead` |
| leads | GET | `/leads/{id}` | → `Lead` |
| waitlist | POST | `/waitlist` | `WaitlistEntryInput` → `WaitlistEntry` |
| waitlist | GET | `/waitlist/{id}` | → `WaitlistEntry` |
| waitlist | POST | `/waitlist/{id}/cancel` | → `{ id, status }` |
| customers | POST | `/customers` | `CreateCustomerInput` → `Customer` |
| customers | GET | `/customers/{id}` | → `Customer` |
| workOrders | POST | `/work-orders` | `CreateWorkOrderInput` → `WorkOrder` |
| workOrders | GET | `/work-orders/{id}` | → `WorkOrder` |
| calendar | GET | `/calendar/availability?serviceType&from&to&postalCode` | → `AvailabilitySlot[]` |
| calendar | POST | `/calendar/bookings` | `CreateBookingInput` → `Booking` |
| calendar | POST | `/calendar/bookings/{id}/cancel` | → `Booking` |
| status | GET | `/status?resource&id` | → `StatusResult` |

A pontos mezők a `src/lib/api/types.ts` fájlban vannak definiálva – ez a
szerződés forrása a Flow backend számára.

## Csatolmányok

A fájlok továbbra is a privát `contact-attachments` Supabase Storage bucketbe
kerülnek, és a hivatkozás (`AttachmentRef`: `path`, `name`, `size`, `mime`)
utazik az API felé. A Flow backend aláírt URL-lel tudja letölteni őket.

## Követelmények a Flow backend felé

1. **CORS**: engedélyezni kell a weboldal origin-jét (`GET, POST, PATCH`,
   `Content-Type`, `X-Api-Key` fejlécek).
2. **Idempotencia**: a POST végpontok legyenek idempotensek vagy tűrjék az
   ismételt beküldést, mert a kliens hálózati/5xx hiba esetén újrapróbál.
3. **Rate limit**: 429 esetén a kliens automatikusan újrapróbál backoff-fal.
4. **Verziózás**: törésmentes bővítés az `/api/v1` alatt, breaking change
   esetén `/api/v2` és a `VITE_FLOW_API_VERSION` átállítása.
5. **Titkos kulcs**: böngészőbe csak publikus kulcs kerülhet; minden érzékeny
   hitelesítés edge function / szerveroldali proxy mögött maradjon.

## Átállás lépései (később)

1. `VITE_FLOW_API_BASE_URL` beállítása a build környezetben.
2. Flow oldalon a `/api/v1/leads` végpont implementálása a fenti szerződéssel.
3. `src/lib/api/modules/contact.ts` `submit` függvényében a Supabase hívás
   lecserélése `leadsApi.create()`-re – az űrlap komponensek változatlanok
   maradnak.
4. Fokozatos bekapcsolás modulonként (waitlist, customers, work orders,
   calendar, status).