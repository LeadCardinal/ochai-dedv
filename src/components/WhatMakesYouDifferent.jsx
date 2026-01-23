import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Cpu, Lock, Award, Target } from 'lucide-react';

const WhatMakesYouDifferent = () => {
  const differentiators = [
    {
      icon: Lock,
      title: 'AI-First Architecture',
      description: 'Weaponizing generative AI (Adobe Firefly, ElevenLabs, Claude API) for production workflows that 99.95% of developers can\'t replicate. Not theory—deployed systems generating measurable revenue.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20'
    },
    {
      icon: Layers,
      title: 'Full-Spectrum Integration',
      description: 'Engineering → Design → Analytics → Marketing → Deployment. Complete vertical integration performed solo at standards fewer than 1,000 people worldwide can maintain simultaneously.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Zap,
      title: 'Perfect Technical Execution',
      description: 'Perfect Lighthouse scores across multiple production properties. Not "good enough"—top 0.05% performance verified by Google\'s own metrics. Hand-coded optimization that beats automated tools.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20'
    },
    {
      icon: Cpu,
      title: 'Proven Business Outcomes',
      description: '$1,200/month e-commerce revenue, published author, multiple production web properties—all solo operations executing at enterprise quality with startup overhead. Results that speak louder than credentials.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    }
  ];

  return (
    <section id="differentiation" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Abstract Background Accent */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5?auto=format&fit=crop&q=80" 
          alt="Abstract Network" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900 to-slate-900" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-400 tracking-wide uppercase">
              Elite Performance Verified
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why <span className="text-cyan-400">Top 0.05%</span> Matters
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            Less than 1,000 developers worldwide can combine AI implementation expertise with perfect technical execution and proven business outcomes. Most specialists stay in their lane. I own the entire value chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border ${item.border} hover:border-opacity-50 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group`}
            >
              <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 group-hover:${item.color} transition-colors`}>
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-5xl mx-auto bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">100/100</div>
              <div className="text-sm text-slate-400">Perfect Lighthouse Scores<br/>Across All Properties</div>
            </div>
            <div>
              <Target className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">&lt;1000</div>
              <div className="text-sm text-slate-400">People Worldwide<br/>Operating at This Level</div>
            </div>
            <div>
              <Cpu className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">0.05%</div>
              <div className="text-sm text-slate-400">Global Performance<br/>Ranking Verified</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesYouDifferent;
