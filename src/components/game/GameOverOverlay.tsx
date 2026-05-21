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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(circle at center, rgba(80,90,130,0.2), rgba(15,20,35,0.95))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Subtle rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-px rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: "-5%",
              height: `${8 + Math.random() * 12}px`,
              background: "linear-gradient(to bottom, rgba(180,190,210,0.15), transparent)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center max-w-[340px] w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-extrabold mb-1 tracking-tight text-center"
          style={{ color: "#8890c8" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Storm Overwhelmed
          <br />
          the Lighthouse
        </motion.h2>

        <motion.p
          className="mb-5 text-xs text-center"
          style={{ color: "rgba(255,255,255,0.25)", maxWidth: "240px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          The dusk deepened before the ducks made it home.
        </motion.p>

        <StarRating stars={starResult.stars} animate />

        {/* Stats card */}
        <motion.div
          className="w-full mt-6 p-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Score</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{score.toLocaleString()}</span>
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Groups</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{groupsCompleted}/{totalGroups}</span>
            <span className="text-right" style={{ color: "rgba(255,255,255,0.3)" }}>Max Combo</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{maxCombo}x</span>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-2.5 mt-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => { resetGame(); router.push("/game"); }}
            className="w-full font-bold text-sm tracking-wide"
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              background: "linear-gradient(180deg, #ffe8af, #f0c860)",
              color: "#5a4a28",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 0 20px rgba(255,220,120,0.25), 0 4px 12px rgba(0,0,0,0.15)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,220,120,0.4), 0 4px 12px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.97 }}
          >
            RETRY
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
