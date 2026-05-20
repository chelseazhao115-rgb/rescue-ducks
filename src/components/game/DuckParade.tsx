"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Duck } from "./Duck";

export const DuckParade: React.FC = () => {
  const ducks = useGameStore((s) => s.ducks);
  const groupsCompleted = useGameStore((s) => s.groupsCompleted);

  if (ducks.length === 0) return null;

  const rescuedCount = ducks.filter((d) => d.rescued).length;

  return (
    <div className="absolute bottom-3 left-3 right-20 z-10 pointer-events-none">
      <div className="flex items-end gap-1">
        {/* Waiting ducks on left */}
        <div className="flex items-end gap-1">
          <AnimatePresence>
            {ducks
              .filter((d) => !d.rescued)
              .map((duck, i) => (
                <Duck
                  key={duck.duckId}
                  duckId={duck.duckId}
                  rescued={false}
                  index={i}
                  total={ducks.length}
                />
              ))}
          </AnimatePresence>
        </div>

        {/* Arrow / path */}
        {rescuedCount > 0 && rescuedCount < ducks.length && (
          <motion.div
            className="flex-1 mx-2 h-px bg-lighthouse-glow/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          />
        )}

        {/* Rescued ducks near home */}
        <div className="flex items-end gap-1">
          <AnimatePresence>
            {ducks
              .filter((d) => d.rescued)
              .map((duck, i) => (
                <Duck
                  key={duck.duckId}
                  duckId={duck.duckId}
                  rescued={true}
                  index={i}
                  total={ducks.length}
                />
              ))}
          </AnimatePresence>
        </div>

        {/* Home marker — lighthouse icon on the right */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center"
          animate={{ opacity: rescuedCount > 0 ? [0.6, 1, 0.6] : 0.3 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-10 flex items-center justify-center">
            <svg width="20" height="28" viewBox="0 0 24 34" fill="currentColor"
                 className="text-lighthouse-glow/40">
              <rect x="8" y="0" width="8" height="8" rx="2" />
              <polygon points="3,8 21,8 23,34 1,34" />
            </svg>
          </div>
          <span className="text-[9px] text-lighthouse-glow/30">Home</span>
        </motion.div>
      </div>

      {/* Progress text */}
      <div className="mt-1 text-xs text-white/30">
        {rescuedCount}/{ducks.length} rescued
        {groupsCompleted > 0 && (
          <span className="ml-2 text-lighthouse-glow/50">
            {groupsCompleted} groups done
          </span>
        )}
      </div>
    </div>
  );
};
