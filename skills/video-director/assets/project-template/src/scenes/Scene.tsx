import { KineticWords } from "../components/KineticWords"
import { Placeholder } from "../components/Placeholder"
import { useTimeline } from "../lib/clock"
import { pick, useFormat } from "../lib/format"
import { sp, springs, useTime } from "../lib/motion"
import { SEAM } from "../lib/seam"
import { font } from "../theme/fonts"
import { color, size, type } from "../theme/tokens"

type SceneProps = {
  id: string
  kicker: string
  headline: string
  media: { label: string; note: string; tone?: "light" | "accent" }
  // Film second the headline starts; defaults to just after the seam entry settles.
  headlineAt?: number
}

// Placeholder body scene: a kicker, a short motion-graphics headline (never the narration repeated), and the
// asset that proves it. The kicker is on screen from the cut so the seam has a carrier; the headline and the
// asset arrive after the seam settles. Replace with one file per real scene.
export function Scene({ id, kicker, headline, media, headlineAt }: SceneProps) {
  const time = useTime()
  const t = useTimeline()
  const format = useFormat()
  const { u, safe, width, height } = format
  const span = t.scene(id)
  const headlineStart = Math.max(headlineAt ?? 0, span.start + SEAM.entry)
  const mediaIn = sp(time, headlineStart + 0.25, springs.settle)
  const headlineSize = pick(format, { wide: size.headline, tall: 96 }) * u

  const textBox = pick(format, {
    wide: { left: safe.x, top: height * 0.5, width: width * 0.4, translate: "0 -50%" },
    tall: { left: safe.x, top: safe.top + 120 * u, width: width - safe.x * 2, translate: "0 0" },
  })
  const mediaBox = pick(format, {
    wide: { left: width * 0.52, top: height * 0.2, width: width * 0.48 - safe.x, height: height * 0.6 },
    tall: { left: safe.x, top: height * 0.36, width: width - safe.x * 2, height: height * 0.32 },
  })

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", ...textBox }}>
        <div
          style={{
            fontFamily: font.sans,
            ...type.label,
            fontSize: size.label * u,
            color: color.accent,
            marginBottom: 28 * u,
          }}
        >
          {kicker}
        </div>
        <KineticWords
          time={time}
          start={headlineStart}
          fontSize={headlineSize}
          textStyle={{ fontFamily: font.sans, ...type.headline, color: color.ink }}
          words={headline.split(" ").map((text) => ({ text }))}
        />
      </div>
      <Placeholder
        u={u}
        label={media.label}
        note={media.note}
        tone={media.tone}
        style={{ ...mediaBox, opacity: mediaIn > 0 ? Math.min(1, mediaIn * 1.6) : 0, translate: `${(1 - mediaIn) * 90 * u}px 0`, scale: String(0.96 + 0.04 * mediaIn) }}
      />
    </div>
  )
}
