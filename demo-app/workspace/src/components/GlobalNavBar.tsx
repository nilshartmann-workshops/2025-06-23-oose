import { Link } from "@tanstack/react-router";

import { AppLink } from "./AppLink.tsx";

export default function GlobalNavBar() {
  return (
    <header className={"bg-goldgray h-16"}>
      <div
        className={
          "container mx-auto flex h-full max-w-4xl items-center justify-start space-x-3"
        }
      >
        <AppLink to={"/tasks"}>Tasks</AppLink>
        <Link
          className={"hover:text-red hover:underline"}
          to={"/dashboard"}
          activeProps={{
            className: "text-red underline",
          }}
        >
          Dashboard
        </Link>
        <Link
          className={"hover:text-red hover:underline"}
          to={"/about"}
          activeProps={{
            className: "text-red underline",
          }}
        >
          About
        </Link>
        <Link
          className={"hover:text-red hover:underline"}
          to={"/privacy"}
          activeProps={{
            className: "text-red underline",
          }}
        >
          Privacy
        </Link>

        {/*

      TODO: add link to /privacy

      */}
      </div>
    </header>
  );
}
