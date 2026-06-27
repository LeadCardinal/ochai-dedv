
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── PATCH 1 — Bump tier section height 350vh → 450vh ──
$old1 = "            style={{ height: '350vh' }}"
$new1 = "            style={{ height: '450vh' }}"
$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1 FAILED"; exit 1 }
Write-Host "PATCH 1 OK — tier height 350→450vh"
$original = $content

# ── PATCH 2 — Reduce iris overshoot, tighten wipe end, push enter point later ──
$old2 = "        // 0–30%  : splash holds static (drama/pause)
        // 30–100%: card iris expands from center outward over splash
        tl.fromTo(card,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(150% at 50% 50%)', ease: 'power2.inOut' },
          0.30
        );"

$new2 = "        // 0–35%  : splash holds static (drama/pause — longer hold before wipe)
        // 35–85% : card iris expands from center outward — wipe completes at 85%
        // 85–100%: card sits fully revealed, section scrolls away cleanly
        tl.fromTo(card,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(142% at 50% 50%)', ease: 'power2.inOut' },
          0.35
        );"

$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — iris timing tightened"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
