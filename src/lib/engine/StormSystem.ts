import type { GameState } from "@/lib/types";

export interface StormSystemDeps {
  stormTickRateMs: number;
  stormTickAmount: number;
  stormPenaltyOnWrong: number;
  stormReductionOnCorrect: number;
}

export function tickStorm(state: GameState, deltaMs: number, deps: StormSystemDeps): number {
  const tickFraction = deltaMs / deps.stormTickRateMs;
  const increase = tickFraction * deps.stormTickAmount;
  return Math.min(100, state.stormMeter + increase);
}

export function applyWrongPenalty(current: number, deps: StormSystemDeps): number {
  return Math.min(100, current + deps.stormPenaltyOnWrong);
}

export function applyCorrectReduction(current: number, deps: StormSystemDeps): number {
  return Math.max(0, current - deps.stormReductionOnCorrect);
}
