import { create } from "zustand/react";

// Identisch mit dem TimezoneContext
type TimezoneState = {
  timezone: string;
  setTimezone(newTimezone: string): void;
};

//                TypeScript! -------v
export const useTimezoneStore = create<TimezoneState>()((set) => ({
  timezone: "Europe/Berlin",
  setTimezone(newTimezone: string) {
    set({ timezone: newTimezone });
  },
}));
