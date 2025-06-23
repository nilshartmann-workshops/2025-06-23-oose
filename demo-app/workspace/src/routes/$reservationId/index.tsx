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
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import ReservationDetailCard from "../../components/ReservationDetailCard.tsx";
import ReservationDetailPlaceholder from "../../components/ReservationDetailPlaceholder.tsx";
import { getReservationByIdOpts } from "../../queries.ts";

export const Route = createFileRoute("/$reservationId/")({
  component: ReservationRoute,
});

export default function ReservationRoute() {
  const { reservationId } = Route.useParams();

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
