import React from 'react';
import ServicePage from '@/components/ServicePage';

const FullStackSmallBusiness = () => (
  <ServicePage
    path="/full-stack-development-small-business"
    title="Full-Stack Development for Small Businesses | OchAI Huntsville, AL"
    metaDescription="One developer for front end, back end, hosting and analytics. Custom web apps and platforms for small and mid-sized businesses in Huntsville and North Alabama."
    eyebrow="Huntsville, North Alabama & remote"
    h1="Full-stack development for small and mid-sized businesses"
    summary="OchAI is a one-developer full-stack practice in Huntsville, Alabama. Front end, back end, database, hosting and analytics all come from the same person, so a custom web app or platform for your business has one owner from first sketch to production. Serving North Alabama and remote clients."
    serviceName="Full-Stack Web and App Development"
    serviceType="Full-stack development"
    audience={[
      'Businesses that have outgrown a template site and need logins, dashboards, payments or integrations.',
      'Owners with a software idea who want a working first version before hiring a team.',
      'Companies tired of coordinating separate designers, developers and hosting vendors.',
    ]}
    problems={[
      { title: 'Too many vendors', body: 'Design, code, database and hosting each have a different owner and a different invoice. Here, one person is accountable for all of it.' },
      { title: 'Software that does not fit', body: 'Off-the-shelf tools force your process into their shape. Custom builds follow how you actually work.' },
      { title: 'Prototype that never ships', body: 'Projects are staged with working milestones, so you can use and judge real software early.' },
      { title: 'Opaque costs', body: 'Fixed-scope pricing with milestone billing keeps the budget visible.' },
    ]}
    deliverables={[
      'A custom web application or platform, front end and back end, scoped to your workflow.',
      'Database design, authentication and the integrations your process needs (payments, messaging, maps, calendars).',
      'Deployment, hosting and security headers configured for production.',
      'Analytics and conversion tracking that shows what users do.',
      'Source code you own, with documentation for the next developer.',
    ]}
    stack={[
      { name: 'React + Vite + Tailwind', plain: 'The front end: fast pages that work well on phones and are easy to extend.' },
      { name: 'Node.js + REST APIs', plain: 'The back end: the logic and data connections behind the screens.' },
      { name: 'Supabase / SQL', plain: 'Where your data lives, with access rules so users only see what they should.' },
      { name: 'Cloudflare Pages + Workers', plain: 'Hosting and edge functions that keep the app fast and the keys private.' },
      { name: 'Stripe and Square', plain: 'Payment integrations when the app needs to take money.' },
    ]}
    proof={[
      { text: 'Four production properties, built and operated by me and all scoring 100 on Lighthouse: ochai.dev, reallivebonsai.us, hsvdrone.com, themeaningsoflife.com.' },
      { text: 'A full e-commerce build with payments and analytics:', to: '/case-study/reallivebonsai', linkLabel: 'Real Live Bonsai case study' },
      { text: 'Pricing and tiers for apps are published, not hidden:', to: '/apps', linkLabel: 'App development tiers' },
    ]}
    fit={[
      'You need software shaped to your process, not the other way around.',
      'You want a single point of contact through build, launch and changes.',
      'You prefer staged milestones and clear scope.',
    ]}
    notFit={[
      'You need a large in-house team embedded for many months.',
      'You require a platform that must serve millions of users on day one.',
      'You want to buy a finished product off the shelf. A subscription tool will be cheaper.',
    ]}
    pricing={{
      minPrice: '4500',
      from: 'From $4,500',
      note: 'App builds start with The Soloist at $4,500, with larger tiers for more complex platforms. Custom web platforms can also be scoped under the Ensemble ($5,500+) and Symphony ($12,000+) website packages. Scope and milestone billing are agreed up front.',
    }}
    faqs={[
      { q: 'What does full-stack development include?', a: 'Everything between the screen and the server: the interface, the application logic, the database, hosting, and the analytics that show how it performs.' },
      { q: 'Why choose a solo developer over an agency?', a: 'You get direct communication and no hand-offs. The trade-off is limited capacity, so I am upfront about timelines and take on a small number of projects at a time.' },
      { q: 'Can you work with software we already use?', a: 'Often yes. Integrations with payments, messaging, calendars and existing databases are a normal part of the work.' },
      { q: 'What happens after launch?', a: 'You own the code and hosting. I can continue to maintain and extend the system, or hand it to another developer with the documentation provided.' },
    ]}
    related={[
      { to: '/services', label: 'Website packages and pricing' },
      { to: '/small-business-web-development-huntsville', label: 'Web development for Huntsville small businesses' },
      { to: '/ai-integration-small-business', label: 'AI integration for small and mid-sized businesses' },
    ]}
  />
);

export default FullStackSmallBusiness;
