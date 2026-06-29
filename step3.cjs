const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  'const everyBuildRef = useRef(null);',
  'const everyBuildRef = useRef(null);\n  const ctaRef = useRef(null);\n  const ctaQuoteRef = useRef(null);\n  const ctaLeftRef = useRef(null);\n  const ctaRightRef = useRef(null);'
);
fs.writeFileSync(f, c);
console.log('done');
