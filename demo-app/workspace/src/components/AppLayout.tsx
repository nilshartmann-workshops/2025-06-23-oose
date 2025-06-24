import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link as RouterLink, Outlet, useSearchParams } from "react-router-dom";
import { z } from "zod/v4";

import { getReservationByIdOpts } from "../queries.ts";
import { ReservationStatus } from "../types.ts";

// Auf true setzen, um den Link zum Reservation-Editor anzuzeigen
const showCreateLink = false;

const ReservationStatusChangedEvent = z.object({
  reservationId: z.string(),
  newStatus: ReservationStatus,
});

export default function AppLayout() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:7200/api/events");
    eventSource.addEventListener("reservation-status-changed", (event) => {
      console.log("data", event.data, "type", event.type);
      const reservationEvent = ReservationStatusChangedEvent.parse(
        JSON.parse(event.data),
      );

      queryClient.setQueryData(
        getReservationByIdOpts(reservationEvent.reservationId).queryKey,
        (currentReservation) => {
          if (!currentReservation) {
            return currentReservation;
          }

          // ImmerJs

          return { ...currentReservation, status: reservationEvent.newStatus };
        },
      );
    });

    return () => eventSource.close();
  }, [queryClient]);

  const [searchParams] = useSearchParams();
  return (
    <Container>
      <Stack spacing={4}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                align={"left"}
              >
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={`/?${searchParams.toString()}`}
                >
                  <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Avatar src={"/icon.png"} />
                    <div>Rent a Food Truck</div>
                  </Stack>
                </Button>
              </Typography>

              {showCreateLink && (
                <Button color="inherit" component={RouterLink} to={"/create"}>
                  Reserve your truck
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>

        <Outlet />
      </Stack>
    </Container>
  );
}
