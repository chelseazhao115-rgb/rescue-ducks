# Rescue Duck — Session Summary (2026-05-22)

## Current Project State at a Glance

**Phase**: MVP Complete -> Polish Iteration -> **HomeScreen Visual Polish Checkpoint**
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
1. **Home**: Title + Scene + "Start Journey" + "Level Map" -> LevelMap
2. **LevelMap**: 4 stage tabs, level cards with lock/unlock, progress bar
3. **Game**: Storm meter + Score + Timer + Word Orb Field + Duck Parade + Chelsea NPC + Combo Indicator
4. **Pause Overlay**: Resume / Restart / Quit to Menu
5. **Victory Overlay**: Stats + Next Level / Replay / Menu
6. **Game Over Overlay**: Stats + Try Again / Menu
7. **Intro Sequence**: Cinematic opening

---

## Session Changes (2026-05-22)

### Major Home Screen Visual Overhaul

#### 1. Background Replacement
- **Deleted**: Procedural purple/blue gradient sky + SVG lake surface
- **Added**: Full-bleed `homescreen-back.png` as background layer in `AnimatedBackground`
- Result: Home Screen now has a cohesive, illustrated atmospheric background

#### 2. Duck Character Replacement
- **Deleted**: Procedural/SVG duck graphics
- **Added**: `duck_2d_pure.png` (360x360px) with floating animation
- Positioned at `bottom-[10%] left-[38%]` facing right toward lighthouse
- Animation: gentle bob (y: [0, -3, 0], 3.5s cycle) + breathing glow + shadow

#### 3. Cottage & Lighthouse Replacement
- **Deleted**: Procedural SVG lighthouse (complex trapezoid + stripes + glow)
- **Added**: `home.png` (1120x1120px) containing cottage, lighthouse, rocks, trees, forest
- Positioned at `right-0 bottom-[8%]`
- Scene container has gentle idle breathing animation (scale 1 -> 1.003)

#### 4. Home Screen Layout Redesign
- **UI Panel moved to LEFT side**: `left-[6%] top-[16%]`
- Title: "Rescue Duck" with large cute font, gold glow, animated star (✨)
- Subtitle: "Light the way home."
- Buttons vertically stacked and **left-aligned** with matching width
- Bottom icons aligned to `left-[6%]` to match panel

#### 5. Firefly Particles
- Increased to **45 particles**
- Concentrated in middle-lower area (not full screen)
- 35% at bottom 20-35%, 65% at bottom 35-70%
- Gentle drift animation with warm colors

#### 6. Transition Animation
- Clicking "Start Journey" triggers zoom transition
- Scene scales to 1.06 and shifts toward lighthouse
- Warm golden light overlay fades in from lighthouse direction
- Central bright spot at `left: 78%, top: 12%` (lighthouse position)
- Router navigation delayed by 1500ms for animation

#### 7. Game Screen Background
- **Added**: `stage-1-background.png` as game background
- **Removed**: `<Lighthouse />` component from GameScreen (redundant with background image)
- `AnimatedBackground` now uses image for both home and game variants

#### 8. Level Map Button Color
- Changed from `#5a4a28` (dark brown) to `#ffffff` (white)
- Better contrast against glassmorphism button

---

## Current Biggest Gaps (What Feels Rough)

### P0 — Atmosphere
- **No gameplay ambience** — silence during actual play (ambience only runs in intro/home)
- Storm audio doesn't respond to gameplay storm level
- Lighthouse glow change per group is mathematically correct but visually subtle

### P0 — Orb Feel
- Orbs float identically — no variety
- No proximity glow (orbs near each other don't interact)
- Selection feedback is just a scale bump — lacks "snap" feel
- Group completion is a pop-and-gone — no lingering celebration

### P1 — Visual Depth
- Single flat background layer (no parallax)
- No foreground elements (shore grass, rocks, dock)
- Fog doesn't vary with storm

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
- `LighthouseBackground.tsx` in home/ may be unused (replaced by `AnimatedBackground`)

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

### Recommended: Home Screen Polish Continuation
1. Consider refining firefly distribution (some users may want even more)
2. Add subtle parallax to scene elements on mouse move
3. Add more ambient particles (dust motes, sparkles near lighthouse)

### Alternative: Gameplay Atmosphere
1. Add gameplay ambience (extend ambientSound.ts to run during gameplay)
2. Tie storm audio intensity to stormMeter value
3. Make lighthouse glow change more dramatic (bigger beam, wider halo)
4. Add orb idle animation variety

### Alternative: Game Screen Polish
1. Stage background currently only has one image — consider per-stage variations
2. Add transition animation from Game -> Home
3. Polish victory/gameover overlay animations

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
├── public/
│   ├── homescreen-back.png    <- Home Screen atmospheric background
│   ├── home.png               <- Cottage + lighthouse illustration
│   ├── duck_2d_pure.png       <- Duck character (360px)
│   ├── stage-1-background.png <- Game background (Stage 1)
│   └── duck.webp              <- Unused alternative duck asset
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
│   │   │   ├── HomeScreen.tsx       <- Main home (left panel + scene)
│   │   │   ├── LevelMap.tsx         <- 28-level grid selector
│   │   │   ├── DuckCharacter.tsx    <- Floating duck image
│   │   │   ├── CottageAndLighthouse.tsx <- home.png wrapper
│   │   │   ├── FireflyParticles.tsx <- 45 ambient particles
│   │   │   ├── LakeSurface.tsx      <- Water shimmer overlay
│   │   │   ├── Toast.tsx            <- Toast notification system
│   │   │   ├── LighthouseBackground.tsx <- (likely unused)
│   │   │   └── StartButton.tsx      <- (dead code)
│   │   ├── game/
│   │   │   ├── GameScreen.tsx       <- Main game container
│   │   │   ├── IntroSequence.tsx    <- Cinematic intro
│   │   │   ├── WordOrbField.tsx     <- Orb container
│   │   │   ├── WordOrb.tsx          <- Individual orb (circular)
│   │   │   ├── ChainLink.tsx        <- SVG chain connectors
│   │   │   ├── LightEnergy.tsx      <- Energy particles
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
│   │       ├── AnimatedBackground.tsx <- Background images + rain/fog/particles
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
