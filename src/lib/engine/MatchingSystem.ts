import type { GameState, OrbInstance } from "@/lib/types";

export function getOrbById(state: GameState, orbId: string): OrbInstance | undefined {
  return state.orbs.find((o) => o.orbId === orbId);
}

export function isSameGroup(orb: OrbInstance, groupId: number): boolean {
  return orb.groupId === groupId;
}

export function isOrbAlreadyChained(orb: OrbInstance, chainOrbIds: string[]): boolean {
  return chainOrbIds.includes(orb.orbId);
}

export function getChainedOrbsInGroup(state: GameState, groupId: number): OrbInstance[] {
  if (!state.activeChain || state.activeChain.groupId !== groupId) return [];
  return state.activeChain.orbIds
    .map((id) => getOrbById(state, id))
    .filter((o): o is OrbInstance => o !== undefined);
}

export function getUnchainedOrbsInGroup(state: GameState, groupId: number): OrbInstance[] {
  return state.orbs.filter(
    (o) =>
      o.groupId === groupId &&
      o.status !== "matched" &&
      !(state.activeChain?.orbIds.includes(o.orbId) ?? false)
  );
}

export function isGroupFullyChained(state: GameState, groupId: number): boolean {
  const activeGroup = state.activeGroups.find((g) => g.groupId === groupId);
  if (!activeGroup) return false;

  const chainedOrbs = getChainedOrbsInGroup(state, groupId);
  // Group is complete only when ALL words defined for the group are chained
  return chainedOrbs.length >= activeGroup.words.length;
}
