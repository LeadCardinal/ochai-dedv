import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CalendarDays, Mail, ArrowRight, Search, FileText, Hammer, LifeBuoy, Download } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAL_URL = 'https://cal.com/jeremy-ochai-dev';
const EMAIL_URL =
  'mailto:jeremy@ochai.dev?subject=' +
  encodeURIComponent('Discovery Call Request') +
  '&body=' +
  encodeURIComponent('Hi Jeremy,\n\nI would like to discuss a project.\n\nBusiness/Project name:\nWhat I need:\nTimeline:\nBest way to reach me:\n');

const ASSETS = {
  rocket:        '/images/parallax/rocket.svg',
  asteroid:      '/images/parallax/asteroid.svg',
  asteroid2:     '/images/parallax/asteroid2.svg',
  asteroid3:     '/images/parallax/asteroid3.svg',
  asteroid4:     '/images/parallax/asteroid4.svg',
  performance:   '/images/parallax/performance.svg',
  accessibility: '/images/parallax/accessibility.svg',
  bestPractices: '/images/parallax/best-practices.svg',
  seo:           '/images/parallax/seo.svg',
  earthAvif:        '/images/parallax/earth.avif',
  earthWebm:        '/images/parallax/earth.webm',
  earthMobileAvif:  '/earth-mobile.avif',
  earthMobileMp4:   '/earth-mobile.mp4',
  earthMobileWebm:  '/videos/hero_mobile.webm',
  logoMobile:       '/logo-mobile.avif',
  acronymMobile:    '/acronym-mobile.avif',
  ai:            '/images/parallax/ai.svg',
  shipLogo:      '/images/parallax/ship-logo.svg',
  acronymLogo:   '/images/parallax/acronym-after-logo2.svg',
  quartet:          '/images/parallax/thequartet2.svg',
  ensemble:         '/images/parallax/theensemble2.svg',
  symphony:         '/images/parallax/thesymphony2.svg',
  quartetMobile:    '/thequartet-mobile.avif',
  ensembleMobile:   '/ensemble-mobile.avif',
  symphonyMobile:   '/symphony-mobile.avif',
};

const applauseAudio = typeof window !== 'undefined' ? new Audio('/audio/applause.mp3') : null;

function playApplause() {
  if (!applauseAudio) return;
  applauseAudio.currentTime = 0;
  applauseAudio.volume = 0.7;
  applauseAudio.play().catch(() => {});
}

const KEYFRAME_CSS = `
  @keyframes float-0 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(12px, -18px) rotate(8deg); }
  }
  @keyframes float-1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-10px, 14px) rotate(-6deg); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(8px, -10px) rotate(4deg); }
    66% { transform: translate(-6px, 8px) rotate(-3deg); }
  }
`;

const servicesJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'OchAI Web Development & AI Integration Services',
  founder: { '@type': 'Person', name: 'Jeremy Carter Och' },
  url: 'https://ochai.dev/services',
  email: 'jeremy@ochai.dev',
  telephone: '+1-256-361-9056',
  priceRange: '$$',
  address: { '@type': 'PostalAddress', addressLocality: 'Huntsville', addressRegion: 'AL', addressCountry: 'US' },
  areaServed: ['Huntsville AL', 'Madison AL', 'North Alabama', 'Remote / United States'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'The Quartet',  description: 'Complete professional web presence. Lighthouse 100 guaranteed. Starting at $2,500.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'The Ensemble', description: 'Growth web platform with keyword strategy, local SEO, CMS. Starting at $5,500.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'The Symphony', description: 'Full orchestration for enterprise and defense clients. AI integration, Cloudflare edge. Starting at $12,000.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Identity',         description: 'Fresh brand creation and renewal including logo, color system, brand guidelines.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Production & Delivery', description: 'Web-optimized video served at edge speed. Lighthouse 100 intact.' } },
  ],
});

