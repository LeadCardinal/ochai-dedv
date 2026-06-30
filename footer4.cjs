const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');
const oldBlock = "return social.url ? (\r\n                <motion.a";
const newBlock = "return (\r\n                <motion.a";
c = c.replace(oldBlock, newBlock);
fs.writeFileSync(f, c);
console.log(c.includes('social.url ?') ? 'MISS' : 'done');
