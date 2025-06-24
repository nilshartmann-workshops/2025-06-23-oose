// <--- Achtung v4 benutzen
import { z } from "zod/v4";

// export type TimeRangeTypeScript = {
//   start: string;
//   end: string;
// };

export const IsoDateTime = z.iso.datetime({ offset: true });

export const TimeRange = z.object({
  start: IsoDateTime,
  end: IsoDateTime,
});
// .refine(
//   (obj) => {
//     if (dayjs(obj.start).isAfter(dayjs(obj.end))) {
//       return false;
//     }
//     return true;
//   },
//   {
//     error: "Start-Datum muss VOR dem Ende-Datum liegen",
//     path: ["end"],
//   },
// );

export type TimeRange = z.infer<typeof TimeRange>;
//
// const timeRange = TimeRange.parse({});
// showTimeRange(timeRange);
//
// function showTimeRange(tr: TimeRange) {
//   // ...
// }

// zod
//
// export type Reservation = {
//   id: string;
//   foodTruck: string;
//   customerName: string;
//   timeRange: TimeRange;
//   expectedGuests: number;
//   specialRequests?: string;
//   status: ReservationStatus;
// };
export const ReservationStatus = z.enum(["Requested", "Confirmed", "Rejected"]);
export type ReservationStatus = z.infer<typeof ReservationStatus>;

export const Reservation = z.object({
  id: z.string(),
  foodTruck: z.string(),
  customerName: z.string(),
  timeRange: TimeRange,
  expectedGuests: z.number().min(1),
  specialRequests: z.string().nullish(),
  status: ReservationStatus,
});

export type Reservation = z.infer<typeof Reservation>;

type Ja = "Ja";

function sagJaOderNein(j: "Ja" | "Nein") {}

sagJaOderNein("Nein");

export type OrderBy = "foodTruck" | "status" | "customerName" | "start" | "";
