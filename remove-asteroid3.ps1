
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8

$result = $content -replace '(?s)\r?\n  // asteroid3 — enters bottom-right, travels up-left at steep angle\r?\n  \{ src: ''asteroid3''.*?\},', ''

if ($result -ne $content) {
  [System.IO.File]::WriteAllText($file, $result, [System.Text.UTF8Encoding]::new($false))
  Write-Host "DONE — asteroid3 removed"
} else {
  Write-Host "FAILED — no match"
}
