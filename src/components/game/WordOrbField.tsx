"use client";

import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { WordOrb } from "./WordOrb";

export const WordOrbField: React.FC = () => {
  const orbs = useGameStore((s) => s.orbs);
  const tapOrb = useGameStore((s) => s.tapOrb);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        <AnimatePresence>
          {orbs
            .filter((o) => o.status !== "matched")
            .map((orb) => (
              <WordOrb
                key={orb.orbId}
                orbId={orb.orbId}
                word={orb.word}
                meaning={orb.meaning}
                connectionLabel={orb.connectionLabel}
                showMeaning={orb.showMeaning}
                groupId={orb.groupId}
                status={orb.status}
                position={orb.position}
                onTap={tapOrb}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
