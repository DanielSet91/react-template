import { Alert, Button, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { deleteProject, projectKeys, projectQuery, saveProject, type ProjectInput } from "../features/projects/api";
import ProjectForm from "../features/projects/ProjectForm";
import { errorMessage } from "../api/errors";
import { useToast } from "../hooks/useToast";

export default function ProjectDetailPage() {
  const { projectId } = useParams({ from: "/projects/$projectId" });
  const { data } = useSuspenseQuery(projectQuery(projectId));
  const client = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const update = useMutation({ mutationFn: (input: ProjectInput) => saveProject(input, projectId),
    onSuccess: async () => { await client.invalidateQueries({ queryKey: projectKeys.all }); showToast("Project saved", "success"); },
  });
  const remove = useMutation({ mutationFn: () => deleteProject(projectId), onSuccess: async () => {
    client.removeQueries({ queryKey: projectKeys.detail(projectId), exact: true });
    await client.invalidateQueries({ queryKey: projectKeys.all, exact: true });
    showToast("Project deleted", "success"); await navigate({ to: "/projects" });
  } });
  return <Stack spacing={3}>
    <Typography variant="h4" component="h1">{data.name}</Typography>
    <ProjectForm key={data.id} initialValues={data} onSave={update.mutateAsync} pending={update.isPending || remove.isPending} />
    {(update.isError || remove.isError) && <Alert severity="error">{errorMessage(update.error ?? remove.error)}</Alert>}
    <Button color="error" disabled={remove.isPending || update.isPending} onClick={() => {
      if (window.confirm("Delete this project?")) remove.mutate();
    }}>Delete project</Button>
  </Stack>;
}
