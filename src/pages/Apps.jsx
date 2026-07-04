import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Fingerprint, Check } from 'lucide-react';
import { gsap } from 'gsap';

/**
 * Apps.jsx — /apps (LayerDecisionPage)
 *
 * Locked spec (see planning thread):
 * - Chrome dark #0a0a0f shell, brassy gold/amber accents, site-native.
 * - App-frame EXTERIOR: black device bezel, rounded corners.
 *   Resting state: thin horizontal pill (atmosphere) + fingerprint icon,
 *   bottom-third, centered (mechanism).
 * - Click/tap fingerprint -> GSAP snap-unlock -> frame reveals interior.
 * - App-frame INTERIOR: white/light, mainstream-app register.
 * - Desktop reveal: horizontal, sidebar extends right.
 * - Mobile reveal: vertical, bottom sheet rises.
 * - Viewport floors: 1440x900 desktop / 360x780 mobile, zero-scroll via dvh.
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
  const frameRef = useRef(null);
  const interiorRef = useRef(null);

  const handleUnlock = () => {
    if (unlocked) return;

    const tl = gsap.timeline();

    // Snap — the fingerprint reads the touch before the frame reacts.
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

    // Unlock — frame reveals interior. Direction is set in CSS (below) via
    // the .frame--mobile / .frame--desktop modifier; GSAP just drives the
    // shared state + interior stagger so both directions share one timeline.
    tl.add(() => setUnlocked(true))
      .fromTo(
        interiorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power1.out' },
        '+=0.05'
      )
      .from(
        interiorRef.current.querySelectorAll('[data-tier-card]'),
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
    <div
      ref={frameRef}
      className={[
        'relative mx-auto overflow-hidden transition-[width,height] duration-500 ease-out',
        'bg-[#0a0a0f] border border-amber-500/20 shadow-[0_0_60px_rgba(0,0,0,0.6)]',
        unlocked
          ? isMobile
            ? 'w-full max-w-[340px] h-[560px] rounded-[28px]'
            : 'w-full max-w-[1100px] h-[620px] rounded-[24px]'
          : isMobile
            ? 'w-[220px] h-[64px] rounded-full'
            : 'w-[280px] h-[72px] rounded-full',
      ].join(' ')}
    >
      {/* Resting state — pill + fingerprint mechanism */}
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

      {/* Interior — white/light, mainstream-app register */}
      <div
        ref={interiorRef}
        className={[
          'absolute inset-0 bg-[#fafaf8] text-slate-900',
          unlocked ? 'block' : 'hidden',
          isMobile ? 'flex flex-col' : 'flex flex-row',
        ].join(' ')}
      >
        {/* Nav rail / top bar */}
        <div
          className={[
            'flex-shrink-0 border-amber-900/10 flex items-center px-5 gap-2',
            isMobile
              ? 'h-14 border-b flex-row justify-between'
              : 'w-[240px] border-r flex-col items-start py-6 gap-4',
          ].join(' ')}
        >
          <span className="text-sm font-semibold tracking-tight text-slate-800">
            Three tiers.
          </span>
          {!isMobile && (
            <span className="text-xs text-slate-500 leading-snug">
              Real numbers. One builder.
            </span>
          )}
        </div>

        {/* Tier cards */}
        <div
          className={[
            'flex-1 overflow-y-auto p-4 gap-4',
            isMobile ? 'flex flex-col' : 'grid grid-cols-3',
          ].join(' ')}
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
              {/* Warm/neutral busker photo — gold-neutral bridge between shell and interior */}
              <div
                className="h-28 w-full bg-gradient-to-br from-amber-200 via-amber-100 to-stone-100"
                style={{
                  backgroundImage: `url(${tier.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-slate-900">{tier.name}</h3>
                </div>
                <p className="text-lg font-black text-amber-600 mt-1">
                  {tier.price}
                  {tier.priceSuffix && (
                    <span className="text-xs font-medium text-slate-500 ml-1">
                      {tier.priceSuffix}
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">+/- final scope dependent</p>
                <p className="text-sm text-slate-600 mt-3">{tier.tagline}</p>

                {activeTier === tier.key && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-sm text-slate-600 mb-2">{tier.description}</p>
                    <ul className="space-y-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
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
        100dvh (not vh) so mobile browser chrome doesn't create a scrollbar
        at the floor viewport; safe-area padding keeps the pill clear of
        notches/home-indicators on the resting state.
      */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-4"
        style={{
          height: '100dvh',
          minHeight: '100dvh',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 tracking-tight">
          Deliberate Pricing, <span className="text-amber-400">Expert Build.</span>
        </h1>

        <AppFrame isMobile={isMobile} />

        <p className="text-slate-500 text-xs mt-8 text-center max-w-xs">
          Tap the fingerprint to see all three tiers.
        </p>
      </div>
    </>
  );
};

export default Apps;
