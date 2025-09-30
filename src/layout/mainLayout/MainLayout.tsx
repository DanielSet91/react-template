import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <NavigationBar />
      <Box sx={{ flex: 1, py: 4, px: { xs: 0, sm: 6 } }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
