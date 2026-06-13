import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DecoButton from '@/components/DecoButton';
import PitchPlayer from '@/components/PitchPlayer';

const SESSION_KEY = 'ochai_intro_seen';
const MAX_WAIT_MS = 8000; // hard ceiling: if playback never starts, give up — but do NOT mark as seen

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
  const [showPitch, setShowPitch] = useState(false);

  const markSeen = () => {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode */ }
  };

  // User watched or chose — this counts as seen.
  const dismiss = () => {
    markSeen();
    setIsVisible(false);
  };

  // Playback never started in time — bail WITHOUT marking seen, so a fast
  // reload still gets a fair shot. A failure to load is not a viewing.
  const bailWithoutPenalty = () => {
    setIsVisible(false);
  };

  const goServices = () => {
    markSeen();
    setIsVisible(false);
    navigate('/services');
  };

  useEffect(() => {
    if (!isVisible) return undefined;
    // Hard ceiling only. Cleared the instant playback begins (see onPlaying).
    playTimeoutRef.current = setTimeout(() => {
      if (!videoReady) bailWithoutPenalty();
    }, MAX_WAIT_MS);
    return () => clearTimeout(playTimeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, videoReady]);

  if (alreadySeen) return null;

  return (
    <>
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-slate-950 overflow-y-auto py-8"
        >
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            autoPlay
            preload="auto"
            onCanPlay={() => {
              // Belt-and-suspenders: some desktop browsers don't honor the
              // autoPlay attribute on a dynamically-mounted element. Ask explicitly.
              const v = videoRef.current;
              if (v && v.paused) {
                const p = v.play();
                if (p && typeof p.catch === 'function') {
                  p.catch(() => bailWithoutPenalty());
                }
              }
            }}
            onPlaying={() => {
              setVideoReady(true);
              clearTimeout(playTimeoutRef.current);
            }}
            onEnded={() => setShowFork(true)}
            onError={bailWithoutPenalty}
            className={`w-auto max-w-[92vw] max-h-[58vh] rounded-xl shadow-2xl transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
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

          {/* The Fork — all-deco, stacked below the full video frame (no overlap) */}
          <AnimatePresence>
            {showFork && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-5 px-4"
              >
                <p className="deco-q">What brings you here?</p>

                {/* The two CTAs — embossed gold brass plaques, the spotlight */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={dismiss} className="deco-emboss">
                    I'm Hiring
                  </button>
                  <button onClick={goServices} className="deco-emboss">
                    I Need a Website
                  </button>
                </div>

                {/* The showpiece — demoted to ghost marquee, defers to the CTAs */}
                <DecoButton
                  ghost
                  label="Watch the Pitch"
                  subLabel="A Ragtime Presentation · 49s"
                  onClick={() => setShowPitch(true)}
                />

                {/* Fine print on the bill */}
                <button onClick={dismiss} className="deco-fine">
                  Just looking around
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
    <PitchPlayer open={showPitch} onClose={() => setShowPitch(false)} />
    </>
  );
};

export default VideoIntro;
