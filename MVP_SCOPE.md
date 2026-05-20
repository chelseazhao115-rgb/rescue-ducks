# Rescue Duck — MVP Scope

## What IS in MVP

### Core Gameplay
- [x] Floating word orbs with tap interaction
- [x] Semantic group matching (synonym chains)
- [x] Combo system with multiplier
- [x] Storm meter (time-based + penalty/reduction)
- [x] Lighthouse brightness progression
- [x] Duck rescue parade
- [x] 60-90 second timed levels
- [x] Star rating (1-3 stars) on victory
- [x] Game Over / Victory screens

### Word System
- [x] 28 IELTS paraphrasing groups from user's vocabulary list
- [x] Chinese translations for every word
- [x] Chinese meaning tooltip on tap
- [x] Group-batch spawning (4 groups at start, 2 every 2 completions)
- [x] Same-group anti-proximity spawning

### Level System
- [x] 28 progressive levels across 4 stages
- [x] Stage 1 (L1-7): 2-word pairs, 5-6 groups
- [x] Stage 2 (L8-14): 2-word pairs, 6 groups
- [x] Stage 3 (L15-21): 3-word chains, 6 groups
- [x] Stage 4 (L22-28): 3-4 word chains, 6-7 groups
- [x] Level select map with lock/unlock
- [x] Level progress saved to localStorage
- [x] Victory → "Next Level" button

### Presentation
- [x] Dark atmospheric theme with storm/lake/lighthouse
- [x] Animated background (rain, fog, lightning, clouds)
- [x] Floating orb animations
- [x] Chain link SVG lines between matched orbs
- [x] Light energy particles flying to lighthouse
- [x] Duck parade with rescued/unrescued states
- [x] Chelsea NPC with contextual tips
- [x] Combo indicator with group progress dots
- [x] Cinematic intro sequence (v2)
- [x] Procedural ambient sound (water, wind, thunder, magical hum)
- [x] Sound effects (correct, wrong, chain, group complete, victory)

### UI
- [x] Home screen with "Light the Lighthouse" CTA
- [x] Level select map (4 stage tabs, 28 level cards)
- [x] Storm meter bar with color zones
- [x] Score + groups completed + timer display
- [x] Level name + stage indicator
- [x] Pause overlay
- [x] Loading skeletons

---

## What is NOT in MVP (and will NOT be added)

### Explicitly Excluded
- ❌ Login / authentication
- ❌ User accounts / profiles
- ❌ Leaderboards
- ❌ Multiplayer
- ❌ AI chat / AI content generation
- ❌ Teacher dashboard
- ❌ Listening mode
- ❌ Writing / spelling mode
- ❌ Progress analytics
- ❌ Social sharing
- ❌ Backend / database

### Deferred to V2+
- ⏳ More ambient visual layers
- ⏳ Enhanced particle system
- ⏳ Day/night cycle or environment variation
- ⏳ Duck personality / individual duck names
- ⏳ Chelsea relationship development
- ⏳ Story fragments between stages
- ⏳ Environmental storytelling details
- ⏳ Accessibility options
- ⏳ Sound volume controls
- ⏳ Language switching (English/Chinese UI)

---

## Current Build Status

```
Build: ✅ Passing (zero TypeScript errors)
Pages: / (home) + /game (gameplay) + loading states
Routes: Static pre-rendered
Performance: Client-side only, no SSR dependencies
```

---

## Scope Change Policy

If a feature request comes in during MVP polish:

1. Does it directly improve **atmosphere, presentation, or game feel**? → Consider
2. Does it add **new systems, modes, or complexity**? → Defer to V2
3. Does it risk **ed-tech creep**? → Reject
