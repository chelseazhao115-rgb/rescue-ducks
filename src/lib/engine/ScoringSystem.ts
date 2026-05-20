import type { GameState, StarResult } from "@/lib/types";
import {
  SCORE_PER_CORRECT_MATCH,
  SCORE_PER_GROUP_COMPLETE,
  SCORE_PER_COMBO_STEP,
  STAR_1_THRESHOLD,
  STAR_2_THRESHOLD,
  STAR_3_THRESHOLD,
} from "@/constants/game";

export function calcMatchScore(combo: number, multiplier: number): number {
  return SCORE_PER_CORRECT_MATCH + combo * SCORE_PER_COMBO_STEP * multiplier;
}

export function calcGroupCompleteScore(): number {
  return SCORE_PER_GROUP_COMPLETE;
}

export function calcStarRating(state: GameState): StarResult {
  const score = state.score;
  let stars: 1 | 2 | 3 = 1;
  if (score >= STAR_3_THRESHOLD) stars = 3;
  else if (score >= STAR_2_THRESHOLD) stars = 2;

  return {
    stars,
    criteria: {
      lighthouseLit: state.lighthouseBrightness >= 100,
      maxComboReached: state.maxCombo,
      stormRemaining: 100 - state.stormMeter,
    },
  };
}
