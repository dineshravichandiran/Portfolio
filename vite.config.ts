import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js is an inherently large library; it's already isolated into its
    // own lazy-loaded chunk (only Dashboard/Journey routes pull it in), so the
    // default 500kb warning here is just noise.
    chunkSizeWarningLimit: 600,
  },
})
