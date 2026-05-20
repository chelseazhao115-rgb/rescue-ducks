import type { ChainState, GameState } from "@/lib/types";

export function shouldBreakChain(state: GameState, comboTimeoutMs: number, now: number): boolean {
  if (!state.activeChain) return false;
  return now - state.activeChain.lastTapAt > comboTimeoutMs;
}

export function createChain(orbId: string, groupId: number, now: number, chainId: string): ChainState {
  return {
    chainId,
    groupId,
    orbIds: [orbId],
    startedAt: now,
    lastTapAt: now,
    combo: 1,
  };
}

export function extendChain(chain: ChainState, orbId: string, now: number): ChainState {
  return {
    ...chain,
    orbIds: [...chain.orbIds, orbId],
    lastTapAt: now,
    combo: chain.combo + 1,
  };
}

export function getComboMultiplier(combo: number): number {
  if (combo >= 7) return 3;
  if (combo >= 4) return 2;
  return 1;
}
