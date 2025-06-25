import "../setup-dayjs.ts";

// identische Handler wie im Unit-Test
import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { afterEach, beforeAll, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../create-query-client.tsx";
import { createDummyReservation } from "../data.ts";
import { ReservationDetailLoader } from "../routes/reservation/ReservationRoute.tsx";
import { ReservationStatus } from "../types.ts";

const worker = setupWorker(
  http.get("http://localhost:7200/api/reservations/1", async ({ request }) => {
    return HttpResponse.json(createDummyReservation());
  }),
  http.put<never, { status: ReservationStatus }>(
    "http://localhost:7200/api/reservations/1/status",
    async ({ request }) => {
      const body = await request.json();
      const response = { ...createDummyReservation(), status: body.status };
      return HttpResponse.json(response);
    },
  ),
);

beforeAll(async () => await worker.start());
afterEach(() => worker.resetHandlers());

test("ReservationDetailCard", async () => {
  // oft sinnvoll, lieber einen Test-spezifischen QueryProvider,
  //   z.B. ohne Retry, zu konfigurieren
  const queryClient = createQueryClient();
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <ReservationDetailLoader reservationId={"1"} />)
    </QueryClientProvider>,
  );

  //expect(await screen.findByText("Requested")).toBeInTheDocument();

  await expect.element(screen.getByText("Requested")).toBeInTheDocument();
  await screen.getByRole("button", { name: /Confirm/ }).click();

  await expect.element(screen.getByText("Requested")).not.toBeInTheDocument();
  await expect.element(screen.getByText("Confirmed")).toBeInTheDocument();
});
