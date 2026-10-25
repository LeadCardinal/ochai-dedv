import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Cpu, Lock, Award, Target } from 'lucide-react';

const WhatMakesYouDifferent = () => {
  const differentiators = [
    {
      icon: Lock,
      title: 'AI-First Architecture',
      description: 'Claude API, Adobe Firefly, and ElevenLabs running inside real business workflows. Deployed systems, not experimental demos, built to take repetitive work off your plate.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20'
    },
    {
      icon: Layers,
      title: 'Full-Spectrum Integration',
      description: 'Design, engineering, analytics, SEO, and deployment from one person. No handoffs, no dependency chains, and nobody else to blame but me.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Zap,
      title: 'Perfect Technical Execution',
      description: '100/100 on all four Lighthouse categories across four production sites. Hand-coded where templates fall short, so your site loads fast and gives search engines and AI assistants something worth citing.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20'
    },
    {
      icon: Cpu,
      title: 'Built on Real Businesses',
      description: 'I run my own e-commerce store, a drone-services site, and a published book’s storefront on this same stack. Everything I sell you has already been tested on my own money first.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    }
  ];

  return (
    <section id="differentiation" className="py-24 bg-slate-900 relative overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-400 tracking-wide uppercase">
              Why OchAI
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            One Builder, <span className="text-cyan-400">Start to Finish</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Most specialists stay in their lane. Agencies spread your project across a team and a stack of status meetings. I keep the whole thing in one pair of hands, from first sketch to live deployment, so nothing gets lost between people.
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
              <p className="text-slate-300 leading-relaxed text-lg">
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
              <div className="text-sm text-slate-300">Lighthouse Scores<br/>Across All Properties</div>
            </div>
            <div>
              <Target className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">37+</div>
              <div className="text-sm text-slate-300">Years of Hands-On<br/>Technology Experience</div>
            </div>
            <div>
              <Cpu className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">4</div>
              <div className="text-sm text-slate-300">Production Websites<br/>All Perfect Scores</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesYouDifferent;
