/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path/posix'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#components': path.resolve(__dirname, './src/components'),
      '#composables': path.resolve(__dirname, './src/composables'),
      '#tiles': path.resolve(__dirname, './src/components/tiles'),
    },
  },
  plugins: [vue()],
  build: {
    outDir: 'docs',
  },
})
