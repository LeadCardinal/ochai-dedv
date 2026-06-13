import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── PitchPlayer ─────────────────────────────────────────────────────────────
// Click-to-play 1920s ragtime self-promo spot. Unlike the muted intro, this
// plays WITH sound (user-initiated, so autoplay policy is satisfied). Poster
// frame paints instantly; the 8.8 MB mp4 is only fetched on open (preload none).
//
// Props: open (bool), onClose (fn)

const PitchPlayer = ({ open, onClose }) => {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/95 px-4"
        >
          <button
            onClick={onClose}
            aria-label="Close the pitch"
            className="absolute top-6 right-6 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors z-10"
          >
            Close ✕
          </button>
          <video
            ref={videoRef}
            src="/videos/pitch-spot.mp4"
            poster="/videos/pitch-poster.jpg"
            controls
            autoPlay
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            onEnded={onClose}
            className={`max-w-[92vw] max-h-[82vh] rounded-xl shadow-2xl transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-60'}`}
            style={{ border: '2px solid #c9a84c' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PitchPlayer;
