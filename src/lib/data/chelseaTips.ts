import type { ChelseaContext } from "@/lib/types";

export const CHELSEA_TIPS: Record<ChelseaContext, string[]> = {
  game_start: [
    "The ducklings are still outside. Help guide them home.",
    "Connect words that belong to the same meaning pattern.",
    "The lighthouse will grow brighter with each correct match.",
    "Let's calm the storm together.",
  ],

  level_start: [
    "Find the words that belong together.",
    "Some groups share meaning; others share function or context.",
    "Watch carefully — some connections are subtle.",
    "This stage introduces new paraphrasing patterns.",
  ],

  idle: [
    "Some words are closer in meaning than others.",
    "Try looking for paraphrasing pairs.",
    "Think about how these words are used in IELTS.",
    "Some connections are more academic.",
  ],

  correct_match: [
    "Nice! Those words belong together.",
    "Good catch — that's a useful IELTS connection.",
    "Great connection!",
    "The lighthouse is getting brighter.",
    "The storm is calming down.",
  ],

  chain_combo: [
    "Amazing chain!",
    "You're connecting meanings quickly.",
    "The light can reach farther now.",
    "Excellent paraphrasing sense!",
    "Beautiful chain!",
  ],

  wrong_match: [
    "Not quite — that connection works differently.",
    "Close, but those words play different roles here.",
    "That pair doesn't fully match.",
    "Try another semantic connection.",
    "The storm is getting stronger...",
  ],

  storm_warning: [
    "Hurry — the storm is growing stronger.",
    "The waves are getting rough.",
    "We're running out of time.",
    "The lighthouse light is fading.",
    "Keep going — the ducklings still need help.",
  ],

  academic_groups: [
    "These are more academic expressions.",
    "This paraphrasing style often appears in IELTS Reading.",
    "These words are harder to distinguish.",
    "Careful — the meanings are similar but not identical.",
  ],

  logic_groups: [
    "These words connect ideas and arguments.",
    "Look for logical relationships.",
    "This group focuses on transitions and structure.",
    "These expressions help organize meaning.",
  ],

  victory: [
    "You helped the ducklings find their way home.",
    "The sea is calm again.",
    "The lighthouse is shining brightly now.",
    "Wonderful work.",
    "You've mastered this group.",
  ],

  gameover: [
    "The storm became too strong...",
    "The ducklings are still waiting...",
    "We can still try again.",
    "Don't give up — the lighthouse still shines.",
    "Let's guide them home next time.",
  ],

  long_play: [
    "You've learned many new paraphrasing groups today.",
    "Your semantic intuition is getting stronger.",
    "You're beginning to recognize patterns naturally.",
    "The lighthouse keeps growing brighter.",
  ],

  hard_mode: [
    "These groups are more advanced.",
    "Some meanings may feel less direct.",
    "Take your time and think carefully.",
    "You're entering deeper semantic waters.",
  ],
};
