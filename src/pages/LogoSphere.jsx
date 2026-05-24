import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const LogoSphere = () => {
  const iframeRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Logo Portfolio — JCO Digital Operations</title>
        <link rel="canonical" href="https://ochai.dev/logos" />
        <meta name="description" content="37+ years of brand and logo work by Jeremy Och — interactive 3D portfolio sphere." />
      </Helmet>

      {/* Page header */}
      <div className="relative z-10 pt-24 pb-6 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6"
        >
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
            Brand & Identity Work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
        >
          Logo Portfolio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 text-base max-w-xl mx-auto"
        >
          37+ years of brand work. Drag the sphere. Click any tile.
        </motion.p>
      </div>

      {/* Sphere iframe — full remaining viewport height */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full"
        style={{ height: "calc(100vh - 220px)", minHeight: "520px" }}
      >
        <iframe
          ref={iframeRef}
          src="/images/logo-sphere.html"
          title="JCO Logo Portfolio Sphere"
          className="w-full h-full border-0"
          loading="lazy"
          style={{ background: "#06070f" }}
        />
      </motion.div>
    </>
  );
};

export default LogoSphere;
