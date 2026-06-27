
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── PATCH 1 — Rip out old step GSAP block, replace with per-section pin model ──
$old1 = '      // Process steps
      const steps = stepRefs.current.filter(Boolean);
      steps.forEach((el, i) => {
        gsap.set(el, { x: ''-130vw'', opacity: 0, scale: 0.80 + i * 0.05 });
      });

      steps.forEach((el, i) => {
        const animDur = 0.7 + i * 0.12;
        const st = ScrollTrigger.create({
          trigger: el,
          start: ''top 80%'',
          toggleActions: ''play none none reverse'',
          onEnter:     () => gsap.to(el, { x: ''0vw'', opacity: 1, scale: 1,                 duration: animDur, ease: ''power3.out'' }),
          onLeaveBack: () => gsap.to(el, { x: ''-130vw'', opacity: 0, scale: 0.80 + i * 0.05, duration: 0.4,    ease: ''power2.in''  }),
        });
        outerSTs.push(st);
      });'

$new1 = '      // Process steps — each card pinned in its own section, fires independently
      // Travel distance + duration grow card 1→4 to sell distance illusion
      // Hold window = the section scroll depth (250vh) minus the animation duration
      const stepSections = stepSectionRefs.current.filter(Boolean);
      const stepCards    = stepRefs.current.filter(Boolean);

      stepCards.forEach((card, i) => {
        const section = stepSections[i];
        if (!card || !section) return;

        // Card starts off-screen left — further left for later cards
        const startX  = `${-130 - i * 20}vw`;
        const animDur = 0.8 + i * 0.2;           // 0.8s, 1.0s, 1.2s, 1.4s
        const holdVh  = 180 + i * 20;             // 180, 200, 220, 240vh hold after entry

        gsap.set(card, { x: startX, opacity: 0, scale: 0.78 + i * 0.055 });

        // Pin the section — scroll depth gives the read hold
        const pinST = ScrollTrigger.create({
          trigger: section,
          start: ''top top'',
          end: `+=${holdVh}vh`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onEnter: () => {
            gsap.to(card, {
              x: ''0vw'',
              opacity: 1,
              scale: 1,
              duration: animDur,
              ease: ''power3.out'',
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              x: startX,
              opacity: 0,
              scale: 0.78 + i * 0.055,
              duration: 0.35,
              ease: ''power2.in'',
            });
          },
        });

        outerSTs.push(pinST);
      });'

$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1 FAILED"; exit 1 }
Write-Host "PATCH 1 OK — step GSAP rewritten"
$original = $content

# ── PATCH 2 — Add stepSectionRefs declaration next to stepRefs ──
$old2 = '  const stepSectionRef = useRef(null);
  const stepRefs       = useRef([]);'

$new2 = '  const stepSectionRef  = useRef(null);
  const stepSectionRefs = useRef([]);
  const stepRefs        = useRef([]);'

$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — stepSectionRefs ref added"
$original = $content

# ── PATCH 3 — Restructure JSX: replace grid with stacked pinnable sections ──
$old3 = '      <section ref={stepSectionRef} className="relative z-10 bg-slate-900 overflow-hidden" style={{ minHeight: ''100vh'' }}>
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

$new3 = '      {/* Step header — static, sits above the pinned card sections */}
      <section ref={stepSectionRef} className="relative z-10 bg-slate-900 py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">From First Call to <span className="text-cyan-400">Launch</span></h2>
          <p className="text-lg text-slate-300">No retainers to start. No commitments before the proposal. You know exactly what you are buying before you spend a dollar.</p>
        </div>
      </section>

      {/* Step cards — each in its own pinned section, fires on independent scroll depth */}
      {processSteps.map((s, i) => (
        <section
          key={s.step}
          ref={el => { stepSectionRefs.current[i] = el; }}
          className="relative z-10 bg-slate-900 overflow-hidden flex items-center justify-center"
          style={{ minHeight: ''100vh'' }}
        >
          <div
            ref={el => { stepRefs.current[i] = el; }}
            className="w-full max-w-xl mx-auto px-6 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <s.icon className="w-7 h-7" />
              </div>
              <span className="text-5xl font-bold text-slate-700">{s.step}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
            <p className="text-slate-300 text-base leading-relaxed">{s.text}</p>
          </div>
        </section>
      ))}'

$content = $content -replace [regex]::Escape($old3), $new3
if ($content -eq $original) { Write-Host "PATCH 3 FAILED"; exit 1 }
Write-Host "PATCH 3 OK — JSX restructured to per-section cards"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "ALL DONE"
