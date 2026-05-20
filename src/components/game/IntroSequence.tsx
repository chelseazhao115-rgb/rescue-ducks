"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { switchAmbience, stopAllAmbience } from "@/lib/utils/ambientSound";

interface IntroSequenceProps {
  onComplete: () => void;
}

// Scene timing (ms)
const SCENE_DURATIONS = [3200, 2800, 2400, 2800, 1500];
const TOTAL_DURATION = SCENE_DURATIONS.reduce((a, b) => a + b, 0);

// ---- Rain particle system ----
function RainParticles({ intensity }: { intensity: number }) {
  const count = Math.floor(6 + intensity * 20);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -10}%`,
            height: `${6 + Math.random() * 14}px`,
            opacity: 0.1 + intensity * 0.3,
          }}
          animate={{ y: ["-5%", "105%"] }}
          transition={{
            duration: 0.6 + Math.random() * 0.8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// ---- Duck silhouettes ----
function DuckSilhouettes({ scattered }: { scattered: boolean }) {
  return (
    <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex gap-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          animate={
            scattered
              ? {
                  x: (i - 1) * 40 + Math.sin(i) * 10,
                  y: -5 + i * 3,
                  rotate: (i - 1) * 8,
                  opacity: 0.35,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 0.6 }
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Duck body */}
          <div className="w-7 h-5 rounded-full bg-duck-body/70" />
          {/* Beak */}
          <div className="w-2.5 h-1.5 -mt-0.5 rounded-r-full bg-duck-beak/60 ml-2" />
          {/* Tiny feet (dots) */}
          <div className="flex gap-1 mt-0.5">
            <div className="w-1 h-1 rounded-full bg-duck-beak/30" />
            <div className="w-1 h-1 rounded-full bg-duck-beak/30" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ---- Lake surface ----
function LakeSurface({ choppy }: { choppy: boolean }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[30%]"
      style={{
        background:
          "linear-gradient(to top, rgba(12,26,43,0.95), rgba(27,58,92,0.4), transparent)",
      }}
      animate={
        choppy
          ? { y: [0, 3, -2, 0], opacity: [0.9, 1, 0.85, 0.9] }
          : { y: [0, 1, 0], opacity: [0.9, 0.92, 0.9] }
      }
      transition={
        choppy
          ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {/* Lake shimmer lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-white/[0.04]"
          style={{
            top: `${15 + i * 8}%`,
            left: `${10 + i * 15}%`,
            width: `${20 + Math.random() * 40}%`,
          }}
          animate={{ opacity: choppy ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2] }}
          transition={{
            duration: 1.5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

// ---- Lighthouse with glow ----
function IntroLighthouse({ lit, flickering }: { lit: boolean; flickering: boolean }) {
  return (
    <div className="absolute right-[18%] top-[22%]">
      {/* Glow halo */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,214,123,0.5) 0%, transparent 60%)",
        }}
        animate={
          flickering
            ? { opacity: [0.3, 0.6, 0.1, 0.5, 0.05, 0] }
            : lit
              ? { opacity: [0.3, 0.6, 0.3] }
              : { opacity: 0.25 }
        }
        transition={
          flickering
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* Tower */}
      <div className="w-10 h-28 relative"
        style={{
          background: "linear-gradient(to right, #151d30, #253550, #151d30)",
          clipPath: "polygon(22% 0%, 78% 0%, 86% 100%, 14% 100%)",
        }}
      />
      {/* Lantern top */}
      <motion.div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-5 rounded-t"
        style={{
          background: lit ? "rgba(245,214,123,0.35)" : "rgba(245,214,123,0.08)",
        }}
        animate={
          flickering
            ? { opacity: [0.1, 0.3, 0.05, 0.2, 0, 0] }
            : lit
              ? { opacity: [0.2, 0.4, 0.2] }
              : { opacity: 0.08 }
        }
        transition={{ duration: flickering ? 1.5 : 2.5, repeat: Infinity }}
      />
    </div>
  );
}

// ---- Cabin warm light (bottom-left area) ----
function CabinLight({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      className="absolute left-[12%] bottom-[28%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Cabin warm glow */}
      <div
        className="w-16 h-14 rounded-lg"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,180,80,0.15) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />
      {/* Window lights */}
      <div className="absolute top-2 left-2 w-3 h-3 rounded-sm bg-orange-200/20" />
      <div className="absolute top-2 right-3 w-3 h-3 rounded-sm bg-orange-200/15" />
    </motion.div>
  );
}

// ---- Magical orb ----
function MagicalOrb({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,214,123,0.25) 0%, transparent 60%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,232,160,0.8) 0%, rgba(245,214,123,0.3) 50%, transparent 70%)",
              boxShadow: "0 0 40px rgba(245,214,123,0.6), 0 0 80px rgba(245,214,123,0.3)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Core */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: "radial-gradient(circle, #fff 0%, rgba(255,232,160,0.9) 40%, transparent 70%)",
            }}
          />

          {/* Floating particles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-lighthouse-glow/60"
              animate={{
                x: [0, (Math.random() - 0.5) * 60],
                y: [0, (Math.random() - 0.5) * 60],
                opacity: [0.8, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                ease: "easeOut",
                delay: Math.random() * 1,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---- Vignette overlay ----
function Vignette({ intensity }: { intensity: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(5,8,20,${0.3 + intensity * 0.5}) 100%)`,
      }}
    />
  );
}

