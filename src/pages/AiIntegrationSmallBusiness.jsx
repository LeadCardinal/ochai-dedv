import React from 'react';
import ServicePage from '@/components/ServicePage';

const AiIntegrationSmallBusiness = () => (
  <ServicePage
    path="/ai-integration-small-business"
    title="AI Integration for Small & Mid-Sized Businesses | OchAI Huntsville"
    metaDescription="Practical Claude API integration and AI workflow automation for small and mid-sized businesses, built into your real systems by one Huntsville developer."
    eyebrow="Huntsville, North Alabama & remote"
    h1="AI integration for small and mid-sized businesses"
    summary="OchAI integrates AI into the systems a small or mid-sized business already runs, using the Claude API and custom workflow automation. The goal is a working system that removes a specific manual task, not a chat widget bolted onto your site. Based in Huntsville, Alabama, serving North Alabama and remote clients."
    serviceName="AI Integration and Workflow Automation"
    serviceType="AI integration"
    audience={[
      'Owners and operations leads who keep saying "we should use AI for that" and have not shipped anything.',
      'Businesses with repetitive work: intake, quoting, scheduling, document handling, customer replies.',
      'Teams that want AI tied into existing software, with a person still in the loop for decisions.',
    ]}
    problems={[
      { title: 'AI stuck at the idea stage', body: 'We pick one task, define what success looks like, build it, and measure it. Then we decide what comes next.' },
      { title: 'Generic chatbots that do not help', body: 'The integration connects to your actual data and tools, so it can do work instead of just answering questions.' },
      { title: 'Hand-offs between vendors', body: 'The same developer designs the workflow, writes the code and deploys it, which means fewer places for things to break.' },
      { title: 'No way to judge the result', body: 'Each build includes simple tracking so you can see time saved or tasks completed.' },
    ]}
    deliverables={[
      'A scoped use case with a clear definition of done, agreed before any build starts.',
      'Custom Claude API integration wired into your site, app, inbox or internal tools.',
      'Workflow automation for the repetitive steps, with human review where mistakes would be costly.',
      'Deployment on Cloudflare Workers or your existing infrastructure, with secrets handled properly.',
      'Documentation of what the system does and how to change it.',
    ]}
    stack={[
      { name: 'Claude API', plain: 'Anthropic\'s language model, used here for drafting, classifying, extracting and summarizing text inside your workflows.' },
      { name: 'Cloudflare Workers', plain: 'Small server-side programs that run close to your users and keep API keys out of the browser.' },
      { name: 'React + Node', plain: 'The front end your staff or customers see, and the back-end logic behind it.' },
      { name: 'Supabase / Stripe / Twilio', plain: 'Common services for storing data, taking payments and sending messages, connected when a project calls for them.' },
    ]}
    proof={[
      { text: 'Claude API, Adobe Firefly and ElevenLabs are in use in my own production workflows, not just demos.' },
      { text: 'The site you are reading is structured for AI search, with schema markup, an llms.txt file and pre-rendered pages.', to: '/performance', linkLabel: 'Performance results' },
      { text: 'Example of scoping a real engagement:', to: '/apps', linkLabel: 'App development tiers' },
    ]}
    fit={[
      'You have a specific, repeatable task you want automated or assisted.',
      'You are comfortable with a person reviewing the AI output where it matters.',
      'You want a working system in weeks, not a strategy deck.',
    ]}
    notFit={[
      'You want AI to make high-stakes legal, medical or financial decisions unsupervised.',
      'You need a research lab to train a custom model from scratch.',
      'You want a vague "AI transformation" with no defined first step.',
    ]}
    pricing={{
      minPrice: '4500',
      from: 'From $4,500',
      note: 'AI features ship inside a website or app build. The Symphony website tier (from $12,000) includes AI integration and Cloudflare edge work, and app builds start at $4,500 with The Soloist. A fixed scope and price are agreed before work begins.',
    }}
    faqs={[
      { q: 'What does AI workflow automation mean for a small business?', a: 'It means a repeatable task, such as sorting inquiries or drafting first replies, is handled by software that you can review and correct. It is built into the same codebase as your site or app, not added as a separate plugin.' },
      { q: 'Can I get custom Claude API integration instead of a generic chatbot?', a: 'Yes. The integration connects to your real workflow and data, so it does work in your systems rather than sitting on top of them.' },
      { q: 'Is my data safe?', a: 'API keys stay server-side, and we agree up front which data is sent to the model. I will tell you plainly when a task is not a good fit for AI.' },
      { q: 'How do we start?', a: 'Book a free discovery call. We pick one task, define success, and I give you a fixed scope and price.' },
    ]}
    related={[
      { to: '/services', label: 'Website packages, including the Symphony tier' },
      { to: '/small-business-web-development-huntsville', label: 'Web development for Huntsville small businesses' },
      { to: '/full-stack-development-small-business', label: 'Full-stack development for SMBs' },
    ]}
  />
);

export default AiIntegrationSmallBusiness;
