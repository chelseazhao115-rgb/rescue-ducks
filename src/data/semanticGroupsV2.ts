// ───────────────────────────────────────────────
// Rescue Ducks — Semantic Groups V2
// Gameplay-optimized word bank for runtime engine
// 376 groups | 892 word exposures
// Auto-generated from semantic_groups.json
// ───────────────────────────────────────────────

/** Atmosphere-driven visual/sound/fog tags */
export type AtmosphereTag =
  | "calm"
  | "danger"
  | "dream"
  | "home"
  | "hope"
  | "journey"
  | "light"
  | "memory"
  | "quiet"
  | "storm"
  | "warm"
  | "water"

/** Word entry with gameplay metadata */
export interface SemanticWord {
  text: string
  /** Word learning difficulty (1-5) */
  wordDifficulty: number
  /** IELTS occurrence frequency (1-5) */
  frequency: number
  /** Visual importance: drives orb size & glow intensity (1-5) */
  visualWeight: number
}

/** A semantic group optimized for runtime gameplay generation */
export interface SemanticGroupV2 {
  id: string
  category: "pure_synonym" | "theme_cluster" | "contextual_synonym" | "academic_expression" | "logic_relation"
  /** Connection difficulty (1-5) */
  difficulty: number
  /** How intuitively words belong together (1-5) */
  semanticClarity: number
  /** Atmosphere tags → orb colors, particles, sound, fog, lighthouse feedback */
  atmosphere: AtmosphereTag[]
  /** Memory reinforcement priority (1-5). Higher = resurface more often. */
  resurfacingWeight: number
  /** Dynamic chain range [min, max] — same group supports short & long chains */
  recommendedChainRange: [number, number]
  keyword: string
  keywordsChinese: string
  words: SemanticWord[]
}

