
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

# ── PATCH 1 — Add scrollVh to each tier data object ──

$old1 = "    id: 'quartet',"
$new1 = "    id: 'quartet', scrollVh: 520,"
$content = $content -replace [regex]::Escape($old1), $new1
if ($content -eq $original) { Write-Host "PATCH 1a FAILED"; exit 1 }
Write-Host "PATCH 1a OK — quartet scrollVh"
$original = $content

$old2 = "    id: 'ensemble', splash:"
$new2 = "    id: 'ensemble', scrollVh: 460, splash:"
$content = $content -replace [regex]::Escape($old2), $new2
if ($content -eq $original) { Write-Host "PATCH 1b FAILED"; exit 1 }
Write-Host "PATCH 1b OK — ensemble scrollVh"
$original = $content

$old3 = "    id: 'symphony', splash:"
$new3 = "    id: 'symphony', scrollVh: 540, splash:"
$content = $content -replace [regex]::Escape($old3), $new3
if ($content -eq $original) { Write-Host "PATCH 1c FAILED"; exit 1 }
Write-Host "PATCH 1c OK — symphony scrollVh"
$original = $content

# ── PATCH 2 — Use tier.scrollVh in JSX instead of hardcoded 450vh ──
$old4 = "            style={{ height: '450vh' }}"
$new4 = "            style={{ height: `${tier.scrollVh}vh` }}"
$content = $content -replace [regex]::Escape($old4), $new4
if ($content -eq $original) { Write-Host "PATCH 2 FAILED"; exit 1 }
Write-Host "PATCH 2 OK — dynamic height wired"

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "DONE"
