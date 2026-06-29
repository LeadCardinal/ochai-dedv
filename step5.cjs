const fs = require('fs');
const f = 'C:/Users/thebo/source/ochai-dev/src/pages/Services.jsx';
let c = fs.readFileSync(f, 'utf8');
const start = c.indexOf('<section className="relative z-10 py-24 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">');
const end = c.indexOf('</section>', start) + '</section>'.length;
const bg = 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,220,230,0.13) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 48% 48%, rgba(200,200,215,0.09) 0%, transparent 60%), radial-gradient(ellipse 45% 35% at 53% 52%, rgba(180,180,200,0.07) 0%, transparent 65%), radial-gradient(ellipse 20% 18% at 46% 50%, rgba(240,240,250,0.06) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 50% 50%, rgba(150,150,170,0.05) 0%, transparent 75%), linear-gradient(to bottom, #0a0a0f 0%, #0d0d18 40%, #0a0a0f 100%)';
const newSection = '<section ref={ctaRef} className="relative z-10 py-32 overflow-hidden">\r\n' +
'        <div className="absolute inset-0" style={{background: \'' + bg + '\'}} />\r\n' +
'        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">\r\n' +
'          <div ref={ctaQuoteRef} style={{ opacity: 0, transform: \'translateY(40px)\' }}>\r\n' +
'            <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">&ldquo;Anyone else will charge you more<br /><span className="text-cyan-400">to deliver less</span> &mdash;<br />and you will not know it until after.&rdquo;</p>\r\n' +
'            <p className="text-slate-400 text-base md:text-lg mb-16">One person. Every instrument. No handoffs, no gaps, no excuses.</p>\r\n' +
'          </div>\r\n' +
'          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">The Discovery Call Costs <span className="text-emerald-400">Nothing</span></h2>\r\n' +
'          <p className="text-lg text-slate-300 mb-10">Worst case, you walk away with a clearer picture of what your project needs. Best case, you get a fixed-price proposal and a builder who answers his own phone.</p>\r\n' +
'          <div className="flex flex-col sm:flex-row gap-4 justify-center overflow-hidden">\r\n' +
'            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" onMouseEnter={playApplause}\r\n' +
'              ref={ctaLeftRef}\r\n' +
'              data-cta-left\r\n' +
'              style={{ transform: \'translateX(-100vw)\' }}\r\n' +
'              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white text-lg transition-all shadow-lg">\r\n' +
'              <CalendarDays className="w-5 h-5" /> Schedule at cal.com\r\n' +
'            </a>\r\n' +
'            <a href={EMAIL_URL}\r\n' +
'              ref={ctaRightRef}\r\n' +
'              data-cta-right\r\n' +
'              style={{ transform: \'translateX(100vw)\' }}\r\n' +
'              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl font-bold text-white text-lg transition-colors">\r\n' +
'              <Mail className="w-5 h-5" /> jeremy@ochai.dev\r\n' +
'            </a>\r\n' +
'          </div>\r\n' +
'        </div>\r\n' +
'      </section>';
c = c.slice(0, start) + newSection + c.slice(end);
fs.writeFileSync(f, c);
console.log(c.includes('ctaQuoteRef') ? 'done' : 'MISS');
