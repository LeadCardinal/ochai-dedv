import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import prerenderPlugin from './plugins/vite-plugin-prerender.js';

const PRERENDER_ROUTES = [
  '/services',
  '/biography',
  '/showcase',
  '/security',
  '/case-study/reallivebonsai',
  '/case-study/hsvdrone',
  '/case-study/themeaningsoflife',
];

export default defineConfig({
  plugins: [
    react(),
    prerenderPlugin(PRERENDER_ROUTES),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },
});
