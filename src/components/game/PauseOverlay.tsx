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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "rgba(15,20,35,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="flex flex-col items-center max-w-[300px] w-full px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.h2
          className="text-2xl font-extrabold mb-8 tracking-tight"
          style={{
            color: "rgba(255,255,255,0.8)",
            textShadow: "0 0 20px rgba(255,255,255,0.1)",
          }}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          PAUSED
        </motion.h2>

        <div className="flex flex-col gap-2.5 w-full">
          <motion.button
            onClick={resumeGame}
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            RESUME
          </motion.button>

          <motion.button
            onClick={() => { resetGame(); router.push("/game"); }}
            className="w-full font-semibold text-sm"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "rgba(255,217,122,0.08)",
              border: "1px solid rgba(255,217,122,0.18)",
              color: "rgba(255,217,122,0.85)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,217,122,0.14)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            RESTART
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            QUIT TO MENU
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
