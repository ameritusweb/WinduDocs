// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Your Vite configuration here
  plugins: [
    // Your Vite plugins here
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
})
