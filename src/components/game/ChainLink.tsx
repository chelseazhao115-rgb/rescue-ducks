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
      lines.push({ from: prevOrb.position, to: currOrb.position, comboCount: i + 1 });
    }
  }

  if (lines.length === 0) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-5 overflow-visible">
      <svg className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          {/* Strong energy flow gradient */}
          <linearGradient id="chain-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,240,180,0.2)" />
            <stop offset="30%" stopColor="rgba(255,232,168,0.95)" />
            <stop offset="70%" stopColor="rgba(255,232,168,0.95)" />
            <stop offset="100%" stopColor="rgba(255,240,180,0.2)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="chain-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow filter */}
          <filter id="chain-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lines.map((line, i) => {
          const x1 = line.from.x * containerSize.w;
          const y1 = line.from.y * containerSize.h;
          const x2 = line.to.x * containerSize.w;
          const y2 = line.to.y * containerSize.h;

          return (
            <g key={`${activeChain.chainId}-${i}`}>
              {/* Outer soft glow */}
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,232,168,0.25)"
                strokeWidth={8}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.4, 0.6, 0.4] }}
                transition={{
                  pathLength: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ filter: "url(#chain-glow-filter)" }}
              />

              {/* Main chain line */}
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#chain-glow)"
                strokeWidth={3}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.8, 1, 0.8] }}
                transition={{
                  pathLength: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ filter: "url(#chain-soft-glow)" }}
              />

              {/* Core bright line */}
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,250,220,0.9)"
                strokeWidth={1}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ pathLength: { duration: 0.3, ease: "easeOut" } }}
              />

              {/* Energy flow dot — moving highlight */}
              <motion.circle
                r={3}
                fill="rgba(255,255,255,0.95)"
                style={{ filter: "blur(1px)" }}
                initial={false}
                animate={{
                  cx: [x1, x2],
                  cy: [y1, y2],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.15,
                }}
              />

              {/* Second trailing dot */}
              <motion.circle
                r={2}
                fill="rgba(255,232,168,0.7)"
                style={{ filter: "blur(1.5px)" }}
                initial={false}
                animate={{
                  cx: [x1, x2],
                  cy: [y1, y2],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.15 + 0.3,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
