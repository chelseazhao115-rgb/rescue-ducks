"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { switchAmbience, stopAllAmbience } from "@/lib/utils/ambientSound";

interface IntroSequenceProps {
  onComplete: () => void;
}

type SceneId = "calm" | "storm" | "chelsea" | "magic" | "journey";

interface SceneDefinition {
  id: SceneId;
  duration: number;
  ambience: string;
}

interface Particle {
  left: number;
  top: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface RainDrop {
  left: number;
  top: number;
  height: number;
  duration: number;
  delay: number;
  drift: number;
}

interface SemanticLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const SCENES: SceneDefinition[] = [
  { id: "calm", duration: 3200, ambience: "night" },
  { id: "storm", duration: 2800, ambience: "storm" },
  { id: "chelsea", duration: 2400, ambience: "chelsea" },
  { id: "magic", duration: 2800, ambience: "orb" },
  { id: "journey", duration: 2500, ambience: "fade" },
];

const TOTAL_DURATION = SCENES.reduce((sum, scene) => sum + scene.duration, 0);
const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number): number {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function seed(prefix: string, i: number): number {
  let hash = 0;
  const key = `${prefix}-${i}`;
  for (let j = 0; j < key.length; j++) {
    hash = ((hash << 5) - hash + key.charCodeAt(j)) | 0;
  }
  return Math.abs(hash) / 2147483647;
}

function generateParticles(count: number, prefix: string): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    left: 8 + seed(`${prefix}-left`, i) * 84,
    top: 8 + seed(`${prefix}-top`, i + 20) * 74,
    size: 1.5 + seed(`${prefix}-size`, i + 40) * 3,
    driftX: -18 + seed(`${prefix}-x`, i + 60) * 36,
    driftY: -36 - seed(`${prefix}-y`, i + 80) * 44,
    duration: 4 + seed(`${prefix}-duration`, i + 100) * 5,
    delay: seed(`${prefix}-delay`, i + 120) * 5,
    opacity: 0.14 + seed(`${prefix}-opacity`, i + 140) * 0.34,
  }));
}

function generateRain(count: number): RainDrop[] {
  return Array.from({ length: count }, (_, i) => ({
    left: seed("intro-rain-left", i) * 110 - 5,
    top: seed("intro-rain-top", i + 10) * -30,
    height: 12 + seed("intro-rain-height", i + 20) * 28,
    duration: 0.9 + seed("intro-rain-duration", i + 30) * 0.9,
    delay: seed("intro-rain-delay", i + 40) * 2.5,
    drift: -18 - seed("intro-rain-drift", i + 50) * 28,
  }));
}

function generateSemanticLines(): SemanticLine[] {
  return [
    { x1: 37, y1: 46, x2: 50, y2: 42, delay: 0 },
    { x1: 50, y1: 42, x2: 64, y2: 47, delay: 0.16 },
    { x1: 42, y1: 55, x2: 57, y2: 52, delay: 0.32 },
    { x1: 48, y1: 36, x2: 61, y2: 34, delay: 0.48 },
  ];
}

function sceneOpacity(index: number, sceneIndex: number, progress: number): number {
  if (index === sceneIndex) {
    if (index === 0 && progress < 0.16) return smoothstep(progress / 0.16);
    if (progress > 0.88 && index < SCENES.length - 1) return 1 - smoothstep((progress - 0.88) / 0.12);
    return 1;
  }

  const shouldPreFadeNext = sceneIndex < 2;
  if (shouldPreFadeNext && index === sceneIndex + 1 && progress > 0.76) {
    return smoothstep((progress - 0.76) / 0.24);
  }

  if (index === sceneIndex - 1 && progress < 0.16) {
    return 1 - smoothstep(progress / 0.16);
  }

  return 0;
}

function SceneImage({
  src,
  opacity,
  push,
  blur = 0,
}: {
  src: string;
  opacity: number;
  push: number;
  blur?: number;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        opacity,
        scale: 1.02 + push * 0.035,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        transformOrigin: "54% 44%",
      }}
      draggable={false}
    />
  );
}

