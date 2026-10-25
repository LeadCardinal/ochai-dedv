

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Sparkles, Target, Rocket, TrendingUp } from 'lucide-react';

const painPointsData = [
  {
    id: 1,
    heading: "Nobody Owns the Whole Thing",
    content: "Most projects stall in the handoffs: designer to developer to host to whoever 'does the SEO.' I own it end to end, from the first sketch to the live deployment, so there is one person to call and nothing falls into the gaps.",
    image: "/images/1.webp",
    icon: BrainCircuit
  },
  {
    id: 2,
    heading: "Timelines Are Fiction",
    content: "Vague quotes and slipping dates are the industry default. I scope in writing, price by clear tiers, and show working builds early, so you see progress instead of promises.",
    image: "/images/2.avif",
    icon: Sparkles
  },
  {
    id: 3,
    heading: "Optimize for What, Exactly?",
    content: "A site can score beautifully and still not bring in a single call. I tie the work to what you actually need: bookings, orders, being found on Google, and being cited by AI search. Speed is the floor, not the goal.",
    image: "/images/3.webp",
    icon: Target
  },
  {
    id: 4,
    heading: "The Deployment Disaster Loop",
    content: "Launch day should not be a white-knuckle event. Your site ships through a Cloudflare-backed pipeline: preview, push, live, with easy rollbacks. Boring deployments are a feature.",
    image: "/images/4.webp",
    icon: Rocket
  },
  {
    id: 5,
    heading: "Data Doesn't Drive Decisions",
    content: "Analytics nobody reads are decoration. I set up Search Console, GA4, and server-side tracking so you can see what is working, then tell you what it means in plain English.",
    image: "/images/5.webp",
    icon: TrendingUp
  }
];

const SinglePainPoint = ({ data, isLast }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 1], [0, 1, 1, 0]);
  const titleX = useTransform(scrollYProgress, [0.15, 0.25], [-50, 0]);

  const imageOpacity = useTransform(scrollYProgress, [0.30, 0.45, 0.85, 1], [0, 1, 1, 0]);
  const imageX = useTransform(scrollYProgress, [0.30, 0.45], [100, 0]);

  const blurbOpacity = useTransform(scrollYProgress, [0.50, 0.65, 0.85, 1], [0, 1, 1, 0]);
  const blurbY = useTransform(scrollYProgress, [0.50, 0.65], [50, 0]);

  const Icon = data.icon;

  return (
    <div ref={containerRef} className={`h-[250vh] relative z-10 ${!isLast ? 'border-b border-slate-900/50' : ''}`}>
      <div className="sticky top-[108px] h-[calc(100vh-108px)] w-full overflow-hidden flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            
            <div className="flex flex-col gap-8 md:gap-24 order-1">
              <motion.div style={{ opacity: titleOpacity, x: titleX }} className="relative z-30">
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl inline-block w-full">
                  <div className="flex items-center gap-4 md:gap-6">
                    {Icon && (
                      <div className="p-3 md:p-4 rounded-xl bg-slate-800 border border-slate-700 shadow-inner shrink-0">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                      </div>
                    )}
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent leading-tight">
                      {data.heading}
                    </h2>
                  </div>
                </div>
              </motion.div>

              <motion.div style={{ opacity: blurbOpacity, y: blurbY }} className="relative z-30">
                <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 md:p-10 shadow-2xl">
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                    {data.content}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div style={{ opacity: imageOpacity, x: imageX }} className="order-2 h-full flex items-center justify-center relative z-20">
              <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-square max-h-[60vh] rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/30 group">
                <div className="absolute inset-0 bg-slate-900/20 z-10" />
                <img src={data.image} alt={data.heading} className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none z-20 mix-blend-overlay" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

const PainPointSection = () => {
  return (
    <div id="pain-points" className="w-full bg-slate-950 relative z-30">
      {painPointsData.map((painPoint, index) => (
        <SinglePainPoint 
          key={painPoint.id} 
          data={painPoint} 
          isLast={index === painPointsData.length - 1} 
        />
      ))}
    </div>
  );
};

export default PainPointSection;
