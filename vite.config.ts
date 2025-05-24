import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true,
    }),
    react()
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    reportCompressedSize: true,
  },
})
