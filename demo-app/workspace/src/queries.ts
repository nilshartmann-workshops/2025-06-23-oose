import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import _ky from "ky";

import { NewReservation } from "./data.ts";
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
    // 🕵️‍♂️ das wäre auch eine Möglichkeit, die Liste automatisch zu aktualisieren:
    // refetchInterval: 1000,
    async queryFn() {
      const reservations = await apiKy
        .get(`reservations?orderBy=${orderBy}`)
        .json();
      return Reservation.array().parse(reservations);
    },
  });

export const getReservationByIdOpts = (reservationId: string) =>
  queryOptions({
    // 🤔 warum sieht der Query Key so aus ('detail')?
    queryKey: ["reservations", "detail", reservationId],
    async queryFn() {
      const result = await apiKy.get(`reservations/${reservationId}`).json();
      return Reservation.parse(result);
    },
  });

export const useSetStatusMutation = (reservationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(status: string) {
      const result = await apiKy
        .put(`reservations/${reservationId}/status`, {
          json: { status },
        })
        .json();
      return Reservation.parse(result);
    },
    onSuccess(data: Reservation) {
      // selbst "refetchOnMount" im QueryClient hilft uns hier nicht,
      // weil die Komponente ja nicht neu gemounted wird
      queryClient.setQueryData(
        getReservationByIdOpts(reservationId).queryKey,
        data,
      );

      // ähnliches Problem: wenn die Mutation im Dialog ausgeführt wird,
      // und der Dialog geschlossen wird, wird die TABELLE nicht neu gemounted
      // d.h. der Query wird nicht neu ausgeführt
      // 🤔 wann wird der Query eigentlich neu ausgeführt, wenn die Mutation
      //    von der Detail-Seite aufgerufen wird?
      //    -> nicht unmittelbar: invalidateQueries "markiert" den Query nur!
      //    -> der Query wird es AUSGEFÜHRT, wenn es mind. einen Observer
      //       gibt
      //       -> übrigens NICHT wenn 'refetchOnMount' auf false gesetzt wird
      //       -> dazu müsste man refetchQueryies nehmen
      queryClient.invalidateQueries({
        // 🤔 warum nicht mit orderBy im QueryKey?
        //    -> wir wollen ALLE listen invalidieren
        queryKey: ["reservations", "list"],
      });
    },
  });
};

export const useCreateReservationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(newReservation: NewReservation) {
      const result = await apiKy
        .post(`reservations`, {
          json: newReservation,
          // hooks: {
          //   beforeError: [
          //     (error) => {
          //       console.error(
          //         "Saving reservation failed with error",
          //         error.message,
          //         error,
          //       );
          //       return error;
          //     },
          //   ],
          // },
        })
        .json();
      return Reservation.parse(result);
    },
    onSuccess(data: Reservation) {
      // 🕵️‍♂️ müssen wir das Ding hier in den Cache setzen?
      //    -> kann man diskutieren, in der App eher nicht notwendig
      queryClient.setQueryData(getReservationByIdOpts(data.id).queryKey, data);
      queryClient.invalidateQueries({
        queryKey: ["reservations", "list"],
      });
    },
    onError(error) {
      console.error(
        "Saving reservation failed with error",
        error.message,
        error,
      );
    },
  });
};
