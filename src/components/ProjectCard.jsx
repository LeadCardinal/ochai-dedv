
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProjectCard = ({ project, index }) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onClick={handleClick}
      className="group cursor-pointer bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={project.title}
         src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80"></div>
        <div className="absolute top-4 right-4 w-10 h-10 bg-cyan-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors">
          <ExternalLink className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      <div className="p-6">
        <div className="text-cyan-400 text-sm font-semibold mb-2">{project.category}</div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
