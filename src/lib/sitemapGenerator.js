
export const generateSitemap = (baseUrl = 'https://aiportfolio.com') => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const routes = [
    { path: '/', priority: '1.0' },
    { path: '/case-study/reallivebonsai', priority: '0.8' },
    { path: '/case-study/hsvdrone', priority: '0.8' },
    { path: '/case-study/themeaningsoflife', priority: '0.8' }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};
