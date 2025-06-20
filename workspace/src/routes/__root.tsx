import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import * as React from "react";

type MatchTrackerRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MatchTrackerRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className={"font-open-sans min-h-screen bg-stone-100"}>
      <div className={"container mx-auto flex min-h-screen flex-col gap-y-4"}>
        <main className={"flex-grow flex-col bg-white px-8 py-4"}>
          TODO: Outlet!!!!
        </main>
        {/*<ReactQueryDevtools />*/}
      </div>
    </div>
  );
}
