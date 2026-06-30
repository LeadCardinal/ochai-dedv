const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/components/Footer.jsx';
let c = fs.readFileSync(f, 'utf8');

// Remove handleSocialClick function
c = c.replace(
  "  const handleSocialClick = () => {\r\n    toast({\r\n      title: \"🚧 This feature isn't implemented yet\u2014but don't worry! You can request it in your next prompt! 🚀\"\r\n    });\r\n  };\r\n\r\n  const socialLinks",
  "  const socialLinks"
);

// Remove the dangling ternary button fallback
const oldFallback = "              ) : (\r\n                <motion.button\r\n                  key={index}\r\n                  onClick={handleSocialClick}\r\n                  whileHover={{ scale: 1.1, y: -3 }}\r\n                  whileTap={{ scale: 0.95 }}\r\n                  className=\"w-10 h-10 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-full flex items-center justify-center transition-all duration-300\"\r\n                  aria-label={social.label}\r\n                >\r\n                  <Icon className=\"w-5 h-5 text-slate-300 hover:text-cyan-400 transition-colors\" />\r\n                </motion.button>\r\n              );";
c = c.replace(oldFallback, "              );");

fs.writeFileSync(f, c);
console.log(c.includes('handleSocialClick') ? 'MISS' : 'done');
