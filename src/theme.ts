import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#176b52", dark: "#104d3b", light: "#e7f2ec" },
    background: { default: "#f7f8fa", paper: "#ffffff" },
    text: { primary: "#202b36", secondary: "#66737f" },
    divider: "#e6e9ed",
  },
  typography: {
    fontFamily: '"Segoe UI", Inter, system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.055em", lineHeight: 1.08 },
    h2: { fontWeight: 700, letterSpacing: "-0.035em" },
    h5: { fontWeight: 650, letterSpacing: "-0.02em" },
    h6: { fontWeight: 650 },
    button: { textTransform: "none", fontWeight: 600 },
    body1: { lineHeight: 1.75 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { padding: "10px 20px" } },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});
