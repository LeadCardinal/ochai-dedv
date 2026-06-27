
$file = 'C:\Users\thebo\source\ochai-dev\src\pages\Services.jsx'
$content = Get-Content $file -Raw -Encoding UTF8

$old = @'
function playApplause() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 2.5;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(Math.sin(i / bufferSize * Math.PI), 0.4) * 0.3;
      }
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.8);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start();
  } catch (e) {}
}
'@

$new = @'
const applauseAudio = typeof window !== 'undefined' ? new Audio('/audio/applause.mp3') : null;

function playApplause() {
  if (!applauseAudio) return;
  applauseAudio.currentTime = 0;
  applauseAudio.volume = 0.7;
  applauseAudio.play().catch(() => {});
}
'@

$result = $content -replace [regex]::Escape($old), $new

if ($result -ne $content) {
  [System.IO.File]::WriteAllText($file, $result, [System.Text.UTF8Encoding]::new($false))
  Write-Host "DONE — real applause swapped in"
} else {
  Write-Host "FAILED — no match"
}
