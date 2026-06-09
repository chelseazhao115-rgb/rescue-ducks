"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const AskChelseaButton: React.FC = () => {
  const phase = useGameStore((s) => s.phase);
  const chelseaHelpUsed = useGameStore((s) => s.chelseaHelpUsed);
  const requestChelseaHelp = useGameStore((s) => s.requestChelseaHelp);

  if (phase !== "playing") return null;

  return (
    <motion.button
      type="button"
      onClick={requestChelseaHelp}
      disabled={chelseaHelpUsed}
      className="pointer-events-auto relative z-20 mr-7 mt-2 flex h-9 items-center justify-center gap-2 px-3 font-semibold"
      style={{
        borderRadius: "999px",
        background: chelseaHelpUsed ? "rgba(255,255,255,0.05)" : "rgba(255,231,176,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: chelseaHelpUsed ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,231,176,0.22)",
        color: chelseaHelpUsed ? "rgba(255,255,255,0.38)" : "rgba(255,242,207,0.86)",
        cursor: chelseaHelpUsed ? "default" : "pointer",
      }}
      whileHover={
        chelseaHelpUsed
          ? undefined
          : {
              scale: 1.06,
              background: "rgba(255,231,176,0.18)",
              color: "rgba(255,255,255,0.96)",
            }
      }
      whileTap={chelseaHelpUsed ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.2 }}
      aria-label={chelseaHelpUsed ? "Chelsea help used" : "Ask Chelsea for help"}
      title={chelseaHelpUsed ? "Chelsea help used" : "Ask Chelsea for one hint"}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.74V16h8v-1.26A7 7 0 0 0 12 2Z" />
      </svg>
      <span className="text-sm tracking-wide">{chelseaHelpUsed ? "Used" : "Ask Chelsea"}</span>
    </motion.button>
  );
};
