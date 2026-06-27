
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── PATCH 1 — Remove tier iris wipe from inside gsap.context ──
$old1 = '      // ── Tier iris wipe sequence ──
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

        // 0–35%  : splash holds static (drama/pause — longer hold before wipe)
        // 35–85% : card iris expands from center outward — wipe completes at 85%
        // 85–100%: card sits fully revealed, section scrolls away cleanly
        tl.fromTo(card,
          { clipPath: ''circle(0% at 50% 50%)'' },
          { clipPath: ''circle(142% at 50% 50%)'', ease: ''power2.inOut'' },
          0.35
        );
      });

      gsap.utils.toArray(''.proof-point'').forEach((el) => {'

$new1 = '      gsap.utils.toArray(''.proof-point'').forEach((el) => {'

$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1 FAILED"; exit 1 }
Write-Host "PATCH 1 OK — tier wipe removed from context"
$original = $content

# ── PATCH 2 — Remove step cascade from inside gsap.context ──
$old2 = '      // ── Process steps — one card per scroll trigger, independent pins ──
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
      }

      requestAnimationFrame(() => { ScrollTrigger.refresh(); });'

$new2 = '      requestAnimationFrame(() => { ScrollTrigger.refresh(); });'

$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — step cascade removed from context"
$original = $content

# ── PATCH 3 — Re-add both blocks AFTER gsap.context closes ──
$old3 = '    }, heroRef);
    return () => ctx.revert();
  }, []);'

$new3 = '    }, heroRef);

    // ── Tier iris wipe — outside gsap.context, targets DOM outside heroRef ──
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

$content = $content -replace [regex]::Escape($old3), $new3
if ($content -eq $original) { Write-Host "PATCH 3 FAILED"; exit 1 }
Write-Host "PATCH 3 OK — both blocks re-added outside context"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
