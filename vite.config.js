/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path/posix'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#native': path.resolve(__dirname, './src/native'),
      '#blocks': path.resolve(__dirname, './src/native/blocks'),
      '#elements': path.resolve(__dirname, './src/native/elements'),
      '#instances': path.resolve(__dirname, './src/native/instances'),
      '#geometries': path.resolve(__dirname, './src/native/geometries'),
      '#materials': path.resolve(__dirname, './src/native/materials'),
      '#tools': path.resolve(__dirname, './src/tools'),
    },
  },
  plugins: [vue()],
  base: '/atc-gjk/',
})
