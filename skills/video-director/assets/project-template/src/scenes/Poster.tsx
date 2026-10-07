import { AbsoluteFill } from "remotion"

import { BrandMark } from "../components/BrandMark"
import { Placeholder } from "../components/Placeholder"
import { useTimeline } from "../lib/clock"
import { pick, useFormat } from "../lib/format"
import { font } from "../theme/fonts"
import { color, radius, size, type } from "../theme/tokens"

// Frame 0 of the film and the PosterWide/PosterTall stills: what chat apps and X show before anyone presses play.
// Written for a stranger: the payoff image, a question that selects the right viewer, an invitation to watch.
// It must read at ~300 px wide with a play button over its centre, so the centre stays clear.
export function Poster() {
  const t = useTimeline()
  const format = useFormat()
  const { u, safe, width, height } = format
  const seconds = Math.round(t.duration)

  const textBox = pick(format, {
    wide: { left: safe.x, top: height * 0.2, width: width * 0.4 },
    tall: { left: safe.x, top: height * 0.1, width: width - safe.x * 2 },
  })
  const visual = pick(format, {
    wide: { left: width * 0.57, top: height * 0.14, width: width * 0.43 - safe.x, height: height * 0.72 },
    tall: { left: safe.x, top: height * 0.58, width: width - safe.x * 2, height: height * 0.3 },
  })

  return (
    <AbsoluteFill style={{ background: color.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", ...textBox }}>
        <div style={{ marginBottom: 40 * u }}>
          <BrandMark u={u} />
        </div>
        <div style={{ fontFamily: font.sans, ...type.headline, fontSize: pick(format, { wide: size.headline, tall: 110 }) * u, color: color.ink, textWrap: "balance" }}>
          A question your viewer says yes to?
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 40 * u,
            fontFamily: font.sans,
            ...type.headline,
            fontSize: size.body * u,
            color: color.accentInk,
            background: color.accent,
            borderRadius: radius.pill,
            padding: `${14 * u}px ${32 * u}px ${18 * u}px`,
          }}
        >
          Watch the {seconds}-second film
        </div>
      </div>
      <Placeholder u={u} label="Key visual" note="The payoff image, not a feature list" tone="accent" style={visual} />
    </AbsoluteFill>
  )
}
