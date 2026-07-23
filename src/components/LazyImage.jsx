import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import FloralSprig from './decor/FloralSprig.jsx'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  // `fill` covers an already-sized parent (e.g. RSVPForm's background photo)
  // — no placeholder height needed since the parent's height doesn't come
  // from this image.
  fill: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  placeholder: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(100deg, ${theme.palette.background.default} 25%, ${theme.palette.secondary.light} 50%, ${theme.palette.background.default} 75%)`,
    backgroundSize: '200% 100%',
    animation: '$shimmer 1.8s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '150% 0' },
    '100%': { backgroundPosition: '-50% 0' },
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
    '50%': { opacity: 0.6, transform: 'scale(1.08)' },
  },
  sprig: {
    width: 36,
    height: 36,
    color: theme.palette.primary.dark,
    animation: '$pulse 1.8s ease-in-out infinite',
  },
  // Sizing for a normal-flow image (drives the wrapper's auto height once
  // loaded). Mutually exclusive with `fill` — never applied together, so
  // there's no cascade-order ambiguity between the two.
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  fade: {
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  imageLoaded: {
    opacity: 1,
  },
}))

// Drop-in <img> replacement that shows a shimmering floral placeholder until
// the real photo has loaded, then cross-fades it in. `fill` mode (for
// absolutely-positioned cover backgrounds) skips the loading min-height,
// since the parent's size doesn't depend on this image in that case.
function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  fill = false,
  placeholderHeight = 260,
  placeholderVariant = 'bloom',
  ...imgProps
}) {
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)

  return (
    <Box
      className={`${classes.wrapper} ${fill ? classes.fill : ''} ${wrapperClassName || ''}`}
      style={!fill && !loaded ? { minHeight: placeholderHeight } : undefined}
    >
      {!loaded && (
        <Box className={classes.placeholder}>
          <FloralSprig variant={placeholderVariant} className={classes.sprig} />
        </Box>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className || ''} ${fill ? classes.fill : classes.image} ${classes.fade} ${loaded ? classes.imageLoaded : ''}`}
        onLoad={() => setLoaded(true)}
        {...imgProps}
      />
    </Box>
  )
}

export default LazyImage
