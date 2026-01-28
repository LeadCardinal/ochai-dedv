import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Award, Sparkles, ChevronDown } from 'lucide-react';

const EliteHeroSection = () => {
  const scrollToNext = () => {
    const element = document.getElementById('pain-points');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="text-sm md:text-base font-bold text-emerald-400 tracking-wide uppercase">
                Elite AI Implementation & Full-Stack Development
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
            >
              Top 0.05% <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                AI Implementation Specialist
              </span>
              <br/>
              <span className="text-3xl md:text-4xl lg:text-5xl text-slate-400">Worldwide</span>
            </motion.h1>

            {/* Context Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
            >
              Architecting, deploying, and optimizing AI-powered full-stack systems solo—maintaining perfect Lighthouse scores across production environments while generating measurable business results. <br className="hidden md:block" />
              <span className="text-cyan-400 font-semibold">Production systems, not demos.</span>
            </motion.p>

            {/* Differentiator Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-10 shadow-2xl"
            >
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">AI Integration That Works</h3>
                    <p className="text-slate-300 text-sm">
                      Adobe Firefly, ElevenLabs, Claude API integrated into production workflows generating <span className="text-cyan-400">$1,200/month revenue.</span> Complete systems, zero agency overhead.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Perfect Technical Execution</h3>
                    <p className="text-slate-300 text-sm">
                      100/100 Lighthouse scores across reallivebonsai.us, hsvdrone.com, themeaningsoflife.com. Hand-coded optimizations. <span className="text-purple-400">Google's benchmarks confirm it.</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button 
                onClick={scrollToNext}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-cyan-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 hover:bg-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] hover:-translate-y-1"
              >
                Why This Matters
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </div>

          {/* Right Column - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-xl mx-auto">
              {/* Glow Effect Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
              
              {/* Hero Image with AVIF + WebP Fallback */}
              <picture>
                <source 
                  srcSet="https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/Hero_V3.avif" 
                  type="image/avif" 
                />
                <source 
                  srcSet="https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/Hero_V3.webp" 
                  type="image/webp" 
                />
                <img
                  src="https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/Hero_V3.webp"
                  alt="Jeremy Och - OCH AI DEV - Top 0.05% AI Implementation Specialist Worldwide"
                  width="800"
                  height="600"
                  fetchpriority="high"
                  decoding="async"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-cyan-500/20"
                />
              </picture>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="text-slate-400 text-sm font-medium tracking-wide uppercase">Scroll to Continue</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EliteHeroSection;
