import { Box, CircularProgress } from "@mui/material";

export const CustomSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" my={10}>
      <CircularProgress size={40} />
    </Box>
  );
};
