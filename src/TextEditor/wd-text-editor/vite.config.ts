/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Your Vite configuration here
  plugins: [
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      pretendToBeVisual: true
    },
    coverage: {
      provider: 'v8',
      enabled: true
    },
    setupFiles: './src/test/setup.ts',
    css: true,
  }
})
