import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";

import DueDateBadge from "../../components/DueDateBadge.tsx";
import { H4, PageTitle } from "../../components/Heading.tsx";
import TaskStateBadge from "../../components/TaskStateBadge.tsx";
import TaskVotesBadge from "../../components/TaskVotesBadge.tsx";
import { tasks } from "../../dummy.ts";
import { Task, TaskState } from "../../types.ts";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const topVotedTasks = [...tasks]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);
  const tasksByState = tasks.reduce(
    (acc, task) => {
      if (!acc[task.state]) {
        acc[task.state] = [];
      }
      acc[task.state].push(task);
      return acc;
    },
    {} as Record<TaskState, typeof tasks>,
  );

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className={"grid grid-cols-2 gap-8"}>
        <div className={"flex-col space-y-4"}>
          <H4>Top Voted Tasks</H4>
          {topVotedTasks.map((t) => (
            <TopVotedTask key={t.id} task={t} />
          ))}
        </div>
        <div className={"flex-col space-y-4"}>
          <H4>Tasks by State</H4>
          <div>
            {Object.entries(tasksByState).map(([state, stateTasks]) => (
              <div key={state} className={"mb-12"}>
                <div className={"space-y-4"}>
                  <TaskStateBadge state={state as TaskState} fullsize />
                  {stateTasks.map((task) => (
                    <TaskByState key={task.id} task={task} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

type TopVotedTaskProps = {
  task: Task;
};

function TopVotedTask({ task }: TopVotedTaskProps) {
  return (
    <section
      className={
        "flex flex-col space-y-4 rounded-lg border border-dotted border-gray-300 bg-white p-4 text-gray-500 shadow-md"
      }
    >
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
        <TaskVotesBadge votes={task.votes} />
      </div>
    </section>
  );
}

type TaskByStateProps = { task: Task };
function TaskByState({ task }: TaskByStateProps) {
  return (
    <section
      className={
        "flex flex-col space-y-4 rounded-lg border border-dotted border-gray-300 bg-white p-4 text-gray-500 shadow-md"
      }
    >
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
        <DueDateBadge dueDate={task.dueDate} />
        <TaskVotesBadge votes={task.votes} />
      </div>
    </section>
  );
}
