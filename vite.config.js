import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js is only pulled in by the lazy-loaded 3D components, so it stays off the critical path
  build: { chunkSizeWarningLimit: 1200 },
})
