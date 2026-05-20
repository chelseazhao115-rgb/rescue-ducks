"use client";

import { motion } from "framer-motion";

export interface ProgressBarProps {
  value: number;
  maxValue: number;
  colorClass: string;
  height: number;
  animated: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue,
  colorClass,
  height,
  animated,
  label,
}) => {
  const pct = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-white/60">{label}</span>
          <span className="text-xs text-white/60">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden bg-white/10 backdrop-blur-sm"
        style={{ height }}
      >
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${pct}%` }}
          animate={animated ? { width: `${pct}%` } : undefined}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
