"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { formatTime } from "@/lib/utils/timing";

export const ScoreDisplay: React.FC = () => {
  const score = useGameStore((s) => s.score);
  const groupsCompleted = useGameStore((s) => s.groupsCompleted);
  const totalGroups = useGameStore((s) => s.activeGroups.length);
  const remainingMs = useGameStore((s) => s.remainingMs);
  const levelConfig = useGameStore((s) => s.levelConfig);

  return (
    <div className="flex flex-col px-4 py-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            className="text-lg font-bold text-light-warm"
            key={score}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-white/40">
            {groupsCompleted}/{totalGroups} groups
          </span>
        </div>
        <div className="text-sm font-mono text-white/60">
          {formatTime(remainingMs)}
        </div>
      </div>
      {levelConfig && (
        <div className="flex items-center gap-2 -mt-0.5">
          <span className="text-[10px] text-white/30">
            Lv.{levelConfig.levelId}
          </span>
          <span className="text-[10px] text-white/20">
            {levelConfig.name}
          </span>
          {levelConfig.wordsPerGroup > 2 && (
            <span className="text-[10px] text-lighthouse-glow/30">
              {levelConfig.wordsPerGroup}-word chains
            </span>
          )}
        </div>
      )}
    </div>
  );
};
