const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');
const oldStr = 'requestAnimationFrame(() => { ScrollTrigger.refresh(); });';
const newStr = oldStr + '\r\n\r\n      // CTA quote fade-up\r\n      if (ctaQuoteRef.current) {\r\n        gsap.to(ctaQuoteRef.current, {\r\n          opacity: 1, y: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaQuoteRef.current, start: \'top 85%\', end: \'top 40%\', scrub: 1 },\r\n        });\r\n      }\r\n\r\n      // CTA buttons slide in\r\n      if (ctaLeftRef.current && ctaRightRef.current) {\r\n        gsap.to(ctaLeftRef.current, {\r\n          x: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaRef.current, start: \'top 75%\', end: \'top 30%\', scrub: 1 },\r\n        });\r\n        gsap.to(ctaRightRef.current, {\r\n          x: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaRef.current, start: \'top 70%\', end: \'top 25%\', scrub: 1 },\r\n        });\r\n      }';
c = c.replace(oldStr, newStr);
fs.writeFileSync(f, c);
console.log(c.includes('ctaQuoteRef.current') ? 'done' : 'MISS');
