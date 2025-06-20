import { twMerge } from "tailwind-merge";

type TaskState = "new" | "in_progress" | "done";

interface TaskStateBadgeProps {
  state: TaskState;
  className?: string;
  fullsize?: boolean;
}

const stateLables: Record<TaskState, string> = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
};

export default function TaskStateBadge({
  state,
  fullsize,
  className,
}: TaskStateBadgeProps) {
  const overallClassName = twMerge(
    "items-center border px-3 py-1.5 font-medium",
    fullsize ? "rounded-md" : "rounded-full",
    fullsize && "block",
    state === "new" && "border-blue-300 bg-blue-100 text-blue-800",
    state === "in_progress" &&
      "border-yellow-300 bg-yellow-100 text-yellow-800",
    state === "done" && "border-lima-300 bg-lima-100 text-lima-800",
    className,
  );

  return <span className={overallClassName}>{stateLables[state]}</span>;
}
