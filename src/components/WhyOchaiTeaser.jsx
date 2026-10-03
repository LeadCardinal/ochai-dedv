import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/** Plain, non-animated block so it lands in the prerendered homepage HTML. */
const WhyOchaiTeaser = () => (
  <section aria-labelledby="why-ochai-heading" className="bg-slate-950 py-16 md:py-20">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
        <img
          src="/images/jeremy-och-ochai-founder.avif"
          alt="Jeremy Och, founder of OchAI, leaning against large marble letters that read AI Innovator"
          width={576}
          height={448}
          loading="lazy"
          decoding="async"
          className="md:col-span-2 w-full h-auto rounded-xl border border-slate-800"
        />
        <div className="md:col-span-3">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Why OchAI</p>
          <h2 id="why-ochai-heading" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            One developer, start to finish.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I&rsquo;m Jeremy Och, owner and sole employee of OchAI in Huntsville, Alabama. I design, build, wire
            together, and deploy every site and app myself in React and Cloudflare, so nothing gets lost in a
            handoff, and every page I publish scores 100 on all four Lighthouse measures.
          </p>
          <Link
            to="/why-ochai"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            Read why OchAI <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default WhyOchaiTeaser;
