"use client";

import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { WordOrb, WORD_ORB_COLOR_COUNT } from "./WordOrb";

export const WordOrbField: React.FC = () => {
  const orbs = useGameStore((s) => s.orbs);
  const tapOrb = useGameStore((s) => s.tapOrb);
  const peekOrb = useGameStore((s) => s.peekOrb);
  const groupColorRef = useRef(new Map<string, number>());
  const visibleOrbs = orbs.filter((o) => o.status !== "matched");
  const visibleGroupIds = Array.from(new Set(visibleOrbs.map((orb) => orb.groupId)));
  const usedVisibleColors = new Set<number>();

  for (const groupId of visibleGroupIds) {
    const existing = groupColorRef.current.get(groupId);
    if (existing !== undefined) {
      usedVisibleColors.add(existing);
      continue;
    }

    let colorIndex = 0;
    while (
      colorIndex < WORD_ORB_COLOR_COUNT &&
      usedVisibleColors.has(colorIndex)
    ) {
      colorIndex++;
    }

    const assignedColor = colorIndex % WORD_ORB_COLOR_COUNT;
    groupColorRef.current.set(groupId, assignedColor);
    usedVisibleColors.add(assignedColor);
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        <AnimatePresence>
          {visibleOrbs
            .map((orb) => (
              <WordOrb
                key={orb.orbId}
                orbId={orb.orbId}
                word={orb.word}
                meaning={orb.meaning}
                connectionLabel={orb.connectionLabel}
                showMeaning={orb.showMeaning}
                groupId={orb.groupId}
                groupColorIndex={groupColorRef.current.get(orb.groupId)}
                status={orb.status}
                position={orb.position}
                onTap={tapOrb}
                onPeek={peekOrb}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
