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
    <div className="flex flex-col px-4 pt-3"
    >
      <div className="flex items-center justify-between"
      >
        {/* Score with glow */}
        <div className="flex items-center gap-3"
        >
          <motion.span
            className="text-xl font-bold"
            style={{
              color: "#ffd97a",
              textShadow: "0 0 12px rgba(255,217,122,0.35)",
            }}
            key={score}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2 }}
          >
            {score.toLocaleString()}
          </motion.span>

          {/* Group progress pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Groups
            </span>
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
              {groupsCompleted}/{totalGroups}
            </span>
          </div>
        </div>

        {/* Timer */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.55)" }}>
            {formatTime(remainingMs)}
          </span>
        </div>
      </div>

      {levelConfig && (
        <div className="flex items-center gap-2 mt-1"
        >
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            Lv.{levelConfig.levelId}
          </span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
            {levelConfig.name}
          </span>
        </div>
      )}
    </div>
  );
};
