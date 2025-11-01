import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", py: 2, mt: "auto", width: "100vw" }}
    >
      <Typography variant="body2" color="white" align="center">
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  );
}
