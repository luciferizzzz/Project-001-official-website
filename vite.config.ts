import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is a single prerendered page. The production build runs a
// server-render pass (scripts/prerender.mjs) after the client build so that
// the main content is present in the HTML before hydration.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
