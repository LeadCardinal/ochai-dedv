
import React from 'react';
import { motion } from 'framer-motion';
import TechIcon from '@/components/TechIcon';

const Technologies = () => {
  const techCategories = [
    {
      category: 'AI & Machine Learning',
      technologies: [
        { name: 'TensorFlow', color: 'from-orange-500 to-amber-500' },
        { name: 'PyTorch', color: 'from-red-500 to-orange-500' },
        { name: 'Stable Diffusion', color: 'from-purple-500 to-pink-500' },
        { name: 'OpenAI GPT', color: 'from-emerald-500 to-teal-500' },
        { name: 'DALL-E', color: 'from-cyan-500 to-blue-500' }
      ]
    },
    {
      category: 'Web Development',
      technologies: [
        { name: 'React', color: 'from-cyan-500 to-blue-500' },
        { name: 'Node.js', color: 'from-green-500 to-emerald-500' },
        { name: 'TailwindCSS', color: 'from-sky-500 to-cyan-500' },
        { name: 'Next.js', color: 'from-slate-700 to-slate-900' },
        { name: 'TypeScript', color: 'from-blue-600 to-blue-700' }
      ]
    },
    {
      category: 'Cloud & APIs',
      technologies: [
        { name: 'Google Cloud', color: 'from-blue-500 to-green-500' },
        { name: 'Meta API', color: 'from-blue-600 to-indigo-600' },
        { name: 'AWS', color: 'from-orange-500 to-yellow-500' },
        { name: 'Firebase', color: 'from-yellow-500 to-orange-500' },
        { name: 'Supabase', color: 'from-green-500 to-teal-500' }
      ]
    },
    {
      category: 'Analytics & SEO',
      technologies: [
        { name: 'Google Analytics', color: 'from-orange-500 to-yellow-500' },
        { name: 'Search Console', color: 'from-blue-500 to-cyan-500' },
        { name: 'SEMrush', color: 'from-orange-600 to-red-600' },
        { name: 'Ahrefs', color: 'from-blue-600 to-purple-600' },
        { name: 'Mixpanel', color: 'from-purple-500 to-pink-500' }
      ]
    }
  ];

  return (
    <section id="technologies" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Leveraging cutting-edge tools and frameworks for optimal performance and scalability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">{category.category}</h3>
              <div className="flex flex-wrap gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <TechIcon 
                    key={techIndex} 
                    tech={tech} 
                    index={techIndex} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
