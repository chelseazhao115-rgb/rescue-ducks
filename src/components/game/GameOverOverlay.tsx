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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-12"
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-0.5 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: "-5%",
              height: `${16 + Math.random() * 24}px`,
              background: "linear-gradient(to bottom, rgba(180,190,210,0.2), transparent)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 0.2, 0],
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
        className="flex flex-col items-center w-full"
        style={{ maxWidth: "calc(780px * var(--vscale, 1))" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <motion.h2
          className="font-extrabold mb-2 tracking-tight text-center text-white/90"
          style={{ fontSize: "calc(48px * var(--vscale, 1))", whiteSpace: "nowrap" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Storm Overwhelmed the Lighthouse
        </motion.h2>

        <motion.p
          className="mb-10 text-center text-white/70"
          style={{ fontSize: "calc(32px * var(--vscale, 1))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          The dusk deepened before the ducks made it home.
        </motion.p>

        <StarRating stars={starResult.stars} animate />

        <motion.div
          className="w-full mt-12 rounded-3xl"
          style={{
            padding: "calc(32px * var(--vscale, 1))",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-x-12 gap-y-4" style={{ fontSize: "calc(28px * var(--vscale, 1))" }}>
            <span className="text-right text-white/70">Score</span>
            <span className="text-white font-semibold">{score.toLocaleString()}</span>
            <span className="text-right text-white/70">Groups</span>
            <span className="text-white">{groupsCompleted}/{totalGroups}</span>
            <span className="text-right text-white/70">Max Combo</span>
            <span className="text-white">{maxCombo}x</span>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-5 mt-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => { resetGame(); router.push("/game"); }}
            className="w-full font-bold tracking-wide"
            style={{
              fontSize: "calc(28px * var(--vscale, 1))",
              padding: "calc(28px * var(--vscale, 1)) calc(56px * var(--vscale, 1))",
              borderRadius: "999px",
              background: "linear-gradient(180deg, #ffe8af, #f0c860)",
              color: "#5a4a28",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 0 40px rgba(255,220,120,0.25), 0 8px 24px rgba(0,0,0,0.15)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(255,220,120,0.4), 0 8px 24px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.97 }}
          >
            RETRY
          </motion.button>

          <motion.button
            onClick={() => { localStorage.removeItem("rescueDuckSelectedLevel"); resetGame(); router.push("/"); }}
            className="w-full font-semibold text-white/70"
            style={{
              fontSize: "calc(28px * var(--vscale, 1))",
              padding: "calc(24px * var(--vscale, 1)) calc(56px * var(--vscale, 1))",
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
