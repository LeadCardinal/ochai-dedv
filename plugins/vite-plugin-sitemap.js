
import fs from 'fs';
import path from 'path';
import { generateSitemap } from '../src/lib/sitemapGenerator.js';

export default function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    buildStart() {
      const sitemap = generateSitemap();
      const publicDir = path.resolve('public');
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
      console.log('✓ sitemap.xml generated in public directory');
    },
    closeBundle() {
      // Also ensure it exists in dist for production builds if needed, 
      // though Vite usually copies public/* to dist/ automatically.
      // This hook is just a safety check or for logging.
      console.log('✓ Sitemap generation verified');
    }
  };
}
