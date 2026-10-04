import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import FloralSprig from "./FloralSprig.jsx";

const WAVE_HEIGHT = 36;

const useStyles = makeStyles((theme) => ({
  // Pulled up over the bottom of the section above so the photo's hard
  // bottom edge is replaced by a soft wave; the strip beneath matches the
  // next section's paper background so the two read as one surface.
  root: {
    position: "relative",
    marginTop: -WAVE_HEIGHT + 1,
    zIndex: 1
  },
  // Between two sections that already share a background there's no photo
  // edge to soften, so the wave is dropped and only the ornament remains.
  rootFlat: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 3),
  },
  wave: {
    display: "block",
    width: "100%",
    height: WAVE_HEIGHT,
    color: theme.palette.background.paper,
    // Casts the shadow up onto the photo; the svg's default overflow clip
    // would cut it off, so it has to be visible.
    overflow: "visible",
    filter: "drop-shadow(0 -4px 6px rgba(0, 0, 0, 0.25))",
  },
  // Positioned so it paints over the wave's shadow — a filtered svg is
  // otherwise stacked above non-positioned siblings, which would let the
  // shadow bleed down onto this strip.
  ornament: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1.5),
    padding: theme.spacing(0, 3, 1),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.dark,
  },
  line: {
    flex: "0 1 90px",
    height: 1,
    background: `linear-gradient(to var(--dir), transparent, ${theme.palette.secondary.main})`,
  },
  lineLeft: { "--dir": "right" },
  lineRight: { "--dir": "left" },
  bloom: {
    width: 44,
    height: 44,
    opacity: 0.85,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
  },
}));

// Decorative transition between two full-width sections. By default: a wave
// edge that overlaps the section above, then a gold hairline + sprig
// ornament. `wave={false}` keeps only the ornament, for sections that share
// a background. `sprig` picks the FloralSprig variant in the middle.
function SectionDivider({ wave = true, sprig = "blossom" }) {
  const classes = useStyles();

  return (
    <Box className={wave ? classes.root : classes.rootFlat} aria-hidden="true">
      {wave && (
        <svg
          className={classes.wave}
          viewBox="0 0 1440 36"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0 36 V22 C 180 2, 360 2, 540 16 C 720 30, 900 30, 1080 14 C 1210 3, 1330 6, 1440 18 V36 Z"
          />
        </svg>
      )}
      <Box className={classes.ornament}>
        <Box className={`${classes.line} ${classes.lineLeft}`} />
        <Box className={classes.dot} />
        <FloralSprig variant={sprig} className={classes.bloom} />
        <Box className={classes.dot} />
        <Box className={`${classes.line} ${classes.lineRight}`} />
      </Box>
    </Box>
  );
}

export default SectionDivider;
