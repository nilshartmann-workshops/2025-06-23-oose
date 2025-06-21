# Abfangen (Mocken) von Netzwerk-Requests

# Dateien

- src/components/ReservationDetailCard.test.tsx (anlegen)

# Aufgabe

* Schreibe einen Testfall für die ReservationDetailCard, in dem du prüfst, dass die Änderung des Reservation-Status funktioniert

# Schritte

1. Beende das Backend, damit du nicht aus Versehen API-Calls gegen das echte Backend machst.
2. Lege die Datei `src/components/ReservationDetailCard.test.tsx` an
    - Du findest dazu unten ein Gerüst, das du verwenden kannst
3. Du musst die
   `ReservationDetailLoader`-Komponente im Test rendern, da die dafür zuständig ist, die Daten zu laden und in den Query-Cache zu packen
4. Du musst zwei Netzwerk-Handler anlegen:
    1. `GET` auf `api/reservervations/1`
        - Dieser Endpunkt muss eine Reservation zurückliefern (Du kannst dir eine gültige Rerservation mit
          `createDummyReservation()` aus `data.ts` anlegen)
    2. `PUT` auf `api/reservervations/1/status`
        - Dieser muss einen Body zurückliefern: `{ status: "NEUER STATUS" }`
            - Erlaubte Status sind in `ReservationStatus` definiert
            - Kannst du den Status aus dem `request` verwenden und zurückliefern? So würde es der echte Server machen.
5. Klicke im Test auf einen der Button in `ReservationDetailCard`, um den Status der Reservation zu ändern
6. Stelle sicher, dass der neue Status angezeigt wird
    - Der aktuelle Status der Reservation wird in der Komponente angezeigt, d.h. du müsstest den Status als String (z.B.
      `Confirmed`) in der Komponente finden
    - **Achtung:  asynchroner Code!**
        - Sowohl das Lesen der Reservation als auch das Speichern erfolgen _asynchron_
        - Du kannst also nicht einfach mit
          `getBy`-Query-Funktionen nach dem Elementen suchen, da diese erst nach Abschluss der asynchronen Operationen sichtbar sind
        - Verwende stattdessen `findBy` oder `waitFor` und `getBy`

# Material

- MSW: https://mswjs.io/
    - Intercepting Requests: https://mswjs.io/docs/http/intercepting-requests/
- React Testing Library:
    - `findBy` und `waitFor`: https://testing-library.com/docs/guide-disappearance

# Gerüst für die Testdatei ReservationDetailCard.test.tsx

```tsx
import "../setup-dayjs.ts";

import {QueryClientProvider} from "@tanstack/react-query";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {setupServer} from "msw/node";
import {afterAll, afterEach, beforeAll, test} from "vitest";

import {createQueryClient} from "../create-query-client.tsx";
import {ReservationDetailLoader} from "../routes/reservation/ReservationRoute.tsx";

const server =
	setupServer(
		// todo: Handler für GET und PUT einfügen
	);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("ReservationDetailCard", async () => {
	const user = userEvent.setup();
	// oft sinnvoll, lieber einen Test-spezifischen QueryProvider,
	//   z.B. ohne Retry, zu konfigurieren
	const queryClient = createQueryClient();
	render(
		<QueryClientProvider client={queryClient}>
			<ReservationDetailLoader reservationId={"1"}/>
		< /QueryClientProvider>,
	);

	// todo:
	//   Tests implementieren:
	//    - wird der erwartete initiale Reservation-Status angezeigt?
	//    - Auf den Button zum Setzen eines Status klicken
	//    - wird der neue initiale Reservation-Status angezeigt?
});

```
