const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace('© {currentYear} AI Portfolio. All rights reserved.', '© {currentYear} OchAI — Jeremy Och. All rights reserved.');
fs.writeFileSync(f, c);
console.log(c.includes('OchAI') ? 'done' : 'MISS');