// ---- Cloud overlay ----
function StormClouds({ intensity }: { intensity: number }) {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 pointer-events-none"
      animate={{ y: intensity > 0 ? 0 : -80 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div
        className="w-full h-40"
        style={{
          background: `linear-gradient(to bottom, rgba(10,14,23,${0.5 + intensity * 0.5}) 0%, rgba(26,39,64,${0.3 + intensity * 0.3}) 50%, transparent 100%)`,
        }}
      />
      {/* Cloud masses */}
      {intensity > 0.3 && (
        <>
          <motion.div
            className="absolute top-8 left-0 w-1/2 h-20 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(20,30,50,0.6) 0%, transparent 70%)" }}
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-12 right-0 w-2/5 h-16 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(20,30,50,0.5) 0%, transparent 70%)" }}
            animate={{ x: ["10%", "-5%", "10%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </motion.div>
  );
}

// =================== MAIN COMPONENT ===================
export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [scene, setScene] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1 within current scene
  const animFrameRef = useRef<number>(0);
  const sceneStartRef = useRef<number>(0);

  const finish = useCallback(() => {
    setSkipped(true);
    stopAllAmbience();
    setTimeout(onComplete, 500);
  }, [onComplete]);

  // Scene auto-advance
  useEffect(() => {
    if (skipped) return;
    if (scene >= SCENE_DURATIONS.length) {
      finish();
      return;
    }

    sceneStartRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - sceneStartRef.current;
      const dur = SCENE_DURATIONS[scene];
      setProgress(Math.min(1, elapsed / dur));

      if (elapsed >= dur) {
        setScene((s) => s + 1);
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [scene, skipped, finish]);

  // Ambient sound per scene
  useEffect(() => {
    if (skipped) return;
    const scenes = ["night", "storm", "chelsea", "orb", "fade"];
    switchAmbience(scenes[Math.min(scene, scenes.length - 1)]);
  }, [scene, skipped]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAllAmbience();
  }, []);

  const isScene = (id: number) => scene === id;
  const pastScene = (id: number) => scene > id;

  // Scene states
  const showNight = scene >= 0;
  const showStorm = scene >= 1;
  const showChelsea = scene >= 2;
  const showOrb = scene >= 3;
  const isFading = scene >= 4;

  // Intensity lerps
  const stormIntensity = scene === 0 ? 0 : scene === 1 ? progress : 1;
  const orbActive = scene >= 3;

  return (
    <motion.div
      className="absolute inset-0 z-[100] overflow-hidden"
      style={{ backgroundColor: "#070b14" }}
      animate={skipped ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ---- STATIC BACKGROUND ---- */}
      {/* Stars (subtle, visible in scene 1-2) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-white/40"
            style={{
              left: `${5 + (i * 37) % 90}%`,
              top: `${3 + (i * 23) % 30}%`,
            }}
            animate={showStorm ? { opacity: [0.3, 0, 0.3] } : { opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Cabin light (diminishes with storm) */}
      <CabinLight visible={!pastScene(2)} />

      {/* Lake */}
      <LakeSurface choppy={showStorm} />

      {/* Lighthouse */}
      <IntroLighthouse lit={!showStorm || scene < 2} flickering={scene === 1} />

      {/* Ducks */}
      <DuckSilhouettes scattered={showStorm} />

      {/* Storm clouds */}
      <StormClouds intensity={scene <= 0 ? 0 : Math.min(1, progress + (scene > 1 ? 1 : 0))} />

      {/* Rain (intensifies with storm) */}
      {showStorm && <RainParticles intensity={Math.min(1, stormIntensity * 1.2)} />}

      {/* Vignette */}
      <Vignette intensity={stormIntensity} />

      {/* ---- SCENE OVERLAYS ---- */}

      {/* Scene 1: Calm night mood text */}
      <AnimatePresence>
        {isScene(0) && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="text-white/20 text-sm tracking-[0.3em] uppercase"
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              A calm night by the lake
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Storm mood */}
      <AnimatePresence>
        {isScene(1) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Lightning flash */}
            <motion.div
              className="absolute inset-0 bg-white/5"
              animate={{ opacity: [0, 0, 0.15, 0, 0.08, 0] }}
              transition={{ duration: 0.8, repeat: 2, ease: "easeOut" }}
            />
            {/* Mood text */}
            <motion.p
              className="absolute top-1/3 left-1/2 -translate-x-1/2 text-white/25 text-xs tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            >
              the wind is rising
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Chelsea warning */}
      <AnimatePresence>
        {isScene(2) && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Text appears first */}
            <motion.p
              className="text-xl text-white/70 font-medium text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              快点……
            </motion.p>
            <motion.p
              className="text-sm text-white/30 text-center -mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Hurry...
            </motion.p>

            {/* Chelsea avatar fades in after text */}
            <motion.div
              className="flex flex-col items-center gap-1 mt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <div className="w-14 h-14 rounded-full bg-chelsea/15 border border-chelsea/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-chelsea/50">
                  <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
                  <path d="M4 20c0-4 4-7 8-7s8 3 8 7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[10px] text-chelsea/30">Chelsea</span>
            </motion.div>

            {/* Full dialogue */}
            <motion.p
              className="text-sm text-white/50 text-center mt-1 max-w-[280px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              小鸭子们还在外面。
            </motion.p>
            <motion.p
              className="text-[11px] text-white/20 text-center -mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              The ducklings are still out there.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Hope — magical orb + Chelsea guidance */}
      <AnimatePresence>
        {isScene(3) && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Orb appears */}
            <MagicalOrb active={true} />

            {/* Chelsea guidance below orb */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <p className="text-base text-lighthouse-glow/70 font-medium">
                连接词义，点亮灯塔。
              </p>
              <p className="mt-1 text-[11px] text-white/25">
                Connect meanings. Light the lighthouse.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Fade to gameplay */}
      <AnimatePresence>
        {isFading && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gentle brightening */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(245,214,123,0.05) 0%, transparent 60%)",
              }}
              animate={{ opacity: [0, 0.6, 1] }}
              transition={{ duration: 1.2 }}
            />
            {/* Final ellipse hint */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.2 }}
            >
              <p className="text-white/15 text-xs tracking-widest">...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Skip hint ---- */}
      <motion.button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/15
                   hover:text-white/30 transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={finish}
      >
        tap to skip
      </motion.button>
    </motion.div>
  );
};

export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("rescueDuckIntroSeenV2") !== "true";
}

export function markIntroSeen(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("rescueDuckIntroSeenV2", "true");
  }
}
