import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { QueryClient } from "@tanstack/react-query";
import { deleteProject, projectQuery, projectsQuery, saveProject } from "./api";
import ProjectForm from "./ProjectForm";
import { renderWithProviders } from "../../test/render";
import { server } from "../../test/setup";

describe("projects", () => {
  it("creates, reads, updates and deletes through the HTTP client", async () => {
    const client = new QueryClient();
    const created = await saveProject({ name: "Test", description: "First" });
    expect(await client.fetchQuery(projectQuery(created.id))).toEqual(created);
    expect((await client.fetchQuery(projectsQuery)).some(item => item.id === created.id)).toBe(true);
    expect((await saveProject({ name: "Updated", description: "" }, created.id)).name).toBe("Updated");
    await deleteProject(created.id);
    await expect(client.fetchQuery({ ...projectQuery(created.id), retry: false })).rejects.toThrow();
    client.clear();
  });
  it("rejects malformed API data", async () => {
    server.use(http.get("*/projects", () => HttpResponse.json([{ id: 1 }])));
    const client = new QueryClient();
    await expect(client.fetchQuery({ ...projectsQuery, retry: false })).rejects.toThrow();
    client.clear();
  });
  it("requires a name and submits trimmed input", async () => {
    const submissions: unknown[] = [];
    renderWithProviders(<ProjectForm pending={false} onSave={async values => { submissions.push(values); }} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Save project" }));
    expect(await screen.findByText("Enter a project name.")).toBeVisible();
    expect(submissions).toHaveLength(0);
    await user.type(screen.getByLabelText("Project name"), "  Launch  ");
    await user.click(screen.getByRole("button", { name: "Save project" }));
    expect(submissions).toEqual([{ name: "Launch", description: "" }]);
  });
});
