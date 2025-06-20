import { Link, useNavigate, useSearch } from "@tanstack/react-router";

import { Task } from "../types.ts";
import Card from "./Card.tsx";
import PinButton from "./PinButton.tsx";
import TaskStateBadge from "./TaskStateBadge.tsx";
import TaskVotesBadge from "./TaskVotesBadge.tsx";

type TaskSummaryCardProps = {
  task: Task;
};

export function TaskSummaryCard({ task }: TaskSummaryCardProps) {
  const isPinned = useSearch({
    from: "/tasks",
    select: (s) => (s.pinnedTaskIds || []).includes(task.id),
  });

  const navigate = useNavigate({
    from: "/tasks",
  });

  const handleClick = () => {
    navigate({
      search: (s) => {
        const pinnedTaskIds = s.pinnedTaskIds || [];

        const newTaskIds = isPinned
          ? pinnedTaskIds.filter((pId) => pId !== task.id)
          : [...pinnedTaskIds, task.id];

        return {
          ...s,
          pinnedTaskIds: newTaskIds.length ? newTaskIds : undefined,
        };
      },
    });
  };

  return (
    <Card className={"h-20"}>
      <div className={"flex items-center justify-between"}>
        <Link to={"/tasks/$taskId"} params={{ taskId: task.id }}>
          <h3
            className={
              "font-inter hover:text-red text-lg leading-none font-semibold text-black hover:underline"
            }
          >
            {task.title}
          </h3>
        </Link>
        <div className={"flex items-center space-x-4"}>
          <TaskStateBadge state={task.state} />
          <TaskVotesBadge votes={task.votes} taskId={task.id} />
          <PinButton pinned={isPinned} onClick={handleClick} />
        </div>
      </div>
    </Card>
  );
}
