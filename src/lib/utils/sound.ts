let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function unlockAudio(): void {
  const ctx = getCtx();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15
): void {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently fail if audio isn't available
  }
}

export function playCorrectSound(): void {
  playTone(523, 0.1, "sine", 0.12);
  setTimeout(() => playTone(659, 0.1, "sine", 0.12), 60);
  setTimeout(() => playTone(784, 0.15, "sine", 0.12), 120);
}

export function playWrongSound(): void {
  playTone(200, 0.2, "square", 0.08);
  setTimeout(() => playTone(160, 0.25, "square", 0.06), 100);
}

export function playChainSound(combo: number): void {
  const baseFreq = 440 + combo * 60;
  playTone(baseFreq, 0.08, "sine", 0.1);
}

export function playGroupCompleteSound(): void {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, "triangle", 0.12), i * 80);
  });
}

export function playVictorySound(): void {
  const melody = [523, 659, 784, 659, 784, 1047];
  melody.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, "sine", 0.12), i * 150);
  });
}

export function playButtonClick(): void {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Silently fail
  }
}
