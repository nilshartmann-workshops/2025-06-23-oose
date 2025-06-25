import "../setup-dayjs.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";

import { createQueryClient } from "../create-query-client.tsx";
import { createDummyReservation } from "../data.ts";
import { ReservationDetailLoader } from "../routes/reservation/ReservationRoute.tsx";

// -> mock service worker (MSW https://msw.io)
// -> (ky mocken mit Vitest)
// -> (fetch mocken)
// -> (socket.io mocken)

const server = setupServer(
  http.get("http://localhost:7200/api/reservations/1", async () => {
    return HttpResponse.json(createDummyReservation());
  }),
  http.put("http://localhost:7200/api/reservations/1/status", async () => {
    return HttpResponse.json({
      ...createDummyReservation(),
      status: "Confirmed",
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("ReservationDetailCard", async () => {
  const user = userEvent.setup();
  // oft sinnvoll, lieber einen Test-spezifischen QueryProvider,
  //   z.B. ohne Retry, zu konfigurieren
  const queryClient = createQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ReservationDetailLoader reservationId={"1"} />)
    </QueryClientProvider>,
  );
  expect(await screen.findByText("Requested")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /Confirm/ }));
  expect(await screen.findByText("Confirmed")).toBeInTheDocument();
});
