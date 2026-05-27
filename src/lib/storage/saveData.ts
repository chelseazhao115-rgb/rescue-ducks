"use client";

export const SAVE_KEYS = {
  globalLevel: "rescueDuckGlobalLevel",
  selectedLevel: "rescueDuckSelectedLevel",
  semanticProgress: "rescueDuckSemanticProgress",
  recentGroups: "rescueDuckRecentGroups",
} as const;

export interface RecentGroupsSave {
  globalLevel: number;
  ids: string[];
}

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function parseStoredInt(value: string | null): number | null {
  if (!value) return null;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function resetProgressData(): void {
  if (!canUseStorage()) return;
  localStorage.setItem(SAVE_KEYS.globalLevel, "1");
  localStorage.removeItem(SAVE_KEYS.selectedLevel);
  localStorage.removeItem(SAVE_KEYS.semanticProgress);
  localStorage.removeItem(SAVE_KEYS.recentGroups);
}

export function getValidatedGlobalLevel(totalLevels: number, allowComplete = true): number {
  if (!canUseStorage()) return 1;
  const maxStoredLevel = totalLevels + (allowComplete ? 1 : 0);
  const parsed = parseStoredInt(localStorage.getItem(SAVE_KEYS.globalLevel));

  if (parsed === null) return 1;
  if (parsed > totalLevels + 1) {
    resetProgressData();
    return 1;
  }

  return Math.min(Math.max(1, parsed), maxStoredLevel);
}

export function getPlayableGlobalLevel(totalLevels: number): number {
  return Math.min(getValidatedGlobalLevel(totalLevels), totalLevels);
}

export function setGlobalLevel(level: number, totalLevels: number, allowComplete = true): void {
  if (!canUseStorage()) return;
  const maxStoredLevel = totalLevels + (allowComplete ? 1 : 0);
  const safeLevel = Number.isFinite(level)
    ? Math.min(Math.max(1, Math.floor(level)), maxStoredLevel)
    : 1;
  localStorage.setItem(SAVE_KEYS.globalLevel, String(safeLevel));
}

export function advanceGlobalLevel(nextLevel: number, totalLevels: number): void {
  const current = getValidatedGlobalLevel(totalLevels);
  if (Number.isFinite(nextLevel) && nextLevel > current) {
    setGlobalLevel(nextLevel, totalLevels);
  }
}

export function getSelectedLevel(totalLevels: number): number | null {
  if (!canUseStorage()) return null;
  const selected = parseStoredInt(localStorage.getItem(SAVE_KEYS.selectedLevel));
  if (selected !== null && selected >= 1 && selected <= totalLevels) {
    return selected;
  }
  localStorage.removeItem(SAVE_KEYS.selectedLevel);
  return null;
}

export function setSelectedLevel(level: number, totalLevels: number): void {
  if (!canUseStorage()) return;
  const safeLevel = Number.isFinite(level)
    ? Math.min(Math.max(1, Math.floor(level)), totalLevels)
    : 1;
  localStorage.setItem(SAVE_KEYS.selectedLevel, String(safeLevel));
}

export function clearSelectedLevel(): void {
  if (!canUseStorage()) return;
  localStorage.removeItem(SAVE_KEYS.selectedLevel);
}

export function loadSemanticProgress(): Record<string, number> {
  if (!canUseStorage()) return {};
  try {
    const raw = localStorage.getItem(SAVE_KEYS.semanticProgress);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      localStorage.removeItem(SAVE_KEYS.semanticProgress);
      return {};
    }

    const progress: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof key === "string" && (value === 1 || value === 2)) {
        progress[key] = value;
      }
    }
    return progress;
  } catch {
    localStorage.removeItem(SAVE_KEYS.semanticProgress);
    return {};
  }
}

export function saveSemanticProgress(progress: Record<string, number>): void {
  if (!canUseStorage()) return;
  localStorage.setItem(SAVE_KEYS.semanticProgress, JSON.stringify(progress));
}

export function clearSemanticProgress(): void {
  if (!canUseStorage()) return;
  localStorage.removeItem(SAVE_KEYS.semanticProgress);
}

export function shouldResetSemanticProgress(totalLevels: number): boolean {
  const globalLevel = getValidatedGlobalLevel(totalLevels);
  return globalLevel <= 10 && Object.keys(loadSemanticProgress()).length > 60;
}

export function loadRecentGroups(): RecentGroupsSave | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(SAVE_KEYS.recentGroups);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const ids = Array.isArray(parsed?.ids)
      ? parsed.ids.filter((id: unknown): id is string => typeof id === "string")
      : [];
    const globalLevel = Number.isFinite(parsed?.globalLevel)
      ? Number(parsed.globalLevel)
      : 1;
    return { globalLevel, ids };
  } catch {
    localStorage.removeItem(SAVE_KEYS.recentGroups);
    return null;
  }
}

export function saveRecentGroups(data: RecentGroupsSave): void {
  if (!canUseStorage()) return;
  localStorage.setItem(SAVE_KEYS.recentGroups, JSON.stringify(data));
}

export function clearRecentGroups(): void {
  if (!canUseStorage()) return;
  localStorage.removeItem(SAVE_KEYS.recentGroups);
}

export function resetAllProgress(): void {
  resetProgressData();
}
