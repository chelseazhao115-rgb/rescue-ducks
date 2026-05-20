# Rescue Duck — Session Summary (2026-05-20)

## Current Project State at a Glance

**Phase**: MVP Complete → **Polish Iteration**  
**Build**: ✅ Passing (Next.js 16, TypeScript strict, zero errors)  
**Dev server**: `npm run dev` → http://localhost:3000 (home) + /game (gameplay)  
**28 levels** playable, level select map on home screen

---

## What's Built (Complete)

### Core Game Loop
- Floating word orbs spawn in **4-group batches** (mixed together for difficulty)
- Player taps same-group synonyms → chain extends → combo multiplier
- Complete all words in a group → energy particles fly to lighthouse → lighthouse brightens → duck rescued
- Wrong match → chain breaks → storm penalty
- Storm meter fills over time → 100% = game over
- All groups completed → lighthouse at 100% → victory with star rating

### Spawning System
- **Start**: 4 groups at once (all words from each group appear together)
- **Mid-game**: 2 new groups spawn every 2 group completions
- Same-group words are **anti-proximity** (assigned different grid columns)
- Uses 5-column × 3-row grid with 14% minimum distance

### Level System
- 28 levels from `paraphrasing excel.xlsx` data
- 4 stages with increasing difficulty:
  - Stage 1 (L1-7): 2-word pairs, 5-6 groups, easy vocab
  - Stage 2 (L8-14): 2-word pairs, 6 groups
  - Stage 3 (L15-21): 3-word chains, 6 groups
  - Stage 4 (L22-28): 3-4 word chains, 6-7 groups
- Lighthouse math: `10 initial + N groups × (90/N) gain = 100` exactly on last group
- Level progress saved to localStorage (`rescueDuckLevel`)

### UI Screens
1. **Home**: Title + "Light the Lighthouse" CTA + "Select Level" → LevelMap
2. **LevelMap**: 4 stage tabs, level cards with lock/unlock, progress bar
3. **Game**: Storm meter + Score + Timer + Word Orb Field + Lighthouse + Duck Parade + Chelsea NPC + Combo Indicator
4. **Pause Overlay**: Resume / Quit to Menu
5. **Victory Overlay**: Stars + Stats + Next Level / Replay / Menu
6. **Game Over Overlay**: Stars + Stats + Try Again / Menu
7. **Intro Sequence** (v2): 5-scene cinematic opening

### Intro Sequence (v2 — Current)
Scene flow (~12s total):
1. **Calm Night** (3.2s): Stars, cabin light, lighthouse glow, ducks on shore, "A calm night by the lake"
2. **Storm** (2.8s): Clouds descend, lighthouse flickers out, ducks scatter, wind streaks, rain, lightning, "the wind is rising"
3. **Chelsea Warning** (2.4s): Text appears first → avatar fades in → "快点……小鸭子们还在外面。" 
4. **Hope** (2.8s): Magical orb with particles, glow expansion, Chelsea: "连接词义，点亮灯塔。"
5. **Fade to Game** (1.5s): Screen brightens, game UI emerges

Plays once (localStorage `rescueDuckIntroSeenV2`). Skip available.

### Sound System
- **Ambient**: Procedural Web Audio (no files) — water, wind, rain, thunder, magical hum
- **SFX**: Correct tap (ascending chime), chain (rising pitch), wrong (buzz), group complete (chord), victory (melody)
- Ambience auto-switches per intro scene
- **No gameplay ambience yet** (only intro has ambient sound)

