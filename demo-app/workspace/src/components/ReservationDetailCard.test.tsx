import "../setup-dayjs.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";

import { createQueryClient } from "../create-query-client.tsx";
import { createDummyReservation } from "../data.ts";
import { ReservationDetailLoader } from "../routes/$reservationId";
import { ReservationStatus } from "../types.ts";

// In realistischen Test-Cases:
//   in eigenes Modul auslagern

const server = setupServer(
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

  // "Requested" erscheint erst, wenn die Daten geladen und die Card
  // gerendet wurde
  expect(await screen.findByText("Requested")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /Confirm/ }));

  // Confirmed erscheint nach erfolreichem Submit
  //   (auch hier für findByText gehen)
  await waitFor(() => {
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });
});
