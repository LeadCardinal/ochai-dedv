
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# Replace the entire outer context + cleanup with a clean setTimeout approach
$old1 = '    // ── Tier iris wipe + step cascade — own context, own cleanup ──
    // Deferred one frame so JSX ref callbacks have fully populated
    const outerCtx = gsap.context(() => {

      requestAnimationFrame(() => {

        // Tier iris wipes
        tierRefs.current.forEach(({ section, splash, card }) => {
          if (!section || !splash || !card) return;

          gsap.set(card, { clipPath: ''circle(0% at 50% 50%)'', overflow: ''hidden'' });

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

          tl.fromTo(card,
            { clipPath: ''circle(0% at 50% 50%)'' },
            { clipPath: ''circle(142% at 50% 50%)'', ease: ''power2.inOut'' },
            0.35
          );
        });

        // Process steps — one card per trigger, each animates on scroll independently
        const steps = stepRefs.current.filter(Boolean);
        if (steps.length === 4) {
          steps.forEach((el, i) => {
            gsap.set(el, { x: ''-130vw'', opacity: 0, scale: 0.80 + i * 0.05 });
          });

          steps.forEach((el, i) => {
            const animDur = 0.7 + i * 0.12;

            ScrollTrigger.create({
              trigger: el,
              start: ''top 80%'',
              toggleActions: ''play none none reverse'',
              onEnter: () => {
                gsap.to(el, { x: ''0vw'', opacity: 1, scale: 1, duration: animDur, ease: ''power3.out'' });
              },
              onLeaveBack: () => {
                gsap.to(el, { x: ''-130vw'', opacity: 0, scale: 0.80 + i * 0.05, duration: 0.4, ease: ''power2.in'' });
              },
            });
          });
        }

        ScrollTrigger.refresh();
      });

    });

    return () => { ctx.revert(); outerCtx.revert(); };
  }, []);'

$new1 = '    // ── Tier iris wipe + step cascade — plain setTimeout, no nested context ──
    const outerSTs = [];

    const timerID = setTimeout(() => {

      // Tier iris wipes
      tierRefs.current.forEach(({ section, splash, card }) => {
        if (!section || !splash || !card) return;

        gsap.set(card, { clipPath: ''circle(0% at 50% 50%)'', overflow: ''hidden'' });

        const tl = gsap.timeline({
          onComplete: () => { card.style.overflow = ''auto''; },
        });

        tl.fromTo(card,
          { clipPath: ''circle(0% at 50% 50%)'' },
          { clipPath: ''circle(142% at 50% 50%)'', ease: ''power2.inOut'' },
          0.35
        );

        const st = ScrollTrigger.create({
          trigger: section,
          start: ''top top'',
          end: ''bottom bottom'',
          scrub: 1.2,
          animation: tl,
          onLeaveBack: () => { card.style.overflow = ''hidden''; },
        });

        outerSTs.push(st);
      });

      // Process steps
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
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timerID);
      outerSTs.forEach(st => st.kill());
      ctx.revert();
    };
  }, []);'

$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH FAILED"; exit 1 }
Write-Host "PATCH OK"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
