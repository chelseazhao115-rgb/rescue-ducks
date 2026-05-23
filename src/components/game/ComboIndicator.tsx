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

  const currentGroup = activeChain
    ? activeGroups.find((g) => g.groupId === activeChain.groupId)
    : null;
  const totalInGroup = currentGroup?.words.length ?? 0;
  const matchedCount = activeChain?.orbIds.length ?? 0;

  const multiplier = getComboMultiplier(combo);
  const colorClass =
    multiplier >= 3
      ? "#e8b050"
      : multiplier >= 2
        ? "#f0c860"
        : "#ffd97a";

  return (
    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={combo}
            className="flex flex-col items-center gap-1"
            {...popIn}
            exit={popOut}
          >
            {combo >= 2 && (
              <motion.span
                className="text-4xl font-extrabold"
                style={{
                  color: colorClass,
                  textShadow: `0 0 24px ${colorClass}55`,
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.3 }}
              >
                {combo}x
              </motion.span>
            )}

            {totalInGroup > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1.5">
                  {Array.from({ length: totalInGroup }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: i < matchedCount ? "6px" : "5px",
                        height: i < matchedCount ? "6px" : "5px",
                        background:
                          i < matchedCount
                            ? "#ffd97a"
                            : "rgba(255,255,255,0.25)",
                        boxShadow:
                          i < matchedCount
                            ? "0 0 8px rgba(255,217,122,0.5)"
                            : "none",
                      }}
                      animate={i === matchedCount - 1 ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
                <span className="font-medium text-white/70" style={{fontSize:"15px"}}>
                  {matchedCount}/{totalInGroup}
                </span>
              </div>
            )}

            {combo >= 2 && (
              <span className="font-medium tracking-wider mt-0.5 text-white/60" style={{fontSize:"15px"}}>
                CHAIN
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
