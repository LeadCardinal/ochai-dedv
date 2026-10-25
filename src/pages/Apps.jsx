import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Fingerprint, Check, X, Signal, BatteryFull, MessageSquare, MessageCircle, Home, ChevronDown, CalendarDays, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { SITE, ORG_ID, AREA_SERVED } from '@/lib/schemaEntities';

const LOGO = '/images/ochai-header-logo.avif';
const CAL_URL = 'https://cal.com/jeremy-ochai-dev';
// EAS build artifacts expire 90 days after the build (built 2026-10-25, expires ~2027-01-23).
// Calendar reminder set for 2027-01-21: rebuild, then replace this URL.
const BYKEBYTES_APK_URL = 'https://expo.dev/artifacts/eas/hbFQHTRJ_B8TpbmS0An-yvVZkP2Psc4xlWSbqmS9728.apk';
const ASSETS = {
  soloist: '/images/soloist.avif',
  accompaniment: '/images/accompaniment.avif',
  collective: '/images/collective.avif',
};
// Wordmark art, transparent background — feeds AppInterior (inside the
// phone) exclusively. GenieSidebar keeps the photographic ASSETS above.
const TEXT_ASSETS = {
  soloist: '/images/soloist-text.avif',
  accompaniment: '/images/accompaniment-text-2.avif',
  collective: '/images/collective-text.avif',
};

const TIERS = [
  {
    key: 'soloist', label: 'Soloist', name: 'The Soloist', price: '$4,500',
    tagline: 'One builder, one clear scope.',
    description: 'Fastest path from idea to something real. Full-stack build, startup branding included.',
    features: ['Single-purpose app build', 'Startup branding included', 'Direct line to the builder'],
    image: ASSETS.soloist, textImage: TEXT_ASSETS.soloist,
  },
  {
    key: 'accompaniment', label: 'Accompaniment', name: 'The Accompaniment', price: '$14,500',
    tagline: 'Built together, not handed off.',
    description: 'Real workflows, more surface area, still one person answering the phone.',
    features: ['Multi-feature app build', 'Workflow / API integrations', 'AI where it earns its keep'],
    image: ASSETS.accompaniment, textImage: TEXT_ASSETS.accompaniment,
  },
  {
    key: 'collective', label: 'Collective', name: 'The Collective', price: '$38,500',
    priceSuffix: '+ $500/mo', tagline: 'The full arrangement, maintained.',
    description: 'Architecture, integration, retainer. Keeps working after launch instead of quietly rotting.',
    features: ['Full-scope custom app', 'Ongoing $500/mo retainer', 'Priority response window'],
    image: ASSETS.collective, textImage: TEXT_ASSETS.collective,
  },
];

// Derived from TIERS, not hand-duplicated — prices/descriptions here can't
// drift out of sync with the actual page content, because it's the same data.
const appsJsonLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': `${SITE}/apps/#service`,
  name: 'Custom App Development',
  serviceType: 'Custom App Development',
  provider: { '@id': ORG_ID },
  areaServed: AREA_SERVED,
  url: `${SITE}/apps/`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'App Development Tiers',
    itemListElement: TIERS.map(t => {
      const priceSpecification = t.priceSuffix
        ? [
            { '@type': 'UnitPriceSpecification', minPrice: t.price.replace(/\D/g, ''), priceCurrency: 'USD' },
            { '@type': 'PaymentChargeSpecification', price: t.priceSuffix.replace(/\D/g, ''), priceCurrency: 'USD', billingIncrement: 'P1M' },
          ]
        : { '@type': 'UnitPriceSpecification', minPrice: t.price.replace(/\D/g, ''), priceCurrency: 'USD' };
      return {
        '@type': 'Offer', name: t.name, description: `${t.tagline} ${t.description}`,
        image: `https://ochai.dev${t.image}`, priceSpecification,
      };
    }),
  },
});


