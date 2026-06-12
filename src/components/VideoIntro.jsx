import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'ochai_intro_seen';
const PLAY_TIMEOUT_MS = 2500; // bail if video can't start fast — never hold visitors hostage

const VideoIntro = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playTimeoutRef = useRef(null);

  const [alreadySeen] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });

  const [src] = useState(() =>
    window.matchMedia('(max-width: 767px)').matches
      ? '/videos/intro-mobile.mp4'
      : '/videos/intro-desktop.mp4'
  );

  const [isVisible, setIsVisible] = useState(!alreadySeen);
  const [videoReady, setVideoReady] = useState(false);
  const [showFork, setShowFork] = useState(false);

  const markSeen = () => {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode */ }
  };

  const dismiss = () => {
    markSeen();
    setIsVisible(false);
  };

  const goServices = () => {
    markSeen();
    setIsVisible(false);
    navigate('/services');
  };

  useEffect(() => {
    if (!isVisible) return undefined;
    // Safety valve: if playback hasn't begun in time, get out of the way
    playTimeoutRef.current = setTimeout(() => {
      if (!videoReady) dismiss();
    }, PLAY_TIMEOUT_MS);
    return () => clearTimeout(playTimeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, videoReady]);

  if (alreadySeen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
        >
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            autoPlay
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            onEnded={() => setShowFork(true)}
            onError={dismiss}
            className={`max-w-[90vw] max-h-[70vh] md:max-h-[75vh] rounded-xl shadow-2xl transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Skip — visible from frame one */}
          {!showFork && (
            <button
              onClick={dismiss}
              aria-label="Skip intro"
              className="absolute top-6 right-6 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              Skip →
            </button>
          )}

          {/* The Fork — presented at video's end */}
          <AnimatePresence>
            {showFork && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-x-0 bottom-0 pb-10 md:pb-16 px-4 flex flex-col items-center gap-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-20"
              >
                <p className="text-slate-300 text-sm md:text-base tracking-wide">
                  What brings you here?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={dismiss}
                    className="px-7 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white transition-colors shadow-lg"
                  >
                    I'm Hiring — Show Me the Work
                  </button>
                  <button
                    onClick={goServices}
                    className="px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-bold text-white transition-colors shadow-lg"
                  >
                    I Need a Website — Services
                  </button>
                </div>
                <button
                  onClick={dismiss}
                  className="text-slate-500 hover:text-slate-300 text-xs transition-colors mt-1"
                >
                  Just looking around
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoIntro;
