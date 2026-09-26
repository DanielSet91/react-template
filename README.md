# React + TypeScript + Vite

New to this repository? Start with the [developer onboarding guide](onboarding.md).

## Project setup

Copy `.env.example` to `.env` to use the demo without a backend. When connecting
a backend, disable mocks and set `VITE_API_BASE_URL` to its browser-accessible
URL, without a trailing slash. In PowerShell:

```powershell
Copy-Item .env.example .env
```

The example uses port 8000 as a placeholder; this repository does not include a
backend. Requests originate in the browser, so a Docker service name is usually
not an appropriate API URL. Your backend must allow the frontend origin when
using cross-origin requests. All `VITE_` values are public; never use them for secrets.

For local development with Node 22.13 or newer:

```sh
npm ci
npm run setup -- my-app
npm run dev
```

## Docker development

Start Docker Desktop with Linux containers, then run:

```sh
docker compose up --build
```

Open http://localhost:3000. Source files are mounted for hot reload; dependencies
stay inside the container. File polling is enabled for Docker Desktop mounts.
After dependency changes, run `docker compose up --build --renew-anon-volumes`
to refresh the container's dependency volume.

Stop with `docker compose down`.

## Docker production

```sh
docker compose -f docker-compose.prod.yml up --build -d
```

Open http://localhost:8080. This separate Compose configuration builds the app
and serves `dist` through Nginx, with an HTML fallback for client-side routes.
It does not mount source files or run the Vite development server.

`VITE_API_BASE_URL` is passed from `.env` as a build argument. Vite embeds it at
build time, so changing the backend URL requires rebuilding the image. Environment
files are excluded from the Docker build context.

Stop with `docker compose -f docker-compose.prod.yml down`.

## Starter features

Open `/projects` for a complete list/create/detail/edit/delete example. It uses
the shared Ky client, TanStack Query cache keys, runtime Zod response validation,
React Hook Form, reusable MUI form fields, and mutation notifications. Detail
loaders share query options with their components. Failed requests display
readable messages with retry actions; route failures have a recovery screen.

`npm run setup -- my-app` copies `.env.example` only if `.env` does not exist,
renames package and lockfile metadata, updates the HTML title, and checks API
configuration. The name is optional. Branding in the navigation remains yours
to customize.

Development mocks are enabled in `.env.example`. MSW intercepts project API
requests in the browser; demo data resets when the page reloads. Mocks start
only in Vite development mode. To connect your backend, set
`VITE_ENABLE_MOCKS=false` and set `VITE_API_BASE_URL`. Production always requires
a real API URL. Copying environment variables into production does not enable
the mock API.

Generate a feature with `npm run generate:feature -- orders`. This creates a
page, validated list query, feature query keys, and a registered `/orders`
route. It refuses existing files and invalid names. Update the generated schema
and endpoint, add a mock handler or backend implementation, and add a TanStack
navigation Link. Generated features deliberately do not invent your data model.

Backend contracts to implement when needed:

- Projects: `GET /projects` returns an array; `POST /projects` and
  `PUT /projects/:id` accept `{ name, description }` and return
  `{ id, name, description }`; `GET /projects/:id` returns that object;
  `DELETE /projects/:id` returns 204.
- Session: the optional `sessionQuery` calls `GET /session` with cookies and
  expects `{ id, name, permissions: string[] }`, or 401 for a signed-out user.
  No authentication requests run by default. Add your provider's login/logout
  flow, CSRF protection where required, and enforce authorization on the server.
  `hasPermission` supports conditional UI; it is not a security boundary.
- Uploads: `uploadFile` sends multipart `file` to `POST /uploads`, supports
  cancellation, checks a 10 MB client limit, and validates `{ id, url }`.
  Implement server-side size/type checks and access control before using it.

## Checks

Run `npm run check` for lint, TypeScript/production build, focused Vitest
behavioral tests, and isolated setup/generator tests. `npm test` starts the
Vitest watcher. Test utilities provide MUI, toast, and Query providers; MSW
supplies API fixtures without a running backend. GitHub Actions runs these
checks on pushes and pull requests.

## Routing and server data

The app uses TanStack Router with code-based routes in `src/Router/router.ts`.
Add routes with `createRoute`, attach them to the route tree, and use TanStack
`Link` for navigation. Router registration supplies application-wide route types.
Unknown URLs render a not-found page. The Contact navigation entry was removed
because this template has no Contact page.

TanStack Query owns the server-data cache. The same `queryClient` is provided to
React and the router context, so route loaders can call
`context.queryClient.ensureQueryData(queryOptions)` and components can consume
those same options with `useQuery` or `useSuspenseQuery`. Keep query keys and
query functions together per feature. Intent preloading is enabled; Query
controls the freshness of prefetched data. The projects routes demonstrate
these patterns against the development mock API or your configured backend.

## API client

`src/api/apiClient.ts` exports a shared Ky client. It uses `VITE_API_BASE_URL`
as a prefix, preserving API path segments even when an endpoint starts with `/`.
Missing configuration throws when the client is first imported, except in
development with mocks enabled, where a same-origin `/api` URL is used. Ky retries are
disabled so TanStack Query owns retry policy; the client uses a 15-second timeout.

Pass the query's abort signal through to enable request cancellation:

```ts
import { queryOptions } from '@tanstack/react-query';
import { apiClient } from './api/apiClient';

type User = { id: string; name: string };

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: ({ signal }) => apiClient.get('users', { signal }).json<User[]>(),
});
```

For mutations, use methods such as
`apiClient.post('users', { json: { name: 'Alex' } }).json<User>()`.
For endpoints returning no content, await the request without calling `.json()`.
Non-success responses throw Ky's `HTTPError`, preserving the response and status.
Type parameters describe expected JSON; they do not validate it at runtime.
