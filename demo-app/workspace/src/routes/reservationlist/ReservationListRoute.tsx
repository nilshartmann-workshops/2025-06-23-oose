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
  // ⚠️ Der Weg, wie wir hier Daten laden und mit den Daten umgehen ist stark vereinfacht
  //   - keine Fehlerbehandlung
  //   - kein Loadingindikator bei lang laufenden Requests
  //   - keine Validierung der Daten
  //   - was müssen wir machen, wenn wir den Query woanders verwenden wollen?
  //   - was passiert, wenn wir die Backend URL anpassen müssen (z.B. je nach Deployment)

  const { data: reservations } = useSuspenseQuery({
    // 🤔 warum 'list' am Ende?
    queryKey: ["reservations", "list"],
    async queryFn() {
      const reservations = ky
        .get<Reservation[]>("http://localhost:7200/api/reservations")
        .json();
      return reservations;
    },
  });

  return <ReservationTable reservations={reservations} />;
}
