import { Box, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import OrderButtonBar from "../../components/OrderButtonBar.tsx";
import ReservationTable from "../../components/ReservationTable.tsx";
import { getReservationListOptions } from "../../queries.ts";
import { OrderBy } from "../../types.ts";

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

        <OrderButtonBar />
      </Box>
      <ReservationsLoader />;
    </>
  );
}

function ReservationsLoader() {
  const [searchParams] = useSearchParams({ orderBy: "start" });
  const orderBy = searchParams.get("orderBy") as OrderBy;

  // TanStack Query

  // queryKey: ["reservations", "details", "R-1" ]
  const { data: reservations } = useSuspenseQuery(
    getReservationListOptions(orderBy),
  );

  return <ReservationTable reservations={reservations} />;

  // ...
}
