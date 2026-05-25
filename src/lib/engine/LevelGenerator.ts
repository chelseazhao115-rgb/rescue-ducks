/**
 * Rescue Ducks — Semantic Curriculum Generator
 *
 * Design philosophy:
 * - NOT a roguelike puzzle game
 * - A curated semantic learning JOURNEY
 * - Every player follows the same core curriculum
 * - Runtime randomness is limited to: orb layout, word order, distraction words
 * - Progression is stable, trackable, and meaningful
 */

import { semanticGroupsV2 } from "@/data/semanticGroupsV2";
import type { SemanticGroupV2, AtmosphereTag } from "@/data/semanticGroupsV2";
import { shuffle } from "@/lib/utils/random";
import type { RuntimeLevelConfig, RuntimeGroupConfig, RuntimeWordConfig } from "@/lib/types";

// ── Chapter Definition ───────────────────────────────────────

export interface ChapterDef {
  id: string;
  name: string;
  description: string;
  atmosphere: AtmosphereTag[];
  levelCount: number;
  groupsPerLevel: number;
  chainWords: [number, number]; // [min, max] per level
  durationMs: number;
}

export interface StageDef {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  difficultyRange: [number, number];
  atmospherePriority: AtmosphereTag[];
  chapters: ChapterDef[];
  stormTickAmount: number;
  stormPenaltyOnWrong: number;
  stormReductionOnCorrect: number;
  comboTimeoutMs: number;
}

// ── CURRICULUM ───────────────────────────────────────────────
//
// Groups are assigned deterministically by sorting then partitioning.
// The sort key ensures a smooth difficulty progression within each stage.
//
// Assignment rules:
//   1. Sort all 376 groups by (difficulty, -semanticClarity)
//   2. Filter to stage's difficulty range
//   3. Within stage, group by atmosphere similarity for coherent chapters
//   4. Assign fixed groups to each level — SAME for every player
//   5. Each level has: core groups (80%) + variation pool (20%)

