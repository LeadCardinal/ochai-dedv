import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import EliteHeroSection from '@/components/EliteHeroSection';
import WhatMakesYouDifferent from '@/components/WhatMakesYouDifferent';
import PerformanceExcellence from '@/components/PerformanceExcellence';
import CoreCapabilities from '@/components/CoreCapabilities';
import Technologies from '@/components/Technologies';
import About from '@/components/About';
import WhatsAppFloat from '@/components/WhatsAppFloat';

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
      </Helmet>

      <EliteHeroSection />

      <LazyOnScroll>
        <PainPointSection />
      </LazyOnScroll>

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
