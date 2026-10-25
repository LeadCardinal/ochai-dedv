import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CalendarDays, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SITE, ORG_ID, AREA_SERVED, breadcrumbJsonLd } from "@/lib/schemaEntities";

const CAL_URL = "https://cal.com/jeremy-ochai-dev";
const PAGE_URL = `${SITE}/contact/`;

const contactJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${PAGE_URL}#contactpage`,
  url: PAGE_URL,
  name: "Contact OchAI: web development and AI integration in Huntsville, AL",
  isPartOf: { "@id": `${SITE}/#website` },
  mainEntity: {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "OchAI",
    url: SITE,
    email: "jeremy@ochai.dev",
    telephone: "+1-256-361-9167",
    areaServed: AREA_SERVED,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+1-256-361-9167",
        email: "jeremy@ochai.dev",
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
  },
});

const CHANNELS = [
  {
    icon: CalendarDays,
    title: "Book a free discovery call",
    detail: "Pick a time that works. We talk through what you need and whether I am the right fit.",
    action: "Open the calendar",
    href: CAL_URL,
    external: true,
    primary: true,
  },
  {
    icon: Phone,
    title: "Call or WhatsApp",
    detail: "(256) 361-9167. WhatsApp is the fastest way to reach me.",
    action: "Message on WhatsApp",
    href: "https://wa.me/12563619167",
    external: true,
    secondary: { label: "Call (256) 361-9167", href: "tel:+12563619167" },
  },
  {
    icon: Mail,
    title: "Email",
    detail: "jeremy@ochai.dev. Best when you want to send links, files or a longer brief.",
    action: "Send an email",
    href: "mailto:jeremy@ochai.dev",
  },
];

const HELPFUL = [
  "What you want built or fixed, in a sentence or two",
  "Your current site address, if you have one",
  "Any deadline that matters to you",
  "A rough budget range, if you have one in mind",
];

const EXPLORE = [
  { to: "/services/", label: "Website packages and pricing" },
  { to: "/apps/", label: "Custom apps and portals" },
  { to: "/ai-integration-small-business/", label: "AI integration for small business" },
  { to: "/small-business-web-development-huntsville/", label: "Web development in Huntsville" },
  { to: "/showcase/", label: "Showcase of finished work" },
  { to: "/why-ochai/", label: "Why work with OchAI" },
];

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact OchAI | Web Developer in Huntsville, AL</title>
      <meta
        name="description"
        content="Contact OchAI, a one-developer web development and AI integration practice in Huntsville, Alabama. Book a free discovery call, message on WhatsApp at (256) 361-9167, or email jeremy@ochai.dev."
      />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:title" content="Contact OchAI | Web Developer in Huntsville, AL" />
      <meta
        property="og:description"
        content="Book a free discovery call, message on WhatsApp, or email. Web development and AI integration for Huntsville and North Alabama businesses."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact OchAI | Web Developer in Huntsville, AL" />
      <meta
        name="twitter:description"
        content="Book a free discovery call, message on WhatsApp, or email. Web development and AI integration for Huntsville and North Alabama businesses."
      />
      <script type="application/ld+json">{contactJsonLd}</script>
      <script type="application/ld+json">{breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }])}</script>
    </Helmet>

    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-14">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Huntsville, North Alabama &amp; remote
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Contact OchAI
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            OchAI is one developer, so you reach the person who does the work. Web development, custom apps and AI integration for businesses in Huntsville and across North Alabama. Choose whichever way suits you.
          </p>
        </header>

        <section aria-labelledby="ways-to-reach" className="mb-16">
          <h2 id="ways-to-reach" className="sr-only">Ways to reach me</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className={`rounded-2xl p-6 border flex flex-col ${
                    c.primary
                      ? "bg-amber-400/10 border-amber-400/40"
                      : "bg-slate-900/50 border-slate-800"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                    <Icon className={`w-5 h-5 ${c.primary ? "text-amber-400" : "text-cyan-400"}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5 flex-1">{c.detail}</p>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      c.primary
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-900"
                        : "border border-slate-600 hover:border-cyan-400 text-white"
                    }`}
                  >
                    {c.action} <ArrowRight className="w-4 h-4" />
                  </a>
                  {c.secondary && (
                    <a
                      href={c.secondary.href}
                      className="mt-3 text-center text-sm text-slate-300 hover:text-cyan-300 underline"
                    >
                      {c.secondary.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">Helpful to include</h2>
            <ul className="space-y-2">
              {HELPFUL.map((h) => (
                <li key={h} className="text-slate-300 text-sm leading-relaxed">• {h}</li>
              ))}
            </ul>
            <p className="text-sm text-slate-400 mt-4">
              None of it is required. A short message is fine and I will ask the rest.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Where I work
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Based in Huntsville, Alabama, on Central Time. I work with businesses in Huntsville, Madison, Decatur, Athens, Hartselle, Florence, Cullman, Birmingham and Tuscaloosa, and with remote clients anywhere in the United States.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-5">Not sure where to start?</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {EXPLORE.map((e) => (
              <li key={e.to}>
                <Link
                  to={e.to}
                  className="flex items-center justify-between gap-3 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 rounded-xl px-5 py-4 text-slate-200 hover:text-white transition-colors"
                >
                  {e.label} <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  </>
);

export default ContactPage;
