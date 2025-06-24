import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useSetReservationStatusMutation } from "../queries.ts";
import type { Reservation } from "../types.ts";
import StatusChip from "./StatusChip.tsx";
import TimeRangeChip from "./TimeRangeChip.tsx";

type ReservationDetailCardProps = {
  reservation: Reservation;
};

export default function ReservationDetailCard({
  reservation,
}: ReservationDetailCardProps) {
  const mutation = useSetReservationStatusMutation(reservation.id);

  return (
    <Card
      sx={{ minWidth: 600, maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Reservation for {reservation.customerName}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="subtitle2">Food Truck</Typography>
            <Typography>{reservation.foodTruck}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="subtitle2">Expected Guests</Typography>
            <Typography>{reservation.expectedGuests}</Typography>
          </Grid>

          <TimeRangeChip range={reservation.timeRange} variant={"full"} />

          {reservation.specialRequests && (
            <Grid size={12}>
              <Typography variant="subtitle2">Special Requests</Typography>
              <Typography>{reservation.specialRequests}</Typography>
            </Grid>
          )}
        </Grid>
        <Stack direction="row" spacing={2} mt={3}>
          <Box sx={{ mb: 2 }}>
            <StatusChip status={reservation.status} variant={"lg"} />
          </Box>
          <Button
            onClick={() => mutation.mutate("Confirmed")}
            variant="text"
            disabled={reservation.status === "Confirmed" || mutation.isPending}
          >
            Confirm
          </Button>
          <Button
            onClick={() => mutation.mutate("Rejected")}
            variant="text"
            disabled={reservation.status === "Rejected" || mutation.isPending}
          >
            Reject
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
