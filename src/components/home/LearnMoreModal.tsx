"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { playButtonClick } from "@/lib/utils/sound";
import { showToast } from "./Toast";

interface LearnMoreModalProps {
  onClose: () => void;
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: 8 + ((i * 31) % 84),
  top: 8 + ((i * 47) % 76),
  size: 2 + (i % 3),
  delay: (i % 6) * 0.35,
  duration: 4.5 + (i % 5) * 0.7,
}));

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const copyWeChat = async () => {
    playButtonClick();
    try {
      await navigator.clipboard.writeText("chelsea299163");
      showToast("Copied ✨");
    } catch {
      showToast("WeChat: chelsea299163");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{
        background:
          "radial-gradient(ellipse at 70% 18%, rgba(255,217,122,0.16), transparent 42%), rgba(8, 10, 24, 0.42)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <motion.span
            key={`learn-particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              background: i % 2 === 0 ? "rgba(255,232,168,0.52)" : "rgba(217,200,255,0.42)",
              boxShadow: "0 0 14px rgba(255,217,122,0.24)",
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.08, 0.62, 0.08],
              scale: [0.8, 1.28, 0.8],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="learn-more-title"
        className="relative w-full max-w-[620px] overflow-hidden rounded-[28px] border border-white/[0.16] px-5 py-5 shadow-2xl sm:px-8 sm:py-7"
        style={{
          maxHeight: "min(86dvh, 760px)",
          background:
            "linear-gradient(180deg, rgba(42,48,82,0.68), rgba(22,26,50,0.78))",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow:
            "0 0 54px rgba(255,217,122,0.16), 0 24px 80px rgba(4,6,18,0.42), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <motion.div
          className="absolute right-[-18%] top-[-18%] h-64 w-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,217,122,0.22), rgba(217,200,255,0.08) 48%, transparent 72%)",
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.52, 0.9, 0.52], scale: [0.96, 1.08, 0.96] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.button
          type="button"
          aria-label="Close"
          onClick={() => {
            playButtonClick();
            onClose();
          }}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/55"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
          }}
          whileHover={{ scale: 1.06, color: "rgba(255,255,255,0.86)", background: "rgba(255,255,255,0.13)" }}
          whileTap={{ scale: 0.94 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </motion.button>

        <div className="relative z-[1] overflow-y-auto pr-1" style={{ maxHeight: "calc(min(86dvh, 760px) - 56px)" }}>
          <div className="flex items-center gap-4 pr-10">
            <motion.div
              className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ffe7b0]/25 bg-white/[0.08] sm:h-24 sm:w-24"
              style={{ boxShadow: "0 0 28px rgba(255,217,122,0.22)" }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/chelsea3.png"
                alt="Chelsea"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </motion.div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffe7b0]/70">
                Creator behind the lighthouse
              </p>
              <h2 id="learn-more-title" className="text-3xl font-extrabold leading-tight text-[#fff2cf] sm:text-4xl">
                Chelsea
              </h2>
              <p className="mt-1 text-sm font-semibold text-[#d9c8ff]/85 sm:text-base">
                IELTS Mentor · Creator of Rescue Ducks
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-[#f8f5ee]/82 sm:text-base">
            <p>
              I built Rescue Ducks because I wanted vocabulary learning to feel a little less lonely and a little more fun.
            </p>
            <p>
            Rescue Ducks is still growing.
            New word groups, writing paths, and future journeys are already drifting toward the lighthouse ✨
            </p>
            <p>
              If you have ideas, feedback, or simply want to keep learning together, I'd love to hear from you 💫
            </p>
            
          </div>

          <blockquote
            className="mt-6 rounded-2xl border border-[#ffe7b0]/[0.16] px-5 py-4 text-lg font-semibold leading-relaxed text-[#fff2cf] sm:text-xl"
            style={{
              background: "rgba(255,231,176,0.08)",
              textShadow: "0 2px 18px rgba(5,8,20,0.45)",
            }}
          >
            “Words are like little lights. Once you connect them, the world becomes clearer.”
          </blockquote>

          <div className="mt-7">
            <p className="mb-3 text-sm font-bold tracking-wide text-[#ffe7b0]/80">
              ✦ Continue the journey
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <motion.a
                href="https://xhslink.com/m/6XQBd2XIsCH"
                target="_blank"
                rel="noreferrer"
                onClick={playButtonClick}
                className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-[#fff2cf]"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
                whileHover={{ y: -2, background: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.97 }}
              >
                Xiaohongshu
              </motion.a>
              <motion.button
                type="button"
                onClick={copyWeChat}
                className="rounded-full px-4 py-3 text-sm font-bold text-[#fff2cf]"
                style={{
                  background: "rgba(255,231,176,0.11)",
                  border: "1px solid rgba(255,231,176,0.18)",
                }}
                whileHover={{ y: -2, background: "rgba(255,231,176,0.16)" }}
                whileTap={{ scale: 0.97 }}
              >
                WeChat
              </motion.button>
              <motion.a
                href="mailto:chelsea299@163.com"
                onClick={playButtonClick}
                className="flex items-center justify-center rounded-full px-4 py-3 text-sm font-bold text-[#fff2cf]"
                style={{
                  background: "rgba(217,200,255,0.12)",
                  border: "1px solid rgba(217,200,255,0.2)",
                }}
                whileHover={{ y: -2, background: "rgba(217,200,255,0.17)" }}
                whileTap={{ scale: 0.97 }}
              >
                Email
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};
