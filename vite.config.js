import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Store/',
  server: {
    proxy: {
      '/api': {
        target: 'https://fakestoreapi.com/products', // Target API server
        changeOrigin: true, // Allow CORS
        secure: false, // Allow HTTPS
      }
    }
  }
})
