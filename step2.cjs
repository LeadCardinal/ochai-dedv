const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');
const marker = 'bg-slate-950 border-t border-slate-800';
const start = c.indexOf('<section className="relative z-10 py-24 ' + marker + '">');
const end = c.indexOf('</section>', start) + '</section>'.length;
c = c.slice(0, start) + c.slice(end);
fs.writeFileSync(f, c);
console.log('done, removed', end - start, 'chars');
