import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Suspense } from "react";

import { taskApiKy } from "../task-api-ky.ts";
import { TaskSchema } from "../types.ts";
import PinnedTaskCard from "./PinnedTaskCard.tsx";

export default function PinnedTaskList() {
  const pinnedTaskIds = useSearch({
    from: "/tasks",
    select: (state) => state.pinnedTaskIds,
  });

  return (
    <div className={"space-y-4"}>
      <Suspense fallback={"Pinned Tasks loading..."}>
        {(pinnedTaskIds || []).map((id) => (
          <PinnedTaskLoader key={id} taskId={id} />
        ))}
      </Suspense>
    </div>
  );
}

type PinnedTaskLoaderProps = {
  taskId: string;
};
function PinnedTaskLoader({ taskId }: PinnedTaskLoaderProps) {
  // todo: mit Query in /tasks/$taskId zusammenlegen
  const result = useSuspenseQuery({
    queryKey: ["tasks", taskId],
    async queryFn() {
      const response = await taskApiKy.get(`api/tasks/${taskId}`).json();
      return TaskSchema.parse(response);
    },
  });

  return <PinnedTaskCard task={result.data} />;
}
