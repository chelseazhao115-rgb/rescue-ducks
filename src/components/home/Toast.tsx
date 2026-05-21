"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastData {
  id: number;
  message: string;
}

let toastId = 0;
const listeners = new Set<(data: ToastData) => void>();

export function showToast(message: string) {
  const data: ToastData = { id: ++toastId, message };
  listeners.forEach((fn) => fn(data));
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (data: ToastData) => {
      setToasts((prev) => [...prev, data]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== data.id));
      }, 2200);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="px-5 py-2.5 rounded-full text-sm font-medium pointer-events-auto"
            style={{
              background: "rgba(30,25,45,0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
