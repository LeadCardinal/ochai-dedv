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
