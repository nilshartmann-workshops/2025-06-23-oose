import { queryOptions } from "@tanstack/react-query";
import _ky from "ky";

import { OrderBy, Reservation } from "./types.ts";

export const apiKy = _ky.extend({
  // retries im Fehlerfall besser über TanStack Query machen
  // (kann in der QueryClient-Konfiguration angepasst werden)
  retry: 0,

  // 🤔 Welche Möglichkeiten gibt es, diesen Wert z.B. Deployment-abhängig
  //    zu setzen?
  prefixUrl: "http://localhost:7200/api",
});

// Prinzipiell brauchen wir keine FUNKTION (Konstante würde reichen)
//   aber wir erweitern das noch
// ⚠️ Der Weg, wie wir hier Daten laden und mit den Daten umgehen ist stark vereinfacht
//   - keine Fehlerbehandlung
//   - kein Loadingindikator bei lang laufenden Requests
//   - keine Validierung der Daten
//   ✅ was müssen wir machen, wenn wir den Query woanders verwenden wollen?
//   ✅ was passiert, wenn wir die Backend URL anpassen müssen (z.B. je nach Deployment)

export const getReservationListOpts = (orderBy: OrderBy) =>
  queryOptions({
    // 🤔 warum 'list' am Ende?
    // 🤔 was passiert, wenn wir orderBy nicht als Key aufnehmen?
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const reservations = apiKy
        .get<Reservation[]>(`reservations?orderBy=${orderBy}`)
        .json();
      return reservations;
    },
  });

export const getReservationByIdOpts = (reservationId: string) =>
  queryOptions({
    // 🤔 warum sieht der Query Key so aus ('detail')?
    queryKey: ["reservations", "detail", reservationId],
    async queryFn() {
      const result = await apiKy
        .get<Reservation>(`reservations/${reservationId}`)
        .json();
      return result;
    },
  });