const CalEmbed = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'jeremy-ochai-dev' });
      cal('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': '#06b6d4' }, dark: { 'cal-brand': '#06b6d4' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <Cal
      namespace="jeremy-ochai-dev"
      calLink="jeremy-ochai-dev"
      style={{ width: '100%', height: '700px', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  );
};

const proofPoints = [
  { metric: '89%',     label: 'YoY organic traffic growth',       detail: 'reallivebonsai.us — zero paid ads',                  to: '/case-study/reallivebonsai' },
  { metric: '100/100', label: 'Google Lighthouse scores',          detail: 'Performance · SEO · Accessibility · Best Practices', to: '/case-study/themeaningsoflife' },
  { metric: 'Page 1',  label: 'Google rankings in under 30 days', detail: 'hsvdrone.com — local SEO',                           to: '/case-study/hsvdrone' },
];

const processSteps = [
  { icon: Search,   step: '01', title: 'Free Discovery Call', text: 'A no-obligation conversation about your business, your goals, and what is getting in the way. 20-30 minutes. You talk, I listen.' },
  { icon: FileText, step: '02', title: 'Custom Proposal',     text: 'A written proposal scoped to your actual needs — deliverables, timeline, and a fixed price. No surprise invoices, no padded hours.' },
  { icon: Hammer,   step: '03', title: 'Build & Iterate',     text: 'You see progress at every milestone and approve before we move on. Built to the same standards as my own properties: fast, measurable, maintainable.' },
  { icon: LifeBuoy, step: '04', title: 'Launch & Support',    text: 'Deployment, analytics wiring, and a support plan sized to your comfort level — from full handoff to ongoing operations.' },
];

const tiers = [
  {
    id: 'quartet', splash: ASSETS.quartet, splashMobile: ASSETS.quartetMobile, splashAlt: 'The Quartet', name: 'The Quartet', emoji: '🎻',
    price: 'Starting at $2,500', tagline: 'A complete, professional web presence — nothing missing, nothing wasted.',
    coverage: '40%', coverageLabel: 'of your conversion architecture',
    color: 'from-emerald-400 to-cyan-400', borderColor: 'border-emerald-500/40', glowColor: 'shadow-emerald-500/10',
    bestFor: 'Local service businesses, solo professionals, consultants, startups establishing their first real web presence.',
    includes: [
      'Discovery & brand alignment session', 'Custom design — no templates',
      'Scope-based build (no arbitrary page limits)', 'Lighthouse 100 — guaranteed contractually',
      'Full on-page SEO foundation (built in, not bolted on)',
      'Meta titles, descriptions, schema, sitemap, GSC submission', 'Google Analytics / GA4 integration',
      'Cloudflare Pages deployment + initial infrastructure setup',
      'SSL, mobile-first, cross-browser QA tested', '30-day post-launch support', '1 round of design revisions',
    ],
    addOns: 'E-commerce, blog/CMS, booking integration, additional content pages',
  },
  {
    id: 'ensemble', splash: ASSETS.ensemble, splashMobile: ASSETS.ensembleMobile, splashAlt: 'The Ensemble', name: 'The Ensemble', emoji: '🎺',
    price: 'Starting at $5,500', tagline: 'More moving parts. More reach. Built for businesses that need their site to do real work.',
    coverage: '70%', coverageLabel: 'of your conversion architecture',
    color: 'from-cyan-400 to-blue-400', borderColor: 'border-cyan-500/40', glowColor: 'shadow-cyan-500/10',
    bestFor: 'Established small businesses, multi-service companies, growing brands that need to win on search.',
    includes: [
      'Everything in The Quartet, plus:',
      'Keyword research — up to 10 target terms mapped to site structure',
      'On-page content optimization around target terms',
      'Google Business Profile setup & optimization (Local SEO)',
      'Blog or resource section with CMS', 'Lead generation optimization (CTAs, conversion flow review)',
      'Social media meta integration (OG tags, Twitter/X cards)',
      'Basic competitor visibility analysis', '2 rounds of design revisions',
    ],
    addOns: 'E-commerce, advanced schema, monthly SEO retainer, Cloudflare edge maintenance',
  },
  {
    id: 'symphony', splash: ASSETS.symphony, splashMobile: ASSETS.symphonyMobile, splashAlt: 'The Symphony', name: 'The Symphony', emoji: '🎼',
    price: 'Starting at $12,000', tagline: 'Full orchestration. Every instrument in its place. Built to perform.',
    coverage: null, coverageLabel: 'Full coverage. All instruments playing.',
    color: 'from-violet-400 to-fuchsia-400', borderColor: 'border-violet-500/40', glowColor: 'shadow-violet-500/20',
    bestFor: 'Defense/aerospace contractors, multi-location businesses, e-commerce, organizations where the website is a direct revenue or credibility instrument.',
    includes: [
      'Everything in The Ensemble, plus:', 'Full site architecture & UX strategy session',
      'Unlimited pages within agreed project scope',
      'Comprehensive keyword strategy (20+ terms, cluster mapping)',
      'Full content optimization across all pages',
      'Advanced schema markup (Organization, LocalBusiness, FAQ, etc.)',
      'Competitor gap analysis — SEO + positioning',
      'E-commerce or web application capability (scoped per project)',
      'AI integration — chatbot, automation, intelligent features',
      'Custom Cloudflare Workers / edge logic as needed',
      'Cloudflare Zaraz setup (analytics orchestration, tag management)',
      'Priority delivery & dedicated project communication',
      '60-day post-launch support', '3 rounds of design revisions',
      'Anything you can dream up — if you can imagine it, it goes on the table.',
    ],
    addOns: null,
  },
];

// z < 20 = behind rocket | scaleFrom/scaleTo = scale range during scroll
// All x ranges clamped to ±60vw max — keeps travel arcs visible on desktop
// Every entry has unique path origin + scrub speed — no two share both
const asteroidDefs = [
  // performance — z dropped to 18, now behind rocket; drifts diagonally down-left
  { src: 'performance',   size: 240, top: 12, left: 72, z: 18,
    fromX:  '62vw',  fromY: '-30vh',
    exitX: '-55vw',  exitY:  '75vh', scrub: 0.7  },

  // accessibility — own origin top-center-left, steeper diagonal, unique speed
  { src: 'accessibility', size: 195, top: 50, left: 18, z: 25,
    fromX: '-58vw',  fromY:  '15vh',
    exitX:  '52vw',  exitY:  '85vh', scrub: 1.1  },

  // bestPractices — grows 1→2 while crossing so text becomes legible
  { src: 'bestPractices', size: 165, top: 35, left: 52, z: 15,
    fromX:  '55vw',  fromY:  '60vh',
    exitX: '-50vw',  exitY: '-25vh', scrub: 0.45, scaleFrom: 1, scaleTo: 2.0 },


  // seo — enters center-left (nudged up from 65), grows 0.5→1 as it rises up-right
  { src: 'seo',           size: 210, top: 48, left: 38, z: 28,
    fromX: '-60vw',  fromY:  '55vh',
    exitX:  '58vw',  exitY: '-20vh', scrub: 0.8, scaleFrom: 0.5, scaleTo: 1 },

  // asteroid (large) — z dropped to 16, now behind rocket; slow sweeping presence
  { src: 'asteroid',      size: 380, top: 18, left: 15, z: 16,
    fromX: '-55vw',  fromY: '-40vh',
    exitX:  '60vw',  exitY:  '80vh', scrub: 0.35, scaleFrom: 0.6, scaleTo: 1 },

  // asteroid2 — enters right-center, cuts left and downward
  { src: 'asteroid2',     size: 140, top: 44, left: 68, z: 12,
    fromX:  '58vw',  fromY:  '20vh',
    exitX: '-52vw',  exitY:  '65vh', scrub: 0.6  },


  // asteroid4 — drops down-left, slight overshoot scale 0.7→1.1
  { src: 'asteroid4',     size: 195, top:  6, left: 50, z: 10,
    fromX:  '20vw',  fromY: '-55vh',
    exitX: '-58vw',  exitY:  '60vh', scrub: 0.95, scaleFrom: 0.7, scaleTo: 1.1 },

  // ai sparkles — nudged up from 72 to 50, drifts up-right, own speed
  { src: 'ai',            size: 180, top: 50, left: 42, z: 22,
    fromX: '-15vw',  fromY:  '65vh',
    exitX:  '56vw',  exitY: '-45vh', scrub: 0.72 },
];

const AsteroidLayer = () => (
  <>
    {asteroidDefs.map((a, i) => (
      <div key={i} data-ast-idx={i} className="absolute pointer-events-none"
        style={{ width: a.size, height: a.size, top: `${a.top}%`, left: `${a.left}%`, zIndex: a.z }}>
        <img src={ASSETS[a.src]} alt="" width={a.size} height={a.size} className="w-full h-full object-contain" />
      </div>
    ))}
  </>
);

const TierCard = ({ tier }) => (
  <div className={`relative rounded-3xl border ${tier.borderColor} bg-slate-900/80 backdrop-blur-sm p-8 md:p-10 shadow-2xl transition-all duration-500 hover:scale-[1.01]`}>
    <div className="flex items-start justify-between mb-6">
      <div>
        <span className="text-3xl mr-3">{tier.emoji}</span>
        <span className="text-2xl md:text-3xl font-black text-white">{tier.name}</span>
      </div>
      <p className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>{tier.price}</p>
    </div>
    <p className="text-slate-300 text-base md:text-lg italic mb-8 leading-relaxed">{tier.tagline}</p>
    <div className="mb-8 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-center">
      {tier.coverage ? (
        <>
          <p className={`text-7xl md:text-8xl font-black bg-gradient-to-r ${tier.color} bg-clip-text text-transparent leading-none mb-2`}>{tier.coverage}</p>
          <p className="text-slate-400 text-sm uppercase tracking-widest">{tier.coverageLabel}</p>
        </>
      ) : (
        <p className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${tier.color} bg-clip-text text-transparent leading-snug`}>{tier.coverageLabel}</p>
      )}
    </div>
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Best for</p>
    <p className="text-slate-300 text-sm mb-8">{tier.bestFor}</p>
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">What is included</p>
    <ul className="space-y-2 mb-8">
      {tier.includes.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tier.color} flex-shrink-0`} />
          {item}
        </li>
      ))}
    </ul>
    {tier.addOns && (
      <p className="text-xs text-slate-500 border-t border-slate-800 pt-4">
        <span className="text-slate-400 font-semibold">Add-ons available: </span>{tier.addOns}
      </p>
    )}
    <div className="mt-8">
      <a href={CAL_URL} target="_blank" rel="noopener noreferrer" onMouseEnter={playApplause}
        className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 bg-gradient-to-r ${tier.color} hover:opacity-90 hover:shadow-lg`}>
        <CalendarDays className="w-5 h-5" /> Book a Discovery Call
      </a>
    </div>
  </div>
);

function useMatchMedia(query) {
  const [matches, setMatches] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

const Services = () => {
  const heroRef       = useRef(null);
  const rocketWrapRef = useRef(null);
  const rocketRef     = useRef(null);
  const subRef        = useRef(null);
  const h1PanelRef    = useRef(null);
  const cinemaRef     = useRef(null);
  const shipLogoRef   = useRef(null);
  const acronymRef    = useRef(null);

  const everyBuildRef = useRef(null);
  const tierRefs = useRef(tiers.map(() => ({ section: null, splash: null, card: null })));
  const isMobile = useMatchMedia('(max-width: 768px)');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(subRef.current, { opacity: 0, y: 20 });

      // ── Rocket — real travel arc across the stage, scrub 0.8 keeps it moving continuously ──
      gsap.to(rocketWrapRef.current, {
        x: '18vw', y: '-22vh', scale: 1.12, rotation: 8, ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom-=200vh bottom',
          scrub: 0.8,
        },
      });
      gsap.to(rocketRef.current, {
        y: '+=18', x: '+=8', rotation: '+=3', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

      // ── Tagline / CTA sub-block ──
      gsap.to(subRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '+=380%', scrub: false, toggleActions: 'play none none reverse' },
      });

      // ── Tier iris wipe sequence ──
      // Card starts clipped to zero at center, expands outward over splash image
      tierRefs.current.forEach(({ section, splash, card }) => {
        if (!section || !splash || !card) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });

        // 0–30%  : splash holds static (drama/pause)
        // 30–100%: card iris expands from center outward over splash
        tl.fromTo(card,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(150% at 50% 50%)', ease: 'power2.inOut' },
          0.30
        );
      });

      gsap.utils.toArray('.proof-point').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } });
      });

      // ── Asteroid scroll journeys ──
      const triggerBase = { trigger: heroRef.current, start: 'top+=30px top', end: 'bottom-=280vh bottom' };
      asteroidDefs.forEach((def, i) => {
        const el = heroRef.current.querySelector(`[data-ast-idx="${i}"]`);
        if (!el) return;
        const fromScale = def.scaleFrom ?? 1;
        const toScale   = def.scaleTo   ?? 1;
        gsap.fromTo(el,
          { x: def.fromX, y: def.fromY, scale: fromScale },
          { x: def.exitX, y: def.exitY, scale: toScale,   ease: 'none',
            scrollTrigger: { ...triggerBase, scrub: def.scrub } }
        );
      });

      // ── H1 panel — stays right, holds, then fades ──
      gsap.to(h1PanelRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: heroRef.current, start: 'bottom-=100vh bottom', end: 'bottom-=20vh bottom', scrub: 1 },
      });

      // ── Cinematic sequence ──
      // ship-logo is static/full-screen on entry — no entrance animation
      // scroll 0–10%  : nothing (static hold, feels like normal page scroll)
      // scroll 10–40% : ship-logo slides right off screen
      // scroll 40–60% : acronym holds (drama)
      // scroll 60–100%: acronym slides down, exposing "Every build ships"
      if (cinemaRef.current && shipLogoRef.current && acronymRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cinemaRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });

        // ship-logo sits static — first move is the exit right
        tl.to(shipLogoRef.current,
          { x: '110vw', ease: 'power2.in' },
          0.10  // starts at 10% of section scroll
        );

        // acronym hold is implicit 40–75% (nothing in timeline = pause)

        // acronym slides down at 75%
        tl.to(acronymRef.current,
          { y: '100vh', ease: 'power2.in' },
          0.75
        );

        // every-build section fades in as acronym exits
        if (everyBuildRef.current) {
          gsap.set(everyBuildRef.current, { opacity: 0 });
          ScrollTrigger.create({
            trigger: cinemaRef.current,
            start: 'bottom-=30% top',
            end: 'bottom top',
            onEnter: () => gsap.to(everyBuildRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }),
            onLeaveBack: () => gsap.to(everyBuildRef.current, { opacity: 0, duration: 0.3 }),
          });
        }

      }

      requestAnimationFrame(() => { ScrollTrigger.refresh(); });
    }, heroRef);

    // ── Step cards ──
    // Section is pinned by ScrollTrigger for its full scroll budget.
    // One scrubbed timeline — cards enter one at a time with large gaps between.
    // Cards never leave once they arrive. All 4 sit together at the end.
    // Pin releases naturally when scroll budget is exhausted.
    const outerSTs = [];
    const timerID  = setTimeout(() => {

      const stepsOuter = document.querySelector('[data-steps-outer]');
      const stepCards  = Array.from(document.querySelectorAll('[data-step-card]'));

      if (stepsOuter && stepCards.length === 4) {

        // All cards start off-screen left
        stepCards.forEach((card, i) => {
          gsap.set(card, { x: `${-120 - i * 20}vw`, opacity: 0 });
        });

        // Timeline: 5 acts
        // 0–10%   : dead scroll — section locks, heading settles
        // 10–22%  : card 1 slides in
        // 22–35%  : hold — read card 1
        // 35–47%  : card 2 slides in
        // 47–57%  : hold
        // 57–69%  : card 3 slides in
        // 69–79%  : hold
        // 79–91%  : card 4 slides in
        // 91–100% : hold — all 4 visible together, then pin releases
        const tl = gsap.timeline();

        const entries = [
          { start: 0.10, end: 0.22 },
          { start: 0.35, end: 0.47 },
          { start: 0.57, end: 0.69 },
          { start: 0.79, end: 0.91 },
        ];

        stepCards.forEach((card, i) => {
          const startX = `${-120 - i * 20}vw`;
          tl.fromTo(card,
            { x: startX, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out', immediateRender: false },
            entries[i].start
          );
        });

        const pinST = ScrollTrigger.create({
          trigger: stepsOuter,
          start: 'top 50px',
          end: '+=2000px',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 2,
          animation: tl,
        });

        outerSTs.push(pinST);
        ScrollTrigger.refresh();
      }

    }, 150);

    return () => {
      clearTimeout(timerID);
      outerSTs.forEach(st => st.kill());
      ctx.revert();
    };
  }, []);


  return (
    <>
      <Helmet>
        <title>Web Development & AI Integration Services | Huntsville, AL | OchAI</title>
        <link rel="canonical" href="https://ochai.dev/services" />
        <meta name="description" content="Custom web development, AI integration, and SEO in Huntsville AL. Guaranteed Lighthouse 100. Free discovery call." />
        <meta name="keywords" content="web development Huntsville AL, website developer Huntsville Alabama, small business website Huntsville, AI integration, Lighthouse 100, local SEO Huntsville, React developer, custom web design North Alabama" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/services" />
        <meta property="og:title" content="Web Development & AI Integration Services | Huntsville AL | OchAI" />
        <meta property="og:description" content="Fast, measurable, maintainable websites. Guaranteed Lighthouse 100. Free discovery call." />
        <script type="application/ld+json">{servicesJsonLd}</script>
        <style>{KEYFRAME_CSS}</style>
      </Helmet>

      {(() => {
        return (
          <div className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
            <video
              autoPlay loop muted playsInline
              poster={isMobile ? ASSETS.earthMobileAvif : ASSETS.earthAvif}
              className="w-full h-full object-contain"
            >
              {isMobile ? (
                <>
                  <source src={ASSETS.earthMobileWebm} type="video/webm" />
                  <source src={ASSETS.earthMobileMp4}  type="video/mp4" />
                </>
              ) : (
                <source src={ASSETS.earthWebm} type="video/webm" />
              )}
              <img src={isMobile ? ASSETS.earthMobileAvif : ASSETS.earthAvif} alt="Earth from space" className="w-full h-full object-contain" />
            </video>
          </div>
        );
      })()}

      <section ref={heroRef} className="relative min-h-[640vh] bg-transparent">
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,26,0.4) 0%, rgba(0,0,0,0.7) 100%)' }}>
          <div className="absolute inset-0 opacity-60" style={{
            backgroundImage: [
              'radial-gradient(1px 1px at 10% 15%, white, transparent)',
              'radial-gradient(1px 1px at 25% 45%, white, transparent)',
              'radial-gradient(1px 1px at 40% 10%, white, transparent)',
              'radial-gradient(1px 1px at 55% 70%, white, transparent)',
              'radial-gradient(1px 1px at 70% 30%, white, transparent)',
              'radial-gradient(1px 1px at 85% 55%, white, transparent)',
              'radial-gradient(1px 1px at 15% 80%, white, transparent)',
              'radial-gradient(2px 2px at 60% 20%, rgba(255,255,255,0.5), transparent)',
              'radial-gradient(1px 1px at 90% 10%, white, transparent)',
              'radial-gradient(1px 1px at 35% 90%, white, transparent)',
            ].join(','),
          }} />
        </div>

        <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 10 }}>
          <AsteroidLayer />

          <div ref={rocketWrapRef} className="absolute pointer-events-none"
            style={{ zIndex: 20, top: '55vh', left: '15%', width: 140 }}>
            <div ref={rocketRef}>
              <img src={ASSETS.rocket} alt="OchAI Gold Rocket" width={140} height={280} className="w-full h-auto" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center pointer-events-none" style={{ zIndex: 30 }}>
            <div ref={h1PanelRef} className="w-full px-6 md:px-12 lg:px-20 text-left md:text-right md:ml-auto md:max-w-xl">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3 font-semibold pointer-events-auto">Orchestrating Your Digital Presence</p>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight pointer-events-auto">
                Your Business,<br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Built to Perform.</span>
              </h1>
              <div ref={subRef} className="mt-4" style={{ opacity: 0 }}>
                <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed pointer-events-auto">
                  Websites, AI integrations, and digital operations built by one person to elite standards on every project, every time. Guaranteed Lighthouse 100. No exceptions.
                </p>
                <div className="flex flex-col sm:flex-row md:justify-end gap-3 pointer-events-auto">
                  <a href={CAL_URL} target="_blank" rel="noopener noreferrer" onMouseEnter={playApplause}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white text-sm transition-all shadow-lg">
                    <CalendarDays className="w-4 h-4" /> Book a Free Discovery Call
                  </a>
                  <a href="#tiers"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl font-bold text-white text-sm transition-colors backdrop-blur-sm">
                    See the Packages <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof points — below rocket scene, before cinematic ── */}
      <section className="relative z-10 py-12 border-y border-slate-800/60 bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {proofPoints.map((p) => (
              <Link key={p.metric} to={p.to} className="proof-point block text-center p-6 rounded-xl hover:bg-slate-800/50 transition-colors group">
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">{p.metric}</p>
                <p className="text-white font-semibold">{p.label}</p>
                <p className="text-sm text-slate-400 mt-1 group-hover:text-cyan-400 transition-colors">{p.detail} <ArrowRight className="w-3 h-3 inline" /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cinematic reveal sequence ── */}
      <section ref={cinemaRef} className="relative z-10 bg-slate-950" style={{ height: '500vh' }}>
        <div className="sticky top-[70px] overflow-hidden bg-slate-950" style={{ height: 'calc(100vh - 70px)' }}>

          {/* Layer 1 — acronym (behind) — full-screen, revealed when ship slides right */}
          <div ref={acronymRef} className="absolute inset-0 z-10 w-full h-full">
            <picture>
              <source srcSet={ASSETS.acronymMobile} media="(max-width: 768px)" type="image/avif" />
              <img
                src={ASSETS.acronymLogo}
                alt="OchAI — Oniony. Authoritative. Deliberate."
                className="w-full h-full object-contain"
                style={{ display: 'block' }}
              />
            </picture>
          </div>

          {/* Layer 2 — ship-logo (front) — static full-screen, exits right on scroll */}
          <div ref={shipLogoRef} className="absolute inset-0 z-20 w-full h-full" style={{ willChange: 'transform' }}>
            <picture>
              <source srcSet={ASSETS.logoMobile} media="(max-width: 768px)" type="image/avif" />
              <img
                src={ASSETS.shipLogo}
                alt="OchAI — Input. Process. Output."
                className="w-full h-full object-contain"
                style={{ display: 'block' }}
              />
            </picture>
          </div>

        </div>
      </section>

      <section ref={everyBuildRef} className="relative z-10 py-24 bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Every build ships with what<br /><span className="text-cyan-400">others charge separately for.</span></h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">Most shops separate technical SEO from the build because two different people are doing two different jobs. A developer builds. An SEO person patches it after. That handoff has a gap — and you pay for both and the gap.</p>
          <p className="text-lg text-slate-300 leading-relaxed">Every build I deliver closes that gap entirely. The SEO is not bolted on after delivery — it is <strong className="text-white">architectural</strong>. Built in from line one. Not a discount. A structural advantage passed directly to you.</p>
        </div>
      </section>

      <section id="tiers" className="relative z-10 bg-black py-8">
        <div className="container mx-auto px-4 text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4">Web Design and Development</p>
          <h2 className="text-4xl md:text-6xl font-black text-white">Choose Your <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">Performance Level</span></h2>
        </div>
        {tiers.map((tier, i) => (
          <section
            key={tier.id}
            ref={el => { if (el) tierRefs.current[i].section = el; }}
            className="relative bg-black"
            style={{ height: '350vh' }}
          >
            <div className="sticky top-[50px] overflow-visible bg-black" style={{ height: 'calc(100vh - 50px)' }}>

              {/* Card — starts clipped to zero, iris expands outward over splash */}
              <div
                ref={el => { if (el) tierRefs.current[i].card = el; }}
                className="absolute inset-0 z-20 overflow-y-auto bg-black"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
              >
                <div className="container mx-auto px-4 max-w-4xl py-16">
                  <TierCard tier={tier} />
                </div>
              </div>

              {/* Splash underneath — static, iris wipe reveals card on top */}
              <div
                ref={el => { if (el) tierRefs.current[i].splash = el; }}
                className="absolute inset-0 z-10 w-full h-full"
              >
                <img
                  src={isMobile ? tier.splashMobile : tier.splash}
                  alt={tier.splashAlt}
                  className="w-full h-full object-contain"
                  style={{ display: 'block' }}
                  loading="lazy"
                />
              </div>

            </div>
          </section>
        ))}
      </section>

      <section className="relative z-10 py-24 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-6">&ldquo;Anyone else will charge you more<br /><span className="text-cyan-400">to deliver less</span> &mdash;<br />and you will not know it until after.&rdquo;</p>
          <p className="text-slate-400 text-base md:text-lg">One person. Every instrument. No handoffs, no gaps, no excuses.</p>
        </div>
      </section>

      {/* Steps — 600vh sticky section. Header always in view. Cards slide in L→R one at a time. */}
      <section data-steps-outer className="relative z-10 bg-slate-900 overflow-x-hidden">
        <div className="flex flex-col justify-center min-h-screen px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">From First Call to <span className="text-cyan-400">Launch</span></h2>
              <p className="text-lg text-slate-300">No retainers to start. No commitments before the proposal. You know exactly what you are buying before you spend a dollar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto w-full">
              {processSteps.map((s, i) => (
                <div
                  key={s.step}
                  data-step-card={i}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center"><s.icon className="w-6 h-6" /></div>
                    <span className="text-3xl font-bold text-slate-700">{s.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-slate-950 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Taking this to a boardroom?</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Download the OchAI Service Brochure</h2>
          <p className="text-slate-300 text-base md:text-lg mb-8">A designed, print-ready PDF with the full service breakdown. Built for the conversation that happens after someone asks, <em>where did you find this guy?</em></p>
          <div className="relative inline-block group">
            <a href="/OchAI-Services-Brochure.pdf" download
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl font-bold text-white text-lg transition-colors">
              <Download className="w-5 h-5" /> Download Brochure (PDF)
            </a>
            {/* Brochure thumbnail tooltip */}
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700 rotate-1 hover:rotate-0 transition-transform duration-300" style={{ width: '200px' }}>
                <img src="/OchAI-Services-Brochure-thumb.avif" alt="OchAI Services Brochure preview" width="200" height="283" className="block" />
              </div>
              <div className="w-3 h-3 bg-slate-800 border-r border-b border-slate-700 rotate-45 mx-auto -mt-1.5" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Grab a Slot <span className="text-cyan-400">Right Now</span></h2>
            <p className="text-slate-300 text-lg">15 minutes or 30 — pick what fits. No forms, no friction.</p>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 overflow-hidden">
            <CalEmbed />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The Discovery Call Costs <span className="text-emerald-400">Nothing</span></h2>
          <p className="text-lg text-slate-300 mb-10">Worst case, you walk away with a clearer picture of what your project needs. Best case, you get a fixed-price proposal and a builder who answers his own phone.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" onMouseEnter={playApplause}
              data-cta-left
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white text-lg transition-all shadow-lg">
              <CalendarDays className="w-5 h-5" /> Schedule at cal.com
            </a>
            <a href={EMAIL_URL}
              data-cta-right
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl font-bold text-white text-lg transition-colors">
              <Mail className="w-5 h-5" /> jeremy@ochai.dev
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
