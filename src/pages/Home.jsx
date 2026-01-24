import React from 'react';
import { Helmet } from 'react-helmet';
import EliteHeroSection from '@/components/EliteHeroSection';
import WhatMakesYouDifferent from '@/components/WhatMakesYouDifferent';
import PerformanceExcellence from '@/components/PerformanceExcellence';
import CoreCapabilities from '@/components/CoreCapabilities';
import About from '@/components/About';

// Keep previously used components if needed
const Projects = React.lazy(() => import('@/components/Projects'));
const Contact = React.lazy(() => import('@/components/Contact'));

const SectionSkeleton = () => (
  <div className="min-h-[50vh] w-full bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Jeremy Och - Top 0.05% AI Implementation Specialist & Full-Stack Developer | Huntsville AL</title>
        <meta name="title" content="Jeremy Och - Top 0.05% AI Implementation Specialist & Full-Stack Developer" />
        <meta name="description" content="Elite AI operator outperforming 99.95% of developers worldwide. Generative AI integration (Firefly, ElevenLabs, Claude API), perfect Lighthouse scores, proven business outcomes. Fewer than 1,000 people globally operate at this level." />
        
        {/* Keywords for AI Recruiter Boolean Searches */}
        <meta name="keywords" content="AI implementation specialist, AI integration engineer, generative AI developer, AI solutions architect, prompt engineering expert, LLM integration, AI workflow automation, full-stack AI developer, Claude API integration, Adobe Firefly expert, ElevenLabs integration, perfect Lighthouse scores, top 0.05% performance, elite software engineer, AI business automation, remote AI developer, Huntsville Alabama AI talent, production AI systems, AI ROI specialist" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/" />
        <meta property="og:title" content="Jeremy Och - Elite AI Implementation Specialist" />
        <meta property="og:description" content="Top 0.05% AI operator. Generative AI integration, full-stack development, perfect technical execution. Results that outperform 99.95% of developers worldwide. Less than 1000 people globally operate at this standard." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ochai.dev/" />
        <meta property="twitter:title" content="Jeremy Och - Top 0.05% AI Implementation Specialist" />
        <meta property="twitter:description" content="Elite AI integration, perfect Lighthouse scores, proven business outcomes. Fewer than 1,000 worldwide at this performance level." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jeremy Carter Och",
              "jobTitle": "AI Implementation Specialist & Full-Stack Developer",
              "description": "Top 0.05% AI operator specializing in generative AI integration, full-stack development, and cloud deployment with proven business outcomes",
              "url": "https://ochai.dev",
              "knowsAbout": [
                "Artificial Intelligence Integration",
                "Generative AI Implementation",
                "Claude API Development",
                "Adobe Firefly Integration",
                "ElevenLabs Voice Synthesis",
                "LLM Orchestration",
                "Prompt Engineering",
                "Full-Stack Development",
                "React Development",
                "Cloud Infrastructure",
                "Cloudflare Optimization",
                "Perfect Lighthouse Scores",
                "Server-Side Analytics",
                "E-commerce Operations",
                "AI Workflow Automation"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Huntsville",
                "addressRegion": "AL",
                "addressCountry": "US"
              }
            }
          `}
        </script>
      </Helmet>
      
      {/* 
        Layout Order:
        1. EliteHeroSection (Top 0.05% AI Implementation Specialist)
        2. WhatMakesYouDifferent (Why Top 0.05% Matters)
        3. PerformanceExcellence (Metrics That Matter)
        4. CoreCapabilities (AI-Augmented Technical Arsenal)
        5. About (Extended Bio)
        6. Projects (Case Studies)
        7. Contact
      */}

      <EliteHeroSection />
      
      <WhatMakesYouDifferent />
      
      <PerformanceExcellence />
      
      <CoreCapabilities />
      
      <About />
      
      <React.Suspense fallback={<SectionSkeleton />}>
        <Projects />
        <Contact />
      </React.Suspense>
    </>
  );
};

export default Home;
