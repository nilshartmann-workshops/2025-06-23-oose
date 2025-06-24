import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ky from "ky";

import { OrderBy, Reservation, ReservationStatus } from "./types.ts";

export function getReservationListOptions(orderBy: OrderBy) {
  return queryOptions({
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const result = await ky
        .get("http://localhost:7200/api/reservations?orderBy=" + orderBy)
        .json();

      const reservations = Reservation.array().parse(result);

      return reservations;
    },
  });
}

export const getReservationByIdOpts = (reservationId: string) =>
  queryOptions({
    // 🤔 warum sieht der Query Key so aus ('detail')?
    queryKey: ["reservations", "detail", reservationId],
    async queryFn() {
      const result = await ky
        .get(`http://localhost:7200/api/reservations/${reservationId}`)
        .json();
      const reservation = Reservation.parse(result);
      return reservation;
    },
  });

export const useSetReservationStatusMutation = (reservationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(status: ReservationStatus) {
      const result = await ky
        .put(`http://localhost:7200/api/reservations/${reservationId}/status`, {
          json: { status: status },
        })
        .json();

      const reservation = Reservation.parse(result);
      return reservation;
    },
    onSuccess(reservation) {
      queryClient.setQueryData(
        // ["reservations", "detail", reservationId],
        getReservationByIdOpts(reservationId).queryKey,
        reservation,
      );
    },
  });
};

//
// type Person = {
//   id: string;
//   lastname: string;
//   age: number;
// };
//
// type NewPerson = Readonly<Partial<Omit<Person, "id">>>
//
// type PatchPerson = {
//   lastname?: string;
//   age?: number;
// };
//
// type PatchPerson2 = Partial<Person>
