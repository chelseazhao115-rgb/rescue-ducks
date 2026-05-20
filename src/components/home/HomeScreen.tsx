"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { LighthouseBackground } from "./LighthouseBackground";
import { LevelMap } from "./LevelMap";

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
    <main className="relative w-full h-dvh bg-storm-dark overflow-hidden">
      <AnimatedBackground variant="home" stormIntensity={0.5} />
      <LighthouseBackground />

      {/* Scrollable content */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div className="min-h-dvh flex flex-col items-center justify-between py-8">
          {/* Title area */}
          <div className="text-center px-4 pt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-lighthouse-glow drop-shadow-[0_0_20px_rgba(245,214,123,0.3)]">
              Rescue Duck
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/40">
              Match synonyms. Light the lighthouse. Save the ducks.
            </p>
          </div>

          {/* Level map or start prompt */}
          <AnimatePresence mode="wait">
            {showMap ? (
              <motion.div
                key="map"
                className="w-full py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
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
                <motion.button
                  onClick={handleQuickStart}
                  className="relative px-10 py-4 text-lg font-semibold text-storm-dark rounded-full
                             bg-gradient-to-b from-lighthouse-glow to-light-gold
                             shadow-[0_0_30px_rgba(245,214,123,0.4)]"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245,214,123,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-lighthouse-glow/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Light the Lighthouse
                </motion.button>
                <motion.button
                  onClick={() => setShowMap(true)}
                  className="text-sm text-white/40 hover:text-white/60 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Select Level
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom spacer */}
          <div />
        </div>
      </div>

      {/* Back button when map is shown */}
      {showMap && (
        <motion.button
          onClick={() => setShowMap(false)}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full
                     bg-white/10 border border-white/10 flex items-center justify-center
                     text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </motion.button>
      )}
    </main>
  );
};
