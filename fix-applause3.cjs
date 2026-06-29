const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  '        gsap.to(ctaLeftRef.current, {\r\n          x: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaRef.current, start: \'top 75%\', end: \'top 30%\', scrub: 1 },\r\n        });\r\n        gsap.to(ctaRightRef.current, {\r\n          x: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaRef.current, start: \'top 70%\', end: \'top 25%\', scrub: 1 },\r\n        });',
  '        gsap.set(ctaLeftRef.current, { pointerEvents: \'none\' });\r\n        gsap.set(ctaRightRef.current, { pointerEvents: \'none\' });\r\n        gsap.to(ctaLeftRef.current, {\r\n          x: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaRef.current, start: \'top 75%\', end: \'top 30%\', scrub: 1,\r\n            onEnterBack: () => gsap.set(ctaLeftRef.current, { pointerEvents: \'none\' }),\r\n            onLeave: () => gsap.set(ctaLeftRef.current, { pointerEvents: \'auto\' }) },\r\n        });\r\n        gsap.to(ctaRightRef.current, {\r\n          x: 0, ease: \'power2.out\',\r\n          scrollTrigger: { trigger: ctaRef.current, start: \'top 70%\', end: \'top 25%\', scrub: 1,\r\n            onEnterBack: () => gsap.set(ctaRightRef.current, { pointerEvents: \'none\' }),\r\n            onLeave: () => gsap.set(ctaRightRef.current, { pointerEvents: \'auto\' }) },\r\n        });'
);
fs.writeFileSync(f, c);
console.log(c.includes('pointerEvents') ? 'done' : 'MISS');
