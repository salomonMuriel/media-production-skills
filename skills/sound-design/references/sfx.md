# SFX and foley

Placing, choosing and synthesising sound effects.

Contents
1. SFX and foley

---

## SFX and foley

- Every major hit gets a short whoosh or click; transitions get riser-in and hit-on-cut; counters get a soft tick; UI
  gets a click on the press frame, a key per typed character (same rhythm as the typing animation), pops at a cascade's
  own stagger, a sparkle on a real state change. Celebration sounds only for real events. Premium means few, soft hits.
- **Place by the transient**, not the file start: align the measured peak (argmax |s|) to the visual contact frame,
  which usually means the file starts a few frames early. Without a peak measurement, lead by 2 to 3 frames. Early feels
  synced; late feels broken. In Remotion: `<Sequence from={eventFrame − Math.round(peakMs / 1000 * fps)}>`.
- Gains: normalise each SFX to its own peak, then 0.04 to 0.3 per event (about −28 to −10 dB).
- No assets is no excuse for silence: `scripts/foley.py` synthesises a deterministic kit (pop, blip, thump, slap, stamp,
  whoosh, swell, tear, tick, key, flip, pluck, chime, riser, bass hit, shimmer, reverse swoosh), tunable to the key.
- Sources: Mixkit, Pixabay, freesound (check each CC licence; CC-BY needs attribution), ElevenLabs SFX (≤ 22 s).
  Never the meme sounds in the official `remotion.media` list (vine boom, bruh, wilhelm) in brand films.
- The offer or price moment is the loudest moment of the film.
- Choose sounds by film genre, not by event. Product films: whoosh (camera), impact (landing), riser (build), sparkle
  (light), with a strong-kick bed. Ban the game-sound-pack timbre (synth plucks, bloops, boings, notification bleeps), but a
  real click or switch on screen gets its real foley. A signature phrase: riser, impact ~35 f later at the loudness peak,
  sparkle ~25 f after that.
- Density: around 8 designed effects in 18 s, not 20; about 0.4 cues per second under narration, capped at ~0.35 volume
  against the voice. Cues read best in the pauses between sentences (gaps ≥ 0.3 s). Transitions get only the build, not the
  landing. No closing ding.
- Repeated pops step down in level (0.40 → 0.25), alternate two samples, and tighten with the animation; when they get too
  dense, let them blur into one swoosh.
- Remotion `volume` multiplies the file's own level: an SFX peaking at −24.6 dB stays inaudible under a bed even at 1.0.
  `volume > 1` amplifies in the render but the preview clamps it, so judge on the rendered file. Prefer pre-normalising
  quiet assets. Long assets need an explicit `durationInFrames` or they ring past the action.
- Measure each SFX file's attack (first sample above ~−30 dB of its peak) and start the file that early; then subtract the
  output offset: `from = targetFrame − peakLatency − outputOffset`. Uncompensated, one film's biggest hit landed 0.27 s late.
- Sub-second tones (beeps, clicks) are better synthesised than generated; AI sound generation turns very short sounds to mush.
- **Sound comes after picture lock.** Any change to shot timing re-pins the SFX table. Keep it declarative
  (`{from, src, volume}` rows, each commented with its visible action); the video-director template's `sfx.ts` derives `from` from the
  timeline, which removes most re-pinning.