const FAQS = [
  { q: 'How much does a custom app cost?', a: `App builds start at ${TIERS[0].price} (${TIERS[0].name}). Larger scopes run ${TIERS[1].price} (${TIERS[1].name}) and ${TIERS[2].price} plus ${TIERS[2].priceSuffix.replace('+ ', '')} (${TIERS[2].name}). The final price is fixed in a written proposal after a free discovery call.` },
  { q: 'Why choose a solo developer over an agency?', a: 'You get direct communication and no hand-offs. The trade-off is limited capacity, so I am upfront about timelines and take on a small number of projects at a time.' },
  { q: 'Who owns the code?', a: 'You do. You own the code and hosting, with documentation for the next developer. I can keep maintaining and extending the app, or hand it to another developer.' },
  { q: 'Can you connect the app to software we already use?', a: 'Often yes. Integrations with payments, messaging, calendars, maps and existing databases are a normal part of the work.' },
  { q: 'Do you build AI features into apps?', a: 'Yes. That includes custom Claude API integration and workflow automation, built into the system it automates rather than bolted on as a chatbot.' },
];

const bykebytesJsonLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'BykeBytes',
  description: 'Cycling trip tracker for Android. Starts recording by itself when you get moving and keeps recording with the screen off. Logs speed, distance and elevation per ride, with CSV export. Data stays on the phone.',
  applicationCategory: 'HealthAndFitnessApplication',
  operatingSystem: 'Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  creator: { '@id': ORG_ID },
});

const appsFaqJsonLd = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

const BUILDS = [
  { title: 'Client portals and dashboards', body: 'Logins, role-based access and dashboards for businesses that have outgrown a template site.' },
  { title: 'Workflow and internal tools', body: "Software that follows how your team actually works, instead of forcing your process into an off-the-shelf tool's shape." },
  { title: 'E-commerce and payments', body: 'Storefronts and checkout with Stripe or Square, built and run in production.', to: '/case-study/reallivebonsai/', linkLabel: 'Real Live Bonsai case study' },
  { title: 'AI-powered apps', body: 'Claude API integration and workflow automation wired into the system it automates, not a chatbot bolted onto a homepage.', to: '/ai-integration-small-business/', linkLabel: 'AI integration for small business' },
];

const INCLUDED = [
  'Source code you own, with documentation for the next developer.',
  'Database design, authentication and the integrations your process needs: payments, messaging, maps, calendars.',
  'Deployment, hosting and security headers configured for production.',
  'Analytics that show what users actually do.',
];

const PROCESS = [
  { step: '01', title: 'Free discovery call', text: 'A no-obligation conversation, 20 to 30 minutes. You talk, I listen.' },
  { step: '02', title: 'Written proposal', text: 'Deliverables, timeline and a fixed price, agreed before any work starts.' },
  { step: '03', title: 'Milestone builds', text: 'Working software you can use and judge early. You approve before we move on.' },
  { step: '04', title: 'Launch and support', text: 'You own the code and hosting. I can keep maintaining it, or hand it off with documentation.' },
];

const FIT = [
  'You need software shaped to your process, not the other way around.',
  'You want a single point of contact through build, launch and changes.',
  'You prefer staged milestones and clear scope.',
];
const NOT_FIT = [
  'You need a large in-house team embedded for many months.',
  'You require a platform that must serve millions of users on day one.',
  'You want a finished product off the shelf. A subscription tool will be cheaper.',
];

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

