import { queryOptions } from "@tanstack/react-query";
import ky from "ky";

import { OrderBy, Reservation } from "./types.ts";

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
