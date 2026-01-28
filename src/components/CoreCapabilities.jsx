import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Search, BarChart3, CloudCog, Server, PenTool, Workflow, Sparkles, Zap } from 'lucide-react';

const CoreCapabilities = () => {
  const capabilities = [
    {
      icon: BrainCircuit,
      title: "AI Integration & Deployment",
      description: "Production implementation of Adobe Firefly, ElevenLabs, Claude API, and LLM orchestration. Real systems generating measurable revenue—not demos.",
      highlight: true
    },
    {
      icon: Code2,
      title: "Perfect Web Development",
      description: "React, Vite, Tailwind—hand-coded to 100/100 Lighthouse scores. Performance optimizations that automated tools can't match.",
      highlight: true
    },
    {
      icon: Sparkles,
      title: "Prompt Engineering",
      description: "Strategic AI prompt architecture for business ROI. Workflow automation that eliminates manual bottlenecks while maintaining quality control.",
      highlight: false
    },
    {
      icon: CloudCog,
      title: "Cloud Infrastructure",
      description: "Cloudflare optimization, Google Cloud Console, server-side analytics. Full-stack deployment pipelines maintaining 100% uptime.",
      highlight: false
    },
    {
      icon: Search,
      title: "Technical SEO Mastery",
      description: "Search Console optimization and organic growth strategies. Perfect technical scores driving actual traffic—not vanity metrics.",
      highlight: false
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Server-side conversions API, Meta integration, custom tracking architecture. Complete data infrastructure built and maintained solo.",
      highlight: false
    },
    {
      icon: Zap,
      title: "Creative Automation",
      description: "Adobe Creative Cloud mastery (Photoshop, Illustrator, InDesign, Premiere, After Effects, Firefly) producing enterprise output at solo speed.",
      highlight: false
    },
    {
      icon: Workflow,
      title: "Full-Stack Operations",
      description: "E-commerce management, content strategy, marketing automation, customer service—complete business operations executing at elite standards.",
      highlight: false
    }
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            AI-Augmented <span className="text-purple-400">Technical Arsenal</span>
          </h2>
          <p className="text-lg text-slate-400">
            The complete toolkit for solo execution of enterprise-grade digital products. From AI orchestration to cloud deployment to business operations—all capabilities performed at standards that produce measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`${cap.highlight ? 'bg-gradient-to-br from-purple-900/30 to-slate-950 border-purple-500/30' : 'bg-slate-950 border-slate-800'} border p-6 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}
            >
              {cap.highlight && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  ELITE
                </div>
              )}
              <div className={`w-12 h-12 ${cap.highlight ? 'bg-purple-500/20' : 'bg-slate-900'} rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors`}>
                <cap.icon className={`w-6 h-6 ${cap.highlight ? 'text-purple-400' : 'text-slate-300'} group-hover:text-purple-400 transition-colors`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call-out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-lg text-slate-300 leading-relaxed">
              <span className="text-cyan-400 font-bold">The Integration Advantage:</span> Most technical professionals excel in 1-2 areas. Agencies distribute capabilities across teams, introducing communication overhead and dependency chains. Fewer than 1,000 people worldwide can execute this complete stack solo while maintaining elite performance standards. <span className="text-cyan-400 font-bold">I am one of them.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
