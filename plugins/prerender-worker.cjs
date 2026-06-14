/**
 * prerender-worker.cjs
 *
 * CommonJS worker — spawned by vite-plugin-prerender.js as a child process.
 * Receives a route path as argv[2], renders the React app to static markup,
 * prints the HTML string to stdout.
 *
 * Pure CJS avoids the ESM/CJS boundary issues with @babel/register on Windows.
 */

'use strict';

const path = require('path');
const root = path.resolve(__dirname, '..');

// ── Mock browser globals (before any React/framer imports) ────────────────────
const mockMatchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
});

if (typeof global.window === 'undefined') {
  Object.defineProperty(global, 'window', {
    value: {
      matchMedia: mockMatchMedia,
      addEventListener: () => {},
      removeEventListener: () => {},
      location: { href: '', pathname: '/', search: '', hash: '' },
      history: { pushState: () => {}, replaceState: () => {} },
      scrollTo: () => {},
      devicePixelRatio: 1,
      innerWidth: 1280,
      innerHeight: 800,
    },
    writable: true,
    configurable: true,
  });
}

if (typeof global.document === 'undefined') {
  Object.defineProperty(global, 'document', {
    value: {
      createElement: (tag) => ({
        setAttribute: () => {},
        style: {},
        appendChild: () => {},
        tagName: tag.toUpperCase(),
        nodeName: tag.toUpperCase(),
      }),
      head: { appendChild: () => {}, removeChild: () => {} },
      body: { appendChild: () => {}, removeChild: () => {} },
      getElementById: () => null,
      addEventListener: () => {},
      removeEventListener: () => {},
      querySelector: () => null,
      querySelectorAll: () => [],
      createTextNode: (t) => ({ nodeType: 3, nodeValue: t }),
    },
    writable: true,
    configurable: true,
  });
}

// Node 24 has a built-in navigator — override it carefully
try {
  Object.defineProperty(global, 'navigator', {
    value: { userAgent: 'node', platform: 'Win32' },
    writable: true,
    configurable: true,
  });
} catch (_) { /* already defined and non-configurable — leave it */ }

if (typeof global.sessionStorage === 'undefined') {
  global.sessionStorage = { getItem: () => null, setItem: () => {} };
}
global.requestAnimationFrame = (cb) => { setTimeout(cb, 0); return 0; };
global.cancelAnimationFrame = () => {};
global.THREE = undefined;
global.ResizeObserver = class ResizeObserver { observe() {} unobserve() {} disconnect() {} };
global.IntersectionObserver = class IntersectionObserver { observe() {} unobserve() {} disconnect() {} };

// ── Babel register ────────────────────────────────────────────────────────────
require('@babel/register')({
  cwd: root,
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    ['module-resolver', {
      root: [root],
      alias: { '@': path.resolve(root, 'src') },
    }],
  ],
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/],
  cache: false,
});

// ── Render ────────────────────────────────────────────────────────────────────
const route = process.argv[2] || '/';

try {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const { StaticRouter } = require('react-router-dom/server');
  const App = require(path.resolve(root, 'src/App.jsx')).default;

  const html = renderToStaticMarkup(
    React.createElement(
      StaticRouter,
      { location: route },
      React.createElement(App)
    )
  );

  process.stdout.write(html);
  process.exit(0);
} catch (err) {
  process.stderr.write(`[prerender-worker] ${route}: ${err.message}\n${err.stack}\n`);
  process.exit(1);
}
