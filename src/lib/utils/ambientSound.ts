import { audioManager } from "@/lib/audio/AudioManager";
import type { IntroAudioScene } from "@/lib/audio/AudioManager";

export function switchAmbience(scene: string): void {
  if (scene === "home") {
    audioManager.playMusic("home", 1.8);
    audioManager.setGameplayStorm(0);
    return;
  }

  if (scene === "gameplay") {
    audioManager.playMusic("gameplay", 1.8);
    return;
  }

  const introSceneByLegacyName: Record<string, IntroAudioScene> = {
    night: "calm",
    storm: "storm",
    chelsea: "chelsea",
    orb: "magic",
    fade: "journey",
  };

  const introScene = introSceneByLegacyName[scene];
  if (introScene) {
    audioManager.setIntroScene(introScene);
  }
}

export function stopAllAmbience(): void {
  audioManager.stopAll(0.8);
}
