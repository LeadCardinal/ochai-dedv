
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── PATCH 1 — Remove inline clipPath and fix overflow on card div in JSX ──
$old1 = '              {/* Card — starts clipped to zero, iris expands outward over splash */}
              <div
                ref={el => { if (el) tierRefs.current[i].card = el; }}
                className="absolute inset-0 z-20 overflow-y-auto bg-black"
                style={{ clipPath: ''circle(0% at 50% 50%)'' }}
              >'

$new1 = '              {/* Card — clipped to zero by GSAP on mount, iris expands outward over splash */}
              <div
                ref={el => { if (el) tierRefs.current[i].card = el; }}
                className="absolute inset-0 z-20 bg-black"
                style={{ overflow: ''hidden'' }}
              >'

$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1 FAILED"; exit 1 }
Write-Host "PATCH 1 OK — inline clipPath removed, overflow fixed in JSX"
$original = $content

# ── PATCH 2 — In GSAP, explicitly set clipPath to circle(0%) before animating ──
# Already doing gsap.set(card, { overflow: 'hidden' }) — add clipPath to that same set call
$old2 = '          gsap.set(card, { overflow: ''hidden'' });

          const tl = gsap.timeline({'

$new2 = '          gsap.set(card, { clipPath: ''circle(0% at 50% 50%)'', overflow: ''hidden'' });

          const tl = gsap.timeline({'

$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — gsap.set now owns clipPath initial state"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
