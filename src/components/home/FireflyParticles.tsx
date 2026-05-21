"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
}

const COLORS = [
  "rgba(255,240,180,0.7)",
  "rgba(255,220,150,0.6)",
  "rgba(200,210,255,0.5)",
  "rgba(220,200,240,0.5)",
  "rgba(255,250,210,0.8)",
];

function seeded(seed: number, offset: number): number {
  const x = Math.sin(seed * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export const FireflyParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 45 }, (_, i) => {
        const s = i + 42;
        const heightZone = seeded(s, 1);
        const isLow = heightZone < 0.35;
        const bottom = isLow
          ? 20 + seeded(s, 2) * 15
          : 35 + seeded(s, 2) * 35;

        return {
          id: i,
          left: 2 + seeded(s, 3) * 96,
          bottom,
          size: 1.5 + seeded(s, 4) * 3,
          duration: 3 + seeded(s, 5) * 5,
          delay: seeded(s, 6) * 6,
          drift: -4 + seeded(s, 7) * 8,
          color: COLORS[i % COLORS.length],
        };
      })
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            filter: `blur(${p.size < 2 ? 1 : 2}px)`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [0, -30, -15, -40, 0],
            x: [0, p.drift, p.drift * 1.5, p.drift * 0.5, 0],
            opacity: [0.1, 0.8, 0.4, 0.7, 0.1],
            scale: [0.6, 1.1, 0.8, 1, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
