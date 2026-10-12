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

// Route code-splitting that keeps SSG intact:
//  - SSG (import.meta.env.SSR, loaded via Vite ssrLoadModule): top-level await resolves the
//    real component, so renderToStaticMarkup emits full page markup (never a Suspense fallback).
//  - Client build: SSR branch is dead-code-eliminated; each page is a lazy chunk, and
//    main.jsx awaits preloadRoute() for the current path before mounting (no blank flash).
const L = {
  home: () => import("@/pages/Home"),
  services: () => import("@/pages/Services"),
  apps: () => import("@/pages/Apps"),
  biography: () => import("@/pages/Biography"),
  whyOchai: () => import("@/pages/WhyOchai"),
  security: () => import("@/pages/Security"),
  bonsai: () => import("@/pages/CaseStudyBonsai"),
  hsvdrone: () => import("@/pages/CaseStudyHsvDrone"),
  meanings: () => import("@/pages/CaseStudyMeanings"),
  showcase: () => import("@/pages/Showcase"),
  video: () => import("@/pages/VideoPage"),
  logos: () => import("@/pages/LogoSphere"),
  preview: () => import("@/pages/PreviewPage"),
  smallBiz: () => import("@/pages/SmallBusinessWebDevHuntsville"),
  aiInt: () => import("@/pages/AiIntegrationSmallBusiness"),
  fullStack: () => import("@/pages/FullStackSmallBusiness"),
  pitch: () => import("@/pages/ThePitch"),
};
const Home = import.meta.env.SSR ? (await L.home()).default : React.lazy(L.home);
const ServicesPage = import.meta.env.SSR ? (await L.services()).default : React.lazy(L.services);
const AppsPage = import.meta.env.SSR ? (await L.apps()).default : React.lazy(L.apps);
const Biography = import.meta.env.SSR ? (await L.biography()).default : React.lazy(L.biography);
const WhyOchai = import.meta.env.SSR ? (await L.whyOchai()).default : React.lazy(L.whyOchai);
const Security = import.meta.env.SSR ? (await L.security()).default : React.lazy(L.security);
const CaseStudyBonsai = import.meta.env.SSR ? (await L.bonsai()).default : React.lazy(L.bonsai);
const CaseStudyHsvDrone = import.meta.env.SSR ? (await L.hsvdrone()).default : React.lazy(L.hsvdrone);
const CaseStudyMeanings = import.meta.env.SSR ? (await L.meanings()).default : React.lazy(L.meanings);
const Showcase = import.meta.env.SSR ? (await L.showcase()).default : React.lazy(L.showcase);
const VideoPage = import.meta.env.SSR ? (await L.video()).default : React.lazy(L.video);
const LogoSphere = import.meta.env.SSR ? (await L.logos()).default : React.lazy(L.logos);
const PreviewPage = import.meta.env.SSR ? (await L.preview()).default : React.lazy(L.preview);
const SmallBusinessWebDevHuntsville = import.meta.env.SSR ? (await L.smallBiz()).default : React.lazy(L.smallBiz);
const AiIntegrationSmallBusiness = import.meta.env.SSR ? (await L.aiInt()).default : React.lazy(L.aiInt);
const FullStackSmallBusiness = import.meta.env.SSR ? (await L.fullStack()).default : React.lazy(L.fullStack);
const ThePitch = import.meta.env.SSR ? (await L.pitch()).default : React.lazy(L.pitch);

const ROUTE_LOADERS = {
  "/": L.home,
  "/services": L.services,
  "/apps": L.apps,
  "/biography": L.biography,
  "/why-ochai": L.whyOchai,
  "/security": L.security,
  "/case-study/reallivebonsai": L.bonsai,
  "/case-study/hsvdrone": L.hsvdrone,
  "/case-study/themeaningsoflife": L.meanings,
  "/performance": L.video,
  "/showcase": L.showcase,
  "/logos": L.logos,
  "/preview": L.preview,
  "/small-business-web-development-huntsville": L.smallBiz,
  "/ai-integration-small-business": L.aiInt,
  "/full-stack-development-small-business": L.fullStack,
  "/the-pitch": L.pitch,
};

// Warm the chunk for the current path so the first client render never shows a fallback.
export const preloadRoute = (pathname) => {
  const key = (pathname || "/").replace(/\/+$/, "") || "/";
  const load = ROUTE_LOADERS[key];
  return load ? load() : Promise.resolve();
};

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
              <Route path="/small-business-web-development-huntsville" element={<SmallBusinessWebDevHuntsville />} />
              <Route path="/ai-integration-small-business" element={<AiIntegrationSmallBusiness />} />
              <Route path="/full-stack-development-small-business" element={<FullStackSmallBusiness />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/why-ochai" element={<WhyOchai />} />
              <Route path="/security" element={<Security />} />
              <Route path="/case-study/reallivebonsai" element={<CaseStudyBonsai />} />
              <Route path="/case-study/hsvdrone" element={<CaseStudyHsvDrone />} />
              <Route path="/case-study/themeaningsoflife" element={<CaseStudyMeanings />} />
              <Route path="/performance" element={<VideoPage />} />
              <Route path="/the-pitch" element={<ThePitch />} />
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
