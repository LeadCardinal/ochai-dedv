#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const CLEAN_CONTENT_REGEX = {
  comments: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
  templateLiterals: /`[\s\S]*?`/g,
  strings: /'[^']*'|"[^"]*"/g,
  jsxExpressions: /\{.*?\}/g,
  htmlEntities: {
    quot: /&quot;/g,
    amp: /&amp;/g,
    lt: /&lt;/g,
    gt: /&gt;/g,
    apos: /&apos;/g
  }
};

const EXTRACTION_REGEX = {
  route: /<Route\b[\s\S]*?\/>/g,
  path: /path=["']([^"']+)["']/,
  element: /element=\{\s*<(\w+)[^}]*\/?\s*>\s*\}/,
  helmet: /<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/i,
  helmetTest: /<Helmet[\s\S]*?<\/Helmet>/i,
  title: /<title[^>]*?>([\s\S]*?)<\/title>/i,
  description: /<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1/i,
  servicePage: /<ServicePage\b/,
  spPath: /\bpath=(["'])([^"']+)\1/,
  spTitle: /\btitle=(["'])([\s\S]*?)\1/,
  spDesc: /\bmetaDescription=(["'])([\s\S]*?)\1/,
  canonical: /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i
};

function cleanContent(content) {
  return content
    .replace(CLEAN_CONTENT_REGEX.comments, '')
    .replace(CLEAN_CONTENT_REGEX.templateLiterals, '""')
    .replace(CLEAN_CONTENT_REGEX.strings, '""');
}

function cleanText(text) {
  if (!text) return text;
  
  return text
    .replace(CLEAN_CONTENT_REGEX.jsxExpressions, '')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.quot, '"')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.amp, '&')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.lt, '<')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.gt, '>')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.apos, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractRoutes(appJsxPath) {
  if (!fs.existsSync(appJsxPath)) return new Map();

  try {
    const content = fs.readFileSync(appJsxPath, 'utf8');
    const routes = new Map();
    // Captures path + component in one pass; tolerant of multi-line Route tags
    const pairRegex = /<Route\b[^<]*?path=["']([^"']+)["'][\s\S]*?element=\{\s*<(\w+)/g;

    for (const match of content.matchAll(pairRegex)) {
      const rawPath = match[1];
      const componentName = match[2];
      const routePath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
      // First mapping wins (a component can appear in multiple routes)
      if (!routes.has(componentName)) {
        routes.set(componentName, routePath);
      }
    }

    return routes;
  } catch (error) {
    return new Map();
  }
}

function findReactFiles(dir) {
  return fs.readdirSync(dir).map(item => path.join(dir, item));
}

// Strip block comments and whole-line // comments only. The old cleaner also
// removed everything after "https://" on a line, which mangled the Helmet
// block and silently dropped most pages from llms.txt.
function stripComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

const SITE_ORIGIN = 'https://ochai.dev';
const EXCLUDED_URLS = new Set(['/preview']);

function toAbsolute(url) {
  if (/^https?:\/\//.test(url)) return url;
  return `${SITE_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`;
}

function extractHelmetData(content, filePath, routes) {
  const code = stripComments(content);
  const fileName = path.basename(filePath, path.extname(filePath));
  const routeUrl = routes.size && routes.has(fileName)
    ? routes.get(fileName)
    : generateFallbackUrl(fileName);

  // Templated pages: <ServicePage path title metaDescription ... />
  if (EXTRACTION_REGEX.servicePage.test(code)) {
    const title = cleanText(code.match(EXTRACTION_REGEX.spTitle)?.[2]);
    const description = cleanText(code.match(EXTRACTION_REGEX.spDesc)?.[2]);
    const spPath = code.match(EXTRACTION_REGEX.spPath)?.[2];
    if (!title) return null;
    return {
      url: toAbsolute(spPath || routeUrl),
      title,
      description: description || 'No description available'
    };
  }

  // Pages may hold more than one <Helmet> (e.g. conditional states); use the first with a title.
  const blocks = [...code.matchAll(/<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/gi)].map(m => m[1]);
  const found = blocks.find(b => EXTRACTION_REGEX.title.test(b));
  if (!found) return null;

  // Resolve {CONST} / content={CONST} references to top-level string constants in the file.
  const consts = new Map();
  for (const m of code.matchAll(/^const\s+([A-Z_][A-Z0-9_]*)\s*=\s*(["'])([\s\S]*?)\2\s*;/gm)) consts.set(m[1], m[3]);
  const helmetContent = found
    .replace(/(content|href)=\{([A-Z_][A-Z0-9_]*)\}/g, (all, attr, name) => consts.has(name) ? `${attr}="${consts.get(name)}"` : all)
    .replace(/\{([A-Z_][A-Z0-9_]*)\}/g, (all, name) => consts.has(name) ? consts.get(name) : all);

  const title = cleanText(helmetContent.match(EXTRACTION_REGEX.title)?.[1]);
  const description = cleanText(helmetContent.match(EXTRACTION_REGEX.description)?.[2]);
  const canonical = helmetContent.match(EXTRACTION_REGEX.canonical)?.[1];

  return {
    url: toAbsolute(routeUrl.startsWith('/') && routes.has(fileName) ? routeUrl : (canonical || routeUrl)),
    title: title || 'Untitled Page',
    description: description || 'No description available'
  };
}

function generateFallbackUrl(fileName) {
  const cleanName = fileName.replace(/Page$/, '').toLowerCase();
  return cleanName === 'app' ? '/' : `/${cleanName}`;
}

const SITE_NAME = 'OchAI';
const SITE_TAGLINE = 'AI implementation specialist and full-stack developer based in Huntsville, Alabama — Claude API, Adobe Firefly, and ElevenLabs integration, with verifiable Lighthouse-score results across production sites.';

function generateLlmsTxt(pages) {
  const sortedPages = pages.filter(p => !EXCLUDED_URLS.has(p.url.replace(SITE_ORIGIN, ''))).sort((a, b) => a.title.localeCompare(b.title));
  const pageEntries = sortedPages.map(page => 
    `- [${page.title}](${page.url}): ${page.description}`
  ).join('\n');
  
  return `# ${SITE_NAME}\n\n> ${SITE_TAGLINE}\n\n## Pages\n${pageEntries}\n`;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function processPageFile(filePath, routes) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return extractHelmetData(content, filePath, routes);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');

  let pages = [];
  
  if (!fs.existsSync(pagesDir)) {
    pages.push(processPageFile(appJsxPath, []))
    pages = pages.filter(Boolean);
  } else {
    const routes = extractRoutes(appJsxPath);
    const reactFiles = findReactFiles(pagesDir);

    pages = reactFiles
      .map(filePath => processPageFile(filePath, routes))
      .filter(Boolean);
  }

  if (pages.length === 0) {
    console.error('❌ No pages with Helmet components found!');
    process.exit(1);
  }


  const llmsTxtContent = generateLlmsTxt(pages);
  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
  
  ensureDirectoryExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
}

const isMainModule = import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  main();
}
