import { Box, Button, Card, Container } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ReservationDetailCard from "../../components/ReservationDetailCard.tsx";
import { getReservationByIdOpts } from "../../queries.ts";
import { useTimezoneStore } from "../../timezone-store.ts";

export default function ReservationRoute() {
  const { reservationId } = useParams();

  if (!reservationId) {
    throw new Error("Invalid reservationId");
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ReservationDetailLoader reservationId={reservationId} />
      </Box>
    </Container>
  );
}

type ReservationDetailLoaderProps = {
  reservationId: string;
};

function ReservationDetailLoader({
  reservationId,
}: ReservationDetailLoaderProps) {
  const { data: reservation } = useSuspenseQuery(
    getReservationByIdOpts(reservationId),
  );

  return (
    <Box display={"flex"} alignItems={"center"} marginX={"10px"}>
      <Warning />
      <ReservationDetailCard reservation={reservation} />;
      <CounterView />
    </Box>
  );
}
const useIsCritical = () => {
  const isCritical = useTimezoneStore(
    (state) => state.counter > 105 && state.counter < 110,
  );

  return isCritical;
};
function Warning() {
  const isCritical = useIsCritical();
  return (
    <Card>
      <p>isCritical: {String(isCritical)}</p>
    </Card>
  );
}

function CounterView() {
  const counter = useTimezoneStore((state) => state.counter);
  const setCounter = useTimezoneStore((state) => state.setCount);
  return (
    <Card>
      <p>Count: {counter}</p>
      <Button onClick={() => setCounter(counter + 1)}>Increase!</Button>
    </Card>
  );
}
