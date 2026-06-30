const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');
const proofLink = '          {/* Proof link */}\r\n' +
'          <motion.div\r\n' +
'            initial={{ opacity: 0, y: 20 }}\r\n' +
'            whileInView={{ opacity: 1, y: 0 }}\r\n' +
'            transition={{ duration: 0.6, delay: 0.3 }}\r\n' +
'            viewport={{ once: true }}\r\n' +
'            className="text-center"\r\n' +
'          >\r\n' +
'            <a href="/#case-studies" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">\r\n' +
'              The work speaks first if you need it to &rarr;\r\n' +
'            </a>\r\n' +
'          </motion.div>\r\n\r\n';
c = c.replace('          {/* Copyright */}', proofLink + '          {/* Copyright */}');
fs.writeFileSync(f, c);
console.log(c.includes('work speaks first') ? 'done' : 'MISS');
