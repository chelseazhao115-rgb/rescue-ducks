import type { LevelConfig } from "@/lib/types";

function makeLevel(
  id: number,
  name: string,
  groups: number[],
  wordsEach: number,
  duration: number,
  maxOrbs: number,
): LevelConfig {
  const totalGroups = groups.length;
  return {
    levelId: id,
    name,
    durationMs: duration,
    groupIds: groups,
    stormTickRateMs: 500,
    stormTickAmount: 0.83,
    stormPenaltyOnWrong: 4,
    stormReductionOnCorrect: 1.5,
    lighthouseGainPerGroup: 90 / totalGroups,
    comboTimeoutMs: 4000,
    maxOrbsOnScreen: maxOrbs,
    orbSpawnIntervalMs: 2500,
    wordsPerGroup: wordsEach,
  };
}

// 28 levels: 5-7 groups each, progressive difficulty
// Stage 1 (1-7): 2-word pairs, 5-6 groups, basic vocab
// Stage 2 (8-14): 2-word pairs, 6 groups, easy-medium
// Stage 3 (15-21): 3-word chains, 6 groups, medium
// Stage 4 (22-28): 3-4 word chains, 6-7 groups, harder

export const LEVELS: LevelConfig[] = [
  // === Stage 1: 2-word pairs, 5-6 groups ===
  makeLevel(1,  "Resemblance",      [1,4,9,12,14],            2, 50000, 14),
  makeLevel(2,  "Recognition",      [2,10,12,15,16],          2, 50000, 14),
  makeLevel(3,  "Adjustment",       [3,5,15,17,19],           2, 50000, 14),
  makeLevel(4,  "Measurement",      [7,8,16,18,20],           2, 50000, 14),
  makeLevel(5,  "Domestic Life",    [6,13,14,1,4,9],          2, 55000, 16),
  makeLevel(6,  "Fundamentals",     [11,17,18,5,20,19],       2, 55000, 16),
  makeLevel(7,  "Foundations",      [19,20,25,10,12,15],      2, 55000, 16),

  // === Stage 2: 2-word pairs, 6 groups ===
  makeLevel(8,  "Distinction",      [23,4,9,1,12,16],         2, 55000, 16),
  makeLevel(9,  "Imitation",        [26,10,12,15,3,5],        2, 55000, 16),
  makeLevel(10, "Adaptation",       [15,5,1,20,19,25],        2, 55000, 16),
  makeLevel(11, "Evaluation",       [7,8,17,22,14,11],        2, 60000, 16),
  makeLevel(12, "Deficiency",       [22,14,11,26,28,23],      2, 60000, 16),
  makeLevel(13, "Feasibility",      [20,19,16,4,9,12],        2, 60000, 16),
  makeLevel(14, "Restriction",      [21,27,2,13,6,14],        2, 60000, 16),

  // === Stage 3: 3-word chains, 6 groups ===
  makeLevel(15, "Triple I",         [1,4,9,12,15,20],         3, 65000, 18),
  makeLevel(16, "Triple II",        [2,5,10,13,16,21],        3, 65000, 18),
  makeLevel(17, "Triple III",       [3,6,11,14,17,22],        3, 65000, 18),
  makeLevel(18, "Triple IV",        [7,8,18,19,23,25],        3, 65000, 18),
  makeLevel(19, "Triple V",         [24,26,28,1,8,15],        3, 70000, 18),
  makeLevel(20, "Triple VI",        [2,9,16,22,27,5],         3, 70000, 18),
  makeLevel(21, "Triple VII",       [3,10,17,23,28,6],        3, 70000, 18),

  // === Stage 4: 3-4 word chains, 6-7 groups ===
  makeLevel(22, "Quad I",           [1,7,13,19,24,27],        3, 65000, 20),
  makeLevel(23, "Quad II",          [2,8,14,20,25,28],        3, 65000, 20),
  makeLevel(24, "Quad III",         [3,9,15,21,26,4],         3, 65000, 20),
  makeLevel(25, "Quad IV",          [5,11,17,22,27,1,7],      4, 75000, 22),
  makeLevel(26, "Quad V",           [6,12,18,23,28,2,8],      4, 75000, 22),
  makeLevel(27, "Quad VI",          [4,10,16,21,26,3,9],      4, 75000, 22),
  makeLevel(28, "Final Storm",      [11,17,23,5,12,18,24,6,13,19,25], 4, 90000, 24),
];
