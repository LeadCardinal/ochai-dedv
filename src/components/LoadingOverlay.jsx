import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade out slightly before removal to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Simple logo or spinner animation */}
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-cyan-500 font-medium tracking-widest text-sm animate-pulse">LOADING</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;