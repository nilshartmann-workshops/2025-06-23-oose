import { Task } from "../types.ts";
import Card from "./Card.tsx";
import { H4 } from "./Heading.tsx";
import TaskStateBadge from "./TaskStateBadge.tsx";
import TaskVotesBadge from "./TaskVotesBadge.tsx";

type PinnedTaskCardProps = {
  task: Task;
};
export default function PinnedTaskCard({ task }: PinnedTaskCardProps) {
  return (
    <Card>
      <H4>{task.title}</H4>
      <div className={"flex justify-between"}>
        <TaskStateBadge state={task.state} />
        <TaskVotesBadge votes={task.votes} taskId={task.id} />
      </div>
    </Card>
  );
}
