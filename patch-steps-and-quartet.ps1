
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ─────────────────────────────────────────────────────────────
# PATCH 1 — Add stepSectionRef + stepRefs to ref declarations
# ─────────────────────────────────────────────────────────────
$old1 = '  const everyBuildRef = useRef(null);
  const tierRefs = useRef(tiers.map(() => ({ section: null, splash: null, card: null })));'

$new1 = '  const everyBuildRef  = useRef(null);
  const tierRefs      = useRef(tiers.map(() => ({ section: null, splash: null, card: null })));
  const stepSectionRef = useRef(null);
  const stepRefs       = useRef([]);'

$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1 FAILED"; exit 1 }
Write-Host "PATCH 1 OK — refs added"
$original = $content

# ─────────────────────────────────────────────────────────────
# PATCH 2 — Fix Quartet overflow: lock during wipe, unlock onComplete
# ─────────────────────────────────────────────────────────────
$old2 = '      // ── Tier iris wipe sequence ──
      // Card starts clipped to zero at center, expands outward over splash image
      tierRefs.current.forEach(({ section, splash, card }) => {
        if (!section || !splash || !card) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: ''top top'',
            end: ''bottom bottom'',
            scrub: 1.2,
          },
        });

        // 0–30%  : splash holds static (drama/pause)
        // 30–100%: card iris expands from center outward over splash
        tl.fromTo(card,
          { clipPath: ''circle(0% at 50% 50%)'' },
          { clipPath: ''circle(150% at 50% 50%)'', ease: ''power2.inOut'' },
          0.30
        );
      });'

$new2 = '      // ── Tier iris wipe sequence ──
      // Card starts clipped to zero at center, expands outward over splash image
      // overflow stays hidden during wipe — prevents Quartet inner scroll fighting the animation
      tierRefs.current.forEach(({ section, splash, card }) => {
        if (!section || !splash || !card) return;

        gsap.set(card, { overflow: ''hidden'' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: ''top top'',
            end: ''bottom bottom'',
            scrub: 1.2,
            onLeaveBack: () => { card.style.overflow = ''hidden''; },
          },
          onComplete: () => { card.style.overflow = ''auto''; },
        });

        // 0–30%  : splash holds static (drama/pause)
        // 30–100%: card iris expands from center outward over splash
        tl.fromTo(card,
          { clipPath: ''circle(0% at 50% 50%)'' },
          { clipPath: ''circle(150% at 50% 50%)'', ease: ''power2.inOut'' },
          0.30
        );
      });'

$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — quartet overflow fixed"
$original = $content

# ─────────────────────────────────────────────────────────────
# PATCH 3 — Add process steps cascade GSAP animation
#           Insert before the requestAnimationFrame refresh line
# ─────────────────────────────────────────────────────────────
$old3 = '      requestAnimationFrame(() => { ScrollTrigger.refresh(); });'

$new3 = '      // ── Process steps — cascade from left, one by one, scrubbed ──
      // Each card travels from off-screen-left to position, staggered across pinned scroll
      // Cards 1-4: progressively longer travel + slower scale to sell distance
      if (stepSectionRef.current && stepRefs.current.length === 4) {
        const steps = stepRefs.current;
        const totalVh = 500;

        // Pin the section for 500vh of scroll
        ScrollTrigger.create({
          trigger: stepSectionRef.current,
          start: ''top top'',
          end: `+=${totalVh}vh`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Each card occupies ~25% of the 500vh window with a hold gap after
        // card 0: enters 0–15%, holds 15–25%
        // card 1: enters 25–40%, holds 40–50%
        // card 2: enters 50–65%, holds 65–75%
        // card 3: enters 75–92%, holds 92–100%
        const slots = [
          { enterStart: 0.00, enterEnd: 0.15 },
          { enterStart: 0.25, enterEnd: 0.40 },
          { enterStart: 0.50, enterEnd: 0.65 },
          { enterStart: 0.75, enterEnd: 0.92 },
        ];

        // Start all cards off-screen left, invisible
        steps.forEach((el, i) => {
          gsap.set(el, { x: ''-130vw'', scale: 0.72 + i * 0.04, opacity: 0 });
        });

        steps.forEach((el, i) => {
          const { enterStart, enterEnd } = slots[i];
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stepSectionRef.current,
              start: ''top top'',
              end: `+=${totalVh}vh`,
              scrub: 1.4 + i * 0.15,
            },
          });

          // Slide in + fade + scale up to 1 — longer travel for higher index cards
          tl.fromTo(el,
            { x: ''-130vw'', scale: 0.72 + i * 0.04, opacity: 0 },
            { x: ''0vw'',    scale: 1,                 opacity: 1, ease: ''power2.out'' },
            enterStart
          );
          tl.to(el, { duration: enterEnd - enterStart }, enterEnd);  // hold in place
        });
      }

      requestAnimationFrame(() => { ScrollTrigger.refresh(); });'

$content = $content -replace [regex]::Escape($old3), $new3
if ($content -eq $original) { Write-Host "PATCH 3 FAILED"; exit 1 }
Write-Host "PATCH 3 OK — process steps cascade added"
$original = $content

# ─────────────────────────────────────────────────────────────
# PATCH 4 — Wire stepSectionRef + stepRefs into JSX
# ─────────────────────────────────────────────────────────────
$old4 = '      <section className="relative z-10 py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">From First Call to <span className="text-cyan-400">Launch</span></h2>
            <p className="text-lg text-slate-300">No retainers to start. No commitments before the proposal. You know exactly what you are buying before you spend a dollar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center"><s.icon className="w-6 h-6" /></div>
                  <span className="text-3xl font-bold text-slate-700">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>'

$new4 = '      <section ref={stepSectionRef} className="relative z-10 bg-slate-900 overflow-hidden" style={{ minHeight: ''100vh'' }}>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">From First Call to <span className="text-cyan-400">Launch</span></h2>
            <p className="text-lg text-slate-300">No retainers to start. No commitments before the proposal. You know exactly what you are buying before you spend a dollar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((s, i) => (
              <div
                key={s.step}
                ref={el => { stepRefs.current[i] = el; }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center"><s.icon className="w-6 h-6" /></div>
                  <span className="text-3xl font-bold text-slate-700">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>'

$content = $content -replace [regex]::Escape($old4), $new4
if ($content -eq $original) { Write-Host "PATCH 4 FAILED"; exit 1 }
Write-Host "PATCH 4 OK — JSX wired"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "ALL PATCHES WRITTEN"
