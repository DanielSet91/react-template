# React + TypeScript + Vite

## Project setup

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend's
browser-accessible URL, without a trailing slash. In PowerShell:

```powershell
Copy-Item .env.example .env
```

The example uses port 8000 as a placeholder; this repository does not include a
backend. Requests originate in the browser, so a Docker service name is usually
not an appropriate API URL. Your backend must allow the frontend origin when
using cross-origin requests. All `VITE_` values are public; never use them for secrets.

For local development with Node 22.12 or newer:

```sh
npm ci
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
controls the freshness of prefetched data. No backend requests are made until
you add a query for your API.

## API client

`src/api/apiClient.ts` exports a shared Ky client. It uses `VITE_API_BASE_URL`
as a prefix, preserving API path segments even when an endpoint starts with `/`.
Missing configuration throws when the client is first imported. Ky retries are
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

## Original Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
