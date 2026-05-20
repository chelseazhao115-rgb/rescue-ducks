"use client";

import { motion } from "framer-motion";

export interface DuckProps {
  duckId: string;
  rescued: boolean;
  index: number;
  total: number;
}

export const Duck: React.FC<DuckProps> = ({ duckId, rescued, index, total }) => {
  // Rescued ducks cluster near home (right), waiting ducks on the left
  // Use layout animation to smoothly transition when rescued changes
  const order = rescued ? total + index : index;

  return (
    <motion.div
      layout
      className="relative flex-shrink-0"
      style={{ order }}
      animate={{
        x: rescued ? 0 : undefined,
        y: rescued ? [0, -4, 0] : [0, -2, 0],
        scale: rescued ? 1.05 : 1,
        opacity: rescued ? 1 : 0.6,
      }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 25 },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: parseFloat(duckId.slice(0, 2)) / 16,
        },
      }}
    >
      {/* Duck body */}
      <div
        className="w-8 h-6 rounded-full"
        style={{ backgroundColor: "var(--color-duck-body)" }}
      />
      {/* Beak */}
      <div
        className="absolute top-1 -right-1 w-3 h-2 rounded-r-full"
        style={{ backgroundColor: "var(--color-duck-beak)" }}
      />
      {/* Eye */}
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-storm-dark" />
    </motion.div>
  );
};
