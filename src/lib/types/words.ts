export interface WordGroup {
  groupId: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  words: string[];
  meanings: Record<string, string>;
}
