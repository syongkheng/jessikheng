import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CoupleNames from "./hero/CoupleNames.jsx";
import WeddingDateVenue from "./hero/WeddingDateVenue.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import FloralSprig from "./decor/FloralSprig.jsx";
import LazyImage from "./LazyImage.jsx";
import { photos } from "../data/photos.js";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    textAlign: "center",
  },
  welcome: {
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontSize: "0.85rem",
  },
  languageSwitcher: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 3,
  },
  // Sits above heroPhoto (zIndex auto) but below languageSwitcher (zIndex 3)
  // — the couple's names overlapping the top of the background photo,
  // standing in for a text header.
  headlineWrap: {
    position: "absolute",
    top: theme.spacing(10),
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    zIndex: 2,
    pointerEvents: "none",
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    padding: theme.spacing(2, 1),
    borderRadius: theme.shape.borderRadius * 2,
  },
  headlineLine: {
    display: "block",
    fontSize: "3rem",
    lineHeight: 1,
    color: "#2f4f4f",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
  },
  // Two static rules picked in JS (not a JSS dynamic prop-function value)
  // and forced with !important, so the font-family is never left to a
  // cascade/specificity tie against anything else on the page.
  headlineLineEn: {
    fontFamily: '"Moon Dance", cursive !important',
  },
  headlineLineZh: {
    // Self-hosted subset covering just the couple's own Chinese name — see
    // index.css and public/fonts/LICENSE-851tegakizatsu.txt.
    fontFamily: '"Tegaki851", cursive !important',
  },
  headlineLineLeft: {
    textAlign: "left",
  },
  headlineLineRight: {
    textAlign: "right",
  },
  // Grid stacks image/topChip/bottomChip in the same cell, each chip sized
  // to its own content (justifySelf/alignSelf) rather than the full image.
  // Height is now fixed (not content-driven) so the portrait photo can be
  // cropped via object-fit: cover to fill more of the screen.
  imageWrap: {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "min(640px, 78vh)",
    overflow: "hidden",
  },
  image: {
    gridArea: "1 / 1",
  },
  imageCrop: {
    objectFit: "cover",
    scale: "1.25",
    transform: "translateX(-30px)",
  },
  topChip: {
    position: "relative",
    gridArea: "1 / 1",
    alignSelf: "start",
    justifySelf: "center",
    marginTop: theme.spacing(7),
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "#fff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    width: "90%",
  },
  topChipSprig: {
    position: "absolute",
    top: -12,
    left: -12,
    width: 34,
    height: 34,
    color: theme.palette.secondary.dark,
    opacity: 0.6,
    transform: "rotate(-25deg)",
  },
  eyebrow: {
    display: "block",
    color: theme.palette.secondary.dark,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    fontSize: "0.8rem",
  },
  invitationLabel: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  },
  rsvpDate: {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  rsvpVenue: {
    color: theme.palette.text.primary,
    fontWeight: 400,
  },
  bottomChip: {
    position: "relative",
    gridArea: "1 / 1",
    alignSelf: "end",
    justifySelf: "center",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5, 3),
    // borderRadius: theme.shape.borderRadius * 2,
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    // width: "90%",
  },
  bottomChipSprig: {
    position: "absolute",
    bottom: -12,
    right: -12,
    width: 36,
    height: 36,
    color: theme.palette.primary.dark,
    opacity: 0.6,
    transform: "rotate(15deg)",
  },
  names: {
    fontSize: "1.2rem",
  },
}));

// Reorder these to change the layout of this section.
function Hero() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.resolvedLanguage === "zh";
  const classes = useStyles();
  const headlineFontClass = isZh
    ? classes.headlineLineZh
    : classes.headlineLineEn;
  const heroPhoto = photos[0];

  return (
    <Box id="home" component="section" className={classes.root}>
      <Box className={classes.languageSwitcher}>
        <LanguageSwitcher />
      </Box>

      <Box className={classes.headlineWrap}>
        {/* Plain Box, not Typography — Typography always applies an MUI
            variant class (even variant="inherit" is still its own rule,
            just one that resolves to `font-family: inherit`), which sits at
            the same CSS specificity as headlineLine and can win the
            cascade tie depending on injection order. A Box has no
            competing font-family rule, so headlineLine always applies. */}
        <Typography variant="body1" className={`${classes.welcome}`}>
          {t("hero.welcome")}
        </Typography>
        <Box
          component="span"
          className={`${classes.headlineLine} ${headlineFontClass} ${classes.headlineLineLeft}`}
        >
          {t("hero.coupleNameTwo")}
        </Box>
        <Box
          component="span"
          className={`${classes.headlineLine} ${headlineFontClass} ${classes.headlineLineRight}`}
        >
          &amp; {t("hero.coupleNameOne")}
        </Box>
        <WeddingDateVenue />
      </Box>

      {heroPhoto && (
        <Box className={classes.imageWrap}>
          <LazyImage
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            wrapperClassName={classes.image}
            className={classes.imageCrop}
            fill
          />

          <Box className={classes.bottomChip}>
            <FloralSprig variant="bloom" className={classes.bottomChipSprig} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Hero;
