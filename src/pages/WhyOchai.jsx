import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react';

const SITE = 'https://ochai.dev';
const URL = `${SITE}/why-ochai`;
const CAL_URL = 'https://cal.com/jeremy-ochai-dev';
const PHOTO = `${SITE}/images/jeremy-och-ochai-founder.avif`;
const TITLE = 'Why OchAI | One Developer, Start to Finish | Huntsville, AL';
const DESC =
  'OchAI is a one-person full-stack web and AI development shop in Huntsville, Alabama. Every page ships with 100s on all four Lighthouse measures, built by one developer with no handoffs.';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${URL}#page`,
      url: URL,
      name: TITLE,
      description: DESC,
      mainEntity: { '@id': `${SITE}/#founder` },
      isPartOf: { '@id': `${SITE}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'OchAI', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Why OchAI', item: URL },
      ],
    },
  ],
};

const WhyOchai = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={URL} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:image" content={PHOTO} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={URL} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={PHOTO} />
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>

    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12">
          <p className="flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
            <MapPin className="w-4 h-4" /> Huntsville, Alabama
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Why OchAI: one developer, start to finish
          </h1>
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <p className="md:col-span-3 text-lg md:text-xl text-slate-300 leading-relaxed">
              Hello. My name is Jeremy Och. I&rsquo;m the owner, operator, and sole employee of OchAI, a one-man
              full-stack web and AI development shop in Huntsville, Alabama. I build fast, search-ready sites and
              apps in React and Cloudflare for small and mid-sized businesses, and every page I publish scores 100
              on all four Lighthouse measures.
            </p>
            <img
              src="/images/jeremy-och-ochai-founder.avif"
              alt="Jeremy Och, founder of OchAI, leaning against large marble letters that read AI Innovator"
              width={576}
              height={448}
              className="md:col-span-2 w-full h-auto rounded-xl border border-slate-800"
              fetchpriority="high"
            />
          </div>
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
              to="/apps"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-cyan-400 px-6 py-3 rounded-lg transition-colors"
            >
              See pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <article className="space-y-6 text-slate-300 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-white pt-4">How I got here</h2>
          <p>
            I received my first computer, the Commodore 64, in 1988 at age 13. While most were satisfied with
            playing the games and using its word processor programs, I employed myself to learn the BASIC
            programming language the system utilized. Why? I don&rsquo;t know. I enjoyed copying pages and pages of
            &ldquo;IF&rdquo; or &ldquo;OR&rdquo;, &amp; &ldquo;AND&rdquo; statements that would culminate in one
            little 8 pixel hot air balloon moving side to side. Then I would go back and change the color. Then
            save it to a 5&nbsp;1/4&Prime; floppy disk. I did hundreds of these exercises until I was fluent in
            BASIC.
          </p>
          <p>
            The first program I authored was a couple years later on the Commodore 128. I wrote a program in BASIC
            for an interface where someone could type in musical notes A, B, C, etc. and denote the note
            length/count, and the output was actual sheet music, with time signature denoted, all on a treble clef
            staff, printed onto paper with my Okidata 120 tractor feed printer. I was enthralled. I had no real use
            for a Palm Pilot, but I had one. Black and white, then color. I have since been the go-to guy for any
            tech help or setup in every stage of life. In college I was given one of the first 2000 beta Gmail
            accounts before release to the public. The rest is current history.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white pt-6">Why I chase 100s</h2>
          <p>
            Fast forward to 2020, when some of my hobbies began to grow into businesses, aka side hustles. No
            business is complete without a website these days. In fact they might as well not even exist without any
            online presence. So I tasked myself with learning the modern skill sets required to publish websites. In
            doing so I inadvertently crashed through and above a threshold I was completely unaware existed.
          </p>
          <p>
            In pursuit of first page search results for my websites on Google, I used Google&rsquo;s Lighthouse
            audit to measure my sites&rsquo; performance characteristics. On a scale of 0-100, Lighthouse grades
            website speed, accessibility, proper code practices, and Search Engine Optimization quality. I pursued
            100s in all categories in an effort to remove any obstacles between me, my sites, and first page search
            results. I had crossed over into a realm the web development community perceives as impossible, or
            possible only with major limits on functions. In my experience, few chase scores that high. I have
            100s (<Link to="/performance" className="text-cyan-400 hover:underline">see the results</Link>). I have
            100s while performing every single function or process that web developers, as a whole, are taught is
            impossible or not worth the effort. That is what I would most likely also say if my sites in production
            did not have scores of 100 in all four measured areas of site performance and safety mechanisms. Check
            the case studies for{' '}
            <Link to="/case-study/reallivebonsai" className="text-cyan-400 hover:underline">reallivebonsai.us</Link>,{' '}
            <Link to="/case-study/hsvdrone" className="text-cyan-400 hover:underline">hsvdrone.com</Link>, and{' '}
            <Link to="/case-study/themeaningsoflife" className="text-cyan-400 hover:underline">themeaningsoflife.com</Link>.
          </p>
          <p>
            I am here to tell you that it is absolutely worth the effort and definitely not impossible to run an
            e-commerce site while nailing scores of 100 in all metrics. Nor is it impossible to serve landing pages
            that play video upon page load at all scores of 100. I now have a non-negotiable self requirement that
            all pages I build and publish must have the same scores. I now have my own self taught process for
            building this level of performance into any digital experience I build, from keystroke number one.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white pt-6">What that means for your project</h2>
          <p>
            I purpose build web and app digital experiences for businesses that see the value in owning a web
            presence that outperforms the vast majority of sites online today, often for far less than a
            multi-person agency charges (<Link to="/apps" className="text-cyan-400 hover:underline">see pricing</Link>).
            They have to pay whole teams and offload certain aspects of the builds to others who specialize in a
            particular area they aren&rsquo;t tooled or skilled to develop. I have me, myself, and I. Me, myself, and
            I have acquired specialist level proficiency in building all functional areas of a website. I
            differentiate yet again from my competition because I wire all of these functions together personally,
            with intent, and no missed targets from handoffs of the build. One guy from start to finish with laser
            focus on every site build&rsquo;s aim. Nothing gets lost. Everything gets gained. Performance, quality
            architecture based SEO, focus, and the highest performing results. One guy.
          </p>
          <p className="text-white font-semibold">&mdash;OchAI</p>
        </article>

        <nav aria-label="Related" className="mt-14 border-t border-slate-800 pt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/small-business-web-development-huntsville" className="text-cyan-400 hover:underline">Small business web development</Link>
          <Link to="/ai-integration-small-business" className="text-cyan-400 hover:underline">AI integration</Link>
          <Link to="/full-stack-development-small-business" className="text-cyan-400 hover:underline">Full-stack development</Link>
          <Link to="/biography" className="text-cyan-400 hover:underline">Extended biography</Link>
        </nav>
      </div>
    </main>
  </>
);

export default WhyOchai;
