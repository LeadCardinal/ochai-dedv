
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── Replace the tier + step blocks + cleanup with properly isolated version ──
$old1 = '    // ── Tier iris wipe — outside gsap.context, targets DOM outside heroRef ──
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

      tl.fromTo(card,
        { clipPath: ''circle(0% at 50% 50%)'' },
        { clipPath: ''circle(142% at 50% 50%)'', ease: ''power2.inOut'' },
        0.35
      );
    });

    // ── Process steps — outside gsap.context, targets DOM outside heroRef ──
    if (stepSectionRef.current && stepRefs.current.filter(Boolean).length === 4) {
      const steps = stepRefs.current;

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
    }

    return () => ctx.revert();
  }, []);'

$new1 = '    // ── Tier iris wipe + step cascade — own context, own cleanup ──
    // Deferred one frame so JSX ref callbacks have fully populated
    const outerCtx = gsap.context(() => {

      requestAnimationFrame(() => {

        // Tier iris wipes
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

$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH FAILED"; exit 1 }
Write-Host "PATCH OK"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
