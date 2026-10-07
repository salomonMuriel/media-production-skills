import type { CSSProperties } from "react"

import { ease, sp, springs, tw, type SpringPreset } from "../lib/motion"

export type KineticWord = {
  text: string
  // Film second the word starts rising. Omit to stagger from `start` by `stagger`.
  at?: number
  preset?: SpringPreset
  style?: CSSProperties
}

type KineticWordsProps = {
  words: KineticWord[]
  time: number
  fontSize: number
  textStyle: CSSProperties
  start?: number
  // ~55 ms between words; keep a whole beat's stagger under ~0.5 s.
  stagger?: number
  exitAt?: number
  align?: "flex-start" | "center" | "flex-end"
  style?: CSSProperties
}

// Masked rise: each word climbs out of its own baseline mask with a small rotation, on its own spring. Exits
// accelerate up and out in reading order.
export function KineticWords({ words, time, fontSize, textStyle, start = 0, stagger = 0.055, exitAt, align = "flex-start", style }: KineticWordsProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: align, columnGap: fontSize * 0.24, ...style }}>
      {words.map((word, index) => {
        const at = word.at ?? start + index * stagger
        const rise = sp(time, at, word.preset ?? springs.settle)
        const out = exitAt === undefined ? 0 : tw(time, exitAt + index * 0.022, exitAt + index * 0.022 + 0.3, 0, 1, ease.in)
        return (
          <span
            key={`${word.text}-${index}`}
            style={{ display: "inline-block", overflow: "hidden", paddingBottom: fontSize * 0.16, marginBottom: -fontSize * 0.16 }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize,
                ...textStyle,
                ...word.style,
                translate: `0 ${(1 - rise) * 105 - out * 110}%`,
                rotate: `${(1 - Math.min(1, rise)) * 6}deg`,
                opacity: time >= at && out < 1 ? 1 : 0,
              }}
            >
              {word.text}
            </span>
          </span>
        )
      })}
    </div>
  )
}
