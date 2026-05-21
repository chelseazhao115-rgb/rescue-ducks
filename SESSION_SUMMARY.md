# Rescue Duck — Session Summary (2026-05-21)

## Current Project State at a Glance

**Phase**: MVP Complete -> Polish Iteration -> **Pre-HomeScreen-polish Checkpoint**
**Build**: Passing (Next.js 16, TypeScript strict, zero errors)
**Dev server**: `npm run dev` -> http://localhost:3000 (home) + /game (gameplay)
**28 levels** playable, level select map on home screen

---

## What's Built (Complete)

### Core Game Loop
- Floating word orbs spawn in **4-group batches** (mixed together for difficulty)
- Player taps same-group synonyms -> chain extends -> combo multiplier
- Complete all words in a group -> energy particles fly to lighthouse -> lighthouse brightens -> duck rescued
- Wrong match -> chain breaks -> storm penalty
- Storm meter fills over time -> 100% = game over
- All groups completed -> lighthouse at 100% -> victory with star rating

### Spawning System
- **Start**: 4 groups at once (all words from each group appear together)
- **Mid-game**: 2 new groups spawn every 2 group completions
- Same-group words are **anti-proximity** (assigned different grid columns)
- Uses 5-column x 3-row grid with 14% minimum distance

### Level System (Rebalanced 2026-05-21)
- 28 levels from `paraphrasing excel.xlsx` data
- 4 stages with increasing difficulty:
  - Stage 1 (L1-7): 2-word pairs, 5-6 groups, **50s timer**
  - Stage 2 (L8-14): 2-word pairs, 6 groups, **65s timer**
  - Stage 3 (L15-21): 3-word chains, 6 groups, **75s timer**
  - Stage 4 (L22-28): 3-4 word chains, 6-7 groups, **90s timer**
- Lighthouse math: `10 initial + N groups x (90/N) gain = 100` exactly on last group
- Level progress saved to localStorage (`rescueDuckLevel`)

### UI Screens
1. **Home**: Title + Lighthouse illustration + "START JOURNEY" + "LOAD MAP" -> LevelMap
2. **LevelMap**: 4 stage tabs, level cards with lock/unlock, progress bar
3. **Game**: Storm meter + Score + Timer + Word Orb Field + Lighthouse (right) + Duck Parade + Chelsea NPC + Combo Indicator
4. **Pause Overlay**: Resume / Restart / Quit to Menu
5. **Victory Overlay**: Stats + Next Level / Replay / Menu
6. **Game Over Overlay**: Stats + Try Again / Menu
7. **Intro Sequence**: Cinematic opening

### Home Screen Layout (Current — Post-UI-Redesign)
Vertical stack (top to bottom):
1. **"Rescue Duck"** title — gold glow text shadow
2. **Lighthouse illustration** — warm glow halo, light beam, sparkles, trapezoid tower with red stripes
3. **"START JOURNEY"** — gold gradient pill button
4. **"LOAD MAP"** — glassmorphism secondary button
5. **Bottom bar** — settings icon, trophy icon, version text

Background: Water surface with gold reflection, island silhouette, floating duck silhouettes

