/**
 * prerender-worker.mjs
 *
 * Uses Vite's own SSR API (ssrLoadModule) to load and render the React app.
 * This avoids @babel/register entirely — Vite handles JSX + @ alias natively.
 *
 * Called by vite-plugin-prerender.js as a child process.
 * argv[2] = route path to render
 * Prints rendered HTML to stdout on success, exits 1 on failure.
 */

import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');
const route = process.argv[2] || '/';

// ── Minimal browser global stubs ──────────────────────────────────────────────
const noop = () => {};
const mockMatchMedia = () => ({
  matches: false, addListener: noop, removeListener: noop,
  addEventListener: noop, removeEventListener: noop,
});

if (typeof global.window === 'undefined') {
  const mockHistory = {
    pushState: noop, replaceState: noop, go: noop, back: noop, forward: noop,
    length: 1, state: null, scrollRestoration: 'auto',
  };
  Object.defineProperty(global, 'window', {
    value: {
      matchMedia: mockMatchMedia, addEventListener: noop, removeEventListener: noop,
      location: { href: 'http://localhost/', pathname: route, search: '', hash: '', origin: 'http://localhost' },
      history: mockHistory,
      scrollTo: noop, devicePixelRatio: 1, innerWidth: 1280, innerHeight: 800,
      self: undefined,
    },
    writable: true, configurable: true,
  });
}
if (typeof global.document === 'undefined') {
  Object.defineProperty(global, 'document', {
    value: {
      createElement: (t) => ({ setAttribute: noop, style: {}, appendChild: noop, tagName: t }),
      head: { appendChild: noop, removeChild: noop },
      body: { appendChild: noop, removeChild: noop },
      getElementById: () => null, addEventListener: noop, removeEventListener: noop,
      querySelector: () => null, querySelectorAll: () => [],
    },
    writable: true, configurable: true,
  });
}
try {
  Object.defineProperty(global, 'navigator', {
    value: { userAgent: 'node' }, writable: true, configurable: true,
  });
} catch (_) {}

global.sessionStorage = { getItem: () => null, setItem: noop, removeItem: noop };
global.localStorage = { getItem: () => null, setItem: noop, removeItem: noop };
global.requestAnimationFrame = noop;
global.cancelAnimationFrame = noop;
global.THREE = undefined;
global.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
global.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
// DOM element class stubs — framer-motion checks instanceof SVGElement at render time
global.SVGElement = class SVGElement {};
global.HTMLElement = class HTMLElement {};
global.Element = class Element {};
global.Node = class Node {};
global.Event = class Event { constructor(t) { this.type = t; } };
global.CustomEvent = class CustomEvent extends global.Event {};

// ── Load app via Vite SSR ─────────────────────────────────────────────────────
let vite;
try {
  vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
    ssr: { noExternal: ['react-helmet'] },
  });

  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');

  const html = renderToStaticMarkup(
    React.createElement(App, { ssrLocation: route })
  );

  process.stdout.write(html);
  await vite.close();
  process.exit(0);
} catch (err) {
  process.stderr.write(`[prerender-worker] ${route}: ${err.message}\n${err.stack}\n`);
  if (vite) await vite.close();
  process.exit(1);
}
