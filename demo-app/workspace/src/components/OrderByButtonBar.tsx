import { getRouteApi, Link } from "@tanstack/react-router";

import { CheckButton } from "./CheckButton.tsx";

// Achtung: Drauf achten "/tasks/" mit "/" am Ende => sonst Layout-Komponente
const Route = getRouteApi("/tasks/");

export default function OrderByButtonBar() {
  const currentOrderBy = Route.useSearch({
    select: (p) => p.orderBy,
  });

  return (
    <div className={"flex space-x-4"}>
      <Link to={"/tasks"} search={(s) => ({ ...s, orderBy: "dueDate" })}>
        <CheckButton checked={currentOrderBy === "dueDate"}>
          Due Date
        </CheckButton>
      </Link>
      <Link to={"/tasks"} search={(s) => ({ ...s, orderBy: "state" })}>
        <CheckButton checked={currentOrderBy === "state"}>State</CheckButton>
      </Link>
      <Link to={"/tasks"} search={(s) => ({ ...s, orderBy: "votes" })}>
        <CheckButton checked={currentOrderBy === "votes"}>Votes</CheckButton>
      </Link>
    </div>
  );
}
