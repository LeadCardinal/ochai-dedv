
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8
$original = $content

$old = 'style={{ height: ${tier.scrollVh}vh }}'
$new = 'style={{ height: `${tier.scrollVh}vh` }}'

$content = $content -replace [regex]::Escape($old), $new

if ($content -ne $original) {
  [System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
  Write-Host "FIXED"
} else {
  Write-Host "FAILED — no match"
}
