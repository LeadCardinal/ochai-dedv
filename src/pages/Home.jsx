import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '@/lib/scrollToSection';
import EliteHeroSection from '@/components/EliteHeroSection';
import WhatMakesYouDifferent from '@/components/WhatMakesYouDifferent';
import PerformanceExcellence from '@/components/PerformanceExcellence';
import CoreCapabilities from '@/components/CoreCapabilities';
import Technologies from '@/components/Technologies';
import About from '@/components/About';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import WhyOchaiTeaser from '@/components/WhyOchaiTeaser';

const PainPointSection = React.lazy(() => import('@/components/PainPointSection'));
const Projects = React.lazy(() => import('@/components/Projects'));
const Contact = React.lazy(() => import('@/components/Contact'));

const SectionSkeleton = () => (
  <div className="min-h-[50vh] w-full bg-slate-950" />
);

// Only loads the children when the sentinel div scrolls into view
const LazyOnScroll = ({ children, rootMargin = '400px' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [rootMargin]);
  // Header nav fires this when it can't find a target (e.g. #contact) because
  // the section hasn't been scrolled into view yet, so mount it on demand.
  useEffect(() => {
    const force = () => setVisible(true);
    window.addEventListener('ochai:force-load', force);
    return () => window.removeEventListener('ochai:force-load', force);
  }, []);
  return (
    <div ref={ref}>
      {visible ? (
        <React.Suspense fallback={<SectionSkeleton />}>{children}</React.Suspense>
      ) : (
        <SectionSkeleton />
      )}
    </div>
  );
};

const Home = () => {
  // Honor #hash targets (footer link, external links like ochai.dev/#contact).
  // `key` changes on every navigation so re-clicking the same hash still scrolls.
  const { hash, key } = useLocation();
  useEffect(() => {
    if (hash) scrollToSection(decodeURIComponent(hash.slice(1)));
  }, [hash, key]);

  return (
    <>
      <Helmet>
        <title>OchAI — Full-Stack Web Development & AI Integration | Huntsville, AL</title>
        <link rel="canonical" href="https://ochai.dev/" />
        <meta name="title" content="OchAI — Full-Stack Web Development & AI Integration | Huntsville, AL" />
        <meta name="description" content="Full-stack web development and AI implementation for businesses in Huntsville and beyond — built to rank AND get cited by AI Overviews. React, Node, cloud deployment. 37+ years hands-on." />
        <meta name="keywords" content="AI implementation specialist, AI integration engineer, generative AI developer, AI solutions architect, prompt engineering, LLM integration, AI workflow automation, full-stack AI developer, Claude API integration, Adobe Firefly integration, ElevenLabs integration, perfect Lighthouse scores, 100/100 Lighthouse, documented SEO results, organic traffic growth, GEO optimization, AEO optimization, generative engine optimization, answer engine optimization, AI Overview citations, LLM search visibility, structured data for AI search, AI business automation, remote AI developer, Huntsville Alabama AI talent, production AI systems, full-stack web developer Huntsville Alabama, custom software development North Alabama, web and app development services, full-stack development consultant" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/" />
        <meta property="og:title" content="OchAI — Full-Stack Web Development & AI Integration | Huntsville, AL" />
        <meta property="og:description" content="Full-stack web development and AI implementation for businesses in Huntsville and beyond — built to rank AND get cited by AI Overviews. React, Node, cloud deployment. 37+ years hands-on." />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ochai.dev/" />
        <meta property="twitter:title" content="OchAI — Full-Stack Web Development & AI Integration | Huntsville, AL" />
        <meta property="twitter:description" content="Full-stack web development and AI implementation for businesses in Huntsville and beyond. React, Node, and hands-on AI integration — built to be cited by AI Overviews." />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jeremy Carter Och",
            "jobTitle": "Full-Stack Web Developer & AI Integration Specialist",
            "description": "Full-stack web developer and AI integration specialist serving businesses across North Alabama. React, Node, cloud deployment, and hands-on AI implementation.",
            "url": "https://ochai.dev",
            "knowsAbout": ["Artificial Intelligence Integration","Generative AI Implementation","Claude API Development","Adobe Firefly Integration","ElevenLabs Voice Synthesis","LLM Orchestration","Prompt Engineering","Full-Stack Development","React Development","Cloud Infrastructure","Cloudflare Optimization","Perfect Lighthouse Scores","Server-Side Analytics","E-commerce Operations","AI Workflow Automation","Generative Engine Optimization (GEO)","Answer Engine Optimization (AEO)","Search Experience Optimization (SXO)"],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Huntsville",
              "addressRegion": "AL",
              "addressCountry": "US"
            }
          }`}
        </script>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "ProfessionalService"],
                "@id": "https://ochai.dev/#organization",
                "name": "OchAI",
                "legalName": "OchAI",
                "url": "https://ochai.dev/",
                "logo": "https://ochai.dev/images/logo1.webp",
                "image": "https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/social_weblink.webp",
                "description": "Full-stack web development and AI integration for small and mid-sized businesses in Huntsville and across North Alabama. React, Node, Cloudflare, and hands-on Claude API integration.",
                "foundingDate": "2019",
                "founder": { "@id": "https://ochai.dev/#founder" },
                "email": "jeremy@ochai.dev",
                "telephone": "+1-256-361-9167",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Huntsville",
                  "addressRegion": "AL",
                  "addressCountry": "US"
                },
                "geo": { "@type": "GeoCoordinates", "latitude": 34.7304, "longitude": -86.5861 },
                "areaServed": [
                  { "@type": "City", "name": "Huntsville", "containedInPlace": { "@type": "State", "name": "Alabama" } },
                  { "@type": "City", "name": "Madison", "containedInPlace": { "@type": "State", "name": "Alabama" } },
                  { "@type": "AdministrativeArea", "name": "North Alabama" },
                  { "@type": "Country", "name": "United States" }
                ],
                "serviceType": ["Web development", "AI integration", "Full-stack development", "Technical SEO"],
                "knowsAbout": ["Claude API integration", "LLM workflow automation", "React", "Node.js", "Cloudflare Pages and Workers", "Technical SEO", "Generative Engine Optimization"],
                "sameAs": [
                  "https://www.linkedin.com/in/jeremy-och-ai-full-stack",
                  "https://x.com/OchAI_fullstack"
                ]
              },
              {
                "@type": "Person",
                "@id": "https://ochai.dev/#founder",
                "name": "Jeremy Carter Och",
                "jobTitle": "Founder, Full-Stack Developer & AI Integration Specialist",
                "url": "https://ochai.dev/biography",
                "image": "https://ochai.dev/images/jeremy-och-ochai-founder.avif",
                "worksFor": { "@id": "https://ochai.dev/#organization" },
                "sameAs": ["https://www.linkedin.com/in/jeremy-och-ai-full-stack"]
              },
              {
                "@type": "WebSite",
                "@id": "https://ochai.dev/#website",
                "url": "https://ochai.dev/",
                "name": "OchAI",
                "publisher": { "@id": "https://ochai.dev/#organization" },
                "inLanguage": "en-US"
              }
            ]
          }`}
        </script>
      </Helmet>

      <EliteHeroSection />

      <LazyOnScroll>
        <PainPointSection />
      </LazyOnScroll>

      <WhyOchaiTeaser />
      <WhatMakesYouDifferent />
      <PerformanceExcellence />
      <CoreCapabilities />
      <Technologies />
      <About />

      <LazyOnScroll>
        <Projects />
        <Contact />
      </LazyOnScroll>

      <WhatsAppFloat />
    </>
  );
};

export default Home;
