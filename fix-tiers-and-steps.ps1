
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── PATCH 1 — Fix tier stacking: add isolation to outer tiers wrapper ──
$old1 = '      <section id="tiers" className="relative z-10 bg-black py-8">'
$new1 = '      <section id="tiers" className="relative z-10 bg-black py-8" style={{ isolation: ''isolate'', overflow: ''hidden'' }}>'
$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1 FAILED"; exit 1 }
Write-Host "PATCH 1 OK — tiers wrapper isolated"
$original = $content

# ── PATCH 2 — Replace scrubbed cascade with per-card individual ScrollTriggers ──
$old2 = '      // ── Process steps — cascade from left, one by one, scrubbed ──
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
      }'

$new2 = '      // ── Process steps — one card per scroll trigger, independent pins ──
      // Each card has its own ScrollTrigger + pin. Scroll fires card in → stop →
      // visitor reads → scroll again → next card fires. No scrub, no shared timeline.
      if (stepSectionRef.current && stepRefs.current.filter(Boolean).length === 4) {
        const steps = stepRefs.current;

        // All cards start off-screen left, invisible, scaled down progressively
        steps.forEach((el, i) => {
          gsap.set(el, { x: ''-130vw'', opacity: 0, scale: 0.80 + i * 0.05 });
        });

        steps.forEach((el, i) => {
          // Each card pins the SECTION for ~120vh — long enough to feel like a hold
          // duration grows with index so later cards feel like they traveled further
          const pinDuration = 100 + i * 30; // 100, 130, 160, 190vh
          const animDur     = 0.7 + i * 0.12; // 0.7s, 0.82s, 0.94s, 1.06s

          ScrollTrigger.create({
            trigger: el,
            start: ''top 80%'',
            end: `top+=${pinDuration}vh top`,
            pin: false,   // card itself does not pin — section flow handles spacing
            toggleActions: ''play none none reverse'',
            onEnter: () => {
              gsap.to(el, {
                x: ''0vw'',
                opacity: 1,
                scale: 1,
                duration: animDur,
                ease: ''power3.out'',
              });
            },
            onLeaveBack: () => {
              gsap.to(el, {
                x: ''-130vw'',
                opacity: 0,
                scale: 0.80 + i * 0.05,
                duration: 0.4,
                ease: ''power2.in'',
              });
            },
          });
        });
      }'

$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — per-card scroll triggers"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
