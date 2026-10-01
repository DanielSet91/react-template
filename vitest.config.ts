import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    env: { VITE_API_BASE_URL: 'http://localhost:8000' },
  },
});
