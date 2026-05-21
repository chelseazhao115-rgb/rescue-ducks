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
    <div className="absolute bottom-3 left-3 right-32 z-10 pointer-events-none">
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

        {/* Path connector — guiding light path toward lighthouse */}
        {rescuedCount > 0 && rescuedCount < ducks.length && (
          <motion.div
            className="flex-1 mx-2 h-px"
            style={{ background: "linear-gradient(to right, rgba(255,217,122,0.15), rgba(255,217,122,0.05))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Rescued ducks heading home (toward lighthouse on right) */}
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
      </div>

      {/* Progress text */}
      <div className="mt-1.5 flex items-center gap-2">
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          {rescuedCount}/{ducks.length} rescued
        </span>
        {groupsCompleted > 0 && (
          <span className="text-[10px]" style={{ color: "rgba(255,217,122,0.4)" }}>
            {groupsCompleted} groups done
          </span>
        )}
      </div>
    </div>
  );
};
