"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getStageAndLevel, TOTAL_LEVELS } from "@/lib/engine/LevelGenerator";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { IntroSequence, shouldPlayIntro, markIntroSeen } from "./IntroSequence";
import { StormMeter } from "./StormMeter";
import { ScoreDisplay } from "./ScoreDisplay";
import { PauseButton } from "./PauseButton";
import { WordOrbField } from "./WordOrbField";
import { ChainLink } from "./ChainLink";
import { Lighthouse } from "./Lighthouse";
import { DuckParade } from "./DuckParade";
import { ChelseaNPC } from "./ChelseaNPC";
import { ComboIndicator } from "./ComboIndicator";
import { LightEnergy } from "./LightEnergy";
import { PauseOverlay } from "./PauseOverlay";
import { GameOverOverlay } from "./GameOverOverlay";
import { VictoryOverlay } from "./VictoryOverlay";
import { useAdaptiveStormAudio } from "@/lib/hooks/useSoundtrack";
import { audioManager } from "@/lib/audio/AudioManager";

function resolveGlobalLevel(): number {
  if (typeof window === "undefined") return 1;
  const selected = localStorage.getItem("rescueDuckSelectedLevel");
  if (selected) {
    const selectedLevel = parseInt(selected, 10);
    if (
      Number.isFinite(selectedLevel) &&
      selectedLevel >= 1 &&
      selectedLevel <= TOTAL_LEVELS
    ) {
      return selectedLevel;
    }
    localStorage.removeItem("rescueDuckSelectedLevel");
  }

  const saved = localStorage.getItem("rescueDuckGlobalLevel");
  const raw = saved ? parseInt(saved, 10) : 1;
  if (!Number.isFinite(raw)) {
    localStorage.setItem("rescueDuckGlobalLevel", "1");
    localStorage.removeItem("rescueDuckSemanticProgress");
    return 1;
  }
  // Auto-fix inflated global level (stale data from dev / old sessions)
  if (raw > TOTAL_LEVELS + 1) {
    localStorage.setItem("rescueDuckGlobalLevel", "1");
    localStorage.removeItem("rescueDuckSemanticProgress");
    return 1;
  }
  return Math.min(Math.max(1, raw), TOTAL_LEVELS);
}

export const GameScreen: React.FC = () => {
  const phase = useGameStore((s) => s.phase);
  const stormMeter = useGameStore((s) => s.stormMeter);
  const levelConfig = useGameStore((s) => s.levelConfig);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const [showIntro, setShowIntro] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  // Reset stale terminal state on mount
  useEffect(() => {
    if (phase === "gameover" || phase === "victory") {
      resetGame();
    }
  }, []);

  // Check if intro should play on first mount
  useEffect(() => {
    if (shouldPlayIntro()) {
      setShowIntro(true);
    } else {
      setIntroDone(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    markIntroSeen();
    setShowIntro(false);
    setIntroDone(true);
  }, []);

  // Start game after intro is done and phase is menu
  useEffect(() => {
    if (introDone && phase === "menu") {
      const globalLevel = resolveGlobalLevel();
      const { stageId, levelInStage } = getStageAndLevel(globalLevel);
      startGame(stageId, levelInStage);
    }
  }, [introDone, phase, startGame]);

  useAdaptiveStormAudio(stormMeter, phase === "playing");

  useEffect(() => {
    if (showIntro || !introDone) return;
    if (phase === "playing") {
      audioManager.playMusic("gameplay", 1.8);
    } else if (phase === "victory") {
      audioManager.crossFade("victory", 1.2);
    } else if (phase === "gameover") {
      audioManager.crossFade("failure", 1.2);
      audioManager.playSfx("failure", 0.9);
    }
  }, [introDone, phase, showIntro]);

  // Show intro overlay
  if (showIntro) {
    return (
      <div className="relative w-full h-dvh bg-storm-dark overflow-hidden">
        <IntroSequence onComplete={handleIntroComplete} />
      </div>
    );
  }

  if (phase === "menu") {
    return (
      <div className="w-full h-dvh bg-storm-dark flex items-center justify-center">
        <p className="text-white/40">Loading...</p>
      </div>
    );
  }

  const stormIntensity = stormMeter / 100;

  return (
    <main className="relative w-full h-dvh bg-storm-dark overflow-hidden select-none">
      <AnimatedBackground variant="game" stormIntensity={stormIntensity} />

      <AnimatePresence>
        {phase === "playing" && levelConfig && (
          <motion.div
            key={levelConfig.levelId}
            className="absolute left-1/2 top-[14%] z-30 -translate-x-1/2 text-center pointer-events-none"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, -6],
              filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(3px)"],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.4, times: [0, 0.18, 0.72, 1], ease: "easeOut" }}
          >
            <div
              className="font-extrabold tracking-wide"
              style={{
                fontSize: "calc(42px * var(--vscale, 1))",
                color: "#fff2cf",
                textShadow: "0 0 34px rgba(255,217,122,0.38), 0 3px 18px rgba(0,0,0,0.45)",
              }}
            >
              {levelConfig.displayTitle}
            </div>
            <div
              className="mx-auto mt-3 h-px w-40"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,231,176,0.74), transparent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between">
        <ScoreDisplay />
        <div className="flex flex-col items-end pt-2 pr-2 gap-1">
          <StormMeter />
          <PauseButton />
        </div>
      </div>

      {/* Lighthouse glow — top-right behind HUD */}
      <Lighthouse />

      {/* Center play area - word orbs */}
      <WordOrbField />

      {/* Chain links (SVG overlay) */}
      <ChainLink />

      {/* Light energy particles */}
      <LightEnergy />

      {/* Bottom area */}
      <DuckParade />

      {/* Chelsea NPC */}
      <ChelseaNPC />

      {/* Combo indicator */}
      <ComboIndicator />

      {/* Overlays */}
      <AnimatePresence>
        {phase === "paused" && <PauseOverlay />}
        {phase === "gameover" && <GameOverOverlay />}
        {phase === "victory" && <VictoryOverlay />}
      </AnimatePresence>

    </main>
  );
};
