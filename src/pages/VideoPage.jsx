import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── SWAP THIS when video is uploaded to YouTube ───────────────────────────
const YOUTUBE_VIDEO_ID = 'REPLACE_WITH_VIDEO_ID';
// ───────────────────────────────────────────────────────────────────────────

const VIDEO_TITLE = 'AI Implementation Solutions Architect Full Stack Digital Operator';
const VIDEO_SUBTITLE = 'Huntsville, AL — Jeremy Och';
const VIDEO_DESCRIPTION = 'Shameless self promotion video spot on the rarity of my tool set and the performance levels they support. Find out more at https://ochai.dev';
const VIDEO_UPLOAD_DATE = '2026-03-23T10:37:00-05:00';
const VIDEO_DURATION = 'PT1M34S';
const THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;


const VideoPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: VIDEO_TITLE,
    description: VIDEO_DESCRIPTION,
    thumbnailUrl: THUMBNAIL_URL,
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: VIDEO_DURATION,
    contentUrl: `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`,
    embedUrl: EMBED_URL,
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
        <link rel="canonical" href="https://ochai.dev/performance" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="https://ochai.dev/performance" />
        <meta property="og:title" content={VIDEO_TITLE} />
        <meta property="og:description" content={VIDEO_DESCRIPTION} />
        <meta property="og:image" content={THUMBNAIL_URL} />
        <meta property="og:video" content={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`} />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={VIDEO_TITLE} />
        <meta name="twitter:description" content={VIDEO_DESCRIPTION} />
        <meta name="twitter:image" content={THUMBNAIL_URL} />
        <meta name="twitter:player" content={EMBED_URL} />
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

          {/* Video Embed — vertical video in a centered phone-width container */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-700 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${EMBED_URL}?rel=0&modestbranding=1`}
                  title={VIDEO_TITLE}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
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

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Lighthouse Score', value: '100/100/100/100' },
              { label: 'Global Percentile', value: 'Top 1%' },
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
            <Link to="/#contact">
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
