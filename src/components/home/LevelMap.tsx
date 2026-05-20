"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LEVELS } from "@/lib/data/levels";

const STAGES = [
  { name: "Stage 1", subtitle: "2-Word Pairs", range: [1, 7] },
  { name: "Stage 2", subtitle: "2-Word Boost", range: [8, 14] },
  { name: "Stage 3", subtitle: "3-Word Chains", range: [15, 21] },
  { name: "Stage 4", subtitle: "Expert Chains", range: [22, 28] },
];

export interface LevelMapProps {
  onSelectLevel: (levelId: number) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({ onSelectLevel }) => {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState(0);

  const getHighestUnlocked = (): number => {
    if (typeof window === "undefined") return 1;
    const saved = localStorage.getItem("rescueDuckLevel");
    return saved ? parseInt(saved, 10) : 1;
  };

  const highestUnlocked = getHighestUnlocked();

  const handleLevelClick = (levelId: number) => {
    localStorage.setItem("rescueDuckLevel", String(levelId));
    onSelectLevel(levelId);
    router.push("/game");
  };

  const currentStage = STAGES[activeStage];

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      {/* Stage tabs */}
      <div className="flex gap-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
        {STAGES.map((stage, i) => (
          <button
            key={stage.name}
            onClick={() => setActiveStage(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              i === activeStage
                ? "bg-lighthouse-glow/20 text-lighthouse-glow"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            {stage.name}
          </button>
        ))}
      </div>

      {/* Stage subtitle */}
      <p className="text-xs text-white/30">{currentStage.subtitle}</p>

      {/* Level grid */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-[320px]">
        <AnimatePresence mode="wait">
          {Array.from(
            { length: currentStage.range[1] - currentStage.range[0] + 1 },
            (_, i) => {
              const levelId = currentStage.range[0] + i;
              const config = LEVELS[levelId - 1];
              const unlocked = levelId <= highestUnlocked;
              const isLatest = levelId === highestUnlocked;

              return (
                <motion.button
                  key={levelId}
                  onClick={() => unlocked && handleLevelClick(levelId)}
                  disabled={!unlocked}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.03 }}
                  className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center gap-0.5
                    ${unlocked
                      ? isLatest
                        ? "border-lighthouse-glow/40 bg-lighthouse-glow/10 hover:bg-lighthouse-glow/20 cursor-pointer"
                        : "border-white/15 bg-white/5 hover:bg-white/10 cursor-pointer"
                      : "border-white/5 bg-white/[0.02] cursor-not-allowed opacity-40"
                    }`}
                  whileHover={unlocked ? { scale: 1.08 } : undefined}
                  whileTap={unlocked ? { scale: 0.95 } : undefined}
                >
                  <span className={`text-sm font-bold ${unlocked ? "text-white/80" : "text-white/30"}`}>
                    {levelId}
                  </span>
                  {unlocked ? (
                    <span className="text-[9px] text-white/30 truncate max-w-full px-1">
                      {config.name}
                    </span>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-white/20"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" />
                    </svg>
                  )}
                  {isLatest && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lighthouse-glow"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            }
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[320px]">
        <div className="flex justify-between text-[10px] text-white/30 mb-1">
          <span>Progress</span>
          <span>{Math.min(highestUnlocked - 1, 28)}/28</span>
        </div>
        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-lighthouse-glow/50"
            animate={{ width: `${(Math.min(highestUnlocked - 1, 28) / 28) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};
