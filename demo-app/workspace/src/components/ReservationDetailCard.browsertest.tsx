import "../setup-dayjs.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { afterEach, beforeAll, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../create-query-client.tsx";
import { createDummyReservation } from "../data.ts";
import { ReservationDetailLoader } from "../routes/$reservationId";
import { ReservationStatus } from "../types.ts";

// identische Handler wie im Unit-Test
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

  // "Requested" erscheint erst, wenn die Daten geladen und die Card
  // gerendet wurde
  await expect.element(screen.getByText("Requested")).toBeInTheDocument();

  await screen.getByRole("button", { name: /Confirm/ }).click();

  await expect.element(screen.getByText("Requested")).not.toBeInTheDocument();
  await expect.element(screen.getByText("Confirmed")).toBeInTheDocument();
  // await user.click(screen.getByRole("button", { name: /Confirm/ }));
  //
  // // Confirmed erscheint nach erfolreichem Submit
  // //   (auch hier für findByText gehen)
  // await waitFor(() => {
  //   expect(screen.getByText("Confirmed")).toBeInTheDocument();
  // });
});
