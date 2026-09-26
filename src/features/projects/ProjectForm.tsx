import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "../../components/forms/FormTextField";
import { projectInputSchema, type ProjectInput } from "./api";

export default function ProjectForm({ initialValues, onSave, pending }: {
  initialValues?: ProjectInput;
  onSave: (values: ProjectInput) => Promise<unknown>;
  pending: boolean;
}) {
  const { control, handleSubmit, reset, formState } = useForm<ProjectInput>({
    resolver: zodResolver(projectInputSchema),
    defaultValues: initialValues ?? { name: "", description: "" },
  });
  return <Stack component="form" spacing={2} onSubmit={handleSubmit(async (values) => {
    try { await onSave(values); if (!initialValues) reset(); } catch { /* The parent displays mutation failures. */ }
  })}>
    <FormTextField control={control} name="name" label="Project name" />
    <FormTextField control={control} name="description" label="Description" multiline rows={3} />
    <Button type="submit" variant="contained" disabled={pending || formState.isSubmitting}>Save project</Button>
  </Stack>;
}
