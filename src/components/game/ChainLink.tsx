"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

interface ChainLine {
  from: { x: number; y: number };
  to: { x: number; y: number };
  comboCount: number;
}

export const ChainLink: React.FC = () => {
  const activeChain = useGameStore((s) => s.activeChain);
  const orbs = useGameStore((s) => s.orbs);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        setContainerSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!activeChain || activeChain.orbIds.length < 2) return null;

  const lines: ChainLine[] = [];
  for (let i = 1; i < activeChain.orbIds.length; i++) {
    const prevOrb = orbs.find((o) => o.orbId === activeChain.orbIds[i - 1]);
    const currOrb = orbs.find((o) => o.orbId === activeChain.orbIds[i]);
    if (prevOrb && currOrb) {
      lines.push({
        from: prevOrb.position,
        to: currOrb.position,
        comboCount: i + 1,
      });
    }
  }

  if (lines.length === 0) return null;

  const getGlowColor = (combo: number) => {
    if (combo >= 7) return "#ff8c42";
    if (combo >= 4) return "#f0a500";
    return "#ffd166";
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-5">
      <svg className="w-full h-full" style={{ overflow: "visible" }}>
        {lines.map((line, i) => (
          <motion.line
            key={`${activeChain.chainId}-${i}`}
            x1={line.from.x * containerSize.w}
            y1={line.from.y * containerSize.h}
            x2={line.to.x * containerSize.w}
            y2={line.to.y * containerSize.h}
            stroke={getGlowColor(line.comboCount)}
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
            transition={{
              pathLength: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ filter: `drop-shadow(0 0 4px ${getGlowColor(line.comboCount)})` }}
          />
        ))}
      </svg>
    </div>
  );
};
