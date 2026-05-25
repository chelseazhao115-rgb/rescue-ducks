import { v4 as uuid } from "uuid";
import type { GameState, ChelseaContext } from "@/lib/types";
import { CHELSEA_TIPS } from "@/lib/data/chelseaTips";
import {
  unlockAudio,
  playCorrectSound,
  playWrongSound,
  playChainSound,
  playGroupCompleteSound,
  playVictorySound,
} from "@/lib/utils/sound";
import { canTransition } from "./StateMachine";
import { tickStorm, applyWrongPenalty, applyCorrectReduction } from "./StormSystem";
import { shouldBreakChain, createChain, extendChain, getComboMultiplier } from "./ComboSystem";
import { getOrbById, isSameGroup, isOrbAlreadyChained, isGroupFullyChained } from "./MatchingSystem";
import { calcMatchScore, calcGroupCompleteScore, calcStarRating } from "./ScoringSystem";
import { loadLevel, spawnGroupOrbs } from "./LevelManager";
import { generateLevel, getLevelsInStage, recordGroupEncountered, recordGroupMastered } from "./LevelGenerator";
import type { SpawnItem } from "./LevelManager";
import {
  COMBO_MILESTONE_INTERVAL,
  STORM_HIGH_THRESHOLD,
  ENERGY_PARTICLE_DURATION_MS,
  ENERGY_PARTICLES_PER_GROUP,
  CHELSEA_TIP_DISPLAY_MS,
} from "@/constants/game";

type StateGetter = () => GameState;
type StateSetter = (partial: Partial<GameState> | ((state: GameState) => Partial<GameState>)) => void;

export class GameEngine {
  private getState: StateGetter;
  private setState: StateSetter;
  private groupBatches: SpawnItem[][] = [];
  private spawnedBatchIndex = 0;
  private animFrameId: number | null = null;
  private lastTickTime: number = 0;
  private tipTimer: number = 0;
  private tipContext: ChelseaContext = "idle";
  private meaningTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private matchCounter: number = 0;
  private hardModeTipShown: boolean = false;
  private longPlayTipShown: boolean = false;

  constructor(getState: StateGetter, setState: StateSetter) {
    this.getState = getState;
    this.setState = setState;
  }

  /** Pick a single random tip. */
  private pickTip(ctx: ChelseaContext): string {
    const pool = CHELSEA_TIPS[ctx] ?? [];
    return pool[Math.floor(Math.random() * pool.length)] ?? "";
  }

  /** Show a tip for the given context, respecting throttle. */
  private showTip(ctx: ChelseaContext, updates: Partial<GameState>) {
    this.tipContext = ctx;
    this.tipTimer = CHELSEA_TIP_DISPLAY_MS;
    updates.currentTipContext = ctx;
    updates.currentTipText = this.pickTip(ctx);
    updates.tipVisible = true;
  }

  /**
   * Start a level using the V2 semantic group runtime generator.
   * @param stageId - Stage number (1-4)
   * @param levelInStage - Level within the stage (1-based)
   */
  start(stageId: number, levelInStage: number): void {
    const state = this.getState();
    if (!canTransition(state.phase, "playing")) return;

    // Generate level dynamically from 376 semantic groups
    const config = generateLevel(stageId, levelInStage);

    // Record all group encounters for semantic progression tracking
    for (const g of config.groups) {
      recordGroupEncountered(g.groupId);
    }

    const { activeGroups, ducks, allGroups } = loadLevel(config);

    // Build group batches: each batch = all words from one group
    this.groupBatches = allGroups.map((g) => g.items);
    this.spawnedBatchIndex = 0;

    // Spawn first 4 groups immediately
    const initialOrbs: Parameters<typeof spawnGroupOrbs>[1] = [];
    let orbs = initialOrbs;
    const initialBatch = Math.min(4, this.groupBatches.length);
    for (let i = 0; i < initialBatch; i++) {
      orbs = [...orbs, ...spawnGroupOrbs(this.groupBatches[i], orbs)];
      this.spawnedBatchIndex = i + 1;
    }

    const now = Date.now();

    // Reset per-level counters
    this.matchCounter = 0;
    this.longPlayTipShown = false;

    // Determine start tip context
    const tipCtx: ChelseaContext =
      stageId >= 3 && !this.hardModeTipShown ? "hard_mode" : "game_start";
    if (stageId >= 3) this.hardModeTipShown = true;

    this.tipContext = tipCtx;
    this.tipTimer = CHELSEA_TIP_DISPLAY_MS;

    this.setState({
      phase: "playing",
      levelConfig: config,
      currentStage: stageId,
      currentLevelInStage: levelInStage,
      stormMeter: 0,
      lighthouseBrightness: 10,
      activeGroups,
      orbs,
      activeChain: null,
      energyParticles: [],
      ducks,
      score: 0,
      correctMatches: 0,
      wrongMatches: 0,
      groupsCompleted: 0,
      maxCombo: 0,
      currentTipContext: tipCtx,
      currentTipText: this.pickTip(tipCtx),
      tipVisible: true,
      levelStartTime: now,
      elapsedMs: 0,
      remainingMs: config.durationMs,
      lastOrbSpawnTime: now,
      usedWords: [],
    });

    this.lastTickTime = 0;
    this.startLoop();
  }

