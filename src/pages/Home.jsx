import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import EliteHeroSection from '@/components/EliteHeroSection';
import ParallaxHeroSection from '@/components/ParallaxHeroSection';

const PerformanceExcellence = React.lazy(() => import('@/components/PerformanceExcellence'));
const WhatMakesYouDifferent = React.lazy(() => import('@/components/WhatMakesYouDifferent'));
const CoreCapabilities = React.lazy(() => import('@/components/CoreCapabilities'));
const Services = React.lazy(() => import('@/components/Services'));
const Projects = React.lazy(() => import('@/components/Projects'));
const Technologies = React.lazy(() => import('@/components/Technologies'));
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
        <title>Jeremy Och | AI Operations & Full-Stack Developer | Huntsville, AL</title>
        <meta name="description" content="AI operations specialist and full-stack developer in Huntsville, Alabama. Specializing in AI integration, enterprise systems, React, and digital operations. Available for technical leadership roles in defense and aerospace." />
      </Helmet>
      
      {/* 
        Layout Order:
        1. Hero (Initial Viewport - Fixed Background)
        2. EliteHeroSection (Credentials & Positioning)
        3. ParallaxHeroSection (Bridging the Gap + Pain Points)
        4. WhatMakesYouDifferent (Differentiators)
        5. PerformanceExcellence (Lighthouse Scores)
        6. CoreCapabilities (Skills Grid)
        7. Projects (Case Studies)
        8. Technologies (Tech Stack)
        9. Contact (Contact Form)
      */}

      <Hero />
      <EliteHeroSection />
      <ParallaxHeroSection />
      
      <Suspense fallback={<SectionSkeleton />}>
        <WhatMakesYouDifferent />
        <PerformanceExcellence />
        <CoreCapabilities />
        <Services />
        <Projects />
        <Technologies />
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;