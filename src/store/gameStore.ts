import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { GameState } from "@/lib/types";
import { GameEngine } from "@/lib/engine/GameEngine";

const initialState: GameState = {
  phase: "menu",
  levelConfig: null,
  currentStage: 1,
  currentLevelInStage: 1,
  stormMeter: 0,
  lighthouseBrightness: 0,
  activeGroups: [],
  orbs: [],
  activeChain: null,
  energyParticles: [],
  ducks: [],
  score: 0,
  correctMatches: 0,
  wrongMatches: 0,
  groupsCompleted: 0,
  maxCombo: 0,
  currentTipContext: "idle",
  currentTipText: "",
  tipVisible: false,
  levelStartTime: 0,
  elapsedMs: 0,
  remainingMs: 0,
  lastOrbSpawnTime: 0,
  usedWords: [],
};

interface GameActions {
  startGame: (stageId: number, levelInStage: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  tapOrb: (orbId: string) => void;
  resetGame: () => void;
  quitToMenu: () => void;
  getEngine: () => GameEngine | null;
}

export const useGameStore = create<GameState & GameActions>()(
  immer((set, get) => {
    let engine: GameEngine | null = null;

    return {
      ...initialState,

      startGame: (stageId: number, levelInStage: number) => {
        if (!engine) {
          engine = new GameEngine(
            () => get(),
            (partial) => set(partial as any)
          );
        }
        engine.start(stageId, levelInStage);
      },

      pauseGame: () => {
        engine?.pause();
      },

      resumeGame: () => {
        engine?.resume();
      },

      tapOrb: (orbId: string) => {
        engine?.handleOrbTap(orbId);
      },

      resetGame: () => {
        engine?.destroy();
        engine = null;
        set({ ...initialState, phase: "menu" });
      },

      quitToMenu: () => {
        engine?.quitToMenu();
      },

      getEngine: () => engine,
    };
  })
);
