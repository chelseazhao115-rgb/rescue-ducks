"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Ripple {
  id: number;
  left: number;
  bottom: number;
  width: number;
  duration: number;
  delay: number;
}

function seeded(s: number, o: number): number {
  const x = Math.sin(s * 97.3 + o * 213.7) * 43758.5453;
  return x - Math.floor(x);
}

export const LakeSurface: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    setRipples(
      Array.from({ length: 10 }, (_, i) => {
        const s = i + 77;
        return {
          id: i,
          left: 5 + seeded(s, 1) * 90,
          bottom: 3 + seeded(s, 2) * 14,
          width: 25 + seeded(s, 3) * 50,
          duration: 4 + seeded(s, 4) * 5,
          delay: seeded(s, 5) * 4,
        };
      })
    );
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "26%" }}>
      {/* Deep lake gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,24,40,0.95) 0%, rgba(30,42,60,0.85) 30%, rgba(42,56,78,0.55) 60%, rgba(60,75,100,0.2) 100%)",
        }}
      />

      {/* Lighthouse reflection — warm gold path on water */}
      <motion.div
        className="absolute left-[62%] -translate-x-1/2"
        style={{
          bottom: "5%",
          width: "80px",
          height: "80%",
          background:
            "linear-gradient(to top, rgba(255,215,130,0.2) 0%, rgba(255,200,120,0.08) 40%, transparent 100%)",
          filter: "blur(12px)",
          borderRadius: "40%",
        }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scaleX: [1, 1.06, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary reflection streaks */}
      <motion.div
        className="absolute left-[62%] -translate-x-1/2"
        style={{
          bottom: "10%",
          width: "40px",
          height: "40%",
          background:
            "linear-gradient(to top, rgba(255,230,160,0.15) 0%, transparent 100%)",
          filter: "blur(6px)",
        }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Water ripple lines */}
      {ripples.map((r) => (
        <motion.div
          key={`ripple-${r.id}`}
          className="absolute h-px"
          style={{
            left: `${r.left}%`,
            bottom: `${r.bottom}%`,
            width: `${r.width}px`,
            background:
              "linear-gradient(to right, transparent, rgba(160,180,210,0.1) 30%, rgba(180,200,225,0.15) 50%, rgba(160,180,210,0.1) 70%, transparent)",
            filter: "blur(1.5px)",
          }}
          animate={{
            x: ["-3%", "3%", "-3%"],
            opacity: [0.04, 0.14, 0.04],
            scaleX: [1, 1.03, 1],
          }}
          transition={{
            duration: r.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: r.delay,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Surface mist */}
      <motion.div
        className="absolute bottom-[18%] left-0 right-0 h-[20%]"
        style={{
          background:
            "linear-gradient(to top, rgba(150,160,190,0.06), transparent)",
          filter: "blur(20px)",
        }}
        animate={{
          x: ["-2%", "3%", "-2%"],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
