const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace('href="https://ochai.dev/#case-studies"', 'href="/#case-studies"');
fs.writeFileSync(f, c);
console.log(c.includes('/#case-studies') ? 'done' : 'MISS');