export const CURRICULUM: StageDef[] = [
  // ── Stage 1: Glow ──────────────────────────────────────────
  {
    id: 1,
    name: "Glow",
    subtitle: "微光初现",
    description: "温暖的基础语义光球，直觉型同义词连接",
    difficultyRange: [1, 1],
    atmospherePriority: ["warm", "light", "calm"],
    stormTickAmount: 0.5,
    stormPenaltyOnWrong: 2,
    stormReductionOnCorrect: 2.5,
    comboTimeoutMs: 5000,
    chapters: [
      {
        id: "glow_first_light",
        name: "First Light",
        description: "最简单的纯同义词 — 像呼吸一样自然的语义连接",
        atmosphere: ["warm", "light"],
        levelCount: 3,
        groupsPerLevel: 6,
        chainWords: [2, 2],
        durationMs: 50000,
      },
      {
        id: "glow_gentle_waves",
        name: "Gentle Waves",
        description: "主题词汇加入 — 光球开始呈现温暖色调",
        atmosphere: ["calm", "light"],
        levelCount: 4,
        groupsPerLevel: 6,
        chainWords: [2, 2],
        durationMs: 55000,
      },
      {
        id: "glow_warm_beacon",
        name: "Warm Beacon",
        description: "混合基础词汇 — 灯塔的第一道光",
        atmosphere: ["warm", "calm"],
        levelCount: 3,
        groupsPerLevel: 6,
        chainWords: [2, 3],
        durationMs: 60000,
      },
    ],
  },

  // ── Stage 2: Tide (240 groups, 30 levels) ─────────────────
  {
    id: 2,
    name: "Tide",
    subtitle: "潮汐涌动",
    description: "语境型替换加入，语义流开始加速 — 最大规模的词汇章节",
    difficultyRange: [2, 2],
    atmospherePriority: ["water", "journey", "calm", "light"],
    stormTickAmount: 0.65,
    stormPenaltyOnWrong: 3,
    stormReductionOnCorrect: 2,
    comboTimeoutMs: 4500,
    chapters: [
      {
        id: "tide_flowing_in",
        name: "Flowing In",
        description: "society + culture 主题的语境替换",
        atmosphere: ["water", "journey"],
        levelCount: 5,
        groupsPerLevel: 6,
        chainWords: [2, 3],
        durationMs: 60000,
      },
      {
        id: "tide_deep_water",
        name: "Deep Water",
        description: "nature + science 主题词汇",
        atmosphere: ["water", "calm"],
        levelCount: 5,
        groupsPerLevel: 6,
        chainWords: [2, 3],
        durationMs: 65000,
      },
      {
        id: "tide_changing_tides",
        name: "Changing Tides",
        description: "time + change + movement 主题",
        atmosphere: ["journey", "light"],
        levelCount: 5,
        groupsPerLevel: 6,
        chainWords: [2, 3],
        durationMs: 65000,
      },
      {
        id: "tide_hidden_currents",
        name: "Hidden Currents",
        description: "abstract + mind + emotion 抽象词汇",
        atmosphere: ["dream", "memory"],
        levelCount: 5,
        groupsPerLevel: 6,
        chainWords: [2, 4],
        durationMs: 70000,
      },
      {
        id: "tide_coastal_drift",
        name: "Coastal Drift",
        description: "health + body + movement 主题",
        atmosphere: ["water", "journey"],
        levelCount: 5,
        groupsPerLevel: 6,
        chainWords: [2, 4],
        durationMs: 70000,
      },
      {
        id: "tide_horizon_line",
        name: "Horizon Line",
        description: "quantity + measure + general — 混合复习",
        atmosphere: ["light", "calm"],
        levelCount: 5,
        groupsPerLevel: 6,
        chainWords: [2, 4],
        durationMs: 75000,
      },
    ],
  },

  // ── Stage 3: Current (32 groups, 8 levels) ──────────────────
  {
    id: 3,
    name: "Current",
    subtitle: "语义暗流",
    description: "学术表达 + 语境替换的深层挑战",
    difficultyRange: [3, 3],
    atmospherePriority: ["storm", "water", "danger", "dream"],
    stormTickAmount: 0.8,
    stormPenaltyOnWrong: 4,
    stormReductionOnCorrect: 1.5,
    comboTimeoutMs: 4000,
    chapters: [
      {
        id: "current_storm_rising",
        name: "Storm Rising",
        description: "contextual synonyms — 语境型替换的深层挑战",
        atmosphere: ["storm", "danger"],
        levelCount: 4,
        groupsPerLevel: 4,
        chainWords: [3, 3],
        durationMs: 70000,
      },
      {
        id: "current_dark_water",
        name: "Dark Water",
        description: "academic expressions — 学术词汇的语义深度",
        atmosphere: ["water", "dream"],
        levelCount: 4,
        groupsPerLevel: 4,
        chainWords: [3, 4],
        durationMs: 75000,
      },
    ],
  },

  // ── Stage 4: Beacon (28 groups, 7 levels) ───────────────────
  {
    id: 4,
    name: "Beacon",
    subtitle: "灯塔指引",
    description: "全部语义类型的最终试炼",
    difficultyRange: [4, 5],
    atmospherePriority: ["hope", "journey", "memory", "light", "storm"],
    stormTickAmount: 0.95,
    stormPenaltyOnWrong: 5,
    stormReductionOnCorrect: 1,
    comboTimeoutMs: 3500,
    chapters: [
      {
        id: "beacon_final_passage",
        name: "Final Passage",
        description: "最高难度学术词 + 语境词",
        atmosphere: ["journey", "storm"],
        levelCount: 4,
        groupsPerLevel: 4,
        chainWords: [3, 4],
        durationMs: 85000,
      },
      {
        id: "beacon_lighthouse",
        name: "Lighthouse",
        description: "logic relations + 最低清晰度 — 终极考验",
        atmosphere: ["hope", "light"],
        levelCount: 3,
        groupsPerLevel: 4,
        chainWords: [3, 4],
        durationMs: 90000,
      },
    ],
  },
];

