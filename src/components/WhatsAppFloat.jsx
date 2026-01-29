import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show bubble after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip for 5 seconds
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/12563619056', '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg font-medium text-sm whitespace-nowrap"
              >
                Need help? Chat with me!
                <button
                  onClick={() => setShowTooltip(false)}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Bubble */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-colors group relative"
            aria-label="Chat on WhatsApp"
          >
            {/* Ping Animation */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
            
            {/* Icon */}
            <MessageCircle className="w-7 h-7 relative z-10" />
            
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;
