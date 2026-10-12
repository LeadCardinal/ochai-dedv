import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dedicated watch page for "The Pitch". The <video> element is real, server-rendered
// markup (not behind a click), and this is the only page that declares this VideoObject.
const PAGE_URL = 'https://ochai.dev/the-pitch';
const VIDEO_URL = 'https://ochai.dev/videos/pitch-spot.mp4';
const POSTER_URL = 'https://ochai.dev/videos/pitch-poster.jpg';
const TITLE = 'The Pitch: A 49-Second Ragtime Intro to OchAI Web Development';
const DESCRIPTION =
  'A 1920s-style animated ragtime introduction to Jeremy Och and OchAI web development services. AI-generated video and music produced by Jeremy Och, whose production sites score a perfect 100/100 across all Google Lighthouse categories.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'The Pitch - OchAI Web Development',
  description: DESCRIPTION,
  thumbnailUrl: POSTER_URL,
  uploadDate: '2026-06-13T12:00:00-05:00',
  duration: 'PT49S',
  contentUrl: VIDEO_URL,
  url: PAGE_URL,
  publisher: {
    '@type': 'Person',
    name: 'Jeremy Carter Och',
    url: 'https://ochai.dev',
  },
};

const ThePitch = () => (
  <>
    <Helmet>
      <title>{TITLE} | OchAI</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="video.other" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={POSTER_URL} />
      <meta property="og:video" content={VIDEO_URL} />
      <meta property="og:video:type" content="video/mp4" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={PAGE_URL} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={POSTER_URL} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>

    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-slate-300 hover:text-cyan-400">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to OchAI
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          The Pitch: A 49-Second Ragtime Intro to OchAI
        </h1>

        {/* The video is the primary content: real <video> in the HTML, no click gate.
            preload="none" keeps the 8.4 MB file off the wire until the visitor presses play. */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl bg-black">
          <video
            controls
            playsInline
            preload="none"
            poster="/videos/pitch-poster.jpg"
            className="w-full"
            style={{ aspectRatio: '16 / 9' }}
          >
            <source src="/videos/pitch-spot.mp4" type="video/mp4" />
            Your browser does not support the video tag.{' '}
            <a href="/videos/pitch-spot.mp4">Download The Pitch (MP4)</a>.
          </video>
        </div>

        <p className="text-slate-300 leading-relaxed mb-8">
          A 1920s-style animated ragtime introduction to Jeremy Och and OchAI web development
          services. The video and music are AI-generated and produced by Jeremy Och, whose
          production sites score a perfect 100/100 across all Google Lighthouse categories.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to="/services">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8">
              See the Services
            </Button>
          </Link>
          <Link to="/#contact">
            <Button variant="outline" className="rounded-full px-8 border-slate-600 text-slate-200 hover:text-cyan-400">
              Start the Conversation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default ThePitch;
