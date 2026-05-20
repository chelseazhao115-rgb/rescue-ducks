"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const ChelseaNPC: React.FC = () => {
  const tipText = useGameStore((s) => s.currentTipText);
  const tipVisible = useGameStore((s) => s.tipVisible);

  return (
    <div className="absolute bottom-3 left-[40%] md:left-[35%] z-20 pointer-events-none">
      <AnimatePresence>
        {tipVisible && tipText && (
          <motion.div
            className="flex items-end gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Speech bubble */}
            <div
              className="relative max-w-[180px] px-3 py-2 rounded-2xl rounded-bl-sm
                          bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white/80"
            >
              {tipText}
              <div
                className="absolute -bottom-1 left-2 w-3 h-3 rotate-45
                            bg-white/10 border-r border-b border-white/10"
              />
            </div>

            {/* Chelsea avatar + name */}
            <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-chelsea/30 border border-chelsea/40 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-chelsea/70"
                >
                  <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
                  <path
                    d="M4 20c0-4 4-7 8-7s8 3 8 7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-[10px] text-chelsea/50 font-medium">
                Chelsea
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
