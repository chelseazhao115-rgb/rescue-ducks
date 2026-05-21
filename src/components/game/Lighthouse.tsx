"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const Lighthouse: React.FC = () => {
  const brightness = useGameStore((s) => s.lighthouseBrightness);
  const phase = useGameStore((s) => s.phase);
  const isVictory = phase === "victory";
  const progressPct = Math.round(brightness);

  // Tower dimensions
  const towerTopW = 56;
  const towerBotW = 84;
  const towerH = 240;
  const containerW = towerBotW;

  return (
    <div className="absolute right-[4%] bottom-[22%] pointer-events-none z-0">
      {/* Progress label */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ bottom: "105%", marginBottom: "8px" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span
          className="text-xs font-bold"
          style={{
            color: "#ffd97a",
            textShadow: "0 0 12px rgba(255,217,122,0.4)",
          }}
        >
          {progressPct}%
        </span>
        {/* Mini progress bar */}
        <div
          className="mt-1 rounded-full overflow-hidden"
          style={{
            width: "40px",
            height: "3px",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, #ffd97a, #ffe8a8)",
              boxShadow: "0 0 6px rgba(255,217,122,0.4)",
            }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Lighthouse glow */}
      <motion.div
        className="absolute rounded-full left-1/2 -translate-x-1/2"
        style={{
          width: "160px",
          height: "160px",
          top: "-40px",
          background:
            "radial-gradient(circle, rgba(255,235,170,0.85) 0%, rgba(255,215,120,0.4) 40%, rgba(255,215,120,0.06) 70%, transparent 100%)",
          filter: "blur(14px)",
        }}
        animate={{
          scale: isVictory ? [1, 1.1, 1] : [1, 1.06, 1],
          opacity: isVictory ? [0.8, 1, 0.8] : [0.5 + brightness * 0.005, 0.7 + brightness * 0.003, 0.5 + brightness * 0.005],
        }}
        transition={{
          duration: isVictory ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sparkle particles */}
      {brightness > 15 && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "-10px" }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`lh-sp-${i}`}
              className="absolute rounded-full"
              style={{
                width: "3px",
                height: "3px",
                background: "rgba(255,240,190,0.7)",
                filter: "blur(0.5px)",
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 30],
                y: [0, -10 - Math.random() * 15],
                opacity: [0.5, 0, 0.5],
                scale: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Light beam */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 origin-top"
        style={{ top: "30px" }}
        animate={{ opacity: 0.04 + brightness * 0.006 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "40px solid transparent",
            borderRight: "40px solid transparent",
            borderBottom: "180px solid rgba(255,215,120,0.18)",
            filter: "blur(12px)",
          }}
        />
      </motion.div>

      {/* Lighthouse structure */}
      <div
        className="relative flex flex-col items-center"
        style={{ width: `${containerW}px` }}
      >
        {/* Roof dome */}
        <div
          className="rounded-t-full"
          style={{
            width: `${towerTopW - 10}px`,
            height: "6px",
            background: "linear-gradient(to bottom, #d8d0c0, #c0b8a8)",
          }}
        />

        {/* Lantern room */}
        <motion.div
          style={{
            width: `${towerTopW - 16}px`,
            height: "22px",
            backgroundColor: `rgba(255,232,168, ${0.08 + brightness * 0.005})`,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "2px 2px 0 0",
          }}
          animate={{
            boxShadow: `0 0 ${12 + brightness * 0.3}px rgba(255,215,120,${0.15 + brightness * 0.005})`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(to bottom, rgba(255,232,168,${0.14 + brightness * 0.004}), rgba(255,215,120,${0.07 + brightness * 0.002}))`,
            }}
          />
        </motion.div>

        {/* Gallery deck */}
        <div
          className="rounded-sm"
          style={{
            width: `${towerTopW - 4}px`,
            height: "4px",
            backgroundColor: "#c0b8a8",
          }}
        />

        {/* Tower body — trapezoid narrowing upward */}
        <div
          style={{
            width: `${towerBotW}px`,
            height: `${towerH}px`,
            background:
              "linear-gradient(to right, #d8d0c0, #f0ead8 25%, #f8f2e8 50%, #f0ead8 75%, #d8d0c0)",
            clipPath: `polygon(
              ${((towerBotW - towerTopW) / 2 / towerBotW) * 100}% 0%,
              ${100 - ((towerBotW - towerTopW) / 2 / towerBotW) * 100}% 0%,
              100% 100%,
              0% 100%
            )`,
          }}
        >
          {/* Red stripe 1 */}
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: 0,
              right: 0,
              height: "5px",
              backgroundColor: "rgba(200,120,112,0.28)",
            }}
          />
          {/* Red stripe 2 */}
          <div
            style={{
              position: "absolute",
              top: "58%",
              left: 0,
              right: 0,
              height: "5px",
              backgroundColor: "rgba(200,120,112,0.28)",
            }}
          />
        </div>

        {/* Base platform */}
        <div
          className="rounded-b"
          style={{
            width: `${towerBotW + 18}px`,
            height: "12px",
            background: "linear-gradient(to bottom, #d0c8b8, #c0b8a8)",
          }}
        />
      </div>
    </div>
  );
};
