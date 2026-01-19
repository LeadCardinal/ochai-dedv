import React, { useEffect, useRef } from 'react';

const ParallaxOverlay = ({ 
  image, 
  heading, 
  content, 
  icon: Icon
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate where the element is in the viewport (0 to 1)
      // 0 = just entering from bottom
      // 1 = just leaving top
      const progress = 1 - (rect.top + rect.height) / (viewHeight + rect.height);
      
      // Optimization: Only compute when in or near viewport
      if (progress > -0.1 && progress < 1.1) {
        // Parallax factors:
        // Content moves slightly slower than scroll (creates depth)
        const contentY = (progress - 0.5) * 60; 
        
        // Image moves in opposite direction or different speed
        const imageY = (progress - 0.5) * -40;

        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${contentY}px)`;
        }
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${imageY}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial positions
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Content Side */}
          <div className="order-2 md:order-1 relative z-10">
            <div 
              ref={contentRef}
              className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-8 shadow-xl will-change-transform"
            >
              <div className="flex items-center gap-4 mb-6">
                {Icon && (
                  <div className="p-3 rounded-full bg-slate-800 border border-slate-700">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                )}
                <h2 className="text-3xl font-bold text-white">
                  {heading}
                </h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                {content}
              </p>
            </div>
          </div>

          {/* Image Side - Added relative z-20 to ensure it layers correctly */}
          <div className="order-1 md:order-2 relative z-20">
            <div 
              ref={imageRef}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 will-change-transform"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={image} 
                  alt={heading}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ParallaxOverlay;