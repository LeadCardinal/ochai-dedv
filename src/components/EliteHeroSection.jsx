
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Award, MapPin, Rocket } from 'lucide-react';

const EliteHeroSection = () => {
  const scrollToNext = () => {
    const element = document.getElementById('differentiation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 bg-slate-950 mt-[700px]">
      {/* Background with Gradient Overlay - Unsplash Image Removed */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        {/* Subtle grid pattern to add texture instead of image */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-slate-950/80 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Location & Validation Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">Huntsville, AL</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 tracking-wide uppercase">
                Claude AI Validated: Top 1% Global
              </span>
            </div>
          </motion.div>

          {/* Name Introduction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-2"
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide uppercase font-pj">Jeremy C Och</h2>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight"
            style={{ willChange: 'opacity, transform' }}
          >
            Top <span className="text-[0.5em] text-cyan-400 align-middle">.05%</span> Integrated <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Digital Operator
            </span>
          </motion.h1>

          {/* Context Subheadline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-10 max-w-3xl mx-auto"
            style={{ willChange: 'opacity, transform' }}
          >
            <p className="text-xl md:text-2xl text-slate-200 mb-4 leading-relaxed font-light">
              Positioned to deliver <strong>Saturn V scale</strong> performance from the heart of Cummings Research Park.
            </p>
            <p className="text-lg text-slate-400 font-medium bg-slate-900/40 inline-block px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-700/50">
              One of possibly only ~1,000 people worldwide with this expansive capability, toolset, and skillset combination.
            </p>
          </motion.div>

          {/* Differentiator Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-12 shadow-2xl"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">Full-Spectrum Execution</h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base">
                  Build → Optimize → Market → Automate → Measure → Deploy → Iterate. <br/>
                  <span className="text-cyan-400">All performed solo at elite standards.</span>
                </p>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/10" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Rocket City Precision</h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base">
                  Applying defense-grade rigor to digital operations. While others manage dependencies, I eliminate them.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{ willChange: 'opacity, transform' }}
          >
            <button 
              onClick={scrollToNext}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-cyan-700 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 hover:bg-cyan-600 shadow-[0_0_20px_rgba(14,116,144,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] hover:-translate-y-1 active:translate-y-0"
              aria-label="Scroll to differentiation section"
            >
              See The Difference
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EliteHeroSection;