function WarmCaption({
  children,
  active,
  className = "",
  withPanel = false,
}: {
  children: React.ReactNode;
  active: boolean;
  className?: string;
  withPanel?: boolean;
}) {
  return (
    <motion.div
      className={`absolute z-30 pointer-events-none ${className}`}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 12,
        filter: active ? "blur(0px)" : "blur(3px)",
      }}
      transition={{ duration: 0.85, ease: CINEMATIC_EASE }}
    >
      <div
        className={withPanel ? "rounded-2xl border border-white/10 bg-[#101827]/28 px-5 py-4 shadow-2xl backdrop-blur-md" : ""}
        style={{
          textShadow: "0 2px 18px rgba(10, 13, 24, 0.72)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function FloatingParticles({
  particles,
  opacity,
  warm = false,
}: {
  particles: Particle[];
  opacity: number;
  warm?: boolean;
}) {
  return (
    <motion.div className="absolute inset-0 z-20 pointer-events-none" style={{ opacity }}>
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            background: warm ? "rgba(255, 224, 154, 0.72)" : "rgba(232, 229, 216, 0.48)",
            boxShadow: warm ? "0 0 12px rgba(255, 214, 129, 0.36)" : "0 0 10px rgba(210, 214, 235, 0.24)",
          }}
          animate={{
            x: [0, particle.driftX],
            y: [0, particle.driftY],
            opacity: [0, particle.opacity, 0],
            scale: [0.72, 1.12, 0.6],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function StarTwinkle({ visible }: { visible: number }) {
  return (
    <motion.div className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: visible }}>
      {Array.from({ length: 22 }, (_, i) => {
        const left = 5 + seed("intro-star-left", i) * 90;
        const top = 4 + seed("intro-star-top", i + 50) * 34;
        const size = seed("intro-star-size", i + 100) > 0.72 ? 2 : 1;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: "rgba(255, 244, 212, 0.72)",
              boxShadow: "0 0 8px rgba(255, 228, 168, 0.36)",
            }}
            animate={{ opacity: [0.16, 0.68, 0.2], scale: [0.8, 1.15, 0.8] }}
            transition={{
              duration: 2.5 + seed("intro-star-duration", i + 150) * 3.5,
              delay: seed("intro-star-delay", i + 200) * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </motion.div>
  );
}

function CloudPress({ intensity }: { intensity: number }) {
  return (
    <motion.div
      className="absolute inset-x-[-8%] top-[-8%] z-20 h-[46%] pointer-events-none"
      style={{
        opacity: intensity,
        background:
          "linear-gradient(180deg, rgba(20,24,43,0.78), rgba(55,58,91,0.32) 58%, transparent)",
        filter: "blur(8px)",
      }}
      animate={{ x: ["-2%", "3%", "-2%"], y: [-18 + intensity * 22, 0 + intensity * 10] }}
      transition={{ x: { duration: 11, repeat: Infinity, ease: "easeInOut" }, y: { duration: 1.4, ease: CINEMATIC_EASE } }}
    >
      <motion.div
        className="absolute left-[6%] top-[28%] h-28 w-[52%] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(48,52,82,0.62), transparent 70%)" }}
        animate={{ x: ["-4%", "5%", "-4%"] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[4%] top-[34%] h-24 w-[42%] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(45,46,76,0.54), transparent 72%)" }}
        animate={{ x: ["5%", "-4%", "5%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function DiagonalRain({ drops, intensity }: { drops: RainDrop[]; intensity: number }) {
  return (
    <motion.div className="absolute inset-0 z-30 pointer-events-none overflow-hidden" style={{ opacity: intensity }}>
      {drops.map((drop, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-px rounded-full"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            height: drop.height,
            rotate: "16deg",
            background: "linear-gradient(to bottom, rgba(219,224,235,0.2), rgba(219,224,235,0.02))",
          }}
          animate={{
            x: [0, drop.drift],
            y: ["-8vh", "112vh"],
            opacity: [0, 0.42, 0.06],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}

function LakeShimmer({ intensity, warm = false }: { intensity: number; warm?: boolean }) {
  return (
    <motion.div className="absolute inset-x-0 bottom-0 z-20 h-[34%] pointer-events-none" style={{ opacity: intensity }}>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`lake-${i}`}
          className="absolute h-px"
          style={{
            left: `${8 + i * 12}%`,
            bottom: `${14 + seed("intro-lake-bottom", i) * 18}%`,
            width: `${60 + seed("intro-lake-width", i) * 120}px`,
            background: warm
              ? "linear-gradient(90deg, transparent, rgba(255,220,150,0.28), transparent)"
              : "linear-gradient(90deg, transparent, rgba(210,216,235,0.16), transparent)",
            filter: "blur(1.5px)",
          }}
          animate={{
            x: ["-5%", "6%", "-5%"],
            opacity: [0.1, warm ? 0.52 : 0.36, 0.1],
            scaleX: [0.86, 1.08, 0.92],
          }}
          transition={{
            duration: 2.8 + i * 0.24 - intensity * 0.8,
            delay: i * 0.14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function LighthouseGlow({ intensity, flicker = false }: { intensity: number; flicker?: boolean }) {
  return (
    <motion.div
      className="absolute right-[14%] top-[17%] z-[25] h-[28vh] w-[28vh] max-h-72 max-w-72 rounded-full pointer-events-none"
      style={{
        opacity: intensity,
        background: "radial-gradient(circle, rgba(255,218,136,0.48), rgba(255,207,115,0.14) 42%, transparent 70%)",
        filter: "blur(12px)",
      }}
      animate={
        flicker
          ? { opacity: [intensity * 0.38, intensity, intensity * 0.18, intensity * 0.74, intensity * 0.28] }
          : { opacity: [intensity * 0.72, intensity, intensity * 0.72], scale: [0.98, 1.06, 0.98] }
      }
      transition={{ duration: flicker ? 1.4 : 3.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function DuckSilhouetteDrift({ visible, scattered }: { visible: number; scattered: boolean }) {
  return (
    <motion.div
      className="absolute bottom-[20%] left-[49%] z-30 flex -translate-x-1/2 gap-4 pointer-events-none"
      style={{ opacity: visible }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`duck-${i}`}
          className="h-3 w-6 rounded-full bg-[#f4dfb9]/28 shadow-[0_0_10px_rgba(246,220,178,0.12)]"
          animate={{
            x: scattered ? (i - 1) * 22 : [0, 2, 0],
            y: scattered ? [-2 + i * 4, 1 + i * 3, -2 + i * 4] : [0, -3, 0],
            rotate: scattered ? (i - 1) * 6 : [-1, 2, -1],
          }}
          transition={{ duration: scattered ? 1.8 : 3.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

function ChelseaPanel({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute bottom-[9%] left-[6%] z-40 flex w-[min(86vw,520px)] items-end gap-3 pointer-events-none sm:bottom-[10%] sm:left-[8%]"
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 18,
        filter: active ? "blur(0px)" : "blur(5px)",
      }}
      transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
    >
      <motion.img
        src="/scene3-Chelsea.png"
        alt=""
        className="h-[128px] w-[96px] shrink-0 object-contain sm:h-[164px] sm:w-[122px]"
        animate={active ? { y: [0, -4, 0] } : undefined}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />
      <div
        className="mb-3 rounded-2xl border border-white/[0.12] bg-[#111827]/[0.38] px-4 py-3 shadow-2xl backdrop-blur-md sm:px-5 sm:py-4"
        style={{ textShadow: "0 2px 14px rgba(8, 10, 20, 0.68)" }}
      >
        <p className="text-xl font-semibold leading-tight text-[#fff1d2] sm:text-3xl">快点……</p>
        <p className="mt-1 text-base font-medium leading-tight text-[#f6ead3]/[0.85] sm:text-xl">Hurry...</p>
        <div className="mt-3 h-px bg-white/10" />
        <p className="mt-3 text-base leading-snug text-[#fff3dc]/[0.88] sm:text-xl">小鸭子们还在外面。</p>
        <p className="mt-1 text-sm leading-snug text-[#eee2ce]/60 sm:text-base">The ducklings are still out there.</p>
      </div>
    </motion.div>
  );
}

function SemanticMagic({ active, dissolving }: { active: boolean; dissolving: boolean }) {
  const lines = useMemo(() => generateSemanticLines(), []);

  return (
    <motion.div
      className="absolute inset-0 z-[35] pointer-events-none"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.75, ease: CINEMATIC_EASE }}
    >
      <motion.div
        className="absolute left-1/2 top-[43%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,246,205,0.92), rgba(255,213,126,0.34) 42%, transparent 72%)",
          boxShadow: "0 0 36px rgba(255,220,143,0.48), 0 0 120px rgba(255,203,116,0.24)",
        }}
        animate={{
          y: [0, -8, 0],
          scale: dissolving ? [1, 1.16, 0.72] : [0.94, 1.06, 0.94],
          opacity: dissolving ? [1, 0.8, 0] : [0.78, 1, 0.78],
        }}
        transition={{ duration: dissolving ? 1.1 : 2.6, repeat: dissolving ? 0 : Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line, i) => (
          <motion.line
            key={`semantic-line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(255, 224, 150, 0.54)"
            strokeWidth="0.18"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: active ? (dissolving ? 0 : [0, 1, 0.85]) : 0,
              opacity: active ? (dissolving ? 0 : [0, 0.72, 0.5]) : 0,
            }}
            transition={{ duration: 1.2, delay: line.delay, ease: CINEMATIC_EASE }}
          />
        ))}
      </svg>

      {Array.from({ length: 14 }, (_, i) => (
        <motion.div
          key={`magic-travel-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#ffe3a0]"
          style={{
            left: `${42 + seed("magic-left", i) * 18}%`,
            top: `${39 + seed("magic-top", i) * 20}%`,
            boxShadow: "0 0 14px rgba(255, 218, 142, 0.65)",
          }}
          animate={{
            x: [0, 80 + seed("magic-x", i) * 120],
            y: [0, -80 - seed("magic-y", i) * 90],
            opacity: active ? [0, 0.9, dissolving ? 0 : 0.15] : 0,
            scale: [0.7, 1.2, 0.45],
          }}
          transition={{
            duration: 1.7 + seed("magic-duration", i) * 1.1,
            delay: 0.25 + seed("magic-delay", i) * 1.1,
            repeat: active && !dissolving ? Infinity : 0,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function GameplayHints({ visible }: { visible: number }) {
  return (
    <motion.div className="absolute inset-0 z-[35] pointer-events-none" style={{ opacity: visible }}>
      {["meaning", "rescue", "home"].map((word, i) => (
        <motion.div
          key={word}
          className="absolute rounded-full border border-[#ffe5ac]/[0.35] bg-[#fff2cb]/[0.12] px-4 py-2 text-sm font-semibold tracking-wide text-[#fff0cb] shadow-[0_0_24px_rgba(255,219,143,0.2)] backdrop-blur-sm sm:text-base"
          style={{
            left: `${35 + i * 12}%`,
            top: `${43 + (i % 2) * 10}%`,
          }}
          animate={{ y: [0, -10, 0], x: [0, i % 2 ? -6 : 6, 0] }}
          transition={{ duration: 3.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {word}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-4 right-4 top-4 flex items-start justify-between sm:left-8 sm:right-8"
        initial={false}
        animate={{ y: visible > 0 ? 0 : -12 }}
      >
        <div className="h-8 w-28 rounded-full border border-white/10 bg-white/[0.08] backdrop-blur-sm" />
        <div className="h-8 w-36 rounded-full border border-white/10 bg-white/[0.08] backdrop-blur-sm" />
      </motion.div>
    </motion.div>
  );
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const animFrameRef = useRef<number>(0);
  const sceneStartRef = useRef<number>(0);

  const softParticles = useMemo(() => generateParticles(22, "soft"), []);
  const warmParticles = useMemo(() => generateParticles(28, "warm"), []);
  const rainDrops = useMemo(() => generateRain(34), []);

  const finish = useCallback(() => {
    setSkipped(true);
    stopAllAmbience();
    window.setTimeout(onComplete, 520);
  }, [onComplete]);

  useEffect(() => {
    if (skipped) return;
    if (sceneIndex >= SCENES.length) {
      finish();
      return;
    }

    sceneStartRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - sceneStartRef.current;
      const duration = SCENES[sceneIndex].duration;
      const nextProgress = clamp01(elapsed / duration);
      setProgress(nextProgress);

      if (elapsed >= duration) {
        setSceneIndex((current) => current + 1);
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [finish, sceneIndex, skipped]);

  useEffect(() => {
    if (!skipped && sceneIndex < SCENES.length) {
      switchAmbience(SCENES[sceneIndex].ambience);
    }
  }, [sceneIndex, skipped]);

  useEffect(() => {
    return () => stopAllAmbience();
  }, []);

  const sceneId = SCENES[Math.min(sceneIndex, SCENES.length - 1)].id;
  const stormAmount = sceneIndex === 0 ? smoothstep(Math.max(0, (progress - 0.54) / 0.46)) : sceneIndex < 3 ? 1 : 1 - smoothstep(progress);
  const magicAmount = sceneId === "magic" ? smoothstep(progress / 0.38) : sceneId === "journey" ? 1 - smoothstep(progress) : 0;
  const journeyAmount = sceneId === "journey" ? smoothstep(progress / 0.5) : 0;
  const scenePush = smoothstep((progress - 0.22) / 0.78);

  const plates = [
    { src: "/scene1.png", push: sceneIndex === 0 ? progress : 0 },
    { src: "/scene2-back.png", push: sceneIndex <= 2 ? 0.25 + sceneIndex * 0.08 + progress * 0.2 : 0 },
    { src: "/scene2-back.png", push: 0.36 + progress * 0.12, blur: sceneId === "chelsea" ? 2.2 : 0 },
    { src: "/scene4.png", push: sceneId === "magic" ? scenePush * 0.28 : 0 },
    { src: "/scene5.png", push: sceneId === "journey" ? scenePush * 0.3 : 0 },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[100] overflow-hidden bg-[#080b16]"
      animate={skipped ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.52, ease: CINEMATIC_EASE }}
      onClick={finish}
    >
      {plates.map((plate, i) => (
        <SceneImage
          key={`${plate.src}-${i}`}
          src={plate.src}
          opacity={sceneOpacity(i, sceneIndex, progress)}
          push={plate.push}
          blur={plate.blur}
        />
      ))}

      <motion.img
        src="/scene2.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: sceneIndex >= 1 && sceneIndex <= 2 ? 0.18 + stormAmount * 0.18 : 0,
          scale: 1.025 + stormAmount * 0.015,
          mixBlendMode: "soft-light",
        }}
        draggable={false}
      />

      <motion.img
        src="/stage-1-background.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: sceneId === "journey" ? smoothstep((progress - 0.68) / 0.32) : 0,
          scale: 1.025,
        }}
        draggable={false}
      />

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(24,22,48,0.16), rgba(15,18,36,0.1) 45%, rgba(7,9,18,0.34))",
        }}
      />
      <motion.div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{
          opacity: 0.26 + stormAmount * 0.34 - magicAmount * 0.16,
          background: "radial-gradient(ellipse at center, transparent 42%, rgba(6,8,18,0.82) 100%)",
        }}
      />

      <StarTwinkle visible={sceneIndex === 0 ? 1 - stormAmount * 0.7 : journeyAmount * 0.8} />
      <FloatingParticles particles={softParticles} opacity={sceneIndex <= 1 ? 0.48 - stormAmount * 0.26 : journeyAmount * 0.2} />
      <FloatingParticles particles={warmParticles} opacity={magicAmount * 0.9 + journeyAmount * 0.64} warm />
      <CloudPress intensity={stormAmount} />
      <DiagonalRain drops={rainDrops} intensity={sceneIndex >= 1 && sceneIndex <= 2 ? 0.36 + stormAmount * 0.34 : 0} />
      <LakeShimmer intensity={sceneIndex === 0 ? 0.6 : sceneIndex <= 2 ? 0.9 : 0.75} warm={sceneIndex >= 3} />
      <LighthouseGlow intensity={sceneIndex === 0 ? 0.62 : sceneIndex === 1 ? 0.78 : sceneIndex >= 3 ? 1 : 0.48} flicker={sceneIndex === 1} />
      <DuckSilhouetteDrift visible={sceneIndex <= 1 ? 0.52 : 0} scattered={sceneIndex === 1} />
      <ChelseaPanel active={sceneId === "chelsea"} />
      <SemanticMagic active={sceneId === "magic"} dissolving={sceneId === "magic" && progress > 0.72} />
      <GameplayHints visible={journeyAmount} />

      <motion.div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          opacity: sceneIndex === 1 ? 1 : 0,
          background: "rgba(235, 228, 214, 0.08)",
        }}
        animate={{ opacity: sceneIndex === 1 ? [0, 0, 0.14, 0.01, 0.08, 0] : 0 }}
        transition={{ duration: 1.4, repeat: sceneIndex === 1 ? 1 : 0, ease: "easeOut" }}
      />

      <WarmCaption
        active={sceneId === "calm"}
        className="bottom-[13%] left-[7%] max-w-[320px] sm:bottom-[15%] sm:left-[9%]"
      >
        <p className="text-lg font-semibold uppercase tracking-[0.24em] text-[#f6ead3]/[0.82] sm:text-2xl">
          A calm night by the lake
        </p>
      </WarmCaption>

      <WarmCaption
        active={sceneId === "storm"}
        className="bottom-[13%] left-[7%] max-w-[320px] sm:bottom-[15%] sm:left-[9%]"
      >
        <p className="text-lg font-semibold lowercase tracking-[0.2em] text-[#f3e7d3]/76 sm:text-2xl">
          the wind is rising
        </p>
      </WarmCaption>

      <WarmCaption
        active={sceneId === "magic"}
        className="bottom-[8%] left-1/2 w-[min(88vw,440px)] -translate-x-1/2 text-center sm:bottom-[9%]"
        withPanel
      >
        <p className="text-2xl font-semibold leading-tight text-[#fff0cf] sm:text-4xl">连接词义，点亮灯塔。</p>
        <p className="mt-2 text-base font-medium leading-snug text-[#f7e8c9]/[0.82] sm:text-xl">Connect meanings.</p>
        <p className="text-base font-medium leading-snug text-[#f7e8c9]/[0.82] sm:text-xl">Light the lighthouse.</p>
      </WarmCaption>

      <WarmCaption
        active={sceneId === "journey"}
        className="bottom-[11%] left-1/2 w-[min(86vw,420px)] -translate-x-1/2 text-center sm:bottom-[12%]"
        withPanel
      >
        <p className="text-2xl font-semibold tracking-wide text-[#fff0cf] sm:text-4xl">Light the way home.</p>
      </WarmCaption>

      <motion.div
        className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5e8ce]/28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        tap to skip
      </motion.div>

      <div className="sr-only">Intro duration: {TOTAL_DURATION}ms</div>
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
