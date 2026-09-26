import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import MainLayout from "../components/mainLayout/MainLayout";
import HomePage from "../pages/homepage/Homepage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import RouteError from "../components/common/RouteError";
import { CustomSpinner } from "../components/common/CustomSpinner";
import { projectQuery } from "../features/projects/api";

export const queryClient = new QueryClient();

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: MainLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: RouteError,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const projectsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/projects", component: ProjectsPage });
export const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute, path: "/projects/$projectId", component: ProjectDetailPage,
  loader: ({ context, params }) => context.queryClient.ensureQueryData(projectQuery(params.projectId)),
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, projectsRoute, projectDetailRoute]),
  defaultErrorComponent: RouteError,
  defaultPendingComponent: CustomSpinner,
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
