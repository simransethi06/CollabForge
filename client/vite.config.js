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
}) 

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vercel } from 'vite-plugin-vercel'; // <-- Add the curly braces here!

export default defineConfig({
  plugins: [
    react(), 
    vercel()
  ],
  vercel: {
    rewrites: [
      { source: '/(.*)', destination: '/' }
    ]
  }
}); */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});