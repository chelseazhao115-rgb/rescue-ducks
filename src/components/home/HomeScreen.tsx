"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { LighthouseBackground } from "./LighthouseBackground";
import { LevelMap } from "./LevelMap";

const HomeLighthouse: React.FC = () => {
  const towerTopW = 36;
  const towerBotW = 56;
  const towerH = 160;

  return (
    <motion.div
      className="relative flex flex-col items-center my-6"
      style={{ width: `${towerBotW}px` }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      {/* Glow halo */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "-24px",
          width: "100px",
          height: "100px",
          background:
            "radial-gradient(circle, rgba(255,235,170,0.6) 0%, rgba(255,215,120,0.2) 40%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light beam */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 origin-bottom"
        style={{ bottom: "75%" }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "28px solid transparent",
            borderRight: "28px solid transparent",
            borderBottom: "150px solid rgba(255,215,120,0.1)",
            filter: "blur(12px)",
          }}
        />
      </motion.div>

      {/* Roof dome */}
      <div
        className="rounded-t-full"
        style={{
          width: `${towerTopW - 6}px`,
          height: "5px",
          background: "linear-gradient(to bottom, #e0d8c8, #c8c0b0)",
        }}
      />

      {/* Lantern room */}
      <motion.div
        style={{
          width: `${towerTopW - 10}px`,
          height: "16px",
          backgroundColor: "rgba(255,232,168,0.2)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "2px 2px 0 0",
          boxShadow: "0 0 14px rgba(255,215,120,0.18)",
        }}
        animate={{
          boxShadow: [
            "0 0 14px rgba(255,215,120,0.18)",
            "0 0 22px rgba(255,215,120,0.3)",
            "0 0 14px rgba(255,215,120,0.18)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(255,232,168,0.16), rgba(255,215,120,0.08))",
          }}
        />
      </motion.div>

      {/* Gallery deck */}
      <div
        className="rounded-sm"
        style={{
          width: `${towerTopW - 2}px`,
          height: "3px",
          backgroundColor: "#c0b8a8",
        }}
      />

      {/* Tower body */}
      <div
        className="relative"
        style={{
          width: `${towerBotW}px`,
          height: `${towerH}px`,
          background:
            "linear-gradient(to right, #ddd5c5, #f0ead8 25%, #f8f2e8 50%, #f0ead8 75%, #ddd5c5)",
          clipPath: `polygon(
            ${((towerBotW - towerTopW) / 2 / towerBotW) * 100}% 0%,
            ${100 - ((towerBotW - towerTopW) / 2 / towerBotW) * 100}% 0%,
            100% 100%,
            0% 100%
          )`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "rgba(200,120,112,0.28)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "rgba(200,120,112,0.28)",
          }}
        />
      </div>

      {/* Base */}
      <div
        className="rounded-b"
        style={{
          width: `${towerBotW + 14}px`,
          height: "10px",
          background: "linear-gradient(to bottom, #d0c8b8, #c0b8a8)",
        }}
      />
    </motion.div>
  );
};

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);

  const getCurrentLevel = (): number => {
    if (typeof window === "undefined") return 1;
    const saved = localStorage.getItem("rescueDuckLevel");
    return saved ? parseInt(saved, 10) : 1;
  };

  const handleQuickStart = () => {
    const level = getCurrentLevel();
    localStorage.setItem("rescueDuckLevel", String(level));
    router.push("/game");
  };

  return (
    <main className="relative w-full h-dvh bg-bg-deep-night overflow-hidden">
      <AnimatedBackground variant="home" stormIntensity={0.2} />
      <LighthouseBackground />

      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div className="min-h-dvh flex flex-col items-center pt-20 pb-8 px-6 relative">
          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
            style={{
              color: "#ffe7b0",
              textShadow:
                "0 0 40px rgba(255,217,122,0.5), 0 2px 12px rgba(0,0,0,0.3)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Rescue Duck
          </motion.h1>

          {/* Lighthouse — between title and buttons */}
          <HomeLighthouse />

          {/* Spacer */}
          <div className="flex-1 min-h-[40px]" />

          {/* Level map or start prompt */}
          <AnimatePresence mode="wait">
            {showMap ? (
              <motion.div
                key="map"
                className="w-full py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <LevelMap onSelectLevel={() => {}} />
              </motion.div>
            ) : (
              <motion.div
                key="start"
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Primary button */}
                <motion.button
                  onClick={handleQuickStart}
                  className="relative font-bold text-lg tracking-wide"
                  style={{
                    padding: "18px 48px",
                    borderRadius: "999px",
                    background: "linear-gradient(180deg, #ffe8af, #f0c860)",
                    color: "#5a4a28",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow:
                      "0 0 32px rgba(255,220,120,0.4), 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                  whileHover={{
                    y: -2,
                    scale: 1.03,
                    boxShadow:
                      "0 0 48px rgba(255,220,120,0.6), 0 6px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  START JOURNEY
                </motion.button>

                {/* Secondary button */}
                <motion.button
                  onClick={() => setShowMap(true)}
                  className="text-sm font-medium tracking-wider"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    padding: "10px 28px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.18)",
                  }}
                >
                  LOAD MAP
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom bar */}
          <div className="w-full flex items-end justify-between px-2 mt-auto pt-8">
            {/* Left icons */}
            <div className="flex items-center gap-3">
              <motion.button
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                }}
                whileHover={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </motion.button>
              <motion.button
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                }}
                whileHover={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0012 0V2z" />
                </svg>
              </motion.button>
            </div>

            {/* Version */}
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              v1.0.0
            </span>
          </div>
        </div>
      </div>

      {/* Back button when map shown */}
      {showMap && (
        <motion.button
          onClick={() => setShowMap(false)}
          className="absolute top-4 left-4 z-20 flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </motion.button>
      )}
    </main>
  );
};
