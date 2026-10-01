import { Box, Container } from '@mui/material';
import { Outlet } from '@tanstack/react-router';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <NavigationBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ flex: 1, py: { xs: 5, md: 9 } }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
