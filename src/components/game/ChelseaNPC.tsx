"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export const ChelseaNPC: React.FC = () => {
  const tipText = useGameStore((s) => s.currentTipText);
  const tipVisible = useGameStore((s) => s.tipVisible);

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{ left: "1%", bottom: "18%" }}
    >
      <AnimatePresence>
        {tipVisible && tipText && (
          <motion.div
            className="flex items-end gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35 }}
          >
            {/* 头像 — 2x */}
            <div
              className="rounded-full overflow-hidden flex-shrink-0 border-2"
              style={{
                width: "calc(176px * var(--vscale, 1))",
                height: "calc(176px * var(--vscale, 1))",
                borderColor: "rgba(255,255,255,0.25)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src="/chelsea2.png"
                alt="Chelsea"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 对话框 — 2x */}
            <div
              className="relative"
              style={{
                maxWidth: "calc(760px * var(--vscale, 1))",
                padding: "calc(14px * var(--vscale, 1)) calc(24px * var(--vscale, 1))",
                borderRadius: "calc(32px * var(--vscale, 1))",
                borderBottomLeftRadius: "calc(8px * var(--vscale, 1))",
                background: "rgba(20, 12, 40, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              {/* 名字 — 2x */}
              <div
                style={{
                  color: "#ffe7b0",
                  fontSize: "calc(32px * var(--vscale, 1))",
                  fontWeight: 700,
                  marginBottom: "calc(4px * var(--vscale, 1))",
                  letterSpacing: "0.04em",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                Chelsea
              </div>
              {/* 台词 — 2x */}
              <div
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: "calc(30px * var(--vscale, 1))",
                  lineHeight: 1.5,
                  fontWeight: 400,
                  wordWrap: "break-word",
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
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
