import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── SWAP THIS when video is uploaded to YouTube ───────────────────────────
const YOUTUBE_VIDEO_ID = 'yzqP5yHmJNs';
// ───────────────────────────────────────────────────────────────────────────

const VIDEO_TITLE = 'AI Implementation Solutions Architect Full Stack Digital Operator';
const VIDEO_SUBTITLE = 'Huntsville, AL — Jeremy Och';
const VIDEO_DESCRIPTION = 'Shameless self promotion video spot on the rarity of my tool set and the performance levels they support. Find out more at https://ochai.dev';
const VIDEO_UPLOAD_DATE = '2026-03-23T10:37:00-05:00';
// Schema describes the video this page actually plays: the self-hosted desktop file (106.7 s).
const VIDEO_DURATION = 'PT1M47S';
const CONTENT_URL = 'https://ochai.dev/videos/_desktop.mp4';
const THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;


const VideoPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: VIDEO_TITLE,
    description: VIDEO_DESCRIPTION,
    thumbnailUrl: THUMBNAIL_URL,
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: VIDEO_DURATION,
    contentUrl: CONTENT_URL,
    url: 'https://ochai.dev/performance/',
    publisher: {
      '@type': 'Person',
      name: 'Jeremy Carter Och',
      url: 'https://ochai.dev',
    },
  };

  return (
    <>
      <Helmet>
        <title>{VIDEO_TITLE} | Jeremy Och</title>
        <meta name="description" content={VIDEO_DESCRIPTION} />
        <link rel="canonical" href="https://ochai.dev/performance/" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="https://ochai.dev/performance/" />
        <meta property="og:title" content={VIDEO_TITLE} />
        <meta property="og:description" content={VIDEO_DESCRIPTION} />
        <meta property="og:image" content={THUMBNAIL_URL} />
        <meta property="og:video" content={CONTENT_URL} />
        <meta property="og:video:type" content="video/mp4" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={VIDEO_TITLE} />
        <meta name="twitter:description" content={VIDEO_DESCRIPTION} />
        <meta name="twitter:image" content={THUMBNAIL_URL} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>


      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-slate-300 hover:text-cyan-400">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Performance Showcase
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {VIDEO_TITLE}
            </h1>
            <p className="text-slate-400 text-lg">{VIDEO_SUBTITLE}</p>
          </div>

          {/* Desktop: 16:9 Widescreen Self-Hosted Video */}
          <div className="hidden md:block mb-10">
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <video
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full"
              >
                <source src="/videos/_desktop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Mobile/Tablet: 9:16 Vertical Self-Hosted Video */}
          <div className="flex md:hidden justify-center mb-10">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-700 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <div className="relative aspect-[9/16] w-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/_mobile.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-3">About This Video</h2>
            <p className="text-slate-300 leading-relaxed">
              {VIDEO_DESCRIPTION}
            </p>
          </div>

          {/* Why SEO is baked into every build */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why every build ships at 100 out of 100
            </h2>
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p>
                Every website I build, with no exception, from concept through to live is based on a four-principled aim at giving Google Search precisely what it asks for. Google commands the market share of internet searches. Google gives us a tool to benchmark our efforts relative to what they feel is important for developers to pay close attention to while building and engineering their websites and website functions. Why? So that Google can ensure it is presenting qualified search results that, through the conventions Google itself outlined and formed, deliver content matched properly with user intent. So they built Lighthouse, through PageSpeed Insights, to inform us of exactly where we place on the scale of adherence across four critical aspects of page and site performance. Lighthouse grades 0 to 100 in each of Performance/Speed, Accessibility, Best Practices, and SEO. There is no mystery here. They name the wants, and they give us a tool that fully analyzes our sites against those wants. Along with the score come heaps of information on precisely where our pages, with more attention, could better meet their vision and so better reach intentful searches with meaningful content.
              </p>
              <p>
                Then they take it a step further and SHOW US how people find our content: what country they searched from, what kind of device they used, the actual terms that invoked our site, and where we ranked among the sites served for those searches. Google spoon-feeds us the entire way. So why do so many websites land well short of 100 on one metric or more? Because they take them as suggestions. I perceive them as crystal clear expectations from the gatekeepers of search, on how to better serve the people they serve. It&apos;s the test with all the answers in front of you. It&apos;s the hand that holds you through every build so you don&apos;t fall astray. And it throws a tool on top that can score each line of new code and tell any developer how that line affected the site and the user experience.
              </p>
              <p>
                Lighthouse is the foundation, not the ceiling. Search no longer ends at ten blue links. AI assistants and agents read the web now too, and few sites are built for them. So every build I ship also carries structured data that ties the business, its services and its people together as one entity. It carries an llms.txt regenerated on every build, so machines get a clean map of the site. Crawler rules name the search and AI bots instead of leaving them to guess. Pages are pre-rendered, so what a crawler fetches is what a visitor sees. Service area and local intent are mapped before a word of copy is written. Search Console and Bing are wired up on day one, so the feedback loop starts at launch. That&apos;s why ochai.dev reads 3 out of 3 on Google&apos;s Agentic Browsing check alongside the four 100s.
              </p>
              <p className="text-white font-semibold">
                I don&apos;t understand getting anything less than 100 out of 100. I just don&apos;t. And I don&apos;t ship one that isn&apos;t, each and every time.
              </p>
            </div>
          </section>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Lighthouse Score', value: '100/100/100/100' },
              { label: 'Production Sites', value: '4' },
              { label: 'Experience', value: '37+ Years' },
              { label: 'Location', value: 'Huntsville, AL' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center"
              >
                <p className="text-cyan-400 font-bold text-lg">{stat.value}</p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/contact/">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                Start the Conversation
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default VideoPage;