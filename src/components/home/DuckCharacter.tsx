"use client";

import { motion } from "framer-motion";

export const DuckCharacter: React.FC = () => {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Soft ground shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "75px",
          height: "12px",
          background: "rgba(0,0,0,0.15)",
          filter: "blur(6px)",
        }}
        animate={{ scaleX: [1, 1.08, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <img
        src="/duck_2d_pure.png"
        alt="Duck"
        width={360}
        height={360}
        className="object-contain drop-shadow-lg"
        style={{ imageRendering: "auto" }}
      />

      {/* Subtle breathing glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,245,220,0.15) 0%, transparent 70%)",
          filter: "blur(12px)",
          top: "15px",
          left: "8px",
          width: "90px",
          height: "75px",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};
