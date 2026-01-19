
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Search, BarChart3, CloudCog, Server, PenTool, Workflow } from 'lucide-react';

const CoreCapabilities = () => {
  const capabilities = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Mastery of HTML5, CSS3, JavaScript, and React ecosystem designed for pixel-perfect interfaces."
    },
    {
      icon: BrainCircuit,
      title: "Generative AI",
      description: "Deep integration of LLMs to create intelligent, adaptive, and automated user experiences."
    },
    {
      icon: Search,
      title: "SEO & Optimization",
      description: "Technical SEO and Search Console mastery ensuring maximum visibility and organic growth potential."
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Turning raw user data into actionable insights for continuous product iteration and improvement."
    },
    {
      icon: CloudCog,
      title: "API & Cloud",
      description: "Seamless orchestration of third-party services and serverless cloud architecture."
    },
    {
      icon: Server,
      title: "Infrastructure",
      description: "Robust deployment pipelines and secure backend management using Supabase/Firebase."
    },
    {
      icon: PenTool,
      title: "Content Strategy",
      description: "Strategic narrative building that aligns technical delivery with market positioning."
    },
    {
      icon: Workflow,
      title: "Automation",
      description: "End-to-end workflow optimization to eliminate manual bottlenecks and scale efficiency."
    }
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Core <span className="text-purple-400">Capabilities</span>
          </h2>
          <p className="text-lg text-slate-400">
            A comprehensive toolkit designed for execution of enterprise-grade digital products.
            <br className="hidden md:block" />
            <span className="text-slate-500 text-base mt-2 block">Positioned to serve Huntsville's Research Park & Global Clients</span>
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
              className="bg-slate-950 border border-slate-800 p-6 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <cap.icon className="w-6 h-6 text-slate-300 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