### Gameplay Visual Style (Post-UI-Redesign)
- **Sky**: Soft twilight gradient (#6a7a9f -> #5b6d99 -> #46577e -> #2e3b5f -> #1a2238)
- **Warm horizon glow**: Gold radial gradient with blur animation
- **Word orbs**: Circular 72px watercolor style with per-state colors/borders/glows
- **Chain links**: Multi-layer SVG (outer glow 8px + main line 3px + core line 1px)
- **Overlays**: Glassmorphism cards with backdrop-filter blur
- **Lighthouse**: Right side at bottom-[22%], glows and sparkles react to progress
- **Duck parade**: Waiting ducks left -> rescued ducks right (toward lighthouse)

### Intro Sequence
- Plays once (localStorage `rescueDuckIntroSeenV2`). Skip available.

### Sound System
- **Ambient**: Procedural Web Audio (no files) — water, wind, rain, thunder, magical hum
- **SFX**: Correct tap (ascending chime), chain (rising pitch), wrong (buzz), group complete (chord), victory (melody)
- Ambience auto-switches per intro scene
- **No gameplay ambience yet** (only intro has ambient sound)

---

## Recent Changes (2026-05-21 Session)

### UI Redesign (Based on 8 Reference PNGs)
- Complete color palette overhaul — warm gold + lavender twilight
- Circular watercolor-style word orbs replacing pill shapes
- Glassmorphism overlay screens
- Multi-layer SVG chain links with energy flow dots
- Lighthouse moved to right side as "home" destination
- Duck parade direction reversed: left (waiting) -> right (rescued toward lighthouse)
- Score display, storm meter, combo indicator all restyled

### Bug Fixes
- **Fixed critical countdown display bug** (`GameEngine.ts`): `lastTickTime` was set to `Date.now()` but `requestAnimationFrame` uses `performance.now()` timestamp, causing delta to be a huge negative number and `remainingMs` to display as millions of minutes. Fixed by setting `lastTickTime = 0` and letting the first rAF callback initialize it.

### Level Rebalancing
- All 28 level timers standardized by stage:
  - Stage 1 (1-7): 50,000ms
  - Stage 2 (8-14): 65,000ms
  - Stage 3 (15-21): 75,000ms
  - Stage 4 (22-28): 90,000ms

### Home Screen Layout Fix
- Removed "LIGHT THE STORM" subtitle (overlapped with lighthouse)
- Extracted lighthouse from background into content flow
- New vertical order: Title -> Lighthouse -> Buttons

---

## Current Biggest Gaps (What Feels Rough)

### P0 — Home Screen Polish (Next Phase)
- Lighthouse illustration is static SVG, could use more life
- Button hover/press feedback could be more satisfying
- Transition from Home -> Game could be smoother
- Background could use more depth (parallax, more particles)

### P0 — Atmosphere
- **No gameplay ambience** — silence during actual play (ambience only runs in intro)
- Storm audio doesn't respond to gameplay storm level
- Lighthouse glow change per group is mathematically correct but visually subtle
- Light beam doesn't extend visibly as brightness increases

### P0 — Orb Feel
- Orbs float identically — no variety
- No proximity glow (orbs near each other don't interact)
- Selection feedback is just a scale bump — lacks "snap" feel
- Group completion is a pop-and-gone — no lingering celebration

### P1 — Visual Depth
- Single flat background layer (no parallax)
- No foreground elements (shore grass, rocks, dock)
- Fog doesn't vary with storm
- No moon or visible sky elements

### P1 — Duck Presence
- Ducks are tiny (8x6px body) and easy to miss
- No movement animation when rescued
- No celebration on rescue
- Not visible during gameplay unless you look at the bottom bar

### P2 — Known Technical Issues
- `INITIAL_ORB_COUNT` constant unused (hardcoded 6 in engine)
- `ORB_SPAWN_INTERVAL_MS` constant unused (hardcoded 2500)
- `StartButton.tsx` component is dead code (HomeScreen buttons are now inline)
- `useWordSpawning.ts` and `useGameLoop.ts` are placeholder files
- `GameSummary` type defined but not actively used

---

## Critical Design Rules (DO NOT BREAK)

1. **This is an indie game, not an ed-tech product**
2. **No blue/white UI ever**
3. **No explicit instruction text** — Chelsea hints, don't tutorialize
4. **No arcade sounds** — ambient, organic, gentle
5. **No feature creep** — polish what exists before adding anything new
6. **Keep the magic metaphor** — "language = light" throughout
7. **Chelsea is companion, not teacher**

---

## Next Session Starting Points

### Recommended: Home Screen Polish
1. Add subtle animations to the Home Screen lighthouse (floating, pulsing)
2. Improve button micro-interactions (ripple, glow on hover)
3. Add transition animation from Home -> Game (fade, slide, lighthouse zoom)
4. Enhance background with more atmospheric particles

### Alternative: Gameplay Atmosphere
1. Add gameplay ambience (extend ambientSound.ts to run during gameplay)
2. Tie storm audio intensity to stormMeter value
3. Make lighthouse glow change more dramatic (bigger beam, wider halo)
4. Add orb idle animation variety

---

## File Index (for quick navigation)

```
Saveducks/
├── README.md                  <- Project overview
├── PROJECT_VISION.md          <- Soul & direction
├── MVP_SCOPE.md               <- What's in/out
├── TODO_ROADMAP.md            <- P0/P1/P2/V2/V3
├── DESIGN_DIRECTION.md        <- Visual/sound/animation specs
├── SESSION_SUMMARY.md         <- THIS FILE
├── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx         <- Root layout
│   │   ├── page.tsx           <- Home route
│   │   ├── globals.css        <- Tailwind v4 theme + animations
│   │   └── game/
│   │       ├── page.tsx       <- Game route
│   │       └── loading.tsx    <- Skeleton
│   ├── components/
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx       <- Main home with level select
│   │   │   ├── LevelMap.tsx         <- 28-level grid selector
│   │   │   ├── LighthouseBackground.tsx <- Water/island/ducks bg
│   │   │   └── StartButton.tsx      <- (dead code)
│   │   ├── game/
│   │   │   ├── GameScreen.tsx       <- Main game container
│   │   │   ├── IntroSequence.tsx    <- Cinematic intro
│   │   │   ├── WordOrbField.tsx     <- Orb container
│   │   │   ├── WordOrb.tsx          <- Individual orb (circular)
│   │   │   ├── ChainLink.tsx        <- SVG chain connectors
│   │   │   ├── LightEnergy.tsx      <- Energy particles
│   │   │   ├── Lighthouse.tsx       <- Lighthouse glow (right side)
│   │   │   ├── DuckParade.tsx       <- Duck container
│   │   │   ├── Duck.tsx             <- Single duck
│   │   │   ├── ChelseaNPC.tsx       <- NPC with tips
│   │   │   ├── ComboIndicator.tsx   <- Combo + group progress
│   │   │   ├── StormMeter.tsx       <- Storm bar
│   │   │   ├── ScoreDisplay.tsx     <- Score + timer + level
│   │   │   ├── PauseButton.tsx
│   │   │   ├── PauseOverlay.tsx
│   │   │   ├── VictoryOverlay.tsx
│   │   │   ├── GameOverOverlay.tsx
│   │   │   └── StarRating.tsx
│   │   └── shared/
│   │       ├── AnimatedBackground.tsx <- Rain/fog/lightning layer
│   │       └── ProgressBar.tsx
│   ├── lib/
│   │   ├── engine/
│   │   │   ├── GameEngine.ts      <- Central coordinator (class)
│   │   │   ├── StateMachine.ts    <- Phase validation
│   │   │   ├── StormSystem.ts     <- Storm tick logic
│   │   │   ├── ComboSystem.ts     <- Combo timer + multiplier
│   │   │   ├── MatchingSystem.ts  <- Group completion detection
│   │   │   ├── ScoringSystem.ts   <- Score + star calculation
│   │   │   └── LevelManager.ts    <- Level loading + orb spawning
│   │   ├── data/
│   │   │   ├── wordGroups.ts      <- 28 groups from user's excel
│   │   │   ├── levels.ts          <- 28 level configs (rebalanced timers)
│   │   │   └── chelseaTips.ts     <- NPC dialogue strings
│   │   ├── hooks/
│   │   │   ├── useScreenSize.ts
│   │   │   ├── useGameLoop.ts     <- (placeholder)
│   │   │   └── useWordSpawning.ts <- (placeholder)
│   │   ├── types/
│   │   │   ├── game.ts            <- All game types
│   │   │   ├── words.ts           <- WordGroup type
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── random.ts
│   │       ├── array.ts
│   │       ├── timing.ts          <- formatTime, clamp, lerp
│   │       ├── sound.ts           <- Gameplay SFX
│   │       └── ambientSound.ts    <- Ambient soundscapes
│   ├── store/
│   │   └── gameStore.ts           <- Zustand + Immer store
│   └── constants/
│       ├── game.ts                <- Tuning values
│       ├── colors.ts
│       └── animation.ts           <- Framer Motion presets
```

---

## Quick Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build check
```

**Reset intro**: `localStorage.removeItem("rescueDuckIntroSeenV2")`
**Reset level progress**: `localStorage.removeItem("rescueDuckLevel")`
**Set level**: `localStorage.setItem("rescueDuckLevel", "15")`
