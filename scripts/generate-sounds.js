/**
 * Generates simple WAV sound effects for WordQuest Universe.
 * Run once: node scripts/generate-sounds.js
 */
const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 22050;
const OUT_DIR = path.join(__dirname, '../assets/sounds');

function sine(freq, duration, volume = 0.65) {
  const n = Math.floor(SAMPLE_RATE * duration);
  const buf = Buffer.alloc(n * 2);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const attack = Math.min(1, t * 80);
    const release = Math.min(1, (duration - t) * 12);
    const s = Math.sin(2 * Math.PI * freq * t) * attack * release * volume;
    buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(s * 32767))), i * 2);
  }
  return buf;
}

function concat(...bufs) {
  return Buffer.concat(bufs);
}

function wav(pcm) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVE', 8);
  h.write('fmt ', 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);           // PCM
  h.writeUInt16LE(1, 22);           // mono
  h.writeUInt32LE(SAMPLE_RATE, 24);
  h.writeUInt32LE(SAMPLE_RATE * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

function sweep(freqStart, freqEnd, duration, volume = 0.6) {
  const n = Math.floor(SAMPLE_RATE * duration);
  const buf = Buffer.alloc(n * 2);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = freqStart + (freqEnd - freqStart) * (t / duration);
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const attack = Math.min(1, t * 30);
    const release = Math.min(1, (duration - t) * 8);
    const s = Math.sin(phase) * attack * release * volume;
    buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(s * 32767))), i * 2);
  }
  return buf;
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// tap.wav — quick high click on letter tap
fs.writeFileSync(path.join(OUT_DIR, 'tap.wav'), wav(sine(900, 0.07, 0.5)));

// correct.wav — ascending C-E-G chime (word spelled correctly)
fs.writeFileSync(path.join(OUT_DIR, 'correct.wav'), wav(
  concat(sine(523, 0.14), sine(659, 0.14), sine(784, 0.22))
));

// wrong.wav — downward boing (wrong answer, keep it funny not scary)
fs.writeFileSync(path.join(OUT_DIR, 'wrong.wav'), wav(sweep(380, 160, 0.38, 0.7)));

// complete.wav — triumphant fanfare (level complete)
fs.writeFileSync(path.join(OUT_DIR, 'complete.wav'), wav(
  concat(
    sine(523, 0.1),
    sine(659, 0.1),
    sine(784, 0.1),
    sine(1047, 0.45, 0.8),
  )
));

console.log('✅ Sounds generated in assets/sounds/');
