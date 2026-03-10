
import React, { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
const PainPointSection = lazy(() => import('./PainPointSection'));

const ParallaxHeroSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax background movement (slower than scroll)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <section id="differentiation" ref={containerRef} className="relative bg-slate-950 z-20 overflow-hidden pt-[700px]">
      {/* Parallax Background - Gradient/Pattern for compliance */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: backgroundY, willChange: 'transform' }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
      </div>

      {/* Overlap Gradient for smooth transition from Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 -mt-32 bg-gradient-to-b from-transparent to-slate-950 z-30 pointer-events-none" />
      
      {/* Intro Content - Bridging the Gap */}
      <div className="container mx-auto px-4 pt-32 pb-12 relative z-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                staggerChildren: 0.2,
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Bridging the Gap
          </motion.h2>
          
          <motion.div 
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.8 } }
            }}
            className="h-1.5 w-32 bg-cyan-500 mx-auto mb-10 rounded-full" 
          />
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-xl md:text-3xl text-slate-300 leading-relaxed font-light"
          >
            Between raw engineering capability and actual business outcomes. <br/>
            <span className="block mt-4 text-cyan-400 font-medium">Most developers write code. I engineer success.</span>
          </motion.p>
        </motion.div>
      </div>

      {/* Pain Points Section */}
      <div className="relative z-20">
        <Suspense fallback={null}>
          <PainPointSection />
        </Suspense>
      </div>
    </section>
  );
};

export default ParallaxHeroSection;
