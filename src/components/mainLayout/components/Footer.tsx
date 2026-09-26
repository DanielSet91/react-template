import { Box, Container, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: "divider", py: 3 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
          <Typography variant="body2" color="text.secondary">React Template · A little foundation. A lot of possibility.</Typography>
          <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} React Template</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
