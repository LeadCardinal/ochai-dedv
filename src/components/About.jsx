import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code2,
  Cpu,
  Rocket,
  Target,
  Zap,
  MapPin,
  ArrowRight,
  Clock,
} from "lucide-react";

const CAL_URL = "https://cal.com/jeremy-ochai-dev";

const About = () => {
  const stats = [
    {
      label: "Lighthouse Score",
      value: "100/100",
      icon: Rocket,
      color: "text-emerald-400",
    },
    {
      label: "Years Hands-On",
      value: "37+",
      icon: Clock,
      color: "text-cyan-400",
    },
    {
      label: "Production Sites",
      value: "4",
      icon: Target,
      color: "text-purple-400",
    },
  ];

  const howIWork = [
    {
      title: "You talk to the builder",
      body: "No account manager, no bloated retainer, no relay race. The person on the call is the person writing the code.",
    },
    {
      title: "Scoped in writing, priced by tier",
      body: "Website tiers (Quartet, Ensemble, Symphony) and app tiers (The Soloist, The Accompaniment, The Collective) so you know the number before the work starts.",
    },
    {
      title: "Live, measured, and findable",
      body: "Every build ships on Cloudflare, scored against Lighthouse, and structured so search engines and AI assistants can read and cite it.",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white" id="about">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-cyan-500/50"></span>
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              About OchAI
            </span>
            <span className="h-px w-8 bg-cyan-500/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Developer, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Not Your Account Manager
            </span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            37 years of self-taught tech, one finance degree, and a habit of
            actually shipping the thing instead of just diagramming it. OchAI
            works as a full-stack web and app development consultant and AI
            implementation specialist across North Alabama &mdash; not narrowly
            Huntsville, the whole corridor &mdash; helping businesses move from
            &ldquo;we should probably use AI for that&rdquo; to a system that is
            live and doing the work.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: How I work + stats */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                How I Work
              </h3>
              <div className="space-y-6">
                {howIWork.map((item) => (
                  <div key={item.title}>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-300">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: What you get */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Self-Taught, Client-Tested
                </h4>
                <p className="text-slate-300">
                  No bootcamp certificates, just decades of picking up whatever
                  skill the work demanded next and then shipping with it. The
                  proof is four live production sites, each one scoring a
                  perfect 100 on every Lighthouse category.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  AI Implementation, Not AI Theory
                </h4>
                <p className="text-slate-300">
                  Adobe Firefly producing imagery for real product listings.
                  ElevenLabs generating production voice content. Claude API
                  orchestration powering real business workflows. Server-side
                  analytics tracking actual conversions. Deployed systems, not
                  demos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Everything Under One Roof
                </h4>
                <p className="text-slate-300">
                  Engineering, design, analytics, SEO, and deployment, all
                  owned by one person. Fewer moving parts means fewer places
                  for your project to go sideways.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Local Roots, Remote Reach
                </h4>
                <p className="text-slate-300">
                  Based in Huntsville, serving businesses across North Alabama
                  in person and anywhere else remotely. Big-city execution
                  without the big-agency overhead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Got a project in mind?
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Most developers stop at &ldquo;it works.&rdquo; Most AI
              enthusiasts chase demos.{" "}
              <span className="text-cyan-400 font-bold">
                I stop when it is live, fast, findable, and doing its job.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-colors"
              >
                Book a Discovery Call <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/biography/"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-slate-200 hover:border-cyan-500 hover:text-cyan-300 rounded-full transition-colors"
              >
                Read the Full Bio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
