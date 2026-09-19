import { Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export default function NotFoundPage() {
  return (
    <>
      <Typography variant="h4" component="h1">Page not found</Typography>
      <Link to="/">Back to home</Link>
    </>
  );
}
