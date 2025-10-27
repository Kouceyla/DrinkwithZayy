
import path from "path" // 1. Ajoutez cette ligne en haut
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 2. Ajoutez toute cette section "resolve"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})