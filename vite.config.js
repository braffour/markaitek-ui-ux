import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Conditionally set base path:
  // - GitHub Pages: '/markaitek-ui-ux/' (subdirectory)
  // - Tauri builds: '/' (root, loads from tauri://localhost)
  // - Local dev: '/' (root)
  base: process.env.GITHUB_PAGES === 'true' ? '/markaitek-ui-ux/' : '/',
  
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