  pause(): void {
    const state = this.getState();
    if (!canTransition(state.phase, "paused")) return;
    this.stopLoop();
    this.setState({ phase: "paused" });
  }

  resume(): void {
    const state = this.getState();
    if (!canTransition(state.phase, "playing")) return;
    this.lastTickTime = Date.now();
    this.setState({ phase: "playing" });
    this.startLoop();
  }

  quitToMenu(): void {
    this.stopLoop();
    this.clearMeaningTimers();
    this.setState({ phase: "menu" });
  }

  handleOrbTap(orbId: string): void {
    const state = this.getState();
    if (state.phase !== "playing") return;

    const orb = getOrbById(state, orbId);
    if (!orb) return;
    if (orb.status === "matched" || orb.status === "wrong") return;

    unlockAudio();

    // Show Chinese meaning briefly
    this.setState({
      orbs: state.orbs.map((o) =>
        o.orbId === orbId ? { ...o, showMeaning: true } : o
      ),
    });
    const prevTimer = this.meaningTimers.get(orbId);
    if (prevTimer) clearTimeout(prevTimer);
    this.meaningTimers.set(
      orbId,
      setTimeout(() => {
        const current = this.getState();
        this.setState({
          orbs: current.orbs.map((o) =>
            o.orbId === orbId ? { ...o, showMeaning: false } : o
          ),
        });
        this.meaningTimers.delete(orbId);
      }, 1500)
    );

    const now = Date.now();

    if (state.activeChain) {
      const chain = state.activeChain;

      if (isOrbAlreadyChained(orb, chain.orbIds)) return;

      if (isSameGroup(orb, chain.groupId)) {
        // Correct match — extend chain
        const extended = extendChain(chain, orbId, now);
        const multiplier = getComboMultiplier(extended.combo);
        const matchScore = calcMatchScore(extended.combo, multiplier);
        const newMaxCombo = Math.max(state.maxCombo, extended.combo);

        const updatedOrbs = state.orbs.map((o) =>
          o.orbId === orbId ? { ...o, status: "chained" as const } : o
        );

        const newStorm = applyCorrectReduction(state.stormMeter, {
          stormTickRateMs: state.levelConfig!.stormTickRateMs,
          stormTickAmount: state.levelConfig!.stormTickAmount,
          stormPenaltyOnWrong: state.levelConfig!.stormPenaltyOnWrong,
          stormReductionOnCorrect: state.levelConfig!.stormReductionOnCorrect,
        });

        playChainSound(extended.combo);

        const updates: Partial<GameState> = {
          activeChain: extended,
          orbs: updatedOrbs,
          score: state.score + matchScore,
          correctMatches: state.correctMatches + 1,
          maxCombo: newMaxCombo,
          stormMeter: newStorm,
        };

        if (extended.combo % COMBO_MILESTONE_INTERVAL === 0) {
          this.showTip("chain_combo", updates);
        }

        this.setState(updates);

        const updatedState = this.getState();
        if (isGroupFullyChained(updatedState, chain.groupId)) {
          this.completeGroup(chain.groupId);
        }
        return;
      } else {
        // Wrong match — break chain and reset all chained orbs
        playWrongSound();

        const newStorm = applyWrongPenalty(state.stormMeter, {
          stormTickRateMs: state.levelConfig!.stormTickRateMs,
          stormTickAmount: state.levelConfig!.stormTickAmount,
          stormPenaltyOnWrong: state.levelConfig!.stormPenaltyOnWrong,
          stormReductionOnCorrect: state.levelConfig!.stormReductionOnCorrect,
        });

        const brokenChainOrbIds = new Set(state.activeChain.orbIds);

        const updatedOrbs = state.orbs.map((o) => {
          if (o.orbId === orbId) return { ...o, status: "wrong" as const };
          if (brokenChainOrbIds.has(o.orbId)) return { ...o, status: "idle" as const };
          return o;
        });

        const wrongUpdates: Partial<GameState> = {
          activeChain: null,
          orbs: updatedOrbs,
          stormMeter: newStorm,
          wrongMatches: state.wrongMatches + 1,
        };
        this.showTip("wrong_match", wrongUpdates);
        this.setState(wrongUpdates);

        setTimeout(() => {
          const current = this.getState();
          const resetOrbs = current.orbs.map((o) =>
            o.orbId === orbId ? { ...o, status: "idle" as const } : o
          );
          this.setState({ orbs: resetOrbs });
        }, 500);
        return;
      }
    }

    // No active chain — start a new one
    playCorrectSound();

    const newChain = createChain(orbId, orb.groupId, now, uuid());
    const updatedOrbs = state.orbs.map((o) =>
      o.orbId === orbId ? { ...o, status: "selected" as const } : o
    );

    this.matchCounter++;
    const startUpdates: Partial<GameState> = {
      activeChain: newChain,
      orbs: updatedOrbs,
    };
    // Throttle: only show tip every 3rd new chain
    if (this.matchCounter % 3 === 0) {
      this.showTip("correct_match", startUpdates);
    }
    this.setState(startUpdates);
  }

