
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const ServiceCard = ({ service, index, variant = 'standard' }) => {
  const { toast } = useToast();
  const Icon = service.icon;

  const isFeatured = variant === 'featured';

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
      whileHover={{ y: isFeatured ? -12 : -8 }}
      onClick={handleClick}
      className="group cursor-pointer h-full"
    >
      <div 
        className={`
          relative h-full overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-300
          ${isFeatured 
            ? 'bg-slate-900/60 border border-slate-700 hover:border-cyan-500/50 p-8 md:p-10 shadow-lg hover:shadow-cyan-500/20' 
            : 'bg-slate-900/30 border border-slate-800 hover:border-slate-600 p-6 md:p-8 hover:bg-slate-800/40'
          }
        `}
      >
        {/* Background Gradient Splash for Featured cards */}
        {isFeatured && (
          <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity duration-500`} />
        )}

        <div 
          className={`
            rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 
            ${isFeatured ? 'w-20 h-20 shadow-lg shadow-black/30' : 'w-12 h-12'}
            group-hover:scale-110 transition-transform duration-300
          `}
        >
          <Icon className={`${isFeatured ? 'w-10 h-10' : 'w-6 h-6'} text-white`} />
        </div>

        <h3 
          className={`
            font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors
            ${isFeatured ? 'text-3xl' : 'text-xl'}
          `}
        >
          {service.title}
        </h3>

        <p 
          className={`
            text-slate-400 leading-relaxed
            ${isFeatured ? 'text-lg' : 'text-base'}
          `}
        >
          {service.description}
        </p>
        
        {isFeatured && (
          <div className="mt-8 flex items-center text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
            Learn more <span className="ml-2">→</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