// Real time, tuned to the minute rather than the second — a status bar
// clock earns nothing from re-rendering 60x more often than it visibly changes.
function useLiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const msToNextMinute = (60 - new Date().getSeconds()) * 1000;
    const aligner = setTimeout(() => {
      setTime(new Date());
    }, msToNextMinute);
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => { clearTimeout(aligner); clearInterval(interval); };
  }, []);
  let hours = time.getHours() % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${String(time.getMinutes()).padStart(2, '0')}`;
}

// LockScreen — dark glass, logo centered, fingerprint bottom-third
const LockScreen = ({ onUnlock }) => {
  const clock = useLiveClock();
  const fpRef = useRef(null);
  const handleTap = () => {
    const tl = gsap.timeline({ onComplete: onUnlock });
    tl.to(fpRef.current, { scale: 0.82, duration: 0.09, ease: 'power2.in' })
      .to(fpRef.current, { scale: 1.15, duration: 0.14, ease: 'back.out(3)' })
      .to(fpRef.current, { opacity: 0, scale: 0.5, duration: 0.2, ease: 'power1.in' });
  };
  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full bg-[#080810] select-none">
      {/* Status bar simulation — real clock, iOS-style glyphs */}
      <div className="w-full flex justify-between items-center px-5 pt-3 text-white/40 flex-shrink-0">
        <span className="text-[10px] font-medium tracking-wide">{clock}</span>
        <div className="flex items-center gap-1.5">
          <MessageSquare className="w-3 h-3" strokeWidth={2} />
          <span className="relative">
            <MessageCircle className="w-3 h-3" strokeWidth={2} />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </span>
          <Signal className="w-3 h-3" strokeWidth={2} />
          <span className="text-[8px] font-bold leading-none">5G<sup className="text-[6px]">UW</sup></span>
          <BatteryFull className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>
      </div>
      {/* Branding */}
      <div className="flex flex-col items-center gap-2 flex-1 justify-center w-full text-center">
        <img src={LOGO} alt="OchAI" className="w-48 h-48 object-contain drop-shadow-lg mx-auto"
          style={{ transform: 'translateX(-18px)' }} />
        {/* translateX above is a stopgap: pixel-measured from a screenshot,
            the text and fingerprint button below both land exactly on the
            phone's true center — this logo file's own artwork sits ~9% of
            its box right-of-center inside its own canvas. That's a source-
            asset issue (asymmetric transparent padding), not a layout bug.
            Re-export the logo centered in its canvas and remove this line. */}
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

// AppInterior — light app, logo top bar, tier content or home screen, bottom tabs
const AppInterior = ({ activeTier, onSelectTier, onGoHome }) => {
  const tier = TIERS.find(t => t.key === activeTier);
  return (
    <div className="flex flex-col w-full h-full bg-[#fafaf8] overflow-hidden">
      {/* Top bar — logo/text on the left resets to the app's own tier
          menu (internal "home"). The house icon on the right is a
          different thing entirely: it leaves the mockup and goes to the
          real ochai.dev homepage. Two distinct actions, kept visually
          distinct so neither reads as doing the other's job. */}
      <div className="flex items-center justify-between px-4 py-1 border-b border-slate-100 flex-shrink-0 bg-white">
        <button type="button" onClick={onGoHome}
          className="flex items-center gap-2 text-left hover:opacity-70 transition-opacity">
          <img src={LOGO} alt="OchAI" className="w-5 h-5 object-contain" />
          <span className="text-[11px] font-bold text-slate-800 tracking-tight">OchAI Dev</span>
        </button>
        <Link to="/" aria-label="Back to ochai.dev homepage"
          className="text-slate-900 hover:opacity-60 transition-opacity">
          <Home className="w-4 h-4" strokeWidth={2.25} />
        </Link>
      </div>

      {/* Content — home screen when no tier selected, tier detail otherwise */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {!tier ? (
          // Home screen — 3 CTA buttons
          <div className="flex flex-col gap-3 px-4 pb-4 pt-1.5">
            <p className="text-[10px] text-slate-400 text-center mb-1 uppercase tracking-widest">Choose your tier</p>
            {TIERS.map(t => (
              <button key={t.key} onClick={() => onSelectTier(t.key)}
                className="w-full text-left rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all overflow-hidden">
                <div className="px-3 py-2.5">
                  {/* Full width of the device's own screen — same rule whether
                      that screen is the small desktop mockup or the real
                      viewport on an actual phone. It's the same component
                      either way, so no breakpoint split belongs here. */}
                  <div className="flex flex-col gap-1">
                    <img src={t.textImage} alt={t.name} className="w-full h-auto object-contain" />
                    <span className="text-xs font-black text-amber-600">{t.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{t.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Tier detail
          <div className="p-4">
            <div className="w-full rounded-xl mb-3 bg-gradient-to-br from-amber-50 to-stone-50 flex items-center justify-center overflow-hidden">
              <img src={tier.textImage} alt={tier.name} className="w-full h-auto object-contain" />
            </div>
            <p className="text-[10px] font-black text-amber-600">{tier.price}
              {tier.priceSuffix && <span className="text-slate-400 font-normal ml-1">{tier.priceSuffix}</span>}
            </p>
            <p className="text-[9px] text-slate-400">+/- final scope dependent</p>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">{tier.tagline}</p>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{tier.description}</p>
            <ul className="mt-3 space-y-1.5">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-1.5 text-[10px] text-slate-600">
                  <Check className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom tab bar — tight pills instead of a full-bleed stacked bar.
          flex-1 + min-w-0 + truncate on each pill so all three always
          divide the available width exactly; justify-center with
          natural-width pills was what let the outer two run past the
          phone's screen edge and get clipped. No background bar — pills
          float directly on AppInterior's own #fafaf8. */}
      <div className="flex items-center gap-1 px-2 py-1.5 flex-shrink-0">
        {TIERS.map(t => (
          <button key={t.key} onClick={() => onSelectTier(t.key, 'tab')}
            className={['flex-1 min-w-0 px-1 py-1 rounded-full text-[9px] font-bold text-center truncate transition-colors',
              activeTier === t.key ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'].join(' ')}>
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
    <div ref={sidebarRef} className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-[760px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10">
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
      {/* grid-cols-[420px_1fr]: image column sized to its actual asset (750×448,
          ~1.67:1), not an arbitrary 50/50 split — that's what let the old box
          crop the photo instead of showing what you widened it to show. */}
      <div className="grid grid-cols-[420px_1fr] gap-0">
        <div className="p-6 border-r border-slate-100">
          <img src={tier.image} alt={tier.name}
            className="w-full aspect-[750/448] object-cover rounded-xl mb-4" />
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
          <BookCall className="mt-6 px-5 py-2.5 text-sm" />
          <p className="text-[10px] text-slate-400 mt-4 italic">Authoritative. Deliberate. Expert.</p>
        </div>
      </div>
    </div>
  );
};

// PhoneMockup — bezel + screen, desktop only
// Sized in dvh, not raw px, so it scales itself down before it ever has to
// go begging the container for room it doesn't have.
// Bezel/inset/radius are tuned for THIS size range, not inherited from the
// old 280×560 case — a thick collar that read fine on a bigger phone reads
// like a 2008 handset once the case shrinks around it.
const PhoneMockup = ({ children }) => (
  <div className="relative flex-shrink-0"
    style={{
      // Height drives the size, aspectRatio derives width from it — one
      // source of truth instead of two clamp() curves that can drift out
      // of sync with each other (which is exactly how the last version
      // ended up squat). 9:19.5 is current-gen phone proportions, not
      // the 1:2 slab this used to be.
      height: 'clamp(460px, 64dvh, 680px)',
      aspectRatio: '9 / 19.5',
      filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.7))',
    }}>
    {/* Outer bezel — thinner border, tighter radius, modern proportions */}
    <div className="absolute inset-0 rounded-[40px] bg-[#111118] border border-[#2a2a35]" />
    {/* Side buttons — positioned by %, so they track the bezel instead of drifting off it as it shrinks */}
    <div className="absolute -left-[2px] top-[17%] w-[2px] h-[6%] rounded-l-sm bg-[#2a2a35]" />
    <div className="absolute -left-[2px] top-[26%] w-[2px] h-[9%] rounded-l-sm bg-[#2a2a35]" />
    <div className="absolute -right-[2px] top-[20%] w-[2px] h-[10%] rounded-r-sm bg-[#2a2a35]" />
    {/* Speaker notch — scaled down to a modern pill, not a 2008 grille */}
    <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-[#1a1a25]" />
    {/* Home indicator — likewise */}
    <div className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />
    {/* Screen — thin bezel margin instead of a thick 10px collar */}
    <div className="absolute inset-[5px] rounded-[35px] overflow-hidden bg-[#080810]">
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
        {/* Same aspect-[750/448] technique GenieSidebar uses on desktop —
            matching the box's shape to the image's own native ratio means
            object-cover has nothing to crop. The old h-40 fixed-height
            box forced a wider-than-tall container onto a taller-than-wide
            image, cropping top and bottom to force the fit. */}
        <img src={tier.image} alt={tier.name}
          className="w-full aspect-[750/448] object-cover rounded-xl mb-4" />
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
        <BookCall className="mt-6 w-full px-5 py-3 text-sm" />
        <p className="text-[10px] text-slate-400 mt-6 italic text-center">Authoritative. Deliberate. Expert.</p>
      </div>
    </div>
  );
};

// BookCall — amber CTA that matches the page's tier accent
const BookCall = ({ className = '' }) => (
  <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold transition-colors ${className}`}>
    <CalendarDays className="w-4 h-4" /> Book a free discovery call
  </a>
);

