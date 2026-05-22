import { v4 as uuid } from "uuid";
import type { DuckState, OrbInstance, RuntimeGroupConfig, RuntimeLevelConfig } from "@/lib/types";
import { shuffle } from "@/lib/utils/random";

const GRID_COLS = 5;
const GRID_ROWS = 3;
const ORB_MIN_DISTANCE = 0.14;

function orbDistance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function isTooClose(pos: { x: number; y: number }, existing: OrbInstance[], minDist: number): boolean {
  return existing.some((o) => orbDistance(pos, o.position) < minDist);
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

    // Try rows in shuffled order
    const rows = shuffle(Array.from({ length: GRID_ROWS }, (_, r) => r));
    for (const row of rows) {
      const base = gridCell(col, row);
      for (let j = 0; j < 5; j++) {
        const pos = {
          x: base.x + (Math.random() - 0.5) * 0.05,
          y: base.y + (Math.random() - 0.5) * 0.03,
        };
        if (!isTooClose(pos, [...existingOrbs, ...orbs], ORB_MIN_DISTANCE)) {
          position = pos;
          break;
        }
      }
      if (position) break;
    }

    // Fallback: any free position
    if (!position) {
      position = findFreePosition([...existingOrbs, ...orbs]);
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
  const marginLeft = 0.08;
  const marginRight = 0.24;
  const marginY = 0.14;
  const usableW = 1 - marginLeft - marginRight;
  const usableH = 0.48;
  const cellW = usableW / GRID_COLS;
  const cellH = usableH / GRID_ROWS;
  return {
    x: marginLeft + cellW * (col + 0.5),
    y: marginY + cellH * (row + 0.5),
  };
}

function findFreePosition(existingOrbs: OrbInstance[]): { x: number; y: number } {
  const cells: { col: number; row: number }[] = [];
  for (let c = 0; c < GRID_COLS; c++) {
    for (let r = 0; r < GRID_ROWS; r++) {
      cells.push({ col: c, row: r });
    }
  }
  const shuffled = shuffle(cells);

  for (const cell of shuffled) {
    const base = gridCell(cell.col, cell.row);
    for (let j = 0; j < 6; j++) {
      const pos = {
        x: base.x + (Math.random() - 0.5) * 0.05,
        y: base.y + (Math.random() - 0.5) * 0.03,
      };
      if (!isTooClose(pos, existingOrbs, ORB_MIN_DISTANCE)) {
        return pos;
      }
    }
  }

  for (let attempt = 0; attempt < 30; attempt++) {
    const pos = {
      x: 0.1 + Math.random() * 0.66,
      y: 0.16 + Math.random() * 0.44,
    };
    if (!isTooClose(pos, existingOrbs, ORB_MIN_DISTANCE)) {
      return pos;
    }
  }

  return { x: 0.2 + Math.random() * 0.6, y: 0.2 + Math.random() * 0.35 };
}
