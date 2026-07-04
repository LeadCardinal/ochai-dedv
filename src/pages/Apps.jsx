import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Fingerprint, Check } from 'lucide-react';
import { gsap } from 'gsap';

/**
 * Apps.jsx — /apps (LayerDecisionPage)
 *
 * Locked spec (see planning thread):
 * - Chrome dark #0a0a0f shell, brassy gold/amber accents, site-native.
 * - App-frame EXTERIOR: black device bezel, rounded corners, PORTRAIT,
 *   positioned far left on desktop — not centered, not landscape.
 *   Resting state: thin horizontal pill (atmosphere) + fingerprint icon,
 *   bottom-third, centered (mechanism).
 * - Click/tap fingerprint -> GSAP snap-unlock -> a separate reveal panel
 *   extends from the device's edge. The device itself does NOT grow into
 *   a landscape rectangle — it stays a fixed portrait shape.
 * - Desktop reveal: horizontal — panel extends RIGHT of the device.
 * - Mobile reveal: vertical — panel rises BELOW the device (bottom sheet).
 * - Panel interior: white/light, mainstream-app register.
 * - Viewport floors: 1440x900 desktop / 360x780 mobile, zero-scroll via dvh.
 *   Panel is sized explicitly (not intrinsic content width) so three cards
 *   never force a horizontal scrollbar inside the frame.
 * - Tiers: Soloist $4,500 / Accompaniment $14,500 / Collective $38,500+$500mo,
 *   all "+/- final scope dependent."
 * - Tier visuals: busker photo set (solo / duo / four-piece), warm/neutral,
 *   gold-neutral bridge zone between the cold dark shell and the white interior.
 */

const ASSETS = {
  soloist: '/images/soloist.avif',
  accompaniment: '/images/accompaniment.avif',
  collective: '/images/collective.avif',
};
const TIERS = [
  {
    key: 'soloist',
    name: 'The Soloist',
    price: '$4,500',
    tagline: 'One builder, one clear scope.',
    description:
      'A focused, single-purpose app — the fastest path from idea to something real in your hands. Full-stack build, startup branding included.',
    features: ['Single-purpose app build', 'Startup branding included', 'Direct line to the builder'],
    image: ASSETS.soloist,
  },
  {
    key: 'accompaniment',
    name: 'The Accompaniment',
    price: '$14,500',
    tagline: 'Built together, not handed off.',
    description:
      'A collaborative build for a business with real workflows to automate — more surface area, more integration, still one person answering the phone.',
    features: ['Multi-feature app build', 'Workflow / API integrations', 'AI integration where it earns its keep'],
    image: ASSETS.accompaniment,
  },
  {
    key: 'collective',
    name: 'The Collective',
    price: '$38,500',
    priceSuffix: '+ $500/mo',
    tagline: 'The full arrangement, maintained.',
    description:
      'The complete build — architecture, integration, and a standing retainer so it keeps working after launch instead of quietly rotting.',
    features: ['Full-scope custom app', 'Ongoing $500/mo retainer', 'Priority response window'],
    image: ASSETS.collective,
  },
];

const appsJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Custom App Development',
  provider: { '@type': 'Person', name: 'Jeremy Carter Och' },
  url: 'https://ochai.dev/apps',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'App Development Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'The Soloist',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          minPrice: '4500',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'Offer',
        name: 'The Accompaniment',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          minPrice: '14500',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'Offer',
        name: 'The Collective',
        priceSpecification: [
          {
            '@type': 'UnitPriceSpecification',
            minPrice: '38500',
            priceCurrency: 'USD',
          },
          {
            '@type': 'PaymentChargeSpecification',
            price: '500',
            priceCurrency: 'USD',
            billingIncrement: 'P1M',
          },
        ],
      },
    ],
  },
});

