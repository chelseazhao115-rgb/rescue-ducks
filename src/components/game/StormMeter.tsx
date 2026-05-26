"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { STORM_HIGH_THRESHOLD } from "@/constants/game";

function StormIcon({ danger }: { danger: boolean }) {
  const glowColor = danger ? "rgba(232,144,144,0.48)" : "rgba(170,190,230,0.34)";
  const strokeColor = danger ? "#f0aaaa" : "#d9e4ff";
  const rainColor = danger ? "#e8b6b6" : "#aebfe8";

  return (
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      animate={danger ? { opacity: [0.82, 1, 0.82], scale: [1, 1.05, 1] } : { opacity: [0.78, 0.95, 0.78] }}
      transition={{ duration: danger ? 1.1 : 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
    >
      <path
        d="M9.5 18.5h12.2c3 0 5.3-2 5.3-4.8 0-2.7-2.1-4.7-4.7-4.7-.8-3-3.4-5-6.6-5-3.5 0-6.3 2.2-7 5.3-2.4.4-4.3 2.3-4.3 4.7 0 2.6 2.1 4.5 5.1 4.5Z"
        fill="rgba(172,188,224,0.18)"
        stroke={strokeColor}
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M12 23.5c1.2-1.3 2.2-2.6 3-4"
        stroke={rainColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ opacity: [0.25, 0.75, 0.25], y: [0, 1.5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M19 24.5c1.1-1.2 2-2.5 2.7-3.8"
        stroke={rainColor}
        strokeWidth="1.45"
        strokeLinecap="round"
        animate={{ opacity: [0.2, 0.62, 0.2], y: [0, 1.8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
      />
      <motion.path
        d="M17.2 10.6l-2.6 4.2h3.2l-1.9 4"
        stroke={danger ? "#ffe0b4" : "#fff1c8"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: danger ? [0.4, 1, 0.36] : [0.18, 0.42, 0.18] }}
        transition={{ duration: danger ? 0.9 : 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export const StormMeter: React.FC = () => {
  const stormMeter = useGameStore((s) => s.stormMeter);
  const isFlashing = stormMeter > STORM_HIGH_THRESHOLD;
  const pct = Math.min(100, Math.max(0, stormMeter));

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
      className="mr-7 w-[170px] max-w-[calc(100vw-88px)] px-0 pt-2"
      animate={isFlashing ? { opacity: [1, 0.85, 1] } : {}}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <StormIcon danger={stormMeter > 80} />
        <span
          className="font-medium tracking-wider uppercase text-white/80"
          style={{fontSize:"15px"}}
        >
          Storm
        </span>
        <span className="ml-auto text-white/70" style={{fontSize:"15px"}}>
          {Math.round(pct)}%
        </span>
      </div>

      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: "6px",
          background: "rgba(255,255,255,0.1)",
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
