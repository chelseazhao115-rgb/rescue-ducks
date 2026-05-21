# Rescue Duck — Project Structure

**Generated**: 2026-05-22

---

## Directory Tree

```
Saveducks/
├── checkpoints/               # Version snapshots
│   └── checkpoint-2026-05-22.md
├── public/                    # Static assets
│   ├── homescreen-back.png    # Home Screen atmospheric background
│   ├── home.png               # Cottage + lighthouse illustration (1120px)
│   ├── duck_2d_pure.png       # Duck character (360px)
│   ├── stage-1-background.png # Game background
│   └── duck.webp              # Unused alternative duck asset
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (viewport, metadata)
│   │   ├── page.tsx           # Home route (/)
│   │   ├── globals.css        # Tailwind v4 theme + keyframes
│   │   ├── loading.tsx        # Global loading skeleton
│   │   └── game/
│   │       ├── page.tsx       # Game route (/game)
│   │       └── loading.tsx    # Game loading skeleton
│   ├── components/
│   │   ├── home/              # Home Screen components
│   │   │   ├── HomeScreen.tsx            # Main home container
│   │   │   ├── LevelMap.tsx              # 28-level selector
│   │   │   ├── DuckCharacter.tsx         # Floating duck (PNG)
│   │   │   ├── CottageAndLighthouse.tsx  # Scene illustration (PNG)
│   │   │   ├── FireflyParticles.tsx      # 45 ambient particles
│   │   │   ├── LakeSurface.tsx           # Water shimmer overlay
│   │   │   ├── Toast.tsx                 # Toast notification system
│   │   │   ├── LighthouseBackground.tsx  # (likely unused)
│   │   │   └── StartButton.tsx           # (dead code)
│   │   ├── game/              # Gameplay components
│   │   │   ├── GameScreen.tsx          # Main game container
│   │   │   ├── IntroSequence.tsx       # Cinematic intro
│   │   │   ├── WordOrbField.tsx        # Orb spawn container
│   │   │   ├── WordOrb.tsx             # Individual word orb
│   │   │   ├── ChainLink.tsx           # SVG chain connectors
│   │   │   ├── LightEnergy.tsx         # Energy particle effects
│   │   │   ├── DuckParade.tsx          # Duck rescue container
│   │   │   ├── Duck.tsx                # Single duck SVG
│   │   │   ├── ChelseaNPC.tsx          # Guide NPC with tips
│   │   │   ├── ComboIndicator.tsx      # Combo + group progress
│   │   │   ├── StormMeter.tsx          # Storm progress bar
│   │   │   ├── ScoreDisplay.tsx        # Score + timer + level
│   │   │   ├── PauseButton.tsx
│   │   │   ├── PauseOverlay.tsx
│   │   │   ├── VictoryOverlay.tsx
│   │   │   ├── GameOverOverlay.tsx
│   │   │   ├── StarRating.tsx
│   │   │   └── Lighthouse.tsx          # (removed from GameScreen)
│   │   └── shared/            # Shared components
│   │       ├── AnimatedBackground.tsx  # Background images + atmosphere
│   │       └── ProgressBar.tsx         # Reusable progress bar
│   ├── lib/
│   │   ├── engine/            # Game logic (pure TypeScript)
│   │   │   ├── GameEngine.ts      # Central coordinator
│   │   │   ├── StateMachine.ts    # Phase transition validation
│   │   │   ├── StormSystem.ts     # Storm tick + penalties
│   │   │   ├── ComboSystem.ts     # Combo timer + multiplier
│   │   │   ├── MatchingSystem.ts  # Group completion detection
│   │   │   ├── ScoringSystem.ts   # Score + star calculation
│   │   │   └── LevelManager.ts    # Level loading + orb spawning
│   │   ├── data/              # Static game data
│   │   │   ├── wordGroups.ts      # 28 synonym groups (IELTS)
│   │   │   ├── levels.ts          # 28 level configs
│   │   │   └── chelseaTips.ts     # NPC dialogue strings
│   │   ├── hooks/             # React hooks
│   │   │   ├── useScreenSize.ts
│   │   │   ├── useGameLoop.ts     # (placeholder)
│   │   │   └── useWordSpawning.ts # (placeholder)
│   │   ├── types/             # TypeScript types
│   │   │   ├── game.ts
│   │   │   ├── words.ts
│   │   │   └── index.ts
│   │   └── utils/             # Utilities
│   │       ├── random.ts
│   │       ├── array.ts
│   │       ├── timing.ts          # formatTime, clamp, lerp
│   │       ├── sound.ts           # Gameplay SFX (Web Audio)
│   │       └── ambientSound.ts    # Ambient soundscapes
│   ├── store/
│   │   └── gameStore.ts       # Zustand + Immer state management
│   └── constants/
│       ├── game.ts            # Game tuning values
│       ├── colors.ts          # Color constants
│       └── animation.ts       # Framer Motion presets
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── .gitignore
```

