import type { ChelseaContext } from "@/lib/types";

export const CHELSEA_TIPS: Record<ChelseaContext, string[]> = {
  game_start: [
    "The storm is coming! Match the words to light the lighthouse!",
    "Quick! Tap words that mean the same thing to create a chain!",
    "Find the synonyms before the storm fills up!",
  ],
  chain_started: [
    "Nice start! Find more words from the same group.",
    "You've got a chain going! Keep tapping matching words.",
  ],
  chain_growing: [
    "The chain is getting longer!",
    "Great job! Keep going!",
    "You're on fire!",
  ],
  chain_broken: [
    "Oops! Those words don't match. Try again!",
    "Careful! Start a new chain.",
    "That broke the chain. Watch the storm!",
  ],
  group_complete: [
    "Group complete! A duck is saved!",
    "Well done! The lighthouse glows brighter!",
    "Perfect chain! The storm backs away.",
  ],
  storm_high: [
    "The storm is getting stronger! Hurry!",
    "The lighthouse is fading! Match faster!",
    "Storm's almost here! Light the lighthouse!",
  ],
  storm_low: [
    "The storm is calming down. Nice work!",
    "You're pushing the storm back!",
  ],
  combo_milestone: [
    "Amazing combo streak!",
    "You're unstoppable!",
    "Incredible chaining!",
  ],
  victory: [
    "You did it! The lighthouse is lit!",
    "The storm is gone. Thank you!",
    "All the ducks are safe! Well played!",
  ],
  gameover: [
    "The storm took the lighthouse... Try again?",
    "So close! Give it another shot!",
    "Don't give up! The ducks need you!",
  ],
  idle: [
    "Tap matching words to create a chain.",
    "Words that mean similar things belong together.",
  ],
};
