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
    <div className="flex flex-col items-center gap-3 px-4">
      {/* Stage tabs */}
      <div
        className="flex gap-1.5 rounded-full p-1.5 backdrop-blur-sm"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {stageRanges.map((stage, i) => {
          const isUnlocked = stage.start <= highestUnlocked;
          return (
            <button
              key={stage.name}
              onClick={() => isUnlocked && setActiveStageIdx(i)}
              disabled={!isUnlocked}
              className="px-4 py-2 rounded-full font-medium transition-colors"
              style={{
                fontSize: "calc(22px * var(--vscale, 1))",
                background:
                  i === activeStageIdx
                    ? "rgba(255,217,122,0.25)"
                    : "transparent",
                color:
                  i === activeStageIdx
                    ? "#ffd97a"
                    : isUnlocked
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.2)",
              }}
            >
              {stage.name}
            </button>
          );
        })}
      </div>

      {/* Stage subtitle */}
      <p className="text-center" style={{ fontSize: "calc(22px * var(--vscale, 1))", color: "rgba(255,255,255,0.7)" }}>
        {currentStageRange.subtitle} — {currentStageRange.description}
      </p>

      {/* Chapter tags */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {currentStageRange.chapters.map((ch) => (
          <span
            key={ch.id}
            className="px-3 py-0.5 rounded"
            style={{
              fontSize: "calc(18px * var(--vscale, 1))",
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            {ch.name}
          </span>
        ))}
      </div>

      {/* Level grid */}
      <div
        className="grid grid-cols-4 gap-3 w-full"
        style={{ maxWidth: "calc(480px * var(--vscale, 1))" }}
      >
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
                className="relative aspect-square rounded-xl border flex flex-col items-center justify-center gap-0.5"
                style={
                  unlocked
                    ? isLatest
                      ? {
                          borderColor: "rgba(255,217,122,0.5)",
                          background: "rgba(255,217,122,0.12)",
                          cursor: "pointer",
                        }
                      : isCompleted
                        ? {
                            borderColor: "rgba(255,255,255,0.25)",
                            background: "rgba(255,255,255,0.1)",
                            cursor: "pointer",
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.06)",
                            cursor: "pointer",
                          }
                    : {
                        borderColor: "rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                        cursor: "not-allowed",
                        opacity: 0.4,
                      }
                }
                whileHover={unlocked ? { scale: 1.08 } : undefined}
                whileTap={unlocked ? { scale: 0.95 } : undefined}
              >
                <span
                  className="font-bold"
                  style={{
                    fontSize: "calc(27px * var(--vscale, 1))",
                    color: unlocked
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {globalLevel}
                </span>
                {unlocked && chapterName ? (
                  <span
                    className="text-center truncate max-w-full px-1"
                    style={{ fontSize: "calc(16px * var(--vscale, 1))", color: "rgba(255,255,255,0.6)" }}
                  >
                    {chapterName}
                  </span>
                ) : !unlocked ? (
                  <svg width="calc(18px * var(--vscale, 1))" height="calc(18px * var(--vscale, 1))" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "rgba(255,255,255,0.15)" }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" />
                  </svg>
                ) : null}
                {isLatest && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ background: "#ffd97a" }}
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
      <div className="w-full" style={{ maxWidth: "calc(480px * var(--vscale, 1))" }}>
        <div className="flex justify-between mb-1.5" style={{ fontSize: "calc(21px * var(--vscale, 1))", color: "rgba(255,255,255,0.7)" }}>
          <span>Journey Progress</span>
          <span>{completedLevels}/{TOTAL_LEVELS}</span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "rgba(255,217,122,0.6)" }}
            animate={{ width: `${(completedLevels / TOTAL_LEVELS) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};
