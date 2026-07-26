import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server.mjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoIntro from "@/components/VideoIntro";
import { Toaster } from "@/components/ui/toaster";

// Static imports — these routes are prerendered; lazy = Suspense fallback in SSG output
import Home from "@/pages/Home";
import ServicesPage from "@/pages/Services";
import AppsPage from "@/pages/Apps";
import Biography from "@/pages/Biography";
import Security from "@/pages/Security";
import CaseStudyBonsai from "@/pages/CaseStudyBonsai";
import CaseStudyHsvDrone from "@/pages/CaseStudyHsvDrone";
import CaseStudyMeanings from "@/pages/CaseStudyMeanings";
import Showcase from "@/pages/Showcase";

// Minimal inline 404 — renders a noindex tag for any client-side navigation
// to an unrecognized path. Cloudflare's public/404.html covers the direct-hit
// (real HTTP 404) case; this covers crawlers/users hitting the path via the
// already-loaded SPA shell.
function NotFound() {
  React.useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-slate-400 mb-6">That page doesn't exist.</p>
        <a href="/" className="border border-slate-600 rounded px-6 py-2 hover:border-slate-400 transition-colors">
          Back to ochai.dev
        </a>
      </div>
    </div>
  );
}

// Lazy imports — not prerendered, fine to split
const VideoPage = React.lazy(() => import("@/pages/VideoPage"));
const LogoSphere = React.lazy(() => import("@/pages/LogoSphere"));
const PreviewPage = React.lazy(() => import("@/pages/PreviewPage"));

// BrowserRouter imported lazily so its CJS bundle never executes during SSR/SSG.
// React Router calls createBrowserHistory() at module load time — blows up in Node
// even with window stubs. Lazy import keeps it out of the graph when ssrLocation is set.
const LazyBrowserRouter = React.lazy(() =>
  import("react-router-dom").then((m) => ({ default: m.BrowserRouter }))
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

function App({ ssrLocation }) {
  if (ssrLocation) {
    return (
      <StaticRouter location={ssrLocation}>
        <AppContent />
      </StaticRouter>
    );
  }
  return (
    <React.Suspense fallback={null}>
      <LazyBrowserRouter>
        <AppContent />
      </LazyBrowserRouter>
    </React.Suspense>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isPreviewPage = location?.pathname === "/preview";

  if (isPreviewPage) {
    return (
      <Routes>
        <Route path="/preview" element={<React.Suspense fallback={null}><PreviewPage /></React.Suspense>} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollToTop />
      {location?.pathname === "/" && <VideoIntro />}

      <div className="min-h-screen bg-transparent text-white flex flex-col relative">
        <div className="fixed inset-0 bg-slate-950 -z-50" />

        <Header />

        <main className="flex-grow">
          <React.Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/apps" element={<AppsPage />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/security" element={<Security />} />
              <Route path="/case-study/reallivebonsai" element={<CaseStudyBonsai />} />
              <Route path="/case-study/hsvdrone" element={<CaseStudyHsvDrone />} />
              <Route path="/case-study/themeaningsoflife" element={<CaseStudyMeanings />} />
              <Route path="/performance" element={<VideoPage />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/logos" element={<LogoSphere />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="*" element={<NotFound />} />
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
