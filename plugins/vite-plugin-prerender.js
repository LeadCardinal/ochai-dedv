/**
 * vite-plugin-prerender.js
 *
 * Lightweight build-time prerenderer for Vite 4 + React 18.
 * No puppeteer. No eval. No Vite 5 peer-dep conflicts.
 *
 * Strategy:
 *  - Runs AFTER Vite emits the SPA bundle into dist/
 *  - Spawns a child Node process to render each route via renderToStaticMarkup
 *  - Injects rendered HTML into the SPA shell and writes route/index.html
 *
 * The homepage (/) is intentionally excluded — its load sequence
 * is hand-tuned for Lighthouse and must remain a pure SPA shell.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { spawnSync } from 'child_process';

/**
 * @param {string[]} routes - paths to prerender e.g. ['/services', '/biography']
 */
export default function prerenderPlugin(routes = []) {
  return {
    name: 'vite-prerender',
    enforce: 'post',
    apply: 'build',

    async closeBundle() {
      const outDir = resolve('dist');
      const shellPath = join(outDir, 'index.html');

      if (!existsSync(shellPath)) {
        console.warn('[prerender] dist/index.html not found — skipping prerender.');
        return;
      }

      const shell = readFileSync(shellPath, 'utf-8');
      const rendererPath = resolve('./plugins/prerender-worker.mjs');

      for (const route of routes) {
        console.log(`[prerender] rendering ${route}`);

        const result = spawnSync(
          process.execPath,
          [rendererPath, route],
          {
            encoding: 'utf-8',
            env: { ...process.env, NODE_ENV: 'production' },
            timeout: 30000,
          }
        );

        if (result.error || result.status !== 0) {
          console.warn(`[prerender] WARN: ${route} failed — writing shell only`);
          if (result.stderr) console.warn(result.stderr.slice(0, 400));
          continue;
        }

        const rendered = result.stdout.trim();

        const out = shell.replace(
          '<div id="root"></div>',
          `<div id="root">${rendered}</div>`
        );

        const routeDir = join(outDir, route.replace(/^\//, ''));
        mkdirSync(routeDir, { recursive: true });
        writeFileSync(join(routeDir, 'index.html'), out, 'utf-8');
        console.log(`[prerender] wrote dist${route}/index.html`);
      }

      console.log(`[prerender] Done — ${routes.length} routes processed.`);
    },
  };
}
