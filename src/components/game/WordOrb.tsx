"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface WordOrbProps {
  orbId: string;
  word: string;
  meaning: string;
  groupId: number;
  status: "idle" | "selected" | "chained" | "matched" | "wrong";
  showMeaning: boolean;
  position: { x: number; y: number };
  onTap: (orbId: string) => void;
}

const STATUS_STYLES: Record<WordOrbProps["status"], string> = {
  idle: "border-orb-idle/40 bg-orb-idle/10 text-orb-idle shadow-[0_0_12px_rgba(110,181,255,0.3)]",
  selected:
    "border-orb-selected/60 bg-orb-selected/15 text-orb-selected shadow-[0_0_20px_rgba(255,232,160,0.5)]",
  chained:
    "border-orb-chained/60 bg-orb-chained/15 text-orb-chained shadow-[0_0_20px_rgba(255,209,102,0.5)]",
  matched: "border-lighthouse-glow/80 bg-lighthouse-glow/20 text-lighthouse-glow",
  wrong: "border-orb-wrong/60 bg-orb-wrong/15 text-orb-wrong",
};

export const WordOrb: React.FC<WordOrbProps> = ({
  orbId,
  word,
  meaning,
  status,
  showMeaning,
  position,
  onTap,
}) => {
  const isMatched = status === "matched";
  const isWrong = status === "wrong";
  const isSelected = status === "selected" || status === "chained";

  return (
    <motion.button
      onClick={() => onTap(orbId)}
      className="absolute rounded-full border-2 font-medium text-sm
                 backdrop-blur-sm cursor-pointer tap-target flex flex-col items-center justify-center"
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isMatched
          ? { scale: 1.5, opacity: 0 }
          : isWrong
            ? {
                x: [0, -6, 6, -3, 3, 0],
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
              }
            : {
                scale: isSelected ? 1.15 : 1,
                opacity: 1,
                y: [0, -8, 0],
              }
      }
      exit={{ scale: 1.5, opacity: 0 }}
      transition={
        isMatched
          ? { duration: 0.3, ease: "easeOut" }
          : isWrong
            ? { duration: 0.4 }
            : {
                scale: { type: "spring", stiffness: 200, damping: 20 },
                opacity: { duration: 0.4, ease: "easeOut" },
                y: { duration: 3, ease: "easeInOut", repeat: Infinity },
              }
      }
    >
      <span
        className={
          STATUS_STYLES[status] + " inline-block px-3 py-1.5 rounded-full"
        }
      >
        {word}
      </span>

      {/* Chinese meaning tooltip */}
      <AnimatePresence>
        {showMeaning && meaning && (
          <motion.span
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs
                       text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5
                       whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {meaning}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
