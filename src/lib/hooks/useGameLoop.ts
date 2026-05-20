"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export function useGameInit(levelId: number): void {
  const startGame = useGameStore((s) => s.startGame);
  const phase = useGameStore((s) => s.phase);

  useEffect(() => {
    if (phase === "menu") {
      startGame(levelId);
    }
  }, [phase, levelId, startGame]);
}
