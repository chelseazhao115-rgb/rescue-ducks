"use client";

import { motion } from "framer-motion";
import { FiPause } from "react-icons/fi";
import { useGameStore } from "@/store/gameStore";

export const PauseButton: React.FC = () => {
  const pauseGame = useGameStore((s) => s.pauseGame);
  const phase = useGameStore((s) => s.phase);

  if (phase !== "playing") return null;

  return (
    <motion.button
      onClick={pauseGame}
      className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center
                 rounded-full bg-white/10 backdrop-blur-sm border border-white/10
                 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FiPause size={18} />
    </motion.button>
  );
};
