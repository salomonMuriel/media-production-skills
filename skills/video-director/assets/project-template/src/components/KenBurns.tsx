import type { CSSProperties, ReactNode } from "react"

import { twScale, tw, ease } from "../lib/motion"

type KenBurnsProps = {
  time: number
  start: number
  end: number
  // 1 -> 1.03-1.06 by default; 1.08+ only for holds longer than ~4 s.
  fromScale?: number
  toScale?: number
  // Pan in px over the shot (already multiplied by u).
  panX?: number
  panY?: number
  style?: CSSProperties
  children: ReactNode
}

// Slow push on a still. Across a cut where both shots move, keep the sign (push into push) and vary the axis
// instead of flipping in and out.
export function KenBurns({ time, start, end, fromScale = 1, toScale = 1.05, panX = 0, panY = 0, style, children }: KenBurnsProps) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: String(twScale(time, start, end, fromScale, toScale)),
          translate: `${tw(time, start, end, 0, panX, ease.inOut)}px ${tw(time, start, end, 0, panY, ease.inOut)}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
