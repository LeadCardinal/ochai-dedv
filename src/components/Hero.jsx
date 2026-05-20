import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const videoSrc = isDesktop
    ? "/videos/hero_desktop.webm"
    : "/videos/hero_mobile.webm";
  const posterSrc = isDesktop
    ? "/videos/hero_desktop_poster.avif"
    : "/videos/hero_mobile_poster.avif";

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center">
      <div className="fixed top-20 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] -z-10">
        <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={posterSrc}
            className="w-full h-full object-cover object-top opacity-100 block"
          >
            <source src={videoSrc} type="video/webm" />
          </video>
      
        <div className="absolute inset-0 bg-slate-950/85 pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
            Jeremy C Och
          </h1>

          <div className="space-y-6 mb-10">
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed drop-shadow-lg">
              Fewer than 1,000 developers worldwide execute the complete value
              chain solo at perfect technical standards.
            </p>

            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-4 text-left text-sm text-slate-300">
                <div>
                  <div className="text-cyan-400 font-semibold mb-2">
                    What Others Do:
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li>• Static pages, minimal functionality</li>
                    <li>• Team-driven optimization</li>
                    <li>• Single-purpose demo sites</li>
                  </ul>
                </div>
                <div>
                  <div className="text-emerald-400 font-semibold mb-2">
                    What I Deliver:
                  </div>
                  <ul className="space-y-1">
                    <li>• React SPAs, real business logic</li>
                    <li>• Solo architecture → deployment</li>
                    <li>• Three perfect scores, three production sites</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 text-center">
                <span className="text-xs text-slate-400">
                  Top 0.05% globally
                </span>
                <span className="mx-2 text-slate-600">•</span>
                <span className="text-cyan-400 font-mono text-xs">
                  100/100/100/100
                </span>
                <span className="mx-2 text-slate-600">•</span>
                <span className="text-xs text-slate-400">
                  Zero coordination overhead
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <Link to="/biography">
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-base rounded-full transition-all hover:scale-105"
              >
                <FileText className="mr-2 w-5 h-5" />
                Full Biography
              </Button>
            </Link>

            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform hover:scale-105"
            >
              Start the Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium tracking-wider uppercase text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            Scroll to Explore
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
