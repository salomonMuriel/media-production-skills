import { Composition, Folder, Still, type CalculateMetadataFunction } from "remotion"

import { FPS, toFrames } from "./data/fps"
import { timeline } from "./data/timeline"
import { filmSchema, Main, PosterStill, type FilmProps } from "./Main"

// Every format shares one component and one timeline; layouts re-flow per format (useFormat/pick), never crop.
// Flip `active` to register a format. Registered from data on purpose: the formats are one template, not
// independently edited compositions.
const FORMATS = [
  { id: "Wide", poster: "PosterWide", width: 1920, height: 1080, active: true },
  { id: "Tall", poster: "PosterTall", width: 1080, height: 1920, active: true },
  { id: "Square", poster: "PosterSquare", width: 1080, height: 1080, active: false },
  { id: "Feed", poster: "PosterFeed", width: 1080, height: 1350, active: false },
] as const

const filmFrames = (variant: FilmProps["variant"]) => toFrames(timeline(variant).duration, FPS)

// Duration follows the variant's timeline (a slower voice can make the film longer).
const calculateFilmMetadata: CalculateMetadataFunction<FilmProps> = ({ props }) => ({
  durationInFrames: filmFrames(props.variant),
})

export function RemotionRoot() {
  const formats = FORMATS.filter((format) => format.active)
  return (
    <>
      <Folder name="Film">
        {formats.map((format) => (
          <Composition
            key={format.id}
            id={format.id}
            component={Main}
            schema={filmSchema}
            defaultProps={{ variant: "main" }}
            calculateMetadata={calculateFilmMetadata}
            durationInFrames={filmFrames("main")}
            fps={FPS}
            width={format.width}
            height={format.height}
          />
        ))}
      </Folder>
      <Folder name="Posters">
        {formats.map((format) => (
          <Still key={format.poster} id={format.poster} component={PosterStill} schema={filmSchema} defaultProps={{ variant: "main" }} width={format.width} height={format.height} />
        ))}
      </Folder>
    </>
  )
}
