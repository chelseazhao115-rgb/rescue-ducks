# Rescue Duck 🦆✨

**"Language magic + Lighthouse + Ducks coming home"**

An atmospheric indie-style synonym matching game built with Next.js, where players match IELTS paraphrasing words to generate glowing light energy, relight a lighthouse, and guide ducklings home through a storm.

---

## World

Night is falling. A storm is approaching. The ducklings haven't come home.

The lighthouse has gone dark.

You are not "saving ducks from death." You are **lighting the way home** through the ancient magic of language — connecting words that share meaning creates light energy. Each synonym chain you complete sends a pulse of warmth to the lighthouse and brings one duck closer to safety.

Chelsea, your gentle guide, watches from the shore.

---

## Core Gameplay

- Floating glowing word orbs appear on screen (4 synonym groups at once)
- Tap words from the **same semantic group** to chain them
- Complete a group → light energy flies to lighthouse → a duck moves toward home
- Wrong matches break the chain and intensify the storm
- The storm meter fills over time — let it reach 100% and the lighthouse is lost
- Light all groups to fully relight the lighthouse → victory with star rating

**Key mechanic**: Semantic groups, not fixed 1v1 pairs. Tap any words that share meaning in sequence.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | TailwindCSS 4 |
| Animation | Framer Motion 12 |
| State | Zustand 5 + Immer |
| Sound | Web Audio API (procedural, no files) |
| Deployment | Fully client-side, no backend |

---

## Current State (May 2026)

**Phase**: MVP complete → Polish iteration

✅ Core gameplay loop
✅ Semantic matching with chain system
✅ Storm meter with progressive difficulty
✅ Lighthouse brightness progression
✅ Duck rescue parade
✅ Combo system with multiplier
✅ 28 progressive levels from IELTS paraphrasing vocabulary
✅ Level select map
✅ Victory / Game Over screens with star ratings
✅ Cinematic intro sequence (v2)
✅ Ambient sound system (procedural)
✅ Chinese translation hints on tap
✅ Chelsea NPC with contextual tips
✅ Mobile-first responsive design
✅ Sound effects for all game actions

---

## Development Direction

**Current priority**: Atmosphere, presentation, game feel — NOT more features.

### DO
- Polish intro cinematic quality
- Enhance visual layering and lighting
- Improve sound design and ambience
- Add particle effects and micro-animations
- Strengthen lighthouse feedback
- Make orbs feel alive

### DON'T
- Login systems, leaderboards, multiplayer
- AI chat, teacher dashboards
- Listening/writing modes
- RPG systems, long dialogue
- Traditional "ed-tech" blue-white UI

---

## Running the Project

```bash
npm install
npm run dev
# → http://localhost:3000 (home) → /game (gameplay)
```

To reset intro: `localStorage.removeItem("rescueDuckIntroSeenV2")`
To reset level progress: `localStorage.removeItem("rescueDuckLevel")`

---

## Reference

Visual inspiration: Journey, Sky, Gris, Monument Valley, Alto's Adventure

Atmosphere keywords: glowing, magical, cozy, soft, stormy, floating, emotional, cinematic
