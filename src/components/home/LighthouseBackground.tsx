"use client";

import { motion } from "framer-motion";

export const LighthouseBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
      {/* Lighthouse tower */}
      <div className="relative mb-[20%]">
        {/* Beam of light */}
        <motion.div
          className="absolute bottom-[90%] left-1/2 -translate-x-1/2 origin-bottom"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "40px solid transparent",
              borderRight: "40px solid transparent",
              borderBottom: "200px solid rgba(245, 214, 123, 0.15)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>

        {/* Glow halo */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,214,123,0.4) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lighthouse body */}
        <div className="relative w-16 md:w-20">
          {/* Top lantern */}
          <div className="w-10 h-8 mx-auto bg-lighthouse-glow/30 rounded-t-lg border border-lighthouse-glow/20" />

          {/* Tower body - trapezoid shape via CSS */}
          <div
            className="w-full h-48 md:h-64 mx-auto"
            style={{
              background: "linear-gradient(to right, #1a2740, #2d4a6e, #1a2740)",
              clipPath: "polygon(20% 0%, 80% 0%, 90% 100%, 10% 100%)",
            }}
          />

          {/* Base */}
          <div className="w-24 h-6 -ml-2 mx-auto bg-storm-mid rounded-b" />
        </div>
      </div>

      {/* Rocky shore */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[15%]"
        style={{
          background: "linear-gradient(to top, #0a0e17, #0c1a2b, transparent)",
        }}
      />
    </div>
  );
};
