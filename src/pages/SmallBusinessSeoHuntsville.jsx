import React from 'react';
import ServicePage from '@/components/ServicePage';

const SmallBusinessSeoHuntsville = () => (
  <ServicePage
    path="/small-business-seo-huntsville"
    title="Huntsville SEO Services | Page 1 in 30 Days | OchAI"
    metaDescription="Huntsville SEO with market analysis: hsvdrone.com hit page 1 in 30 days. Built into every site I make, on every tier, or available on its own."
    eyebrow="Huntsville, Madison & North Alabama"
    h1="Huntsville SEO, built in from the first note"
    summary="At OchAI, SEO is not an add-on. Every site I build, on every tier, ships with search intent research, a market analysis and on-page SEO behind it, because a site that search engines cannot find or understand is not a finished site. The goal is not to out-shout the competitor with the biggest online presence. It is to find the searches, audiences and angles they never considered, and win there. Already have a site and only need the search work? I do that on its own too."
    serviceName="Huntsville SEO"
    serviceType="Search engine optimization"
    audience={[
      'Huntsville and North Alabama businesses that want to be found when locals search for what they sell or do.',
      'Owners who already have a site and want the SEO and market analysis on its own, without a rebuild.',
      'Anyone planning a new site who wants search built in from day one instead of bolted on later.',
    ]}
    problems={[
      { title: 'Out-shouted by a bigger competitor', body: 'Matching a rival with a big online presence head-on is slow and expensive. Market analysis shows where they are thin or missing: the searches, audiences and angles they never covered.' },
      { title: 'Invisible on local searches', body: 'Each page is written for its own search intent, with Huntsville and North Alabama in the titles, headings, copy and structured data, instead of one generic keyword spread across the whole site.' },
      { title: 'Impressions without clicks', body: 'Ranking is only half the job. Titles and descriptions are written to earn the click, then tuned against Search Console data once real queries come in.' },
      { title: 'A site with nothing for the algorithm to grab', body: 'Structure, structured data, internal links and intent-matched copy are built in, so search engines and AI assistants have something to rank, cite and recommend.' },
    ]}
    deliverables={[
      'Market analysis: who already ranks for your searches, what they cover, and the gaps and adjacent searches they have left open.',
      'Search intent research: the questions, comparisons and local searches your customers actually use, mapped page by page.',
      'Per-page titles, descriptions and headings aimed at the intent behind each page, not one keyword smeared across the whole site.',
      'Structured data (Organization, Service, FAQ and breadcrumbs) so Google and AI assistants can read what you do and where.',
      'Pre-rendered pages, a sitemap and an llms.txt file, so crawlers and AI tools receive finished content.',
      'Google Search Console and Bing Webmaster Tools set up with your sitemap submitted, plus a walkthrough of what the numbers mean.',
    ]}
    stack={[
      { name: 'Pre-rendering', plain: 'Every page is built into finished HTML at deploy time, so Google and AI crawlers read the full content on the first request.' },
      { name: 'Structured data (JSON-LD)', plain: 'Machine-readable markup that tells search engines your business name, services, service area and common questions.' },
      { name: 'Search Console + Bing Webmaster Tools', plain: 'Free tools that show which searches reach you, which pages get indexed, and where impressions are not turning into clicks.' },
      { name: 'llms.txt', plain: 'A plain-text map of the site for AI assistants, listing every page with a one-line description.' },
    ]}
    proof={[
      { text: 'hsvdrone.com, one of my own sites, reached Google page 1 within 30 days.', to: '/case-study/hsvdrone/', linkLabel: 'HSV Drone SEO case study' },
      { text: 'reallivebonsai.us, my own e-commerce store, drew 1,000+ organic clicks and 48K+ impressions from Jun 2025 to Jun 2026 with no paid ads.', to: '/case-study/reallivebonsai/', linkLabel: 'Bonsai organic growth case study' },
      { text: 'A technical breakdown of a book-marketing site built to the same standard.', to: '/case-study/themeaningsoflife/', linkLabel: 'themeaningsoflife.com case study' },
      { text: 'ochai.dev scores 100 on all four Lighthouse categories. Run it through PageSpeed Insights yourself.' },
    ]}
    fit={[
      'You want search strategy and code handled by the same person.',
      'You would rather beat competitors where they are not looking than outspend them where they are.',
      'You want SEO built into a new site, or on its own for a site you already have.',
    ]}
    notFit={[
      'You want a guaranteed ranking or a guaranteed timeline. No one can honestly offer either.',
      'You need a large content team producing dozens of articles a month.',
      'You want the lowest possible price. A $20 template builder will undercut this.',
    ]}
    pricing={{
      from: 'Included in every build',
      note: 'SEO, search intent research and market analysis are standard on every OchAI website, from The Quartet at $2,500 up. If you only need the SEO work for a site you already have, it is scoped and quoted on a free discovery call. Full package details are on the services page.',
    }}
    faqs={[
      { q: 'Is SEO included in every website you build?', a: 'Yes, on every tier. Search intent research, market analysis and on-page SEO are part of each build, because a site that search engines cannot find or understand is not a finished site. Full details of each package are on the services page.' },
      { q: 'Can I hire you for SEO only?', a: 'Yes. If you already have a site and only need the search work, I will scope the market analysis, intent research and on-page SEO as a stand-alone project. The price depends on the size of the site and the market, and it goes in writing after a free discovery call.' },
      { q: 'What does the market analysis involve?', a: 'I look at who already ranks for the searches your customers use, what those competitors cover and what they leave open. The site is then built around the openings: searches, locations and questions they have not claimed. You compete where you can win instead of where the biggest budget sits.' },
      { q: 'How long does SEO take to work?', a: 'It depends on competition, content and how quickly Google crawls the site. hsvdrone.com reached page 1 within 30 days, but that is one site in one niche, not a promise. I will tell you what is realistic for your market on the discovery call.' },
      { q: 'Are your case studies client results?', a: 'They are my own sites, which means I can show every number and every decision behind them. Client results depend on competition, content and time, and no one can honestly guarantee a ranking.' },
    ]}
    related={[
      { to: '/services/', label: 'All website packages and pricing' },
      { to: '/small-business-web-development-huntsville/', label: 'Web development for Huntsville small businesses' },
      { to: '/ai-integration-small-business/', label: 'AI integration for small and mid-sized businesses' },
    ]}
  />
);

export default SmallBusinessSeoHuntsville;
