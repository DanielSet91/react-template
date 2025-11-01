import { mainConfig } from "./config";

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${mainConfig.API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export { get };
