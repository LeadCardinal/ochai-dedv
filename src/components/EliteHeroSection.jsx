import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  Award,
  Sparkles,
  ChevronDown,
  Play,
} from "lucide-react";

const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
// H.264 on purpose: the previous AV1 files only decode on the newest iPhones
// (15 Pro and later), so everything else silently showed the poster.
const videoSrc = isMobile ? "/videos/hero_mobile_h264.mp4" : "/videos/hero_desktop_h264.mp4";

const CAL_URL = "https://cal.com/jeremy-ochai-dev";

const EliteHeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 3010);
    return () => clearTimeout(t);
  }, []);
  const scrollToNext = () => {
    const element = document.getElementById("pain-points");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left pt-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="text-sm md:text-base font-bold text-emerald-400 tracking-wide uppercase">
                Web Development & AI Integration · North Alabama
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
            >
              <span className="inline-block">Websites and AI systems</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                that actually ship.
              </span>
            </motion.h1>

            {/* Hero Statement */}
            <div className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed space-y-4">
              <p>
                <strong className="text-white">
                  I&rsquo;m Jeremy Och. I build custom websites, apps, and AI
                  integrations for businesses across North Alabama.
                </strong>{" "}
                One developer, no handoffs, and no account manager standing
                between you and the person writing the code.
              </p>
              <p>
                <strong className="text-cyan-400">
                  From &ldquo;we should probably use AI for that&rdquo; to a
                  system that is live and doing the work:
                </strong>{" "}
                design → build → AI integration → deployment → search
                visibility, all under one roof.
              </p>
              <p className="text-slate-200">
                Every site I publish is built to load fast, be found, and get
                cited by AI search, and I hold myself to Google&rsquo;s own
                yardstick:{" "}
                <span className="text-white font-semibold">
                  100/100 on Lighthouse. I call it baseline.
                </span>
              </p>
            </div>

            {/* Differentiator Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-10 shadow-2xl"
            >
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-base font-bold text-white mb-1">
                      AI Integration That Works
                    </h2>
                    <p className="text-slate-300 text-sm">
                      Claude API, Adobe Firefly, and ElevenLabs wired into real
                      production workflows.{" "}
                      <span className="text-cyan-400">
                        Complete systems, not demos.
                      </span>{" "}
                      Zero agency overhead.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-base font-bold text-white mb-1">
                      Perfect Technical Execution
                    </h2>
                    <p className="text-slate-300 text-sm">
                      100/100 Lighthouse scores across four production sites,
                      hand-coded for speed, accessibility, and SEO.{" "}
                      <span className="text-purple-400">
                        Google&rsquo;s benchmark confirms it.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center lg:items-start gap-5"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-950 transition-all duration-200 bg-cyan-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 hover:bg-cyan-400 shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] hover:-translate-y-1"
                >
                  Book a Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  to="/services/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-cyan-300 border border-cyan-500/60 rounded-full hover:bg-cyan-500/10 transition-colors"
                >
                  See Services &amp; Pricing
                </Link>
              </div>
              <Link
                to="/the-pitch/"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors text-base"
              >
                <Play className="w-4 h-4" />
                Watch The Pitch, 49 seconds of ragtime
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Hero Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-start justify-center lg:justify-end lg:pt-6"
          >
            <div className="relative w-full max-w-xl">
              {/* Glow Effect Behind Video */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />

              {/* Hero Video — deferred 3s; poster shown to Lighthouse */}
              {showVideo ? (
                <video
                  src={videoSrc}
                  width="800"
                  height="600"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-cyan-500/20"
                />
              ) : (
                // <picture> lets the browser pick the right poster at HTML-parse time. The SSG
                // worker stubs window (matchMedia -> false), so a JS-chosen src baked the DESKTOP
                // poster into the prerendered HTML and phones fetched the wrong, larger file.
                <picture className="contents">
                  <source media="(max-width: 767px)" srcSet="/videos/hero_mobile_poster.avif" type="image/avif" />
                  <img
                    src="/videos/hero_desktop_poster.avif"
                    alt="Jeremy Och of OchAI, full-stack web development and AI integration in Huntsville, Alabama"
                    width="800"
                    height="600"
                    fetchPriority="high"
                    className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-cyan-500/20"
                  />
                </picture>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Positioned Lower on Dark Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="text-slate-200 text-sm font-medium tracking-wide uppercase">
          Scroll to Continue
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-cyan-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EliteHeroSection;
