import {
  createRootRoute,
  retainSearchParams,
  stripSearchParams,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod/v4";

import AppLayout from "../components/AppLayout.tsx";

const RouteSearchParams = z.object({
  orderBy: z
    .enum(["foodTruck", "status", "customerName", "start", ""])
    .default("start"),
});

export const Route = createRootRoute({
  component: AppLayout,
  validateSearch: zodValidator(RouteSearchParams),
  search: {
    middlewares: [
      stripSearchParams({
        orderBy: "start",
      }),
      retainSearchParams(true),
    ],
  },
});
