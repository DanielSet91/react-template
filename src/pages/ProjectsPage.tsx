import { Alert, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsQuery, projectKeys, saveProject } from "../features/projects/api";
import ProjectForm from "../features/projects/ProjectForm";
import { errorMessage } from "../api/errors";
import { useToast } from "../hooks/useToast";

export default function ProjectsPage() {
  const query = useQuery(projectsQuery);
  const client = useQueryClient();
  const { showToast } = useToast();
  const create = useMutation({ mutationFn: (values: Parameters<typeof saveProject>[0]) => saveProject(values),
    onSuccess: async () => { await client.invalidateQueries({ queryKey: projectKeys.all }); showToast("Project created", "success"); },
  });
  return <Stack spacing={3}>
    <Typography variant="h4" component="h1">Projects</Typography>
    <Paper variant="outlined" sx={{ p: 3 }}><ProjectForm onSave={create.mutateAsync} pending={create.isPending} /></Paper>
    {create.isError && <Alert severity="error">{errorMessage(create.error)}</Alert>}
    {query.isPending && <CircularProgress aria-label="Loading projects" />}
    {query.isError && <Alert severity="error" action={<Button onClick={() => void query.refetch()}>Retry</Button>}>{errorMessage(query.error)}</Alert>}
    {query.data?.length === 0 && <Typography>No projects yet. Create your first project above.</Typography>}
    {query.data?.map(project => <Paper key={project.id} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6">{project.name}</Typography><Typography>{project.description}</Typography>
      <Link to="/projects/$projectId" params={{ projectId: project.id }}><Button component="span">View project</Button></Link>
    </Paper>)}
  </Stack>;
}
