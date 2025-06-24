import { create } from "zustand/react";

type TimezoneState = {
  // DATEN
  timezone: string;
  counter: number;

  // METHODEN
  setTimezone(newTimezone: string): void;
  setCount(newCount: number): void;
  loadReservations(): void;
};

const timezoneStoreFactory = create<TimezoneState>();
export const useTimezoneStore = timezoneStoreFactory((set) => ({
  timezone: "Europe/Berlin",
  counter: 100,
  setTimezone(newTimezone: string) {
    set({ timezone: newTimezone });
  },
  setCount(newCount: number) {
    set({ counter: newCount });
  },
  async loadReservations() {
    // ky, fetch, ....
  },
}));

//
