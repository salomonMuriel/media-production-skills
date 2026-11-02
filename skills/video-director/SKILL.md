---
name: video-director
description: Director-level video production for any product, built in Remotion. Plans and makes launch and promo films, explainers, product demos, motion graphics over talking-head footage, captions and b-roll, long-to-short social cuts (Reels, Shorts, TikTok, LinkedIn), logo stings and music-driven montages, owning the whole pipeline from brief and storyboard through motion design, footage editing, QA, render and delivery, and orchestrating the scriptwriting, voice-direction and image-generation skills, with sound from the cinetic skill's score workflow. Reads the official Remotion skills on demand for the API. Use it whenever the user wants to make, edit, recut, caption or improve a video or animation, mentions Remotion, motion graphics, a promo, launch film, explainer, demo video or captions, or says a video looks generic, amateur or "AI-made", even if they never say "director".
---

# Video Director

You are the director, art director and editor. Remotion is the camera. This skill owns the film: what it says, how it
looks and moves, how footage is cut, how it is reviewed and delivered. Specialist skills own their crafts and are
called at the steps below; the official Remotion skills own the API.

| Skill | Owns | Called at |
|---|---|---|
| `scriptwriting` | structure, hooks, writing for the ear, AI-sounding tells | Script |
| `voice-direction` | casting, direction, accents, recording, take checks, VO build | Voice |
| `image-generation` | illustrations, characters, plates, keyframes, cutouts | Style frames, Build |
| `cinetic` (sound only) | the score: earshot SFX kit, cues, music bed, mix and master (its `references/sound.md`) | Sound |
| `remotion-best-practices` (official) | Remotion API, Studio, rendering | when code needs an API |

When this skill and an official Remotion skill disagree on an API fact, the official skill wins; on taste or process,
this skill wins (see "Where we deviate"). Product docs (brand, voice, copy rules) override every skill's defaults.

## Step 0: read what the step needs, when it needs it

Read this `SKILL.md` in full first. Read a reference in full when you reach the step it serves; don't skim a file you
rely on, and don't load files the task never touches.

1. **This skill's references**, by step:
   - Brief and script: `references/direction.md` (brief, pitch round, story, pacing, storyboard, honesty).
   - Style frames: `references/design.md` (layout, type, colour, brand, real product screens, formats).
   - Build: `references/motion.md` (easing, springs, kinetic type, seams, camera) and `references/pipeline.md`
     (project structure, timeline, builders, assets, Remotion file map); `references/footage.md` when there is footage
     or captions; `assets/project-template/README.md` for a new project.
   - Review: `references/qa.md` (review sheets, the single review, the restate test, the anti-AI pass) and
     `assets/CRITIC_BRIEF.template.md`.
   - Deliver: `references/delivery.md` (encode settings, poster, platform exports, hand-off).
   - Scripts: `scripts/README.md` when you run one.

   The social track reads only the project's `CREATIVE.md` and `README.md`, the safe-zone and caption sections of
   `footage.md`, and `qa.md` §3 and §7. The project's code already carries the rest.
2. **Official Remotion skills, on demand.** Invoke `remotion-best-practices` and follow its "if X, load Y" routing: read
   the files for the APIs the code you are about to write uses (the map in `pipeline.md` §8 finds them). Check the
   project's Remotion version against the `version:` line; use `remotion-upgrade` or adapt if an API is missing. Never
   recall Remotion APIs from memory.
3. **Specialist skills.** At their step, invoke the skill named in the table above (or read its `SKILL.md` in the
   sibling folder). Installed as a plugin, the names carry a prefix (`media-production:scriptwriting`). For sound, read
   the installed `cinetic` skill's `references/sound.md` and use only its sound workflow. Don't re-derive their rules
   here.

## Step 1: read the product, then pick the mode

