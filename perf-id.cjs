const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/PerformanceExcellence.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  '<section className="pt-0 pb-16 bg-slate-900/50 border-b border-slate-800">',
  '<section id="case-studies" className="pt-0 pb-16 bg-slate-900/50 border-b border-slate-800">'
);
fs.writeFileSync(f, c);
console.log(c.includes('id="case-studies"') ? 'done' : 'MISS');
