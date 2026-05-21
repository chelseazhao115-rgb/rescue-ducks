"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
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

export const GameScreen: React.FC = () => {
  const phase = useGameStore((s) => s.phase);
  const stormMeter = useGameStore((s) => s.stormMeter);
  const startGame = useGameStore((s) => s.startGame);
  const [showIntro, setShowIntro] = useState(false);
  const [introDone, setIntroDone] = useState(false);

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
      const saved = typeof window !== "undefined"
        ? localStorage.getItem("rescueDuckLevel")
        : null;
      const level = saved ? parseInt(saved, 10) : 1;
      startGame(level);
    }
  }, [introDone, phase, startGame]);

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

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between">
        <ScoreDisplay />
        <div className="flex flex-col items-end pt-2 pr-2 gap-1">
          <StormMeter />
          <PauseButton />
        </div>
      </div>

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
