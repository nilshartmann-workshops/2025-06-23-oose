import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { createQueryClient } from "./create-query-client.tsx";
import { routeTree } from "./routeTree.gen.ts";

// Create TS Query Client
const queryClient = createQueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
