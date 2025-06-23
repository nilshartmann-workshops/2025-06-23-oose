import { Box, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

import ReservationTable from "../../components/ReservationTable.tsx";
import { Reservation } from "../../types.ts";

export default function ReservationListRoute() {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h3"} align={"left"}>
          Reservations
        </Typography>
      </Box>

      <ReservationsLoader />
    </>
  );
}

function ReservationsLoader() {
  // TanStack Query

  // queryKey: ["reservations", "details", "R-1" ]
  const { data: reservations } = useSuspenseQuery({
    queryKey: ["reservations", "list"],
    async queryFn() {
      const result = await ky
        .get<Reservation[]>("http://localhost:7200/api/reservations")
        .json();
      return result;
    },
  });

  return <ReservationTable reservations={reservations} />;

  // ...
}
