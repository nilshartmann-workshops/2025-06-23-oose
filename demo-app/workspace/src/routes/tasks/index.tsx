import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import { PageTitle } from "../../components/Heading.tsx";
import OrderByButtonBar from "../../components/OrderByButtonBar.tsx";
import PlaceholderCard from "../../components/PlaceholderCard.tsx";
import { TaskSummaryCard } from "../../components/TaskSummaryCard.tsx";
import { taskApiKy } from "../../task-api-ky.ts";
import { TaskSchema } from "../../types.ts";

const TaskListSearchParams = z.object({
  orderBy: z.enum(["dueDate", "state", "votes"]).catch("dueDate"),
});

export const Route = createFileRoute("/tasks/")({
  validateSearch: zodValidator(TaskListSearchParams),
  // validateSearch: (s) => TaskListSearchParams.parse(s),
  component: TaskListRouteComponent,
  // search: {
  //   middlewares: [stripSearchParams({ orderBy: "dueDate" })],
  // },
});

function TaskListRouteComponent() {
  const orderBy = Route.useSearch({
    select: (p) => p.orderBy,
  });

  const result = useQuery({
    queryKey: ["tasklist", orderBy],
    async queryFn() {
      const tasks = await taskApiKy
        .get(`api/tasks?orderBy=${orderBy}&slowdown=1000`)
        .json();

      return TaskSchema.array().parse(tasks);
    },
    placeholderData(previousData, previousQuery) {
      console.log("prev data", previousData, previousQuery);
      return previousData || undefined;
    },
  });

  const x = {
    isPending: result.isPending,
    // Is true whenever the first fetch for a query is in-flight
    // Is the same as isFetching && isPending
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isPlaceholderData: result.isPlaceholderData,
    data: result.data,
  };

  // console.dir(x);

  return (
    <>
      <header className={"flex items-center justify-between"}>
        <PageTitle>Task Overview</PageTitle>
        <OrderByButtonBar />
      </header>
      <div className={"space-y-8"}>
        {/* INITIALER REQUEST */}
        {result.isPending && (
          <>
            {Array(3)
              .fill("")
              .map((_, ix) => (
                <PlaceholderCard key={ix} />
              ))}
          </>
        )}
        {result.isPlaceholderData &&
          result.data!.map((t) => <PlaceholderCard key={t.id} />)}
        {result.isFetched &&
          result.isSuccess &&
          result.data.map((t) => <TaskSummaryCard key={t.id} task={t} />)}
      </div>
    </>
  );
}
