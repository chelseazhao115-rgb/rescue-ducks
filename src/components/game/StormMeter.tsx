"use client";

import { motion } from "framer-motion";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useGameStore } from "@/store/gameStore";
import { STORM_HIGH_THRESHOLD } from "@/constants/game";

export interface StormMeterProps {
  value: number;
  maxValue: number;
}

export const StormMeter: React.FC = () => {
  const stormMeter = useGameStore((s) => s.stormMeter);
  const isFlashing = stormMeter > STORM_HIGH_THRESHOLD;

  return (
    <motion.div
      className="w-full px-4 pt-3"
      animate={
        isFlashing
          ? { borderColor: ["#ff6b6b", "#ff0000", "#ff6b6b"] }
          : {}
      }
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-white/50"
        >
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs text-white/60 font-medium">Storm</span>
      </div>
      <ProgressBar
        value={stormMeter}
        maxValue={100}
        colorClass={
          stormMeter > 80
            ? "bg-gradient-to-r from-red-600 to-red-400"
            : stormMeter > 50
              ? "bg-gradient-to-r from-orange-600 to-amber-400"
              : "bg-gradient-to-r from-blue-600 to-cyan-400"
        }
        height={8}
        animated={false}
      />
    </motion.div>
  );
};
