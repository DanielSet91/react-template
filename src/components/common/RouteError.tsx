import { Alert, Button, Stack } from "@mui/material";
import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { errorMessage } from "../../api/errors";

export default function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  return <Stack spacing={2} sx={{ p: 4 }}>
    <Alert severity="error">{errorMessage(error)}</Alert>
    <Button onClick={() => { reset(); void router.invalidate(); }}>Try again</Button>
  </Stack>;
}
