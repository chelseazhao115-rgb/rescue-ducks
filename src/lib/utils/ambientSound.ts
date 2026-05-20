let audioCtx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

// Create noise buffer for wind/rain
function noiseBuffer(duration = 2): AudioBuffer {
  const c = ctx();
  const sr = c.sampleRate;
  const len = sr * duration;
  const buf = c.createBuffer(1, len, sr);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buf;
}

interface ActiveSound {
  stop: () => void;
}

// ---- Gentle night ambience: water + soft breeze ----
export function playNightAmbience(): ActiveSound {
  const c = ctx();
  const master = c.createGain();
  master.gain.setValueAtTime(0, c.currentTime);
  master.gain.linearRampToValueAtTime(0.06, c.currentTime + 1);
  master.connect(c.destination);

  // Water: low filtered noise
  const noise = c.createBufferSource();
  noise.buffer = noiseBuffer(4);
  noise.loop = true;
  const waterFilter = c.createBiquadFilter();
  waterFilter.type = "lowpass";
  waterFilter.frequency.value = 300;
  const waterGain = c.createGain();
  waterGain.gain.value = 0.3;
  noise.connect(waterFilter);
  waterFilter.connect(waterGain);
  waterGain.connect(master);
  noise.start();

  // Soft breeze: mid noise with LFO
  const breeze = c.createBufferSource();
  breeze.buffer = noiseBuffer(3);
  breeze.loop = true;
  const breezeFilter = c.createBiquadFilter();
  breezeFilter.type = "bandpass";
  breezeFilter.frequency.value = 800;
  breezeFilter.Q.value = 0.5;
  const breezeLFO = c.createOscillator();
  breezeLFO.frequency.value = 0.3;
  const breezeLFOGain = c.createGain();
  breezeLFOGain.gain.value = 400;
  breezeLFO.connect(breezeLFOGain);
  breezeLFOGain.connect(breezeFilter.frequency);
  breezeLFO.start();
  const breezeGain = c.createGain();
  breezeGain.gain.value = 0.15;
  breeze.connect(breezeFilter);
  breezeFilter.connect(breezeGain);
  breezeGain.connect(master);
  breeze.start();

  return {
    stop: () => {
      master.gain.linearRampToValueAtTime(0, c.currentTime + 0.3);
      setTimeout(() => {
        [noise, breeze, breezeLFO].forEach((n) => { try { n.stop(); } catch {} });
        master.disconnect();
      }, 400);
    },
  };
}

// ---- Storm: wind, rain, distant thunder ----
export function playStormAmbience(): ActiveSound {
  const c = ctx();
  const master = c.createGain();
  master.gain.setValueAtTime(0.04, c.currentTime);
  master.gain.linearRampToValueAtTime(0.12, c.currentTime + 0.5);
  master.connect(c.destination);

  // Strong wind: bandpass noise with LFO
  const wind = c.createBufferSource();
  wind.buffer = noiseBuffer(3);
  wind.loop = true;
  const windFilter = c.createBiquadFilter();
  windFilter.type = "lowpass";
  windFilter.frequency.value = 600;
  const windLFO = c.createOscillator();
  windLFO.frequency.value = 0.5;
  const windLFOGain = c.createGain();
  windLFOGain.gain.value = 400;
  windLFO.connect(windLFOGain);
  windLFOGain.connect(windFilter.frequency);
  windLFO.start();
  const windGain = c.createGain();
  windGain.gain.value = 0.6;
  wind.connect(windFilter);
  windFilter.connect(windGain);
  windGain.connect(master);
  wind.start();

  // Rain: high-frequency noise
  const rain = c.createBufferSource();
  rain.buffer = noiseBuffer(1);
  rain.loop = true;
  const rainFilter = c.createBiquadFilter();
  rainFilter.type = "highpass";
  rainFilter.frequency.value = 2000;
  const rainGain = c.createGain();
  rainGain.gain.value = 0.35;
  rain.connect(rainFilter);
  rainFilter.connect(rainGain);
  rainGain.connect(master);
  rain.start();

  // Distant thunder rumble (periodic)
  let thunderTimer: ReturnType<typeof setInterval> | null = null;
  const playThunder = () => {
    const rumble = c.createOscillator();
    rumble.type = "sawtooth";
    rumble.frequency.setValueAtTime(80, c.currentTime);
    rumble.frequency.exponentialRampToValueAtTime(20, c.currentTime + 1.5);
    const tGain = c.createGain();
    tGain.gain.setValueAtTime(0, c.currentTime);
    tGain.gain.linearRampToValueAtTime(0.12, c.currentTime + 0.3);
    tGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2);
    const tFilter = c.createBiquadFilter();
    tFilter.type = "lowpass";
    tFilter.frequency.value = 200;
    rumble.connect(tFilter);
    tFilter.connect(tGain);
    tGain.connect(master);
    rumble.start();
    rumble.stop(c.currentTime + 2);
  };
  thunderTimer = setInterval(playThunder, 4000 + Math.random() * 3000);
  playThunder();

  return {
    stop: () => {
      if (thunderTimer) clearInterval(thunderTimer);
      master.gain.linearRampToValueAtTime(0, c.currentTime + 0.5);
      setTimeout(() => {
        [wind, rain, windLFO].forEach((n) => { try { n.stop(); } catch {} });
        master.disconnect();
      }, 600);
    },
  };
}

// ---- Magical hum: warm sine layers ----
export function playMagicalHum(): ActiveSound {
  const c = ctx();
  const master = c.createGain();
  master.gain.setValueAtTime(0, c.currentTime);
  master.gain.linearRampToValueAtTime(0.05, c.currentTime + 0.8);
  master.connect(c.destination);

  const harmonics = [261, 392, 523, 784]; // C major chord
  const oscs = harmonics.map((freq, i) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = c.createGain();
    g.gain.value = 0.12 / (i + 1);
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.2 + i * 0.1;
    const lfoG = c.createGain();
    lfoG.gain.value = 0.03;
    lfo.connect(lfoG);
    lfoG.connect(g.gain);
    lfo.start();
    osc.connect(g);
    g.connect(master);
    osc.start();
    return { osc, lfo };
  });

  return {
    stop: () => {
      master.gain.linearRampToValueAtTime(0, c.currentTime + 0.5);
      setTimeout(() => {
        oscs.forEach(({ osc, lfo }) => { try { osc.stop(); lfo.stop(); } catch {} });
        master.disconnect();
      }, 600);
    },
  };
}

// ---- Ambience manager ----
let currentAmbience: ActiveSound | null = null;

export function switchAmbience(scene: string): void {
  currentAmbience?.stop();
  currentAmbience = null;

  switch (scene) {
    case "night":
      currentAmbience = playNightAmbience();
      break;
    case "storm":
      currentAmbience = playStormAmbience();
      break;
    case "chelsea":
      // Storm continues but slightly quieter
      currentAmbience = playStormAmbience();
      break;
    case "orb":
      // Storm fades, magical hum starts
      currentAmbience = playMagicalHum();
      break;
    default:
      break;
  }
}

export function stopAllAmbience(): void {
  currentAmbience?.stop();
  currentAmbience = null;
}
