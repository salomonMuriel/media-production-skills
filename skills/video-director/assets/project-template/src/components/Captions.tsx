import { useMemo } from "react"

import { CAPTION_RULES, captionHiddenSpans, captionPages } from "../data/captions"
import { useTimeline } from "../lib/clock"
import { useFormat } from "../lib/format"
import { sp, springs, useTime } from "../lib/motion"
import { font } from "../theme/fonts"
import { color, radius, size } from "../theme/tokens"

// Word-synced captions: short pages from the VO word timings, the spoken word lit from its first frame (never
// before). Hidden where big kinetic type already says the same words.
export function Captions() {
  const time = useTime()
  const t = useTimeline()
  const format = useFormat()
  const { u, tall, height, safe } = format
  const maxChars = tall ? CAPTION_RULES.maxCharsTall : CAPTION_RULES.maxCharsWide
  const pages = useMemo(() => captionPages(t, maxChars), [t, maxChars])
  const hidden = useMemo(() => captionHiddenSpans(t), [t])

  if (hidden.some((span) => time >= span.start && time < span.end)) return null
  const page = pages.find((candidate) => time >= candidate.start && time < candidate.end)
  if (!page) return null

  const enter = sp(time, page.start, springs.snappy)
  const fontSize = (tall ? size.captionTall : size.captionWide) * u
  const top = tall ? height - safe.bottom - fontSize * 2.2 : height - safe.bottom - fontSize * 0.6

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: fontSize * 0.26,
          maxWidth: (tall ? 940 : 1500) * u,
          padding: `${fontSize * 0.24}px ${fontSize * 0.5}px ${fontSize * 0.28}px`,
          borderRadius: radius.pill,
          background: color.surface,
          boxShadow: `0 ${2 * u}px 0 ${color.line}`,
          translate: `0 ${(1 - enter) * 12 * u}px`,
          opacity: Math.min(1, enter * 2),
        }}
      >
        {page.words.map((word) => {
          const lit = time >= word.start
          const speaking = lit && time < word.end + 0.12
          return (
            <span
              key={`${word.start}-${word.text}`}
              style={{
                fontFamily: font.sans,
                fontWeight: 650,
                fontSize,
                lineHeight: 1.15,
                color: color.ink,
                opacity: lit ? 1 : 0.4,
                backgroundImage: `linear-gradient(${color.accent}, ${color.accent})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 96%",
                backgroundSize: `${speaking ? 100 : 0}% ${Math.max(3, 4 * u)}px`,
              }}
            >
              {word.text}
            </span>
          )
        })}
      </div>
    </div>
  )
}
