# Rescue Duck — Development Roadmap

## Current Phase: Polish (May 2026)

**Focus**: Atmosphere, presentation, game feel. Not features.

---

## P0 — Home Screen Polish (NEXT)

- [ ] **Home Screen lighthouse animation**
  - Gentle floating/pulsing motion for the lighthouse
  - Sparkle particles around lantern
  - Light beam subtle sweep animation
- [ ] **Button micro-interactions**
  - Ripple effect on START JOURNEY press
  - Stronger glow pulse on hover
  - Scale/spring feedback
- [ ] **Home -> Game transition**
  - Smooth fade/slide instead of hard route change
  - Lighthouse could "zoom" into the game position
- [ ] **Background depth**
  - More atmospheric particles (fireflies, dust)
  - Subtle parallax on mouse/touch movement
  - Moon or stars visible in sky area

---

## P0 — Atmosphere & Emotional Core

- [ ] **Gameplay ambience**
  - Extend ambientSound.ts to run during gameplay (not just intro)
  - Gentle water/wind loop at low volume
- [ ] **Sound design upgrade**
  - Storm audio that responds to storm meter level
  - Lighthouse glow sound
  - Duck sounds (soft quacks on rescue)
  - Volume mixing (ambience ducks under dialogue)
- [ ] **Lighthouse feedback**
  - More dramatic brightness steps
  - Light beam that visibly extends as brightness increases
  - Victory "full beam" animation
  - Warm light spill on surrounding area
- [ ] **Orb life & feel**
  - Idle animation variety (not all identical float)
  - Glow pulse that responds to proximity
  - Selection "snap" feel
  - Chain-link spark effect
  - Group-complete burst

---

## P1 — Visual Layering & Juiciness

- [ ] **Visual depth**
  - Parallax layers (lake, lighthouse, clouds)
  - Foreground elements (shore grass, rocks)
  - Atmospheric fog that varies with storm
  - Moon/stars that get obscured by clouds
- [ ] **Particle system upgrade**
  - Persistent gentle particles (fireflies, dust motes)
  - Better energy particles (curved paths, trails)
  - Rain improvement (wind-affected angle)
  - Lightning improvements
- [ ] **Duck animation**
  - Walking/running animation when moving toward home
  - Joy animation on rescue
  - Nest/grouping behavior
  - More visible duck presence throughout game
- [ ] **Chain feedback**
  - Screen shake on big combos (subtle)
  - Color temperature shift as lighthouse brightens
  - Storm visual response to correct chains

---

## P2 — Content & Variation

- [ ] **Environmental variation**
  - Slightly different background per stage
  - Time-of-day progression across stages
  - Weather variation (light rain -> heavy storm)
- [ ] **Chelsea variety**
  - More tip lines
  - Context-aware reactions
  - Occasional non-tip presence (just being there)

---

## Completed (May 21, 2026)

- [x] Full UI redesign based on 8 reference PNGs
- [x] Circular watercolor-style word orbs
- [x] Glassmorphism overlay screens
- [x] Multi-layer SVG chain links
- [x] Lighthouse repositioned to right side as "home"
- [x] Duck parade direction: waiting left -> rescued right (toward lighthouse)
- [x] Level timer rebalancing by stage (50s/65s/75s/90s)
- [x] Fixed critical countdown display bug (rAF timestamp mismatch)
- [x] Home Screen vertical layout: Title -> Lighthouse -> Buttons
- [x] Soft twilight background with warm horizon glow

---

## V2 — Post-Polish (Deferred)

- [ ] Stage transition sequences
- [ ] Duck naming / personality system
- [ ] Chelsea relationship moments
- [ ] Environment storytelling details
- [ ] Accessibility options (reduced motion, larger text)
- [ ] Sound on/off toggle
- [ ] Language UI toggle (CN/EN)
- [ ] Performance optimization for low-end devices

---

## V3 — Far Future (Deferred)

- [ ] Additional word sets (beyond IELTS)
- [ ] Custom word import
- [ ] Practice mode (untimed)
- [ ] Speedrun mode
- [ ] Themed seasonal levels
- [ ] Community word pack sharing

---

## NEVER (Explicitly Out of Scope)

- Login / accounts
- Leaderboards / ranking
- AI chat / generation
- Teacher dashboard / analytics
- Multiplayer
- Micro-transactions
- Ads
