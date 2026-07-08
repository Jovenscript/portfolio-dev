import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' → funciona em GitHub Pages (projeto ou domínio próprio) sem ajustes
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three'
            if (id.includes('framer-motion')) return 'motion'
          }
        },
      },
    },
  },
})
