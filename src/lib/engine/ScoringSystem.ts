import type { GameState, StarResult } from "@/lib/types";
import {
  SCORE_PER_CORRECT_MATCH,
  SCORE_PER_GROUP_COMPLETE,
  SCORE_PER_COMBO_STEP,
} from "@/constants/game";

export function calcMatchScore(combo: number, multiplier: number): number {
  return SCORE_PER_CORRECT_MATCH + combo * SCORE_PER_COMBO_STEP * multiplier;
}

export function calcGroupCompleteScore(): number {
  return SCORE_PER_GROUP_COMPLETE;
}

export function calcStarRating(state: GameState): StarResult {
  const completed = state.groupsCompleted;
  const total = state.activeGroups.length;

  let stars: 0 | 1 | 2 | 3 = 0;

  if (total > 0 && completed > 0) {
    const ratio = completed / total;
    if (ratio >= 1) {
      stars = 3;
    } else if (ratio >= 0.5) {
      stars = 2;
    } else {
      stars = 1;
    }
  }

  return {
    stars,
    criteria: {
      lighthouseLit: state.lighthouseBrightness >= 100,
      maxComboReached: state.maxCombo,
      stormRemaining: 100 - state.stormMeter,
    },
  };
}
