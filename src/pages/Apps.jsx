import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Fingerprint, Check, X, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

const LOGO = '/images/ochai-header-logo.avif';
const ASSETS = {
  soloist: '/images/soloist.avif',
  accompaniment: '/images/accompaniment.avif',
  collective: '/images/collective.avif',
};

const TIERS = [
  {
    key: 'soloist', label: 'Soloist', name: 'The Soloist', price: '$4,500',
    tagline: 'One builder, one clear scope.',
    description: 'Fastest path from idea to something real. Full-stack build, startup branding included.',
    features: ['Single-purpose app build', 'Startup branding included', 'Direct line to the builder'],
    image: ASSETS.collective,
  },
  {
    key: 'accompaniment', label: 'Accompaniment', name: 'The Accompaniment', price: '$14,500',
    tagline: 'Built together, not handed off.',
    description: 'Real workflows, more surface area, still one person answering the phone.',
    features: ['Multi-feature app build', 'Workflow / API integrations', 'AI where it earns its keep'],
    image: ASSETS.accompaniment,
  },
  {
    key: 'collective', label: 'Collective', name: 'The Collective', price: '$38,500',
    priceSuffix: '+ $500/mo', tagline: 'The full arrangement, maintained.',
    description: 'Architecture, integration, retainer. Keeps working after launch instead of quietly rotting.',
    features: ['Full-scope custom app', 'Ongoing $500/mo retainer', 'Priority response window'],
    image: ASSETS.soloist,
  },
];

const appsJsonLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Custom App Development',
  provider: { '@type': 'Person', name: 'Jeremy Carter Och' },
  url: 'https://ochai.dev/apps',
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'App Development Tiers',
    itemListElement: [
      { '@type': 'Offer', name: 'The Soloist',
        priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: '4500', priceCurrency: 'USD' } },
      { '@type': 'Offer', name: 'The Accompaniment',
        priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: '14500', priceCurrency: 'USD' } },
      { '@type': 'Offer', name: 'The Collective',
        priceSpecification: [
          { '@type': 'UnitPriceSpecification', minPrice: '38500', priceCurrency: 'USD' },
          { '@type': 'PaymentChargeSpecification', price: '500', priceCurrency: 'USD', billingIncrement: 'P1M' },
        ] },
    ],
  },
});

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

// LockScreen — dark glass, logo centered, fingerprint bottom-third
const LockScreen = ({ onUnlock }) => {
  const fpRef = useRef(null);
  const handleTap = () => {
    const tl = gsap.timeline({ onComplete: onUnlock });
    tl.to(fpRef.current, { scale: 0.82, duration: 0.09, ease: 'power2.in' })
      .to(fpRef.current, { scale: 1.15, duration: 0.14, ease: 'back.out(3)' })
      .to(fpRef.current, { opacity: 0, scale: 0.5, duration: 0.2, ease: 'power1.in' });
  };
  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full bg-[#080810] select-none">
      {/* Status bar simulation */}
      <div className="w-full flex justify-between items-center px-5 pt-3 text-[10px] text-white/40 flex-shrink-0">
        <span>9:41</span><span>●●●</span>
      </div>
      {/* Branding */}
      <div className="flex flex-col items-center gap-2 flex-1 justify-center">
        <img src={LOGO} alt="OchAI" className="w-16 h-16 object-contain drop-shadow-lg" />
        <span className="text-white/70 text-xs tracking-widest uppercase">OchAI Dev</span>
        <span className="text-white/30 text-[10px] mt-1">Tap to unlock</span>
      </div>
      {/* Fingerprint */}
      <div className="flex flex-col items-center pb-8 flex-shrink-0">
        <button type="button" onClick={handleTap} aria-label="Unlock" className="group cursor-pointer">
          <span ref={fpRef} className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/40 group-hover:border-amber-400/80 transition-colors">
            <Fingerprint className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
          </span>
        </button>
      </div>
    </div>
  );
};