export const semanticGroupsV2: SemanticGroupV2[] = [
  {
    "id": "sg_0001",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "recognize",
    "keywordsChinese": "v.承认",
    "words": [
      {
        "text": "recognize",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "acknowledge",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "admit",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0002",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      5
    ],
    "keyword": "recognize",
    "keywordsChinese": "v.认出,识别",
    "words": [
      {
        "text": "recognize",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "perceive",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "realize",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "identify",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0003",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "comprehend",
    "keywordsChinese": "v.理解",
    "words": [
      {
        "text": "comprehend",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "understand",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "know",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0004",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      5
    ],
    "keyword": "adjust",
    "keywordsChinese": "v.调整,使适合",
    "words": [
      {
        "text": "adjust",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "change",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "modify",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "shift",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      },
      {
        "text": "alter",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0005",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "approach",
    "keywordsChinese": "n.⽅法",
    "words": [
      {
        "text": "approach",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "method",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "way",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0006",
    "category": "contextual_synonym",
    "difficulty": 4,
    "semanticClarity": 2,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "fundamental",
    "keywordsChinese": "adj.基本的,基础的",
    "words": [
      {
        "text": "fundamental",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "rudimentary",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "preliminary",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "basic",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0007",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "rely on",
    "keywordsChinese": "依靠,依赖",
    "words": [
      {
        "text": "rely on",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "depend on",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0008",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "home",
      "warm"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "domestic",
    "keywordsChinese": "adj.家庭的;国内的",
    "words": [
      {
        "text": "domestic",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "home",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "local",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "national",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0009",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "measure",
    "keywordsChinese": "v.测量",
    "words": [
      {
        "text": "measure",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "calculate",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "assess",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "evaluate",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0010",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 2,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "trait",
    "keywordsChinese": "n.特性,特征",
    "words": [
      {
        "text": "trait",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "characteristic",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "feature",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "property",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0011",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "coin",
    "keywordsChinese": "v创造",
    "words": [
      {
        "text": "coin",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "first used",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "invent",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0012",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "dream"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "artificial",
    "keywordsChinese": "adj.⼈造的,仿造的",
    "words": [
      {
        "text": "artificial",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "synthetic",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "man-made",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0013",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "initiate",
    "keywordsChinese": "v.发起,开创",
    "words": [
      {
        "text": "initiate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "establish",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "introduce",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "launch",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0014",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      5
    ],
    "keyword": "prompt",
    "keywordsChinese": "adj.立刻的，迅速的",
    "words": [
      {
        "text": "prompt",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "immediate",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "instant",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "quick",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      },
      {
        "text": "swift",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0015",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "exchange",
    "keywordsChinese": "v.交换",
    "words": [
      {
        "text": "exchange",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "share",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0016",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 2,
    "atmosphere": [
      "home"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "underlie",
    "keywordsChinese": "v.成为….基础",
    "words": [
      {
        "text": "underlie",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "based on",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "ground",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "root",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0017",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "ignore",
    "keywordsChinese": "v.忽视,不顾",
    "words": [
      {
        "text": "ignore",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "neglect",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "overlook",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0018",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "fertiliser",
    "keywordsChinese": "n.化肥,肥料",
    "words": [
      {
        "text": "fertiliser",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "chemical",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "toxic",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "unnatural",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0019",
    "category": "logic_relation",
    "difficulty": 4,
    "semanticClarity": 1,
    "atmosphere": [
      "storm",
      "memory"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      3,
      5
    ],
    "keyword": "that",
    "keywordsChinese": "指代考点",
    "words": [
      {
        "text": "that",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "this",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 3
      },
      {
        "text": "it",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 3
      },
      {
        "text": "they",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 3
      },
      {
        "text": "those",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 2
      },
      {
        "text": "these",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 2
      },
      {
        "text": "such",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0020",
    "category": "logic_relation",
    "difficulty": 5,
    "semanticClarity": 1,
    "atmosphere": [
      "storm",
      "memory"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      3,
      5
    ],
    "keyword": "and",
    "keywordsChinese": "并列考点",
    "words": [
      {
        "text": "and",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "or",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 3
      },
      {
        "text": "as well as",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "both...and",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "not only...but also",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "other than",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "in addition",
        "wordDifficulty": 5,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "besides",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "on the one hand...on the other hand",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "neither...nor",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "either...or",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0021",
    "category": "logic_relation",
    "difficulty": 5,
    "semanticClarity": 1,
    "atmosphere": [
      "storm",
      "memory"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      3,
      5
    ],
    "keyword": "rather than",
    "keywordsChinese": "转折考点",
    "words": [
      {
        "text": "rather than",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "but",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "yet",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "however",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "whereas",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "nonetheless",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "nevertheless",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "although",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "notwithstanding",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "though",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 3
      },
      {
        "text": "instead",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0022",
    "category": "logic_relation",
    "difficulty": 5,
    "semanticClarity": 1,
    "atmosphere": [
      "storm",
      "memory"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      3,
      5
    ],
    "keyword": "thanks to",
    "keywordsChinese": "因果考点",
    "words": [
      {
        "text": "thanks to",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "stem from",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "derive",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "owing to",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "due to",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "because of",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "on account of",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "as a result of",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "leading to",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "because",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "since",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "for",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "in that",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "as",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "therefore",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "hence",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0023",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "diversity",
    "keywordsChinese": "n.多样性,差异",
    "words": [
      {
        "text": "diversity",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "variety",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "difference",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0024",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 2,
    "atmosphere": [
      "light",
      "journey",
      "water"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "detect",
    "keywordsChinese": "v.查明,发现",
    "words": [
      {
        "text": "detect",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "find",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "look for",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "seek",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "search",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0025",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "isolate",
    "keywordsChinese": "v.使隔离,使孤⽴",
    "words": [
      {
        "text": "isolate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "inaccessible",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0026",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "avoid",
    "keywordsChinese": "v.避免",
    "words": [
      {
        "text": "avoid",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "escape",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "inevitable",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0027",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "budget",
    "keywordsChinese": "n.预算",
    "words": [
      {
        "text": "budget",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fund",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "financial",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0028",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "adapt to",
    "keywordsChinese": "使适应",
    "words": [
      {
        "text": "adapt to",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fit",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "suit",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0029",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "alternative",
    "keywordsChinese": "adj.替代的,供选择的n.替代品",
    "words": [
      {
        "text": "alternative",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "substitute",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0030",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "compensate",
    "keywordsChinese": "n.补偿,赔偿",
    "words": [
      {
        "text": "compensate",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "make up",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "offset",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0031",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "component",
    "keywordsChinese": "n.成分,要素",
    "words": [
      {
        "text": "component",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "proportion",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0032",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "military",
    "keywordsChinese": "adj.军事的",
    "words": [
      {
        "text": "military",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "weapon",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "army",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0033",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "criteria",
    "keywordsChinese": "n.标准",
    "words": [
      {
        "text": "criteria",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "standard",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0034",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "curriculum",
    "keywordsChinese": "n.课程",
    "words": [
      {
        "text": "curriculum",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "syllabus",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "course of study",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0035",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "feasible",
    "keywordsChinese": "adj.可⾏的",
    "words": [
      {
        "text": "feasible",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "realistic",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "viable",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0036",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 2,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "constrain",
    "keywordsChinese": "v.束缚,限制",
    "words": [
      {
        "text": "constrain",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "stop",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "control",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0037",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 1,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "deficiency",
    "keywordsChinese": "n.缺陷,缺点",
    "words": [
      {
        "text": "deficiency",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "shortage",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "defect",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "weakness",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0038",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "light",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "supplement",
    "keywordsChinese": "v.补充",
    "words": [
      {
        "text": "supplement",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "provision",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0039",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "distinguish",
    "keywordsChinese": "v.区别,辨别",
    "words": [
      {
        "text": "distinguish",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "separate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "differentiate",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0040",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "analyze",
    "keywordsChinese": "v.分析,解释",
    "words": [
      {
        "text": "analyze",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "examine",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "diagnose",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0041",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 4,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "emphasize",
    "keywordsChinese": "v.强调,着重",
    "words": [
      {
        "text": "emphasize",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "focus on",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 5
      },
      {
        "text": "stress",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0042",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "enormous",
    "keywordsChinese": "adj.庞⼤的,巨⼤的",
    "words": [
      {
        "text": "enormous",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "massive",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "large",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0043",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "imitate",
    "keywordsChinese": "v.模仿",
    "words": [
      {
        "text": "imitate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "mimic",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "copy",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0044",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "danger",
      "quiet"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "impair",
    "keywordsChinese": "v.削弱,减少",
    "words": [
      {
        "text": "impair",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "damage",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "diminish",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "decrease",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0045",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      6
    ],
    "keyword": "hinder",
    "keywordsChinese": "v.阻碍",
    "words": [
      {
        "text": "hinder",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "impede",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "prevent",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "deter",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      },
      {
        "text": "obstacle",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0046",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "legitimate",
    "keywordsChinese": "adj.合法的",
    "words": [
      {
        "text": "legitimate",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "legal",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0047",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 4,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "limitation",
    "keywordsChinese": "n.限制",
    "words": [
      {
        "text": "limitation",
        "wordDifficulty": 4,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "restriction",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0048",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "memory",
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "convention",
    "keywordsChinese": "n.⼿法;习俗",
    "words": [
      {
        "text": "convention",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "method",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "tradition",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0049",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "demanding",
    "keywordsChinese": "adj.苛求的",
    "words": [
      {
        "text": "demanding",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "troublesome",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0050",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "determine",
    "keywordsChinese": "v.决定",
    "words": [
      {
        "text": "determine",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "decide",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0051",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "accelerate",
    "keywordsChinese": "v.加速,促进;强调",
    "words": [
      {
        "text": "accelerate",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "speed up",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0052",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "ancient",
    "keywordsChinese": "adj.古代的;古⽼的",
    "words": [
      {
        "text": "ancient",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "aged",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "old",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0053",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "beneficial",
    "keywordsChinese": "adj.有益的",
    "words": [
      {
        "text": "beneficial",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "helpful",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "advantageous",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "wholesome",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0054",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "chronic",
    "keywordsChinese": "adj.慢性的,⻓期的",
    "words": [
      {
        "text": "chronic",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "lasting",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0055",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 4,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "conscious",
    "keywordsChinese": "ad.有意识的,神志清醒的",
    "words": [
      {
        "text": "conscious",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "aware",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "knowing",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0056",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "minimize",
    "keywordsChinese": "v.最⼩化,使..减少到最少",
    "words": [
      {
        "text": "minimize",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "reduce",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "lessen",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0057",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "immunity",
    "keywordsChinese": "n.免疫⼒",
    "words": [
      {
        "text": "immunity",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "resistance",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0058",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 2,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "imperative",
    "keywordsChinese": "adj.必要的,紧急的",
    "words": [
      {
        "text": "imperative",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "compelling",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "necessary",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "urgent",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0059",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "secrete",
    "keywordsChinese": "v.分泌",
    "words": [
      {
        "text": "secrete",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "discharge",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "exude",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0060",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "exaggerate",
    "keywordsChinese": "v.夸⼤,夸张",
    "words": [
      {
        "text": "exaggerate",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "overstate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0061",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "transmit",
    "keywordsChinese": "v.传达,传输",
    "words": [
      {
        "text": "transmit",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "pass",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "send",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "transfer",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0062",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "extinct",
    "keywordsChinese": "v.灭绝",
    "words": [
      {
        "text": "extinct",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "die out",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "lost",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0063",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "exclusive",
    "keywordsChinese": "adj.独有的;排外的;专⼀的",
    "words": [
      {
        "text": "exclusive",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "only",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0064",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "guarantee",
    "keywordsChinese": "v.保证,担保",
    "words": [
      {
        "text": "guarantee",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "assure",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0065",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "inherit",
    "keywordsChinese": "v.继承",
    "words": [
      {
        "text": "inherit",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "receive",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0066",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "witness",
    "keywordsChinese": "n.⻅证,证据;⽬击者",
    "words": [
      {
        "text": "witness",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "view",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "see",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0067",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "magnetic",
    "keywordsChinese": "adj.有磁性的",
    "words": [
      {
        "text": "magnetic",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "attractive",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0068",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "loss",
    "keywordsChinese": "n.减少;亏损;失败;遗失的",
    "words": [
      {
        "text": "loss",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "waste",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "gone",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0069",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "option",
    "keywordsChinese": "n.选择",
    "words": [
      {
        "text": "option",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "choice",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0070",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "prefer to",
    "keywordsChinese": "更喜欢",
    "words": [
      {
        "text": "prefer to",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "rather",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0071",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "priority",
    "keywordsChinese": "n.优先权",
    "words": [
      {
        "text": "priority",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "preference",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "preferential",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0072",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "primary",
    "keywordsChinese": "adj.主要的",
    "words": [
      {
        "text": "primary",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "principle",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "main",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0073",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "principle",
    "keywordsChinese": "n.原理",
    "words": [
      {
        "text": "principle",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "rule",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0074",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "potential",
    "keywordsChinese": "n.潜能adj.潜在的",
    "words": [
      {
        "text": "potential",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "possibility",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0075",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "quantity",
    "keywordsChinese": "n.量,数量",
    "words": [
      {
        "text": "quantity",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "number",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0076",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "settle",
    "keywordsChinese": "v.解决;定居,稳定",
    "words": [
      {
        "text": "settle",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "fix",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 3
      },
      {
        "text": "figure out",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0077",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "sophisticate",
    "keywordsChinese": "v.使复杂",
    "words": [
      {
        "text": "sophisticate",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "complicate",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0078",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "light",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "specific",
    "keywordsChinese": "adj.明确的;特殊的",
    "words": [
      {
        "text": "specific",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "detailed",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "particular",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0079",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "survive",
    "keywordsChinese": "v.存活,幸存",
    "words": [
      {
        "text": "survive",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "remain",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0080",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "swift",
    "keywordsChinese": "adj.迅速的,敏捷的,⽴刻的",
    "words": [
      {
        "text": "swift",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "quick",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "rapid",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0081",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 4,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "unexpectedly",
    "keywordsChinese": "adv.出乎意料的",
    "words": [
      {
        "text": "unexpectedly",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "surprising",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0082",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "surrounding",
    "keywordsChinese": "n.环境",
    "words": [
      {
        "text": "surrounding",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "setting",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "environment",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0083",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "attempt",
    "keywordsChinese": "n.试图,尝试",
    "words": [
      {
        "text": "attempt",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "try",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "test",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0084",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "expertise",
    "keywordsChinese": "n.专⻔技术",
    "words": [
      {
        "text": "expertise",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "knowledge",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "skill",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0085",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "faculty",
    "keywordsChinese": "n.能⼒,才能;全体教员",
    "words": [
      {
        "text": "faculty",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "ability",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0086",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "donate",
    "keywordsChinese": "v.捐赠",
    "words": [
      {
        "text": "donate",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "contribute",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0087",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "dynamics",
    "keywordsChinese": "n.动⼒学",
    "words": [
      {
        "text": "dynamics",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "energy",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "force",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "move",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0088",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "incentive",
    "keywordsChinese": "n.刺激,⿎励;动机",
    "words": [
      {
        "text": "incentive",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "motive",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "stimulus",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0089",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "mortality",
    "keywordsChinese": "n.死亡率",
    "words": [
      {
        "text": "mortality",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "death",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0090",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "peripheral",
    "keywordsChinese": "adj.外围的,次要",
    "words": [
      {
        "text": "peripheral",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "unimportant",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "minor",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0091",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "vicinity",
    "keywordsChinese": "n.邻近,附近",
    "words": [
      {
        "text": "vicinity",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "neighbourhood",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "nearby",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0092",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 2,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "threaten",
    "keywordsChinese": "v.威胁,危及",
    "words": [
      {
        "text": "threaten",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "endanger",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "jeopardize",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "risk",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "hazard",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0093",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "practice",
    "keywordsChinese": "n.实⾏;练习",
    "words": [
      {
        "text": "practice",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "exercise",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0094",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      3,
      4
    ],
    "keyword": "bacteria",
    "keywordsChinese": "n.细菌",
    "words": [
      {
        "text": "bacteria",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "virus",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "germ",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      },
      {
        "text": "microbe",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0095",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "be subject to",
    "keywordsChinese": "受...⽀配",
    "words": [
      {
        "text": "be subject to",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "face",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0096",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "be liable to",
    "keywordsChinese": "易于...",
    "words": [
      {
        "text": "be liable to",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "potential",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0097",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "innate",
    "keywordsChinese": "adj.天⽣的;内在的,直觉的",
    "words": [
      {
        "text": "innate",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "built-in",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "inborn",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0098",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "pattern",
    "keywordsChinese": "n.模式",
    "words": [
      {
        "text": "pattern",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "formation",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0099",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "therapy",
    "keywordsChinese": "n.治疗,理疗",
    "words": [
      {
        "text": "therapy",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "treatment",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0100",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "original",
    "keywordsChinese": "adj.原始的,最初的",
    "words": [
      {
        "text": "original",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "initial",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "first",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0101",
    "category": "contextual_synonym",
    "difficulty": 4,
    "semanticClarity": 2,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "confidential",
    "keywordsChinese": "adj.机密的,秘密的",
    "words": [
      {
        "text": "confidential",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "undisclosed",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "secret",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "hidden",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0102",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "cognitive",
    "keywordsChinese": "adj.认知的",
    "words": [
      {
        "text": "cognitive",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "mental",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0103",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "comply with",
    "keywordsChinese": "照做,遵守",
    "words": [
      {
        "text": "comply with",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "obey",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0104",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "consult",
    "keywordsChinese": "v.查阅,商量,请教 咨询",
    "words": [
      {
        "text": "consult",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "ask for advice",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0105",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "superior",
    "keywordsChinese": "adj..上级的;优秀的",
    "words": [
      {
        "text": "superior",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "higher",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "upper",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0106",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 2,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "co-operation",
    "keywordsChinese": "n.合作,协作",
    "words": [
      {
        "text": "co-operation",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "support",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "work together",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0107",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "co-ordinate",
    "keywordsChinese": "v.使….协调",
    "words": [
      {
        "text": "co-ordinate",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "organize",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "harmonize",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0108",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "differ",
    "keywordsChinese": "v.使…相异;使.不同",
    "words": [
      {
        "text": "differ",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "vary",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0109",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "cue",
    "keywordsChinese": "n.线索",
    "words": [
      {
        "text": "cue",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "hint",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "clue",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0110",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "signal",
    "keywordsChinese": "n.信号",
    "words": [
      {
        "text": "signal",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "symbol",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "mark",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "sign",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0111",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 2,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "abandon",
    "keywordsChinese": "v.放弃,遗弃",
    "words": [
      {
        "text": "abandon",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "quit",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "give up",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "forsake",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 2
      },
      {
        "text": "derelict",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0112",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "halt",
    "keywordsChinese": "n.停⽌",
    "words": [
      {
        "text": "halt",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "stop",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "quit",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0113",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "fragile",
    "keywordsChinese": "adj.脆弱的",
    "words": [
      {
        "text": "fragile",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "vulnerable",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0114",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "retain",
    "keywordsChinese": "v.记住",
    "words": [
      {
        "text": "retain",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "maintain",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0115",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "vanishi",
    "keywordsChinese": "n.消失,绝迹",
    "words": [
      {
        "text": "vanishi",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "disappear",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0116",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "delivery",
    "keywordsChinese": "n.递送",
    "words": [
      {
        "text": "delivery",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "send",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0117",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "erode",
    "keywordsChinese": "v.侵蚀",
    "words": [
      {
        "text": "erode",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "rust",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "damage",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0118",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "induce",
    "keywordsChinese": "v.引起,引诱",
    "words": [
      {
        "text": "induce",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "cause",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "lead to",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0119",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "stable",
    "keywordsChinese": "adji.稳定的",
    "words": [
      {
        "text": "stable",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "constant",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "unchanged",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0120",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "integrate",
    "keywordsChinese": "v.使…….成整体",
    "words": [
      {
        "text": "integrate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "combine",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "whole",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0121",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "equal",
    "keywordsChinese": "adj.平等的;相等的;胜任的",
    "words": [
      {
        "text": "equal",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fair",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      },
      {
        "text": "even",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0122",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "grant",
    "keywordsChinese": "v.拨款;授予",
    "words": [
      {
        "text": "grant",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "offer",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0123",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "accumulate",
    "keywordsChinese": "v.积累,积聚",
    "words": [
      {
        "text": "accumulate",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "gather",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0124",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "addictive",
    "keywordsChinese": "adj.上瘾的",
    "words": [
      {
        "text": "addictive",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "habit",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0125",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "adversity",
    "keywordsChinese": "n.逆境,不幸",
    "words": [
      {
        "text": "adversity",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "trouble",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0126",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "aggression",
    "keywordsChinese": "n.侵犯,侵害",
    "words": [
      {
        "text": "aggression",
        "wordDifficulty": 4,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "attack",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0127",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "agreeable",
    "keywordsChinese": "adj.令⼈愉快的;合适的;和蔼的",
    "words": [
      {
        "text": "agreeable",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "pleasant",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0128",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "aid",
    "keywordsChinese": "n.援助,帮助",
    "words": [
      {
        "text": "aid",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "help",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0129",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "allergic",
    "keywordsChinese": "adj.过敏的;对...极讨厌的",
    "words": [
      {
        "text": "allergic",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "irritate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0130",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "altitude",
    "keywordsChinese": "n.⾼度,海拔",
    "words": [
      {
        "text": "altitude",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "height",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0131",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 4,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "application",
    "keywordsChinese": "n.应⽤",
    "words": [
      {
        "text": "application",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "utilization",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0132",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "approve",
    "keywordsChinese": "v.批准",
    "words": [
      {
        "text": "approve",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "agree",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0133",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "array",
    "keywordsChinese": "n.排列,⼤批",
    "words": [
      {
        "text": "array",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "order",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0134",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "assign",
    "keywordsChinese": "v.分配,指派",
    "words": [
      {
        "text": "assign",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "allocate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0135",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "association",
    "keywordsChinese": "n.协会,联盟;联系",
    "words": [
      {
        "text": "association",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "union",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0136",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "attitude",
    "keywordsChinese": "n.看法,态度",
    "words": [
      {
        "text": "attitude",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "opinion",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0137",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "authority",
    "keywordsChinese": "n.当局,权威",
    "words": [
      {
        "text": "authority",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "government",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0138",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "be consistent with",
    "keywordsChinese": "与..⼀致",
    "words": [
      {
        "text": "be consistent with",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "compatible",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0139",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "bear",
    "keywordsChinese": "v.承担;忍受",
    "words": [
      {
        "text": "bear",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "tolerate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0140",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "blight",
    "keywordsChinese": "v.损害;枯萎",
    "words": [
      {
        "text": "blight",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "destroy",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0141",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "bungle",
    "keywordsChinese": "v.搞糟,拙劣地⼯作",
    "words": [
      {
        "text": "bungle",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "mishandle",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0142",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "burden",
    "keywordsChinese": "n.负担",
    "words": [
      {
        "text": "burden",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "load",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0143",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "calamity",
    "keywordsChinese": "n.灾难",
    "words": [
      {
        "text": "calamity",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "disaster",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0144",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "capacity",
    "keywordsChinese": "n.容量",
    "words": [
      {
        "text": "capacity",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "volume",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0145",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "catastrophic",
    "keywordsChinese": "adj.灾难的",
    "words": [
      {
        "text": "catastrophic",
        "wordDifficulty": 4,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "disastrous",
        "wordDifficulty": 4,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0146",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "cater",
    "keywordsChinese": "v.迎合;满⾜需求",
    "words": [
      {
        "text": "cater",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "serve",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0147",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "certifv",
    "keywordsChinese": "v.证明,保证",
    "words": [
      {
        "text": "certifv",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "verify",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0148",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "civic",
    "keywordsChinese": "adj.实名的",
    "words": [
      {
        "text": "civic",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "municipal",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0149",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "comment",
    "keywordsChinese": "n.评论;意⻅ v.评论",
    "words": [
      {
        "text": "comment",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "remark",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0150",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "commitment",
    "keywordsChinese": "n.承诺,许诺,义务;致⼒",
    "words": [
      {
        "text": "commitment",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "engagement",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0151",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "communal",
    "keywordsChinese": "adj.公共的,公社的",
    "words": [
      {
        "text": "communal",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "public",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0152",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "journey",
      "quiet"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "commute",
    "keywordsChinese": "v.通勤;⽤…交换",
    "words": [
      {
        "text": "commute",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "travel",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0153",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "compare",
    "keywordsChinese": "v.与...相⽐较",
    "words": [
      {
        "text": "compare",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "contrast",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0154",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "conceal",
    "keywordsChinese": "v.隐藏;隐瞒",
    "words": [
      {
        "text": "conceal",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hide",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0155",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "concentrate",
    "keywordsChinese": "v.专⼼于;集中",
    "words": [
      {
        "text": "concentrate",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "focus",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0156",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "concur",
    "keywordsChinese": "v.同意",
    "words": [
      {
        "text": "concur",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "agree",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0157",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "confer",
    "keywordsChinese": "v.授予,给予",
    "words": [
      {
        "text": "confer",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "grant",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0158",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm",
      "danger"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "conflict",
    "keywordsChinese": "n.冲突,⽭盾",
    "words": [
      {
        "text": "conflict",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "unharmonious",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0159",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "confuse",
    "keywordsChinese": "v.使混乱,使迷惑",
    "words": [
      {
        "text": "confuse",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "puzzle",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0160",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "memory",
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "conservative",
    "keywordsChinese": "adj.保守的",
    "words": [
      {
        "text": "conservative",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "traditional",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0161",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "considerable",
    "keywordsChinese": "adj.相当⼤的,重要的",
    "words": [
      {
        "text": "considerable",
        "wordDifficulty": 4,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "significant",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0162",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "contingent",
    "keywordsChinese": "adj.因情况⽽异的",
    "words": [
      {
        "text": "contingent",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "uncertain",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0163",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "controversial",
    "keywordsChinese": "adj.有争论的",
    "words": [
      {
        "text": "controversial",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "disputable",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0164",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "correlation",
    "keywordsChinese": "n.相关,关联",
    "words": [
      {
        "text": "correlation",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "link",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0165",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "courtship",
    "keywordsChinese": "n.求爱(时期)",
    "words": [
      {
        "text": "courtship",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "mate",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0166",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "crash",
    "keywordsChinese": "n.碰撞",
    "words": [
      {
        "text": "crash",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "collapse",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0167",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "credibility",
    "keywordsChinese": "n.可信性",
    "words": [
      {
        "text": "credibility",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "reliance",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0168",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "criminal",
    "keywordsChinese": "n.罪犯,犯⼈",
    "words": [
      {
        "text": "criminal",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "conviction",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0169",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm",
      "danger"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "crisis",
    "keywordsChinese": "n.危机",
    "words": [
      {
        "text": "crisis",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "risk",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0170",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "criticism",
    "keywordsChinese": "n.评论",
    "words": [
      {
        "text": "criticism",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "condemn",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0171",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "curb",
    "keywordsChinese": "v.限制,抑制",
    "words": [
      {
        "text": "curb",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "restrict",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0172",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "damp",
    "keywordsChinese": "adj.潮湿的",
    "words": [
      {
        "text": "damp",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "wet",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0173",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "dazzle",
    "keywordsChinese": "v.使⽬眩;使…眼花",
    "words": [
      {
        "text": "dazzle",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "flash",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0174",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "deadline",
    "keywordsChinese": "n.最后期限",
    "words": [
      {
        "text": "deadline",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "limit",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0175",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "delay",
    "keywordsChinese": "n.延期,耽搁",
    "words": [
      {
        "text": "delay",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "postpone",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0176",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "democratic",
    "keywordsChinese": "adj.⺠主的",
    "words": [
      {
        "text": "democratic",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "republic",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0177",
    "category": "theme_cluster",
    "difficulty": 4,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "demographic",
    "keywordsChinese": "adj.⼈⼝统计学的:⼈⼝学",
    "words": [
      {
        "text": "demographic",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "population statistic",
        "wordDifficulty": 5,
        "frequency": 2,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0178",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "dental",
    "keywordsChinese": "adj.⽛科的,⽛⻮的",
    "words": [
      {
        "text": "dental",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "teeth",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0179",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "depression",
    "keywordsChinese": "n.抑郁,沮丧",
    "words": [
      {
        "text": "depression",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "frustration",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0180",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "designate",
    "keywordsChinese": "n.指定;指派,标出",
    "words": [
      {
        "text": "designate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "appoint",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0181",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "detain",
    "keywordsChinese": "v.留住",
    "words": [
      {
        "text": "detain",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hold",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0182",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "devastate",
    "keywordsChinese": "v.毁坏,毁灭",
    "words": [
      {
        "text": "devastate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "wreck",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0183",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "disclose",
    "keywordsChinese": "v.公开;揭露",
    "words": [
      {
        "text": "disclose",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "expose",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0184",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "disparate",
    "keywordsChinese": "adj.不同的",
    "words": [
      {
        "text": "disparate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "different",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0185",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "display",
    "keywordsChinese": "n.显示",
    "words": [
      {
        "text": "display",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "show",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0186",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "disrupt",
    "keywordsChinese": "v.破坏",
    "words": [
      {
        "text": "disrupt",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "destroy",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0187",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "distract",
    "keywordsChinese": "v.转移,分⼼",
    "words": [
      {
        "text": "distract",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "divert",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0188",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "distribute",
    "keywordsChinese": "v.分配,分发",
    "words": [
      {
        "text": "distribute",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "spread",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0189",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "documentation",
    "keywordsChinese": "n.⽂件;⽂献",
    "words": [
      {
        "text": "documentation",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "record",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0190",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "domain",
    "keywordsChinese": "n.领域",
    "words": [
      {
        "text": "domain",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "field",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0191",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "dominant",
    "keywordsChinese": "ad.占优势的,占⽀配地位的",
    "words": [
      {
        "text": "dominant",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "overbearing",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0192",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "dramatic",
    "keywordsChinese": "adj.戏剧化的;激动⼈⼼的",
    "words": [
      {
        "text": "dramatic",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "striking",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0193",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "drought",
    "keywordsChinese": "n.⼲旱",
    "words": [
      {
        "text": "drought",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "dry",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0194",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "durable",
    "keywordsChinese": "adj.持久的",
    "words": [
      {
        "text": "durable",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "lasting",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0195",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "eco-friendly",
    "keywordsChinese": "adj.⽣态友好的,环保的",
    "words": [
      {
        "text": "eco-friendly",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "environmentally-friendly",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0196",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "elaborate",
    "keywordsChinese": "v.详细阐述,详细叙述",
    "words": [
      {
        "text": "elaborate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "illustrate",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0197",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "elderly",
    "keywordsChinese": "adj.⾼龄的",
    "words": [
      {
        "text": "elderly",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "aged",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0198",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "eliminate",
    "keywordsChinese": "v.消除,排除",
    "words": [
      {
        "text": "eliminate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "dispose",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0199",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "elusive",
    "keywordsChinese": "ad.难懂的,难捉摸的;⾏踪隐秘的",
    "words": [
      {
        "text": "elusive",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hard",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0200",
    "category": "contextual_synonym",
    "difficulty": 4,
    "semanticClarity": 4,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "encyclopaedia",
    "keywordsChinese": "n.百科全书",
    "words": [
      {
        "text": "encyclopaedia",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "entire range of knowledge",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0201",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "warm",
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "entrepreneur",
    "keywordsChinese": "n.企业家",
    "words": [
      {
        "text": "entrepreneur",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "boss",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0202",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "equator",
    "keywordsChinese": "n.⾚道",
    "words": [
      {
        "text": "equator",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "geography",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0203",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 4,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "erratically",
    "keywordsChinese": "adv.不定的,⽆视规律地",
    "words": [
      {
        "text": "erratically",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "unpredictably",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0204",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "established",
    "keywordsChinese": "adj.确定的;已制定的,已建⽴的",
    "words": [
      {
        "text": "established",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "built",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0205",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "estate",
    "keywordsChinese": "n.房地产",
    "words": [
      {
        "text": "estate",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "property",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0206",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "ethical",
    "keywordsChinese": "adj.道德的",
    "words": [
      {
        "text": "ethical",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "moral",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0207",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "eventually",
    "keywordsChinese": "adv.最后,终于",
    "words": [
      {
        "text": "eventually",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "finally",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0208",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "evidence",
    "keywordsChinese": "n.迹象;证据",
    "words": [
      {
        "text": "evidence",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "proof",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0209",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "evolve",
    "keywordsChinese": "v.进化,发展;逐渐形成",
    "words": [
      {
        "text": "evolve",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "develop",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0210",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "exhausted",
    "keywordsChinese": "ad.疲惫的,耗尽的",
    "words": [
      {
        "text": "exhausted",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fatigue",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0211",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "experiment",
    "keywordsChinese": "n.试验,试验",
    "words": [
      {
        "text": "experiment",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "test",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0212",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "exceptiona",
    "keywordsChinese": "ad.异常的,特别出⾊的",
    "words": [
      {
        "text": "exceptiona",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "extreme",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      },
      {
        "text": "utmost",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0213",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "explicit",
    "keywordsChinese": "adj.明确的",
    "words": [
      {
        "text": "explicit",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "clear",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0214",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "exploit",
    "keywordsChinese": "v.开发,利⽤",
    "words": [
      {
        "text": "exploit",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "use",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0215",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "extend",
    "keywordsChinese": "v扩展,延伸, 推⼴",
    "words": [
      {
        "text": "extend",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "expand",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0216",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "extract",
    "keywordsChinese": "n.摘录 v.提取",
    "words": [
      {
        "text": "extract",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "quotation",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0217",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "famine",
    "keywordsChinese": "n.饥荒",
    "words": [
      {
        "text": "famine",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hunger",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0218",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "finite",
    "keywordsChinese": "adj.有限的",
    "words": [
      {
        "text": "finite",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "limited",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0219",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "fitness",
    "keywordsChinese": "n.健康的",
    "words": [
      {
        "text": "fitness",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "health",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0220",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "foe",
    "keywordsChinese": "n.敌⼈,危害物",
    "words": [
      {
        "text": "foe",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "enemy",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0221",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "format",
    "keywordsChinese": "n.格式",
    "words": [
      {
        "text": "format",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "structure",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0222",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "fragment",
    "keywordsChinese": "n.碎⽚",
    "words": [
      {
        "text": "fragment",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "piece",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0223",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "freeze",
    "keywordsChinese": "n.冰冻,冻结",
    "words": [
      {
        "text": "freeze",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "chill",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0224",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "fulfill",
    "keywordsChinese": "v.满⾜,实现",
    "words": [
      {
        "text": "fulfill",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "execute",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0225",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "dream"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "gifted",
    "keywordsChinese": "ad.有天赋的,有才华的",
    "words": [
      {
        "text": "gifted",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "talented",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0226",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "graphic",
    "keywordsChinese": "adj.形象的;图解的",
    "words": [
      {
        "text": "graphic",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "picture",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0227",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "habitat",
    "keywordsChinese": "n.栖息地,住所",
    "words": [
      {
        "text": "habitat",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "residence",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0228",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "memory"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "harbor",
    "keywordsChinese": "v.怀有 n.海港",
    "words": [
      {
        "text": "harbor",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hold",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0229",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "hardship",
    "keywordsChinese": "n.困苦;苦难",
    "words": [
      {
        "text": "hardship",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "difficult",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0230",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "harsh",
    "keywordsChinese": "ad.艰难的;严酷的",
    "words": [
      {
        "text": "harsh",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "rough",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0231",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "hypothesis",
    "keywordsChinese": "n.假设",
    "words": [
      {
        "text": "hypothesis",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "assumption",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0232",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "impact",
    "keywordsChinese": "n.影响",
    "words": [
      {
        "text": "impact",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "influence",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0233",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "impressive",
    "keywordsChinese": "adj.感⼈的;给⼈深刻印象的",
    "words": [
      {
        "text": "impressive",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "touching",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0234",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "in accordance with",
    "keywordsChinese": "依照;与….-致",
    "words": [
      {
        "text": "in accordance with",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "conform",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0235",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "danger"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "inaccurate",
    "keywordsChinese": "adj.错误的",
    "words": [
      {
        "text": "inaccurate",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "incorrect",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0236",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "inactive",
    "keywordsChinese": "adj.不活跃的,不活动的",
    "words": [
      {
        "text": "inactive",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "passive",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0237",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "inappropriate",
    "keywordsChinese": "ad.不适当的",
    "words": [
      {
        "text": "inappropriate",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "hard",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0238",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "indulge",
    "keywordsChinese": "v.沉溺(于)",
    "words": [
      {
        "text": "indulge",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "spoil",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0239",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "infest",
    "keywordsChinese": "v.侵害;寄⽣于",
    "words": [
      {
        "text": "infest",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "plague",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0240",
    "category": "contextual_synonym",
    "difficulty": 4,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "installment",
    "keywordsChinese": "n.安装;分期付款",
    "words": [
      {
        "text": "installment",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "payment on its completion",
        "wordDifficulty": 5,
        "frequency": 5,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0241",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "intelligence",
    "keywordsChinese": "n.智⼒",
    "words": [
      {
        "text": "intelligence",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "mind",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0242",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "warm",
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "intense",
    "keywordsChinese": "adj.强烈的;紧张的;热情的",
    "words": [
      {
        "text": "intense",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "strong",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0243",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "interaction",
    "keywordsChinese": "n.相互作⽤,交流互动",
    "words": [
      {
        "text": "interaction",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "social activities",
        "wordDifficulty": 5,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0244",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "interference",
    "keywordsChinese": "n.⼲涉",
    "words": [
      {
        "text": "interference",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "interdependence",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0245",
    "category": "academic_expression",
    "difficulty": 2,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "interior",
    "keywordsChinese": "n.内部 adj.内部的",
    "words": [
      {
        "text": "interior",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "inner",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0246",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "interrupt",
    "keywordsChinese": "v.中断",
    "words": [
      {
        "text": "interrupt",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "stopi",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0247",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "introverted",
    "keywordsChinese": "ad.内向的,含蓄的",
    "words": [
      {
        "text": "introverted",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "shyness",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0248",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "involve",
    "keywordsChinese": "v.包含,牵涉",
    "words": [
      {
        "text": "involve",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "associate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0249",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "keen",
    "keywordsChinese": "adj.热切的;强迫的,强烈的",
    "words": [
      {
        "text": "keen",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "strong",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0250",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "label",
    "keywordsChinese": "v.打上标签",
    "words": [
      {
        "text": "label",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "display",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0251",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "lack",
    "keywordsChinese": "v.缺乏;不⾜",
    "words": [
      {
        "text": "lack",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "shortage",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0252",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "landscape",
    "keywordsChinese": "n.⻛景",
    "words": [
      {
        "text": "landscape",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "scene",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0253",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "likelihood",
    "keywordsChinese": "n.可能性",
    "words": [
      {
        "text": "likelihood",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "chance",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0254",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "limb",
    "keywordsChinese": "n.四肢",
    "words": [
      {
        "text": "limb",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "arm or leg",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0255",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "linguistic",
    "keywordsChinese": "adj.语⾔(学)的",
    "words": [
      {
        "text": "linguistic",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "language",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0256",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "log",
    "keywordsChinese": "v.记录n.原⽊",
    "words": [
      {
        "text": "log",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "record",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0257",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      4
    ],
    "keyword": "look-in",
    "keywordsChinese": "n.成功的机会",
    "words": [
      {
        "text": "look-in",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "opportunity",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "chance",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 2
      }
    ]
  },
  {
    "id": "sg_0258",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "lopsided",
    "keywordsChinese": "adj.不平衡的",
    "words": [
      {
        "text": "lopsided",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "uneven",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0259",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "mainly",
    "keywordsChinese": "adv.主要的,⼤体的",
    "words": [
      {
        "text": "mainly",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "primarily",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0260",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "malfunction",
    "keywordsChinese": "v.发⽣故障;不起作⽤",
    "words": [
      {
        "text": "malfunction",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "breakdown",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0261",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "mammal",
    "keywordsChinese": "n.哺乳动物",
    "words": [
      {
        "text": "mammal",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "creature",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0262",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "mange to do",
    "keywordsChinese": "设法完成某事",
    "words": [
      {
        "text": "mange to do",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "success",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0263",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "manifest",
    "keywordsChinese": "v.出现,表现",
    "words": [
      {
        "text": "manifest",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "obvious",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0264",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "manufacture",
    "keywordsChinese": "n.⽣产",
    "words": [
      {
        "text": "manufacture",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      },
      {
        "text": "produce",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0265",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "marine",
    "keywordsChinese": "adj.海产的;航海的;海运的",
    "words": [
      {
        "text": "marine",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "sea",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0266",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "mate",
    "keywordsChinese": "n.配偶",
    "words": [
      {
        "text": "mate",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "spouse",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0267",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "mechanism",
    "keywordsChinese": "n.机制,原理",
    "words": [
      {
        "text": "mechanism",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "method",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0268",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "mental",
    "keywordsChinese": "adj.精神的,⼼理的",
    "words": [
      {
        "text": "mental",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "intelligent",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0269",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "mercury",
    "keywordsChinese": "n.汞,⽔银",
    "words": [
      {
        "text": "mercury",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "liguid metal",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0270",
    "category": "theme_cluster",
    "difficulty": 4,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 3,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "meteorological",
    "keywordsChinese": "adj.⽓象学的",
    "words": [
      {
        "text": "meteorological",
        "wordDifficulty": 5,
        "frequency": 2,
        "visualWeight": 4
      },
      {
        "text": "weather",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0271",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "migrate",
    "keywordsChinese": "v.转移,迁移",
    "words": [
      {
        "text": "migrate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "move",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0272",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "water"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "moisture",
    "keywordsChinese": "n.⽔分,湿度",
    "words": [
      {
        "text": "moisture",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "humidity",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0273",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "monitor",
    "keywordsChinese": "v.监控",
    "words": [
      {
        "text": "monitor",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "surveillance",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0274",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "motif",
    "keywordsChinese": "n.主题;图形",
    "words": [
      {
        "text": "motif",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "theme",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0275",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "mould",
    "keywordsChinese": "v.模压,塑造;塑造成",
    "words": [
      {
        "text": "mould",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "form",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0276",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "home"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "native",
    "keywordsChinese": "adj.本国的,⼟著的;天然的;天赋的",
    "words": [
      {
        "text": "native",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "original",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0277",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "nocturnal",
    "keywordsChinese": "adj.夜间的,夜间发⽣的",
    "words": [
      {
        "text": "nocturnal",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "night",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0278",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "norm",
    "keywordsChinese": "n.规范",
    "words": [
      {
        "text": "norm",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "regulation",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0279",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "notoriety",
    "keywordsChinese": "n.名声",
    "words": [
      {
        "text": "notoriety",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "famous",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0280",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "objective",
    "keywordsChinese": "n.⽬标,⽬的; adj.客观的",
    "words": [
      {
        "text": "objective",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "goal",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0281",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "obligation",
    "keywordsChinese": "n.义务",
    "words": [
      {
        "text": "obligation",
        "wordDifficulty": 4,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "responsibility",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0282",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "obscure",
    "keywordsChinese": "v.掩盖,使模糊不清",
    "words": [
      {
        "text": "obscure",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hide",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0283",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "obtain",
    "keywordsChinese": "v.获得",
    "words": [
      {
        "text": "obtain",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "get",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0284",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "odd",
    "keywordsChinese": "adj.古怪的",
    "words": [
      {
        "text": "odd",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "strangel",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0285",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "odour",
    "keywordsChinese": "n.⽓味",
    "words": [
      {
        "text": "odour",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "smell",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0286",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "offensive",
    "keywordsChinese": "ad.冒犯的,⽆礼的",
    "words": [
      {
        "text": "offensive",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hostile",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0287",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "official",
    "keywordsChinese": "n.官员 adj.官⽅的",
    "words": [
      {
        "text": "official",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "authority",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0288",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "optimum",
    "keywordsChinese": "n.最佳效果 adj. 最适宜的",
    "words": [
      {
        "text": "optimum",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "best",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0289",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "ordinary",
    "keywordsChinese": "adj.普通的;平凡的;平常的",
    "words": [
      {
        "text": "ordinary",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "common",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0290",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "organ",
    "keywordsChinese": "n.器官;机构",
    "words": [
      {
        "text": "organ",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "a part of a body",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0291",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "hope",
      "journey"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "out of the question",
    "keywordsChinese": "不可能",
    "words": [
      {
        "text": "out of the question",
        "wordDifficulty": 5,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "impossible",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0292",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "overcome",
    "keywordsChinese": "v.克服",
    "words": [
      {
        "text": "overcome",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "defeat",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0293",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "overtake",
    "keywordsChinese": "v.,赶上",
    "words": [
      {
        "text": "overtake",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "surpass",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0294",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "paralyse",
    "keywordsChinese": "v.使……麻痹;使…瘫痪",
    "words": [
      {
        "text": "paralyse",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "cannot move",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0295",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "paramount",
    "keywordsChinese": "adj.最重要的,主要的",
    "words": [
      {
        "text": "paramount",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "principal",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0296",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "dream"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "participate",
    "keywordsChinese": "v.参加",
    "words": [
      {
        "text": "participate",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "join",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0297",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "patient",
    "keywordsChinese": "能容忍的 n.病⼈; 患者",
    "words": [
      {
        "text": "patient",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "repetitive",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0298",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "peak",
    "keywordsChinese": "n.最⾼峰,顶点 v.使…达到顶峰",
    "words": [
      {
        "text": "peak",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "top",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0299",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "permit",
    "keywordsChinese": "n.许可证,执照 v.许可",
    "words": [
      {
        "text": "permit",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "allow",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0300",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "persuade",
    "keywordsChinese": "v.说服,劝说",
    "words": [
      {
        "text": "persuade",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "influence",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0301",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "pessimistic",
    "keywordsChinese": "adj.悲观的",
    "words": [
      {
        "text": "pessimistic",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "negative",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0302",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "phase",
    "keywordsChinese": "n.阶段",
    "words": [
      {
        "text": "phase",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "process",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0303",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "physical",
    "keywordsChinese": "adj.⾝体上的;物质的",
    "words": [
      {
        "text": "physical",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "body",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0304",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "plagiarise",
    "keywordsChinese": "v.抄袭",
    "words": [
      {
        "text": "plagiarise",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "copyi",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0305",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "plenty of",
    "keywordsChinese": "⼤量的",
    "words": [
      {
        "text": "plenty of",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "manyi",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0306",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "plot",
    "keywordsChinese": "v.密谋",
    "words": [
      {
        "text": "plot",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "plan",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0307",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "pose",
    "keywordsChinese": "v.提出,造成, 形成",
    "words": [
      {
        "text": "pose",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "cause",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0308",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "portable",
    "keywordsChinese": "adj.可携带的",
    "words": [
      {
        "text": "portable",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "conveyable",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0309",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "poverty",
    "keywordsChinese": "n.贫穷",
    "words": [
      {
        "text": "poverty",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "poor",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0310",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "praise",
    "keywordsChinese": "n.赞扬",
    "words": [
      {
        "text": "praise",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "commend",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0311",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "predict",
    "keywordsChinese": "v.预测,预知",
    "words": [
      {
        "text": "predict",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "expect",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0312",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "pressing",
    "keywordsChinese": "adj.迫切的",
    "words": [
      {
        "text": "pressing",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "urgent",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0313",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "private",
    "keywordsChinese": "adj.私人的;私有的;私下的",
    "words": [
      {
        "text": "private",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "personal",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0314",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "prohibit",
    "keywordsChinese": "v.禁止的",
    "words": [
      {
        "text": "prohibit",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "not allowed",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0315",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "prolong",
    "keywordsChinese": "v.拉长,延长",
    "words": [
      {
        "text": "prolong",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "extend",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0316",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "promote",
    "keywordsChinese": "v.促进,推销",
    "words": [
      {
        "text": "promote",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "improve",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0317",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "prosper",
    "keywordsChinese": "v.使成功,使繁荣",
    "words": [
      {
        "text": "prosper",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "success",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0318",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "purify",
    "keywordsChinese": "v.净化",
    "words": [
      {
        "text": "purify",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "clean",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0319",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "qualify",
    "keywordsChinese": "v.取得资格",
    "words": [
      {
        "text": "qualify",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fulfill",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0320",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "radical",
    "keywordsChinese": "adj.彻底的,根本的",
    "words": [
      {
        "text": "radical",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "utmost",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0321",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "range",
    "keywordsChinese": "n.范围;幅度",
    "words": [
      {
        "text": "range",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "scope",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0322",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "rare",
    "keywordsChinese": "adj.稀有的",
    "words": [
      {
        "text": "rare",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "unusual",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0323",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "rate",
    "keywordsChinese": "n.等级 v.评估",
    "words": [
      {
        "text": "rate",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "rank",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "measure",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0324",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "react",
    "keywordsChinese": "v.反应",
    "words": [
      {
        "text": "react",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "respond",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0325",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "recreation",
    "keywordsChinese": "n.娱乐,消遣",
    "words": [
      {
        "text": "recreation",
        "wordDifficulty": 4,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "entertainment",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0326",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "reduction",
    "keywordsChinese": "n.下降,减少",
    "words": [
      {
        "text": "reduction",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "decrease",
        "wordDifficulty": 2,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0327",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "refer to",
    "keywordsChinese": "指(的是),涉及,提及",
    "words": [
      {
        "text": "refer to",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "talk about",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0328",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "rehearsal",
    "keywordsChinese": "n.排演;预演;练习",
    "words": [
      {
        "text": "rehearsal",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "preparation",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0329",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "reject",
    "keywordsChinese": "v.拒绝,排斥,丢弃",
    "words": [
      {
        "text": "reject",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "exclude",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0330",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "relevant",
    "keywordsChinese": "adj.相关的",
    "words": [
      {
        "text": "relevant",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "relative",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0331",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "religious",
    "keywordsChinese": "ad.宗教的;虔诚的",
    "words": [
      {
        "text": "religious",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "sacred",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0332",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "reluctant",
    "keywordsChinese": "adj.不情愿的",
    "words": [
      {
        "text": "reluctant",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "unwilling",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0333",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "reproduce",
    "keywordsChinese": "v.繁殖",
    "words": [
      {
        "text": "reproduce",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "breed",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0334",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "responsible",
    "keywordsChinese": "adj.负责的,可靠的:有责任的",
    "words": [
      {
        "text": "responsible",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "liable",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0335",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "light",
      "dream"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "revision",
    "keywordsChinese": "n.修正",
    "words": [
      {
        "text": "revision",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "editing",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0336",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "revive",
    "keywordsChinese": "v.使复苏,恢复",
    "words": [
      {
        "text": "revive",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "renaissance",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0337",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "ruin",
    "keywordsChinese": "v.毁灭",
    "words": [
      {
        "text": "ruin",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "destroy",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0338",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "dream"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "scenic",
    "keywordsChinese": "adj.风景优美的",
    "words": [
      {
        "text": "scenic",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "beautiful",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0339",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "shade",
    "keywordsChinese": "n.遮阳;阴影",
    "words": [
      {
        "text": "shade",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "shelter",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0340",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "skepticism",
    "keywordsChinese": "n.怀疑",
    "words": [
      {
        "text": "skepticism",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "doubt",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0341",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "soar",
    "keywordsChinese": "v.激增",
    "words": [
      {
        "text": "soar",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "increase",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0342",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "solely",
    "keywordsChinese": "adv.唯一地",
    "words": [
      {
        "text": "solely",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "alone",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0343",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "solicitor",
    "keywordsChinese": "n.律师",
    "words": [
      {
        "text": "solicitor",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "lawyer",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0344",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "steer",
    "keywordsChinese": "v.控制,引导",
    "words": [
      {
        "text": "steer",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "manage",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0345",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "stimulate",
    "keywordsChinese": "v.刺激,激励",
    "words": [
      {
        "text": "stimulate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "motivate",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0346",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "journey",
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "stride",
    "keywordsChinese": "n.进展",
    "words": [
      {
        "text": "stride",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "progressi",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0347",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "succumb",
    "keywordsChinese": "v.屈服",
    "words": [
      {
        "text": "succumb",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "yield",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0348",
    "category": "contextual_synonym",
    "difficulty": 3,
    "semanticClarity": 4,
    "atmosphere": [
      "memory",
      "dream"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "subdivide",
    "keywordsChinese": "v.把.…..细分",
    "words": [
      {
        "text": "subdivide",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "break down",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      }
    ]
  },
  {
    "id": "sg_0349",
    "category": "contextual_synonym",
    "difficulty": 2,
    "semanticClarity": 4,
    "atmosphere": [
      "quiet"
    ],
    "resurfacingWeight": 4,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "subtle",
    "keywordsChinese": "adj.微妙的",
    "words": [
      {
        "text": "subtle",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "delicate",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0350",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "substance",
    "keywordsChinese": "n.物质;实质",
    "words": [
      {
        "text": "substance",
        "wordDifficulty": 2,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "matter",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0351",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "sufficiency",
    "keywordsChinese": "n.足量,充足",
    "words": [
      {
        "text": "sufficiency",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "enough",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0352",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "supersede",
    "keywordsChinese": "v.取代,代替",
    "words": [
      {
        "text": "supersede",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "replace",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0353",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "memory"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "suppress",
    "keywordsChinese": "v.抑制,隐瞒",
    "words": [
      {
        "text": "suppress",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "hold",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0354",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "supremacy",
    "keywordsChinese": "n.至高无上,很高的地位",
    "words": [
      {
        "text": "supremacy",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "priority",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0355",
    "category": "academic_expression",
    "difficulty": 4,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "suspicious",
    "keywordsChinese": "adj.可疑的",
    "words": [
      {
        "text": "suspicious",
        "wordDifficulty": 4,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "odd",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0356",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "sustainable",
    "keywordsChinese": "adj.可持续的",
    "words": [
      {
        "text": "sustainable",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "long-term",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0357",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "symptom",
    "keywordsChinese": "n.症状,征兆",
    "words": [
      {
        "text": "symptom",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "sign",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0358",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "tension",
    "keywordsChinese": "n.紧张,不安",
    "words": [
      {
        "text": "tension",
        "wordDifficulty": 3,
        "frequency": 5,
        "visualWeight": 5
      },
      {
        "text": "upset",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0359",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "term",
    "keywordsChinese": "n.术语",
    "words": [
      {
        "text": "term",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "word",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0360",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "throughout",
    "keywordsChinese": "adv.自始至终,到处;全部",
    "words": [
      {
        "text": "throughout",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "anywhere",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0361",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "toll",
    "keywordsChinese": "n.通行费 v.征收",
    "words": [
      {
        "text": "toll",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "charge",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0362",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "trace",
    "keywordsChinese": "n.追溯;痕迹",
    "words": [
      {
        "text": "trace",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "track",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0363",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "storm",
      "light"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "transcend",
    "keywordsChinese": "v.胜过,超越",
    "words": [
      {
        "text": "transcend",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "excel",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0364",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "transit",
    "keywordsChinese": "n.运输;经过v.运送",
    "words": [
      {
        "text": "transit",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "send",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0365",
    "category": "theme_cluster",
    "difficulty": 3,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "tremendous",
    "keywordsChinese": "adj.巨大的,惊人的",
    "words": [
      {
        "text": "tremendous",
        "wordDifficulty": 4,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "vast",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0366",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "hope"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "trigger",
    "keywordsChinese": "v.触发,引发,引起",
    "words": [
      {
        "text": "trigger",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "begin",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0367",
    "category": "academic_expression",
    "difficulty": 3,
    "semanticClarity": 3,
    "atmosphere": [
      "warm"
    ],
    "resurfacingWeight": 5,
    "recommendedChainRange": [
      2,
      2
    ],
    "keyword": "tropical",
    "keywordsChinese": "adj.热带的",
    "words": [
      {
        "text": "tropical",
        "wordDifficulty": 3,
        "frequency": 4,
        "visualWeight": 5
      },
      {
        "text": "hot",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0368",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "unbiased",
    "keywordsChinese": "adj.公正的,无偏见的",
    "words": [
      {
        "text": "unbiased",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fair",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0369",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "uniform",
    "keywordsChinese": "adj.始终如一的",
    "words": [
      {
        "text": "uniform",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "consistent",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0370",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "valuable",
    "keywordsChinese": "adj.宝贵的,有价值的",
    "words": [
      {
        "text": "valuable",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "benefit",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0371",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "versatile",
    "keywordsChinese": "adj.多功能",
    "words": [
      {
        "text": "versatile",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "all-around",
        "wordDifficulty": 3,
        "frequency": 2,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0372",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "view",
    "keywordsChinese": "v.看",
    "words": [
      {
        "text": "view",
        "wordDifficulty": 1,
        "frequency": 5,
        "visualWeight": 4
      },
      {
        "text": "overlook",
        "wordDifficulty": 2,
        "frequency": 3,
        "visualWeight": 4
      }
    ]
  },
  {
    "id": "sg_0373",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "storm"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "violent",
    "keywordsChinese": "adj.暴力的;猛烈的",
    "words": [
      {
        "text": "violent",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "fierce",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0374",
    "category": "pure_synonym",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "visible",
    "keywordsChinese": "adj.明显的,看得见的",
    "words": [
      {
        "text": "visible",
        "wordDifficulty": 2,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "see",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0375",
    "category": "pure_synonym",
    "difficulty": 1,
    "semanticClarity": 5,
    "atmosphere": [
      "calm",
      "light"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      2,
      3
    ],
    "keyword": "visual",
    "keywordsChinese": "ad.视觉的",
    "words": [
      {
        "text": "visual",
        "wordDifficulty": 1,
        "frequency": 4,
        "visualWeight": 4
      },
      {
        "text": "image",
        "wordDifficulty": 1,
        "frequency": 3,
        "visualWeight": 3
      }
    ]
  },
  {
    "id": "sg_0376",
    "category": "theme_cluster",
    "difficulty": 2,
    "semanticClarity": 5,
    "atmosphere": [
      "water",
      "journey"
    ],
    "resurfacingWeight": 2,
    "recommendedChainRange": [
      3,
      3
    ],
    "keyword": "well-being",
    "keywordsChinese": "n.健康,康乐",
    "words": [
      {
        "text": "well-being",
        "wordDifficulty": 3,
        "frequency": 3,
        "visualWeight": 4
      },
      {
        "text": "health",
        "wordDifficulty": 1,
        "frequency": 2,
        "visualWeight": 3
      }
    ]
  }
];

// ── Atmosphere visual bindings (for reference) ──
export const ATMOSPHERE_VISUAL: Record<AtmosphereTag, {
  orbColor: string
  particleColor: string
  glowIntensity: number
  fogDensity: number
  soundAmbience: string
}> = {
  warm:   { orbColor: "#FFB347", particleColor: "#FFD89B", glowIntensity: 0.8, fogDensity: 0.1, soundAmbience: "warm_hum" },
  calm:   { orbColor: "#7EC8E3", particleColor: "#B3E0F2", glowIntensity: 0.4, fogDensity: 0.2, soundAmbience: "gentle_waves" },
  storm:  { orbColor: "#6C5CE7", particleColor: "#A29BFE", glowIntensity: 1.0, fogDensity: 0.6, soundAmbience: "distant_thunder" },
  water:  { orbColor: "#0984E3", particleColor: "#74B9FF", glowIntensity: 0.6, fogDensity: 0.3, soundAmbience: "flowing_stream" },
  light:  { orbColor: "#FFEAA7", particleColor: "#FFF3CD", glowIntensity: 1.0, fogDensity: 0.0, soundAmbience: "soft_chime" },
  dream:  { orbColor: "#DDA0DD", particleColor: "#E8D5E8", glowIntensity: 0.7, fogDensity: 0.5, soundAmbience: "ethereal_drift" },
  memory: { orbColor: "#C8A96E", particleColor: "#E0D0A8", glowIntensity: 0.5, fogDensity: 0.4, soundAmbience: "faded_echo" },
  danger: { orbColor: "#E74C3C", particleColor: "#F1948A", glowIntensity: 0.9, fogDensity: 0.5, soundAmbience: "low_pulse" },
  journey:{ orbColor: "#2ECC71", particleColor: "#82E0AA", glowIntensity: 0.7, fogDensity: 0.2, soundAmbience: "wind_passage" },
  home:   { orbColor: "#F39C12", particleColor: "#F9E79F", glowIntensity: 0.6, fogDensity: 0.1, soundAmbience: "hearth_crackle" },
  quiet:  { orbColor: "#95A5A6", particleColor: "#CCD1D1", glowIntensity: 0.3, fogDensity: 0.8, soundAmbience: "soft_breath" },
  hope:   { orbColor: "#F1C40F", particleColor: "#FDEBD0", glowIntensity: 0.9, fogDensity: 0.0, soundAmbience: "rising_light" },
};

// ── Stats ──
// 376 groups across 5 categories
// Atmosphere tags: {'light': 207, 'calm': 175, 'journey': 57, 'water': 54, 'memory': 44, 'storm': 40, 'dream': 38, 'hope': 14, 'quiet': 11, 'warm': 10, 'danger': 10, 'home': 9}
// Chain ranges: {'(2, 3)': 213, '(2, 2)': 56, '(3, 3)': 55, '(2, 4)': 35, '(3, 4)': 9, '(3, 5)': 6, '(2, 5)': 1, '(2, 6)': 1}
// Resurfacing weights: {'weight_2': 275, 'weight_4': 35, 'weight_5': 55, 'weight_3': 11}
// Avg word difficulty: 2.0
// Avg visual weight: 3.7