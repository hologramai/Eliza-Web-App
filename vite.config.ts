import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
    open: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Exclude backend directory from Vite processing
  optimizeDeps: {
    exclude: ['backend']
  },
  // Don't watch backend files
  server: {
    port: 8080,
    host: true,
    open: true,
    watch: {
      ignored: ['**/backend/**', '**/venv/**', '**/*.py']
    }
  }
})