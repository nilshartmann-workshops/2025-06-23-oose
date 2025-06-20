import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  retainSearchParams,
} from "@tanstack/react-router";

import GlobalNavBar from "../components/GlobalNavBar.tsx";
import MainLayout from "../components/MainLayout.tsx";

type AppRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootRoute,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

export default function RootRoute() {
  return (
    <div className={"font-inter flex min-h-svh flex-col"}>
      <GlobalNavBar />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}
