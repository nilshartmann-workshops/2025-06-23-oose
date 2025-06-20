import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Link from={"/tasks/$taskId/"} to={"resources"}>
      Resources
    </Link>
  );
}
