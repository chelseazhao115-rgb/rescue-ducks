"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { LEVELS } from "@/lib/data/levels";
import { StarRating } from "./StarRating";
import { calcStarRating } from "@/lib/engine/ScoringSystem";

export const VictoryOverlay: React.FC = () => {
  const resetGame = useGameStore((s) => s.resetGame);
  const score = useGameStore((s) => s.score);
  const maxCombo = useGameStore((s) => s.maxCombo);
  const groupsCompleted = useGameStore((s) => s.groupsCompleted);
  const totalGroups = useGameStore((s) => s.activeGroups.length);
  const ducksRescued = useGameStore((s) => s.ducks.filter((d) => d.rescued).length);
  const levelConfig = useGameStore((s) => s.levelConfig);
  const router = useRouter();

  const starResult = calcStarRating(useGameStore.getState());
  const currentLevel = levelConfig?.levelId ?? 1;
  const hasNextLevel = currentLevel < LEVELS.length;
  const nextLevel = currentLevel + 1;

  const handleNextLevel = () => {
    if (hasNextLevel) {
      localStorage.setItem("rescueDuckLevel", String(nextLevel));
    }
    resetGame();
    router.push("/game");
  };

  const handleReplay = () => {
    resetGame();
    router.push("/game");
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center
                 bg-storm-dark/85 backdrop-blur-md px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.h2
        className="text-3xl font-bold text-lighthouse-glow mb-2 drop-shadow-[0_0_20px_rgba(245,214,123,0.4)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Lighthouse Relit!
      </motion.h2>

      <motion.p
        className="text-white/40 mb-1 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Level {currentLevel} — {levelConfig?.name}
      </motion.p>

      <motion.p
        className="text-white/30 mb-6 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        The storm has passed. The ducks are safe.
      </motion.p>

      <StarRating stars={starResult.stars} animate />

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
        <span className="text-white/40 text-right">Ducks Rescued</span>
        <span className="text-white/80">
          {ducksRescued}/{totalGroups}
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {hasNextLevel && (
          <motion.button
            onClick={handleNextLevel}
            className="px-8 py-3 rounded-full bg-lighthouse-glow/30 border border-lighthouse-glow/50
                       text-lighthouse-glow font-semibold hover:bg-lighthouse-glow/40 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Level {nextLevel}: {LEVELS[nextLevel - 1]?.name}
          </motion.button>
        )}

        <motion.button
          onClick={handleReplay}
          className="px-8 py-3 rounded-full bg-lighthouse-glow/20 border border-lighthouse-glow/40
                     text-lighthouse-glow font-semibold hover:bg-lighthouse-glow/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {hasNextLevel ? "Replay" : "Play Again"}
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