---

## Component Inventory

### Active Components (In Use)

| Component | Location | Purpose |
|-----------|----------|---------|
| HomeScreen | `components/home/HomeScreen.tsx` | Main home screen |
| LevelMap | `components/home/LevelMap.tsx` | Level selector grid |
| DuckCharacter | `components/home/DuckCharacter.tsx` | Floating duck PNG |
| CottageAndLighthouse | `components/home/CottageAndLighthouse.tsx` | Scene illustration |
| FireflyParticles | `components/home/FireflyParticles.tsx` | 45 fireflies |
| LakeSurface | `components/home/LakeSurface.tsx` | Water shimmer |
| Toast | `components/home/Toast.tsx` | Toast notifications |
| GameScreen | `components/game/GameScreen.tsx` | Main game container |
| IntroSequence | `components/game/IntroSequence.tsx` | Cinematic opening |
| WordOrbField | `components/game/WordOrbField.tsx` | Orb container |
| WordOrb | `components/game/WordOrb.tsx` | Individual orb |
| ChainLink | `components/game/ChainLink.tsx` | Chain SVG |
| LightEnergy | `components/game/LightEnergy.tsx` | Energy particles |
| DuckParade | `components/game/DuckParade.tsx` | Duck rescue display |
| Duck | `components/game/Duck.tsx` | Single duck SVG |
| ChelseaNPC | `components/game/ChelseaNPC.tsx` | Guide NPC |
| ComboIndicator | `components/game/ComboIndicator.tsx` | Combo display |
| StormMeter | `components/game/StormMeter.tsx` | Storm bar |
| ScoreDisplay | `components/game/ScoreDisplay.tsx` | Score/timer |
| PauseButton | `components/game/PauseButton.tsx` | Pause toggle |
| PauseOverlay | `components/game/PauseOverlay.tsx` | Pause menu |
| VictoryOverlay | `components/game/VictoryOverlay.tsx` | Victory screen |
| GameOverOverlay | `components/game/GameOverOverlay.tsx` | Game over screen |
| StarRating | `components/game/StarRating.tsx` | Star display |
| AnimatedBackground | `components/shared/AnimatedBackground.tsx` | Background + atmosphere |
| ProgressBar | `components/shared/ProgressBar.tsx` | Progress bar |

### Unused / Dead Code

| File | Issue | Action |
|------|-------|--------|
| `StartButton.tsx` | Superseded by inline buttons in HomeScreen | Remove or archive |
| `useGameLoop.ts` | Placeholder, engine handles loop | Implement or remove |
| `useWordSpawning.ts` | Placeholder, engine handles spawning | Implement or remove |
| `LighthouseBackground.tsx` | Likely unused after background replacement | Verify and remove |

---

## Asset Inventory

### Images (PNG)
| File | Dimensions | Used By | Status |
|------|-----------|---------|--------|
| `homescreen-back.png` | Full-bleed | AnimatedBackground (home) | Active |
| `home.png` | 1120x1120 | CottageAndLighthouse | Active |
| `duck_2d_pure.png` | 360x360 | DuckCharacter | Active |
| `stage-1-background.png` | Full-bleed | AnimatedBackground (game) | Active |
| `duck.webp` | — | — | Unused |

### CSS Assets
- All animations defined in `globals.css` (Tailwind v4 `@theme` + `@utility`)
- No external CSS frameworks beyond Tailwind

---

## State Flow

```
HomeScreen.tsx
    ↓ (router.push /game)
GameScreen.tsx
    ↓ (startGame)
GameEngine.ts
    ↓ (Zustand store)
useGameStore.ts
    ↓ (selectors)
All game components
```

---

## Key Files by Responsibility

| Responsibility | Files |
|---------------|-------|
| Rendering | `app/layout.tsx`, `app/page.tsx`, `app/game/page.tsx` |
| Home UI | `components/home/HomeScreen.tsx`, `components/home/LevelMap.tsx` |
| Game UI | `components/game/GameScreen.tsx`, all `components/game/*.tsx` |
| Backgrounds | `components/shared/AnimatedBackground.tsx` |
| Game Logic | `lib/engine/*.ts` |
| Data | `lib/data/levels.ts`, `lib/data/wordGroups.ts`, `lib/data/chelseaTips.ts` |
| State | `store/gameStore.ts` |
| Sound | `lib/utils/sound.ts`, `lib/utils/ambientSound.ts` |
| Styling | `app/globals.css` |
| Config | `package.json`, `next.config.ts`, `tsconfig.json` |
