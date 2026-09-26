import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { theme } from "../theme";
import { ToastProvider } from "../context/toast/ToastProvider";
export function renderWithProviders(ui: ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return { client, ...render(<ThemeProvider theme={theme}><ToastProvider><QueryClientProvider client={client}>{ui}</QueryClientProvider></ToastProvider></ThemeProvider>) };
}