// ── Compute derived values ───────────────────────────────────

/** Total levels across all stages */
export const TOTAL_LEVELS = CURRICULUM.reduce(
  (sum, s) => sum + s.chapters.reduce((cs, ch) => cs + ch.levelCount, 0),
  0
);

/** Level count per stage */
export function getLevelsInStage(stageId: number): number {
  const stage = CURRICULUM.find((s) => s.id === stageId);
  if (!stage) return 5;
  return stage.chapters.reduce((sum, ch) => sum + ch.levelCount, 0);
}

/** Map global level number → (stageId, chapterId, levelInChapter) */
export function getStageAndLevel(globalLevel: number): {
  stageId: number;
  chapterId: string;
  chapterName: string;
  levelInChapter: number;
  levelInStage: number;
} {
  let remaining = globalLevel;
  let levelInStage = 0;
  for (const stage of CURRICULUM) {
    levelInStage = 0;
    for (const chapter of stage.chapters) {
      if (remaining <= chapter.levelCount) {
        return {
          stageId: stage.id,
          chapterId: chapter.id,
          chapterName: chapter.name,
          levelInChapter: remaining,
          levelInStage: levelInStage + remaining,
        };
      }
      remaining -= chapter.levelCount;
      levelInStage += chapter.levelCount;
    }
  }
  // Loop back to final chapter
  const lastStage = CURRICULUM[CURRICULUM.length - 1];
  const lastChapter = lastStage.chapters[lastStage.chapters.length - 1];
  return {
    stageId: lastStage.id,
    chapterId: lastChapter.id,
    chapterName: lastChapter.name,
    levelInChapter: lastChapter.levelCount,
    levelInStage: getLevelsInStage(lastStage.id),
  };
}

// ── BUILD FIXED CURRICULUM ────────────────────────────────────

interface AssignedLevel {
  stageId: number;
  chapterId: string;
  chapterName: string;
  levelInChapter: number;
  coreGroupIds: string[];     // Fixed — same for all players
  variationPoolIds: string[]; // Random subset drawn from here each play
}

/**
 * THE CURRICULUM MAP — built once, deterministic.
 * Each level has fixed core groups + a variation pool for replayability.
 */
