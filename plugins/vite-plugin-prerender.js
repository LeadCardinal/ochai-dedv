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

import { readFileSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'fs';
import { resolve, join } from 'path';
import { spawnSync } from 'child_process';

// Route -> lazy page chunk. Reads the route table in src/App.jsx and Vite's build manifest.
function routeChunkMap() {
  const app = readFileSync(resolve('src/App.jsx'), 'utf-8');
  const loaderSrc = {};
  for (const m of app.matchAll(/(\w+):\s*\(\)\s*=>\s*import\("@\/pages\/(\w+)"\)/g)) loaderSrc[m[1]] = `src/pages/${m[2]}.jsx`;
  const routeLoader = {};
  for (const m of app.matchAll(/"(\/[^"]*)":\s*L\.(\w+)/g)) routeLoader[m[1]] = m[2];
  return { loaderSrc, routeLoader };
}

// A manifest entry's built file plus everything it statically imports.
function chunkFilesFor(manifest, entryKey) {
  const seen = new Set();
  const files = [];
  const walk = (k) => {
    if (seen.has(k) || !manifest[k]) return;
    seen.add(k);
    files.push(manifest[k].file);
    (manifest[k].imports || []).forEach(walk);
  };
  walk(entryKey);
  return files;
}

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
      let manifest = null;
      const manifestPath = join(outDir, '.vite', 'manifest.json');
      try { if (existsSync(manifestPath)) manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')); } catch { manifest = null; }
      const { loaderSrc, routeLoader } = routeChunkMap();
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

        let parsed;
        try {
          parsed = JSON.parse(result.stdout.trim());
        } catch (e) {
          console.warn(`[prerender] WARN: ${route} - could not parse worker output as JSON, writing shell only`);
          continue;
        }

        let out = shell.replace(
          '<div id="root"></div>',
          `<div id="root">${parsed.body}</div>`
        );

        // Strip the shell's default page-specific tags so this route's own
        // Helmet output replaces them instead of stacking duplicates.
        out = out.replace(/<title>[\s\S]*?<\/title>/, '');
        out = out.replace(/<meta name="description"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:title"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:description"[^>]*>\s*/, '');
        out = out.replace(/<meta name="twitter:title"[^>]*>\s*/, '');
        out = out.replace(/<meta name="twitter:description"[^>]*>\s*/, '');
        out = out.replace(/<link rel="canonical"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:url"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:video:height"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:video:width"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:video:type"[^>]*>\s*/, '');
        out = out.replace(/<meta property="og:video"[^>]*>\s*/, '');

        const canonicalUrl = route === '/' ? 'https://ochai.dev/' : `https://ochai.dev${route}/`;
        const pageHasCanonical = parsed.head.link && parsed.head.link.includes('rel="canonical"');
        const pageHasOgUrl = parsed.head.meta && parsed.head.meta.includes('property="og:url"');
        const ogUrlTag = pageHasOgUrl ? '' : `<meta property="og:url" content="${canonicalUrl}" />`;
        const canonicalTag = pageHasCanonical ? '' : `<link rel="canonical" href="${canonicalUrl}" />`;
        const helmetHead = [
          parsed.head.title,
          parsed.head.meta,
          parsed.head.link,
          canonicalTag,
          ogUrlTag,
        ].filter(Boolean).join('\n\t\t');

        if (out.includes('<!-- VideoObject Structured Data')) {
          out = out.replace(
            '<!-- VideoObject Structured Data',
            `${helmetHead}\n\n\t\t<!-- VideoObject Structured Data`
          );
        } else {
          out = out.replace('</head>', `${helmetHead}\n\t</head>`);
        }

        if (parsed.head.script) {
          out = out.replace('</head>', `${parsed.head.script}\n\t</head>`);
        }

        // Perf (every route except the hand-tuned homepage):
        //  1) the shell preloads the HOMEPAGE hero poster; other routes never show it.
        //  2) preload this route's page chunk (+ static deps) so it downloads in parallel with the
        //     entry script instead of after it (main.jsx awaits it before mounting).
        if (route !== '/') {
          out = out.replace(/<!--\s*LCP Preload[\s\S]*?-->\s*/, '');
          out = out.replace(/<link\b[^>]*\bhref="\/videos\/hero_[^"]*"[^>]*>\s*/g, '');
          const entryKey = loaderSrc[routeLoader[route]];
          if (manifest && entryKey && manifest[entryKey]) {
            const tags = chunkFilesFor(manifest, entryKey)
              .filter((f) => !out.includes(`/${f}"`))
              .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`);
            if (tags.length) out = out.replace('</head>', `\t\t${tags.join('\n\t\t')}\n\t</head>`);
          }
        }

        const routeDir = join(outDir, route.replace(/^\//, ''));
        mkdirSync(routeDir, { recursive: true });
        writeFileSync(join(routeDir, 'index.html'), out, 'utf-8');
        console.log(`[prerender] wrote dist${route}/index.html`);
      }

      // The manifest was only needed here; keep dist identical to before.
      try { rmSync(join(outDir, '.vite'), { recursive: true, force: true }); } catch { /* ignore */ }

      console.log(`[prerender] Done — ${routes.length} routes processed.`);
    },
  };
}
