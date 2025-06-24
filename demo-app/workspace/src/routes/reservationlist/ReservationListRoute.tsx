import { Box, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

import OrderButtonBar from "../../components/OrderButtonBar.tsx";
import ReservationTable from "../../components/ReservationTable.tsx";
import ReservationTablePlaceholder from "../../components/ReservationTablePlaceholder.tsx";
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

      <Suspense fallback={<ReservationTablePlaceholder />}>
        <ReservationsLoader />;
      </Suspense>
    </>
  );
}

function ReservationsLoader() {
  const [searchParams] = useSearchParams({ orderBy: "start" });
  const orderBy = searchParams.get("orderBy") as OrderBy;

  // TanStack Query

  // queryKey: ["reservations", "details", "R-1" ]
  const { data: reservations, isFetching } = useSuspenseQuery(
    getReservationListOptions(orderBy),
  );

  // ....

  return (
    <div>
      {isFetching && <p>Daten werden aktualisiert!</p>}
      <ReservationTable reservations={reservations} />
    </div>
  );

  // ...
}
