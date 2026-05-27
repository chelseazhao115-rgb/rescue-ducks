import type { AtmosphereTag } from "@/data/semanticGroupsV2";

export type GamePhase = "menu" | "playing" | "paused" | "victory" | "gameover";

export type ChelseaContext =
  | "game_start"
  | "level_start"
  | "idle"
  | "correct_match"
  | "chain_combo"
  | "wrong_match"
  | "storm_warning"
  | "academic_groups"
  | "logic_groups"
  | "victory"
  | "gameover"
  | "long_play"
  | "hard_mode";

export interface OrbInstance {
  orbId: string;
  word: string;
  meaning: string;
  connectionLabel: string;
  groupId: string;
  position: { x: number; y: number };
  status: "idle" | "selected" | "chained" | "matched" | "wrong";
  showMeaning: boolean;
  spawnedAt: number;
}

export interface ChainState {
  chainId: string;
  groupId: string;
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
  stars: 0 | 1 | 2 | 3;
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

// ── Runtime Level Config (V2 — dynamically generated) ────────

export interface RuntimeWordConfig {
  text: string;
  meaning: string;
  connectionLabel: string;
  groupId: string;
  visualWeight: number;
  wordDifficulty: number;
}

export interface RuntimeGroupConfig {
  groupId: string;
  category: string;
  atmosphere: AtmosphereTag[];
  difficulty: number;
  words: RuntimeWordConfig[];
}

export interface RuntimeLevelConfig {
  levelId: string;
  stageId: number;
  levelInStage: number;
  name: string;
  displayTitle: string;
  durationMs: number;
  stormTickRateMs: number;
  stormTickAmount: number;
  stormPenaltyOnWrong: number;
  stormReductionOnCorrect: number;
  lighthouseGainPerGroup: number;
  comboTimeoutMs: number;
  wordsPerGroup: number;
  groups: RuntimeGroupConfig[];
}

// ── Game State ───────────────────────────────────────────────

export interface GameState {
  phase: GamePhase;
  levelConfig: RuntimeLevelConfig | null;
  currentStage: number;
  currentLevelInStage: number;
  stormMeter: number;
  lighthouseBrightness: number;
  activeGroups: RuntimeGroupConfig[];
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
