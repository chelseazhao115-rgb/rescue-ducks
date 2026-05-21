"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const ChelseaNPC: React.FC = () => {
  const tipText = useGameStore((s) => s.currentTipText);
  const tipVisible = useGameStore((s) => s.tipVisible);

  return (
    <div
      className="absolute bottom-[6%] left-1/2 z-20 pointer-events-none"
      style={{ transform: "translateX(-50%)" }}
    >
      <AnimatePresence>
        {tipVisible && tipText && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35 }}
          >
            {/* Dialog bubble */}
            <div
              className="relative px-5 py-3.5"
              style={{
                maxWidth: "380px",
                borderRadius: "20px",
                background: "rgba(30,35,55,0.55)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.6,
                fontSize: "13px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              {/* Subtle top highlight */}
              <div
                className="absolute inset-x-0 top-0 rounded-t-[20px]"
                style={{
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                }}
              />
              {tipText}

              {/* Triangle pointer */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-[6px]"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid rgba(30,35,55,0.55)",
                }}
              />
            </div>

            {/* Chelsea avatar */}
            <motion.div
              className="flex flex-col items-center gap-0.5 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "rgba(185,217,255,0.08)",
                  border: "1.5px solid rgba(185,217,255,0.15)",
                  boxShadow: "0 0 12px rgba(185,217,255,0.1)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "rgba(185,217,255,0.5)" }}
                >
                  <circle cx="12" cy="9" r="5" strokeWidth="1.2" />
                  <circle cx="10" cy="8" r="0.8" fill="currentColor" stroke="none" />
                  <circle cx="14" cy="8" r="0.8" fill="currentColor" stroke="none" />
                  <path d="M10 11 Q12 12.5 14 11" strokeWidth="1" strokeLinecap="round" />
                  <path d="M6 20c0-3 3-6 6-6s6 3 6 6" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "9px",
                  color: "rgba(185,217,255,0.35)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Chelsea
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
