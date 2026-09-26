import { http, HttpResponse } from "msw";
import { projectInputSchema, type Project } from "../features/projects/api";

const seed: Project[] = [{ id: "welcome", name: "Your first project", description: "Edit this project or create another." }];
let projects = structuredClone(seed);
export function resetProjects() { projects = structuredClone(seed); }
export const handlers = [
  http.get("*/projects", () => HttpResponse.json(projects)),
  http.get("*/projects/:id", ({ params }) => {
    const project = projects.find(item => item.id === params.id);
    return project ? HttpResponse.json(project) : new HttpResponse(null, { status: 404 });
  }),
  http.post("*/projects", async ({ request }) => {
    const result = projectInputSchema.safeParse(await request.json());
    if (!result.success) return HttpResponse.json({ message: "Invalid project" }, { status: 400 });
    const project = { ...result.data, id: crypto.randomUUID() };
    projects.push(project); return HttpResponse.json(project, { status: 201 });
  }),
  http.put("*/projects/:id", async ({ request, params }) => {
    const index = projects.findIndex(item => item.id === params.id);
    if (index < 0) return new HttpResponse(null, { status: 404 });
    const result = projectInputSchema.safeParse(await request.json());
    if (!result.success) return new HttpResponse(null, { status: 400 });
    projects[index] = { ...result.data, id: projects[index].id };
    return HttpResponse.json(projects[index]);
  }),
  http.delete("*/projects/:id", ({ params }) => {
    if (!projects.some(item => item.id === params.id)) return new HttpResponse(null, { status: 404 });
    projects = projects.filter(item => item.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
