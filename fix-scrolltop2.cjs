const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/App.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  '  React.useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [pathname]);',
  '  React.useEffect(() => {\n    if (!window.location.hash) {\n      window.scrollTo(0, 0);\n    }\n  }, [pathname]);'
);
fs.writeFileSync(f, c);
console.log(c.includes('window.location.hash') ? 'done' : 'MISS');
