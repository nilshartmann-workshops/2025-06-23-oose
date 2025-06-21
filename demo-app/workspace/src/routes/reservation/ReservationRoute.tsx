import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useParams } from "react-router-dom";

import ReservationDetailCard from "../../components/ReservationDetailCard.tsx";
import ReservationDetailPlaceholder from "../../components/ReservationDetailPlaceholder.tsx";
import { getReservationByIdOpts } from "../../queries.ts";

export default function ReservationRoute() {
  const { reservationId } = useParams();

  if (!reservationId) {
    throw new Error("Invalid reservationId");
  }

  const { reset } = useQueryErrorResetBoundary();
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/*

      Teil 1: Hier Suspense-Boundary, und Detail-Query langsam machen

      */}

        <ErrorBoundary FallbackComponent={MyErrorBoundary} onReset={reset}>
          <Suspense fallback={<ReservationDetailPlaceholder />}>
            <ReservationDetailLoader reservationId={reservationId} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Container>
  );
}

function MyErrorBoundary(props: FallbackProps) {
  return (
    <Paper>
      <Stack padding={2}>
        <Typography variant={"h2"}>Error!</Typography>
        {props.error.toString()}
        <Button
          variant={"contained"}
          onClick={() => props.resetErrorBoundary()}
        >
          Retry!
        </Button>
      </Stack>
    </Paper>
  );
}

type ReservationDetailLoaderProps = {
  reservationId: string;
};

export function ReservationDetailLoader({
  reservationId,
}: ReservationDetailLoaderProps) {
  const { data: reservation } = useSuspenseQuery(
    getReservationByIdOpts(reservationId),
  );

  return <ReservationDetailCard reservation={reservation} />;
}
