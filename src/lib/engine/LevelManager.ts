import { v4 as uuid } from "uuid";
import type { DuckState, OrbInstance, RuntimeGroupConfig, RuntimeLevelConfig } from "@/lib/types";
import { shuffle } from "@/lib/utils/random";

const GRID_COLS = 6;
const GRID_ROWS = 6;
const ORB_MIN_DISTANCE = 0.15;
const ORB_DISTANCE_SCALE_PX = 1250;

// Chelsea NPC exclusion zone — bottom-left
const CHELSEA_X_MAX = 0.48;
const CHELSEA_Y_MIN = 0.60;

// Lighthouse glow + progress ring exclusion zone — top-right
const LIGHTHOUSE_X_MIN = 0.68;
const LIGHTHOUSE_Y_MAX = 0.50;

function isInExcludedZone(pos: { x: number; y: number }): boolean {
  if (pos.x < CHELSEA_X_MAX && pos.y > CHELSEA_Y_MIN) return true; // Chelsea area
  if (pos.x > LIGHTHOUSE_X_MIN && pos.y < LIGHTHOUSE_Y_MAX) return true; // Lighthouse area
  return false;
}

function orbDistance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function estimateOrbSizePx(word: string): number {
  const chars = word.length;
  const hasSpaces = word.trim().includes(" ");
  const needsWrap = chars > 10 || hasSpaces;

  if (needsWrap) {
    return Math.min(350, 130 + (chars - 7) * 14);
  }

  return chars <= 7 ? 123 : Math.min(223, 123 + (chars - 7) * 9);
}

function minDistanceForWords(a: string, b: string): number {
  const combinedRadiusPx = (estimateOrbSizePx(a) + estimateOrbSizePx(b)) / 2;
  return Math.max(ORB_MIN_DISTANCE, combinedRadiusPx / ORB_DISTANCE_SCALE_PX);
}

function isTooClose(pos: { x: number; y: number }, word: string, existing: OrbInstance[]): boolean {
  return existing.some((o) => orbDistance(pos, o.position) < minDistanceForWords(word, o.word));
}

export interface SpawnItem {
  word: string;
  groupId: string;
  meaning: string;
  visualWeight: number;
  wordDifficulty: number;
}

/**
 * Load level from a dynamically generated RuntimeLevelConfig.
 */
export function loadLevel(config: RuntimeLevelConfig): {
  activeGroups: RuntimeGroupConfig[];
  ducks: DuckState[];
  allGroups: { group: RuntimeGroupConfig; items: SpawnItem[] }[];
} {
  const activeGroups = config.groups.map((g) => ({
    ...g,
    // Words are already pre-selected by LevelGenerator, just shuffle order
    words: shuffle([...g.words]),
  }));

  const ducks: DuckState[] = activeGroups.map(() => ({
    duckId: uuid(),
    rescued: false,
    progress: 0,
  }));

  const allGroups = activeGroups.map((group) => {
    const items: SpawnItem[] = group.words.map((w) => ({
      word: w.text,
      groupId: group.groupId,
      meaning: w.meaning,
      visualWeight: w.visualWeight,
      wordDifficulty: w.wordDifficulty,
    }));
    return { group, items };
  });

  return { activeGroups, ducks, allGroups };
}

/**
 * Spawn ALL orbs for a specific group at once.
 * Same-group words are placed in different columns to avoid being too close.
 */
