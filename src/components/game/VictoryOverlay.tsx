"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import {
  CURRICULUM,
  getLevelsInStage,
  resetAntiRepetition,
  getSemanticProgress,
  TOTAL_LEVELS,
} from "@/lib/engine/LevelGenerator";
import { StarRating } from "./StarRating";
import { calcStarRating } from "@/lib/engine/ScoringSystem";

function computeNextGlobalLevel(
  currentStage: number,
  currentLevelInStage: number,
  hasNextLevelInStage: boolean,
  hasNextStage: boolean,
): number {
  let next = 0;
  for (const s of CURRICULUM) {
    const count = getLevelsInStage(s.id);
    if (s.id < currentStage) {
      next += count;
    } else if (s.id === currentStage) {
      next += hasNextLevelInStage ? currentLevelInStage + 1 : currentLevelInStage;
      break;
    }
  }
  if (!hasNextLevelInStage && hasNextStage) {
    next += 1;
  }
  return Math.min(next, TOTAL_LEVELS + 1);
}

export const VictoryOverlay: React.FC = () => {
  const resetGame = useGameStore((s) => s.resetGame);
  const score = useGameStore((s) => s.score);
  const maxCombo = useGameStore((s) => s.maxCombo);
  const groupsCompleted = useGameStore((s) => s.groupsCompleted);
  const totalGroups = useGameStore((s) => s.activeGroups.length);
  const ducksRescued = useGameStore((s) => s.ducks.filter((d) => d.rescued).length);
  const currentStage = useGameStore((s) => s.currentStage);
  const currentLevelInStage = useGameStore((s) => s.currentLevelInStage);
  const router = useRouter();

  const starResult = calcStarRating(useGameStore.getState());

  const levelsInThisStage = getLevelsInStage(currentStage);
  const hasNextLevelInStage = currentLevelInStage < levelsInThisStage;
  const hasNextStage = currentStage < CURRICULUM.length;

  const stage = CURRICULUM.find((s) => s.id === currentStage);
  const stageName = stage?.name ?? `Stage ${currentStage}`;

  const nextGlobalLevel = computeNextGlobalLevel(
    currentStage,
    currentLevelInStage,
    hasNextLevelInStage,
    hasNextStage,
  );

  // Compute current level's global number (for replay)
  let currentGlobalLevel = 0;
  for (const s of CURRICULUM) {
    const count = getLevelsInStage(s.id);
    if (s.id < currentStage) {
      currentGlobalLevel += count;
    } else if (s.id === currentStage) {
      currentGlobalLevel += currentLevelInStage;
      break;
    }
  }

  // Always advance game progress on victory, regardless of which button is clicked
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("rescueDuckGlobalLevel");
    const savedLevel = saved ? parseInt(saved, 10) : 1;
    if (nextGlobalLevel > savedLevel) {
      localStorage.setItem("rescueDuckGlobalLevel", String(nextGlobalLevel));
    }
  }, [nextGlobalLevel]);

  const updatedGlobalLevel =
    typeof window !== "undefined"
      ? (() => {
          const s = localStorage.getItem("rescueDuckGlobalLevel");
          return s ? parseInt(s, 10) : 1;
        })()
      : 1;
  const semanticProgress = getSemanticProgress(updatedGlobalLevel);

  const handleNextLevel = () => {
    localStorage.removeItem("rescueDuckSelectedLevel");
    resetGame();
    router.push("/game");
  };

  const handleReplay = () => {
    localStorage.setItem("rescueDuckSelectedLevel", String(currentGlobalLevel));
    resetGame();
    router.push("/game");
  };

  const handleBackToMap = () => {
    localStorage.removeItem("rescueDuckSelectedLevel");
    resetAntiRepetition();
    resetGame();
    router.push("/");
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-12 overflow-y-auto"
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
              width: "6px",
              height: "6px",
              background: "rgba(255,240,190,0.8)",
              filter: "blur(2px)",
            }}
            animate={{
              y: ["0vh", "-5vh", "0vh"],
              opacity: [0.3, 0.8, 0.3],
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

      <motion.div
        className="flex flex-col items-center w-full"
        style={{ maxWidth: "calc(680px * var(--vscale, 1))" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <motion.h2
          className="font-extrabold mb-1 tracking-tight"
          style={{
            fontSize: "calc(52px * var(--vscale, 1))",
            color: "#ffd97a",
            textShadow: "0 0 48px rgba(255,217,122,0.35)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          STAGE CLEAR!
        </motion.h2>

        <motion.p
          className="mb-2 font-medium tracking-wide text-white/80"
          style={{ fontSize: "calc(25px * var(--vscale, 1))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {stageName} — Level {currentLevelInStage} / {levelsInThisStage}
        </motion.p>

        <motion.p
          className="mb-3 text-center text-white/70"
          style={{ fontSize: "calc(23px * var(--vscale, 1))", maxWidth: "calc(480px * var(--vscale, 1))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {stage?.description ?? "You lit up the lighthouse!"}
        </motion.p>

        <StarRating stars={starResult.stars} animate />

        <motion.div
          className="w-full mt-6 rounded-3xl"
          style={{
            padding: "calc(24px * var(--vscale, 1))",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-2" style={{ fontSize: "calc(24px * var(--vscale, 1))" }}>
            <span className="text-right text-white/70">Score</span>
            <span className="text-white font-semibold">{score.toLocaleString()}</span>
            <span className="text-right text-white/70">Groups</span>
            <span className="text-white">{groupsCompleted}/{totalGroups}</span>
            <span className="text-right text-white/70">Max Combo</span>
            <span className="text-white">{maxCombo}x</span>
            <span className="text-right text-white/70">Ducks Rescued</span>
            <span className="text-white">{ducksRescued}/{totalGroups}</span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/15">
            <div className="flex justify-between mb-2 text-white/70" style={{ fontSize: "calc(21px * var(--vscale, 1))" }}>
              <span>Semantic Mastery</span>
              <span>{semanticProgress.groupsEncountered}/{semanticProgress.totalGroupsInCurriculum} groups</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #7EC8E3, #FFEAA7)" }}
                animate={{ width: `${semanticProgress.overallProgress * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-white/60" style={{ fontSize: "calc(21px * var(--vscale, 1))" }}>
              <span>Mastered: {semanticProgress.groupsMastered}</span>
              <span>Stage {currentStage}: {Math.round(semanticProgress.stageProgress * 100)}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 mt-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {(hasNextLevelInStage || hasNextStage) && (
            <motion.button
              onClick={handleNextLevel}
              className="w-full font-bold tracking-wide"
              style={{
                fontSize: "calc(24px * var(--vscale, 1))",
                padding: "calc(20px * var(--vscale, 1)) calc(48px * var(--vscale, 1))",
                borderRadius: "999px",
                background: "linear-gradient(180deg, #ffe8af, #f0c860)",
                color: "#5a4a28",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 0 40px rgba(255,220,120,0.3), 0 8px 24px rgba(0,0,0,0.15)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(255,220,120,0.45), 0 8px 24px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
            >
              {hasNextLevelInStage ? "NEXT LEVEL" : "NEXT STAGE"}
            </motion.button>
          )}

          <motion.button
            onClick={handleReplay}
            className="w-full font-semibold tracking-wide text-white/90"
            style={{
              fontSize: "calc(24px * var(--vscale, 1))",
              padding: "calc(20px * var(--vscale, 1)) calc(48px * var(--vscale, 1))",
              borderRadius: "999px",
              background: "rgba(255,217,122,0.1)",
              border: "1px solid rgba(255,217,122,0.2)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,217,122,0.18)" }}
            whileTap={{ scale: 0.97 }}
          >
            {(hasNextLevelInStage || hasNextStage) ? "Replay" : "Play Again"}
          </motion.button>

          <motion.button
            onClick={handleBackToMap}
            className="w-full font-semibold text-white/70"
            style={{
              fontSize: "calc(24px * var(--vscale, 1))",
              padding: "calc(20px * var(--vscale, 1)) calc(48px * var(--vscale, 1))",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.1)", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
          >
            BACK TO MAP
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