// File-local breakpoint hook — matches the pattern already in Services.jsx
function useMatchMedia(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

const AppFrame = ({ isMobile }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTier, setActiveTier] = useState(null);
  const fingerprintRef = useRef(null);
  const panelRef = useRef(null);
  const interiorRef = useRef(null);

  const handleUnlock = () => {
    if (unlocked) return;

    const tl = gsap.timeline();

    // Snap — the fingerprint reads the touch before the panel reacts.
    tl.to(fingerprintRef.current, {
      scale: 0.82,
      duration: 0.09,
      ease: 'power2.in',
    }).to(fingerprintRef.current, {
      scale: 1.12,
      duration: 0.14,
      ease: 'back.out(3)',
    }).to(fingerprintRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.18,
      ease: 'power1.in',
    });

    // Unlock — the device stays put; the panel extends from its edge.
    // Desktop: rightward (width 0 -> 800). Mobile: rises (height 0 -> 460).
    tl.add(() => setUnlocked(true));

    if (isMobile) {
      tl.fromTo(
        panelRef.current,
        { height: 0, opacity: 0 },
        { height: 460, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '+=0.05'
      );
    } else {
      tl.fromTo(
        panelRef.current,
        { width: 0, opacity: 0 },
        { width: 800, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '+=0.05'
      );
    }

    tl.from(
      interiorRef.current?.querySelectorAll('[data-tier-card]') || [],
      {
        opacity: 0,
        y: isMobile ? 18 : 0,
        x: isMobile ? 0 : 18,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      },
      '-=0.15'
    );
  };

  return (
    <div className={isMobile ? 'flex flex-col items-center' : 'flex flex-row items-start'}>
      {/* Device — portrait bezel. Fixed shape, stays put; never grows into
          a landscape rectangle. This is the far-left, regular-portrait
          piece — the panel below is what extends, not this. */}
      <div
        className={[
          'relative flex-shrink-0 overflow-hidden bg-[#0a0a0f] border border-amber-500/20',
          'shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-[border-radius] duration-500',
          isMobile
            ? 'w-[220px] h-[64px] rounded-full'
            : unlocked
              ? 'w-[240px] h-[520px] rounded-[24px]'
              : 'w-[240px] h-[64px] rounded-full',
        ].join(' ')}
      >
        {!unlocked && (
          <button
            type="button"
            onClick={handleUnlock}
            aria-label="Unlock app tiers"
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
          >
            <span
              ref={fingerprintRef}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-400/10 border border-amber-400/40 group-hover:border-amber-400/70 transition-colors"
            >
              <Fingerprint className="w-6 h-6 text-amber-400" strokeWidth={1.5} />
            </span>
          </button>
        )}

        {/* Unlocked, desktop only — device becomes the persistent nav
            rail, still portrait, same footprint. Mobile carries everything
            in the sheet below instead. */}
        {unlocked && !isMobile && (
          <div className="absolute inset-0 bg-[#fafaf8] text-slate-900 flex flex-col items-start py-6 px-5 gap-2">
            <span className="text-sm font-semibold tracking-tight text-slate-800">
              Three tiers.
            </span>
            <span className="text-xs text-slate-500 leading-snug">
              Real numbers. One builder.
            </span>
          </div>
        )}
      </div>

      {/* Reveal panel — extends RIGHT of the device on desktop (0 -> 800px,
          sized to fit three cards, no intrinsic overflow), rises BELOW it
          on mobile (0 -> 460px). Explicit dimensions on purpose — this is
          what caused the horizontal scrollbar last round when the whole
          frame was one growing box instead of two elements. */}
      <div
        ref={panelRef}
        className={[
          'overflow-hidden bg-[#fafaf8] text-slate-900',
          isMobile ? 'w-[220px] rounded-b-[24px]' : 'ml-3 rounded-[24px]',
        ].join(' ')}
        style={isMobile ? { height: 0 } : { width: 0, height: 520 }}
      >
        <div
          ref={interiorRef}
          className={[
            'h-full overflow-y-auto p-4 gap-4',
            isMobile ? 'flex flex-col' : 'grid grid-cols-3 items-start',
          ].join(' ')}
          style={!isMobile ? { width: 800 } : undefined}
        >
          {TIERS.map((tier) => (
            <button
              key={tier.key}
              data-tier-card
              onClick={() => setActiveTier(tier.key)}
              className={[
                'text-left rounded-xl border overflow-hidden transition-all',
                'bg-white hover:shadow-lg',
                activeTier === tier.key
                  ? 'border-amber-500 ring-1 ring-amber-400/60'
                  : 'border-slate-200',
              ].join(' ')}
            >
              <div
                className="h-24 w-full bg-gradient-to-br from-amber-200 via-amber-100 to-stone-100"
                style={{
                  backgroundImage: `url(${tier.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-3">
                <h3 className="font-bold text-slate-900 text-sm">{tier.name}</h3>
                <p className="text-base font-black text-amber-600 mt-1">
                  {tier.price}
                  {tier.priceSuffix && (
                    <span className="text-[10px] font-medium text-slate-500 ml-1">
                      {tier.priceSuffix}
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">+/- final scope dependent</p>
                <p className="text-xs text-slate-600 mt-2">{tier.tagline}</p>

                {activeTier === tier.key && (
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-600 mb-1.5">{tier.description}</p>
                    <ul className="space-y-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-[10px] text-slate-600">
                          <Check className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Apps = () => {
  const isMobile = useMatchMedia('(max-width: 768px)');

  return (
    <>
      <Helmet>
        <title>Custom App Development, Real Pricing | OchAI</title>
        <link rel="canonical" href="https://ochai.dev/apps" />
        <meta
          name="description"
          content="Three tiers. Real prices. One builder — authoritative, deliberate, and expert about what it actually costs to build with me, whatever the scale."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/apps" />
        <meta property="og:title" content="Custom App Development, Real Pricing | OchAI" />
        <meta
          property="og:description"
          content="Three tiers. Real prices. One builder — authoritative, deliberate, and expert about what it actually costs to build with me, whatever the scale."
        />
        <meta property="og:image" content="/images/accompaniment.avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{appsJsonLd}</script>
      </Helmet>

      {/*
        Zero-scroll shell. Floors: 1440x900 desktop / 360x780 mobile.
        H1 stays centered regardless of device position below it.
      */}
      <div
        className="relative flex flex-col items-center overflow-hidden bg-[#0a0a0f] px-4 pt-16"
        style={{
          height: '100dvh',
          minHeight: '100dvh',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <h1 className="w-full text-2xl md:text-3xl font-bold text-white text-center mb-10 tracking-tight">
          Deliberate Pricing, <span className="text-amber-400">Expert Build.</span>
        </h1>

        {/* Device + panel row. Centered on mobile; pinned far left on
            desktop with fixed padding instead of mx-auto centering —
            that's the actual fix for "regular portrait, far left." */}
        <div className="w-full flex-1 flex flex-col items-center md:flex-row md:items-start md:justify-start md:pl-16">
          <AppFrame isMobile={isMobile} />
        </div>

        <p className="text-slate-500 text-xs mt-4 text-center max-w-xs">
          Tap the fingerprint to see all three tiers.
        </p>
      </div>
    </>
  );
};

export default Apps;
