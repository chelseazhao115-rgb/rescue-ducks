"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { STORM_HIGH_THRESHOLD } from "@/constants/game";

export const StormMeter: React.FC = () => {
  const stormMeter = useGameStore((s) => s.stormMeter);
  const isFlashing = stormMeter > STORM_HIGH_THRESHOLD;
  const pct = Math.min(100, Math.max(0, stormMeter));

  // Color interpolation based on storm level
  const getBarColor = () => {
    if (stormMeter > 80) {
      return "linear-gradient(90deg, #c87070, #e09090)";
    }
    if (stormMeter > 50) {
      return "linear-gradient(90deg, #c8a070, #e0c090)";
    }
    return "linear-gradient(90deg, #7090c8, #90b0e0)";
  };

  return (
    <motion.div
      className="w-full px-4 pt-2"
      animate={
        isFlashing
          ? { opacity: [1, 0.85, 1] }
          : {}
      }
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-2 mb-1"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: stormMeter > 80 ? "rgba(232,144,144,0.7)" : "rgba(255,255,255,0.4)" }}
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span
          className="text-[10px] font-medium tracking-wider uppercase"
          style={{ color: stormMeter > 80 ? "rgba(232,144,144,0.7)" : "rgba(255,255,255,0.45)" }}
        >
          Storm
        </span>
        <span className="text-[10px] ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>
          {Math.round(pct)}%
        </span>
      </div>

      {/* Progress track */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: "6px",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: getBarColor(),
            boxShadow: stormMeter > 50
              ? "0 0 8px rgba(255,200,150,0.3)"
              : "0 0 8px rgba(150,180,255,0.25)",
          }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};
