import { audioManager } from "@/lib/audio/AudioManager";

export function unlockAudio(): void {
  audioManager.unlock();
}

export function playCorrectSound(): void {
  audioManager.playSfx("correct");
}

export function playWrongSound(): void {
  audioManager.playSfx("wrong");
}

export function playChainSound(combo: number): void {
  audioManager.playSfx("combo", Math.min(1.2, 0.7 + combo * 0.08));
}

export function playGroupCompleteSound(): void {
  audioManager.playSfx("groupComplete");
}

export function playVictorySound(): void {
  audioManager.playSfx("victory");
}

export function playFailureSound(): void {
  audioManager.playSfx("failure");
}

export function playButtonClick(): void {
  audioManager.playSfx("button");
}
