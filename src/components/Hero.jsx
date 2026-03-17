
import React from 'react';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    /* 
      Hero Section Container
      - Removed overflow-hidden to prevent accidental clipping or stacking context creation that traps fixed children.
      - Keeps 'relative' for positioning absolute children (like scroll indicator), but NO z-index here.
      - Allowing the fixed image child to escape to the global stacking context.
    */
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center">

      {/* 
        Fixed Image Layer
        - Z-index set to -10 as requested.
        - Positioned fixed to viewport.
        - Top-20 ensures it starts below header.
        - Pointer-events-none ensures it doesn't block interaction.
      */}
      <div className="fixed top-20 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] -z-10 pointer-events-none">
        <img 
          src="/images/Hero_V3.avif" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-top opacity-100 block"
          fetchpriority="high"
        />
        {/* 
          Overlay for readability 
          - Keeps image visible but readable.
        */}
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      {/* 
        Hero Content 
        - Z-index 10 ensures text is above the image (-10).
      */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
            Jeremy C Och
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed drop-shadow-lg">
            Self-taught anti-fragile operator who architects, optimizes, markets, and deploys proven enterprise-grade digital systems solo—thriving on constraints, eliminating coordination overhead, and delivering results at startup velocity.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <Link to="/biography">
              <Button 
                size="lg" 
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-base rounded-full transition-all hover:scale-105"
              >
                <FileText className="mr-2 w-5 h-5" />
                Full Biography
              </Button>
            </Link>
            
            <Button 
              onClick={scrollToContact} 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform hover:scale-105"
            >
              Start the Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium tracking-wider uppercase text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Scroll to Explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;