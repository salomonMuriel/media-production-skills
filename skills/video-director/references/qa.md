# QA: review tools and the single review

Builders look at their own work with stills and strips while they build. The film then gets exactly one review, after
the draft render: three critics, fixes in, done.

Contents
1. Review tools, cheapest first
2. What to look for
3. The single review
4. The restate test
5. Limits of AI judges
6. Reference compare (remakes)
7. The anti-AI pass
8. Delivery checklist

---

## 1. Review tools, cheapest first

| Tool | What it shows | Command |
|---|---|---|
| Stills sheet | chosen seconds, labelled, one batched render | `scripts/stills.py Wide out/review/beats.png 0 2.5 6 9.2` |
| Frame strip | every Nth frame of a fast move | `scripts/strip.sh Wide 4.0 5.2 out/review/dive.png --nth 1` |
| Overview sheet | the film at 2 fps | `scripts/sheets.sh contact out/draft.mp4 out/review/contact.png` |
| Phone sheet | readability at 360 px wide; if it doesn't read here, it fails | `scripts/sheets.sh phone out/draft.mp4 out/review/phone.png` |
| Around a moment | 12 frames around t | `scripts/sheets.sh around out/draft.mp4 out/review/t12.png 12.0` |
| Beat sheet | one frame per beat to judge rhythm | `scripts/sheets.sh beats out/draft.mp4 out/review/beats.png 120 0.48` |
| Draft render | rhythm, not sharpness | `npx remotion render Wide out/draft.mp4 --scale=0.5 --crf=28` |
| Automatic scan | pops, one-frame flashes, freezes, black frames, spec | `scripts/qa_video.py out/draft.mp4 --ignore 0 --cuts 12.4,30.1 --beats 120:0.48` |
| Audio report | loudness, true peak, payoff, stacks, masking | cinetic `score.py --json out/qa/score.json`; `listen.py` for earshot's listening sheet |
| Poster | chat thumbnail simulation | `scripts/poster_check.py out/final/film.mp4` or `--render PosterWide,PosterTall` |

Pass `--fps` to `stills.py` and `strip.sh` when the composition isn't 30 fps. Full flags: `scripts/README.md`.

- Read every sheet you render (the Read tool shows PNGs). Inspect fresh output only; scripts clear their temp frames.
  `sheets.sh` tiles carry no burned-in timestamps (it prints a time legend per page instead); `stills.py` labels tiles.