  private completeGroup(groupId: string): void {
    const state = this.getState();
    const config = state.levelConfig!;

    // Track semantic mastery — group completed successfully
    recordGroupMastered(groupId);

    playGroupCompleteSound();

    const matchedOrbs = state.orbs.map((o) =>
      o.groupId === groupId ? { ...o, status: "matched" as const } : o
    );

    const removedWords = state.orbs
      .filter((o) => o.groupId === groupId)
      .map((o) => o.word);

    const remainingOrbs = matchedOrbs.filter((o) => o.status !== "matched");
    const newUsedWords = [...state.usedWords, ...removedWords];

    const particles = state.orbs
      .filter((o) => o.groupId === groupId)
      .slice(0, ENERGY_PARTICLES_PER_GROUP)
      .map((o) => ({
        particleId: uuid(),
        sourcePosition: { ...o.position },
        targetPosition: { x: 0.85, y: 0.15 },
        spawnedAt: Date.now(),
        duration: ENERGY_PARTICLE_DURATION_MS,
        hue: 45 + Math.random() * 20,
      }));

    const newLighthouse = Math.min(100, state.lighthouseBrightness + config.lighthouseGainPerGroup);
    const newGroupsCompleted = state.groupsCompleted + 1;
    const groupScore = calcGroupCompleteScore();

    const updatedDucks = state.ducks.map((d, i) =>
      i === newGroupsCompleted - 1 && !d.rescued
        ? { ...d, rescued: true, progress: 1 }
        : d
    );

    const completeUpdates: Partial<GameState> = {
      orbs: remainingOrbs,
      usedWords: newUsedWords,
      energyParticles: [...state.energyParticles, ...particles],
      lighthouseBrightness: newLighthouse,
      groupsCompleted: newGroupsCompleted,
      score: state.score + groupScore,
      ducks: updatedDucks,
      activeChain: null,
    };
    this.showTip("correct_match", completeUpdates);
    this.setState(completeUpdates);

    // Spawn 2 new groups every 2 completions
    if (this.spawnedBatchIndex < this.groupBatches.length && newGroupsCompleted % 2 === 0) {
      const currentState = this.getState();
      const batchSize = Math.min(2, this.groupBatches.length - this.spawnedBatchIndex);
      let allNewOrbs = [...currentState.orbs];
      for (let i = 0; i < batchSize; i++) {
        const newOrbs = spawnGroupOrbs(
          this.groupBatches[this.spawnedBatchIndex],
          allNewOrbs
        );
        allNewOrbs = [...allNewOrbs, ...newOrbs];
        this.spawnedBatchIndex++;
      }
      this.setState({
        orbs: allNewOrbs,
        lastOrbSpawnTime: Date.now(),
      });
    }

    setTimeout(() => {
      const current = this.getState();
      const active = current.energyParticles.filter(
        (p) => Date.now() - p.spawnedAt < p.duration
      );
      this.setState({ energyParticles: active });
    }, ENERGY_PARTICLE_DURATION_MS + 100);

    if (newLighthouse >= 100) {
      this.onVictory();
    }
  }

