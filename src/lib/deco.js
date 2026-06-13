// ─── Deco design tokens ──────────────────────────────────────────────────────
// Single source of truth for the 1920s "playbill" visual language shared by the
// Watch-the-Pitch button, the hire-fork intro moment, and the /showcase page.
// Canonical gold confirmed: #c9a84c (antique brass). Do not drift.

export const DECO = {
  // Gold ramp — all derived from the canonical #c9a84c
  goldBright: '#f4e08c',   // shimmer highlight / peak
  gold: '#c9a84c',         // canonical — borders, triangles, primary text fill
  goldDeep: '#8a6820',     // shimmer trough / gradient end
  goldDim: 'rgba(201,168,76,0.5)',   // muted labels ("Now Screening")
  goldFaint: 'rgba(201,168,76,0.15)', // hairline borders, tag backgrounds

  black: '#0a0a0a',        // button/intro backdrop
  ink: '#020617',          // page backdrop (slate-950, matches site)

  // Moving shimmer used on titles + button text
  shimmerGradient:
    'linear-gradient(90deg, #8a6820 0%, #f4e08c 25%, #c9a84c 50%, #f4e08c 75%, #8a6820 100%)',

  // Static title gradient (for reduced-motion: rich but not animated)
  staticGradient:
    'linear-gradient(135deg, #f0d060 0%, #c9a84c 25%, #ffe680 45%, #b8922e 65%, #e8c84a 80%, #c9a84c 100%)',

  // Display face. Limelight is the intended look; the final button label ships as
  // Illustrator-outlined SVG, so this fallback only shows if SVG art is absent.
  displayFont: '"Limelight", Georgia, "Times New Roman", serif',
};
