"use client";

export type AudienceKind = "organization" | "rednote" | "reference";

export interface AudienceProfile {
  code: string;
  kind: AudienceKind;
}

const AUDIENCE_CODE_KEY = "rescueDuckAudienceCode";
const ACCESS_CODES: Record<string, AudienceKind> = {
  "rd-org-7k2m": "organization",
  "rd-red-4q9v": "rednote",
  "rd-ref-8n6p": "reference",
};

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function parseAudienceCode(value: string): AudienceProfile | null {
  const code = value.trim().toLowerCase();
  const kind = ACCESS_CODES[code];
  if (!kind) return null;

  return {
    code,
    kind,
  };
}

export function getStoredAudience(): AudienceProfile | null {
  if (!canUseStorage()) return null;
  const stored = localStorage.getItem(AUDIENCE_CODE_KEY);
  if (!stored) return null;
  return parseAudienceCode(stored);
}

export function saveAudienceCode(code: string): AudienceProfile | null {
  if (!canUseStorage()) return null;
  const profile = parseAudienceCode(code);
  if (!profile) return null;
  localStorage.setItem(AUDIENCE_CODE_KEY, profile.code);
  return profile;
}

export function isOrganizationAudience(profile: AudienceProfile | null): boolean {
  return profile?.kind === "organization";
}