function buildCurriculumMap(): Map<string, AssignedLevel> {
  const map = new Map<string, AssignedLevel>();

  for (const stage of CURRICULUM) {
    const [dMin, dMax] = stage.difficultyRange;

    // 1. Collect all groups matching this stage's difficulty
    const stageGroups = semanticGroupsV2.filter(
      (g) => g.difficulty >= dMin && g.difficulty <= dMax
    );

    // 2. Sort deterministically: by difficulty, then clarity (easier first),
    //    then by atmosphere match to stage priority
    const prioritySet = new Set(stage.atmospherePriority);
    const sorted = [...stageGroups].sort((a, b) => {
      // Primary: difficulty
      if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
      // Secondary: clarity (higher clarity = easier = first)
      if (a.semanticClarity !== b.semanticClarity) return b.semanticClarity - a.semanticClarity;
      // Tertiary: atmosphere match to stage
      const aMatch = a.atmosphere.filter((t) => prioritySet.has(t)).length;
      const bMatch = b.atmosphere.filter((t) => prioritySet.has(t)).length;
      return bMatch - aMatch;
    });

    // 3. Distribute groups across chapters within this stage
    let groupCursor = 0;
    const totalNeeded = stage.chapters.reduce(
      (sum, ch) => sum + ch.levelCount * ch.groupsPerLevel,
      0
    );

    // If we have fewer groups than total needed, some groups will repeat
    // across different levels (with different word subsets)
    const pool = sorted.length >= totalNeeded
      ? sorted
      : [...sorted, ...shuffle([...sorted])]; // duplicate pool if needed

    for (const chapter of stage.chapters) {
      const totalForChapter = chapter.levelCount * chapter.groupsPerLevel;

      for (let lvl = 1; lvl <= chapter.levelCount; lvl++) {
        const start = groupCursor;
        const coreCount = Math.floor(chapter.groupsPerLevel * 0.8); // 80% fixed core
        const varCount = chapter.groupsPerLevel - coreCount;          // 20% variation

        const coreIds: string[] = [];
        for (let i = 0; i < coreCount; i++) {
          const idx = (start + i) % pool.length;
          coreIds.push(pool[idx].id);
        }

        const varStart = start + coreCount;
        const varIds: string[] = [];
        for (let i = 0; i < Math.max(varCount, 3); i++) {
          // Variation pool is larger than needed — game picks subset at runtime
          const idx = (varStart + i) % pool.length;
          if (!coreIds.includes(pool[idx].id)) {
            varIds.push(pool[idx].id);
          }
        }

        const levelKey = `${stage.id}_${chapter.id}_${lvl}`;
        map.set(levelKey, {
          stageId: stage.id,
          chapterId: chapter.id,
          chapterName: chapter.name,
          levelInChapter: lvl,
          coreGroupIds: coreIds,
          variationPoolIds: varIds,
        });

        groupCursor = (start + chapter.groupsPerLevel) % pool.length;
      }
    }
  }

  return map;
}

/** The one true curriculum — built once at module load */
const CURRICULUM_MAP = buildCurriculumMap();

// ── Anti-Repetition ──────────────────────────────────────────

const RECENT_WINDOW = 30;
const recentGroupIds: string[] = [];

function markAsUsed(ids: string[]): void {
  recentGroupIds.push(...ids);
  while (recentGroupIds.length > RECENT_WINDOW) {
    recentGroupIds.shift();
  }
}

function isRecent(id: string): boolean {
  return recentGroupIds.includes(id);
}

export function resetAntiRepetition(): void {
  recentGroupIds.length = 0;
}

// ── RUNTIME LEVEL GENERATION ─────────────────────────────────

/**
 * Generate a level config from the fixed curriculum.
 *
 * @param stageId — Stage number (1-4)
 * @param levelInStage — 1-based level index within the stage
 * @param _seed — Reserved for replay seed (currently unused)
 */
