"use client";

import { motion } from "framer-motion";

export interface StartButtonProps {
  onStart: () => void;
  disabled: boolean;
}

export const StartButton: React.FC<StartButtonProps> = ({ onStart, disabled }) => {
  return (
    <motion.button
      onClick={onStart}
      disabled={disabled}
      className="relative font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        padding: "18px 36px",
        borderRadius: "999px",
        background: "linear-gradient(180deg, #ffe8af, #ffd979)",
        color: "#6a5732",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow: "0 0 24px rgba(255,220,120,0.45)",
      }}
      whileHover={disabled ? {} : {
        y: -2,
        scale: 1.02,
        boxShadow: "0 0 42px rgba(255,220,120,0.65)",
      }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    >
      Light the Lighthouse
    </motion.button>
  );
};
