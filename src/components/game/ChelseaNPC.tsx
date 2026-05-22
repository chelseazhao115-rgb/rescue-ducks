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
              width: "480px",
              height: "256px",
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
                left: "168px",
                top: "44%",
                transform: "translateY(-50%)",
                width: "300px",
              }}
            >
              <div
                style={{
                  color: "#5a5060",
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "4px",
                  letterSpacing: "0.02em",
                }}
              >
                Chelsea
              </div>
              <div
                style={{
                  color: "#5a5060",
                  fontSize: "14px",
                  lineHeight: 1.5,
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
