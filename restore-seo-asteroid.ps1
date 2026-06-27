
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8

$old = '  // asteroid (large) — z dropped to 16, now behind rocket; slow sweeping presence'

$new = @'
  // seo — enters center-left (nudged up from 65), grows 0.5→1 as it rises up-right
  { src: 'seo',           size: 210, top: 48, left: 38, z: 28,
    fromX: '-60vw',  fromY:  '55vh',
    exitX:  '58vw',  exitY: '-20vh', scrub: 0.8, scaleFrom: 0.5, scaleTo: 1 },

  // asteroid (large) — z dropped to 16, now behind rocket; slow sweeping presence
'@

$result = $content -replace [regex]::Escape($old), $new.TrimEnd()

if ($result -ne $content) {
  [System.IO.File]::WriteAllText($file, $result, [System.Text.UTF8Encoding]::new($false))
  Write-Host "DONE — seo asteroid restored"
} else {
  Write-Host "FAILED — no match"
}
