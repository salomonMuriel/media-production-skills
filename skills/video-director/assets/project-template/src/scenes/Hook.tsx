import { BrandMark } from "../components/BrandMark"
import { KineticWords } from "../components/KineticWords"
import { useTimeline } from "../lib/clock"
import { pick, useFormat } from "../lib/format"
import { ease, sp, springs, tw, useTime } from "../lib/motion"
import { font } from "../theme/fonts"
import { color, size, type } from "../theme/tokens"

const PROMISE = ["Your", "one-line", "promise."] as const

// 0 to 2 bars. The promise rises word by word as the voice says it; the key word gets one accent underline.
export function Hook() {
  const time = useTime()
  const t = useTimeline()
  const format = useFormat()
  const { u, safe, width, height } = format
  const fontSize = pick(format, { wide: size.display, tall: 150, feed: 140, square: 140 }) * u
  const keyWordAt = t.wordAt("l01", "promise")
  const underline = tw(time, keyWordAt + 0.2, keyWordAt + 0.55, 0, 1, ease.out)
  const mark = sp(time, 0.15, springs.settle)

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: safe.x, top: safe.top, opacity: Math.min(1, mark * 2), translate: `0 ${(1 - mark) * 16 * u}px` }}>
        <BrandMark u={u} />
      </div>
      <div style={{ position: "absolute", left: safe.x, right: safe.x, top: height * pick(format, { wide: 0.5, tall: 0.42 }), translate: "0 -50%" }}>
        <KineticWords
          time={time}
          fontSize={fontSize}
          textStyle={{ fontFamily: font.sans, ...type.display, color: color.ink }}
          words={PROMISE.map((word) => ({
            text: word,
            at: t.wordAt("l01", word),
            style: word === "promise." ? { backgroundImage: `linear-gradient(${color.accent}, ${color.accent})`, backgroundRepeat: "no-repeat", backgroundPosition: "0 92%", backgroundSize: `${underline * 100}% ${0.07 * fontSize}px` } : undefined,
          }))}
          style={{ maxWidth: pick(format, { wide: width * 0.8, tall: width - safe.x * 2 }) }}
        />
      </div>
    </div>
  )
}
