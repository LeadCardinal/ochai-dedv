
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Users, Target, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Performance Score", value: "98+", icon: Rocket, color: "text-emerald-400" },
    { label: "Global Ranking", value: "Top 1%", icon: Award, color: "text-yellow-400" },
    { label: "Perfect Scores", value: "3x", icon: Target, color: "text-blue-400" }
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
             <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">Elite Developer Standing</span>
             <span className="h-px w-8 bg-cyan-500/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bridging the Gap Between <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Creativity & Technical Perfection</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            In a digital landscape cluttered with unoptimized templates, I stand apart by engineering bespoke solutions that don't just work—they fly. I combine artistic vision with rigorous engineering standards to deliver applications that rank in the top 1% globally for performance and accessibility.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Stats & Badges */}
          <div className="space-y-6">
             <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-500" />
                  Industry Benchmarks
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
                      <span className="text-white font-bold">My Standard</span>
                      <span className="text-emerald-400 font-bold">98/100</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        transition={{ duration: 1 }}
                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                      />
                    </div>
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-slate-500 italic">
                  *Based on Google Lighthouse Core Web Vitals metrics compared to HTTP Archive data.
                </p>
             </div>
          </div>

          {/* Right: Narrative */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Code that Speaks</h4>
                <p className="text-slate-400">
                  Clean, maintainable, and scalable code is my hallmark. I don't rely on bloated libraries; I build efficient systems using modern React patterns and Vite for lightning-fast execution.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">AI-Driven Innovation</h4>
                <p className="text-slate-400">
                  Leveraging cutting-edge Generative AI to create assets and interactions that feel magic, all while maintaining strict performance budgets that most developers consider impossible with rich media.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">User-Centric Perfection</h4>
                <p className="text-slate-400">
                  Accessibility isn't an afterthought—it's a foundation. My 100/100 Accessibility scores ensure that your digital presence is inclusive, legally compliant, and welcoming to every user.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
