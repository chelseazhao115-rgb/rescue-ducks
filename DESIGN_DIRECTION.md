# Rescue Duck — Design Direction

## Visual Identity

### Current Direction (May 22, 2026)

**This is a soft atmospheric indie game.**

Rescue Duck is NOT:
- ❌ dark fantasy
- ❌ cyberpunk
- ❌ arcade mobile game
- ❌ neon UI
- ❌ high saturation anime
- ❌ blue/white ed-tech UI

Rescue Duck IS:
- ✅ soft atmospheric indie game
- ✅ Alto's Adventure + Sky: Children of the Light 气质
- ✅ 柔和紫蓝夜晚 (soft purple-blue night)
- ✅ 日落后蓝调时刻 (post-sunset blue hour)
- ✅ 温暖灯塔 (warm lighthouse)
- ✅ 安静湖面 (quiet lake)
- ✅ 回家的方向感 (sense of direction toward home)
- ✅ 低饱和度 (low saturation)
- ✅ soft glow
- ✅ breathing UI
- ✅ 治愈感 (healing/comforting feeling)
- ✅ dreamlike calm

### Color Palette (Updated May 22)

```
Background Night:   #1a1040  — Deep night (fallback)
Background Indigo:  #2d1f5e  — Mid-tone purple
Background Mist:    #6b5b8e  — Twilight mist
Background Lake:    #3d5270  — Water surface

Title Gold:         #ffe7b0  — Main title color
Title Glow:         rgba(255,217,122,0.5) — Title shadow
Subtitle Gold:      #ffe7b0  — Subtitle with 0.85 opacity

Button Primary:     linear-gradient(180deg, #ffe8af, #f0c860)
Button Primary Text:#5a4a28  — Dark brown for contrast
Button Secondary:   rgba(255,255,255,0.12) — Glass
Button Secondary Text: #ffffff — White (updated May 22)

Lighthouse Glow:    #ffd97a  — Main warm light
Lighthouse Beam:    #ffe8a0  — Bright glow peak
Light Warm:         #ffd166  — Transition warmth
Light Gold:         #f0a500  — Accent warmth

Orb Idle:           #b9d9ff  — Floating orbs (cool blue)
Orb Selected:       #ffe8a0  — Selected orbs (warm gold)
Orb Chained:        #ffd166  — Chained orbs (amber)
Orb Wrong:          #f6d8e8  — Soft pink error (NOT bright red)

Combo 1:            #ffd97a  — Low combo
Combo 2:            #f0c860  — Mid combo
Combo 3:            #e8b050  — High combo

Chelsea:            #b9d9ff  — NPC soft blue
Chelsea Accent:     #d9c8ff  — Soft lavender
```

### Light Direction
- **Primary light source**: Lighthouse (warm, directional)
- **Secondary**: Floating orbs (cool blue → warm gold as selected)
- **Ambient**: Storm darkness, occasional lightning
- **Emotional light**: Warm = safety/home. Cold = danger/distance.

### Typography
- **Home Screen**: Comic Sans MS / Chalkboard SE / Nunito / Quicksand — cute, rounded, friendly
- **Game UI**: Nunito / Quicksand / system-ui — clean, readable
- **No monospace except timer**
- **Letter-spacing**: Slightly tight for titles (-0.02em)

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
- Neon colors, high saturation
- Mobile game currency/gem icons
- Achievement badges and XP bars

**Instead use:**
- Dark, atmospheric backgrounds
- Glowing, floating elements
- Diegetic UI (storm meter feels like a weather instrument)
- Implicit feedback (lighthouse brightens = you're doing well)
- Chelsea's gentle presence = guidance without instruction
- Soft glassmorphism — not sharp frosted glass
- Warm gold accents on dark backgrounds

---

## Animation Principles

- **Slow, gentle, organic** — nothing jerky or mechanical
- **Spring physics** for most interactions (stiffness: 200, damping: 20)
- **Ease-in-out** for atmospheric elements
- **No linear transitions** — everything breathes
- **Framer Motion `layout` animations** for position changes
- **Idle breathing**: All living things have subtle motion (ducks bob, lighthouse pulses, fireflies drift)

### Home Screen Animations
- Title: fade in from top (opacity 0→1, y: -30→0, 1s easeOut)
- Subtitle: delayed fade in (0.2s delay)
- Buttons: fade in from bottom (opacity 0→1, y: 16→0, 0.4s)
- Star icon: gentle rotation + scale pulse (3s cycle)
- Duck: floating bob (y: [0, -3, 0], 3.5s) + shadow breathing
- Scene container: idle scale breathing (scale: [1, 1.003, 1], 8s)
- Fireflies: wandering drift with opacity pulse
- Transition: scene zooms toward lighthouse, warm light overlay fades in

### Game Animations
- Orbs: gentle y-float (3s cycle, infinite)
- Lighthouse glow: slow opacity pulse (2-3s)
- Lake surface: subtle shimmer
- Ducks: gentle bobbing
- Chain links: SVG path draw + glow pulse
- Energy particles: curved flight path to lighthouse

---

## Sound Design

### Procedural Only — No Audio Files
All sounds generated with Web Audio API oscillators and noise.

### Ambience
- **Home**: Gentle water + warm ambient pad (C3-G3-C4) + faint sparkle sine
- **Calm night**: Low-pass noise (water) + band-pass noise with LFO (breeze)
- **Storm**: Low-pass noise (wind) + high-pass noise (rain) + periodic sawtooth rumble (thunder)
- **Magical hum**: Layered sine waves (C-major chord) with gentle LFO modulation

### Gameplay Sounds
- **Correct tap**: 3-note ascending sine (523→659→784 Hz)
- **Chain link**: Rising pitch per combo step (440 + combo×60 Hz)
- **Wrong match**: Low double-buzz (200→160 Hz, square wave)
- **Group complete**: 4-note ascending (C-E-G-C, triangle wave)
- **Victory**: 6-note melody (C-E-G-E-G-C, sine wave)
- **Button click**: Short descending sine chirp (880→660 Hz)

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

### Asset Strategy (Updated May 22)
- **Home Screen**: Full-bleed PNG background (`homescreen-back.png`)
- **Cottage/Lighthouse**: Large PNG illustration (`home.png`, 1120px)
- **Duck**: PNG character sprite (`duck_2d_pure.png`, 360px)
- **Game Screen**: Full-bleed PNG background (`stage-1-background.png`)
- **Procedural layers retained**: Rain, fog, clouds, sparkles, water shimmer overlay on top of PNG backgrounds
- **SVG phased out** for major illustrations (too complex, doesn't match painted style)

---

## Responsive Design

- **Mobile-first**: All tap targets minimum 44px
- **Home Screen title**: `clamp(5rem, 10vw, 12rem)`
- **Home Screen buttons**: `clamp(1.25rem, 2.5vw, 2.25rem)` font, generous padding
- **Scene container**: Uses percentage-based positioning
- **Prevent zoom**: `maximumScale: 1, userScalable: false` in viewport meta
