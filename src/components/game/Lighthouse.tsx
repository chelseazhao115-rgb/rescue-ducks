"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

/**
 * Lighthouse glow overlay — renders golden halos and a progress ring
 * on top of the background image's built-in lighthouse.
 */
export const Lighthouse: React.FC = () => {
  const brightness = useGameStore((s) => s.lighthouseBrightness);
  const correctMatches = useGameStore((s) => s.correctMatches);
  const matchSpark = Math.min(0.15, correctMatches * 0.005);
  const phase = useGameStore((s) => s.phase);
  const isVictory = phase === "victory";
  const progressPct = Math.round(brightness);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        // Position the glow centre over the background lighthouse lantern
        right: "calc(16% + 42px)",
        top: "23%",
        transform: "translate(50%, -50%)",
      }}
    >
      {/* ===== GLOW HALOS ===== */}

      {/* Outer halo — large soft golden glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "200px",
          height: "200px",
          left: "-100px",
          top: "-100px",
          background:
            "radial-gradient(circle, rgba(255,220,130,0.7) 0%, rgba(255,190,100,0.35) 40%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          scale: isVictory ? [1, 1.15, 1] : [1, 1.06, 1],
          opacity: isVictory
            ? [0.75, 1, 0.75]
            : [0.65 + brightness * 0.0035, 0.85 + brightness * 0.0015, 0.65 + brightness * 0.0035],
        }}
        transition={{
          duration: isVictory ? 2 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium halo — more concentrated */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "120px",
          height: "120px",
          left: "-60px",
          top: "-60px",
          background:
            "radial-gradient(circle, rgba(255,240,170,0.85) 0%, rgba(255,215,120,0.5) 30%, transparent 65%)",
          filter: "blur(5px)",
        }}
        animate={{
          scale: isVictory ? [1, 1.1, 1] : [1, 1.05, 1],
          opacity: isVictory
            ? [0.8, 1, 0.8]
            : [0.7 + brightness * 0.003, 0.88 + brightness * 0.0012, 0.7 + brightness * 0.003],
        }}
        transition={{
          duration: isVictory ? 2.2 : 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Inner core — bright centre on the lantern */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70px",
          height: "70px",
          left: "-35px",
          top: "-35px",
          background:
            "radial-gradient(circle, rgba(255,250,210,0.95) 0%, rgba(255,230,150,0.65) 25%, transparent 60%)",
        }}
        animate={{
          scale: isVictory ? [1, 1.08, 1] : [1, 1.04, 1],
          opacity: isVictory
            ? [0.85, 1, 0.85]
            : [0.75 + brightness * 0.0025 + matchSpark, 0.92 + brightness * 0.0008 + matchSpark, 0.75 + brightness * 0.0025 + matchSpark],
        }}
        transition={{
          duration: isVictory ? 1.8 : 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />

      {/* ===== PROGRESS RING + PERCENTAGE ===== */}
      <motion.div
        className="absolute flex flex-col items-center"
        style={{
          left: "50%",
          top: "-150px",
          transform: "translateX(-50%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Circular progress ring */}
        <svg
          width="70"
          height="70"
          viewBox="0 0 40 40"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="url(#lhGlowGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 16}`}
            strokeDashoffset={`${2 * Math.PI * 16 * (1 - brightness / 100)}`}
            style={{
              filter: `drop-shadow(0 0 5px rgba(255,217,122,${0.3 + brightness * 0.006}))`,
            }}
            animate={{
              strokeDashoffset: `${2 * Math.PI * 16 * (1 - brightness / 100)}`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="lhGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd97a" />
              <stop offset="100%" stopColor="#ffe8a8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage */}
        <span
          className="font-extrabold mt-0.5"
          style={{
            fontSize: "calc(30px * var(--vscale, 1))",
            color: "#ffd97a",
            textShadow:
              "0 0 16px rgba(255,217,122,0.5), 0 0 32px rgba(255,200,100,0.25)",
          }}
        >
          {progressPct}%
        </span>
      </motion.div>
    </div>
  );
};
