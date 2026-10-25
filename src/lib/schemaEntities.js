// Shared schema.org entity references so every page's JSON-LD points at the
// same business (the #organization node defined on the homepage) and the same
// service area. Edit the city list here, not page by page.

export const SITE = 'https://ochai.dev';
export const ORG_ID = `${SITE}/#organization`;
export const FOUNDER_ID = `${SITE}/#founder`;

const alabama = { '@type': 'State', name: 'Alabama' };
const city = (name) => ({ '@type': 'City', name, containedInPlace: alabama });

export const AREA_SERVED = [
  city('Huntsville'),
  city('Madison'),
  city('Decatur'),
  city('Athens'),
  city('Hartselle'),
  city('Florence'),
  city('Cullman'),
  city('Birmingham'),
  city('Tuscaloosa'),
  { '@type': 'AdministrativeArea', name: 'North Alabama' },
  { '@type': 'Country', name: 'United States' },
];

// BreadcrumbList as a JSON string, ready for <script type="application/ld+json">.
// crumbs: [{ name, path }] after the implicit "OchAI" home crumb; path like '/services/'.
export const breadcrumbJsonLd = (crumbs) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'OchAI', item: `${SITE}/` },
    ...crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 2, name: c.name, item: `${SITE}${c.path}` })),
  ],
});
