import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps every asset path relative, so the build works on
// GitHub Pages project sites (/<repo>/) as well as at a domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
});
