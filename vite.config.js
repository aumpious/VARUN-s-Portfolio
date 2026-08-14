import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/VARUN-s-Portfolio/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true,
    },
  },
})