export function spawnGroupOrbs(
  groupItems: SpawnItem[],
  existingOrbs: OrbInstance[],
): OrbInstance[] {
  const orbs: OrbInstance[] = [];
  const count = groupItems.length;

  // Assign each orb a different column, spread across rows
  const assignedCols = shuffle(
    Array.from({ length: GRID_COLS }, (_, i) => i)
  ).slice(0, count);

  for (let i = 0; i < count; i++) {
    const col = assignedCols[i];
    let position: { x: number; y: number } | null = null;

    // Try rows: prefer center rows (2-3 of 6) first, then outward
    const mid = GRID_ROWS / 2;
    const rows = Array.from({ length: GRID_ROWS }, (_, r) => r)
      .sort((a, b) => Math.abs(a - mid + 0.5) - Math.abs(b - mid + 0.5));
    for (const row of rows) {
      const base = gridCell(col, row);
      for (let j = 0; j < 5; j++) {
        const pos = {
          x: base.x + (Math.random() - 0.5) * 0.05,
          y: base.y + (Math.random() - 0.5) * 0.03,
        };
        if (
          !isTooClose(pos, groupItems[i].word, [...existingOrbs, ...orbs]) &&
          !isInExcludedZone(pos)
        ) {
          position = pos;
          break;
        }
      }
      if (position) break;
    }

    // Fallback: any free position
    if (!position) {
      position = findFreePosition(groupItems[i].word, [...existingOrbs, ...orbs]);
    }

    orbs.push({
      orbId: uuid(),
      word: groupItems[i].word,
      meaning: groupItems[i].meaning,
      groupId: groupItems[i].groupId,
      position,
      status: "idle",
      showMeaning: false,
      spawnedAt: Date.now(),
    });
  }
  return orbs;
}

function gridCell(col: number, row: number): { x: number; y: number } {
  const marginLeft = 0.05;
  const marginRight = 0.12;
  const marginY = 0.06;
  const usableW = 1 - marginLeft - marginRight;
  const usableH = 0.74;
  const cellW = usableW / GRID_COLS;
  const cellH = usableH / GRID_ROWS;
  return {
    x: marginLeft + cellW * (col + 0.5),
    y: marginY + cellH * (row + 0.5),
  };
}

function findFreePosition(word: string, existingOrbs: OrbInstance[]): { x: number; y: number } {
  const cells: { col: number; row: number }[] = [];
  const mid = GRID_ROWS / 2;
  for (let c = 0; c < GRID_COLS; c++) {
    for (let r = 0; r < GRID_ROWS; r++) {
      cells.push({ col: c, row: r });
    }
  }
  // Prefer center cells over edge cells
  cells.sort((a, b) => Math.abs(a.row - mid + 0.5) - Math.abs(b.row - mid + 0.5));
  const shuffled = shuffle(cells.slice(0, 8)).concat(shuffle(cells.slice(8)));

  for (const cell of shuffled) {
    const base = gridCell(cell.col, cell.row);
    for (let j = 0; j < 6; j++) {
      const pos = {
        x: base.x + (Math.random() - 0.5) * 0.07,
        y: base.y + (Math.random() - 0.5) * 0.05,
      };
      if (!isTooClose(pos, word, existingOrbs) && !isInExcludedZone(pos)) {
        return pos;
      }
    }
  }

  // Broad random search — try many positions across the full playable area
  for (let attempt = 0; attempt < 200; attempt++) {
    const pos = {
      x: 0.08 + Math.random() * 0.72,
      y: 0.08 + Math.random() * 0.58,
    };
    if (!isTooClose(pos, word, existingOrbs) && !isInExcludedZone(pos)) {
      return pos;
    }
  }

  // Last resort: among all candidates, pick the one furthest from existing orbs
  let bestPos = { x: 0.4, y: 0.35 };
  let bestDist = -Infinity;
  for (let attempt = 0; attempt < 100; attempt++) {
    const pos = {
      x: 0.08 + Math.random() * 0.72,
      y: 0.08 + Math.random() * 0.58,
    };
    if (isInExcludedZone(pos)) continue;
    let minClearance = Infinity;
    for (const o of existingOrbs) {
      const clearance = orbDistance(pos, o.position) - minDistanceForWords(word, o.word);
      if (clearance < minClearance) minClearance = clearance;
    }
    if (minClearance > bestDist) {
      bestDist = minClearance;
      bestPos = pos;
    }
  }
  return bestPos;
}
