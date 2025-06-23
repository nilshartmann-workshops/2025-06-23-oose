import { queryOptions } from "@tanstack/react-query";
import ky from "ky";

import { OrderBy, Reservation } from "./types.ts";

export function getReservationListOptions(orderBy: OrderBy) {
  return queryOptions({
    queryKey: ["reservations", "list", { orderBy }],
    async queryFn() {
      const result = await ky
        .get<
          Reservation[]
        >("http://localhost:7200/api/reservations?orderBy=" + orderBy)
        .json();
      return result;
    },
  });
}
