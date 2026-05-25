"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { CURRICULUM, TOTAL_LEVELS, getLevelsInStage } from "@/lib/engine/LevelGenerator";
import { semanticGroupsV2 } from "@/data/semanticGroupsV2";
import { loadLevel, spawnGroupOrbs } from "@/lib/engine/LevelManager";
import type { RuntimeLevelConfig } from "@/lib/types";

export const DebugPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [groupQuery, setGroupQuery] = useState("");
  const [groupResults, setGroupResults] = useState<{ id: string; category: string }[]>([]);

  // Toggle with backtick
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const searchGroups = useCallback((q: string) => {
    setGroupQuery(q);
    if (q.length < 2) { setGroupResults([]); return; }
    const lower = q.toLowerCase();
    const results = semanticGroupsV2
      .filter((g) => g.category.toLowerCase().includes(lower) || g.id.toLowerCase().includes(lower))
      .slice(0, 10)
      .map((g) => ({ id: g.id, category: g.category }));
    setGroupResults(results);
  }, []);

  // ─── Actions ────────────────────────────────────

  const jumpToStage = (stageId: number) => {
    let global = 1;
    for (const s of CURRICULUM) {
      if (s.id >= stageId) break;
      global += getLevelsInStage(s.id);
    }
    localStorage.setItem("rescueDuckGlobalLevel", String(global));
    localStorage.removeItem("rescueDuckSelectedLevel");
    useGameStore.getState().resetGame();
    window.location.href = "/game";
  };

  const unlockAll = () => {
    localStorage.setItem("rescueDuckGlobalLevel", String(TOTAL_LEVELS + 1));
    localStorage.removeItem("rescueDuckSelectedLevel");
    useGameStore.getState().resetGame();
    window.location.href = "/";
  };

  const resetSave = () => {
    localStorage.removeItem("rescueDuckGlobalLevel");
    localStorage.removeItem("rescueDuckSelectedLevel");
    localStorage.removeItem("rescueDuckSemanticProgress");
    useGameStore.getState().resetGame();
    window.location.href = "/";
  };

  const loadGroup = (groupId: string) => {
    const group = semanticGroupsV2.find((g) => g.id === groupId);
    if (!group) return;
    const selectedWords = group.words.slice(0, Math.min(6, group.words.length));
    const config: RuntimeLevelConfig = {
      levelId: `debug_${groupId}`,
      stageId: 1,
      levelInStage: 1,
      name: `Debug: ${group.category}`,
      durationMs: 120_000,
      stormTickRateMs: 500,
      stormTickAmount: 0.3,
      stormPenaltyOnWrong: 1,
      stormReductionOnCorrect: 3,
      lighthouseGainPerGroup: 100,
      comboTimeoutMs: 8000,
      maxOrbsOnScreen: 10,
      orbSpawnIntervalMs: 2500,
      wordsPerGroup: selectedWords.length,
      groups: [{
        groupId: group.id,
        category: group.category,
        atmosphere: group.atmosphere,
        difficulty: group.difficulty,
        words: selectedWords.map((w) => ({
          text: w.text,
          meaning: group.keywordsChinese,
          groupId: group.id,
          visualWeight: w.visualWeight,
          wordDifficulty: w.wordDifficulty,
        })),
      }],
    };

    const { activeGroups, ducks, allGroups } = loadLevel(config);
    const initialOrbs = spawnGroupOrbs(allGroups[0]?.items ?? [], []);

    useGameStore.setState({
      phase: "playing",
      levelConfig: config,
      currentStage: 1,
      currentLevelInStage: 1,
      stormMeter: 0,
      lighthouseBrightness: 10,
      activeGroups,
      orbs: initialOrbs,
      activeChain: null,
      energyParticles: [],
      ducks,
      score: 0,
      correctMatches: 0,
      wrongMatches: 0,
      groupsCompleted: 0,
      maxCombo: 0,
      levelStartTime: Date.now(),
      elapsedMs: 0,
      remainingMs: config.durationMs,
      lastOrbSpawnTime: Date.now(),
      usedWords: [],
      tipVisible: false,
    });
    setOpen(false);
  };

  const setStorm = (pct: number) => {
    useGameStore.setState({ stormMeter: pct });
  };

  const triggerVictory = () => {
    useGameStore.setState({ phase: "victory", lighthouseBrightness: 100 });
  };

  const triggerFailure = () => {
    useGameStore.setState({ phase: "gameover", stormMeter: 100 });
  };

  // ─── UI ─────────────────────────────────────────

  if (!open) return null;

  const btn = (label: string, action: () => void, bg = "rgba(255,255,255,0.08)") => (
    <button
      onClick={action}
      className="w-full text-left px-3 py-1.5 rounded text-sm font-medium hover:brightness-125 transition-all"
      style={{ background: bg, color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      {label}
    </button>
  );

  const btnDanger = (label: string, action: () => void) =>
    btn(label, action, "rgba(255,80,80,0.25)");

  const btnGo = (label: string, action: () => void) =>
    btn(label, action, "rgba(100,200,255,0.2)");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 right-4 z-[100] overflow-y-auto rounded-xl shadow-2xl"
        style={{
          width: "calc(300px * var(--vscale, 1))",
          maxHeight: "80vh",
          padding: "calc(16px * var(--vscale, 1))",
          background: "rgba(15,15,30,0.92)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.12)",
          fontSize: "calc(13px * var(--vscale, 1))",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-white/90 text-base">Debug Panel</span>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white text-lg leading-none">&times;</button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* 1. Stage Jump */}
          <div>
            <div className="text-white/50 text-xs mb-1.5 uppercase tracking-wider">1. Stage Jump</div>
            <div className="flex gap-2">
              {btnGo("Stage 3", () => jumpToStage(3))}
              {btnGo("Stage 4", () => jumpToStage(4))}
            </div>
          </div>

          {/* 2. Unlock All */}
          <div>
            <div className="text-white/50 text-xs mb-1.5 uppercase tracking-wider">2. Unlock</div>
            {btnDanger("Unlock All Levels", unlockAll)}
          </div>

          {/* 3. Reset */}
          <div>
            <div className="text-white/50 text-xs mb-1.5 uppercase tracking-wider">3. Reset</div>
            {btnDanger("Reset Save", resetSave)}
          </div>

          {/* 4. Load Group */}
          <div>
            <div className="text-white/50 text-xs mb-1.5 uppercase tracking-wider">4. Load Group</div>
            <input
              type="text"
              placeholder="home / domestic / local..."
              value={groupQuery}
              onChange={(e) => searchGroups(e.target.value)}
              className="w-full px-2 py-1.5 rounded text-sm text-white mb-1"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            {groupResults.map((r) => (
              <button
                key={r.id}
                onClick={() => loadGroup(r.id)}
                className="w-full text-left px-2 py-1 rounded text-xs text-white/80 hover:bg-white/10 transition-all"
              >
                {r.category} <span className="text-white/30">({r.id})</span>
              </button>
            ))}
          </div>

          {/* 5. Storm Control */}
          <div>
            <div className="text-white/50 text-xs mb-1.5 uppercase tracking-wider">5. Storm</div>
            <div className="flex gap-2">
              {btn("Storm 20%", () => setStorm(20))}
              {btn("Storm 80%", () => setStorm(80))}
            </div>
          </div>

          {/* 6. Victory / Fail */}
          <div>
            <div className="text-white/50 text-xs mb-1.5 uppercase tracking-wider">6. Screens</div>
            <div className="flex gap-2">
              {btnGo("Victory", triggerVictory)}
              {btnDanger("Failure", triggerFailure)}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-white/8 text-white/25 text-xs text-center">
          Press ` to toggle
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
