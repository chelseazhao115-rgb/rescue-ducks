# Rescue Duck — Checkpoint 2026-05-22

**Date**: 2026-05-22
**Phase**: HomeScreen Visual Polish Checkpoint
**Commit**: To be created after this checkpoint

---

## Current UI State

### Home Screen
- **Background**: Full-bleed `homescreen-back.png` (replaced purple gradient)
- **Left Panel** (6% from left, 16% from top):
  - "Rescue Duck" title: large cute font, gold (#ffe7b0), glow shadow, animated star
  - Subtitle: "Light the way home." — same gold, 0.85 opacity
  - "Start Journey" button: gold gradient pill, brown text, glow shadow
  - "Level Map" button: glassmorphism, white text, blur backdrop
- **Right Scene**:
  - `home.png` (1120x1120px): cottage + lighthouse + rocks + trees
  - Positioned at `right-0 bottom-[8%]`
  - Scene container has idle breathing animation
- **Center-Bottom**:
  - `duck_2d_pure.png` (360x360px) floating on water
  - Positioned at `bottom-[10%] left-[38%]`
  - Gentle bob animation + breathing glow + shadow
- **Atmosphere**:
  - 45 firefly particles concentrated in middle-lower area
  - AnimatedBackground retains: clouds, rain, sparkles, water shimmer, mist
- **Bottom-Left**:
  - Settings icon, leaderboard icon, version text (v1.0.0)
- **Transition**:
  - Click "Start Journey" → scene zooms 1.06x toward lighthouse
  - Warm golden light overlay fades in from lighthouse direction
  - Router push delayed 1500ms

### Game Screen
- **Background**: `stage-1-background.png` (replaced procedural background)
- **HUD**: Storm meter (top-right), Score + timer (top-left), Pause button
- **Play Area**: WordOrbField (floating word orbs)
- **Overlays**: ChainLink (SVG), LightEnergy (particles)
- **Bottom**: DuckParade, ChelseaNPC
- **Overlays**: PauseOverlay, GameOverOverlay, VictoryOverlay (AnimatePresence)
- **Removed**: `<Lighthouse />` component (redundant with background image)

---

## Current Gameplay State

- **28 levels** defined across 4 stages
- **Core loop**: Match synonym groups → generate light → rescue ducks
- **Storm system**: Fills over time, wrong matches accelerate it
- **Combo system**: Chain timer + multiplier
- **Scoring**: Star rating (1-3) based on performance
- **Chelsea NPC**: Contextual tips during gameplay
- **LocalStorage**: Saves level progress (`rescueDuckLevel`)

---

## Current Asset Files

### Active Assets
| File | Size | Usage |
|------|------|-------|
| `public/homescreen-back.png` | Full-bleed | Home Screen background |
| `public/home.png` | 1120x1120 | Cottage + lighthouse illustration |
| `public/duck_2d_pure.png` | 360x360 | Duck character |
| `public/stage-1-background.png` | Full-bleed | Game background (Stage 1) |

### Unused/Alternative Assets
| File | Status |
|------|--------|
| `public/duck.webp` | Unused (alternative duck asset) |

### Missing Assets
| Asset | Priority |
|-------|----------|
| Stage 2-4 backgrounds | P2 |
| Duck rescue animation sprites | P2 |
| Sound effects (if moving beyond procedural) | P3 |

---

## Current Sound State

### Implemented (Procedural Web Audio)
- **Home ambience**: Gentle water + warm pad + sparkle sine
- **Night ambience**: Water + breeze
- **Storm ambience**: Wind + rain + distant thunder
- **Magical hum**: C-major chord layers
- **SFX**: Correct, wrong, chain, group complete, victory, button click

### Missing
- Gameplay ambience during actual play
- Storm audio tied to storm meter level
- Duck sounds on rescue
- Lighthouse glow sound

---

## Current Visual Issues

1. **Game Screen lighthouse** — Removed code-drawn lighthouse but background image has one; no dynamic brightness feedback visible on game screen
2. **Duck visibility** — Ducks in DuckParade are tiny (8x6px body) and hard to see
3. **Orb variety** — All orbs float identically, lack personality
4. **Background parallax** — No depth movement on mouse/touch
5. **Firefly coverage** — 45 particles good but could use more in upper areas

---

## Current Technical Issues

1. **Dead code**: `StartButton.tsx`, `useWordSpawning.ts`, `useGameLoop.ts`
2. **Unused constants**: `INITIAL_ORB_COUNT`, `ORB_SPAWN_INTERVAL_MS` hardcoded in engine
3. **Unused type**: `GameSummary`
4. **Potentially unused**: `LighthouseBackground.tsx` in home/ folder
5. **No gameplay ambience**: ambientSound only runs on home/intro, not during gameplay
6. **Hardcoded values**: Several engine values should be constants

---

## Git Commit Context

**Previous commits**:
- `4032160` — Pre HomeScreen polish checkpoint
- `d74aab4` — Stable MVP checkpoint

**Uncommitted changes** (as of session end):
- `src/components/home/HomeScreen.tsx` — Layout redesign, button color
- `src/components/shared/AnimatedBackground.tsx` — PNG background for home
- `src/components/home/DuckCharacter.tsx` — New file (PNG duck)
- `src/components/home/CottageAndLighthouse.tsx` — New file (PNG scene)
- `src/components/home/FireflyParticles.tsx` — New file (45 particles)
- `src/components/home/LakeSurface.tsx` — New file (water shimmer)
- `src/components/home/Toast.tsx` — New file (toast system)
- `src/components/game/GameScreen.tsx` — Removed Lighthouse component
- `src/lib/utils/ambientSound.ts` — Home ambience added
- `src/lib/utils/sound.ts` — Button click sound added
- New assets: `public/homescreen-back.png`, `public/home.png`, `public/duck_2d_pure.png`, `public/stage-1-background.png`
