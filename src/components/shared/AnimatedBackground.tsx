"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export interface AnimatedBackgroundProps {
  variant: "home" | "game";
  stormIntensity: number;
}

interface RainDrop {
  left: number;
  height: number;
  duration: number;
  delay: number;
  drift: number;
}

interface CloudShape {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface SparkleData {
  left: number;
  top: number;
  width: number;
  height: number;
  variant: number;
  animDuration: number;
  animDelay: number;
}

interface WindStreak {
  left: number;
  top: number;
  width: number;
  animDuration: number;
  animDelay: number;
}

interface WaterLine {
  left: number;
  bottom: number;
  width: number;
  animDuration: number;
  animDelay: number;
}

const SPARKLE_COLORS = [
  "rgba(255,240,190,0.45)",
  "rgba(200,210,240,0.35)",
  "rgba(210,190,225,0.35)",
];

function seed(prefix: string, i: number): number {
  let hash = 0;
  const s = `${prefix}-${i}`;
  for (let j = 0; j < s.length; j++) {
    hash = ((hash << 5) - hash + s.charCodeAt(j)) | 0;
  }
  return Math.abs(hash) / 2147483647;
}

function generateRainDrops(count: number, variant: string): RainDrop[] {
  return Array.from({ length: count }, (_, i) => ({
    left: seed(`rain-left-${variant}`, i) * 100,
    height: 4 + seed(`rain-h-${variant}`, i + 100) * 14,
    duration: 0.8 + seed(`rain-dur-${variant}`, i + 200) * 1.8,
    delay: seed(`rain-delay-${variant}`, i + 300) * 3,
    drift: -3 + seed(`rain-drift-${variant}`, i + 400) * 6,
  }));
}

function generateClouds(count: number, variant: string): CloudShape[] {
  return Array.from({ length: count }, (_, i) => ({
    left: seed(`cloud-left-${variant}`, i) * 90,
    top: 5 + seed(`cloud-top-${variant}`, i + 100) * 30,
    width: 80 + seed(`cloud-w-${variant}`, i + 200) * 140,
    height: 35 + seed(`cloud-h-${variant}`, i + 300) * 25,
    opacity: 0.05 + seed(`cloud-op-${variant}`, i + 400) * 0.1,
    duration: 12 + seed(`cloud-dur-${variant}`, i + 500) * 14,
    delay: seed(`cloud-delay-${variant}`, i + 600) * 8,
  }));
}

function generateSparkles(count: number, variant: string): SparkleData[] {
  return Array.from({ length: count }, (_, i) => ({
    left: 10 + seed(`spark-l-${variant}`, i) * 80,
    top: 15 + seed(`spark-t-${variant}`, i + 100) * 55,
    width: 1.5 + seed(`spark-w-${variant}`, i + 200) * 2,
    height: 1.5 + seed(`spark-h-${variant}`, i + 300) * 2,
    variant: i % 3,
    animDuration: 2 + seed(`spark-dur-${variant}`, i + 400) * 3,
    animDelay: seed(`spark-delay-${variant}`, i + 500) * 4,
  }));
}

function generateWindStreaks(variant: string): WindStreak[] {
  return Array.from({ length: 3 }, (_, i) => ({
    left: 20 + i * 25,
    top: 30 + i * 15,
    width: 50 + seed(`wind-w-${variant}`, i) * 40,
    animDuration: 2 + seed(`wind-dur-${variant}`, i + 100) * 2,
    animDelay: seed(`wind-delay-${variant}`, i + 200) * 3,
  }));
}

function generateWaterLines(count: number, variant: string): WaterLine[] {
  return Array.from({ length: count }, (_, i) => ({
    left: 15 + i * 20,
    bottom: 8 + seed(`water-b-${variant}`, i) * 12,
    width: 30 + seed(`water-w-${variant}`, i + 100) * 40,
    animDuration: 3 + seed(`water-dur-${variant}`, i + 200) * 2,
    animDelay: seed(`water-delay-${variant}`, i + 300) * 2,
  }));
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant,
  stormIntensity,
}) => {
  const [mounted, setMounted] = useState(false);
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [clouds, setClouds] = useState<CloudShape[]>([]);
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);
  const [windStreaks, setWindStreaks] = useState<WindStreak[]>([]);
  const [waterLines, setWaterLines] = useState<WaterLine[]>([]);

  useEffect(() => {
    setRainDrops(generateRainDrops(variant === "home" ? 10 : 18, variant));
    setClouds(generateClouds(variant === "home" ? 3 : 5, variant));
    setSparkles(generateSparkles(14, variant));
    setWindStreaks(generateWindStreaks(variant));
    setWaterLines(generateWaterLines(5, variant));
    setMounted(true);
  }, [variant]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #6a7a9f 0%, #5b6d99 15%, #46577e 35%, #2e3b5f 60%, #1a2238 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%]"
          style={{
            background: "linear-gradient(to top, #2a3a50, #405a78, transparent)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient — softer twilight tones */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #6a7a9f 0%, #5b6d99 15%, #46577e 35%, #2e3b5f 60%, #1a2238 100%)",
        }}
      />

      {/* Warm horizon glow */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          bottom: "25%",
          height: "45%",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,220,160,0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Atmospheric fog */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.04), transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.8,
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting clouds */}
      {clouds.map((cloud, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            background:
              "radial-gradient(ellipse at center, rgba(200,205,225,0.12) 0%, transparent 80%)",
            filter: "blur(20px)",
          }}
          animate={{
            x: ["-5%", "5%"],
            opacity: [cloud.opacity, cloud.opacity + 0.04, cloud.opacity],
          }}
          transition={{
            x: {
              duration: cloud.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: cloud.delay,
            },
            opacity: {
              duration: cloud.duration * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: cloud.delay,
            },
          }}
        />
      ))}

      {/* Storm cloud layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(45,50,75,0.35) 0%, transparent 65%)",
        }}
        animate={{ opacity: 0 + stormIntensity * 0.5 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Soft rain */}
      {rainDrops.length > 0 && (
        <div className="absolute inset-0">
          {rainDrops.map((drop, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-px rounded-full"
              style={{
                left: `${drop.left}%`,
                top: `-5%`,
                height: `${drop.height}px`,
                background:
                  "linear-gradient(to bottom, rgba(180,190,210,0.18), rgba(140,150,180,0.04))",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, drop.drift],
                opacity: [0, 0.1 + stormIntensity * 0.2, 0.03],
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                ease: "linear",
                delay: drop.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Wind streaks */}
      {stormIntensity > 0.5 && (
        <div className="absolute inset-0">
          {windStreaks.map((ws, i) => (
            <motion.div
              key={`wind-${i}`}
              className="absolute h-px"
              style={{
                left: `${ws.left}%`,
                top: `${ws.top}%`,
                width: `${ws.width}px`,
                background:
                  "linear-gradient(to right, rgba(200,200,220,0.05), transparent)",
                filter: "blur(2px)",
              }}
              animate={{
                x: ["-10%", "110%"],
                opacity: [0, 0.08, 0],
              }}
              transition={{
                duration: ws.animDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ws.animDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Sparkle particles */}
      <div className="absolute inset-0">
        {sparkles.map((sp, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${sp.left}%`,
              top: `${sp.top}%`,
              width: `${sp.width}px`,
              height: `${sp.height}px`,
              background: SPARKLE_COLORS[sp.variant],
              filter: "blur(1px)",
            }}
            animate={{
              y: ["0vh", "-6vh", "0vh"],
              opacity: [0.06, 0.5, 0.06],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: sp.animDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: sp.animDelay,
            }}
          />
        ))}
      </div>

      {/* Lake / sea surface */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          background:
            "linear-gradient(to top, #2a3a50, #405a78, transparent)",
        }}
      />

      {/* Sea reflection — warm gold */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,221,140,0.15), transparent)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Water shimmer lines */}
      {waterLines.map((wl, i) => (
        <motion.div
          key={`water-${i}`}
          className="absolute h-px"
          style={{
            left: `${wl.left}%`,
            bottom: `${wl.bottom}%`,
            width: `${wl.width}px`,
            background:
              "linear-gradient(to right, rgba(180,200,220,0.08), transparent)",
            filter: "blur(2px)",
          }}
          animate={{
            x: ["-2%", "3%"],
            opacity: [0.06, 0.18, 0.06],
          }}
          transition={{
            duration: wl.animDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: wl.animDelay,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Mist near water */}
      <motion.div
        className="absolute bottom-[18%] left-0 right-0 h-[18%]"
        style={{
          background:
            "linear-gradient(to top, rgba(180,190,210,0.05), transparent)",
          filter: "blur(30px)",
        }}
        animate={{
          x: ["-2%", "4%", "-2%"],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
