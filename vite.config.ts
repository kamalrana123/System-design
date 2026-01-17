import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' should be your repository name for GitHub Pages, e.g., '/my-repo-name/'
  // If you are using a custom domain, '/' is fine.
  // Using './' ensures assets are linked relatively, which is often safe for HashRouter + GH Pages.
  base: './', 
})