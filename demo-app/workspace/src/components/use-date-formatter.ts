import dayjs from "dayjs";

import { useTimezoneStore } from "../timezone-store.ts";
import type { TimeRange } from "../types.ts";

export function useDateFormatter() {
  const timezone = useTimezoneStore((state) => state.timezone);

  return {
    shortTimeRange(range: TimeRange) {
      return `${dayjs(range.start)
        .tz(timezone)
        .format(
          "DD.MM., HH:mm",
        )} - ${dayjs(range.end).format("DD.MM., HH:mm")}`;
    },

    longDateTime(dateTime: string) {
      return `${dayjs(dateTime).tz(timezone).format("DD. MMMM YYYY, HH:mm")}`;
    },
  };
}
