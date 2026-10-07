import { font } from "../theme/fonts"
import { color, size, type } from "../theme/tokens"

// PLACEHOLDER mark: replace with the product's real logo (SVG paths or a file in public/brand/).
export function BrandMark({ u, inverted = false, withName = true }: { u: number; inverted?: boolean; withName?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 * u }}>
      <div style={{ width: 26 * u, height: 26 * u, borderRadius: 8 * u, background: color.accent }} />
      {withName && <div style={{ fontFamily: font.sans, ...type.label, fontSize: size.label * u, color: inverted ? color.nightInk : color.ink }}>Product name</div>}
    </div>
  )
}
