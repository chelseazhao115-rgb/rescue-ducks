"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { StarRating } from "./StarRating";
import { calcStarRating } from "@/lib/engine/ScoringSystem";

export const GameOverOverlay: React.FC = () => {
  const resetGame = useGameStore((s) => s.resetGame);
  const score = useGameStore((s) => s.score);
  const maxCombo = useGameStore((s) => s.maxCombo);
  const groupsCompleted = useGameStore((s) => s.groupsCompleted);
  const totalGroups = useGameStore((s) => s.activeGroups.length);
  const router = useRouter();

  const starResult = calcStarRating(useGameStore.getState());

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center
                 bg-storm-dark/90 backdrop-blur-md px-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-bold text-red-400 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Storm Took the Lighthouse
      </motion.h2>

      <motion.p
        className="text-white/40 mb-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        The storm grew too strong...
      </motion.p>

      <StarRating stars={starResult.stars} animate />

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <span className="text-white/40 text-right">Score</span>
        <span className="text-white/80">{score}</span>
        <span className="text-white/40 text-right">Groups</span>
        <span className="text-white/80">
          {groupsCompleted}/{totalGroups}
        </span>
        <span className="text-white/40 text-right">Max Combo</span>
        <span className="text-white/80">{maxCombo}x</span>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={() => {
            resetGame();
            router.push("/game");
          }}
          className="px-8 py-3 rounded-full bg-lighthouse-glow/20 border border-lighthouse-glow/40
                     text-lighthouse-glow font-semibold hover:bg-lighthouse-glow/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Try Again
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
        >
          Back to Menu
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
