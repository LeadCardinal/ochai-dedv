const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');

// Quote fade-up — trigger when quote enters viewport center
c = c.replace(
  "scrollTrigger: { trigger: ctaQuoteRef.current, start: 'top 85%', end: 'top 40%', scrub: 1 },",
  "scrollTrigger: { trigger: ctaQuoteRef.current, start: 'top 90%', end: 'center 50%', scrub: 1.5 },"
);

// Left button — start later, end later
c = c.replace(
  "scrollTrigger: { trigger: ctaRef.current, start: 'top 75%', end: 'top 30%', scrub: 1,",
  "scrollTrigger: { trigger: ctaRef.current, start: 'center 90%', end: 'center 50%', scrub: 1,"
);

// Right button — slight stagger after left
c = c.replace(
  "scrollTrigger: { trigger: ctaRef.current, start: 'top 70%', end: 'top 25%', scrub: 1,",
  "scrollTrigger: { trigger: ctaRef.current, start: 'center 85%', end: 'center 45%', scrub: 1,"
);

fs.writeFileSync(f, c);
console.log(c.includes("center 90%") ? 'done' : 'MISS');
