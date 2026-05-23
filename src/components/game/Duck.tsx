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
      <img
        src="/duck_2d_pure.png"
        alt=""
        className="w-24 h-[4.5rem] object-contain"
        style={{
          filter: rescued
            ? "drop-shadow(0 0 6px rgba(255,217,122,0.35))"
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
        draggable={false}
      />
    </motion.div>
  );
};
