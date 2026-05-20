"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const Lighthouse: React.FC = () => {
  const brightness = useGameStore((s) => s.lighthouseBrightness);
  const phase = useGameStore((s) => s.phase);
  const isVictory = phase === "victory";

  return (
    <div className="absolute right-8 md:right-16 top-[15%] pointer-events-none z-0">
      {/* Glow halo */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,214,123,0.6) 0%, transparent 70%)",
        }}
        animate={{
          scale: isVictory ? [1, 1.15, 1] : 1,
          opacity: 0.2 + brightness * 0.008,
        }}
        transition={
          isVictory
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.8, ease: "easeOut" }
        }
      />

      {/* Light beam */}
      <motion.div
        className="absolute top-full left-1/2 -translate-x-1/2 origin-top"
        animate={{ opacity: 0.1 + brightness * 0.006 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "30px solid transparent",
            borderRight: "30px solid transparent",
            borderBottom: "150px solid rgba(245, 214, 123, 0.25)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* Lighthouse silhouette */}
      <div className="relative w-12 md:w-16">
        {/* Lantern room */}
        <motion.div
          className="w-8 h-6 mx-auto rounded-t border border-white/10"
          style={{
            background: `rgba(245, 214, 123, ${0.05 + brightness * 0.005})`,
          }}
          animate={{
            boxShadow: `0 0 ${8 + brightness * 0.2}px rgba(245,214,123,${0.2 + brightness * 0.005})`,
          }}
        />

        {/* Tower */}
        <div
          className="w-full h-36 md:h-48 mx-auto"
          style={{
            background: "linear-gradient(to right, #151d30, #1f3050, #151d30)",
            clipPath: "polygon(22% 0%, 78% 0%, 88% 100%, 12% 100%)",
          }}
        />

        {/* Base */}
        <div className="w-16 h-4 -ml-2 mx-auto bg-storm-mid rounded-b" />
      </div>
    </div>
  );
};
