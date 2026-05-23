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
    <div className="flex flex-col px-4 pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            className="font-bold"
            style={{
              fontSize: "30px",
              color: "#ffd97a",
              textShadow: "0 0 12px rgba(255,217,122,0.35)",
            }}
            key={score}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2 }}
          >
            {score.toLocaleString()}
          </motion.span>

          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span className="text-[15px] text-white/70">Groups</span>
            <span className="font-semibold text-white" style={{fontSize:"18px"}}>{groupsCompleted}/{totalGroups}</span>
          </div>
        </div>

        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-mono text-white" style={{fontSize:"18px"}}>{formatTime(remainingMs)}</span>
        </div>
      </div>

      {levelConfig && (
        <div className="flex items-center gap-2 mt-1">
          <span style={{fontSize:"15px"}} className="text-white/60">Lv.{levelConfig.levelId}</span>
          <span style={{fontSize:"15px"}} className="text-white/50">{levelConfig.name}</span>
        </div>
      )}
    </div>
  );
};
