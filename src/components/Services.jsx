import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Database, Brain, Rocket, Zap, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Layout,
      title: 'Modern Web Development',
      description: 'Building responsive, scalable web applications using React 18, TailwindCSS, and Framer Motion.',
      features: ['Component-Driven Architecture', 'Interactive UI/UX', 'Responsive Design']
    },
    {
      icon: Rocket,
      title: 'Performance Optimization',
      description: 'The "Top 1%" Package. I optimize React applications to aim for sub-second load times and perfect Lighthouse scores.',
      features: ['100/100 Core Web Vitals', 'Code Splitting & Caching', 'Image Optimization Strategies'],
      highlight: true
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Seamlessly integrating Large Language Models and Generative AI into web interfaces for next-gen user experiences.',
      features: ['Custom AI Agents', 'Generative Art Integration', 'Intelligent Chatbots']
    },
    {
      icon: Database,
      title: 'Backend Solutions',
      description: 'Secure and scalable backend architecture using Supabase or Firebase, ensuring your data is safe and accessible.',
      features: ['Real-time Databases', 'Authentication Systems', 'Cloud Functions']
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white" id="services">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Services Engineered for <span className="text-emerald-400">Excellence</span>
          </h2>
          <p className="text-lg text-slate-300">
            I don't just deliver code; I deliver results. Every service is backed by a commitment to the Top 1% performance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border transition-all duration-300 group
                ${service.highlight 
                  ? 'bg-slate-900/80 border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }
              `}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 
                ${service.highlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors'}
              `}>
                <service.icon className="w-6 h-6" />
              </div>
              
              {service.highlight && (
                <div className="mb-4 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Zap className="w-3 h-3" /> Key Capability
                </div>
              )}

              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 ${service.highlight ? 'text-emerald-500' : 'text-slate-600 group-hover:text-cyan-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
