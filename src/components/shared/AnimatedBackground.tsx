"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface AnimatedBackgroundProps {
  variant: "home" | "game";
  stormIntensity: number;
}

interface RainDrop {
  left: number;
  height: number;
  duration: number;
  delay: number;
}

function generateRainDrops(count: number): RainDrop[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    height: 10 + Math.random() * 20,
    duration: 0.8 + Math.random() * 1.5,
    delay: Math.random() * 2,
  }));
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant,
  stormIntensity,
}) => {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    setRainDrops(generateRainDrops(variant === "home" ? 20 : 30));
  }, [variant]);

  const [lightningDur] = useState(() => 3 + Math.random() * 4);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Storm clouds */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            variant === "home"
              ? "radial-gradient(ellipse at 50% 0%, #1a2740 0%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 0%, #2d4a6e 0%, transparent 60%)",
        }}
        animate={{ opacity: 0.2 + stormIntensity * 0.4 }}
      />

      {/* Lake surface */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, #0c1a2b, #1b3a5c, transparent)",
        }}
      />

      {/* Rain particles — only rendered client-side to avoid hydration mismatch */}
      {rainDrops.length > 0 && (
        <div className="absolute inset-0">
          {rainDrops.map((drop, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-storm-blue/30"
              style={{
                left: `${drop.left}%`,
                top: `-10%`,
                height: `${drop.height}px`,
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                ease: "linear",
                delay: drop.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning flashes (only when storm > 80%) */}
      {stormIntensity > 0.8 && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.08, 0, 0.12, 0] }}
          transition={{
            duration: lightningDur,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Fog/mist layer */}
      <motion.div
        className="absolute bottom-1/4 left-0 right-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(45,74,110,0.3), transparent)",
        }}
        animate={{ x: ["-5%", "5%", "-5%"] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
