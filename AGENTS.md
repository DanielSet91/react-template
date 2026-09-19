# Project guidance

## Stack and structure

- This is a client-side React + TypeScript application built with Vite. Use npm and keep `package-lock.json` in sync with dependency changes.
- Use `.tsx` for files containing JSX and `.ts` for other TypeScript files. Keep strict typing and follow nearby code conventions.
- Define code-based TanStack Router routes in `src/Router/router.ts`. Use TanStack `Link` and `Outlet`, and keep navigation entries aligned with implemented routes.
- Put route pages in `src/pages`, shared UI in `src/components`, and HTTP configuration in `src/api`. Keep feature-specific queries and query keys together as features are added.
- Use MUI components and theme values for shared styling. Reuse the existing layout and toast infrastructure.

## Server data and HTTP

- Use TanStack Query for server state and React state for local UI state.
- Reuse the shared Query client provided to React and the router context. Route loaders and components should share query options and cache keys.
- Send API requests through `apiClient` from `src/api/apiClient.ts`. It uses Ky with the configured API prefix and a 15-second timeout.
- Pass TanStack Query's `signal` into Ky requests for cancellation.
- Keep Ky retries disabled; configure retry behavior in TanStack Query when needed.
- For responses without a body, await the request without calling `.json()`. JSON type parameters do not provide runtime validation.

## Environment and Docker

- Document new configuration in `.env.example` using placeholders. Keep local environment files and secrets out of version control.
- `VITE_` variables are public browser configuration, embedded at build time. API URLs must be reachable from the user's browser.
- Development: `docker compose up --build` serves port 3000 with hot reload.
- Production: `docker compose -f docker-compose.prod.yml up --build -d` serves port 8080 through Nginx. Preserve its client-side routing fallback.
- Production API URL changes require rebuilding the image. Keep the lowercase `dockerfile` path consistent in Compose files.

## Verification

- After code or dependency changes, run `npm run build` and `npm run lint`. On PowerShell systems that block npm's script shim, use `npm.cmd`.
- There is currently no automated test script. Add focused behavioral tests when warranted; do not claim tests were run if they were not.
- For Compose changes, validate with `docker compose --env-file .env.example config --quiet` and `docker compose --env-file .env.example -f docker-compose.prod.yml config --quiet`.
- Documentation-only changes do not require a build. Check the diff for formatting errors and keep README instructions accurate.
- Preserve unrelated user changes. Report what changed, verification performed, and any checks that could not run.
