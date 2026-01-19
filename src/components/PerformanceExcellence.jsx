
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Shield, Search, Smartphone, BarChart3, Globe, ExternalLink } from 'lucide-react';
import { lighthouseScores } from '@/data/lighthouseScores';

const ScoreRing = ({ score, label, color, delay }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  // Map color names to Tailwind classes
  const colorMap = {
    emerald: 'text-emerald-400 stroke-emerald-500',
    purple: 'text-purple-400 stroke-purple-500',
    blue: 'text-blue-400 stroke-blue-500',
    cyan: 'text-cyan-400 stroke-cyan-500',
    orange: 'text-orange-400 stroke-orange-500',
  };

  const selectedColor = colorMap[color] || colorMap.emerald;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            className="stroke-slate-800"
            strokeWidth="4"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            className={selectedColor.split(' ')[1]}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute text-sm font-bold ${selectedColor.split(' ')[0]}`}>{score}</span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium text-center">{label}</span>
    </div>
  );
};

const PerformanceExcellence = () => {
  return (
    <section className="pt-0 pb-16 bg-slate-900/50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col items-center text-center mb-16 pt-12 md:pt-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20 uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-3 h-3" />
              Global Ranking
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6 max-w-4xl">
            Engineering Digital Perfection
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            I don't just build websites; I engineer elite digital experiences. My work consistently ranks in the <strong>Top 1% of all websites globally</strong>, verified by Google Lighthouse. While most agencies settle for "good enough," I deliver perfection across every metric.
          </p>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lighthouseScores.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/50">
                <div>
                  <h3 className="font-bold text-white truncate max-w-[150px]">{site.name}</h3>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    Visit Site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                {site.performance === 100 && site.accessibility === 100 && site.bestPractices === 100 && site.seo === 100 && (
                   <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20">
                     PERFECT
                   </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                <ScoreRing score={site.performance} label="Performance" color={site.color} delay={0.2 + (index * 0.1)} />
                <ScoreRing score={site.accessibility} label="Accessibility" color={site.color} delay={0.3 + (index * 0.1)} />
                <ScoreRing score={site.bestPractices} label="Best Practices" color={site.color} delay={0.4 + (index * 0.1)} />
                <ScoreRing score={site.seo} label="SEO" color={site.color} delay={0.5 + (index * 0.1)} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stat */}
        <div className="mt-12 flex justify-center">
           <div className="inline-flex items-center gap-8 bg-slate-950 px-8 py-4 rounded-full border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-500/10 rounded-full">
                    <Globe className="w-5 h-5 text-emerald-400" />
                 </div>
                 <div className="text-sm">
                    <span className="block font-bold text-white">Top 1% Globally</span>
                    <span className="text-slate-500">Performance Rank</span>
                 </div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-500/10 rounded-full">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                 </div>
                 <div className="text-sm">
                    <span className="block font-bold text-white">Sub-Second</span>
                    <span className="text-slate-500">Load Times</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default PerformanceExcellence;
