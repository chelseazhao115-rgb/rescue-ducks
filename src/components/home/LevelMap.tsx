"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CURRICULUM, TOTAL_LEVELS, getLevelsInStage } from "@/lib/engine/LevelGenerator";

export interface LevelMapProps {
  onSelectLevel: (levelId: number) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({ onSelectLevel }) => {
  const router = useRouter();
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const getHighestUnlocked = (): number => {
    if (typeof window === "undefined") return 1;
    const saved = localStorage.getItem("rescueDuckGlobalLevel");
    return saved ? parseInt(saved, 10) : 1;
  };

  const highestUnlocked = getHighestUnlocked();

  let globalLevelOffset = 0;
  const stageRanges = CURRICULUM.map((s) => {
    const count = getLevelsInStage(s.id);
    const start = globalLevelOffset + 1;
    const end = globalLevelOffset + count;
    globalLevelOffset += count;
    return { ...s, start, end, levelsCount: count };
  });

  const currentStageRange = stageRanges[activeStageIdx];
  if (!currentStageRange) return null;
  const levelsInStage = currentStageRange.levelsCount;

  const handleLevelClick = (globalLevel: number) => {
    localStorage.setItem("rescueDuckGlobalLevel", String(globalLevel));
    onSelectLevel(globalLevel);
    router.push("/game");
  };

  const completedLevels = Math.max(0, highestUnlocked - 1);

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      {/* Stage tabs */}
      <div className="flex gap-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
        {stageRanges.map((stage, i) => {
          const isUnlocked = stage.start <= highestUnlocked;
          return (
            <button
              key={stage.name}
              onClick={() => isUnlocked && setActiveStageIdx(i)}
              disabled={!isUnlocked}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                i === activeStageIdx
                  ? "bg-lighthouse-glow/20 text-lighthouse-glow"
                  : isUnlocked
                    ? "text-white/40 hover:text-white/60"
                    : "text-white/15 cursor-not-allowed"
              }`}
            >
              {stage.name}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-white/30">
        {currentStageRange.subtitle} — {currentStageRange.description}
      </p>

      {/* Chapter tags */}
      <div className="flex gap-1 flex-wrap justify-center">
        {currentStageRange.chapters.map((ch) => (
          <span
            key={ch.id}
            className="px-2 py-0.5 rounded text-[10px] text-white/25 bg-white/5"
          >
            {ch.name}
          </span>
        ))}
      </div>

      {/* Level grid */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-[320px]">
        <AnimatePresence mode="wait">
          {Array.from({ length: levelsInStage }, (_, i) => {
            const levelInStage = i + 1;
            const globalLevel = currentStageRange.start + i;
            const unlocked = globalLevel <= highestUnlocked;
            const isLatest = globalLevel === highestUnlocked;
            const isCompleted = globalLevel < highestUnlocked;

            let chCursor = 0;
            let chapterName = "";
            for (const ch of currentStageRange.chapters) {
              if (levelInStage <= chCursor + ch.levelCount) {
                chapterName = ch.name;
                break;
              }
              chCursor += ch.levelCount;
            }

            return (
              <motion.button
                key={`${currentStageRange.id}-${levelInStage}`}
                onClick={() => unlocked && handleLevelClick(globalLevel)}
                disabled={!unlocked}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.03 }}
                className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center gap-0.5
                  ${unlocked
                    ? isLatest
                      ? "border-lighthouse-glow/40 bg-lighthouse-glow/10 hover:bg-lighthouse-glow/20 cursor-pointer"
                      : isCompleted
                        ? "border-white/20 bg-white/8 hover:bg-white/12 cursor-pointer"
                        : "border-white/15 bg-white/5 hover:bg-white/10 cursor-pointer"
                    : "border-white/5 bg-white/[0.02] cursor-not-allowed opacity-40"
                  }`}
                whileHover={unlocked ? { scale: 1.08 } : undefined}
                whileTap={unlocked ? { scale: 0.95 } : undefined}
              >
                <span className={`text-sm font-bold ${unlocked ? "text-white/80" : "text-white/30"}`}>
                  {globalLevel}
                </span>
                {unlocked && chapterName ? (
                  <span className="text-[8px] text-white/30 truncate max-w-full px-1">
                    {chapterName}
                  </span>
                ) : !unlocked ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/20">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" />
                  </svg>
                ) : null}
                {isLatest && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lighthouse-glow"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[320px]">
        <div className="flex justify-between text-[10px] text-white/30 mb-1">
          <span>Journey Progress</span>
          <span>{completedLevels}/{TOTAL_LEVELS}</span>
        </div>
        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-lighthouse-glow/50"
            animate={{ width: `${(completedLevels / TOTAL_LEVELS) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};
