import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <div>Hello {params.userId}</div>;
}
