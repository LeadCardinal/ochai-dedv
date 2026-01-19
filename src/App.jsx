
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import CaseStudyBonsai from '@/pages/CaseStudyBonsai';
import CaseStudyHsvDrone from '@/pages/CaseStudyHsvDrone';
import CaseStudyMeanings from '@/pages/CaseStudyMeanings';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Loading Overlay rendered at root level */}
      <LoadingOverlay />
      
      {/* 
        Global Layout Container
        - Removed bg-slate-950 from here to prevent masking negative z-index elements.
        - Added 'relative' to establish a positioning context for children if needed, 
          but strictly keeping background transparent.
      */}
      <div className="min-h-screen bg-transparent text-white flex flex-col relative">
        
        {/* 
          Global Fixed Background 
          - Sits at -z-50, behind absolutely everything.
          - Replaces the specific background in Hero/App to ensure consistency and correct layering.
        */}
        <div className="fixed inset-0 bg-slate-950 -z-50" />

        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/reallivebonsai" element={<CaseStudyBonsai />} />
            <Route path="/case-study/hsvdrone" element={<CaseStudyHsvDrone />} />
            <Route path="/case-study/themeaningsoflife" element={<CaseStudyMeanings />} />
          </Routes>
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
