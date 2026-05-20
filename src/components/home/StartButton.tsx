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
      className="relative px-8 py-4 text-lg font-semibold text-storm-dark rounded-full
                 bg-gradient-to-b from-lighthouse-glow to-light-gold
                 shadow-[0_0_30px_rgba(245,214,123,0.4)]
                 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245,214,123,0.6)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-lighthouse-glow/20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      Light the Lighthouse
    </motion.button>
  );
};
