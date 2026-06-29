const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  'const applauseAudio = typeof window !== \'undefined\' ? new Audio(\'/audio/applause.mp3\') : null;\r\nlet userHasInteracted = false;\r\nif (typeof window !== \'undefined\') {\r\n  window.addEventListener(\'pointerdown\', () => { userHasInteracted = true; }, { once: true });\r\n}\r\n\r\nfunction playApplause() {\r\n  if (!applauseAudio || !userHasInteracted) return;\r\n  applauseAudio.currentTime = 0;\r\n  applauseAudio.volume = 0.35;\r\n  applauseAudio.play().catch(() => {});\r\n}',
  'const applauseAudio = typeof window !== \'undefined\' ? new Audio(\'/audio/applause.mp3\') : null;\r\n\r\nfunction playApplause() {\r\n  if (!applauseAudio) return;\r\n  applauseAudio.currentTime = 0;\r\n  applauseAudio.volume = 0.35;\r\n  applauseAudio.play().catch(() => {});\r\n}'
);
fs.writeFileSync(f, c);
console.log(c.includes('userHasInteracted') ? 'MISS' : 'done');
