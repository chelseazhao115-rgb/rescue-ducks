"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

interface ChainLine {
  from: { x: number; y: number };
  to: { x: number; y: number };
  comboCount: number;
}

interface AnchorPoint {
  x: number;
  y: number;
}

function buildCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number,
): { d: string; samples: Array<{ x: number; y: number }> } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.max(1, Math.hypot(dx, dy));
  const normalX = -dy / length;
  const normalY = dx / length;
  const cx = (x1 + x2) / 2 + normalX * bend;
  const cy = (y1 + y2) / 2 + normalY * bend;

  const samples = [0, 0.28, 0.55, 0.82, 1].map((t) => {
    const inv = 1 - t;
    return {
      x: inv * inv * x1 + 2 * inv * t * cx + t * t * x2,
      y: inv * inv * y1 + 2 * inv * t * cy + t * t * y2,
    };
  });

  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, samples };
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

    const frame = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [activeChain?.chainId, activeChain?.orbIds.length]);

  function getOrbAnchor(orbId: string, fallback: { x: number; y: number }): AnchorPoint {
    const container = containerRef.current;
    const orbEl = document.querySelector<HTMLElement>(`[data-orb-id="${orbId}"]`);
    if (!container || !orbEl || containerSize.w === 0 || containerSize.h === 0) {
      return {
        x: fallback.x * containerSize.w,
        y: fallback.y * containerSize.h,
      };
    }

    const containerRect = container.getBoundingClientRect();
    const orbRect = orbEl.getBoundingClientRect();
    return {
      x: orbRect.left - containerRect.left + orbRect.width / 2,
      y: orbRect.top - containerRect.top + orbRect.height / 2,
    };
  }

  if (!activeChain || activeChain.orbIds.length < 2) {
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[8]" />;
  }

  const lines: ChainLine[] = [];
  for (let i = 1; i < activeChain.orbIds.length; i++) {
    const prevOrb = orbs.find((o) => o.orbId === activeChain.orbIds[i - 1]);
    const currOrb = orbs.find((o) => o.orbId === activeChain.orbIds[i]);
    if (prevOrb && currOrb) {
      lines.push({
        from: getOrbAnchor(prevOrb.orbId, prevOrb.position),
        to: getOrbAnchor(currOrb.orbId, currOrb.position),
        comboCount: i + 1,
      });
    }
  }

  if (lines.length === 0) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[8] overflow-visible">
      <svg className="h-full w-full" style={{ overflow: "visible", mixBlendMode: "screen" }}>
        <defs>
          <linearGradient id="chain-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(185,217,255,0.18)" />
            <stop offset="36%" stopColor="rgba(217,200,255,0.72)" />
            <stop offset="58%" stopColor="rgba(255,238,176,1)" />
            <stop offset="100%" stopColor="rgba(255,247,224,0.28)" />
          </linearGradient>

          <filter id="chain-glow-filter" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="chain-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="chain-particle-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lines.map((line, i) => {
          const x1 = line.from.x;
          const y1 = line.from.y;
          const x2 = line.to.x;
          const y2 = line.to.y;
          const distance = Math.hypot(x2 - x1, y2 - y1);
          const bend = (i % 2 === 0 ? 1 : -1) * Math.min(42, distance * 0.12);
          const curve = buildCurve(x1, y1, x2, y2, bend);
          const xs = curve.samples.map((p) => p.x);
          const ys = curve.samples.map((p) => p.y);

          return (
            <g key={`${activeChain.chainId}-${i}`}>
              {[curve.samples[0], curve.samples[4]].map((point, endpointIndex) => (
                <g key={`node-${endpointIndex}`}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={24}
                    fill="rgba(255,226,156,0.18)"
                    initial={{ opacity: 0, scale: 0.35 }}
                    animate={{ opacity: [0.28, 0.56, 0.28], scale: [0.75, 1.12, 0.75] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: endpointIndex * 0.18 }}
                    style={{ filter: "url(#chain-glow-filter)" }}
                  />
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={7}
                    fill="rgba(255,250,224,0.78)"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0.62, 1, 0.62], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: endpointIndex * 0.14 }}
                    style={{ filter: "url(#chain-particle-glow)" }}
                  />
                </g>
              ))}

              <motion.path
                d={curve.d}
                fill="none"
                stroke="rgba(255,232,168,0.34)"
                strokeLinecap="round"
                strokeWidth={18}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.24, 0.52, 0.24] }}
                transition={{
                  pathLength: { duration: 0.38, ease: "easeOut" },
                  opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ filter: "url(#chain-glow-filter)" }}
              />

              <motion.path
                d={curve.d}
                fill="none"
                stroke="url(#chain-glow)"
                strokeLinecap="round"
                strokeWidth={6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.78, 1, 0.78] }}
                transition={{
                  pathLength: { duration: 0.38, ease: "easeOut" },
                  opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ filter: "url(#chain-soft-glow)" }}
              />

              <motion.path
                d={curve.d}
                fill="none"
                stroke="rgba(255,252,232,0.92)"
                strokeDasharray="8 13"
                strokeLinecap="round"
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.54, 1, 0.54],
                  strokeDashoffset: [42, 0],
                }}
                transition={{
                  pathLength: { duration: 0.38, ease: "easeOut" },
                  opacity: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                  strokeDashoffset: { duration: 0.9, repeat: Infinity, ease: "linear" },
                }}
              />

              <motion.circle
                r={5.6}
                fill="rgba(255,250,224,0.96)"
                initial={false}
                animate={{
                  cx: xs,
                  cy: ys,
                  opacity: [0, 1, 0.92, 0.48, 0],
                  scale: [0.45, 1.34, 1.05, 0.78, 0.35],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
                style={{ filter: "url(#chain-particle-glow)" }}
              />

              <motion.circle
                r={3.4}
                fill="rgba(220,204,255,0.82)"
                initial={false}
                animate={{
                  cx: xs,
                  cy: ys,
                  opacity: [0, 0.82, 0.62, 0.26, 0],
                  scale: [0.35, 1.05, 0.82, 0.56, 0.2],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12 + 0.32,
                }}
                style={{ filter: "url(#chain-particle-glow)" }}
              />

              {[1, 2, 3].map((sampleIndex) => {
                const point = curve.samples[sampleIndex];
                return (
                  <motion.circle
                    key={`spark-${sampleIndex}`}
                    cx={point.x}
                    cy={point.y}
                    r={1.6 + sampleIndex * 0.32}
                    fill={sampleIndex % 2 === 0 ? "rgba(220,204,255,0.74)" : "rgba(255,236,184,0.86)"}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 0.82, 0], scale: [0.4, 1.55, 0.5] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.14 + sampleIndex * 0.22,
                    }}
                    style={{ filter: "url(#chain-particle-glow)" }}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
