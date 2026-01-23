import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Users, Target, Award, Zap, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Performance Score", value: "100/100", icon: Rocket, color: "text-emerald-400" },
    { label: "Global Ranking", value: "Top 0.05%", icon: Award, color: "text-yellow-400" },
    { label: "People at This Level", value: "<1000", icon: Target, color: "text-blue-400" }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white" id="about">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <span className="h-px w-8 bg-cyan-500/50"></span>
             <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">Verified Elite Performance</span>
             <span className="h-px w-8 bg-cyan-500/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Integration Specialist <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Outperforming 99.95% Globally</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Perfect Lighthouse scores aren't aspirational—they're mandatory. Generative AI isn't experimentation—it's production infrastructure generating measurable revenue. This is what top 0.05% execution looks like when you refuse to compromise.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left: Stats & Comparative Benchmarks */}
          <div className="space-y-6">
             <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-500" />
                  Industry Reality Check
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Fortune 500 Average</span>
                      <span className="text-slate-500">45/100</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-slate-600 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Professional Agencies</span>
                      <span className="text-slate-500">72/100</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-blue-900 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-bold">My Non-Negotiable Standard</span>
                      <span className="text-emerald-400 font-bold">100/100</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1 }}
                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                      />
                    </div>
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-slate-500 italic">
                  *Google Lighthouse Core Web Vitals. Fewer than 1,000 developers worldwide maintain perfect scores across multiple production properties.
                </p>
             </div>

             {/* Stats Cards */}
             <div className="grid grid-cols-3 gap-4">
               {stats.map((stat, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ delay: index * 0.1 }}
                   viewport={{ once: true }}
                   className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700"
                 >
                   <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                   <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                   <div className="text-xs text-slate-400 leading-tight">{stat.label}</div>
                 </motion.div>
               ))}
             </div>
          </div>

          {/* Right: Extended Bio Narrative */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">The Self-Taught Reality</h4>
                <p className="text-slate-400">
                  No CS degree. No bootcamp certificates. 25 years of acquiring whatever skill the market demanded next, then executing at levels 99.95% of practitioners can't match. Finance degree with top 5% portfolio performance. Distinguished Expert marksmanship. Perfect Lighthouse scores. The pattern holds.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">AI Implementation vs. AI Theory</h4>
                <p className="text-slate-400">
                  Adobe Firefly producing enterprise-grade imagery. ElevenLabs generating production voice content. Claude API orchestration powering real business workflows. Server-side analytics infrastructure most developers can't architect. These aren't demos—they're deployed systems generating $1,200/month revenue with zero agency overhead.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">What Top 0.05% Actually Means</h4>
                <p className="text-slate-400">
                  Perfect technical execution. AI tool integration producing measurable outcomes. Cloud deployment maintaining 100% uptime. Full-stack operations from database schema to marketing copy. <span className="text-white font-bold">Fewer than 1,000 people worldwide</span> can maintain this standard solo across multiple production environments simultaneously.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Proven Business Outcomes</h4>
                <p className="text-slate-400">
                  Real Live Bonsai: e-commerce generating consistent revenue. Published author: "The Meaning(s) of Your LIFE!" producing sales. Multiple web properties: ochai.dev, reallivebonsai.us, hsvdrone.com, themeaningsoflife.com—all perfect Lighthouse scores, all live production, all solo execution. Results that speak when credentials whisper.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">The Geographic Advantage</h4>
                <p className="text-slate-400">
                  Huntsville, Alabama—not Silicon Valley. Valley-grade execution at Huntsville overhead. Remote-first operations refined over years, not pandemic experiments. Deep technical capabilities meeting competitive compensation expectations. <span className="text-cyan-400">Less than 1,000 people globally deliver this value proposition.</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              When "Good Enough" Isn't Good Enough
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Most developers stop at "it works." Most AI enthusiasts chase demos. Most businesses settle for vendors who can't deliver both technical excellence and business outcomes. If you're hunting for the rare professional who refuses to compromise on either—<span className="text-cyan-400 font-bold">you just found one of fewer than 1,000 globally who operates at this standard.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
