import { produce } from "immer";
import { create } from "zustand/react";

import { Reservation, ReservationStatus } from "./types.ts";

type ReservationsState = {
  // DATEN
  reservations: Reservation[];

  // METHODEN
  addReservation(newReservation: Reservation): void;
  setReservationStatus(
    reservationId: string,
    newStatus: ReservationStatus,
  ): void;
};

export const useReservationsStore = create<ReservationsState>()((set, get) => ({
  reservations: [],
  addReservation(newReservation: Reservation) {
    const currentReservations = get().reservations;
    // currentReservations.push(newReservation)

    set({ reservations: [...currentReservations, newReservation] });
  },
  // setReservationStatus(reservationId: string, newStatus: ReservationStatus) {
  //   // const currentReservation = get().reservations.find(
  //   //   (r) => r.id === reservationId,
  //   // );
  //   // if (!currentReservation) {
  //   //   return;
  //   // }
  //   //
  //   // const newReservation = { ...currentReservation, status: newStatus };
  //   const currentReservations = get().reservations;
  //   const newReservations = currentReservations.map((r) =>
  //     r.id === reservationId ?  { ...r, status: newStatus } : r,
  //   );
  //
  //   return { reservations: newReservations };
  // },
  setReservationStatus(reservationId: string, newStatus: ReservationStatus) {
    // immer.js
    const newReservations = produce(get().reservations, (draft) => {
      const currentReservation = draft.find((r) => r.id === reservationId);
      if (!currentReservation) {
        return;
      }
      currentReservation.status = newStatus;
    });

    set({ reservations: newReservations });
  },
}));

//
