# Credits

These skills distil lessons from shipped work and from public skills and guides. Where a source's licence allows
reuse, ideas, numbers and small algorithms were adapted and rewritten; where it is restrictive or unspecified, only ideas
were taken and the text was written from scratch. No source text was copied verbatim. Thank you to every author below.

## Shipped work

- **Repitis** (children's Spanish reading app): the launch film (73 s, narrated, two voices, 16:9 and 9:16) and the
  1,372-take card audio library. Source of the measured voice, static, music, QA and delivery rules, and the
  calibration for SFX density, gains and the mixer's audibility check (its stems re-measured in October 2026).

## Skills and repositories consulted

| Source | Licence | What it informed |
|---|---|---|
| [remotion-dev/skills](https://github.com/remotion-dev/skills) | see repo | The Remotion API layer these skills load and defer to (not bundled) |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Apache-2.0 | Motion doctrine, seams and velocity-matched cuts, captions model, creative direction, audio carving |
| [EveryInc/product-launch-video](https://github.com/EveryInc/product-launch-video) | MIT | The differentiating moment gets the most screen time, product on screen within 3 s, staggered before/after, one-headline end card |
| [howseen-ai/claude-motion-design](https://github.com/howseen-ai/claude-motion-design) | MIT, © 2026 Howseen AI (Raphaël Aubry) | Critic loop, pop and one-frame-flash detection maths (adapted in `qa_video.py`), spring presets, music cue rules |
| [haidrrrry/claude-remotion-skill](https://github.com/haidrrrry/claude-remotion-skill) | MIT | Remotion craft checklist, verification loop, synthesized SFX idea |
| [digitalsamba/claude-code-video-toolkit](https://github.com/digitalsamba/claude-code-video-toolkit) | MIT | VO pacing tiers, TTS drift, Playwright recording, platform exports |
| [browser-use/video-use](https://github.com/browser-use/video-use) | MIT | Transcript-first talking-head editing, cut padding, caption chunking |
| [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | Apache-2.0 | Beat-grid fitting, AAC offset, SFX levels, brand motion tokens, pacing lessons |
| Vincentwei1021/video-talkcraft | unspecified (ideas only) | Host and b-roll layout, anti-slideshow rules, cursor-locked zoom |
| Vincentwei1021/anything2explainer | PolyForm Noncommercial (ideas only) | Explainer subject size, stillness and light thresholds |
| [gooseworks-ai/goose-skills](https://github.com/gooseworks-ai/goose-skills) | MIT | Screen-recording zoom levels, short-form script rubric, character lock |
| Fangx-AI/cut-director | AGPL-3.0 / CC BY-SA 4.0 (ideas only) | Beat density and speaker modes for graphics over talking heads |
| [square-zero-labs/video-prompting-skill](https://github.com/square-zero-labs/video-prompting-skill) | Apache-2.0 | Image-to-video prompting, character sheets |
| [siddharthvaddem/openscreen](https://github.com/siddharthvaddem/openscreen) | MIT | Screen-recording zoom and cursor-follow constants |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | MIT | Hook as three tracks, AI-tells taxonomy, voice-of-customer research |
| [blader/humanizer](https://github.com/blader/humanizer) | MIT | Why AI text sounds generated |
| [jtydhr88/screenwriting-skills](https://github.com/jtydhr88/screenwriting-skills) | MIT | Value turns, screenwriting rules for short films |
| Jakeschincariol/youtube-agent-skill, instagram-agent-skill | MIT | First-seconds jobs, retention leaks, loop lines |
| [elevenlabs/skills](https://github.com/elevenlabs/skills) | see repo | Voice settings presets, Scribe options |
| kk10-x/tagsmith, AlexAnsart/demo-studio | see repos | Audio-tag lint rules, v3 stability steps |
| openai/skills (imagegen), Emily2040/nano-banana-image-skill, RBYHNDRDS/gpt-image-prompting-skill, waterblower/Omni-Art-Skills, ShinChven/nano-banana-skills | see repos | Image prompting patterns |

## Frameworks and references

Story structures and writing craft from Kenn Adams (story spine), Emma Coats (Pixar rules), Dan Harmon (story circle),
Randy Olson (ABT), Barbara Minto (SCQA), Donald Miller (StoryBrand), Chip and Dan Heath (Made to Stick), Simon Sinek,
Carmine Gallo, Derek Lieu (trailers), Diátaxis, NPR Training, Google ABCD, Eugene Schwartz, George Loewenstein, Les Binet
and Peter Field. Vendor documentation from ElevenLabs, OpenAI, Google, Black Forest Labs, Recraft, Ideogram, BytePlus,
Runway and Kling.
