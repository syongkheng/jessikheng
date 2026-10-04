// Small hand-drawn line-art botanical accents. `variant` picks the shape,
// everything else (size/color/rotation) is controlled by the caller via
// className/style — stroke uses currentColor so it inherits text color.
//
// Every shape is drawn in the same 64x64 box with a 1.5 stroke, so any
// variant can be swapped for another without re-tuning size or color.
// Add a new shape by adding an entry to SPRIGS (and to VARIANTS' docs below).

// Variants: leaf (default), bloom, heart, rose, tulip, daisy, lotus,
// blossom, olive, fern, vine, wreath, buds.
const SPRIGS = {
  leaf: (
    <>
      <path d="M8 56 C 20 46, 28 34, 40 20 C 44 15, 48 12, 54 8" />
      <path d="M18 47 C 14 43, 12 38, 14 33" />
      <path d="M18 47 C 22 44, 26 42, 30 44" />
      <path d="M28 36 C 24 33, 21 29, 22 24" />
      <path d="M28 36 C 32 33, 36 32, 39 34" />
      <path d="M38 25 C 34 22, 32 18, 33 14" />
      <path d="M38 25 C 42 23, 45 22, 48 24" />
    </>
  ),

  bloom: (
    <>
      <path d="M32 58 C 30 46, 30 34, 32 24" />
      <path d="M32 44 C 27 42, 23 44, 21 48" />
      <path d="M32 48 C 37 46, 41 48, 43 52" />
      {/* Closed petal loops read as a flower at small sizes; thin radiating
          lines alone blur into a faint asterisk once scaled down. */}
      <path d="M32 14 C 28 12, 26 8, 29 5 C 32 8, 32 11, 32 14 Z" />
      <path d="M32 14 C 36 12, 38 8, 35 5 C 32 8, 32 11, 32 14 Z" />
      <path d="M32 14 C 30 10, 27 8, 24 10 C 27 12, 30 13, 32 14 Z" />
      <path d="M32 14 C 34 10, 37 8, 40 10 C 37 12, 34 13, 32 14 Z" />
      <path d="M32 14 C 30 17, 28 20, 30 23 C 32 21, 32 17, 32 14 Z" />
      <circle cx="32" cy="14" r="2.2" />
    </>
  ),

  // Solid fill, so it carries its own svg attributes (see SOLID below).
  heart: (
    <path d="M32 50 C 10 34, 6 18, 18 10 C 26 5, 32 12, 32 18 C 32 12, 38 5, 46 10 C 58 18, 54 34, 32 50 Z" />
  ),

  // Spiral-petalled rose seen from the front, on a short leafy stem.
  rose: (
    <>
      <path d="M32 60 C 31 52, 31 46, 32 40" />
      <path d="M32 54 C 26 54, 22 51, 21 46 C 26 46, 30 49, 32 54 Z" />
      <path d="M32 50 C 38 50, 42 47, 43 42 C 38 42, 34 45, 32 50 Z" />
      <path d="M32 40 C 20 40, 14 30, 18 21 C 21 13, 30 8, 38 11 C 47 14, 50 24, 45 32 C 42 38, 37 40, 32 40 Z" />
      <path d="M27 31 C 25 24, 31 18, 37 21 C 42 24, 40 31, 34 32 C 30 33, 27 30, 29 26 C 30 24, 34 24, 35 27" />
    </>
  ),

  // Closed tulip cup with two long, arching leaves.
  tulip: (
    <>
      <path d="M32 60 C 32 48, 32 40, 32 32" />
      <path d="M32 56 C 24 54, 16 46, 14 36 C 22 40, 29 47, 32 56 Z" />
      <path d="M32 52 C 40 50, 46 44, 48 36 C 41 39, 35 44, 32 52 Z" />
      <path d="M32 33 C 22 32, 19 22, 21 12 C 25 15, 29 18, 32 23 C 35 18, 39 15, 43 12 C 45 22, 42 32, 32 33 Z" />
      <path d="M32 33 C 30 28, 30 25, 32 23 C 34 25, 34 28, 32 33" />
    </>
  ),

  // Round daisy: eight rounded petals around a centre disc.
  daisy: (
    <>
      <path d="M32 62 C 31 54, 31 48, 32 42" />
      <path d="M32 56 C 27 55, 24 52, 23 48 C 28 48, 31 51, 32 56 Z" />
      <circle cx="32" cy="24" r="4" />
      <path d="M32 20 C 28 14, 29 8, 32 6 C 35 8, 36 14, 32 20 Z" />
      <path d="M32 28 C 28 34, 29 40, 32 42 C 35 40, 36 34, 32 28 Z" />
      <path d="M28 24 C 22 20, 16 21, 14 24 C 16 27, 22 28, 28 24 Z" />
      <path d="M36 24 C 42 20, 48 21, 50 24 C 48 27, 42 28, 36 24 Z" />
      <path d="M29.2 21.2 C 26 15, 21 12, 18 13 C 18 17, 22 22, 29.2 21.2 Z" />
      <path d="M34.8 21.2 C 38 15, 43 12, 46 13 C 46 17, 42 22, 34.8 21.2 Z" />
      <path d="M29.2 26.8 C 26 33, 21 36, 18 35 C 18 31, 22 26, 29.2 26.8 Z" />
      <path d="M34.8 26.8 C 38 33, 43 36, 46 35 C 46 31, 42 26, 34.8 26.8 Z" />
    </>
  ),

  // Open lotus: three layered pointed petals resting on water lines.
  lotus: (
    <>
      <path d="M32 50 C 24 44, 22 32, 32 14 C 42 32, 40 44, 32 50 Z" />
      <path d="M30 50 C 20 48, 12 40, 10 28 C 20 30, 27 38, 30 50 Z" />
      <path d="M34 50 C 44 48, 52 40, 54 28 C 44 30, 37 38, 34 50 Z" />
      <path d="M22 50 C 14 49, 8 45, 5 40" />
      <path d="M42 50 C 50 49, 56 45, 59 40" />
      <path d="M14 56 L 50 56" />
      <path d="M22 60 L 42 60" />
    </>
  ),

  // Five-petal cherry blossom with notched petal tips and stamens.
  blossom: (
    <>
      <path d="M32 31 C 26 26, 25 16, 29 9 C 31 10, 32 12, 32 13 C 32 12, 33 10, 35 9 C 39 16, 38 26, 32 31 Z" />
      <path d="M32 31 C 35 24, 43 19, 51 21 C 51 23, 50 25, 49 26 C 51 26, 53 27, 54 29 C 48 36, 38 36, 32 31 Z" />
      <path d="M32 31 C 40 31, 46 38, 46 46 C 44 46, 42 46, 41 45 C 42 47, 42 49, 41 51 C 33 52, 28 44, 32 31 Z" />
      <path d="M32 31 C 24 31, 18 38, 18 46 C 20 46, 22 46, 23 45 C 22 47, 22 49, 23 51 C 31 52, 36 44, 32 31 Z" />
      <path d="M32 31 C 29 24, 21 19, 13 21 C 13 23, 14 25, 15 26 C 13 26, 11 27, 10 29 C 16 36, 26 36, 32 31 Z" />
      <path d="M32 31 L 32 24" />
      <path d="M32 31 L 27 26" />
      <path d="M32 31 L 37 26" />
      <circle cx="32" cy="23" r="1" />
      <circle cx="26.5" cy="25.5" r="1" />
      <circle cx="37.5" cy="25.5" r="1" />
    </>
  ),

  // Olive branch: a gently curved stem with paired narrow leaves and olives.
  olive: (
    <>
      <path d="M10 56 C 22 50, 38 38, 54 10" />
      <path d="M17 52 C 11 51, 7 46, 6 41 C 12 41, 16 46, 17 52 Z" />
      <path d="M21 49 C 24 43, 30 41, 35 43 C 33 49, 27 51, 21 49 Z" />
      <path d="M28 43 C 22 40, 20 34, 22 29 C 28 31, 30 37, 28 43 Z" />
      <path d="M33 38 C 38 34, 44 34, 48 37 C 44 42, 38 42, 33 38 Z" />
      <path d="M39 30 C 34 26, 33 20, 35 16 C 40 18, 42 24, 39 30 Z" />
      <path d="M44 24 C 49 21, 54 22, 57 25 C 53 29, 48 29, 44 24 Z" />
      <ellipse cx="14" cy="56" rx="2.5" ry="3.5" transform="rotate(-20 14 56)" />
      <ellipse cx="28" cy="52" rx="2.5" ry="3.5" transform="rotate(10 28 52)" />
    </>
  ),

  // Fern frond: a curved spine with leaflets that shrink toward the tip.
  fern: (
    <>
      <path d="M32 60 C 30 44, 32 28, 40 8" />
      <path d="M31 54 C 24 54, 18 50, 15 44" />
      <path d="M31 54 C 38 54, 43 50, 45 44" />
      <path d="M31 46 C 25 45, 20 41, 18 35" />
      <path d="M31 46 C 38 45, 42 41, 43 36" />
      <path d="M32 38 C 27 36, 23 32, 22 27" />
      <path d="M33 38 C 39 36, 42 32, 42 28" />
      <path d="M34 30 C 30 28, 27 24, 27 20" />
      <path d="M35 30 C 40 28, 42 24, 42 20" />
      <path d="M37 21 C 34 19, 33 16, 33 13" />
      <path d="M38 21 C 41 19, 42 16, 42 13" />
    </>
  ),

  // Curling vine with tendril spirals and small heart-shaped leaves.
  vine: (
    <>
      <path d="M6 44 C 14 30, 26 36, 32 30 C 38 24, 36 14, 46 12 C 54 11, 58 18, 54 23 C 51 26, 46 24, 47 20" />
      <path d="M18 36 C 18 44, 14 50, 8 52 C 8 46, 12 40, 18 36 Z" />
      <path d="M28 34 C 32 40, 38 42, 44 40 C 42 34, 36 31, 28 34 Z" />
      <path d="M36 22 C 30 20, 26 14, 28 8 C 34 10, 38 16, 36 22 Z" />
      <path d="M12 40 C 8 38, 6 34, 8 31 C 11 31, 12 35, 10 36" />
    </>
  ),

  // Open laurel wreath — two mirrored leafy arcs, with room in the middle
  // for text or an initial.
  wreath: (
    <>
      <path d="M32 56 C 14 54, 6 40, 8 24" />
      <path d="M32 56 C 50 54, 58 40, 56 24" />
      <path d="M14 48 C 8 48, 5 44, 4 40 C 9 39, 13 42, 14 48 Z" />
      <path d="M9 36 C 3 34, 2 30, 3 26 C 8 27, 11 30, 9 36 Z" />
      <path d="M9 24 C 5 20, 6 16, 8 13 C 12 15, 13 19, 9 24 Z" />
      <path d="M22 54 C 18 50, 18 46, 20 43 C 24 45, 25 50, 22 54 Z" />
      <path d="M50 48 C 56 48, 59 44, 60 40 C 55 39, 51 42, 50 48 Z" />
      <path d="M55 36 C 61 34, 62 30, 61 26 C 56 27, 53 30, 55 36 Z" />
      <path d="M55 24 C 59 20, 58 16, 56 13 C 52 15, 51 19, 55 24 Z" />
      <path d="M42 54 C 46 50, 46 46, 44 43 C 40 45, 39 50, 42 54 Z" />
    </>
  ),

  // Three small buds on bowed stems — a light filler accent.
  buds: (
    <>
      <path d="M32 60 C 32 50, 32 42, 32 34" />
      <path d="M32 54 C 26 50, 20 44, 18 34" />
      <path d="M32 54 C 38 50, 44 44, 46 34" />
      <path d="M32 34 C 28 30, 28 24, 32 19 C 36 24, 36 30, 32 34 Z" />
      <path d="M18 34 C 14 30, 14 25, 18 20 C 22 25, 22 30, 18 34 Z" />
      <path d="M46 34 C 42 30, 42 25, 46 20 C 50 25, 50 30, 46 34 Z" />
      <path d="M32 46 C 28 46, 25 44, 24 41" />
    </>
  ),
}

// Names of every available shape, in display order (used by the preview page).
export const SPRIG_VARIANTS = Object.keys(SPRIGS)

// The heart is a filled silhouette; every other shape is line art.
const SOLID = new Set(['heart'])

function FloralSprig({ variant = 'leaf', className, style }) {
  const shape = SPRIGS[variant] ?? SPRIGS.leaf
  const solid = SOLID.has(variant)

  return (
    <svg
      viewBox="0 0 64 64"
      fill={solid ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin={solid ? 'round' : undefined}
      className={className}
      style={style}
      aria-hidden="true"
    >
      {shape}
    </svg>
  )
}

export default FloralSprig