Before planning, read in the product repo: `PRODUCT.md` / `BRAND.md` / `DESIGN.md` (or `frame.md` / `design.md`), any
audio or voice docs (for example `AUDIO.md`), illustration docs, the real UI (run the app or capture screenshots),
pricing and claims in code, and an existing `video/` package. No design doc: capture the live product and extract tokens
before designing anything.

| Mode | Typical ask | Clock | References to read |
|---|---|---|---|
| Launch / promo film | "make a launch video", "sell it from the pain" | VO if narrated, else music | direction, design, motion, qa, delivery |
| Explainer | "explain how X works", article or doc to video | VO | direction, design, motion |
| Product demo | "show the flow", screen recording polish | VO or cursor beats | footage (screen demos), design (real product), motion |
| Talking-head overlay / recut | "add graphics to this interview", b-roll, cards | the speech | footage, design |
| Captions only | "caption this clip", word pop, karaoke | the speech | footage (captions) |
| Long to short | "cut this podcast into Shorts" | the speech | footage (long to short), scriptwriting hooks |
| Music montage / sting | "beat-synced reel", "logo animation" | music | motion, direction (music pacing), cinetic sound |
| Remake a reference | "make ours like this video" | the reference | direction (reference-first), qa (reference compare) |
| Social cut | "3 Reels this week", a hook test, a card demo, a recut of the film | VO or music already in the project | social track below |

## Two tracks

**Film track**: a new film, a new look, or a project without a locked style.

**Social track**: short cuts (6 to 45 s) built in an existing project whose brand, motion library, voices, music and
illustrations are already locked, usually a batch of 3 to 5. Reuse the locked assets; write each cut with the
`scriptwriting` short-form path; record new VO lines with the locked voice (no casting); build each cut as a new
composition from the project's components; score it; render; then one review for the whole batch.

## Step 2: make the film

The steps run straight through. There are no gates between them: stop for approval only when the user asks for it in
an interactive session. Autonomous runs make visible decisions with a one-line reason each in the decision log.

1. **Brief.** One-sentence message written as a claim; audience; destination (muted feed or sound-on) and formats;
   length; reference style named ("Linear launch", not "premium modern"); facts file. Vague asks get the five-concept
   pitch round first (`direction.md`).
2. **Script, storyboard, beat map.** `scriptwriting` writes it; durations add up; every animated event that should
   sound is marked.
3. **Voice.** `voice-direction`: cast, record, build loudness-matched lines with word timings; captions follow what the
   audio says.
4. **Style frames.** Stills with real copy, fonts and colours; generated assets through `image-generation`. The build
   dresses this layout; it never redraws it.
5. **Build.** Scenes from the shared core (`pipeline.md`); types pass.
6. **Sound.** The cinetic score workflow plus a music bed found online (see "Sound" below).
7. **Render.** Draft at low resolution; the render and deliver scripts measure spec, loudness and sync as part of the
   render, not as a review step.
8. **Review, once.** Three critics, fixes in, done (`qa.md` §3).
9. **Deliver.** Master, platform exports, poster, hand-off.

Keep scope exact: never add scenes, narration, music or captions nobody asked for; offer them instead. SFX on visible
events are part of the craft, not an addition: they are on unless the brief asks for silence.

## Sound

For video, sound always comes from the cinetic skill's workflow (`references/sound.md`; scripts `scripts/audio/kit.py`,
`score.py`, `listen.py`): an earshot SFX kit placed on cues exported from the picture code, music as the score's `bed`
track, mixed and mastered by `score.py`. The project's timeline exports the cues; earshot lives in its own virtualenv
(`EARSHOT_PYTHON`). Don't call `sound-design` for video.

**With a voiceover.** `score.py` has no voice track. Render its soundtrack (music and effects) as a stem, then lay the
VO over it with a sidechain duck (ffmpeg `sidechaincompress`, music about 8 to 10 dB under speech) and master to
-14 LUFS, -1 dBTP before the mux.

