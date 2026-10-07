import type { CSSProperties } from "react"

import { font } from "../theme/fonts"
import { color, radius, size, type } from "../theme/tokens"

type PlaceholderProps = {
  label: string
  note: string
  u: number
  tone?: "light" | "accent"
  style?: CSSProperties
}

// An honest stand-in for a real asset (capture, illustration, sourced number). Replace before the style frames.
export function Placeholder({ label, note, u, tone = "light", style }: PlaceholderProps) {
  const accent = tone === "accent"
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: radius.card * u,
        background: accent ? color.accent : color.surface,
        border: `${2 * u}px solid ${accent ? color.accent : color.line}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14 * u,
        textAlign: "center",
        padding: 40 * u,
        ...style,
      }}
    >
      <div style={{ width: 64 * u, height: 64 * u, borderRadius: radius.pill, border: `${3 * u}px solid ${accent ? color.accentInk : color.line}` }} />
      <div style={{ fontFamily: font.sans, ...type.label, fontSize: size.label * u, color: accent ? color.accentInk : color.ink }}>{label}</div>
      <div style={{ fontFamily: font.sans, ...type.body, fontSize: 30 * u, color: accent ? color.accentInk : color.mutedInk, opacity: accent ? 0.8 : 1 }}>{note}</div>
    </div>
  )
}
