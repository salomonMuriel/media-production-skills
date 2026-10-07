import { Audio } from "@remotion/media"
import { interpolate, staticFile, useVideoConfig } from "remotion"

import { toFrames } from "../data/fps"
import { MUSIC, musicSegments, segmentStarts } from "../data/music"
import { sfxCues } from "../data/sfx"
import type { Timeline } from "../data/timeline"
import { LINE_IDS } from "../data/vo"
import { hasStaticFile } from "../lib/assets"

const BED_OPEN_DB = -10
const BED_DUCK_DB = -20
const DUCK = { pre: 0.12, attack: 0.2, release: 0.6, bridge: 0.6 }
const SFX_DB = -12
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

const dbToGain = (db: number) => Math.pow(10, db / 20)

function voiceSpans(t: Timeline) {
  const spans = LINE_IDS.map((id) => ({ start: t.voStart[id], end: t.voEnd(id) })).sort((a, b) => a.start - b.start)
  return spans.reduce<{ start: number; end: number }[]>((merged, span) => {
    const last = merged[merged.length - 1]
    if (last && span.start - last.end < DUCK.bridge) last.end = Math.max(last.end, span.end)
    else merged.push({ ...span })
    return merged
  }, [])
}

// Bed level in dB at a film second: open at t=0, down ~10 dB under the voice, slow release.
function bedDb(time: number, spans: { start: number; end: number }[]): number {
  return spans.reduce((db, span) => {
    const down = interpolate(time, [span.start - DUCK.pre - DUCK.attack, span.start - DUCK.pre], [0, 1], clamp)
    const up = interpolate(time, [span.end, span.end + DUCK.release], [1, 0], clamp)
    return Math.min(db, BED_OPEN_DB + (BED_DUCK_DB - BED_OPEN_DB) * Math.min(down, up))
  }, BED_OPEN_DB)
}

// Draft-only sound: music segments with an in-component duck, VO lines and SFX files that exist in public/.
// Masters use the offline mix (mix.py) instead: Remotion does no loudness normalisation or band-split ducking,
// SFX are not peak-aligned and `note` pitches are ignored here.
export function DraftAudio({ t }: { t: Timeline }) {
  const { fps } = useVideoConfig()
  const spans = voiceSpans(t)
  const musicFile = MUSIC.file !== null && hasStaticFile(MUSIC.file) ? MUSIC.file : null
  const starts = segmentStarts()

  return (
    <>
      {musicFile !== null &&
        musicSegments.map((segment, index) => {
          const from = toFrames(starts[index], fps)
          const head = from < 0 ? -from : 0
          return (
            <Audio
              key={`music-${index}`}
              name={`Music ${index + 1}`}
              src={staticFile(musicFile)}
              from={Math.max(0, from)}
              trimBefore={toFrames(segment.sourceStart, fps) + head}
              trimAfter={toFrames(segment.sourceEnd, fps)}
              premountFor={fps}
              volume={(mediaFrame) => dbToGain(bedDb((mediaFrame + Math.max(0, from)) / fps, spans))}
            />
          )
        })}
      {LINE_IDS.filter((id) => hasStaticFile(t.lines[id].file)).map((id) => (
        <Audio key={id} name={`VO ${id}`} src={staticFile(t.lines[id].file)} from={toFrames(t.voStart[id], fps)} premountFor={fps} />
      ))}
      {t.diegetic
        .filter((cue) => hasStaticFile(cue.file))
        .map((cue) => (
          <Audio key={cue.id} name={`Diegetic ${cue.id}`} src={staticFile(cue.file)} from={toFrames(cue.at, fps)} premountFor={fps} />
        ))}
      {sfxCues(t).map((cue, index) => {
        const file = cue.file ?? `sfx/${cue.kind}.wav`
        if (!hasStaticFile(file)) return null
        return (
          <Audio key={`sfx-${index}`} name={`SFX ${cue.kind}`} src={staticFile(file)} from={toFrames(cue.at, fps)} premountFor={fps} volume={dbToGain(SFX_DB) * cue.gain} />
        )
      })}
    </>
  )
}
