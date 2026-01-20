
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redireciona chamadas locais de /api-proxy para o servidor real
      '/api-proxy': {
        target: 'https://lojas.vlks.com.br/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
      },
    },
  },
});
