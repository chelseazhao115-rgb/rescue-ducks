"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { DuckCharacter } from "./DuckCharacter";
import { CottageAndLighthouse } from "./CottageAndLighthouse";
import { LakeSurface } from "./LakeSurface";
import { FireflyParticles } from "./FireflyParticles";
import { SlowStars } from "./SlowStars";
import { LevelMap } from "./LevelMap";
import { LearnMoreModal } from "./LearnMoreModal";
import { ToastContainer } from "./Toast";
import { switchAmbience, stopAllAmbience } from "@/lib/utils/ambientSound";
import { unlockAudio, playButtonClick } from "@/lib/utils/sound";
import { TOTAL_LEVELS } from "@/lib/engine/LevelGenerator";
import { clearSelectedLevel, getPlayableGlobalLevel } from "@/lib/storage/saveData";

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [continueLevel, setContinueLevel] = useState(1);

  // Auto-fix inflated / inconsistent global level on every visit to home screen
  useEffect(() => {
    setContinueLevel(getPlayableGlobalLevel(TOTAL_LEVELS));
  }, []);

  useEffect(() => {
    switchAmbience("home");
    return () => { stopAllAmbience(); };
  }, []);

  const handleStartJourney = () => {
    unlockAudio();
    setIsTransitioning(true);
    clearSelectedLevel();
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
      <SlowStars />

      {/* Scene container — gentle idle breathing, zoom on transition */}
      <motion.div
        className="absolute inset-0"
        animate={
          isTransitioning
            ? { scale: 1.08, x: "-2%", y: "-1.5%" }
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
                className="flex flex-col items-start"
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
                  {continueLevel > 1 ? `Continue · Level ${continueLevel}` : "Start Journey"}
                </motion.button>

                {/* Level Map — secondary */}
                <motion.button
                  onClick={() => { playButtonClick(); setShowMap(true); }}
                  className="mt-6 font-medium tracking-wider tap-target"
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

                <motion.button
                  onClick={() => { playButtonClick(); setShowLearnMore(true); }}
                  className="hidden"
                  style={{
                    fontSize: "clamp(0.82rem, 1.12vw, 1rem)",
                    color: "rgba(255,236,196,0.62)",
                    padding: "5px 2px",
                    marginLeft: "64px",
                    background: "transparent",
                    border: "none",
                    textShadow: "0 0 12px rgba(255,217,122,0.2)",
                  }}
                  whileHover={{
                    y: -2,
                    color: "rgba(255,244,216,0.9)",
                    textShadow: "0 0 18px rgba(255,217,122,0.44)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <motion.span
                    className="absolute -left-3 top-1/2 h-px w-2 -translate-y-1/2"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,231,176,0.58))",
                    }}
                    animate={{ opacity: [0.18, 0.5, 0.18] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative inline-flex items-center gap-1.5">
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: [0.52, 0.86, 0.52], scale: [0.94, 1.06, 0.94] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {"\u2728"}
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      style={{ display: "none" }}
                      animate={{ opacity: [0.52, 0.86, 0.52], scale: [0.94, 1.06, 0.94] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✨
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      style={{ display: "none" }}
                      animate={{ opacity: [0.58, 0.95, 0.58], scale: [0.92, 1.08, 0.92] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✧
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      style={{ display: "none" }}
                      animate={{ opacity: [0.58, 0.95, 0.58], scale: [0.92, 1.08, 0.92] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✦
                    </motion.span>
                    <span>More adventures with Chelsea</span>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        onClick={() => { playButtonClick(); setShowLearnMore(true); }}
        className="absolute bottom-5 left-[6%] z-20 font-medium tracking-wide tap-target"
        style={{
          fontSize: "clamp(1rem, 1.55vw, 1.35rem)",
          color: "rgba(255,236,196,0.72)",
          padding: "6px 2px",
          background: "transparent",
          border: "none",
          textShadow: "0 0 14px rgba(255,217,122,0.28)",
        }}
        whileHover={{
          y: -2,
          color: "rgba(255,244,216,0.94)",
          textShadow: "0 0 20px rgba(255,217,122,0.48)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-2">
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.58, 0.92, 0.58], scale: [0.94, 1.08, 0.94] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {"\u2728"}
          </motion.span>
          <span>More adventures with Chelsea</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {showLearnMore && (
          <LearnMoreModal onClose={() => setShowLearnMore(false)} />
        )}
      </AnimatePresence>

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
