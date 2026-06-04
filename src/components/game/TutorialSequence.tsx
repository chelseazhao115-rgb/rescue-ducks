"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { audioManager } from "@/lib/audio/AudioManager";
import { playButtonClick, playChainSound, playCorrectSound, unlockAudio } from "@/lib/utils/sound";
import { WordOrb } from "./WordOrb";

interface TutorialSequenceProps {
  onComplete: () => void;
}

type TutorialStep = "connect" | "meaning" | "help" | "ready";

const TUTORIAL_SEEN_KEY = "rescueDuckTutorialSeenV1";

const ORB_POSITIONS = {
  respond: { x: 0.38, y: 0.42 },
  react: { x: 0.62, y: 0.42 },
  exclude: { x: 0.5, y: 0.43 },
  assist: { x: 0.38, y: 0.43 },
  aid: { x: 0.62, y: 0.43 },
};

export function shouldPlayTutorial(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(TUTORIAL_SEEN_KEY) !== "true";
}

export function markTutorialSeen(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TUTORIAL_SEEN_KEY, "true");
  }
}

export function resetTutorialSeen(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TUTORIAL_SEEN_KEY);
  }
}

interface AnchorPoint {
  x: number;
  y: number;
}

function tutorialCurve(from: AnchorPoint, to: AnchorPoint) {
  const x1 = from.x;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.max(1, Math.hypot(dx, dy));
  const normalX = -dy / length;
  const normalY = dx / length;
  const bend = Math.min(42, length * 0.12);
  const cx = (x1 + x2) / 2 + normalX * bend;
  const cy = (y1 + y2) / 2 + normalY * bend;
  const samples = [0, 0.28, 0.55, 0.82, 1].map((t) => {
    const inv = 1 - t;
    return {
      x: inv * inv * x1 + 2 * inv * t * cx + t * t * x2,
      y: inv * inv * y1 + 2 * inv * t * cy + t * t * y2,
    };
  });

  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, samples };
}

function ChelseaTutorialBubble({ step }: { step: TutorialStep }) {
  const lines = {
    connect: [
      "Try connecting words with similar meanings.",
      "连接意思相近的词，帮助小鸭回家。",
    ],
    meaning: [
      "Don't know a word? Double-click it.",
      "遇到生词？试试双击它。",
    ],
    help: [
      "Stuck? Ask Chelsea once per level.",
      "卡住时，每关可以向 Chelsea 求助一次。",
    ],
    ready: [
      "Connect synonyms. Learn naturally. Rescue ducks.",
      "连接同义替换，自然记住词义，带小鸭回家。",
    ],
  }[step];

  return (
    <motion.div
      className="absolute left-[1.5%] bottom-[18%] z-30 flex items-end gap-3 pointer-events-none"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className="overflow-hidden rounded-full border-2"
        style={{
          width: "calc(176px * var(--vscale, 1))",
          height: "calc(176px * var(--vscale, 1))",
          borderColor: "rgba(255,255,255,0.28)",
          boxShadow: "0 0 24px rgba(255,231,176,0.2), 0 4px 18px rgba(0,0,0,0.28)",
        }}
      >
        <img src="/chelsea2.png" alt="Chelsea" className="h-full w-full object-cover" draggable={false} />
      </div>
      <div
        style={{
          maxWidth: "calc(760px * var(--vscale, 1))",
          padding: "calc(14px * var(--vscale, 1)) calc(24px * var(--vscale, 1))",
          borderRadius: "calc(32px * var(--vscale, 1))",
          borderBottomLeftRadius: "calc(8px * var(--vscale, 1))",
          background: "rgba(20, 12, 40, 0.58)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow: "0 4px 22px rgba(0,0,0,0.26)",
        }}
      >
        <div
          style={{
            color: "#ffe7b0",
            fontSize: "calc(32px * var(--vscale, 1))",
            fontWeight: 800,
            marginBottom: "calc(4px * var(--vscale, 1))",
            letterSpacing: "0.04em",
          }}
        >
          Chelsea
        </div>
        <div style={{ color: "rgba(255,255,255,0.94)", fontSize: "calc(30px * var(--vscale, 1))", lineHeight: 1.35, fontWeight: 600 }}>
          {lines[0]}
        </div>
        <div style={{ color: "rgba(255,231,176,0.82)", fontSize: "calc(24px * var(--vscale, 1))", lineHeight: 1.45, fontWeight: 600, marginTop: "calc(4px * var(--vscale, 1))" }}>
          {lines[1]}
        </div>
      </div>
    </motion.div>
  );
}

