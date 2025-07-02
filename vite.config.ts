import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
    open: true,
    watch: {
      ignored: ['**/backend/**', '**/venv/**', '**/*.py']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['venv'],
  },
  build: {
    rollupOptions: {
      external: [
        /venv\//,
        /backend\//,
      ],
    },
    commonjsOptions: {
      exclude: ['**/venv/**', '**/backend/**'],
    }
  }
})
