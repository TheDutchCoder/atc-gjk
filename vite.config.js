/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path/posix'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#blocks': path.resolve(__dirname, './src/blocks'),
      '#classes': path.resolve(__dirname, './src/classes'),
      '#elements': path.resolve(__dirname, './src/elements'),
      '#instances': path.resolve(__dirname, './src/instances'),
      '#geometries': path.resolve(__dirname, './src/geometries'),
      '#materials': path.resolve(__dirname, './src/materials'),
      '#colors': path.resolve(__dirname, './src/colors'),
      '#tools': path.resolve(__dirname, './src/tools'),
    },
  },
  plugins: [vue()],
  build: {
    target: 'esnext',
  },
})
