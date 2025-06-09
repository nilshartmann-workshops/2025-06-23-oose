import { z } from "zod/v4"; // <--- Achtung "v4" benutzen!

// export type TimeRange = {
//   start: string;
//   end: string;
// };

export const IsoDateTime = z.iso.datetime({ offset: true });

export const TimeRange = z.object({
  start: IsoDateTime,
  end: IsoDateTime,
});

export type TimeRange = z.infer<typeof TimeRange>;

// export type Reservation = {
//   id: string;
//   foodTruck: string;
//   customerName: string;
//   timeRange: TimeRange;
//   expectedGuests: number;
//   specialRequests?: string;
//   status: ReservationStatus;
// };
//
// export type ReservationStatus = "Requested" | "Confirmed" | "Rejected";

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

// 🤔 sollten wir OrderBy auch als z-Objekt beschreiben?
//    -> vielleicht um die Search Params aus der Browser URL zu validieren?
export type OrderBy = "foodTruck" | "status" | "customerName" | "start" | "";
