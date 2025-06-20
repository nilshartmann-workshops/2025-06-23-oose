import { createFileRoute, Outlet } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import PinnedTaskList from "../../components/PinnedTaskList.tsx";

const TasksRouteSearchParams = z.object({
  pinnedTaskIds: z.string().array().optional(),
});

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
  validateSearch: zodValidator(TasksRouteSearchParams),
});

function RouteComponent() {
  return (
    <div className={"grid grid-cols-4 gap-x-12"}>
      <div className={"col-span-3"}>
        <Outlet />
      </div>
      <div>
        <PinnedTaskList />
      </div>
    </div>
  );
}
