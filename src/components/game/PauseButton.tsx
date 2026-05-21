"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const PauseButton: React.FC = () => {
  const pauseGame = useGameStore((s) => s.pauseGame);
  const phase = useGameStore((s) => s.phase);

  if (phase !== "playing") return null;

  return (
    <motion.button
      onClick={pauseGame}
      className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center"
      style={{
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.6)",
      }}
      whileHover={{
        scale: 1.1,
        background: "rgba(255,255,255,0.14)",
        color: "rgba(255,255,255,0.9)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
      >
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    </motion.button>
  );
};