export function generateLevel(
  stageId: number,
  levelInStage: number,
  _seed?: number
): RuntimeLevelConfig {
  const stage = CURRICULUM.find((s) => s.id === stageId);
  if (!stage) throw new Error(`Invalid stage: ${stageId}`);

  // Find which chapter and level within chapter this maps to
  let remaining = levelInStage;
  let chapter: ChapterDef | null = null;
  let levelInChapter = 0;
  for (const ch of stage.chapters) {
    if (remaining <= ch.levelCount) {
      chapter = ch;
      levelInChapter = remaining;
      break;
    }
    remaining -= ch.levelCount;
  }
  if (!chapter) {
    // Fallback: last chapter, last level
    chapter = stage.chapters[stage.chapters.length - 1];
    levelInChapter = chapter.levelCount;
  }

  const levelKey = `${stageId}_${chapter.id}_${levelInChapter}`;
  const assignment = CURRICULUM_MAP.get(levelKey);

  if (!assignment) {
    throw new Error(`No curriculum assignment for ${levelKey}`);
  }

  // ── Select groups for this play ─────────────────────────────
  // Core groups are ALWAYS included (fixed curriculum)
  // Variation: pick from pool, but avoid word overlap across groups
  const varCount = chapter.groupsPerLevel - assignment.coreGroupIds.length;
  const availableVars = assignment.variationPoolIds.filter((id) => !isRecent(id));

  // Build priority-ordered pool: core first, then shuffled variations
  const neededCount = chapter.groupsPerLevel;
  const coreIds = [...assignment.coreGroupIds];
  const varPool = shuffle([...availableVars]).filter((id) => !coreIds.includes(id));
  const priorityIds = [...coreIds, ...varPool];

  // ── Build RuntimeGroupConfigs (with cross-group word dedup) ──
  const groupLookup = new Map(semanticGroupsV2.map((g) => [g.id, g]));

  const progressInStage = (levelInStage - 1) / Math.max(1, getLevelsInStage(stageId) - 1);
  const [chainMin, chainMax] = chapter.chainWords;
  const wordsPerGroup = Math.min(
    Math.round(chainMin + (chainMax - chainMin) * progressInStage),
    6
  ); // hard cap: no chain longer than 6

  const groups: RuntimeGroupConfig[] = [];
  const usedWordTexts = new Set<string>();
  const usedGroupIds = new Set<string>();

  for (const gid of priorityIds) {
    if (groups.length >= neededCount) break;
    if (usedGroupIds.has(gid)) continue;

    const sg = groupLookup.get(gid);
    if (!sg) continue;

    // Select words for this group (capped at 6)
    const shuffled = shuffle([...sg.words]);
    const levelWords = shuffled.slice(0, Math.min(wordsPerGroup, shuffled.length));
    if (levelWords.length < 2) continue; // need at least 2 words

    // Check cross-group word overlap — skip if any word already used
    const newTexts = levelWords.map((w) => w.text.toLowerCase());
    if (newTexts.some((t) => usedWordTexts.has(t))) continue;

    // Accept this group
    for (const t of newTexts) usedWordTexts.add(t);
    usedGroupIds.add(gid);

    const runtimeWords: RuntimeWordConfig[] = levelWords.map((w) => ({
      text: w.text,
      meaning: sg.keywordsChinese,
      groupId: sg.id,
      visualWeight: w.visualWeight,
      wordDifficulty: w.wordDifficulty,
    }));

    groups.push({
      groupId: sg.id,
      category: sg.category,
      atmosphere: sg.atmosphere,
      difficulty: sg.difficulty,
      words: runtimeWords,
    });
  }

  markAsUsed([...usedGroupIds]);

  // ── Calculate timing ────────────────────────────────────────
  const totalWords = groups.reduce((sum, g) => sum + g.words.length, 0);

  return {
    levelId: levelKey,
    stageId,
    levelInStage,
    name: `${chapter.name} ${levelInChapter}`,
    durationMs: 30000 + totalWords * 2000,
    stormTickRateMs: 500,
    stormTickAmount: stage.stormTickAmount,
    stormPenaltyOnWrong: stage.stormPenaltyOnWrong,
    stormReductionOnCorrect: stage.stormReductionOnCorrect,
    lighthouseGainPerGroup: Math.round((100 / groups.length) * 100) / 100,
    comboTimeoutMs: stage.comboTimeoutMs,
    maxOrbsOnScreen: Math.min(totalWords + 2, 14),
    orbSpawnIntervalMs: 2500,
    wordsPerGroup,
    groups,
  };
}

// ── SEMANTIC PROGRESSION TRACKING ────────────────────────────

export interface SemanticProgress {
  totalGroupsInCurriculum: number;
  groupsEncountered: number;
  groupsMastered: number;       // Completed without wrong taps
  currentStage: number;
  currentChapter: string;
  currentChapterName: string;
  stageProgress: number;        // 0-1 within current stage
  overallProgress: number;      // 0-1 across all stages
  stages: StageProgress[];
}

