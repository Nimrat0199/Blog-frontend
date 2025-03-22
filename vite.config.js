import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: { //http://localhost:3000/https://blogbackend-production-dcc5.up.railway.app/https://blog-backend-zq11.onrender.com
      "/api": {
        target: "https://blog-backend-zq11.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
