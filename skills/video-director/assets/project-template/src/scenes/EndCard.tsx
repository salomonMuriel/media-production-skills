import { BrandMark } from "../components/BrandMark"
import { KineticWords } from "../components/KineticWords"
import { useTimeline } from "../lib/clock"
import { pick, useFormat } from "../lib/format"
import { ease, sp, springs, tw, useTime } from "../lib/motion"
import { font } from "../theme/fonts"
import { color, radius, size, type } from "../theme/tokens"

// Name, address, promise. The last frame is part of the film: it holds, it does not fade to black.
export function EndCard() {
  const time = useTime()
  const t = useTimeline()
  const format = useFormat()
  const { u, width } = format
  const start = t.scene("end").start
  const ctaAt = t.wordAt("l05", "Where")
  const cta = sp(time, ctaAt - 0.05, springs.snappy)
  const promiseAt = t.voEnd("l05") + 0.3
  const promise = tw(time, promiseAt, promiseAt + 0.5, 0, 1, ease.out)
  const nameSize = pick(format, { wide: size.display, tall: 132 }) * u

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 44 * u }}>
      <div style={{ scale: "2.4" }}>
        <BrandMark u={u} inverted withName={false} />
      </div>
      <KineticWords
        align="center"
        time={time}
        fontSize={nameSize}
        textStyle={{ fontFamily: font.sans, ...type.display, color: color.nightInk }}
        words={[
          { text: "Product", at: Math.max(start + 0.15, t.wordAt("l05", "product")) },
          { text: "name", at: Math.max(start + 0.2, t.wordAt("l05", "name")) },
        ]}
        style={{ maxWidth: width * 0.9 }}
      />
      <div
        style={{
          fontFamily: font.sans,
          ...type.headline,
          fontSize: size.title * u,
          color: color.accentInk,
          background: color.accent,
          borderRadius: radius.pill,
          padding: `${18 * u}px ${48 * u}px ${22 * u}px`,
          opacity: cta > 0 ? Math.min(1, cta * 2) : 0,
          scale: String(0.9 + 0.1 * cta),
          translate: `0 ${(1 - cta) * 24 * u}px`,
        }}
      >
        your-site.com
      </div>
      <div
        style={{
          position: "absolute",
          bottom: pick(format, { wide: 110, tall: 260 }) * u,
          fontFamily: font.sans,
          ...type.body,
          fontSize: size.body * u,
          color: color.nightMuted,
          opacity: promise,
          translate: `0 ${(1 - promise) * 16 * u}px`,
          maxWidth: width * 0.8,
          textAlign: "center",
        }}
      >
        Your one-line promise.
      </div>
    </div>
  )
}
