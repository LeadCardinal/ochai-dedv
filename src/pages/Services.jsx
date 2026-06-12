import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Search, FileText, Hammer, LifeBuoy } from 'lucide-react';
import ServiceCards from '@/components/Services';

const WHATSAPP_URL =
  'https://wa.me/12563619056?text=' +
  encodeURIComponent("Hi Jeremy, I'd like to book a free discovery call about my project.");
const EMAIL_URL =
  'mailto:jeremy@ochai.dev?subject=' +
  encodeURIComponent('Discovery Call Request') +
  '&body=' +
  encodeURIComponent(
    'Hi Jeremy,\n\nI would like to discuss a project.\n\nBusiness/Project name:\nWhat I need:\nTimeline:\nBest way to reach me:\n'
  );

const processSteps = [
  {
    icon: Search,
    step: '01',
    title: 'Free Discovery Call',
    text: 'A no-obligation conversation about your business, your goals, and what is getting in the way. 20–30 minutes. You talk, I listen.',
  },
  {
    icon: FileText,
    step: '02',
    title: 'Custom Proposal',
    text: 'A written proposal scoped to your actual needs — deliverables, timeline, and a fixed price. No surprise invoices, no padded hours.',
  },
  {
    icon: Hammer,
    step: '03',
    title: 'Build & Iterate',
    text: 'You see progress at every milestone and approve before we move on. Built on the same standards as my own properties: fast, measurable, maintainable.',
  },
  {
    icon: LifeBuoy,
    step: '04',
    title: 'Launch & Support',
    text: 'Deployment, analytics wiring, and a support plan sized to your comfort level — from full handoff to ongoing operations.',
  },
];

const proofPoints = [
  {
    metric: '89%',
    label: 'YoY organic traffic growth',
    detail: 'reallivebonsai.us — zero paid ads',
    to: '/case-study/reallivebonsai',
  },
  {
    metric: '100/100',
    label: 'Google Lighthouse scores',
    detail: 'Performance, SEO, Accessibility, Best Practices',
    to: '/case-study/themeaningsoflife',
  },
  {
    metric: 'Page 1',
    label: 'Google rankings in under 30 days',
    detail: 'hsvdrone.com — local SEO',
    to: '/case-study/hsvdrone',
  },
];

const servicesJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'OchAI — Web Development & AI Integration Services',
  founder: { '@type': 'Person', name: 'Jeremy Carter Och' },
  url: 'https://ochai.dev/services',
  email: 'jeremy@ochai.dev',
  telephone: '+1-256-361-9056',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Huntsville',
    addressRegion: 'AL',
    addressCountry: 'US',
  },
  areaServed: ['Huntsville AL', 'Madison AL', 'North Alabama', 'Remote / United States'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Development', description: 'Responsive, scalable web applications built with React, TailwindCSS, and modern tooling.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Performance Optimization', description: 'Sub-second load times and perfect Google Lighthouse scores for existing sites.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Integration', description: 'LLM and generative AI integration into business workflows and customer experiences.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Analytics', description: 'Organic search growth, local SEO, and server-side analytics implementation.' } },
  ],
});

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Web Development & AI Integration Services | Huntsville, AL | OchAI</title>
        <link rel="canonical" href="https://ochai.dev/services" />
        <meta name="description" content="Custom web development, performance optimization, AI integration, and SEO services for businesses in Huntsville, North Alabama, and beyond. Free discovery call — fixed-price proposals scoped to your needs." />
        <meta name="keywords" content="web development services Huntsville AL, website developer Huntsville Alabama, small business website Huntsville, AI integration services, website performance optimization, local SEO Huntsville, React developer for hire, custom web design North Alabama, e-commerce development Alabama, website speed optimization" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ochai.dev/services" />
        <meta property="og:title" content="Web Development & AI Integration Services | Huntsville, AL" />
        <meta property="og:description" content="Fast, measurable, maintainable websites and AI integrations for businesses. Free discovery call, fixed-price proposals." />
        <script type="application/ld+json">{servicesJsonLd}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Your Business, <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Built to Perform</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-slate-300 mb-10"
          >
            Websites, AI integrations, and digital operations for businesses that want
            measurable results — built by the same hands that built every case study on this site.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white text-lg transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" /> Book a Free Discovery Call
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl font-bold text-white text-lg transition-colors"
            >
              <Mail className="w-5 h-5" /> Email Your Project
            </a>
          </motion.div>
        </div>
      </section>

      {/* Proof strip — verifiable receipts, linked to case studies */}
      <section className="py-12 border-y border-slate-800/60 bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {proofPoints.map((p, i) => (
              <motion.div
                key={p.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={p.to}
                  className="block text-center p-6 rounded-xl hover:bg-slate-800/50 transition-colors group"
                >
                  <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">{p.metric}</p>
                  <p className="text-white font-semibold">{p.label}</p>
                  <p className="text-sm text-slate-400 mt-1 group-hover:text-cyan-400 transition-colors">
                    {p.detail} <ArrowRight className="w-3 h-3 inline" />
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing four service cards */}
      <ServiceCards />

      {/* How it works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              From First Call to <span className="text-cyan-400">Launch</span>
            </h2>
            <p className="text-lg text-slate-300">
              No retainers to start. No commitments before the proposal. The process is built
              so you know exactly what you are buying before you spend a dollar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-bold text-slate-700">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Discovery Call Costs <span className="text-emerald-400">Nothing</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10">
            Worst case, you walk away with a clearer picture of what your project actually
            needs. Best case, you get a fixed-price proposal and a builder who answers his
            own phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white text-lg transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" /> WhatsApp: 256-361-9056
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl font-bold text-white text-lg transition-colors"
            >
              <Mail className="w-5 h-5" /> jeremy@ochai.dev
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
