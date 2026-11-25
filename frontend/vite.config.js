import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
    // In dev mode (npm run dev) forward API calls to Spring Boot on :8080
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
