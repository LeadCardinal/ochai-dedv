/**
 * main-ssg.jsx — SSG entry point for build-time prerendering.
 *
 * Exports a createApp function consumed by vite-plugin-ssg.
 * The SPA runtime still uses main.jsx unchanged — this file
 * is build-only and never shipped to the browser.
 *
 * BrowserRouter is replaced with StaticRouter during SSG;
 * the plugin handles the router swap automatically.
 */
import React from 'react';
import App from '@/App';
import '@/index.css';

export function createApp() {
  return {
    app: <App />,
  };
}
