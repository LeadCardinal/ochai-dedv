import React from 'react';
import { motion } from 'framer-motion';
import TechIcon from '@/components/TechIcon';

const Technologies = () => {
  const techCategories = [
    {
      category: 'AI & Generative Tools',
      technologies: [
        { name: 'Claude API', color: 'from-orange-500 to-amber-500' },
        { name: 'Gemini', color: 'from-blue-500 to-indigo-500' },
        { name: 'Adobe Firefly', color: 'from-blue-500 to-purple-500' },
        { name: 'ElevenLabs', color: 'from-emerald-500 to-teal-500' },
        { name: 'Prompt Engineering', color: 'from-cyan-500 to-blue-500' },
        { name: 'LLM Orchestration', color: 'from-purple-500 to-pink-500' }
      ]
    },
    {
      category: 'Frontend Development',
      technologies: [
        { name: 'HTML5', color: 'from-orange-600 to-red-500' },
        { name: 'CSS3', color: 'from-blue-500 to-cyan-500' },
        { name: 'JavaScript (ES6+)', color: 'from-yellow-500 to-orange-500' },
        { name: 'React', color: 'from-cyan-500 to-blue-500' },
        { name: 'Vite', color: 'from-purple-600 to-violet-600' },
        { name: 'Tailwind CSS', color: 'from-sky-500 to-cyan-500' },
        { name: 'Framer Motion', color: 'from-pink-500 to-rose-500' },
        { name: 'CSS/HTML Animation', color: 'from-indigo-500 to-purple-500' }
      ]
    },
    {
      category: 'Backend & CMS',
      technologies: [
        { name: 'PHP Systems', color: 'from-indigo-600 to-purple-600' },
        { name: 'October CMS', color: 'from-orange-500 to-red-500' },
        { name: 'Twig Templating', color: 'from-green-600 to-teal-600' },
        { name: 'Node.js', color: 'from-green-500 to-emerald-500' },
        { name: 'REST APIs', color: 'from-blue-500 to-cyan-500' }
      ]
    },
    {
      category: 'Cloud & Infrastructure',
      technologies: [
        { name: 'Cloudflare Pages', color: 'from-orange-500 to-yellow-500' },
        { name: 'Cloudflare Workers', color: 'from-orange-600 to-red-500' },
        { name: 'Google Cloud Console', color: 'from-blue-500 to-green-500' },
        { name: 'Server-Side Analytics', color: 'from-purple-500 to-blue-500' },
        { name: 'Meta Conversions API', color: 'from-blue-600 to-indigo-600' }
      ]
    },
    {
      category: 'Adobe Creative Cloud',
      technologies: [
        { name: 'Photoshop', color: 'from-blue-600 to-cyan-500' },
        { name: 'Illustrator', color: 'from-orange-600 to-yellow-500' },
        { name: 'InDesign', color: 'from-pink-600 to-rose-500' },
        { name: 'Premiere Pro', color: 'from-purple-600 to-blue-600' },
        { name: 'After Effects', color: 'from-purple-700 to-pink-600' }
      ]
    },
    {
      category: 'SEO & Analytics',
      technologies: [
        { name: 'Google Tag Manager', color: 'from-blue-600 to-indigo-600' },
        { name: 'Google Search Console', color: 'from-blue-500 to-cyan-500' },
        { name: 'Google Analytics 4', color: 'from-orange-500 to-yellow-500' },
        { name: 'Google Merchant Center', color: 'from-green-500 to-teal-500' },
        { name: 'Google Ads', color: 'from-blue-600 to-green-500' },
        { name: 'Schema Markup', color: 'from-green-500 to-emerald-500' },
        { name: 'Lighthouse CI', color: 'from-red-500 to-orange-500' },
        { name: 'Core Web Vitals', color: 'from-blue-600 to-purple-600' }
      ]
    },
    {
      category: 'E-Commerce & Payments',
      technologies: [
        { name: 'Meta Business Suite', color: 'from-blue-600 to-indigo-600' },
        { name: 'Shopify Integration', color: 'from-green-600 to-emerald-600' },
        { name: 'WooCommerce', color: 'from-purple-600 to-pink-600' },
        { name: 'Stripe API (Full Integration)', color: 'from-purple-600 to-indigo-600' },
        { name: 'Square API (Full Integration)', color: 'from-slate-700 to-slate-900' },
        { name: 'Amazon KDP', color: 'from-orange-500 to-amber-500' },
        { name: 'Email Automation', color: 'from-blue-500 to-cyan-500' },
        { name: 'Customer Analytics', color: 'from-pink-500 to-rose-500' }
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-cyan-400">Complete Tech Stack</span>
          </h2>
          <p className="text-lg text-slate-400">
            From my AI orchestration to creative automation to cloud deployment. Each tool I have mastered to production standards, then integrated into cohesive systems that generate proven measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.technologies.map((tech, techIndex) => (
                  <TechIcon key={techIndex} tech={tech} delay={catIndex * 0.1 + techIndex * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-slate-400 leading-relaxed">
            <span className="text-cyan-400 font-bold">27 years of continuous skill acquisition</span> across creative tools, development frameworks, cloud platforms, and AI systems. Not a résumé list—working production knowledge applied daily across multiple business operations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
