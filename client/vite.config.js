/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
}) */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel'; // 1. Add this import

export default defineConfig({
  plugins: [
    react(), 
    vercel() // 2. Add this plugin to the array
  ],
  vercel: { // 3. Add this configuration object right here
    rewrites: [
      { source: '/(.*)', destination: '/' }
    ]
  }
});