### Visual Style
- Dark atmospheric: storm-dark (#0a0e17) base
- Warm light: lighthouse-glow (#f5d67b), light-gold (#f0a500)
- Cool orbs: orb-idle (#6eb5ff) → warm when selected
- Chelsea: chelsea (#a8d8ea) soft blue
- Framer Motion for all animations (spring physics, organic easing)

---

## Current Biggest Gaps (What Feels Rough)

### P0 — Intro Polish
- **Scene 1 and Scene 2 look too similar** — both are dark with subtle differences
- Missing clear "camera" feel (slow zoom, parallax, vignette changes)
- Ducks in intro are barely visible
- Emotional arc not distinct enough scene-to-scene
- Overall still feels like "animated slides" not "cinematic opening"

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
- Ducks are tiny (8×6px body) and easy to miss
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

### If continuing polish (recommended):
1. Add gameplay ambience (extend ambientSound.ts to run during gameplay)
2. Tie storm audio intensity to stormMeter value
3. Make lighthouse glow change more dramatic (bigger beam, wider halo)
4. Add orb idle animation variety
5. Add proximity glow between same-group orbs

### If fixing visual differentiation:
1. Make Scene 1 warmer (more cabin light, softer tones)
2. Make Scene 2 dramatically darker/colder (color temperature shift)
3. Add clear visual transition marker between scenes

### Quick wins (30 min or less):
- Increase duck size slightly for visibility
- Add subtle screen flash on group complete
- Make lighthouse beam angle wider at high brightness
- Add "duck rescued!" mini-animation in DuckParade

---

## File Index (for quick navigation)

```
Saveducks/
├── README.md                  ← Project overview
├── PROJECT_VISION.md          ← Soul & direction
├── MVP_SCOPE.md               ← What's in/out
├── TODO_ROADMAP.md            ← P0/P1/P2/V2/V3
├── DESIGN_DIRECTION.md        ← Visual/sound/animation specs
├── SESSION_SUMMARY.md         ← THIS FILE
├── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← Root layout
│   │   ├── page.tsx           ← Home route
│   │   ├── globals.css        ← Tailwind v4 theme + animations
│   │   └── game/
│   │       ├── page.tsx       ← Game route
│   │       └── loading.tsx    ← Skeleton
│   ├── components/
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx       ← Main home with level select
│   │   │   ├── LevelMap.tsx         ← 28-level grid selector
│   │   │   └── LighthouseBackground.tsx
│   │   ├── game/
│   │   │   ├── GameScreen.tsx       ← Main game container
│   │   │   ├── IntroSequence.tsx    ← Cinematic intro (v2)
│   │   │   ├── WordOrbField.tsx     ← Orb container
│   │   │   ├── WordOrb.tsx          ← Individual orb
│   │   │   ├── ChainLink.tsx        ← SVG chain connectors
│   │   │   ├── LightEnergy.tsx      ← Energy particles
│   │   │   ├── Lighthouse.tsx       ← Lighthouse glow
│   │   │   ├── DuckParade.tsx       ← Duck container
│   │   │   ├── Duck.tsx             ← Single duck
│   │   │   ├── ChelseaNPC.tsx       ← NPC with tips
│   │   │   ├── ComboIndicator.tsx   ← Combo + group progress
│   │   │   ├── StormMeter.tsx       ← Storm bar
│   │   │   ├── ScoreDisplay.tsx     ← Score + timer + level
│   │   │   ├── PauseButton.tsx
│   │   │   ├── PauseOverlay.tsx
│   │   │   ├── VictoryOverlay.tsx
│   │   │   ├── GameOverOverlay.tsx
│   │   │   └── StarRating.tsx
│   │   └── shared/
│   │       ├── AnimatedBackground.tsx ← Rain/fog/lightning layer
│   │       └── ProgressBar.tsx
│   ├── lib/
│   │   ├── engine/
│   │   │   ├── GameEngine.ts      ← Central coordinator (class)
│   │   │   ├── StateMachine.ts    ← Phase validation
│   │   │   ├── StormSystem.ts     ← Storm tick logic
│   │   │   ├── ComboSystem.ts     ← Combo timer + multiplier
│   │   │   ├── MatchingSystem.ts  ← Group completion detection
│   │   │   ├── ScoringSystem.ts   ← Score + star calculation
│   │   │   └── LevelManager.ts    ← Level loading + orb spawning
│   │   ├── data/
│   │   │   ├── wordGroups.ts      ← 28 groups from user's excel
│   │   │   ├── levels.ts          ← 28 level configs
│   │   │   └── chelseaTips.ts     ← NPC dialogue strings
│   │   ├── hooks/
│   │   │   ├── useScreenSize.ts
│   │   │   ├── useGameLoop.ts     ← (placeholder)
│   │   │   └── useWordSpawning.ts ← (placeholder)
│   │   ├── types/
│   │   │   ├── game.ts            ← All game types
│   │   │   ├── words.ts           ← WordGroup type
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── random.ts
│   │       ├── array.ts
│   │       ├── timing.ts
│   │       ├── sound.ts           ← Gameplay SFX
│   │       └── ambientSound.ts    ← Ambient soundscapes
│   ├── store/
│   │   └── gameStore.ts           ← Zustand + Immer store
│   └── constants/
│       ├── game.ts                ← Tuning values
│       ├── colors.ts
│       └── animation.ts           ← Framer Motion presets
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
