# Rescue Duck

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
- Complete a group -> light energy flies to lighthouse -> a duck moves toward home
- Wrong matches break the chain and intensify the storm
- The storm meter fills over time — let it reach 100% and the lighthouse is lost
- Light all groups to fully relight the lighthouse -> victory with star rating

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

## Current State (May 22, 2026)

**Phase**: MVP complete -> Polish iteration -> **HomeScreen polish checkpoint**

Major visual overhaul completed on Home Screen:

### Completed
- Core gameplay loop with semantic matching and chain system
- Storm meter with progressive difficulty
- Lighthouse brightness progression (right-side, guides ducks home)
- Duck rescue parade (waiting left -> rescued right toward lighthouse)
- Combo system with multiplier
- 28 progressive levels from IELTS paraphrasing vocabulary
- Level select map
- Victory / Game Over / Pause overlays with star ratings
- Cinematic intro sequence
- Ambient sound system (procedural)
- Chinese translation hints on tap
- Chelsea NPC with contextual tips
- Mobile-first responsive design
- Full UI redesign based on reference images (dreamy lighthouse aesthetic)
- **Level timer rebalancing**: Stage 1 (50s), Stage 2 (65s), Stage 3 (75s), Stage 4 (90s)
- **Fixed critical timer display bug** (rAF timestamp vs Date.now() mismatch)
- **Home Screen layout**: Title -> Lighthouse -> Buttons (vertical stack)

### Home Screen Current Layout (Post-Polish)
- **Left panel (6% from left, 16% from top)**: 
  - "Rescue Duck" title — large cute font, gold glow, animated star icon
  - Subtitle: "Light the way home."
  - "Start Journey" primary button (gold gradient pill)
  - "Level Map" secondary button (glass style, white text)
- **Right scene**: Cottage + lighthouse illustration (home.png) positioned at right-bottom
- **Center-bottom**: Duck character (duck_2d_pure.png, 360px) floating on water
- **Atmosphere**: 45 firefly particles concentrated in middle-lower area
- **Background**: Full-screen `homescreen-back.png` image (replaced purple gradient)
- **Bottom-left**: Settings icon, leaderboard icon, version text (v1.0.0)
- **Transition**: Clicking "Start Journey" triggers lighthouse-zoom transition with warm golden light overlay

### Gameplay Visual Style
- **Home Screen Background**: Full-bleed atmospheric PNG with lake, island, lighthouse, cottage
- **Game Background**: `stage-1-background.png` (removed procedural lighthouse SVG)
- Soft twilight gradient sky (#6a7a9f to #1a2238)
- Warm horizon glow (gold radial)
- Circular watercolor-style word orbs with glow states
- Multi-layer SVG chain links with energy flow
- Glassmorphism overlays (victory, pause, game over)
- Lighthouse removed from code (now part of background image)

---

## Development Direction

**Current priority**: Home Screen polish -> Atmosphere -> Game feel. NOT more features.

### DO
- Polish Home Screen visual quality and animations
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
# -> http://localhost:3000 (home) -> /game (gameplay)
```

To reset intro: `localStorage.removeItem("rescueDuckIntroSeenV2")`
To reset level progress: `localStorage.removeItem("rescueDuckLevel")`

---

## Reference

Visual inspiration: Journey, Sky, Gris, Monument Valley, Alto's Adventure

Atmosphere keywords: glowing, magical, cozy, soft, stormy, floating, emotional, cinematic
