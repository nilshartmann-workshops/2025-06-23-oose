import { QueryClient } from "@tanstack/react-query";
import { z } from "zod/v4";

import { getReservationByIdOpts } from "../queries.ts";
import { Reservation, ReservationStatus } from "../types.ts";

const ReservationUpdateEvent = z.object({
  reservationId: z.string(),
  newStatus: ReservationStatus,
});

// Möglichkeit 1: direkt beim Starten der App außerhalb von React
//   -> hier ist der Listener "global" und läuft während die ganze Zeit,
//      während die Anwendung läuft
//   -> Bisschen wie globales Statemanagement
// Möglichkeit 2: als Custom-Hook und dann pro Komponente einbinden
//     (Gefahr: mehr als ein Listener wird gestartet)
//     -> Alternativen: in einem Context starten
// ACHTUNG!
//   -> In dem Client, der das Event (indirekt) ausgelöst hat,
//      könnte der Cache jetzt zweimal aktualisiert werden,
//      weil der ja auf seine eigenen Listener auch hört
//
export default function addReservationUpdateListener(queryClient: QueryClient) {
  const eventSource = new EventSource("http://localhost:7200/api/events");

  eventSource.addEventListener("reservation-status-changed", (event) => {
    const payload = ReservationUpdateEvent.parse(JSON.parse(event.data));
    console.log("New reservation-status-changed event", payload);

    queryClient.setQueryData(
      getReservationByIdOpts(payload.reservationId).queryKey,
      (oldReservation) => {
        // ^--- type safe, den der Typ wird von getReservationQueryOpts abgeleitet!
        if (!oldReservation) {
          return;
        }

        // wenn das hier zu komplex wird => immer verwenden
        return { ...oldReservation, status: payload.newStatus };
      },
    );

    queryClient.setQueriesData(
      {
        queryKey: ["reservations", "list"],
        predicate(query) {
          console.log("QUERY KEY", query);
          // @ts-ignore
          if (query.queryKey[2].orderBy === "status") {
            // Wenn nach Status sortiert ist, muss der Query invalidiert werden
            return false;
          }
          return (
            query.queryKey[0] === "reservations" && query.queryKey[1] === "list"
          );
        },
      },
      (oldData: Reservation[]): Reservation[] | undefined => {
        if (oldData) {
          return oldData.map((o) =>
            o.id === payload.reservationId
              ? { ...o, status: payload.newStatus }
              : o,
          );
        }
      },
    );
  });
}
