# Rescue Duck — Design Direction

## Visual Identity

### Color Palette
```
Storm Dark:     #0a0e17  — Deep night background
Storm Mid:      #1a2740  — Cloud masses, mid-tones
Storm Blue:     #2d4a6e  — Rain, wind elements
Lake Deep:      #0c1a2b  — Water base
Lake Surface:   #1b3a5c  — Water highlights
Lighthouse Glow:#f5d67b  — Main warm light
Lighthouse Beam:#ffe8a0  — Bright glow peak
Light Warm:     #ffd166  — Transition warmth
Light Gold:     #f0a500  — Accent warmth
Orb Idle:       #6eb5ff  — Floating orbs (cool blue)
Orb Selected:   #ffe8a0  — Selected orbs (warm gold)
Orb Chained:    #ffd166  — Chained orbs (amber)
Orb Wrong:      #ff6b6b  — Error flash (red)
Combo 1:        #ffd166  — Low combo
Combo 2:        #f0a500  — Mid combo
Combo 3:        #ff8c42  — High combo
Chelsea:        #a8d8ea  — NPC color
```

### Light Direction
- **Primary light source**: Lighthouse (warm, directional)
- **Secondary**: Floating orbs (cool blue → warm gold as selected)
- **Ambient**: Storm darkness, occasional lightning
- **Emotional light**: Warm = safety/home. Cold = danger/distance.

### Typography
- System font stack: Inter → system-ui → sans-serif
- No decorative fonts (keeps it clean, indie)
- Monospace for timer only

---

## UI Philosophy

### CRITICAL — This is NOT an ed-tech product

**Avoid at all costs:**
- Blue/white color schemes
- Card-based layouts
- Progress bars that look like LMS
- "Educational" iconography (books, graduation caps, checkmarks)
- Overly explicit instructions
- "You scored X points! Great job!" tone

**Instead use:**
- Dark, atmospheric backgrounds
- Glowing, floating elements
- Diegetic UI (storm meter feels like a weather instrument)
- Implicit feedback (lighthouse brightens = you're doing well)
- Chelsea's gentle presence = guidance without instruction

### Animation Principles
- **Slow, gentle, organic** — nothing jerky or mechanical
- **Spring physics** for most interactions (stiffness: 200, damping: 20)
- **Ease-in-out** for atmospheric elements
- **No linear transitions** — everything breathes
- **Framer Motion `layout` animations** for position changes

---

## Animation Reference

### Enter Animations
- Orbs: scale 0→1, opacity 0→1 (spring, gentle)
- Overlays: opacity 0→1, scale 0.9→1 (spring)
- Tips: opacity 0→1, y 10→0 (spring)

### Idle Animations
- Orbs: gentle y-float (3s cycle, infinite)
- Lighthouse glow: slow opacity pulse (2-3s)
- Lake surface: subtle shimmer
- Ducks: gentle bobbing

### Interaction Feedback
- Orb tap: scale 1→1.15 (spring, stiff)
- Chain link: SVG path draw (0.3s, ease-out) + pulse glow
- Wrong match: x-shake (0.4s) + red flash
- Group complete: orb pop (scale 1→1.5, opacity→0) + particles
- Energy particles: curved flight path to lighthouse (0.8s, ease-in-out)

### Atmospheric
- Rain: linear fall, infinite repeat
- Lightning: opacity flash (random intervals)
- Fog: slow horizontal drift (8s cycle)
- Clouds: very slow horizontal movement

---

## Sound Design

### Procedural Only — No Audio Files
All sounds generated with Web Audio API oscillators and noise.

### Ambience
- **Calm night**: Low-pass noise (water) + band-pass noise with LFO (breeze)
- **Storm**: Low-pass noise (wind) + high-pass noise (rain) + periodic sawtooth rumble (thunder)
- **Magical hum**: Layered sine waves (C-major chord) with gentle LFO modulation

### Gameplay Sounds
- **Correct tap**: 2-note ascending sine (523→659 Hz)
- **Chain link**: Rising pitch per combo step (440 + combo×60 Hz)
- **Wrong match**: Low double-buzz (200→160 Hz, square wave)
- **Group complete**: 4-note ascending (C-E-G-C, triangle wave)
- **Victory**: 6-note melody (C-E-G-E-G-C, sine wave)

### Mixing Principles
- Ambience stays quiet (5-12% gain) — felt, not heard
- Gameplay sounds are quick and subtle (8-15% gain)
- Victory/group complete are slightly louder (12% gain)
- No background music — only environmental sound
- No arcade-style effects
- No vocal samples

---

## Component Architecture Notes

### Key Patterns
- All components use **named exports** (no default exports)
- `"use client"` on every component file
- Props interfaces exported alongside components
- Zustand selectors for store subscriptions (avoid wrapper re-renders)
- Engine is **pure TypeScript** — no React imports
- Store uses **Immer middleware** for immutable updates
- Game loop via `requestAnimationFrame` in engine class

### File Organization
```
src/
  components/
    home/     — HomeScreen, LevelMap, LighthouseBackground
    game/     — All gameplay components
    shared/   — AnimatedBackground, ProgressBar
  lib/
    engine/   — Pure game logic (7 files)
    data/     — Word groups, levels, Chelsea tips
    hooks/    — useScreenSize, useGameInit
    types/    — All TypeScript interfaces
    utils/    — random, array, timing, sound, ambientSound
  store/
    gameStore.ts  — Single Zustand store
  constants/
    game.ts, colors.ts, animation.ts
```
