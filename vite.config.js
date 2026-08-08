import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import prerenderPlugin from './plugins/vite-plugin-prerender.js';

// trigger: forcing rebuild to verify /showcase + /logos prerender output on Cloudflare — 2026-08-08
const PRERENDER_ROUTES = [
  '/',
  '/services',
  '/apps',
  '/biography',
  '/showcase',
  '/security',
  '/case-study/reallivebonsai',
  '/case-study/hsvdrone',
  '/case-study/themeaningsoflife',
  '/performance',
  '/logos',
  '/preview',
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
