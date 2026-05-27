"use client";

export type MusicCue = "home" | "intro" | "gameplay" | "victory" | "failure";
export type IntroAudioScene = "calm" | "storm" | "chelsea" | "magic" | "journey";
export type SfxCue =
  | "button"
  | "correct"
  | "wrong"
  | "combo"
  | "groupComplete"
  | "lighthouse"
  | "stormPulse"
  | "victory"
  | "failure";

interface ProceduralLoop {
  output: GainNode;
  stop: (fadeSeconds?: number) => void;
}

interface TrackNode {
  cue: MusicCue;
  gain: GainNode;
  loop: ProceduralLoop;
}

const MUSIC_TARGETS: Record<MusicCue, number> = {
  home: 1.6,
  intro: 0.7,
  gameplay: 0.6,
  victory: 0.6,
  failure: 0.6,
};

function safeRamp(gain: AudioParam, ctx: AudioContext, value: number, seconds: number): void {
  const now = ctx.currentTime;
  gain.cancelScheduledValues(now);
  gain.setValueAtTime(Math.max(0.0001, gain.value), now);
  gain.linearRampToValueAtTime(Math.max(0.0001, value), now + seconds);
}

function noiseBuffer(ctx: AudioContext, duration = 2): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export class AudioManager {
  private static instance: AudioManager | null = null;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private ambienceBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private currentTrack: TrackNode | null = null;
  private stormLayer: ProceduralLoop | null = null;
  private lakeLayer: ProceduralLoop | null = null;
  private magicLayer: ProceduralLoop | null = null;
  private unlocked = false;
  private stormIntensity = 0;
  private lastStormPulseAt = 0;

  static get(): AudioManager {
    if (!AudioManager.instance) AudioManager.instance = new AudioManager();
    return AudioManager.instance;
  }

  unlock(): void {
    const ctx = this.getContext();
    if (ctx.state === "suspended") void ctx.resume();
    this.unlocked = true;
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  playMusic(cue: MusicCue, fadeSeconds = 1.6): void {
    this.crossFade(cue, fadeSeconds);
  }

  fadeIn(cue: MusicCue, fadeSeconds = 1.6): void {
    this.crossFade(cue, fadeSeconds);
  }

  fadeOut(fadeSeconds = 1): void {
    const ctx = this.getContext();
    if (this.currentTrack) {
      this.currentTrack.loop.stop(fadeSeconds);
      safeRamp(this.currentTrack.gain.gain, ctx, 0, fadeSeconds);
      this.currentTrack = null;
    }
    this.setStormIntensity(0, fadeSeconds);
  }

  crossFade(cue: MusicCue, fadeSeconds = 1.6): void {
    const ctx = this.getContext();
    const bus = this.ensureMusicBus();

    if (this.currentTrack?.cue === cue) {
      safeRamp(this.currentTrack.gain.gain, ctx, MUSIC_TARGETS[cue], fadeSeconds);
      return;
    }

    const previous = this.currentTrack;
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(bus);

    const loop = this.createMusicLoop(cue);
    loop.output.connect(gain);
    this.currentTrack = { cue, gain, loop };

    safeRamp(gain.gain, ctx, MUSIC_TARGETS[cue], fadeSeconds);

    if (previous) {
      safeRamp(previous.gain.gain, ctx, 0, fadeSeconds);
      previous.loop.stop(fadeSeconds);
      window.setTimeout(() => previous.gain.disconnect(), fadeSeconds * 1000 + 120);
    }

    if (cue === "home" || cue === "intro" || cue === "gameplay") {
      this.ensureLakeLayer();
    }
  }

  setIntroScene(scene: IntroAudioScene): void {
    if (scene === "calm") {
      this.crossFade("intro", 1.4);
      this.setStormIntensity(0, 1.2);
      this.setMagicLayer(0.05, 1.2);
    } else if (scene === "storm") {
      this.crossFade("intro", 1.2);
      this.setStormIntensity(0.42, 1.4);
      this.playSfx("stormPulse", 0.35);
    } else if (scene === "chelsea") {
      this.setStormIntensity(0.26, 1);
      this.setMagicLayer(0.1, 1);
    } else if (scene === "magic") {
      this.setStormIntensity(0.08, 1.4);
      this.setMagicLayer(0.62, 1.2);
      this.playSfx("lighthouse", 0.55);
    } else {
      this.crossFade("gameplay", 2);
      this.setStormIntensity(0, 1.6);
      this.setMagicLayer(0.28, 1.2);
    }
  }

  setGameplayStorm(value: number): void {
    const intensity = Math.min(1, Math.max(0, value));
    this.setStormIntensity(intensity * 0.55, 0.8);

    if (intensity > 0.66 && performance.now() - this.lastStormPulseAt > 7500) {
      this.lastStormPulseAt = performance.now();
      this.playSfx("stormPulse", 0.28 + intensity * 0.24);
    }
  }

  playSfx(cue: SfxCue, amount = 1): void {
    const ctx = this.getContext();
    const bus = this.ensureSfxBus();
    const scale = Math.max(0, Math.min(1.2, amount));

    if (cue === "button") this.chime([880, 660], [0, 0.035], 0.08, 0.06 * scale, "sine", bus);
    if (cue === "correct") this.chime([523, 659, 880], [0, 0.055, 0.12], 0.16, 0.11 * scale, "sine", bus);
    if (cue === "wrong") this.softPulse(164, 0.26, 0.09 * scale, bus);
    if (cue === "combo") this.chime([660, 784, 988], [0, 0.045, 0.09], 0.14, 0.1 * scale, "triangle", bus);
    if (cue === "groupComplete") {
      this.chime([523, 659, 784, 1047], [0, 0.08, 0.16, 0.28], 0.34, 0.12 * scale, "triangle", bus);
      this.energySwell(0.45 * scale, bus);
    }
    if (cue === "lighthouse") this.energySwell(0.42 * scale, bus);
    if (cue === "stormPulse") this.thunderPulse(0.22 * scale, bus);
    if (cue === "victory") this.chime([523, 659, 784, 988, 1175], [0, 0.12, 0.24, 0.38, 0.56], 0.5, 0.13 * scale, "sine", bus);
    if (cue === "failure") {
      this.softPulse(220, 0.6, 0.06 * scale, bus);
      window.setTimeout(() => this.softPulse(174, 0.7, 0.045 * scale, bus), 180);
    }

    if (ctx.state === "suspended" && this.unlocked) void ctx.resume();
  }

  stopAll(fadeSeconds = 0.8): void {
    this.fadeOut(fadeSeconds);
    this.lakeLayer?.stop(fadeSeconds);
    this.stormLayer?.stop(fadeSeconds);
    this.magicLayer?.stop(fadeSeconds);
    this.lakeLayer = null;
    this.stormLayer = null;
    this.magicLayer = null;
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.82;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  private ensureMusicBus(): GainNode {
    const ctx = this.getContext();
    if (!this.musicBus) {
      this.musicBus = ctx.createGain();
      this.musicBus.gain.value = 0.72;
      this.musicBus.connect(this.master!);
    }
    return this.musicBus;
  }

  private ensureAmbienceBus(): GainNode {
    const ctx = this.getContext();
    if (!this.ambienceBus) {
      this.ambienceBus = ctx.createGain();
      this.ambienceBus.gain.value = 0.7;
      this.ambienceBus.connect(this.master!);
    }
    return this.ambienceBus;
  }

  private ensureSfxBus(): GainNode {
    const ctx = this.getContext();
    if (!this.sfxBus) {
      this.sfxBus = ctx.createGain();
      this.sfxBus.gain.value = 0.72;
      this.sfxBus.connect(this.master!);
    }
    return this.sfxBus;
  }

  private createMusicLoop(cue: MusicCue): ProceduralLoop {
    const ctx = this.getContext();
    const out = ctx.createGain();
    out.gain.value = 1;

    if (cue === "home") return this.createPadLoop([130.81, 196, 261.63, 329.63], 0.055, 0.08, out);
    if (cue === "intro") return this.createPadLoop([146.83, 220, 293.66, 349.23], 0.05, 0.06, out);
    if (cue === "gameplay") return this.createPadLoop([174.61, 261.63, 329.63, 392], 0.044, 0.16, out, true);
    if (cue === "victory") return this.createPadLoop([196, 246.94, 293.66, 392, 493.88], 0.06, 0.04, out);
    return this.createPadLoop([146.83, 174.61, 220, 293.66], 0.048, 0.04, out);
  }

  private createPadLoop(
    freqs: number[],
    gainValue: number,
    pulseRate: number,
    out: GainNode,
    rhythmic = false,
  ): ProceduralLoop {
    const ctx = this.getContext();
    const nodes: Array<OscillatorNode | GainNode | StereoPannerNode | BiquadFilterNode> = [];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = rhythmic ? 900 : 650;
      const gain = ctx.createGain();
      gain.gain.value = gainValue / (i + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = pulseRate + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = gainValue * 0.35;
      const pan = ctx.createStereoPanner();
      pan.pan.value = -0.35 + i * (0.7 / Math.max(1, freqs.length - 1));

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(pan);
      pan.connect(out);
      osc.start();
      lfo.start();
      nodes.push(osc, filter, gain, lfo, lfoGain, pan);
    });

    if (rhythmic) {
      const pulse = ctx.createOscillator();
      pulse.type = "sine";
      pulse.frequency.value = 2;
      const pulseGain = ctx.createGain();
      pulseGain.gain.value = 0.012;
      pulse.connect(pulseGain);
      pulseGain.connect(out.gain);
      pulse.start();
      nodes.push(pulse, pulseGain);
    }

    return {
      output: out,
      stop: (fadeSeconds = 0.5) => {
        safeRamp(out.gain, ctx, 0, fadeSeconds);
        window.setTimeout(() => {
          nodes.forEach((node) => {
            if ("stop" in node) {
              try { node.stop(); } catch {}
            }
            try { node.disconnect(); } catch {}
          });
          try { out.disconnect(); } catch {}
        }, fadeSeconds * 1000 + 120);
      },
    };
  }

  private ensureLakeLayer(): void {
    if (this.lakeLayer) return;
    const ctx = this.getContext();
    const out = ctx.createGain();
    out.gain.value = 0.12;
    out.connect(this.ensureAmbienceBus());

    const water = ctx.createBufferSource();
    water.buffer = noiseBuffer(ctx, 4);
    water.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 240;
    const gain = ctx.createGain();
    gain.gain.value = 0.32;
    water.connect(filter);
    filter.connect(gain);
    gain.connect(out);
    water.start();

    this.lakeLayer = {
      output: out,
      stop: (fadeSeconds = 0.6) => {
        safeRamp(out.gain, ctx, 0, fadeSeconds);
        window.setTimeout(() => {
          try { water.stop(); } catch {}
          [water, filter, gain, out].forEach((n) => { try { n.disconnect(); } catch {} });
        }, fadeSeconds * 1000 + 120);
      },
    };
  }

  private setStormIntensity(value: number, fadeSeconds = 0.8): void {
    const ctx = this.getContext();
    this.stormIntensity = Math.min(1, Math.max(0, value));

    if (!this.stormLayer) {
      this.stormLayer = this.createStormLayer();
      this.stormLayer.output.connect(this.ensureAmbienceBus());
    }

    safeRamp(this.stormLayer.output.gain, ctx, this.stormIntensity * 0.68, fadeSeconds);
  }

  private createStormLayer(): ProceduralLoop {
    const ctx = this.getContext();
    const out = ctx.createGain();
    out.gain.value = 0.0001;

    const wind = ctx.createBufferSource();
    wind.buffer = noiseBuffer(ctx, 4);
    wind.loop = true;

    const windHighpass = ctx.createBiquadFilter();
    windHighpass.type = "highpass";
    windHighpass.frequency.value = 38;

    const windLowpass = ctx.createBiquadFilter();
    windLowpass.type = "lowpass";
    windLowpass.frequency.value = 560;
    windLowpass.Q.value = 0.45;

    const windGain = ctx.createGain();
    windGain.gain.value = 0.42;

    const distantAir = ctx.createBufferSource();
    distantAir.buffer = noiseBuffer(ctx, 5);
    distantAir.loop = true;

    const airFilter = ctx.createBiquadFilter();
    airFilter.type = "bandpass";
    airFilter.frequency.value = 180;
    airFilter.Q.value = 0.7;

    const airGain = ctx.createGain();
    airGain.gain.value = 0.16;

    const windEdge = ctx.createBufferSource();
    windEdge.buffer = noiseBuffer(ctx, 2);
    windEdge.loop = true;

    const edgeFilter = ctx.createBiquadFilter();
    edgeFilter.type = "bandpass";
    edgeFilter.frequency.value = 780;
    edgeFilter.Q.value = 0.65;

    const edgeGain = ctx.createGain();
    edgeGain.gain.value = 0.045;

    wind.connect(windHighpass);
    windHighpass.connect(windLowpass);
    windLowpass.connect(windGain);
    windGain.connect(out);

    distantAir.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(out);

    windEdge.connect(edgeFilter);
    edgeFilter.connect(edgeGain);
    edgeGain.connect(out);

    wind.start();
    distantAir.start();
    windEdge.start();

    return {
      output: out,
      stop: (fadeSeconds = 0.6) => {
        safeRamp(out.gain, ctx, 0, fadeSeconds);
        window.setTimeout(() => {
          [wind, distantAir, windEdge].forEach((n) => { try { n.stop(); } catch {} });
          [wind, windHighpass, windLowpass, windGain, distantAir, airFilter, airGain, windEdge, edgeFilter, edgeGain, out].forEach((n) => { try { n.disconnect(); } catch {} });
        }, fadeSeconds * 1000 + 120);
      },
    };
  }

  private setMagicLayer(value: number, fadeSeconds = 0.8): void {
    const ctx = this.getContext();
    if (!this.magicLayer) {
      this.magicLayer = this.createMagicLayer();
      this.magicLayer.output.connect(this.ensureAmbienceBus());
    }
    safeRamp(this.magicLayer.output.gain, ctx, Math.max(0.0001, value * 0.22), fadeSeconds);
  }

  private createMagicLayer(): ProceduralLoop {
    const ctx = this.getContext();
    const out = ctx.createGain();
    out.gain.value = 0.0001;
    const nodes: Array<OscillatorNode | GainNode | StereoPannerNode> = [];

    [1046.5, 1318.5, 1568].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.value = 0.025 / (i + 1);
      const pan = ctx.createStereoPanner();
      pan.pan.value = i === 1 ? 0 : i === 0 ? -0.35 : 0.35;
      osc.connect(gain);
      gain.connect(pan);
      pan.connect(out);
      osc.start();
      nodes.push(osc, gain, pan);
    });

    return {
      output: out,
      stop: (fadeSeconds = 0.4) => {
        safeRamp(out.gain, ctx, 0, fadeSeconds);
        window.setTimeout(() => {
          nodes.forEach((n) => {
            if ("stop" in n) {
              try { n.stop(); } catch {}
            }
            try { n.disconnect(); } catch {}
          });
          try { out.disconnect(); } catch {}
        }, fadeSeconds * 1000 + 120);
      },
    };
  }

  private chime(
    freqs: number[],
    delays: number[],
    duration: number,
    volume: number,
    type: OscillatorType,
    destination: AudioNode,
  ): void {
    const ctx = this.getContext();
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      const start = ctx.currentTime + (delays[i] ?? 0);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(volume / Math.sqrt(i + 1), start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(destination);
      osc.start(start);
      osc.stop(start + duration + 0.04);
    });
  }

  private softPulse(freq: number, duration: number, volume: number, destination: AudioNode): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.76, ctx.currentTime + duration);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.04);
  }

  private energySwell(volume: number, destination: AudioNode): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(392, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.55);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * 0.12, ctx.currentTime + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.75);
    osc.connect(gain);
    gain.connect(destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }

  private thunderPulse(volume: number, destination: AudioNode): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(68, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(36, ctx.currentTime + 1.45);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 165;
    filter.Q.value = 0.45;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 0.22);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.65);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.75);
  }
}

export const audioManager = AudioManager.get();
