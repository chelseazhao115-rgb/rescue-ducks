"use client";

import { motion } from "framer-motion";

export interface DuckProps {
  duckId: string;
  rescued: boolean;
  index: number;
  total: number;
}

export const Duck: React.FC<DuckProps> = ({ duckId, rescued, index, total }) => {
  const order = rescued ? total + index : index;

  return (
    <motion.div
      layout
      className="relative flex-shrink-0"
      style={{ order }}
      animate={{
        x: rescued ? 0 : undefined,
        y: rescued ? [0, -5, 0] : [0, -3, 0],
        scale: rescued ? 1.08 : 1,
        opacity: rescued ? 1 : 0.55,
      }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 25 },
        y: {
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: parseFloat(duckId.slice(0, 2)) / 16,
        },
      }}
    >
      {/* Duck body */}
      <div
        className="w-8 h-6 rounded-full relative"
        style={{
          backgroundColor: "var(--color-duck-body)",
          boxShadow: rescued
            ? "0 0 10px rgba(255,217,122,0.25)"
            : "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />
      {/* Beak */}
      <div
        className="absolute top-1 -right-1 w-3 h-2 rounded-r-full"
        style={{ backgroundColor: "var(--color-duck-beak)" }}
      />
      {/* Eye */}
      <div
        className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full"
        style={{ backgroundColor: "#2a3a50" }}
      />
      {/* Wing */}
      <div
        className="absolute top-2 left-1 w-3 h-2 rounded-full"
        style={{
          backgroundColor: "var(--color-duck-wing)",
          opacity: 0.7,
        }}
      />
    </motion.div>
  );
};