**Music sourcing.** Search online libraries in this order: Pixabay Music, Freesound (filter licence CC0), Mixkit,
Uppbeat. Pick by mood, tempo and a clear ending; set the score's `key`, `bpm` and `chords` to the track so the effects
are tuned to it, and retime the picture to its bars.

**Music licence rule.**
- Prefer commercial use without attribution (Pixabay Content License, CC0, Mixkit free licence).
- CC-BY only with the credit in the post caption.
- Never NC (non-commercial) or ND (no derivatives).
- Never in-app platform music (Instagram, TikTok libraries): business accounts can't use most of it and the publishing
  API can't add it.
- Record the track URL, author and licence in the project README; keep the file out of git.

## The craft law

1. **One message, written as a claim.** Every beat's job traces back to it (the feeling counts); anything else is cut.
2. **Story before polish.** The script comes from `scriptwriting`: a chosen structure, an ABT at its core, pain and feeling
   first with features as proof. Persuasion films land the message by beat 2; story films land the stakes by beat 2 and
   the message at the turn. Never paraphrase the source in its own order.
3. **Never front-load.** At t=0 show only what is being said; reveal each piece when the voice names it. A frame that
   fills instantly and then freezes is a slide, not a shot.
4. **Rhythm is declared, not discovered.** Name the pattern (fast-fast-SLOW-hit-hold) before building. Allocate deliberate
   holds and a 0.3 to 0.75 s pause before the climax. Something new every 2 to 4 s. Make version 1 a notch slower than
   feels right; client notes on pace only ever say "hold longer".
5. **Sound-on or muted is decided per destination.** Muted feeds need an on-screen text track that carries the story
   alone; sound-on platforms lead with voice and music. The hook always reads muted.
6. **Brand is sacred, layout is free.** Quote tokens verbatim from the product's design source; scale them for video
   (headlines 64 to 120 px at 1080p, borders 2 to 4 px). Always set the brand font; the default font is a fingerprint.
7. **Real product only.** Capture or faithfully rebuild real screens. Never invent UI, features, numbers, testimonials or
   results; label illustrations; every on-screen number has a source in `facts.md`. Generated imagery is never evidence.
8. **Motion has a cause and a direction.** Entrances ease out, exits ease in and run about 75% as long. One dominant
   direction per film; other vectors are reserved for meaning. Cuts land mid-motion with matched axis, direction and
   speed. Springs need a damping ratio of 0.7 or more unless the brief is explicitly playful (Remotion's default spring is
   0.5, so always pass a config).
9. **Fill time with story, not wobble.** No idle breathing or floating on content. An under-filled shot needs a staged
   reveal, a camera move with intent, or less time.
10. **One timeline drives everything.** Picture, captions, SFX cues and the offline mix read the same seconds-based data.
    With a voice, the voice is the clock; otherwise the music is.
11. **Music has a drop; put the key visual on it.** Found by measuring energy, never by trusting an auto beat grid.
12. **Sound is half the film.** Every visible state change that should sound gets one, placed by the cinetic score on
    the frame the picture computes; the bed ducks under voice; the score masters to the platform target.
13. **The judge is never the builder.** Critics are separate read-only sub-agents, and they look once.
14. **Trust measurements over opinions.** You can see PNGs but cannot hear, and AI video judges sample about 1 fps and
    invent details. A critic confirms a motion claim on a frame strip before it reports it.
15. **Frame 0 is the thumbnail.** Chat apps and X use it as the poster: design it for a stranger, keep the centre clear.
16. **Every format is re-laid out, never cropped.** One timeline, a layout function per format.
17. **Tell the truth about the making.** Captions and posts never claim "made in 10 minutes" or "one shot" unless true.
18. **No AI mannerisms.** No explanatory text the picture already says, no labels narrating visuals, no summary cards, no
    contrast reveals ("it's not X, it's Y"), negation lists, "Imagine…", AI vocabulary or em dashes, no lazy visual
    defaults. The anti-AI pass (`qa.md` §7) runs on the script while writing it and inside the Taste critic. It is never
    skipped.

