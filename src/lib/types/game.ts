import type { WordGroup } from "./words";

export type GamePhase = "menu" | "playing" | "paused" | "victory" | "gameover";

export type ChelseaContext =
  | "game_start"
  | "chain_started"
  | "chain_growing"
  | "chain_broken"
  | "group_complete"
  | "storm_high"
  | "storm_low"
  | "combo_milestone"
  | "victory"
  | "gameover"
  | "idle";

export interface OrbInstance {
  orbId: string;
  word: string;
  meaning: string;
  groupId: number;
  position: { x: number; y: number };
  status: "idle" | "selected" | "chained" | "matched" | "wrong";
  showMeaning: boolean;
  spawnedAt: number;
}

export interface ChainState {
  chainId: string;
  groupId: number;
  orbIds: string[];
  startedAt: number;
  lastTapAt: number;
  combo: number;
}

export interface EnergyParticle {
  particleId: string;
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  spawnedAt: number;
  duration: number;
  hue: number;
}

export interface DuckState {
  duckId: string;
  rescued: boolean;
  progress: number;
}

export interface StarResult {
  stars: 1 | 2 | 3;
  criteria: {
    lighthouseLit: boolean;
    maxComboReached: number;
    stormRemaining: number;
  };
}

export interface GameSummary {
  score: number;
  correctMatches: number;
  wrongMatches: number;
  groupsCompleted: number;
  totalGroups: number;
  maxCombo: number;
  ducksRescued: number;
  totalDucks: number;
  timePlayed: number;
  starResult: StarResult;
}

export interface LevelConfig {
  levelId: number;
  name: string;
  durationMs: number;
  groupIds: number[];
  stormTickRateMs: number;
  stormTickAmount: number;
  stormPenaltyOnWrong: number;
  stormReductionOnCorrect: number;
  lighthouseGainPerGroup: number;
  comboTimeoutMs: number;
  maxOrbsOnScreen: number;
  orbSpawnIntervalMs: number;
  wordsPerGroup: number;
}

export interface GameState {
  phase: GamePhase;
  levelConfig: LevelConfig | null;
  stormMeter: number;
  lighthouseBrightness: number;
  activeGroups: WordGroup[];
  orbs: OrbInstance[];
  activeChain: ChainState | null;
  energyParticles: EnergyParticle[];
  ducks: DuckState[];
  score: number;
  correctMatches: number;
  wrongMatches: number;
  groupsCompleted: number;
  maxCombo: number;
  currentTipContext: ChelseaContext;
  currentTipText: string;
  tipVisible: boolean;
  levelStartTime: number;
  elapsedMs: number;
  remainingMs: number;
  lastOrbSpawnTime: number;
  usedWords: string[];
}
