import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import { Link } from "@tanstack/react-router";

export default function NavigationBar() {
  return (
    <Box component="header" sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 80, gap: 2 }}>
          <Stack component={Link} to="/" direction="row" alignItems="center" spacing={1.5} sx={{ textDecoration: "none", color: "text.primary" }}>
            <Box sx={{ display: "flex", p: 1, borderRadius: 2.5, bgcolor: "primary.main", color: "white" }}><LayersRoundedIcon /></Box>
            <Typography fontWeight={700} letterSpacing="-0.5px">React Template<Typography component="span" sx={{ color: "primary.main" }}>.</Typography></Typography>
          </Stack>
          <Stack component="nav" aria-label="Main navigation" direction="row" spacing={1}>
            <Button component={Link} to="/" aria-current="page" sx={{ color: "text.primary" }}>Home</Button>
            <Button component="a" href="https://mui.com/material-ui/getting-started/" target="_blank" rel="noopener noreferrer" endIcon={<ArrowOutwardRoundedIcon />} sx={{ display: { xs: "none", sm: "inline-flex" }, color: "text.secondary" }}>MUI docs</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
