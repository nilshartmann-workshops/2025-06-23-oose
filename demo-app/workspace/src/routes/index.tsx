import { Box, Button, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import OrderButtonBar from "../components/OrderButtonBar.tsx";
import ReservationTable from "../components/ReservationTable.tsx";
import ReservationTablePlaceholder from "../components/ReservationTablePlaceholder.tsx";
import { getReservationListOpts } from "../queries.ts";

export const Route = createFileRoute("/")({
  component: ReservationListRoute,
});

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

      {/*

      Teil 2: Hier Suspense-Boundary und List-Query lahm machen

      - 🤔 was passiert, wenn wir die Sortierung ändern?
           - Suspense-Boundary erscheint nur, wenn die Daten noch NICHT im Cache sind
           - ALTE Daten werden aber sofort angezeigt
      - 🕵️‍♂️ Netzwerkverkehr: in jedem Fall wird ein Request im Hintergrund gemacht
           - während ALTE Daten angezeigt sind
           - mit isFetching können wir das prüfen

      */}

      <Link to={"/hello"}>Hello World</Link>
      <Link to={"/user/$userId"} params={{ userId: "123" }}>
        User
      </Link>
      <Link
        to={"/user/liste"}
        search={(s) => ({
          sortBy: "fasdfsad",
          page: 100,
          ...s,
        })}
      >
        Liste
      </Link>

      <Suspense fallback={<ReservationTablePlaceholder />}>
        <ReservationsLoader />
      </Suspense>
    </>
  );
}

function ReservationsLoader() {
  const orderBy = Route.useSearch({ select: (s) => s.orderBy });

  // 🕵️‍♂️ Manuelles Aktualisieren der Liste
  const {
    data: reservations,
    refetch,
    isFetching,
  } = useSuspenseQuery(getReservationListOpts(orderBy));

  return (
    <Stack>
      <Button onClick={() => refetch()}>Reload</Button>
      {isFetching && <Typography variant={"h3"}>Updating...</Typography>}
      <ReservationTable reservations={reservations} />
    </Stack>
  );
}
