import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: loadEnv(mode, '.').VITE_USE_POLLING === 'true',
    },
  },
}))
