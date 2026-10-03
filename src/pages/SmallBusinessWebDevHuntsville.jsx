import React from 'react';
import ServicePage from '@/components/ServicePage';

const SmallBusinessWebDevHuntsville = () => (
  <ServicePage
    path="/small-business-web-development-huntsville"
    title="Small Business Web Development in Huntsville, AL | OchAI"
    metaDescription="Fast, search-ready websites for Huntsville and North Alabama small businesses, built and run by one developer. Packages from $2,500. Free discovery call."
    eyebrow="Huntsville, Madison & North Alabama"
    h1="Web development for Huntsville small businesses"
    summary="OchAI builds fast, search-ready websites for small businesses in Huntsville, Madison and across North Alabama. One developer handles design, code, hosting and SEO setup, so there is no account manager and no agency overhead. Packages start at $2,500."
    serviceName="Small Business Web Development"
    serviceType="Web development"
    audience={[
      'Local service businesses (contractors, clinics, restaurants, shops) that need to be found when someone searches in Huntsville.',
      'Owners whose current site is slow, hard to edit, or invisible on Google.',
      'Businesses launching a first real website and wanting it built once, correctly.',
    ]}
    problems={[
      { title: 'Nobody finds the site', body: 'Local intent is written into the page copy, the metadata and the structured data, so Google and AI assistants can tell what you do and where you do it.' },
      { title: 'The site is slow', body: 'Pages are built to load quickly on a phone. Speed is checked with Lighthouse before launch, not promised afterward.' },
      { title: 'Nobody answers the phone', body: 'Calls, forms and booking are placed where visitors actually act, and tracking shows which ones convert.' },
      { title: 'The last agency vanished', body: 'You deal with the person writing the code, and the code is yours to keep.' },
    ]}
    deliverables={[
      'A custom-built site on a modern stack, not a rented template.',
      'On-page local SEO: titles, descriptions, headings and copy tuned for Huntsville and North Alabama searches.',
      'Structured data (LocalBusiness / Organization, FAQ) so search engines and AI tools can read your business details.',
      'Google Search Console and analytics set up, with conversion tracking on calls and forms.',
      'Hosting on Cloudflare, with SSL, caching and security headers configured.',
      'A hand-off you can understand, including where everything lives.',
    ]}
    stack={[
      { name: 'React + Vite', plain: 'The tooling that builds the site into fast, pre-rendered pages. Visitors and Google receive finished HTML, not a blank screen that fills in later.' },
      { name: 'Tailwind CSS', plain: 'A styling system that keeps pages light and consistent as the site grows.' },
      { name: 'Cloudflare Pages', plain: 'Global hosting with caching built in. Updates ship by pushing code, with no server for you to babysit.' },
      { name: 'Search Console + GA4', plain: 'Free Google tools that show how people find you and what they do next.' },
    ]}
    proof={[
      { text: 'My own production sites (ochai.dev, reallivebonsai.us, hsvdrone.com, themeaningsoflife.com) are built the same way and score 100 on Lighthouse. Run any of them through PageSpeed Insights.' },
      { text: 'Worked examples with the reasoning behind each decision:', to: '/case-study/hsvdrone', linkLabel: 'HSV Drone case study' },
      { text: '37 years of hands-on technology work, in the same city you are searching from.', to: '/biography', linkLabel: 'About Jeremy' },
    ]}
    fit={[
      'You want one accountable person instead of a team.',
      'You are in or near Huntsville and want to rank for local searches.',
      'You value speed, clean code and owning your site.',
    ]}
    notFit={[
      'You need a 20-person team or a 24/7 staffed support desk.',
      'You want the lowest possible price. A $20 template builder will undercut this.',
      'You need a multi-year enterprise procurement process before any work starts.',
    ]}
    pricing={{
      minPrice: '2500',
      from: 'From $2,500',
      note: 'The Quartet starts at $2,500 for a complete professional web presence. The Ensemble (from $5,500) adds keyword strategy, local SEO and a CMS. Full details are on the services page.',
    }}
    faqs={[
      { q: 'How long does a small business website take?', a: 'It depends on scope and how quickly content arrives. We scope the timeline on the discovery call and put it in writing before work starts.' },
      { q: 'Will my site show up on Google for Huntsville searches?', a: 'I build the technical and on-page foundation: local copy, metadata, structured data and Search Console. No one can honestly guarantee a ranking, and rankings take time to build.' },
      { q: 'Do I own the site?', a: 'Yes. The code and content are yours, and the hosting account is set up in your name.' },
      { q: 'Do you work outside Huntsville?', a: 'Yes. I serve Madison and the rest of North Alabama in person and work remotely with clients across the United States.' },
    ]}
    related={[
      { to: '/services', label: 'All website packages and pricing' },
      { to: '/ai-integration-small-business', label: 'AI integration for small and mid-sized businesses' },
      { to: '/full-stack-development-small-business', label: 'Full-stack development for SMBs' },
    ]}
  />
);

export default SmallBusinessWebDevHuntsville;
