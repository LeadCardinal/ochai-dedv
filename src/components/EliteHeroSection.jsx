import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Award, Target } from 'lucide-react';

const EliteHeroSection = () => {
  const scrollToNext = () => {
    const element = document.getElementById('differentiation');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1636216248918-918b90e6eaeb?auto=format&fit=crop&q=80" 
          alt="Digital Operator Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          >
            <Target className="w-5 h-5 text-emerald-400" />
            <span className="text-sm md:text-base font-bold text-emerald-400 tracking-wide uppercase">
              Performance That Beats 99.95% of Developers Worldwide
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight"
          >
            Top 0.05% <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              AI Implementation Specialist
            </span>
          </motion.h1>

          {/* Context Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            <strong>Fewer than 1,000 people globally</strong> can architect, deploy, and optimize AI-powered full-stack systems solo—maintaining perfect Lighthouse scores across production environments. <br className="hidden md:block" />
            <span className="text-cyan-400">I'm one of them.</span>
          </motion.p>

          {/* Differentiator Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">AI-Augmented Full-Stack</h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base">
                  Generative AI integration (Firefly, ElevenLabs, Claude API) → Cloud deployment → Analytics → Marketing automation. <br/>
                  <span className="text-cyan-400">Results that outperform 99.95% of technical professionals.</span>
                </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/10" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Elite Execution</h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base">
                  Perfect Lighthouse scores aren't aspirational—they're mandatory. Google's own benchmarks confirm top 0.05% global performance across all properties.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              onClick={scrollToNext}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-cyan-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 hover:bg-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] hover:-translate-y-1"
            >
              See What Elite Looks Like
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EliteHeroSection;
