"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const LightEnergy: React.FC = () => {
  const particles = useGameStore((s) => s.energyParticles);
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

  if (containerSize.w === 0) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10">
      {particles.map((p) => {
        const sx = p.sourcePosition.x * containerSize.w;
        const sy = p.sourcePosition.y * containerSize.h;
        const tx = p.targetPosition.x * containerSize.w;
        const ty = p.targetPosition.y * containerSize.h;
        const midX = (sx + tx) / 2 + (Math.random() - 0.5) * 60;
        const midY = Math.min(sy, ty) - 40 - Math.random() * 60;

        return (
          <motion.div
            key={p.particleId}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: 0,
              top: 0,
              background: `radial-gradient(circle, hsl(${p.hue}, 100%, 70%), transparent)`,
              filter: "blur(2px)",
            }}
            initial={{ x: sx, y: sy, opacity: 1, scale: 1 }}
            animate={{
              x: [sx, midX, tx],
              y: [sy, midY, ty],
              opacity: [1, 1, 0],
              scale: [1, 1.5, 0.3],
            }}
            transition={{ duration: p.duration / 1000, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};
