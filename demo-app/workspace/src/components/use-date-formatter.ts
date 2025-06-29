import dayjs from "dayjs";

import type { TimeRange } from "../types.ts";

export function useDateFormatter() {
  // todo: unten wird die Zeitzone "Europe/Berlin" verwendet
  //  -> lies hier die "global" eingestellte Zeitzone des Benutzers
  //     und gib sie unten an, so dass die Zeit-Informationen
  //     beim Aktualisieren der Zeitzone entsprechend von dayjs
  //     neu berechnet und angezeigt werden

  return {
    shortTimeRange(range: TimeRange) {
      return `${dayjs(range.start)
        .tz("Europe/Berlin")
        .format(
          "DD.MM., HH:mm",
        )} - ${dayjs(range.end).format("DD.MM., HH:mm")}`;
    },

    longDateTime(dateTime: string) {
      return `${dayjs(dateTime)
        .tz("Europe/Berlin")
        .format("DD. MMMM YYYY, HH:mm")}`;
    },
  };
}
