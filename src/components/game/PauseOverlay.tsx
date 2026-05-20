"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";

export const PauseOverlay: React.FC = () => {
  const resumeGame = useGameStore((s) => s.resumeGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const router = useRouter();

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center
                 bg-storm-dark/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h2
        className="text-3xl font-bold text-white mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Paused
      </motion.h2>

      <div className="flex flex-col gap-3">
        <motion.button
          onClick={resumeGame}
          className="px-8 py-3 rounded-full bg-lighthouse-glow/20 border border-lighthouse-glow/40
                     text-lighthouse-glow font-semibold hover:bg-lighthouse-glow/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Resume
        </motion.button>

        <motion.button
          onClick={() => {
            resetGame();
            router.push("/");
          }}
          className="px-8 py-3 rounded-full bg-white/10 border border-white/10
                     text-white/60 font-semibold hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Quit to Menu
        </motion.button>
      </div>
    </motion.div>
  );
};
