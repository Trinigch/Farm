import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    // 👇 ESTA LÍNEA HACE QUE TODAS LAS RUTAS SEAN MANEJADAS POR REACT ROUTER
   // historyApiFallback: true,
  },
});