const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  '<footer className="bg-slate-950 border-t border-slate-800 py-12">',
  '<footer className="bg-slate-950 border-t border-slate-800 py-12 relative" style={{ zIndex: 50 }}>'
);
fs.writeFileSync(f, c);
console.log(c.includes('zIndex: 50') ? 'done' : 'MISS');
