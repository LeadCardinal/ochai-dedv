const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/App.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  '  React.useEffect(() => {\r\n    window.scrollTo(0, 0);\r\n  }, [pathname]);',
  '  React.useEffect(() => {\r\n    if (!window.location.hash) {\r\n      window.scrollTo(0, 0);\r\n    }\r\n  }, [pathname]);'
);
fs.writeFileSync(f, c);
console.log(c.includes('window.location.hash') ? 'done' : 'MISS');
