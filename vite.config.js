import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src',                        // 👈 tells Vite source folder
  build: {
    outDir: '../dist',                // 👈 put build outside src
  },
  base: '/React.js-Food-order-app/',  // 👈 required for GitHub Pages
})
