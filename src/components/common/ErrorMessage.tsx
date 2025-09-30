import { Box, Typography } from "@mui/material";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <Box>
      <Typography color={"error"} sx={{ fontSize: "14px" }}>
        Error: {error}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
