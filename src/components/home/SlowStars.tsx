"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  warmth: number;
}

function seeded(seed: number, offset: number): number {
  const x = Math.sin(seed * 91.7 + offset * 271.3) * 43758.5453;
  return x - Math.floor(x);
}

const STARS: Star[] = Array.from({ length: 30 }, (_, i) => {
  const s = i + 17;
  return {
    id: i,
    left: 4 + seeded(s, 1) * 92,
    top: 3 + seeded(s, 2) * 43,
    size: seeded(s, 3) > 0.82 ? 2.4 : 1.4 + seeded(s, 4) * 1.1,
    delay: seeded(s, 5) * 5,
    duration: 4.2 + seeded(s, 6) * 5.8,
    warmth: seeded(s, 7),
  };
});

export const SlowStars: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {STARS.map((star) => {
        const color =
          star.warmth > 0.58
            ? "rgba(255,235,182,0.82)"
            : "rgba(218,224,255,0.66)";

        return (
          <motion.span
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: color,
              boxShadow: `0 0 ${star.size * 5}px ${color}`,
              filter: "blur(0.2px)",
            }}
            animate={{
              opacity: [0.12, 0.72, 0.22, 0.88, 0.12],
              scale: [0.72, 1.12, 0.86, 1.2, 0.72],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