  private onVictory(): void {
    this.stopLoop();
    this.clearMeaningTimers();

    playVictorySound();

    this.setState({
      phase: "victory",
      currentTipContext: "victory",
      currentTipText: this.pickTip("victory"),
      tipVisible: true,
    });
  }

  private onGameOver(): void {
    this.stopLoop();
    this.clearMeaningTimers();

    this.setState({
      phase: "gameover",
      currentTipContext: "gameover",
      currentTipText: this.pickTip("gameover"),
      tipVisible: true,
    });
  }

  tick(deltaMs: number): void {
    const state = this.getState();
    if (state.phase !== "playing") return;

    const config = state.levelConfig!;
    const now = Date.now();

    const newStorm = tickStorm(state, deltaMs, {
      stormTickRateMs: config.stormTickRateMs,
      stormTickAmount: config.stormTickAmount,
      stormPenaltyOnWrong: config.stormPenaltyOnWrong,
      stormReductionOnCorrect: config.stormReductionOnCorrect,
    });

    let chain = state.activeChain;
    let resetOrbsOnTimeout: typeof state.orbs | null = null;
    if (chain && shouldBreakChain(state, config.comboTimeoutMs, now)) {
      const chainOrbIds = new Set(chain.orbIds);
      resetOrbsOnTimeout = state.orbs.map((o) =>
        chainOrbIds.has(o.orbId) ? { ...o, status: "idle" as const } : o
      );
      chain = null;
    }

    const newElapsed = state.elapsedMs + deltaMs;
    const newRemaining = Math.max(0, config.durationMs - newElapsed);

    const activeParticles = state.energyParticles.filter(
      (p) => now - p.spawnedAt < p.duration
    );

    let tipVisible = state.tipVisible;
    let tipContext = this.tipContext;
    let tipText = state.currentTipText;

    // Long play tip after 3 minutes
    if (!this.longPlayTipShown && newElapsed > 180_000) {
      this.longPlayTipShown = true;
      tipVisible = true;
      tipContext = "long_play";
      tipText = this.pickTip("long_play");
      this.tipTimer = CHELSEA_TIP_DISPLAY_MS;
      this.tipContext = "long_play";
    }

    this.tipTimer -= deltaMs;
    if (this.tipTimer <= 0) {
      tipVisible = false;
      if (newStorm > STORM_HIGH_THRESHOLD) {
        tipContext = "storm_warning";
        tipText = this.pickTip("storm_warning");
        tipVisible = true;
        this.tipTimer = CHELSEA_TIP_DISPLAY_MS;
        this.tipContext = "storm_warning";
      }
    }

    this.setState({
      stormMeter: newStorm,
      activeChain: chain,
      orbs: resetOrbsOnTimeout ?? state.orbs,
      energyParticles: activeParticles,
      elapsedMs: newElapsed,
      remainingMs: newRemaining,
      currentTipText: tipText,
      currentTipContext: tipContext,
      tipVisible,
    });

    if (newStorm >= 100) {
      this.onGameOver();
    }

    if (newRemaining <= 0) {
      this.onGameOver();
    }
  }

  private clearMeaningTimers(): void {
    for (const timer of this.meaningTimers.values()) {
      clearTimeout(timer);
    }
    this.meaningTimers.clear();
  }

  private startLoop(): void {
    this.stopLoop();
    const loop = (timestamp: number) => {
      if (this.lastTickTime === 0) this.lastTickTime = timestamp;
      const delta = Math.min(timestamp - this.lastTickTime, 100);
      this.lastTickTime = timestamp;
      this.tick(delta);
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  private stopLoop(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  destroy(): void {
    this.stopLoop();
    this.clearMeaningTimers();
  }
}