// ScrollCue — same cue the homepage hero uses, pointing at the detail below the phone
const ScrollCue = ({ className = '' }) => (
  <button type="button" aria-label="Scroll for more detail"
    onClick={() => document.getElementById('apps-detail')?.scrollIntoView({ behavior: 'smooth' })}
    className={`flex flex-col items-center gap-1 cursor-pointer ${className}`}>
    <span className="text-slate-200 text-sm font-medium tracking-wide uppercase">Scroll for more detail</span>
    <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
      <ChevronDown className="w-6 h-6 text-cyan-300" />
    </motion.span>
  </button>
);

// AppsDetail — real, visible, crawlable copy below the phone. Plain markup on
// purpose (no entrance animation) so the prerendered HTML carries every word.
const DetailSection = ({ title, children }) => (
  <section className="py-14 border-t border-slate-800">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
    {children}
  </section>
);

const AppsDetail = () => (
  <div id="apps-detail" className="bg-[#0a0a0f] text-white pb-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <section className="pt-16 pb-14">
        <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Huntsville, North Alabama &amp; remote</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">Custom apps for Huntsville and North Alabama businesses</h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          OchAI is a one-developer full-stack practice in Huntsville, Alabama. Front end, back end, database, hosting and analytics all come from the same person, so your app has one owner from the first sketch to production. Serving North Alabama and remote clients.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <BookCall className="px-6 py-3" />
          <Link to="/services/" className="inline-flex items-center gap-2 border border-slate-600 hover:border-amber-400 px-6 py-3 rounded-full transition-colors">
            Website packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <DetailSection title="What I build">
        <div className="grid md:grid-cols-2 gap-4">
          {BUILDS.map(b => (
            <div key={b.title} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold mb-2">{b.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{b.body}</p>
              {b.to && (
                <Link to={b.to} className="inline-block mt-3 text-sm text-amber-400 hover:text-amber-300 underline">{b.linkLabel}</Link>
              )}
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection title="Built and in use: BykeBytes">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">Ride tracking that works with the screen off</h3>
          <p className="text-slate-300 leading-relaxed">
            BykeBytes is a cycling trip tracker for Android. It starts recording by itself when you get moving and keeps going with the phone locked, in your pocket or stowed away. Each ride logs date, start and finish, average and top speed, elevation change and distance. History with CSV export and bulk delete functions. All data stays on the phone: no account, no cloud.
          </p>
          <p className="text-slate-400 text-sm mt-3">
            Built by OchAI with AI-assisted development, using Expo and React Native. Android only for now, shared as a direct build rather than through Google Play.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a href={BYKEBYTES_APK_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 transition-colors">
              <Download className="w-4 h-4" /> Download the Android app
            </a>
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-amber-400 px-6 py-3 rounded-full transition-colors">
              Ask about the build <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-slate-500 text-xs mt-3">Your phone may ask you to allow installs from your browser. That is normal for apps outside Google Play.</p>
        </div>
      </DetailSection>

      <DetailSection title="The three tiers">
        <div className="grid md:grid-cols-3 gap-4">
          {TIERS.map(t => (
            <div key={t.key} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-2xl font-black text-amber-400 mt-1">{t.price}
                {t.priceSuffix && <span className="text-sm font-normal text-slate-400 ml-1">{t.priceSuffix}</span>}
              </p>
              <p className="text-sm text-slate-200 mt-2">{t.tagline}</p>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{t.description}</p>
              <ul className="mt-3 space-y-2">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-400 mt-4">Prices are starting points, plus or minus final scope. The written proposal fixes the number before any work begins.</p>
      </DetailSection>

      <DetailSection title="What every build includes">
        <ul className="space-y-3">
          {INCLUDED.map(i => (
            <li key={i} className="flex gap-3 text-slate-300">
              <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /><span>{i}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title="How it works">
        <div className="grid md:grid-cols-2 gap-4">
          {PROCESS.map(p => (
            <div key={p.step} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <p className="text-amber-400 text-xs font-bold tracking-widest mb-1">{p.step}</p>
              <h3 className="font-bold mb-1">{p.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection title="Proof you can check yourself">
        <p className="text-slate-300 leading-relaxed">
          Four production properties, built and operated by me, all scoring 100 on Lighthouse: ochai.dev, reallivebonsai.us, hsvdrone.com and themeaningsoflife.com. For a full e-commerce build with payments and analytics, read the{' '}
          <Link to="/case-study/reallivebonsai/" className="text-amber-400 hover:text-amber-300 underline">Real Live Bonsai case study</Link>.
          For the plain-English version of the stack, see{' '}
          <Link to="/full-stack-development-small-business/" className="text-amber-400 hover:text-amber-300 underline">full-stack development for small business</Link>.
        </p>
      </DetailSection>

      <DetailSection title="Best fit, and not a fit">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-5">
            <h3 className="font-bold mb-3 text-emerald-300">Best fit</h3>
            <ul className="space-y-2">
              {FIT.map(f => <li key={f} className="flex gap-2 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{f}</li>)}
            </ul>
          </div>
          <div className="bg-slate-900/50 border border-rose-500/30 rounded-xl p-5">
            <h3 className="font-bold mb-3 text-rose-300">Not a fit</h3>
            <ul className="space-y-2">
              {NOT_FIT.map(f => <li key={f} className="flex gap-2 text-sm text-slate-300"><X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />{f}</li>)}
            </ul>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Common questions">
        <div className="space-y-4">
          {FAQS.map(f => (
            <div key={f.q} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold mb-2">{f.q}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </DetailSection>

      <section className="py-14 border-t border-slate-800 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Tell me what you want to build.</h2>
        <p className="text-slate-300 mb-6">The discovery call costs nothing. You talk, I listen, and you leave knowing whether it is a fit.</p>
        <BookCall className="px-8 py-4 text-lg" />
        <p className="text-slate-400 text-sm mt-8">
          OchAI is run by Jeremy Och in Huntsville, Alabama. Reach me at{' '}
          <a href="mailto:jeremy@ochai.dev" className="text-amber-400 hover:text-amber-300">jeremy@ochai.dev</a>.
        </p>
      </section>
    </div>
  </div>
);

// Main page component
const Apps = () => {
  const isMobile = useMatchMedia('(max-width: 768px)');
  // phase: 'locked' | 'unlocked' | 'expanded'
  const [phase, setPhase] = useState('locked');
  const [activeTier, setActiveTier] = useState(null);
  const phoneRef = useRef(null);

  // Header.jsx shows itself briefly then slides out on this route, and
  // fires this event on its way out. Once it's gone, the top clearance
  // this page was holding open for it is dead weight — drop it so the
  // app rises to fill the space the header just vacated.
  const [headerCleared, setHeaderCleared] = useState(false);
  useEffect(() => {
    const handler = () => setHeaderCleared(true);
    window.addEventListener('ochai:header-hidden', handler);
    return () => window.removeEventListener('ochai:header-hidden', handler);
  }, []);

  const handleUnlock = () => setPhase('unlocked');

  const handleSelectTier = (key, source) => {
    setActiveTier(key);
    // Tab tap from within an already-active tier just switches content.
    // Anything else — home screen CTA tap — triggers the expand.
    if (source !== 'tab' || activeTier === null) setPhase('expanded');
  };

  const handleClose = () => setPhase('unlocked');

  // The only way back to the three-tier menu — tabs and Explore only
  // ever moved deeper (tier detail, then expanded), never out.
  const handleGoHome = () => {
    setActiveTier(null);
    setPhase('unlocked');
  };

  // Desktop layout
  if (!isMobile) {
    return (
      <>
        <Helmet>
          <title>Custom App Development, Real Pricing | North Alabama | OchAI</title>
          <link rel="canonical" href="https://ochai.dev/apps/" />
          <meta name="description" content="Real prices, real performance, right now — no sales pitch required. Custom app development, fixed tiers, solo build. Free call." />
          <meta name="keywords" content="custom app development pricing, fixed-price app development, app development cost, solo full-stack developer, AI app development pricing, app development quote North Alabama, hire app developer Huntsville, custom software development pricing, full-stack app development services" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ochai.dev/apps/" />
          <meta property="og:title" content="Custom App Development, Real Pricing | North Alabama | OchAI" />
          <meta property="og:description" content="Real prices, real performance, right now — no sales pitch required. Custom app development, fixed tiers, solo build. Free call." />
          <meta property="og:image" content="https://ochai.dev/images/accompaniment.avif" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://ochai.dev/apps/" />
          <meta name="twitter:title" content="Custom App Development, Real Pricing | North Alabama | OchAI" />
          <meta name="twitter:description" content="Real prices, real performance, right now — no sales pitch required. Custom app development, fixed tiers, solo build. Free call." />
          <script type="application/ld+json">{appsJsonLd}</script>
        <script type="application/ld+json">{appsFaqJsonLd}</script>
        <script type="application/ld+json">{bykebytesJsonLd}</script>
        </Helmet>
        <div className="relative flex items-start bg-[#0a0a0f] pl-16"
          style={{
            minHeight: '100dvh',
            paddingTop: headerCleared ? '24px' : '75px',
            transition: 'padding-top 600ms ease',
          }}>
          {/* Phone mockup — left, vertically centered */}
          <div ref={phoneRef} className="relative flex-shrink-0">
            <PhoneMockup>
              {phase === 'locked' && <LockScreen onUnlock={handleUnlock} />}
              {(phase === 'unlocked' || phase === 'expanded') && (
                <AppInterior activeTier={activeTier} onSelectTier={handleSelectTier} onGoHome={handleGoHome} />
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
          {/* Ambient backdrop — a normal flex sibling taking whatever space
              is left after the phone, not an absolutely-positioned box with
              hand-measured coordinates. That means it never needs updating
              again if the phone or GenieSidebar's width changes later —
              flexbox does the math this time, not me. GenieSidebar (z-10)
              paints over this when a tier's open, same as you described. */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {/* Same height clamp() as PhoneMockup, and the image's own
                aspect ratio (900/475) as the box's aspect-ratio — so
                object-cover has nothing to crop, it just fills exactly.
                Matching height + matching corner radius is what makes
                this read as a matched pair instead of two unrelated
                shapes sharing a room. */}
            <div className="relative flex-shrink-0 rounded-[40px] overflow-hidden opacity-80"
              style={{
                height: 'clamp(460px, 64dvh, 680px)',
                aspectRatio: '900 / 475',
              }}>
              <img src="/images/app-flow-3.avif" alt=""
                className="w-full h-full object-cover pointer-events-none select-none" />
            </div>
          </div>
          {/* H1 visible to crawlers, visually positioned top-left of dark space */}
          <h1 className="absolute top-8 left-1/2 text-white/70 text-lg font-bold tracking-tight pointer-events-none select-none">
            Deliberate Pricing, Expert Build.
          </h1>
          <ScrollCue className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20" />
        </div>
        <AppsDetail />
      </>
    );
  }

  // Mobile layout — viewport IS the device, full-screen experience
  return (
    <>
      <Helmet>
        <title>Custom App Development, Real Pricing | North Alabama | OchAI</title>
        <link rel="canonical" href="https://ochai.dev/apps/" />
        <meta name="description" content="Real prices, real performance, right now — no sales pitch required. Custom app development, fixed tiers, solo build. Free call." />
        <meta name="keywords" content="custom app development pricing, fixed-price app development, app development cost, solo full-stack developer, AI app development pricing, app development quote North Alabama, hire app developer Huntsville, custom software development pricing, full-stack app development services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/apps/" />
        <meta property="og:title" content="Custom App Development, Real Pricing | North Alabama | OchAI" />
        <meta property="og:description" content="Real prices, real performance, right now — no sales pitch required. Custom app development, fixed tiers, solo build. Free call." />
        <meta property="og:image" content="https://ochai.dev/images/accompaniment.avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ochai.dev/apps/" />
        <meta name="twitter:title" content="Custom App Development, Real Pricing | North Alabama | OchAI" />
        <meta name="twitter:description" content="Real prices, real performance, right now — no sales pitch required. Custom app development, fixed tiers, solo build. Free call." />
        <script type="application/ld+json">{appsJsonLd}</script>
        <script type="application/ld+json">{appsFaqJsonLd}</script>
        <script type="application/ld+json">{bykebytesJsonLd}</script>
      </Helmet>
      {/* Full-screen — the same brief header visibility applies here too;
          it was silently sitting on top of this content before, not "under" it. */}
      <div className="relative overflow-hidden bg-[#0a0a0f]"
        style={{
          height: 'calc(100dvh - 3.5rem)',
          paddingTop: headerCleared ? 'env(safe-area-inset-top)' : 'calc(env(safe-area-inset-top) + 75px)',
          transition: 'padding-top 600ms ease',
        }}>
        {phase === 'locked' && (
          <div className="w-full h-full">
            <LockScreen onUnlock={handleUnlock} />
          </div>
        )}
        {(phase === 'unlocked' || phase === 'expanded') && (
          <div className="w-full h-full bg-[#fafaf8]">
            <AppInterior activeTier={activeTier} onSelectTier={handleSelectTier} onGoHome={handleGoHome} />
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
      <div className="bg-[#0a0a0f] h-14 flex items-center justify-center"><ScrollCue /></div>
      <AppsDetail />
    </>
  );
};

export default Apps;
