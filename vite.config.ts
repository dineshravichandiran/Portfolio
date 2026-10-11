import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getYearsExperienceLabel } from './src/utils/experience.ts'

// Fills the experience figure in the page meta tags at build time, so search
// and social previews follow the same date as the rest of the site.
const yearsInMeta = () => ({
  name: 'years-in-meta',
  transformIndexHtml: (html: string) => html.replaceAll('%YEARS_EXPERIENCE%', getYearsExperienceLabel()),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), yearsInMeta()],
  build: {
    // three.js is an inherently large library; it's already isolated into its
    // own lazy-loaded chunk (only Dashboard/Journey routes pull it in), so the
    // default 500kb warning here is just noise.
    chunkSizeWarningLimit: 600,
  },
})
