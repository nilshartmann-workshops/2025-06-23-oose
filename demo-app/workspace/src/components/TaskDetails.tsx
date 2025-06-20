import { Suspense } from "react";

import { Task } from "../types.ts";
import DueDateBadge from "./DueDateBadge.tsx";
import { H4 } from "./Heading.tsx";
import InsightList from "./InsightList.tsx";
import TaskStateBadge from "./TaskStateBadge.tsx";
import TaskVotesBadge from "./TaskVotesBadge.tsx";

type TaskDetailsProps = {
  task: Task;
};

export default function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div>
      <section className={"flex-col space-y-4"}>
        <H4>Description</H4>
        <p className={"leading-8"}>{task.description}</p>

        <div className={"flex justify-between space-x-4"}>
          <TaskStateBadge state={task.state} />
          <TaskVotesBadge votes={task.votes} taskId={task.id} />
          <div
            className={
              "flex items-center space-x-2 rounded-md border-2 border-blue-200 bg-blue-100 p-2 text-blue-600"
            }
          >
            <i className="fa-regular fa-clock"></i>
            <span>{task.effort} hours</span>
          </div>
          <DueDateBadge dueDate={task.dueDate} />
        </div>
      </section>
      <section>
        <Suspense fallback={<h4>Insights loading...</h4>}>
          <InsightList taskId={task.id} />
        </Suspense>
      </section>
    </div>
  );
}
