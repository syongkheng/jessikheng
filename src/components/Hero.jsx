import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CoupleNames from "./hero/CoupleNames.jsx";
import WeddingDate from "./hero/WeddingDate.jsx";
import RsvpCta from "./hero/RsvpCta.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import FloralSprig from "./decor/FloralSprig.jsx";
import LazyImage from "./LazyImage.jsx";
import { photos } from "../data/photos.js";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    textAlign: "center",
  },
  languageSwitcher: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 3,
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
  bottomChip: {
    position: "relative",
    gridArea: "1 / 1",
    alignSelf: "end",
    justifySelf: "center",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "rgba(245, 245, 220, 0.8)",
    width: "90%",
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
    fontSize: "1.75rem",
  },
}));

// Reorder these to change the layout of this section.
function Hero({ onOpenRsvp }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const heroPhoto = photos[0];

  return (
    <Box id="home" component="section" className={classes.root}>
      <Box className={classes.languageSwitcher}>
        <LanguageSwitcher />
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

          <Box className={classes.topChip}>
            <FloralSprig variant="leaf" className={classes.topChipSprig} />
            <Typography variant="overline" className={classes.eyebrow}>
              {t("hero.welcome")}
            </Typography>
            <Typography variant="body2" className={classes.invitationLabel}>
              {t("hero.invitationLabel")}
            </Typography>
            <WeddingDate />
          </Box>

          <Box className={classes.bottomChip}>
            <FloralSprig variant="bloom" className={classes.bottomChipSprig} />
            <CoupleNames variant="h3" className={classes.names} />

            <RsvpCta onClick={onOpenRsvp} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Hero;
