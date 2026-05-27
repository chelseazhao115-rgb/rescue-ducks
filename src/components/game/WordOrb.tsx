"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface WordOrbProps {
  orbId: string;
  word: string;
  meaning: string;
  connectionLabel: string;
  groupId: string;
  status: "idle" | "selected" | "chained" | "matched" | "wrong";
  showMeaning: boolean;
  position: { x: number; y: number };
  onTap: (orbId: string) => void;
  onPeek: (orbId: string) => void;
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
      "radial-gradient(circle at 30% 30%, rgba(185,217,255,0.52), rgba(185,217,255,0.16))",
    orbBorder: "rgba(185,217,255,0.4)",
    textColor: "#ffffff",
    glowColor: "rgba(185,217,255,0.3)",
    shadow: "0 0 20px rgba(185,217,255,0.25), inset 0 0 12px rgba(255,255,255,0.14)",
  },
  selected: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(255,232,168,0.68), rgba(255,232,168,0.22))",
    orbBorder: "rgba(255,232,168,0.55)",
    textColor: "#ffffff",
    glowColor: "rgba(255,232,168,0.55)",
    shadow:
      "0 0 30px rgba(255,232,168,0.45), 0 0 60px rgba(255,232,168,0.25), inset 0 0 16px rgba(255,255,255,0.25)",
  },
  chained: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(255,217,122,0.68), rgba(255,217,122,0.22))",
    orbBorder: "rgba(255,217,122,0.55)",
    textColor: "#ffffff",
    glowColor: "rgba(255,217,122,0.6)",
    shadow:
      "0 0 30px rgba(255,217,122,0.5), 0 0 60px rgba(255,217,122,0.26), inset 0 0 16px rgba(255,255,255,0.25)",
  },
  matched: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(255,232,168,0.78), rgba(255,232,168,0.32))",
    orbBorder: "rgba(255,232,168,0.6)",
    textColor: "#ffffff",
    glowColor: "rgba(255,232,168,0.7)",
    shadow:
      "0 0 40px rgba(255,232,168,0.6), 0 0 80px rgba(255,232,168,0.35), inset 0 0 20px rgba(255,255,255,0.35)",
  },
  wrong: {
    orbBg:
      "radial-gradient(circle at 30% 30%, rgba(246,216,232,0.42), rgba(246,216,232,0.14))",
    orbBorder: "rgba(246,216,232,0.35)",
    textColor: "#ffffff",
    glowColor: "rgba(246,216,232,0.25)",
    shadow: "0 0 16px rgba(246,216,232,0.22)",
  },
};

export const WordOrb: React.FC<WordOrbProps> = ({
  orbId,
  word,
  meaning,
  connectionLabel,
  status,
  showMeaning,
  position,
  onTap,
  onPeek,
}) => {
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerUpAtRef = useRef(0);
  const isMatched = status === "matched";
  const isWrong = status === "wrong";
  const isSelected = status === "selected" || status === "chained";
  const styles = STATUS_STYLES[status];

  const chars = word.length;
  const hasSpaces = word.trim().includes(" ");
  const needsWrap = chars > 10 || hasSpaces;
  const orbSizePx = needsWrap
    ? Math.min(350, 130 + (chars - 7) * 14)
    : chars <= 7
      ? 123
      : Math.min(223, 123 + (chars - 7) * 9);
  const fontSize = hasSpaces ? 26 : chars > 20 ? 23 : chars > 10 ? 28 : 31;
  const orbSize = `calc(${orbSizePx}px * var(--vscale, 1))`;
  const glowRingSize = `calc(${orbSizePx + 16}px * var(--vscale, 1))`;
  const glowRing2Size = `calc(${orbSizePx + 8}px * var(--vscale, 1))`;
  const highlightW = `calc(${orbSizePx * 0.6}px * var(--vscale, 1))`;
  const highlightH = `calc(${orbSizePx * 0.35}px * var(--vscale, 1))`;

  const clearTapTimer = () => {
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
      tapTimerRef.current = null;
    }
  };

  const handlePointerUp = () => {
    const now = window.performance.now();
    if (now - lastPointerUpAtRef.current < 320) {
      clearTapTimer();
      lastPointerUpAtRef.current = 0;
      onPeek(orbId);
      return;
    }

    lastPointerUpAtRef.current = now;
    clearTapTimer();
    tapTimerRef.current = setTimeout(() => {
      onTap(orbId);
      tapTimerRef.current = null;
    }, 230);
  };

  return (
    <motion.button
      data-orb-id={orbId}
      onPointerUp={handlePointerUp}
      onDoubleClick={(event) => {
        event.preventDefault();
        clearTapTimer();
        onPeek(orbId);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onTap(orbId);
        }
      }}
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
            width: glowRingSize,
            height: glowRingSize,
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
            width: glowRing2Size,
            height: glowRing2Size,
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
            width: highlightW,
            height: highlightH,
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
          className={`relative font-semibold text-center px-3 leading-tight ${needsWrap && hasSpaces ? "" : "whitespace-nowrap"}`}
          style={{
            fontSize: `calc(${fontSize}px * var(--vscale, 1))`,
            color: styles.textColor,
            textShadow: `0 0 12px ${styles.glowColor}`,
            ...(needsWrap && hasSpaces
              ? {
                  maxWidth: `calc(${orbSizePx * 0.78}px * var(--vscale, 1))`,
                  display: "inline-block" as const,
                  whiteSpace: "normal" as const,
                }
              : {}),
          }}
        >
          {word}
        </span>
      </div>

      {/* Chinese meaning tooltip */}
      <AnimatePresence>
        {showMeaning && meaning && (
          <motion.span
            className="absolute -bottom-7 left-1/2 -translate-x-1/2
                       text-white/70 backdrop-blur-md rounded-full px-2.5 py-0.5
                       whitespace-nowrap pointer-events-none"
            style={{
              fontSize: "calc(18px * var(--vscale, 1))",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {connectionLabel} · {meaning}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
