import "./index.css";
import "./setup-dayjs.ts";

import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import addReservationUpdateListener from "./components/add-reservation-update-listener.ts";
import { createQueryClient } from "./create-query-client.tsx";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = createQueryClient();

addReservationUpdateListener(queryClient);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <CssBaseline />
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </LocalizationProvider>
  </QueryClientProvider>,
);
