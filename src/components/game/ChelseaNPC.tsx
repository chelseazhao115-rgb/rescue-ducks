"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const ChelseaNPC: React.FC = () => {
  const tipText = useGameStore((s) => s.currentTipText);
  const tipVisible = useGameStore((s) => s.tipVisible);

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{ left: "10%", bottom: "2%" }}
    >
      <AnimatePresence>
        {tipVisible && tipText && (
          <motion.div
            className="relative"
            style={{
              width: "calc(480px * var(--vscale, 1))",
              height: "calc(256px * var(--vscale, 1))",
              backgroundImage: "url(/Chelsea1.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35 }}
          >
            {/* Text inside dialog area */}
            <div
              className="absolute"
              style={{
                left: "calc(168px * var(--vscale, 1))",
                top: "44%",
                transform: "translateY(-50%)",
                width: "calc(300px * var(--vscale, 1))",
              }}
            >
              <div
                style={{
                  color: "#5a5060",
                  fontSize: "calc(27px * var(--vscale, 1))",
                  fontWeight: 700,
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                Chelsea
              </div>
              <div
                style={{
                  color: "#5a5060",
                  fontSize: "calc(21px * var(--vscale, 1))",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  wordWrap: "break-word",
                }}
              >
                {tipText}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
