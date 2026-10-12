/**
 * generate-markdown.mjs
 *
 * Post-build step (runs after `vite build` + prerender). For every prerendered
 * page in dist/, writes a markdown twin next to it (dist/<route>/index.md) and
 * injects <link rel="alternate" type="text/markdown"> into the page's <head>.
 *
 * Same content as the HTML, just cleaner for AI agents. Humans never see it.
 * Never fails the build: any error is logged and skipped.
 */
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';

const DIST = path.resolve('dist');
const ORIGIN = 'https://ochai.dev';

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.remove(['script', 'style', 'noscript', 'svg', 'video', 'iframe', 'canvas', 'nav']);
// Decorative images (empty alt) are noise for agents.
td.addRule('dropDecorativeImages', {
  filter: (n) => n.nodeName === 'IMG' && !(n.getAttribute('alt') || '').trim(),
  replacement: () => '',
});
// Card-style links wrap block content; flatten to a single-line markdown link.
td.addRule('flatLinks', {
  filter: (n) => n.nodeName === 'A' && n.getAttribute('href'),
  replacement: (content, n) => {
    const text = content.replace(/\s+/g, ' ').trim();
    return text ? `[${text}](${n.getAttribute('href')})` : '';
  },
});

// Only publish twins for URLs that are in the sitemap (skips /preview and any private/static pages).
const sitemapPaths = new Set();
try {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapPaths.add(new URL(m[1].trim()).pathname.replace(/\/+$/, '') || '/');
  }
} catch {
  console.warn('[markdown] sitemap.xml not found - skipping all pages');
}

const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");

const pick = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1].trim()) : '';
};

function findPages(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'videos' || entry.name === 'cdn-cgi') continue;
      findPages(full, out);
    } else if (entry.name === 'index.html') {
      out.push(full);
    }
  }
  return out;
}

const yaml = (s) => JSON.stringify(s); // safe quoting for YAML scalars

let written = 0;
let bytes = 0;

try {
  for (const file of findPages(DIST)) {
    try {
      let html = fs.readFileSync(file, 'utf8');
      if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)) continue;

      const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
      const route = rel ? `/${rel}/` : '/';
      const mdHref = `${route}index.md`;
      if (!sitemapPaths.has(route.replace(/\/+$/, '') || '/')) continue;

      const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
      const description = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
      const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || `${ORIGIN}${route}`;

      const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
      const body = mainMatch ? mainMatch[0] : (html.match(/<body[\s\S]*?<\/body>/i) || [''])[0];
      if (!body) continue;

      let md = td.turndown(body)
        .replace(/\]\(\//g, `](${ORIGIN}/`) // absolute internal links + images
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      if (!md) continue;

      const doc = `---\ntitle: ${yaml(title)}\ndescription: ${yaml(description)}\nurl: ${canonical}\n---\n\n${md}\n`;
      fs.writeFileSync(path.join(path.dirname(file), 'index.md'), doc, 'utf8');
      written += 1;
      bytes += Buffer.byteLength(doc);

      if (!html.includes('type="text/markdown"')) {
        html = html.replace(
          /<\/head>/i,
          `<link rel="alternate" type="text/markdown" href="${mdHref}" title="Markdown version" /></head>`
        );
        fs.writeFileSync(file, html, 'utf8');
      }
    } catch (err) {
      console.warn(`[markdown] skipped ${file}: ${err.message}`);
    }
  }
} catch (err) {
  console.warn(`[markdown] failed (non-fatal): ${err.message}`);
}

// Restrict the Pages Function (functions/_middleware.js) to sitemap routes only, so
// static assets (/assets, images, video) never invoke it.
try {
  if (sitemapPaths.size > 0) {
    const include = [];
    for (const p of sitemapPaths) {
      if (p === '/') include.push('/');
      else include.push(p, `${p}/`);
    }
    fs.writeFileSync(path.join(DIST, '_routes.json'), JSON.stringify({ version: 1, include, exclude: [] }, null, 2), 'utf8');
  }
} catch (err) {
  console.warn(`[markdown] _routes.json failed (non-fatal): ${err.message}`);
}

console.log(`[markdown] wrote ${written} markdown twins (${(bytes / 1024).toFixed(1)} KB total)`);
