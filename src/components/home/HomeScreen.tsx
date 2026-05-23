"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { DuckCharacter } from "./DuckCharacter";
import { CottageAndLighthouse } from "./CottageAndLighthouse";
import { LakeSurface } from "./LakeSurface";
import { FireflyParticles } from "./FireflyParticles";
import { LevelMap } from "./LevelMap";
import { ToastContainer, showToast } from "./Toast";
import { switchAmbience, stopAllAmbience } from "@/lib/utils/ambientSound";
import { unlockAudio, playButtonClick } from "@/lib/utils/sound";

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    switchAmbience("home");
    return () => { stopAllAmbience(); };
  }, []);

  const getCurrentLevel = (): number => {
    if (typeof window === "undefined") return 1;
    const saved = localStorage.getItem("rescueDuckGlobalLevel");
    return saved ? parseInt(saved, 10) : 1;
  };

  const handleStartJourney = () => {
    unlockAudio();
    setIsTransitioning(true);
    const level = getCurrentLevel();
    localStorage.setItem("rescueDuckGlobalLevel", String(level));
    setTimeout(() => {
      router.push("/game");
    }, 1500);
  };

  return (
    <main
      className="relative w-full h-dvh overflow-hidden"
      style={{ background: "#1a1040" }}
    >
      {/* Sky + atmosphere layer */}
      <AnimatedBackground variant="home" stormIntensity={0} />

      {/* Scene container — gentle idle breathing, zoom on transition */}
      <motion.div
        className="absolute inset-0"
        animate={
          isTransitioning
            ? { scale: 1.06, x: "-5%", y: "-2.5%" }
            : { scale: [1, 1.003, 1] }
        }
        transition={
          isTransitioning
            ? { duration: 1.2, ease: [0.42, 0, 0.58, 1] }
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "65% 38%" }}
      >
        {/* Right side: cottage + lighthouse */}
        <CottageAndLighthouse />

        {/* Floating fireflies */}
        <FireflyParticles />

        {/* Lake at bottom */}
        <LakeSurface />

        {/* Duck — floating on water, facing right toward cottage/lighthouse */}
        <div className="absolute bottom-[10%] left-[42%] -translate-x-1/2 z-10">
          <DuckCharacter />
        </div>
      </motion.div>

      {/* ===== UI PANEL — LEFT SIDE ===== */}
      <div className="absolute left-[6%] top-[8%] bottom-[12%] flex flex-col items-start z-20 pointer-events-none">
        {/* Title group — fixed at top */}
        <div className="pointer-events-auto flex-shrink-0 flex flex-col items-start">
          <div className="flex flex-col items-start">
            <div className="relative">
              <motion.h1
                className="font-extrabold tracking-tight text-left"
                style={{
                  fontSize: "clamp(4rem, 8vw, 9rem)",
                  color: "#ffe7b0",
                  textShadow:
                    "0 0 60px rgba(255,217,122,0.5), 0 4px 24px rgba(0,0,0,0.35)",
                  letterSpacing: "-0.02em",
                  fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Nunito', 'Quicksand', cursive, sans-serif",
                  lineHeight: 1.1,
                }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Rescue Ducks
              </motion.h1>
              {/* Little star */}
              <motion.span
                className="absolute"
                style={{
                  top: "-0.1em",
                  right: "-0.6em",
                  fontSize: "clamp(1.2rem, 2.4vw, 2.8rem)",
                  color: "#ffe7b0",
                  filter: "drop-shadow(0 0 10px rgba(255,220,120,0.7))",
                }}
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ✨
              </motion.span>
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-medium text-left mt-3"
              style={{
                fontSize: "clamp(1rem, 2vw, 2.25rem)",
                color: "#ffe7b0",
                opacity: 0.85,
                textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Nunito', 'Quicksand', cursive, sans-serif",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Light the way home.
            </motion.p>
          </div>
        </div>

        {/* Buttons / Level Map — fills remaining space, scrolls if needed */}
        <div className="pointer-events-auto flex-1 min-h-0 w-full mt-6">
          <AnimatePresence mode="wait">
            {showMap ? (
              <motion.div
                key="map"
                className="w-full h-full overflow-y-auto"
                style={{ maxWidth: "calc(680px * var(--vscale, 1))" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <LevelMap onSelectLevel={() => {}} />

                {/* Back button */}
                <motion.button
                  onClick={() => setShowMap(false)}
                  className="mt-6 flex items-center gap-2 text-sm font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  whileHover={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5m7-7l-7 7 7 7" />
                  </svg>
                  Back
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="buttons"
                className="flex flex-col items-start gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Start Journey — primary */}
                <motion.button
                  onClick={() => { playButtonClick(); handleStartJourney(); }}
                  disabled={isTransitioning}
                  className="relative font-bold tracking-wide tap-target"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)",
                    padding: "28px 80px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(180deg, #ffe8af, #f0c860)",
                    color: "#5a4a28",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                      "0 0 48px rgba(255,220,120,0.4), 0 6px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                  whileHover={{
                    y: -2,
                    scale: 1.04,
                    boxShadow:
                      "0 0 64px rgba(255,220,120,0.6), 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  Start Journey
                </motion.button>

                {/* Level Map — secondary */}
                <motion.button
                  onClick={() => { playButtonClick(); setShowMap(true); }}
                  className="font-medium tracking-wider tap-target"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.75rem)",
                    color: "#ffffff",
                    padding: "18px 80px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    background: "rgba(255,255,255,0.2)",
                    borderColor: "rgba(255,255,255,0.35)",
                  }}
                >
                  Level Map
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== BOTTOM-LEFT ICONS ===== */}
      <div className="absolute bottom-4 left-[6%] z-20 flex items-center gap-3">
        {/* Settings */}
        <motion.button
          onClick={() => { playButtonClick(); showToast("Coming Soon"); }}
          className="flex items-center justify-center rounded-full tap-target"
          style={{
            width: "38px",
            height: "38px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(8px)",
          }}
          whileHover={{
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.65)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </motion.button>

        {/* Leaderboard */}
        <motion.button
          onClick={() => { playButtonClick(); showToast("Coming Soon"); }}
          className="flex items-center justify-center rounded-full tap-target"
          style={{
            width: "38px",
            height: "38px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(8px)",
          }}
          whileHover={{
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.65)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0012 0V2z" />
          </svg>
        </motion.button>

        {/* Version */}
        <span
          className="text-[10px] ml-1"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          v1.0.0
        </span>
      </div>

      {/* ===== TRANSITION OVERLAY ===== */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
          >
            {/* Warm golden fade — like walking into the lighthouse light */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.7, 0.95] }}
              transition={{
                duration: 1.4,
                times: [0, 0.3, 0.6, 1],
                ease: "easeInOut",
                delay: 0.1,
              }}
              style={{
                background:
                  "radial-gradient(ellipse at 78% 15%, rgba(255,230,160,0.5) 0%, rgba(255,210,130,0.25) 40%, rgba(30,20,50,0.5) 100%)",
              }}
            />

            {/* Central bright spot — lighthouse intensifies */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: "78%",
                top: "12%",
                width: "120px",
                height: "120px",
                background:
                  "radial-gradient(circle, rgba(255,240,180,0.8) 0%, rgba(255,215,120,0.3) 50%, transparent 80%)",
                filter: "blur(20px)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.6, 1], scale: [0.5, 1.5, 2.5] }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TOAST CONTAINER ===== */}
      <ToastContainer />
    </main>
  );
};
