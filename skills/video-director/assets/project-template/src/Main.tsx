import type { ReactNode } from "react"
import { Audio } from "@remotion/media"
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { z } from "zod"

import { Captions } from "./components/Captions"
import { DraftAudio } from "./components/DraftAudio"
import { toFrames } from "./data/fps"
import { VARIANTS } from "./data/vo"
import { hasStaticFile } from "./lib/assets"
import { cameraPulse } from "./lib/beat"
import { FrameOffsetProvider, useTimeline, VariantProvider } from "./lib/clock"
import { useFormat } from "./lib/format"
import { useTime } from "./lib/motion"
import { seamStyle } from "./lib/seam"
import { EndCard } from "./scenes/EndCard"
import { Hook } from "./scenes/Hook"
import { Poster } from "./scenes/Poster"
import { Scene } from "./scenes/Scene"
import { loadLocalFaces } from "./theme/fonts"

loadLocalFaces()

export const filmSchema = z.object({ variant: z.enum(VARIANTS) })
export type FilmProps = z.infer<typeof filmSchema>

// Moves the scene's content with the velocity-matched seam; the background stays put underneath.
function SeamWrapper({ id, children }: { id: string; children: ReactNode }) {
  const time = useTime()
  const t = useTimeline()
  const { width, height, u } = useFormat()
  const span = t.scene(id)
  const index = t.scenes.indexOf(span)
  const style = seamStyle(time, span, { width, height, u }, { entry: index > 0, exit: index < t.scenes.length - 1 })
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>
}

// Gates a scene to its timeline span. Inside, useTime() still returns film seconds.
function SceneSlot({ id, children }: { id: string; children: ReactNode }) {
  const t = useTimeline()
  const { fps } = useVideoConfig()
  const span = t.scene(id)
  const from = toFrames(span.start, fps)
  const durationInFrames = Math.max(1, toFrames(span.end, fps) - from)
  return (
    <Sequence name={id} from={from} durationInFrames={durationInFrames} premountFor={fps}>
      <FrameOffsetProvider offset={from}>
        <AbsoluteFill style={{ background: span.background }} />
        <SeamWrapper id={id}>{children}</SeamWrapper>
      </FrameOffsetProvider>
    </Sequence>
  )
}

function FilmAudio() {
  const t = useTimeline()
  const mix = `audio/mix-${t.variant}.wav`
  if (hasStaticFile(mix)) return <Audio name="Mix" src={staticFile(mix)} />
  return <DraftAudio t={t} />
}

function Film() {
  const frame = useCurrentFrame()
  const time = useTime()
  const t = useTimeline()
  return (
    <AbsoluteFill style={{ background: t.scenes[0].background }}>
      <AbsoluteFill style={{ scale: String(cameraPulse(time)) }}>
        <SceneSlot id="hook">
          <Hook />
        </SceneSlot>
        <SceneSlot id="pain">
          <Scene id="pain" kicker="The pain" headline="The problem, in a few words" media={{ label: "Illustration or footage", note: "The moment before the product" }} />
        </SceneSlot>
        <SceneSlot id="turn">
          <Scene id="turn" kicker="The turn" headline="The change, shown" media={{ label: "Real product screen", note: "Captured, or rebuilt faithfully", tone: "accent" }} headlineAt={t.wordAt("l03", "change")} />
        </SceneSlot>
        <SceneSlot id="proof">
          <Scene id="proof" kicker="The proof" headline="Proof you can check" media={{ label: "A sourced number", note: "Every figure lives in facts.md" }} />
        </SceneSlot>
        <SceneSlot id="end">
          <EndCard />
        </SceneSlot>
      </AbsoluteFill>
      <Captions />
      {frame === 0 && <Poster />}
      <FilmAudio />
    </AbsoluteFill>
  )
}

export function Main({ variant }: FilmProps) {
  return (
    <VariantProvider variant={variant}>
      <Film />
    </VariantProvider>
  )
}

export function PosterStill({ variant }: FilmProps) {
  return (
    <VariantProvider variant={variant}>
      <Poster />
    </VariantProvider>
  )
}
