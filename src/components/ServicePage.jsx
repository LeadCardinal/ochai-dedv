import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, MapPin, CalendarDays, ArrowRight } from 'lucide-react';

const SITE = 'https://ochai.dev';
const CAL_URL = 'https://cal.com/jeremy-ochai-dev';

/**
 * Shared template for the focused service/landing pages.
 * Plain markup on purpose (no entrance animation, no lazy sections) so the
 * prerendered HTML carries the full answer for crawlers and AI retrieval.
 */
const ServicePage = ({
  path,
  title,
  metaDescription,
  eyebrow,
  h1,
  summary,
  serviceName,
  serviceType,
  audience,
  problems,
  deliverables,
  stack,
  proof,
  fit,
  notFit,
  pricing,
  faqs,
  related,
}) => {
  const url = `${SITE}${path}`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: serviceName,
        serviceType,
        description: summary,
        url,
        provider: { '@id': `${SITE}/#organization` },
        areaServed: [
          { '@type': 'City', name: 'Huntsville' },
          { '@type': 'City', name: 'Madison' },
          { '@type': 'AdministrativeArea', name: 'North Alabama' },
        ],
        audience: { '@type': 'BusinessAudience', name: 'Small and mid-sized businesses' },
        offers: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: pricing.minPrice,
            priceCurrency: 'USD',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'OchAI', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
          { '@type': 'ListItem', position: 3, name: h1, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(graph)}</script>
      </Helmet>

      <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero + quotable summary */}
          <header className="mb-12">
            <p className="flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-4 h-4" /> {eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{h1}</h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">{summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <CalendarDays className="w-5 h-5" /> Book a free discovery call
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-slate-600 hover:border-cyan-400 px-6 py-3 rounded-lg transition-colors"
              >
                See all packages <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </header>

          <Section title="Who this is for">
            <ul className="space-y-3">
              {audience.map((a) => (
                <li key={a} className="flex gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Problems this solves">
            <div className="grid md:grid-cols-2 gap-4">
              {problems.map((p) => (
                <div key={p.title} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="What you get">
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="The tech, in plain English">
            <dl className="space-y-4">
              {stack.map((s) => (
                <div key={s.name}>
                  <dt className="font-bold text-cyan-300">{s.name}</dt>
                  <dd className="text-slate-300 text-sm leading-relaxed">{s.plain}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Proof you can check yourself">
            <ul className="space-y-3">
              {proof.map((p) => (
                <li key={p.text} className="flex gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    {p.text}
                    {p.to && (
                      <>
                        {' '}
                        <Link to={p.to} className="text-cyan-400 hover:text-cyan-300 underline">
                          {p.linkLabel}
                        </Link>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Best fit, and not a fit">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-5">
                <h3 className="font-bold mb-3 text-emerald-300">Best fit</h3>
                <ul className="space-y-2">
                  {fit.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900/50 border border-rose-500/30 rounded-xl p-5">
                <h3 className="font-bold mb-3 text-rose-300">Not a fit</h3>
                <ul className="space-y-2">
                  {notFit.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-slate-300">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Pricing">
            <p className="text-slate-300 leading-relaxed">
              <span className="text-2xl font-bold text-white">{pricing.from}</span>
              <span className="block mt-2">{pricing.note}</span>
            </p>
          </Section>

          <Section title="Common questions">
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-bold mb-2">{f.q}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Related">
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.to}>
                  <Link to={r.to} className="text-cyan-400 hover:text-cyan-300 underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <p className="text-slate-400 text-sm mt-12">
            OchAI is run by Jeremy Och in Huntsville, Alabama, serving businesses across North Alabama and remotely
            across the United States. Reach me at{' '}
            <a href="mailto:jeremy@ochai.dev" className="text-cyan-400 hover:text-cyan-300">
              jeremy@ochai.dev
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-2xl md:text-3xl font-bold mb-5">{title}</h2>
    {children}
  </section>
);

export default ServicePage;
