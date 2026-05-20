"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getComboMultiplier } from "@/lib/engine/ComboSystem";
import { popIn, popOut } from "@/constants/animation";

export const ComboIndicator: React.FC = () => {
  const activeChain = useGameStore((s) => s.activeChain);
  const activeGroups = useGameStore((s) => s.activeGroups);

  const combo = activeChain?.combo ?? 0;
  const visible = combo >= 1;

  // Find the current chain's group to show progress
  const currentGroup = activeChain
    ? activeGroups.find((g) => g.groupId === activeChain.groupId)
    : null;
  const totalInGroup = currentGroup?.words.length ?? 0;
  const matchedCount = activeChain?.orbIds.length ?? 0;

  const multiplier = getComboMultiplier(combo);
  const colorClass =
    multiplier >= 3
      ? "text-combo-3"
      : multiplier >= 2
        ? "text-combo-2"
        : "text-combo-1";

  return (
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={combo}
            className="flex flex-col items-center gap-1"
            {...popIn}
            exit={popOut}
          >
            {/* Combo count */}
            {combo >= 2 && (
              <motion.span
                className={`text-3xl font-bold ${colorClass} drop-shadow-[0_0_10px_currentColor]`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.3 }}
              >
                {combo}x
              </motion.span>
            )}

            {/* Group progress: shows matched/total for current group */}
            {totalInGroup > 0 && (
              <div className="flex items-center gap-1.5">
                {/* Dot indicators */}
                <div className="flex gap-1">
                  {Array.from({ length: totalInGroup }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < matchedCount
                          ? "bg-lighthouse-glow shadow-[0_0_6px_rgba(245,214,123,0.6)]"
                          : "bg-white/20"
                      }`}
                      animate={
                        i === matchedCount - 1
                          ? { scale: [1, 1.5, 1] }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-white/50">
                  {matchedCount}/{totalInGroup}
                </span>
              </div>
            )}

            {/* Chain label */}
            {combo >= 2 && (
              <span className="text-xs text-white/30 mt-0.5">Chain</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
