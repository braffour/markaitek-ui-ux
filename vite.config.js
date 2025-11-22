import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // GitHub Pages base path (remove this line if using custom domain)
  base: '/markaitek-ui-ux/',
  
  // Tauri expects a fixed port in development
  server: {
    port: 3000,
    strictPort: true,
    open: false
  },
  
  // Important for Tauri
  clearScreen: false,
  
  // Build configuration for Tauri
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})

