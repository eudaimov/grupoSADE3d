import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Esto expone el servidor en tu red local
    port: 5173, // Cambia el puerto si lo necesitas
  },
  base: '/grupoSADE3d/',
  build:{
    outDir:'docs',
    emptyOutDir: true
  }
});