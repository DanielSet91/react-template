import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import MainLayout from "../components/mainLayout/MainLayout";
import HomePage from "../pages/homepage/Homepage";
import NotFoundPage from "../pages/NotFoundPage";

export const queryClient = new QueryClient();

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: MainLayout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
  context: { queryClient },
  defaultPreload: "intent",
  // Let Query decide whether prefetched server data is fresh.
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
