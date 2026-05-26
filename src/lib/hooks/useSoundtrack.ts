"use client";

import { useEffect } from "react";
import { audioManager, type MusicCue } from "@/lib/audio/AudioManager";

export function useSoundtrack(cue: MusicCue, fadeSeconds = 1.6): void {
  useEffect(() => {
    audioManager.playMusic(cue, fadeSeconds);
  }, [cue, fadeSeconds]);
}

export function useAdaptiveStormAudio(stormMeter: number, active = true): void {
  useEffect(() => {
    if (!active) return;
    audioManager.setGameplayStorm(stormMeter / 100);
  }, [active, stormMeter]);
}