- Pop scan logic: a frame-difference spike above 3× both neighbours is a pop; frame n differing from both neighbours
  while n−1 ≈ n+1 is a one-frame flash (the plain spike test misses these). On a finished film most pops are intentional:
  whitelist the poster (`--ignore 0`), hard cuts (`--cuts`) and beat-locked pulses (`--beats BPM:OFFSET` with that
  section's grid), then look at every remaining one with `sheets.sh around` instead of treating it as a defect.
- Loops: the last frame must match frame 0 in position and velocity; cycles must be whole numbers.
- Preview suspicious motion at 0.25× in Studio.
- Re-render only the changed range (`--frames=a-b`); batch frames into one render call (each `still` call re-bundles).

## 2. What to look for

**Frame defects**, most frequent first: em-based gaps resolving against the parent font size (use px around big type);
text overflowing or touching edges; elements visible before their entrance or after their exit (missing clamp); the hero
colour on more than one element; unreadable dim text; wrong layer order; a fallback font (the brand font didn't load);
text overlapping during a swap; blurry scaled text; anything moving linearly; corner labels or frame borders.

**Motion**: the seam rules (`motion.md` §8); settles keyed in 3-frame steps (use a continuous curve); exits that don't
accelerate; the next shot not already moving in the exit's direction; idle wobble filling time; a frozen frame mid-film.

**Pacing**: movement within the first 15 frames; something new every 2 to 4 s; the hook works muted in the first 2 to
3 s; nothing front-loaded; every element readable for at least 1.5 s.

**Sound**: every sounded event has a visible cause on its frame, the bed ducks under the voice, the payoff is the
loudest moment, the tail fades (cinetic `sound.md`).

**Truth**: every number in `facts.md`; illustrations labelled; no invented UI or features; tokens match the design source.

**Pre-delivery checklist**:
- [ ] Zero linear position easing; every interpolate clamped
- [ ] Entrances use a spatial property and are staggered by importance; exits faster than entrances
- [ ] Every still image has a treatment; fast snaps have motion blur, read text has none
- [ ] One hero colour per frame; brand font everywhere; px gaps around big type
- [ ] At least three deliberate holds; no frozen frame mid-film
- [ ] Every visible event that should sound has a cue; the music drop sits on the key visual
- [ ] Text inside safe zones in every format

## 3. The single review

One review per film, after the draft render; one per batch on the social track. No self-check pass before it, no
re-check after the fixes, no second round.

1. **Prepare the evidence once**: the draft, a contact sheet, a phone sheet, strips at the cuts and fast moves, the
   poster check, `qa_video.py` output and cinetic's score report.
2. **Three critics, in parallel, once.** Separate read-only sub-agents with a clean context and the spec (brief,
   storyboard, design and copy rules), never the builder's reasoning, briefed with `assets/CRITIC_BRIEF.template.md`.
   - **Director**: hook in 2 s muted, story and message, pacing, the weakest 3 s, the ending, the restate test (§4).
   - **Picture**: motion (confirmed on strips), composition, readability on the phone sheet, brand tokens, facts.
   - **Taste**: the anti-AI pass (§7) on every on-screen and spoken word and on the picture.
   Each critic lists its issues with frame numbers and a concrete fix, most important first, and drops any claim it
   could not confirm on a frame. On the social track the same three critics review the whole batch at once.
3. **Fix and finish.** Apply the fixes, re-render the changed range into the master, deliver. What you chose not to fix
   goes into the hand-off as one line each.

Spec, loudness and sync are measured by the render and deliver scripts, not reviewed.

## 4. The restate test

A fresh agent that sees only the frames, muted, must restate the film's message in one sentence
(`scripts/media_judge.py restate` on the draft, or a sub-agent given the contact sheet). If it can't, the film fails. If
it hesitates, too much is moving. A cold viewer finds ambiguous metaphors the author can't see: in one film the daily
"pack" read as a box mailed home until it was shown on the phone screen where it actually lives.

## 5. Limits of AI judges

- Video judges sample about 1 fps. They miss easing, one-frame pops, flashes and fast moves, and they invent details
  (claims about easing, emoji and gradients in one review were all wrong). Use them for gist, comprehension, pacing feel
  and transcripts. Verify every specific defect claim in stills or strips before acting on it. A strip caught a real bug
  the judge missed: a dive that first zoomed into the wrong object.
- You can't hear: audio claims rest on cinetic's score report and earshot's `listen.py`, and important calls on the
  user's ears.

## 6. Reference compare (remakes)

- Side-by-side sheets of reference | ours per second, seam frames between builder groups, and a scan for leftover colours
  of the reference brand.
- Expect frame boundaries in a spec to be a few frames off, and most "cuts" in modern launch films to be continuous
  moves (10 to 15 true hard cuts in 65 s): measure real cuts by frame-difference spikes.

## 7. The anti-AI pass

Generated films share recognisable mannerisms, and viewers have learned them. Apply this list while writing the script,
and the Taste critic runs it on the draft ("reads as made by a person with taste"). One hit is a fix, not a style
choice, unless the decision log says otherwise.

**Copy (voice, cards, captions, end cards)**
- The banned and capped patterns in the scriptwriting skill (`references/craft.md`, AI-sounding tells): contrast reveals, negation lists, question-then-answer, colon reveals,
  "Imagine", fake-profound kickers, marketing stock and AI vocabulary, em dashes.
- **Unneeded explanatory text**: a subtitle under a graphic that already says it; a label narrating what the visual shows
  ("Fast setup" over a fast setup); a "How it works" or "The problem" header card; a summary card repeating what was just
  shown; "Step 1 / 2 / 3" scaffolding outside a tutorial; captions and kinetic type saying the same words at once.
- Hedges and throat-clearing: "simply", "just", "basically", "actually", "in fact", "it's worth noting".
- Over-politeness and cheerleading: exclamation marks in every line, "Let's", "Ready to…?", "You've got this".
- Symmetry for its own sake: every list exactly three items, every line the same length, every beat ending on a punchline.
- Generic stand-ins: "Lorem", "Your Company", "John Doe", placeholder avatars in a finished film.

**Picture**
- The lazy defaults in `design.md` §6 (gradient text, purple-blue glow, glass cards, particles, emoji, centred everything,
  identical card grids, corner labels).
- Every element floating or breathing; every word animated; every transition a different effect; whole-frame shakes on
  every beat.
- Stock-photo realism with AI tells (waxy skin, extra fingers, warped text, impossible reflections), or model-rendered text
  anywhere in frame.
- The model's default font.

**Sound**
- Wall-to-wall music with no dynamic shape; generic stock ukulele or corporate piano chosen by mood word; meme or
  game-pack SFX; a closing ding.
- A voice that reads every line at the same energy; tags spoken aloud; an accent that drifts on short words.

**Structure**
- A feature tour with a logo at the end; three benefits in a row with no turn; an ending that summarises instead of
  landing; a CTA that names an action without an outcome.

**Tests**: the swap test (could a competitor run this unchanged?), the mute-each-line test (does the picture already say
it?), and the restate test. When presenting the work to the user, apply the same standard: no preamble, no self-praise,
no recap of what they can see for themselves.

## 8. Delivery checklist

Spec, loudness and sync come from the render and deliver scripts' own output; this list is what they don't cover.

- [ ] Storyboard reconciled with the build
- [ ] Poster frame works as a chat thumbnail
- [ ] "Example data" and "Illustration" labels where needed; every number sourced
- [ ] True caption written; music URL, author and licence and generated-content notes in the README
- [ ] File revealed (`open -R`) and its path given
