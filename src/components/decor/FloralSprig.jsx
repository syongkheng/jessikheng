// Small hand-drawn line-art botanical accents. `variant` picks the shape,
// everything else (size/color/rotation) is controlled by the caller via
// className/style — stroke uses currentColor so it inherits text color.
function FloralSprig({ variant = 'leaf', className, style }) {
  if (variant === 'bloom') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={className}
        style={style}
        aria-hidden="true"
      >
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
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M8 56 C 20 46, 28 34, 40 20 C 44 15, 48 12, 54 8" />
      <path d="M18 47 C 14 43, 12 38, 14 33" />
      <path d="M18 47 C 22 44, 26 42, 30 44" />
      <path d="M28 36 C 24 33, 21 29, 22 24" />
      <path d="M28 36 C 32 33, 36 32, 39 34" />
      <path d="M38 25 C 34 22, 32 18, 33 14" />
      <path d="M38 25 C 42 23, 45 22, 48 24" />
    </svg>
  )
}

export default FloralSprig
