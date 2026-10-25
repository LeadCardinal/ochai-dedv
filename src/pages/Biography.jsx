import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, GraduationCap, Award, MapPin, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Biography = () => {
  return (
    <>
      <Helmet>
        <title>Biography | Jeremy Och - Full Story</title>
        <link rel="canonical" href="https://ochai.dev/biography/" />
        <meta name="description" content="The story behind OchAI: Jeremy Och's 37+ years of self-taught technology, from the Commodore 64 to production web and AI systems in Huntsville, Alabama." />
      </Helmet>

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          <Link to="/">
            <Button variant="ghost" className="mb-8 text-slate-300 hover:text-cyan-400">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Extended Biography</h1>
            <p className="text-xl text-slate-300">The story behind OchAI, from the Commodore 64 to production web and AI systems</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert prose-lg max-w-none">

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mt-0 mb-2">Location & Context</h2>
                  <p className="text-slate-300 mb-0">Operating from Huntsville, Alabama—home to Cummings Research Park, the second-largest research park in the United States and historic birthplace of America's space program. Strategic positioning in the heart of defense, aerospace, and advanced technology innovation.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <Briefcase className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mt-0 mb-4">Professional Journey</h2>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Multi-Business Operator</h3>
                  <p className="text-slate-300">Currently running <strong>Real Live Bonsai</strong> (reallivebonsai.us) and <strong>Huntsville Drone</strong> (hsvdrone.com). Each business represents end-to-end execution: development, infrastructure, marketing automation, analytics, optimization.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <GraduationCap className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mt-0 mb-4">Self-Taught Foundation</h2>
                  <p className="text-slate-300 mb-4">No computer science degree. No bootcamp. Relentless learning, strategic tool selection, thousands of hours solving real problems on live systems.</p>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Core Technical Expertise</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li><strong>AI Production Tools:</strong> Adobe Firefly, Lisa.ai, ElevenLabs, Runway ML</li>
                    <li><strong>Adobe Creative Cloud:</strong> Full suite mastery—Photoshop, Illustrator, Premiere Pro, After Effects</li>
                    <li><strong>Enterprise Integration:</strong> Meta Business Suite, Google Cloud Console, Amazon systems</li>
                    <li><strong>Web Development:</strong> React, Vite, Tailwind CSS, modern JavaScript</li>
                    <li><strong>Infrastructure:</strong> Cloudflare Pages, Supabase, server-side analytics</li>
                    <li><strong>Perfect Lighthouse Scores:</strong> Consistent 100/100/100/100 across all deployed projects</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <Code className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mt-0 mb-4">What Makes This Rare</h2>
                  <p className="text-slate-300 mb-4">Not just "full-stack developer"—full-spectrum digital operator:</p>
                  <div className="grid gap-4">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-2">Build → Market → Measure</h4>
                      <p className="text-slate-300 text-sm mb-0">GTM strategy, SEO optimization, conversion tracking, iterative improvement based on actual user data.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-2">Design → Development → Deployment</h4>
                      <p className="text-slate-300 text-sm mb-0">Adobe expertise enables pixel-perfect implementation without designer dependencies.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-2">AI Integration → Automation</h4>
                      <p className="text-slate-300 text-sm mb-0">Production-grade AI tool integration for content creation. Not just API calls—actually using these systems to ship faster.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <Award className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mt-0 mb-4">Beyond the Code</h2>
                  <p className="text-slate-300 mb-4"><strong>Father and Author:</strong> "The Meaning(s) of Your LIFE! - A Father's Guide to His Daughter's Happiness" written for his daughter's 18th birthday.</p>
                  <p className="text-slate-300 mb-4"><strong>Philosophy:</strong> "God will move mountains for you, but you have to bring a shovel."</p>
                  <p className="text-slate-300 mb-4"><strong>Transportation:</strong> Cycles everywhere. Constraints breed creativity; dependencies breed fragility.</p>
                  <p className="text-slate-300 mb-0"><strong>Communication Style:</strong> Sardonic, self-deprecating, oniony layers of meaning. Direct business writing meets calculated wit.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mt-0 mb-4">Current Position</h2>
              <p className="text-slate-300 mb-4">Available for technical leadership roles in Huntsville's defense and aerospace sectors.</p>
              <ul className="text-slate-300 space-y-2">
                <li>Production systems without coordination overhead</li>
                <li>Full marketing → development → deployment cycles solo</li>
                <li>Defense-grade rigor applied to digital operations</li>
                <li>Dependency elimination, startup velocity</li>
                <li>Perfect technical standards under real-world constraints</li>
              </ul>
              <p className="text-slate-300 mt-6 mb-4">Not looking to be a cog. Looking to be the engine.</p>
              <p className="mb-0"><a href="/images/JeremyOch_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold">Download my résumé (PDF)</a></p>
            </div>

          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 text-center">
            <Link to="/#contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                Start the Conversation
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Biography;
