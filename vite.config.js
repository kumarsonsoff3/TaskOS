import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'views', // specify the views directory for frontend code
  build: {
    outDir: '../dist', // Output to the main directory's dist folder
    emptyOutDir: true,
  },
  server: {
    hmr: {
      port: 24679, // Ensure unique HMR WebSocket port for Dev Mode
    }
  }
});
