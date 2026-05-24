import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
const Biography = React.lazy(() => import("@/pages/Biography"));
const Security = React.lazy(() => import("@/pages/Security"));
const CaseStudyBonsai = React.lazy(() => import("@/pages/CaseStudyBonsai"));
const CaseStudyHsvDrone = React.lazy(() => import("@/pages/CaseStudyHsvDrone"));
const CaseStudyMeanings = React.lazy(() => import("@/pages/CaseStudyMeanings"));
const VideoPage = React.lazy(() => import("@/pages/VideoPage"));
const Showcase = React.lazy(() => import("@/pages/Showcase"));
const LogoSphere = React.lazy(() => import("@/pages/LogoSphere"));
const PreviewPage = React.lazy(() => import("@/pages/PreviewPage"));

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
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isPreviewPage = location?.pathname === "/preview";

  // Render preview page standalone without header/footer/loading overlay
  if (isPreviewPage) {
    return (
      <Routes>
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    );
  }

  return (
    <>
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
          <React.Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biography" element={<Biography />} />
            <Route path="/security" element={<Security />} />
            <Route
              path="/case-study/reallivebonsai"
              element={<CaseStudyBonsai />}
            />
            <Route
              path="/case-study/hsvdrone"
              element={<CaseStudyHsvDrone />}
            />
            <Route
              path="/case-study/themeaningsoflife"
              element={<CaseStudyMeanings />}
            />
            <Route path="/performance" element={<VideoPage />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/logos" element={<LogoSphere />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
          </React.Suspense>
        </main>

        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default App;
