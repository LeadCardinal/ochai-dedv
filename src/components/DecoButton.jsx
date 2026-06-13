import React, { useState, useEffect } from 'react';
import { DECO } from '@/lib/deco';

// ─── DecoButton ──────────────────────────────────────────────────────────────
// The "Watch the Pitch" marquee button (Option 1). Shared deco vocabulary.
//
// Props:
//   label      — text shown (default "Watch the Pitch"); ignored if `art` given
//   art        — optional <svg>/<img> node (Illustrator-outlined label). Preferred.
//   onClick    — click handler
//   subLabel   — optional small line under the title (e.g. timing)
//
// Reduced-motion: shimmer animation is suppressed; a rich STATIC gold gradient
// is shown instead. The button is never hidden — motion-off users get full glory,
// minus the movement. The pulse-ring hover is also gated on motion.

const DecoButton = ({ label = 'Watch the Pitch', art = null, onClick, subLabel }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const textStyle = reduceMotion
    ? {
        backgroundImage: DECO.staticGradient,
        backgroundSize: '100% auto',
      }
    : {
        backgroundImage: DECO.shimmerGradient,
        backgroundSize: '200% auto',
        animation: 'decoShimmer 4s linear infinite',
      };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`deco-btn${reduceMotion ? '' : ' deco-btn--motion'}`}
      aria-label={label}
    >
      <span className="deco-btn__tri" aria-hidden="true" />
      {art ? (
        <span className="deco-btn__art">{art}</span>
      ) : (
        <span className="deco-btn__col">
          <span
            className="deco-btn__ttl"
            style={{
              ...textStyle,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {label}
          </span>
          {subLabel && <span className="deco-btn__sub">{subLabel}</span>}
        </span>
      )}
    </button>
  );
};

export default DecoButton;
