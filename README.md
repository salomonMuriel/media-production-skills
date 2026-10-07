# Media production skills for Claude Code

Five agent skills that make Claude a director-level video, voice, image, sound and script producer. They encode a gated
production process, measured craft rules and tested tools, distilled from shipped work and from the best public video
skills.

| Skill | What it does |
|---|---|
| [`video-director`](skills/video-director/SKILL.md) | Plans and builds videos in [Remotion](https://www.remotion.dev): launch and promo films, explainers, product demos, motion graphics over talking heads, captions and b-roll, long-to-short social cuts, music montages. Owns brief, storyboard, motion, design, footage editing, QA, render and delivery, and calls the four skills below at its gates. |
| [`scriptwriting`](skills/scriptwriting/SKILL.md) | Story and script craft for any format and length: a framework chooser, 20 structures, hooks, writing for the ear, AI-sounding tells, localisation, self-tests. |
| [`voice-direction`](skills/voice-direction/SKILL.md) | Casting, directing and checking AI voices (ElevenLabs first): a feeling-to-settings matrix, accents, static screening, verification without ears, blind casting, loudness-matched builds with word timings. |
| [`image-generation`](skills/image-generation/SKILL.md) | AI images with OpenAI GPT Image (plus Gemini, FLUX, Recraft): locked style suffixes, consistent characters, images sized for camera moves, clean cutouts, hostile self-review, cost control, legal notes. |
| [`sound-design`](skills/sound-design/SKILL.md) | Music choice and analysis (finding the drop), bar-accurate edits with blind tests, transient-aligned SFX, a synthesized foley kit, offline mixing with ducking, loudness mastering. |

Each skill works on its own; `video-director` orchestrates them for films.

## What makes them different

- **Gated process.** Brief → script → voice → style frames → build → sound → draft review → master → hand-off, with the
  user approving the plan before anything expensive happens.
- **Measured rules, not vibes.** Noise-floor gates for synthetic voices (static measured −50 to −60 dB, clean −66 to
  −76), spring damping ratios, seam velocity matching, caption timing, loudness targets, beat-grid fitting, all with numbers.
- **The judge is never the builder.** Read-only critic sub-agents reject by default; a fresh agent must restate the
  message from muted frames.
- **Verification without ears or eyes on motion.** Claude can see PNGs but can't hear and AI video judges sample ~1 fps, so
  the tools verify with frame strips, automatic pop/flash/freeze scans, envelopes, LUFS and repeated transcription.
- **An explicit anti-AI pass.** Scripts and drafts are checked for AI mannerisms: explanatory text the picture already
  says, "it's not X, it's Y", negation lists, AI vocabulary, lazy visual defaults.
- **Honest by default.** No invented numbers, testimonials or UI; generated imagery is never evidence.

## Install

These skills defer to the official Remotion skills for the API. Install those too:

```bash
npx skills add remotion-dev/skills
```

Then install these in one of three ways.

As a Claude Code plugin (skills are then named `media-production:video-director` and so on):

```
/plugin marketplace add salomonMuriel/media-production-skills
/plugin install media-production@media-production-skills
```

With the [skills CLI](https://agentskills.io):

```bash
npx skills add salomonMuriel/media-production-skills
```

Or by copying the folders into your skills directory:

```bash
git clone https://github.com/salomonMuriel/media-production-skills
cp -R media-production-skills/skills/* ~/.claude/skills/
```

## Requirements

- [uv](https://docs.astral.sh/uv/) (all Python scripts are self-contained uv scripts; nothing is installed globally)
- ffmpeg and ffprobe with `loudnorm`, `silencedetect`, `tile` and `libvpx` (Homebrew's build works)
- Node 20+ and pnpm for Remotion projects
- API keys only for the tools you use: `ELEVENLABS_API_KEY` (voice), `OPENAI_API_KEY` (images), `OPENROUTER_API_KEY`
  (audio/video model judges); optional `GEMINI_API_KEY`, `BFL_API_KEY`, `RECRAFT_API_KEY`. Every script that spends money
  has `--dry-run`.

**Remotion licence:** Remotion is free for individuals and small companies; larger companies need a
[company licence](https://www.remotion.dev/license). Check before using it commercially.

## Use

Ask for what you want; the skills trigger on their own ("make a 45 s launch video for…", "caption this interview",
"write a 30 s ad script", "find a warm Colombian Spanish voice", "generate a consistent cast of characters"). You can also
call them by name, e.g. `/video-director`.

A typical film: copy `skills/video-director/assets/project-template/` into your repo as `video/`, fill
`CREATIVE.md` from the template, and let the skill walk the gates.

## Status

- Tested: every script ran against real material (rendered masters, 1,372 voice takes, real illustrations) or synthetic
  fixtures with known answers. Paid APIs were exercised with dry runs; the ElevenLabs and OpenAI request shapes come from
  tools used in shipped work.
- Not yet run live: the Gemini, FLUX and Recraft adapters in `gen_image.py`.
- Model facts (ElevenLabs v4, GPT Image 2.5, deprecations) were checked against vendor docs in October 2026. Models change
  fast; the skills tell Claude to re-check.

Issues and pull requests are welcome, especially field reports: what a skill got wrong on a real project.

## Credits and licence

Built by Salomón Muriel with Claude. Lessons from many public skills and guides are credited in [CREDITS.md](CREDITS.md).
MIT licence ([LICENSE](LICENSE)).
