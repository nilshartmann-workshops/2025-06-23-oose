import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod/v4";

const RouteSearchParams = z.object({
  sortBy: z.string(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/user/liste")({
  component: RouteComponent,
  validateSearch: zodValidator(RouteSearchParams),
  loader() {
    // ...
    return {};
  }
});

function RouteComponent() {
  const page = Route.useSearch({
    select: (params) => params.page !== undefined,
  });
  return <div>Hello "/user/liste"!</div>;
}
