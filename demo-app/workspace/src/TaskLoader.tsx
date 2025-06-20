import { useQuery } from "@tanstack/react-query";

import { taskApiKy } from "./task-api-ky.ts";
import { TaskSchema } from "./types.ts";

export default function TaskLoader() {
  const result = useQuery({
    queryKey: ["tasks"],
    async queryFn() {
      const tasks = await taskApiKy.get(`api/tasks`).json();

      return TaskSchema.array().parse(tasks);
    },
  });

  if (result.isError) {
    console.error("ERROR", result.error);
    return <div>ERROR: {String(result.error)}</div>;
  }

  if (result.isSuccess) {
    return (
      <div>
        <h1>Tasklist</h1>
        <div>Anzahl Tasks: {result.data.length}</div>
      </div>
    );
  }

  return <div>Loading</div>;
}