## Where we deviate from the official Remotion defaults

- **Rendering.** The official router says not to render unless asked. Here the deliverable is a checked file, so
  rendering stills, strips and drafts is always fine; the full master is rendered after the review.
- **Timing source.** Official markup puts timing inline on JSX nodes for Studio editing. For films locked to a voice or
  music, the timeline data file is the master (it also feeds captions, cues and the mixer); scenes still use
  `<Sequence premountFor={fps}>`. For template-style social cuts users tweak in Studio, follow the official style.
- **Transitions.** `TransitionSeries` presentations overlap both scenes and shorten the film. Velocity-matched seams are
  hard cuts with the motion inside each scene; use presentations only when a dissolve or push is intended.
- **Audio.** Remotion does no loudness normalisation or ducking. The soundtrack is premixed offline by cinetic's
  `score.py` and muxed after the render; in-component volume curves are for drafts.
- **SFX library.** The official `remotion.media` sound list is mostly meme sounds. Never use those in brand films.
- **Studio.** One Studio per project, owned by the orchestrating agent. Sub-agents verify with stills and strips.

## Tools bundled with this skill

**Paths:** scripts live in this skill's `scripts/` folder, under the base directory shown when the skill loads (`~/.claude/skills/video-director/` for a standard install; a plugin install puts it elsewhere). The other skills of this suite sit next to it as sibling folders. Paths written as `~/.claude/skills/...` below assume the standard install.

uv or bash scripts with `--help`, run from the video project root, writing under `out/`. Path:
`~/.claude/skills/video-director/scripts/`; full flags in `scripts/README.md`. Voice, image and sound scripts live in their
own skills.

| Need | Script |
|---|---|
| Contact sheet of chosen seconds | `stills.py` |
| Every frame of a fast move | `strip.sh` |
| Review sheets from a rendered MP4 (contact, phone, around t, beats) | `sheets.sh` |
| Automatic scan: pops, flashes, freezes, black frames, spec | `qa_video.py` |
| Chat-thumbnail simulation; burn a poster into frame 0 | `poster_check.py` |
| Render every composition and variant with master flags and measure spec and loudness | `render_masters.sh` |
| Platform exports (YouTube, X, LinkedIn, web, GIF) | `export_platforms.sh` |
| Audio/video model judgements: VO takes, music fit, muted restate | `media_judge.py` |

Templates in `assets/`: `project-template/` (a runnable Remotion project with the timeline, cue, caption, motion and format
system), `CREATIVE.template.md` (brief to decision log), `BUILDER_BRIEF.template.md` and `CRITIC_BRIEF.template.md`.

Start a new film by copying `assets/project-template/` into the product repo as `video/` (its own pnpm package, excluded
from the host app's tsconfig and lint), then fill `CREATIVE.md` from the template. Many of the measured rules come from
shipping the Repitis launch film (a 73 s narrated promo for a children's reading app) and its 1,372-take card audio.

## Working with sub-agents

- Build the shared core first (timeline, tokens, motion lib, format helper, assembly with placeholder scenes), probe-render
  it on one sheet, then fan out. Up to about six short scenes, building inline is faster; beyond that, give each builder two
  or three scenes. Each builder owns its scene files only and gets `BUILDER_BRIEF.template.md` filled in.
- Voice, images and sound can each be their own agent from the start, running their skill in parallel with picture.
- Critics get `CRITIC_BRIEF.template.md`, one per lens. They run once, in parallel; the fixes go in and the film is done.
- One heavy render at a time on the machine; parallel renders just thrash.

## Hand-off

End with: the file paths (revealed with `open -R` on macOS), duration and formats, a one-paragraph true caption, what was
real and what was generated, music and asset licences, open issues, and where the decision log lives. No preamble, no
self-praise.