function TutorialLighthouse({ lit }: { lit: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        right: "calc(16% + 42px)",
        top: "23%",
        transform: "translate(50%, -50%)",
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "210px",
          height: "210px",
          left: "-105px",
          top: "-105px",
          background: "radial-gradient(circle, rgba(255,220,130,0.7), rgba(255,190,100,0.32) 42%, transparent 72%)",
          filter: "blur(10px)",
        }}
        animate={{ opacity: lit ? [0.78, 1, 0.78] : [0.55, 0.68, 0.55], scale: lit ? [1, 1.12, 1] : [1, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute flex flex-col items-center"
        style={{ left: "50%", top: "-150px", transform: "translateX(-50%)" }}
      >
        <svg width="70" height="70" viewBox="0 0 40 40" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="#ffd97a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 16}`}
            animate={{ strokeDashoffset: `${2 * Math.PI * 16 * (1 - (lit ? 18 : 10) / 100)}` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </svg>
        <motion.span
          className="font-extrabold mt-0.5"
          style={{ fontSize: "calc(30px * var(--vscale, 1))", color: "#ffd97a", textShadow: "0 0 16px rgba(255,217,122,0.5)" }}
          animate={{ scale: lit ? [1, 1.16, 1] : 1 }}
          transition={{ duration: 0.7 }}
        >
          {lit ? "18%" : "10%"}
        </motion.span>
      </motion.div>
    </div>
  );
}

function TutorialDucks({ moved }: { moved: boolean }) {
  return (
    <div className="absolute bottom-3 left-3 right-32 z-20 pointer-events-none">
      <div className="relative h-[5.9rem]">
        <motion.img
          src="/duck_2d_pure.png"
          alt=""
          className="absolute left-0 bottom-0 w-30 h-[5.6rem] object-contain"
          draggable={false}
          animate={{
            x: moved ? "calc(100vw - 250px)" : 0,
            y: [0, -4, 0],
            opacity: moved ? 1 : 0.62,
          }}
          transition={{
            x: { duration: 1.1, ease: "easeOut" },
            y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ filter: moved ? "drop-shadow(0 0 8px rgba(255,217,122,0.36))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.16))" }}
        />
      </div>
    </div>
  );
}

function TutorialChain() {
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        setContainerSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    }

    const frame = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);

  function getOrbAnchor(orbId: string, fallback: { x: number; y: number }): AnchorPoint {
    const container = containerRef.current;
    const orbEl = document.querySelector<HTMLElement>(`[data-orb-id="${orbId}"]`);
    if (!container || !orbEl || containerSize.w === 0 || containerSize.h === 0) {
      return {
        x: fallback.x * containerSize.w,
        y: fallback.y * containerSize.h,
      };
    }

    const containerRect = container.getBoundingClientRect();
    const orbRect = orbEl.getBoundingClientRect();
    return {
      x: orbRect.left - containerRect.left + orbRect.width / 2,
      y: orbRect.top - containerRect.top + orbRect.height / 2,
    };
  }

  const from = getOrbAnchor("respond", ORB_POSITIONS.respond);
  const to = getOrbAnchor("react", ORB_POSITIONS.react);
  const curve = tutorialCurve(from, to);
  const xs = curve.samples.map((p) => p.x);
  const ys = curve.samples.map((p) => p.y);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[8] overflow-visible">
      <svg className="h-full w-full" style={{ overflow: "visible", mixBlendMode: "screen" }}>
        <defs>
          <linearGradient id="tutorial-chain-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(185,217,255,0.18)" />
            <stop offset="36%" stopColor="rgba(217,200,255,0.72)" />
            <stop offset="58%" stopColor="rgba(255,238,176,1)" />
            <stop offset="100%" stopColor="rgba(255,247,224,0.28)" />
          </linearGradient>
          <filter id="tutorial-chain-glow-filter" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tutorial-chain-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[curve.samples[0], curve.samples[4]].map((point, endpointIndex) => (
          <g key={endpointIndex}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={2.8}
              fill="rgba(255,226,156,0.18)"
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: [0.28, 0.56, 0.28], scale: [0.75, 1.12, 0.75] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: endpointIndex * 0.18 }}
              style={{ filter: "url(#tutorial-chain-glow-filter)" }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={0.8}
              fill="rgba(255,250,224,0.78)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0.62, 1, 0.62], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: endpointIndex * 0.14 }}
            />
          </g>
        ))}

        <motion.path
          d={curve.d}
          fill="none"
          stroke="rgba(255,232,168,0.34)"
          strokeLinecap="round"
          strokeWidth={2.1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.24, 0.52, 0.24] }}
          transition={{
            pathLength: { duration: 0.38, ease: "easeOut" },
            opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ filter: "url(#tutorial-chain-glow-filter)" }}
        />
        <motion.path
          d={curve.d}
          fill="none"
          stroke="url(#tutorial-chain-glow)"
          strokeLinecap="round"
          strokeWidth={0.75}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.78, 1, 0.78] }}
          transition={{
            pathLength: { duration: 0.38, ease: "easeOut" },
            opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ filter: "url(#tutorial-chain-soft-glow)" }}
        />
        <motion.path
          d={curve.d}
          fill="none"
          stroke="rgba(255,252,232,0.92)"
          strokeDasharray="1 1.6"
          strokeLinecap="round"
          strokeWidth={0.24}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.54, 1, 0.54], strokeDashoffset: [4, 0] }}
          transition={{
            pathLength: { duration: 0.38, ease: "easeOut" },
            opacity: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
            strokeDashoffset: { duration: 0.9, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.circle
          r={0.62}
          fill="rgba(255,250,224,0.96)"
          animate={{ cx: xs, cy: ys, opacity: [0, 1, 0.92, 0.48, 0], scale: [0.45, 1.34, 1.05, 0.78, 0.35] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          r={0.38}
          fill="rgba(220,204,255,0.82)"
          animate={{ cx: xs, cy: ys, opacity: [0, 0.82, 0.62, 0.26, 0], scale: [0.35, 1.05, 0.82, 0.56, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.32 }}
        />
      </svg>
    </div>
  );
}

function TutorialAskChelseaButton({
  used,
  onClick,
}: {
  used: boolean;
  onClick: () => void;
}) {
  return (
    <div className="absolute right-0 top-0 z-50 flex flex-col items-end gap-1 pr-2 pt-2">
      <div className="mr-7 w-[170px] max-w-[calc(100vw-88px)] px-0 pt-2">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-medium uppercase tracking-wider text-white/52" style={{ fontSize: "15px" }}>
            Storm
          </span>
          <span className="ml-auto text-white/45" style={{ fontSize: "15px" }}>
            0%
          </span>
        </div>
        <div className="h-[6px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-0 rounded-full bg-[#90b0e0]" />
        </div>
      </div>

      <div className="relative mr-7">
        {!used && (
          <>
            <motion.div
              className="pointer-events-none absolute -inset-2 rounded-full border border-[#ffe7b0]/60"
              animate={{ scale: [0.96, 1.2, 0.96], opacity: [0.18, 0.72, 0.18] }}
              transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <motion.button
          type="button"
          onClick={onClick}
          disabled={used}
          className="relative z-10 flex h-9 items-center justify-center gap-2 rounded-full px-3 font-semibold"
          style={{
            background: used ? "rgba(255,255,255,0.05)" : "rgba(255,231,176,0.12)",
            border: used ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,231,176,0.22)",
            color: used ? "rgba(255,255,255,0.38)" : "rgba(255,242,207,0.86)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={used ? undefined : { scale: 1.06, background: "rgba(255,231,176,0.18)" }}
          whileTap={used ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 0-4 12.74V16h8v-1.26A7 7 0 0 0 12 2Z" />
          </svg>
          <span className="text-sm tracking-wide">{used ? "Used" : "Ask Chelsea"}</span>
        </motion.button>
      </div>
    </div>
  );
}

function TutorialAskChelseaArrow() {
  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-40 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.48, 1, 0.48] }}
      transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <filter id="tutorial-help-arrow-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M 69 43 C 76 36 81 27 87 16"
        stroke="rgba(255,220,120,0.26)"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: "url(#tutorial-help-arrow-glow)" }}
        animate={{ pathLength: [0.82, 1, 0.82] }}
        transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 69 43 C 76 36 81 27 87 16"
        stroke="rgba(255,242,207,0.92)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeDasharray="9 7"
        vectorEffect="non-scaling-stroke"
        style={{ filter: "url(#tutorial-help-arrow-glow)" }}
        animate={{ strokeDashoffset: [24, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 83.5 15.2 L 88.5 14.4 L 87.5 19.4"
        stroke="rgba(255,242,207,0.98)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: "url(#tutorial-help-arrow-glow)" }}
        animate={{ x: [-0.6, 0.8, -0.6], y: [0.8, -0.7, 0.8] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export const TutorialSequence: React.FC<TutorialSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<TutorialStep>("connect");
  const [selected, setSelected] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [meaningVisible, setMeaningVisible] = useState(false);
  const [helpUsed, setHelpUsed] = useState(false);

  useEffect(() => {
    audioManager.playMusic("gameplay", 1.4);
  }, []);

  const connectStatus = useMemo(() => ({
    respond: selected.includes("respond") ? "selected" as const : "idle" as const,
    react: connected ? "chained" as const : selected.includes("react") ? "selected" as const : "idle" as const,
  }), [connected, selected]);

  const handleConnectTap = (orbId: string) => {
    if (step !== "connect" || connected) return;
    unlockAudio();
    setSelected((current) => {
      if (current.includes(orbId)) return current;
      const next = [...current, orbId];
      if (next.includes("respond") && next.includes("react")) {
        playChainSound(2);
        window.setTimeout(() => {
          setConnected(true);
          window.setTimeout(() => setStep("meaning"), 2600);
        }, 120);
      } else {
        playCorrectSound();
      }
      return next;
    });
  };

  const handlePeek = (orbId: string) => {
    if (step !== "meaning" || orbId !== "exclude") return;
    unlockAudio();
    playButtonClick();
    setMeaningVisible(true);
    window.setTimeout(() => setStep("help"), 1600);
  };

  const handleChelseaHelp = () => {
    if (step !== "help" || helpUsed) return;
    unlockAudio();
    playButtonClick();
    setHelpUsed(true);
    window.setTimeout(() => setStep("ready"), 2600);
  };

  const finish = () => {
    playButtonClick();
    markTutorialSeen();
    onComplete();
  };

  return (
    <div className="absolute inset-0 z-40 overflow-hidden">
      <motion.div
        className="absolute left-5 top-5 z-50 rounded-full border px-6 py-3 font-extrabold uppercase tracking-[0.18em] text-[#fff2cf]"
        style={{
          background: "rgba(20, 12, 40, 0.52)",
          borderColor: "rgba(255,231,176,0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          fontSize: "calc(24px * var(--vscale, 1))",
          boxShadow: "0 0 20px rgba(255,217,122,0.1)",
        }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Demo
      </motion.div>

      <TutorialLighthouse lit={connected} />
      <TutorialDucks moved={connected} />

      <AnimatePresence>
        {step === "connect" && (
          <motion.div key="connect" className="absolute inset-0">
            {!selected.includes("respond") && (
              <motion.div
                className="absolute rounded-full border border-[#ffe7b0]/60"
                style={{
                  left: `${ORB_POSITIONS.respond.x * 100}%`,
                  top: `${ORB_POSITIONS.respond.y * 100}%`,
                  width: "calc(190px * var(--vscale, 1))",
                  height: "calc(190px * var(--vscale, 1))",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [0.92, 1.22, 0.92], opacity: [0.2, 0.72, 0.2] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {connected && (
              <>
                <TutorialChain />
                <motion.div
                  className="absolute left-1/2 top-[28%] -translate-x-1/2 rounded-full border px-5 py-2 text-center font-bold text-[#fff2cf]"
                  style={{ background: "rgba(20,12,40,0.5)", borderColor: "rgba(255,231,176,0.22)", fontSize: "calc(28px * var(--vscale, 1))" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Same meaning found
                </motion.div>
                <motion.div
                  className="absolute left-[54%] bottom-[26%] -translate-x-1/2 text-center font-semibold text-[#fff2cf]"
                  style={{ fontSize: "calc(36px * var(--vscale, 1))", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div>Every connection lights the lighthouse.</div>
                  <div className="mt-1 text-[#ffe7b0]/90" style={{ fontSize: "calc(30px * var(--vscale, 1))" }}>
                    每找到一组同义替换，灯塔都会更亮一点。
                  </div>
                </motion.div>
              </>
            )}

            <WordOrb orbId="respond" word="respond" meaning="v. 回应" connectionLabel="IELTS Meaning" groupId="tutorial-connect" groupColorIndex={1} status={connectStatus.respond} showMeaning={false} position={ORB_POSITIONS.respond} onTap={handleConnectTap} onPeek={() => {}} />
            <WordOrb orbId="react" word="react" meaning="v. 回应；反应" connectionLabel="IELTS Meaning" groupId="tutorial-connect" groupColorIndex={1} status={connectStatus.react} showMeaning={false} position={ORB_POSITIONS.react} onTap={handleConnectTap} onPeek={() => {}} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step !== "connect" && (
          <motion.div key="meaning" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {step === "meaning" && (
              <motion.div
                className="absolute rounded-full border border-[#ffe7b0]/60"
                style={{
                  left: `${ORB_POSITIONS.exclude.x * 100}%`,
                  top: `${ORB_POSITIONS.exclude.y * 100}%`,
                  width: "calc(210px * var(--vscale, 1))",
                  height: "calc(210px * var(--vscale, 1))",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [0.92, 1.2, 0.92], opacity: [0.18, 0.66, 0.18] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {step === "meaning" && (
              <WordOrb orbId="exclude" word="exclude" meaning="v. 排除；不包括" connectionLabel="IELTS Meaning" groupId="tutorial-meaning" groupColorIndex={2} status={meaningVisible ? "selected" : "idle"} showMeaning={meaningVisible} position={ORB_POSITIONS.exclude} onTap={() => {}} onPeek={handlePeek} />
            )}

            {(step === "help" || step === "ready") && (
              <>
                <WordOrb orbId="assist" word="assist" meaning="v. 帮助" connectionLabel="IELTS Meaning" groupId="tutorial-help" groupColorIndex={3} hintHighlighted={helpUsed} status="idle" showMeaning={false} position={ORB_POSITIONS.assist} onTap={() => {}} onPeek={() => {}} />
                <WordOrb orbId="aid" word="aid" meaning="v. 帮助；援助" connectionLabel="IELTS Meaning" groupId="tutorial-help" groupColorIndex={3} hintHighlighted={helpUsed} status="idle" showMeaning={false} position={ORB_POSITIONS.aid} onTap={() => {}} onPeek={() => {}} />
              </>
            )}

            {step === "help" && (
              <>
                {!helpUsed && <TutorialAskChelseaArrow />}
                <TutorialAskChelseaButton used={helpUsed} onClick={handleChelseaHelp} />
              </>
            )}

            {step === "ready" && (
              <>
                <motion.button
                  type="button"
                  onClick={finish}
                  className="absolute left-1/2 bottom-[12%] z-40 -translate-x-1/2 rounded-full px-[3.375rem] py-6 font-extrabold tracking-wide"
                  style={{
                    background: "linear-gradient(180deg, #ffe8af, #f0c860)",
                    color: "#5a4a28",
                    border: "1px solid rgba(255,255,255,0.35)",
                    fontSize: "calc(42px * var(--vscale, 1))",
                    boxShadow: "0 0 63px rgba(255,220,120,0.34), 0 12px 39px rgba(0,0,0,0.22)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Start Level 1
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ChelseaTutorialBubble step={step} />
    </div>
  );
};