export interface StageProgress {
  stageId: number;
  stageName: string;
  totalGroups: number;
  encountered: number;
  mastered: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

const PROGRESS_KEY = "rescueDuckSemanticProgress";
const GLOBAL_LEVEL_KEY = "rescueDuckGlobalLevel";

function loadProgress(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    // Auto-clean if game progress was reset: low global level + inflated mastery
    const globalRaw = localStorage.getItem(GLOBAL_LEVEL_KEY);
    const globalLevel = globalRaw ? parseInt(globalRaw, 10) : 1;
    if (globalLevel <= 10 && Object.keys(data).length > 60) {
      localStorage.removeItem(PROGRESS_KEY);
      return {};
    }
    return data;
  } catch {
    return {};
  }
}

function saveProgress(data: Record<string, number>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

/** Record that a group was encountered (seen by the player). */
export function recordGroupEncountered(groupId: string): void {
  const progress = loadProgress();
  if (!progress[groupId]) {
    progress[groupId] = 1; // 1 = encountered
    saveProgress(progress);
  }
}

/** Record that a group was mastered (completed without wrong taps in its chain). */
export function recordGroupMastered(groupId: string): void {
  const progress = loadProgress();
  progress[groupId] = 2; // 2 = mastered
  saveProgress(progress);
}

/** Build the full semantic progress snapshot. */
export function getSemanticProgress(globalLevel: number): SemanticProgress {
  const progress = loadProgress();
  const { stageId, chapterId, chapterName } = getStageAndLevel(globalLevel);

  // Only count groups the player can access (stages up to current)
  const accessibleGroupIds = new Set<string>();
  for (const stage of CURRICULUM) {
    if (stage.id > stageId) break;
    const [dMin, dMax] = stage.difficultyRange;
    for (const g of semanticGroupsV2) {
      if (g.difficulty >= dMin && g.difficulty <= dMax) {
        accessibleGroupIds.add(g.id);
      }
    }
  }

  const stages: StageProgress[] = CURRICULUM.map((stage) => {
    const [dMin, dMax] = stage.difficultyRange;
    const stageGroups = semanticGroupsV2.filter(
      (g) => g.difficulty >= dMin && g.difficulty <= dMax
    );
    const total = stageGroups.length;
    const encountered = stageGroups.filter((g) => (progress[g.id] ?? 0) >= 1).length;
    const mastered = stageGroups.filter((g) => (progress[g.id] ?? 0) >= 2).length;
    return {
      stageId: stage.id,
      stageName: stage.name,
      totalGroups: total,
      encountered,
      mastered,
      isUnlocked: stage.id <= stageId,
      isCompleted: mastered >= total * 0.8,
    };
  });

  // Global stats — scoped to stages the player has reached
  const accessibleEncountered = [...accessibleGroupIds].filter((id) => (progress[id] ?? 0) >= 1).length;
  const accessibleMastered = [...accessibleGroupIds].filter((id) => (progress[id] ?? 0) >= 2).length;

  const currentStage = stages.find((s) => s.stageId === stageId);
  const stageProgress = currentStage
    ? currentStage.encountered / Math.max(1, currentStage.totalGroups)
    : 0;

  return {
    totalGroupsInCurriculum: semanticGroupsV2.length,
    groupsEncountered: accessibleEncountered,
    groupsMastered: accessibleMastered,
    currentStage: stageId,
    currentChapter: chapterId,
    currentChapterName: chapterName,
    stageProgress: Math.min(1, stageProgress),
    overallProgress: semanticGroupsV2.length > 0
      ? accessibleEncountered / accessibleGroupIds.size
      : 0,
    stages,
  };
}

/** Clear all semantic progress tracking data. */
export function resetSemanticProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_KEY);
}

/** Get all chapters for a stage — for UI display. */
export function getChaptersForStage(stageId: number): ChapterDef[] {
  const stage = CURRICULUM.find((s) => s.id === stageId);
  return stage?.chapters ?? [];
}

/** Get the stage definition. */
export function getStageDef(stageId: number): StageDef | undefined {
  return CURRICULUM.find((s) => s.id === stageId);
}
