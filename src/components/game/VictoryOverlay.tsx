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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,235,180,0.15), rgba(20,26,40,0.92))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 160, damping: 18 }}
    >
      {/* Victory sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`v-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: "3px",
              height: "3px",
              background: "rgba(255,240,190,0.6)",
              filter: "blur(1px)",
            }}
            animate={{
              y: ["0vh", "-5vh", "0vh"],
              opacity: [0.15, 0.6, 0.15],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content card */}
      <motion.div
        className="flex flex-col items-center max-w-[340px] w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-1 tracking-tight"
          style={{
            color: "#ffd97a",
            textShadow: "0 0 24px rgba(255,217,122,0.35)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          STAGE CLEAR!
        </motion.h2>

        <motion.p
          className="mb-1 text-xs font-medium tracking-wide"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Level {currentLevel} — {levelConfig?.name}
        </motion.p>

        <motion.p
          className="mb-5 text-xs text-center"
          style={{ color: "rgba(255,255,255,0.25)", maxWidth: "240px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          You lit up the lighthouse! The ducks are safe and warm.
        </motion.p>

        <StarRating stars={starResult.stars} animate />

        {/* Stats card */}
        <motion.div
          className="w-full mt-6 p-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Score</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{score.toLocaleString()}</span>
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Groups</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{groupsCompleted}/{totalGroups}</span>
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Max Combo</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{maxCombo}x</span>
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Ducks Rescued</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{ducksRescued}/{totalGroups}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-2.5 mt-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {hasNextLevel && (
            <motion.button
              onClick={handleNextLevel}
              className="w-full font-bold text-sm tracking-wide"
              style={{
                padding: "14px 28px",
                borderRadius: "999px",
                background: "linear-gradient(180deg, #ffe8af, #f0c860)",
                color: "#5a4a28",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 0 20px rgba(255,220,120,0.3), 0 4px 12px rgba(0,0,0,0.15)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,220,120,0.45), 0 4px 12px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
            >
              NEXT STAGE
            </motion.button>
          )}

          <motion.button
            onClick={handleReplay}
            className="w-full font-semibold text-sm tracking-wide"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "rgba(255,217,122,0.08)",
              border: "1px solid rgba(255,217,122,0.18)",
              color: "rgba(255,217,122,0.85)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,217,122,0.14)" }}
            whileTap={{ scale: 0.97 }}
          >
            {hasNextLevel ? "Replay" : "Play Again"}
          </motion.button>

          <motion.button
            onClick={() => { resetGame(); router.push("/"); }}
            className="w-full font-semibold text-sm"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            whileTap={{ scale: 0.97 }}
          >
            BACK TO MAP
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
