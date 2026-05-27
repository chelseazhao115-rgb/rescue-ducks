# Rescue Duck Audio Placeholders

These files are replacement points for mastered audio assets:

- `home-theme.mp3`
- `gameplay-loop.mp3`
- `storm-layer.mp3`
- `intro-ambient.mp3`
- `victory.mp3`
- `failure.mp3`
- `sfx/*.mp3`

The current game uses only the procedural Web Audio soundtrack in `src/lib/audio/AudioManager.ts`.
These `.mp3` files are empty placeholders and are not referenced by runtime code.

When real mastered assets are added, replace the placeholders and add an explicit asset playback path in `AudioManager.ts` as a separate change.
