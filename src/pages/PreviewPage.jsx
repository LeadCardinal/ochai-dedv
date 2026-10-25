import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PreviewPage = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>OchAI - Websites and AI Systems That Actually Ship</title>
        <meta name="description" content="Custom websites, apps, and AI integrations for North Alabama businesses, built start to finish by one developer. Perfect Lighthouse scores across four production sites." />
        <link rel="canonical" href="https://ochai.dev/preview" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="https://ochai.dev/preview" />
        <meta property="og:title" content="OchAI - Websites and AI Systems That Actually Ship" />
        <meta property="og:description" content="Custom websites, apps, and AI integrations for North Alabama businesses. One developer, start to finish." />
        <meta property="og:image" content="https://ochai.dev/videos/introanimation.gif" />
        <meta property="og:video" content="https://ochai.dev/videos/Og_2_.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1080" />
        <meta property="og:video:height" content="1920" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:url" content="https://ochai.dev/preview" />
        <meta name="twitter:title" content="OchAI - Websites and AI Systems That Actually Ship" />
        <meta name="twitter:description" content="Custom websites, apps, and AI integrations. One developer, start to finish." />
        <meta name="twitter:image" content="https://ochai.dev/videos/introanimation.gif" />
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Looping Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/Og_2_.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950/90" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
              Websites and AI systems that actually ship.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed drop-shadow-lg">
              Custom websites, apps, and AI integrations for North Alabama businesses. One developer, start to finish, 100/100 on Lighthouse.
            </p>

            <Link to="/">
              <button className="group bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 flex items-center gap-3 mx-auto">
                Visit OchAI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPage;