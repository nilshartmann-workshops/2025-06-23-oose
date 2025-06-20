import { useMutation, useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import z from "zod";

import { taskApiKy } from "../task-api-ky.ts";
import { TaskSchema } from "../types.ts";

type TaskVotesBadgeProps = {
  votes: number;
  taskId?: string;
};

const VoteTaskResponseSchema = z.object({
  newVotes: z.number(),
});

export default function TaskVotesBadge({ votes, taskId }: TaskVotesBadgeProps) {
  const queryClient = useQueryClient();

  const voteTaskMutation = useMutation({
    async mutationFn() {
      const response = await taskApiKy
        .patch(`api/tasks/${taskId}/votes`)
        .json();
      return VoteTaskResponseSchema.parse(response);
    },
    onSuccess(data, vars) {
      console.log("New Votes", data);
      queryClient.invalidateQueries({
        queryKey: ["tasklist"],
        refetchType: "all",
      });
      queryClient.setQueryData(["tasks", taskId], (oldTask: unknown) => {
        console.log("oldTask", oldTask);
        if (!oldTask) {
          return;
        }
        const parseResult = TaskSchema.safeParse(oldTask);
        if (parseResult.success) {
          return {
            ...parseResult.data,
            votes: data.newVotes,
          };
        }
        return oldTask;
      });
    },
  });

  const className = twMerge(
    "bg-goldgray inline-flex rounded-lg p-2 text-yellow-800",
    !!taskId &&
      "hover:bg-orange_2-200 cursor-pointer hover:text-yellow-900 hover:outline hover:outline-1 hover:outline-yellow-800",
  );

  const handleClick = () => {
    voteTaskMutation.mutate();
  };

  return (
    <button onClick={handleClick} className={className}>
      {votes} Votes
    </button>
  );
}
