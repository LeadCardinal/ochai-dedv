
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const TechIcon = ({ tech, index }) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, y: -5 }}
      onClick={handleClick}
      className={`px-6 py-3 bg-gradient-to-br ${tech.color} rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {tech.name}
    </motion.button>
  );
};

export default TechIcon;
