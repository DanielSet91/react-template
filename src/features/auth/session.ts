import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { HTTPError } from "ky";
import { apiClient } from "../../api/apiClient";

const sessionSchema = z.object({ id: z.string(), name: z.string(), permissions: z.array(z.string()) });
export type Session = z.infer<typeof sessionSchema>;
export function hasPermission(session: Session | null | undefined, permission: string) {
  return session?.permissions.includes(permission) ?? false;
}
// Opt in from a protected route or useQuery; no session requests run by default.
// Contract: cookie-backed GET session returns a user, or 401 when signed out.
export const sessionQuery = queryOptions({
  queryKey: ["session"], retry: false,
  queryFn: async ({ signal }) => {
    try { return sessionSchema.parse(await apiClient.get("session", { signal, credentials: "include" }).json()); }
    catch (error) { if (error instanceof HTTPError && error.response.status === 401) return null; throw error; }
  },
});
