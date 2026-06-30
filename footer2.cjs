const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace("import { useToast } from '@/components/ui/use-toast';\r\n", '');
c = c.replace("  const { toast } = useToast();\r\n", '');
fs.writeFileSync(f, c);
console.log(c.includes('useToast') ? 'MISS' : 'done');
