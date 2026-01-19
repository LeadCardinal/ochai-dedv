
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Cpu, Lock, Users } from 'lucide-react';

const WhatMakesYouDifferent = () => {
  const differentiators = [
    {
      icon: Lock,
      title: 'Total Autonomy',
      description: 'Zero dependency on external teams. From database schema to frontend animation, I handle every layer of the stack with expert precision, eliminating communication overhead.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20'
    },
    {
      icon: Layers,
      title: 'Full-Stack Execution',
      description: 'Most 1%ers specialize in one area. I integrate the entire digital lifecycle: engineering, design, analytics, and marketing strategy into one cohesive operational unit.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Zap,
      title: 'Extreme Velocity',
      description: 'By removing the friction of bureaucratic handoffs and vendor delays, I deploy production-ready features in days, not months. Speed is the ultimate competitive advantage.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20'
    },
    {
      icon: Cpu,
      title: 'Defense-Grade Standard',
      description: 'Applying Huntsville\'s aerospace engineering mindset to web development. Systems are built for mission-critical reliability, security, and scale from Day 1.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    }
  ];

  return (
    <section id="differentiation" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Abstract Background Accent - Replaced Unsplash with Gradient/Pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-slate-800 via-slate-900 to-slate-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-cyan-400">Integrated</span> Advantage
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            Claude AI analysis confirms: Integrated Digital Operations acts as a massive force multiplier. 
            From <span className="text-slate-200">Huntsville's tech hub</span> to global markets, I am positioned to deliver end-to-end value.
          </p>
        </div>

        {/* Team Collaboration Insight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-8 mb-16 max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 bg-blue-500/10 p-4 rounded-xl">
              <Users className="w-12 h-12 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">A Force Multiplier, Not a Silo</h3>
              <p className="text-slate-300 leading-relaxed">
                While capable of full-stack solo execution, I thrive as a collaborative team player. My broad skillset allows me to fill any gap—whether frontend, backend, or ops—acting as a force multiplier that accelerates existing teams rather than replacing them. I am flexible, adaptable, and ready to integrate seamlessly into your workflow.
              </p>
            </div>
          </div>
        </motion.div>

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
      </div>
    </section>
  );
};

export default WhatMakesYouDifferent;
