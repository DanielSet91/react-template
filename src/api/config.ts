const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  || (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === "true" ? `${window.location.origin}/api` : "");

if (!apiBaseUrl) {
  throw new Error("Set VITE_API_BASE_URL in .env (see .env.example).");
}

export const mainConfig = {
  API_BASE_URL: apiBaseUrl,
};