// AppInterior — light app, logo top bar, tier content, bottom tabs
const AppInterior = ({ activeTier, onSelectTier }) => {
  const tier = TIERS.find(t => t.key === activeTier) || TIERS[0];
  return (
    <div className="flex flex-col w-full h-full bg-[#fafaf8] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 flex-shrink-0 bg-white">
        <img src={LOGO} alt="OchAI" className="w-6 h-6 object-contain" />
        <span className="text-xs font-bold text-slate-800 tracking-tight">OchAI Dev</span>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="h-24 w-full rounded-xl mb-3 bg-gradient-to-br from-amber-100 to-stone-100"
          style={{ backgroundImage: `url(${tier.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <p className="text-[10px] text-amber-600 font-black">{tier.price}
          {tier.priceSuffix && <span className="text-slate-400 font-normal ml-1">{tier.priceSuffix}</span>}
        </p>
        <p className="text-[9px] text-slate-400">+/- final scope dependent</p>
        <h3 className="text-sm font-bold text-slate-900 mt-1">{tier.name}</h3>
        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{tier.tagline}</p>
        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{tier.description}</p>
        <ul className="mt-3 space-y-1.5">
          {tier.features.map(f => (
            <li key={f} className="flex items-start gap-1.5 text-[10px] text-slate-600">
              <Check className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />{f}
            </li>
          ))}
        </ul>
        <button onClick={() => onSelectTier(tier.key)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-400 text-[11px] font-bold text-slate-900 hover:bg-amber-300 transition-colors">
          Explore this tier <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      {/* Bottom tab bar */}
      <div className="flex border-t border-slate-100 bg-white flex-shrink-0">
        {TIERS.map(t => (
          <button key={t.key} onClick={() => onSelectTier && onSelectTier(t.key, 'tab')}
            className={['flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors text-[9px]',
              activeTier === t.key ? 'text-amber-500' : 'text-slate-400'].join(' ')}>
            <div className={['w-1 h-1 rounded-full mb-0.5', activeTier === t.key ? 'bg-amber-400' : 'bg-transparent'].join(' ')} />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// GenieSidebar — expands from middle-right edge of the phone
const GenieSidebar = ({ tier, onClose, phoneRef }) => {
  const sidebarRef = useRef(null);
  useEffect(() => {
    if (!sidebarRef.current) return;
    gsap.fromTo(sidebarRef.current,
      { scaleX: 0, scaleY: 0.1, opacity: 0, transformOrigin: 'left center' },
      { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.55, ease: 'power3.out' }
    );
  }, []);
  const handleClose = () => {
    gsap.to(sidebarRef.current, {
      scaleX: 0, scaleY: 0.1, opacity: 0, transformOrigin: 'left center',
      duration: 0.35, ease: 'power2.in', onComplete: onClose,
    });
  };
  return (
    <div ref={sidebarRef} className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="OchAI" className="w-7 h-7 object-contain" />
          <div>
            <p className="text-xs text-slate-400">App Development</p>
            <h2 className="text-base font-bold text-slate-900">{tier.name}</h2>
          </div>
        </div>
        <button onClick={handleClose} className="text-slate-400 hover:text-slate-700 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-0">
        <div className="p-6 border-r border-slate-100">
          <div className="h-48 rounded-xl mb-4 bg-gradient-to-br from-amber-100 to-stone-100"
            style={{ backgroundImage: `url(${tier.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <p className="text-2xl font-black text-amber-600">{tier.price}
            {tier.priceSuffix && <span className="text-sm font-normal text-slate-400 ml-1">{tier.priceSuffix}</span>}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">+/- final scope dependent</p>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">{tier.tagline}</p>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{tier.description}</p>
          <ul className="space-y-2">
            {tier.features.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{f}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-slate-400 mt-6 italic">Authoritative. Deliberate. Expert.</p>
        </div>
      </div>
    </div>
  );
};

// PhoneMockup — bezel + screen, desktop only
const PhoneMockup = ({ children }) => (
  <div className="relative flex-shrink-0 w-[280px] h-[560px]"
    style={{ filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.7))' }}>
    {/* Outer bezel */}
    <div className="absolute inset-0 rounded-[44px] bg-[#111118] border-2 border-[#2a2a35]" />
    {/* Side buttons */}
    <div className="absolute -left-[3px] top-24 w-[3px] h-8 rounded-l-sm bg-[#2a2a35]" />
    <div className="absolute -left-[3px] top-36 w-[3px] h-12 rounded-l-sm bg-[#2a2a35]" />
    <div className="absolute -right-[3px] top-28 w-[3px] h-14 rounded-r-sm bg-[#2a2a35]" />
    {/* Speaker notch */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#1a1a25]" />
    {/* Home indicator */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
    {/* Screen */}
    <div className="absolute inset-[10px] rounded-[36px] overflow-hidden bg-[#080810]">
      {children}
    </div>
  </div>
);

// MobileExpanded — full-screen tier detail on mobile after tap
const MobileExpanded = ({ tier, onClose }) => {
  const sheetRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(sheetRef.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' }
    );
  }, []);
  const handleClose = () => {
    gsap.to(sheetRef.current, {
      y: '100%', opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose,
    });
  };
  return (
    <div ref={sheetRef} className="absolute inset-0 bg-white z-20 overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white">
        <div className="flex items-center gap-2">
          <img src={LOGO} alt="OchAI" className="w-6 h-6 object-contain" />
          <span className="font-bold text-slate-900 text-sm">{tier.name}</span>
        </div>
        <button onClick={handleClose}><X className="w-5 h-5 text-slate-400" /></button>
      </div>
      <div className="p-5">
        <div className="h-40 rounded-xl mb-4 bg-gradient-to-br from-amber-100 to-stone-100"
          style={{ backgroundImage: `url(${tier.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <p className="text-2xl font-black text-amber-600">{tier.price}
          {tier.priceSuffix && <span className="text-sm font-normal text-slate-400 ml-1">{tier.priceSuffix}</span>}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 mb-3">+/- final scope dependent</p>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{tier.description}</p>
        <ul className="space-y-2">
          {tier.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{f}
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-slate-400 mt-8 italic text-center">Authoritative. Deliberate. Expert.</p>
      </div>
    </div>
  );
};

// Main page component
const Apps = () => {
  const isMobile = useMatchMedia('(max-width: 768px)');
  // phase: 'locked' | 'unlocked' | 'expanded'
  const [phase, setPhase] = useState('locked');
  const [activeTier, setActiveTier] = useState('soloist');
  const phoneRef = useRef(null);

  const handleUnlock = () => setPhase('unlocked');

  const handleSelectTier = (key, source) => {
    setActiveTier(key);
    // Tab tap just switches content. "Explore" button triggers genie/expand.
    if (source !== 'tab') setPhase('expanded');
  };

  const handleClose = () => setPhase('unlocked');

  // Desktop layout
  if (!isMobile) {
    return (
      <>
        <Helmet>
          <title>Custom App Development, Real Pricing | OchAI</title>
          <link rel="canonical" href="https://ochai.dev/apps" />
          <meta name="description" content="Three tiers. Real prices. One builder — authoritative, deliberate, and expert about what it actually costs to build with me, whatever the scale." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ochai.dev/apps" />
          <meta property="og:title" content="Custom App Development, Real Pricing | OchAI" />
          <meta property="og:description" content="Three tiers. Real prices. One builder — authoritative, deliberate, and expert about what it actually costs to build with me, whatever the scale." />
          <meta property="og:image" content="/images/accompaniment.avif" />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{appsJsonLd}</script>
        </Helmet>
        <div className="relative flex items-start overflow-hidden bg-[#0a0a0f] pl-16 pt-[75px]"
          style={{ height: '100dvh' }}>
          {/* Phone mockup — left, vertically centered */}
          <div ref={phoneRef} className="relative flex-shrink-0">
            <PhoneMockup>
              {phase === 'locked' && <LockScreen onUnlock={handleUnlock} />}
              {(phase === 'unlocked' || phase === 'expanded') && (
                <AppInterior activeTier={activeTier} onSelectTier={handleSelectTier} />
              )}
            </PhoneMockup>
            {/* Genie sidebar — absolute to phone, appears right of it */}
            {phase === 'expanded' && (
              <GenieSidebar
                tier={TIERS.find(t => t.key === activeTier)}
                onClose={handleClose}
                phoneRef={phoneRef}
              />
            )}
          </div>
          {/* H1 visible to crawlers, visually positioned top-left of dark space */}
          <h1 className="absolute top-8 left-1/2 text-white/10 text-lg font-bold tracking-tight pointer-events-none select-none">
            Deliberate Pricing, Expert Build.
          </h1>
        </div>
      </>
    );
  }

  // Mobile layout — viewport IS the device, full-screen experience
  return (
    <>
      <Helmet>
        <title>Custom App Development, Real Pricing | OchAI</title>
        <link rel="canonical" href="https://ochai.dev/apps" />
        <meta name="description" content="Three tiers. Real prices. One builder — authoritative, deliberate, and expert about what it actually costs to build with me, whatever the scale." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/apps" />
        <meta property="og:title" content="Custom App Development, Real Pricing | OchAI" />
        <meta property="og:description" content="Three tiers. Real prices. One builder — authoritative, deliberate, and expert about what it actually costs to build with me, whatever the scale." />
        <meta property="og:image" content="/images/accompaniment.avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{appsJsonLd}</script>
      </Helmet>
      {/* Full-screen — sits under the site header via pt-safe */}
      <div className="relative overflow-hidden bg-[#0a0a0f]"
        style={{ height: '100dvh', paddingTop: 'env(safe-area-inset-top)' }}>
        {phase === 'locked' && (
          <div className="w-full h-full">
            <LockScreen onUnlock={handleUnlock} />
          </div>
        )}
        {(phase === 'unlocked' || phase === 'expanded') && (
          <div className="w-full h-full bg-[#fafaf8]">
            <AppInterior activeTier={activeTier} onSelectTier={handleSelectTier} />
          </div>
        )}
        {phase === 'expanded' && (
          <MobileExpanded
            tier={TIERS.find(t => t.key === activeTier)}
            onClose={handleClose}
          />
        )}
        <h1 className="sr-only">Deliberate Pricing, Expert Build.</h1>
      </div>
    </>
  );
};

export default Apps;
