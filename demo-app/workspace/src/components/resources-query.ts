import { queryOptions } from "@tanstack/react-query";

import { taskApiKy } from "../task-api-ky.ts";
import { ResourceSchema } from "../types.ts";

export const resourceQueryOptions = (taskId: string) => {
  return queryOptions({
    queryKey: ["tasks", taskId, "resources"],
    async queryFn() {
      const response = await taskApiKy
        .get(`api/tasks/${taskId}/resources?slowdown=2000`)
        .json();
      return ResourceSchema.array().parse(response);
    },
  });
};
