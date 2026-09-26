import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { apiClient } from "../../api/apiClient";

export const projectInputSchema = z.object({
  name: z.string().trim().min(1, "Enter a project name.").max(100),
  description: z.string().trim().max(1000),
});
export const projectSchema = projectInputSchema.extend({ id: z.string() });
export type ProjectInput = z.infer<typeof projectInputSchema>;
export type Project = z.infer<typeof projectSchema>;
export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => ["projects", id] as const,
};
export const projectsQuery = queryOptions({
  queryKey: projectKeys.all,
  queryFn: async ({ signal }) => z.array(projectSchema).parse(await apiClient.get("projects", { signal }).json()),
});
export const projectQuery = (id: string) => queryOptions({
  queryKey: projectKeys.detail(id),
  queryFn: async ({ signal }) => projectSchema.parse(await apiClient.get(`projects/${encodeURIComponent(id)}`, { signal }).json()),
});
export async function saveProject(input: ProjectInput, id?: string) {
  const body = { json: projectInputSchema.parse(input) };
  const response = id ? apiClient.put(`projects/${encodeURIComponent(id)}`, body) : apiClient.post("projects", body);
  return projectSchema.parse(await response.json());
}
export async function deleteProject(id: string) {
  await apiClient.delete(`projects/${encodeURIComponent(id)}`);
}
