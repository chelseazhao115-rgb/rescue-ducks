import type { GamePhase } from "@/lib/types";

const VALID_TRANSITIONS: Record<GamePhase, GamePhase[]> = {
  menu: ["playing"],
  playing: ["paused", "victory", "gameover"],
  paused: ["playing", "menu"],
  victory: ["menu"],
  gameover: ["menu"],
};

export function canTransition(from: GamePhase, to: GamePhase): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getValidTransitions(from: GamePhase): GamePhase[] {
  return VALID_TRANSITIONS[from] ?? [];
}
