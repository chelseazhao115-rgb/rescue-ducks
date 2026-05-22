"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface WordOrbProps {
  orbId: string;
  word: string;
  meaning: string;
  groupId: string;
  status: "idle" | "selected" | "chained" | "matched" | "wrong";
  showMeaning: boolean;
  position: { x: number; y: number };
  onTap: (orbId: string) => void;
}

const STATUS_STYLES: Record<
  WordOrbProps["status"],
  {
    orbBg: string;
    orbBorder: string;
    textColor: string;
    glowColor: string;
    shadow: string;
  }
> = {
  idle: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(185,217,255,0.35), rgba(185,217,255,0.08))",
    orbBorder: "rgba(185,217,255,0.25)",
    textColor: "#c8dff8",
    glowColor: "rgba(185,217,255,0.2)",
    shadow: "0 0 20px rgba(185,217,255,0.15), inset 0 0 12px rgba(255,255,255,0.1)",
  },
  selected: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(255,232,168,0.5), rgba(255,232,168,0.12))",
    orbBorder: "rgba(255,232,168,0.45)",
    textColor: "#ffe8a8",
    glowColor: "rgba(255,232,168,0.45)",
    shadow:
      "0 0 30px rgba(255,232,168,0.35), 0 0 60px rgba(255,232,168,0.15), inset 0 0 16px rgba(255,255,255,0.2)",
  },
  chained: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(255,217,122,0.5), rgba(255,217,122,0.12))",
    orbBorder: "rgba(255,217,122,0.45)",
    textColor: "#ffd97a",
    glowColor: "rgba(255,217,122,0.5)",
    shadow:
      "0 0 30px rgba(255,217,122,0.4), 0 0 60px rgba(255,217,122,0.18), inset 0 0 16px rgba(255,255,255,0.2)",
  },
  matched: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(255,232,168,0.6), rgba(255,232,168,0.2))",
    orbBorder: "rgba(255,232,168,0.5)",
    textColor: "#fff2cf",
    glowColor: "rgba(255,232,168,0.6)",
    shadow:
      "0 0 40px rgba(255,232,168,0.5), 0 0 80px rgba(255,232,168,0.25), inset 0 0 20px rgba(255,255,255,0.3)",
  },
  wrong: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(246,216,232,0.25), rgba(246,216,232,0.06))",
    orbBorder: "rgba(246,216,232,0.2)",
    textColor: "#e8c8d8",
    glowColor: "rgba(246,216,232,0.15)",
    shadow: "0 0 16px rgba(246,216,232,0.12)",
  },
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
  const styles = STATUS_STYLES[status];

  // Orb size varies slightly for organic feel
  const orbSize = 72;

  return (
    <motion.button
      onClick={() => onTap(orbId)}
      className="absolute flex flex-col items-center justify-center cursor-pointer tap-target"
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isSelected ? 10 : 1,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isMatched
          ? { scale: 1.6, opacity: 0 }
          : isWrong
            ? {
                x: [0, -6, 6, -4, 4, 0],
                scale: 1,
                opacity: 1,
                y: [0, -4, 0],
              }
            : {
                scale: isSelected ? 1.12 : 1,
                opacity: 1,
                y: [0, -6, 0],
              }
      }
      exit={{ scale: 1.6, opacity: 0 }}
      transition={
        isMatched
          ? { duration: 0.4, ease: "easeOut" }
          : isWrong
            ? { duration: 0.5 }
            : {
                scale: { type: "spring", stiffness: 160, damping: 16 },
                opacity: { duration: 0.5, ease: "easeOut" },
                y: { duration: 6, ease: "easeInOut", repeat: Infinity },
              }
      }
    >
      {/* Outer glow ring on selection */}
      {isSelected && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: orbSize + 16,
            height: orbSize + 16,
            border: `1.5px solid ${styles.glowColor}`,
          }}
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Secondary pulse ring */}
      {isSelected && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: orbSize + 8,
            height: orbSize + 8,
            border: `1px solid ${styles.glowColor}`,
          }}
          initial={{ scale: 1, opacity: 0.2 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
        />
      )}

      {/* Main orb bubble */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: orbSize,
          height: orbSize,
          background: styles.orbBg,
          border: `1.5px solid ${styles.orbBorder}`,
          boxShadow: styles.shadow,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: orbSize * 0.6,
            height: orbSize * 0.35,
            top: "12%",
            left: "15%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.2), transparent)",
            filter: "blur(4px)",
            pointerEvents: "none",
          }}
        />

        {/* Word text */}
        <span
          className="relative font-semibold text-sm text-center px-2 leading-tight"
          style={{
            color: styles.textColor,
            textShadow: `0 0 12px ${styles.glowColor}`,
            wordBreak: "break-word",
            maxWidth: orbSize - 12,
          }}
        >
          {word}
        </span>
      </div>

      {/* Chinese meaning tooltip */}
      <AnimatePresence>
        {showMeaning && meaning && (
          <motion.span
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs
                       text-white/50 backdrop-blur-md rounded-full px-2.5 py-0.5
                       whitespace-nowrap pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {meaning}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
