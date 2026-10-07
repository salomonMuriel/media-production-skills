import { createContext, useContext, type ReactNode } from "react"

import { DEFAULT_VARIANT, type Variant } from "../data/vo"
import { timeline, type Timeline } from "../data/timeline"

const FrameOffset = createContext(0)
const VariantContext = createContext<Variant>(DEFAULT_VARIANT)

export function useFrameOffset(): number {
  return useContext(FrameOffset)
}

export function FrameOffsetProvider({ offset, children }: { offset: number; children: ReactNode }) {
  return <FrameOffset.Provider value={offset}>{children}</FrameOffset.Provider>
}

export function VariantProvider({ variant, children }: { variant: Variant; children: ReactNode }) {
  return <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>
}

// The timeline of the variant this render was started with (the `variant` input prop, editable in Studio).
export function useTimeline(): Timeline {
  return timeline(useContext(VariantContext))
}
