"use client";

import { motion } from "framer-motion";

export const LighthouseBackground: React.FC = () => {
  // Tower dimensions — more elegant proportions
  const towerTopW = 36;
  const towerBotW = 56;
  const towerH = 180;

  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
      {/* Water / Lake surface with reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-[28%]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(42,58,80,0.6) 0%, rgba(64,90,120,0.3) 40%, transparent 100%)",
          }}
        />
        {/* Gold reflection from lighthouse */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[10%]"
          style={{
            width: "120px",
            height: "60px",
            background:
              "radial-gradient(ellipse at center, rgba(255,220,140,0.25) 0%, rgba(255,215,120,0.08) 50%, transparent 80%)",
            filter: "blur(16px)",
          }}
          animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Small island/shore */}
      <div
        className="absolute bottom-[26%] left-1/2 -translate-x-1/2"
        style={{
          width: "180px",
          height: "14px",
          background:
            "radial-gradient(ellipse at center, rgba(50,55,45,0.35) 0%, transparent 80%)",
          filter: "blur(6px)",
        }}
      />

      {/* Tiny duck silhouette at bottom left */}
      <motion.div
        className="absolute bottom-[8%] left-[15%]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <ellipse cx="14" cy="12" rx="7" ry="5" fill="rgba(248,240,224,0.35)" />
          <ellipse cx="20" cy="10" rx="3" ry="2.5" fill="rgba(248,240,224,0.35)" />
          <ellipse cx="21.5" cy="9.5" rx="1" ry="0.8" fill="rgba(200,150,100,0.4)" />
        </svg>
      </motion.div>

      {/* Another tiny duck */}
      <motion.div
        className="absolute bottom-[10%] right-[20%]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="18" height="15" viewBox="0 0 24 20" fill="none">
          <ellipse cx="14" cy="12" rx="7" ry="5" fill="rgba(248,240,224,0.25)" />
          <ellipse cx="20" cy="10" rx="3" ry="2.5" fill="rgba(248,240,224,0.25)" />
        </svg>
      </motion.div>
    </div>
  );
};
