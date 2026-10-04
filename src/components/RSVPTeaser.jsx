import { makeStyles } from "@mui/styles";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FloralSprig from "./decor/FloralSprig.jsx";
import LazyImage from "./LazyImage.jsx";
import { photos } from "../data/photos.js";
import { RSVP_DEADLINE } from "../data/rsvpDeadline.js";

const useStyles = makeStyles((theme) => ({
  // Fixed-height photo section, same pattern as Hero/Venue — size never
  // changes, unlike the old inline form it replaces.
  imageWrap: {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "min(480px, 60vh)",
    overflow: "hidden",
  },
  image: {
    gridArea: "1 / 1",
  },
  imageCrop: {
    objectFit: "cover",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifySelf: "center",
    gap: theme.spacing(1),
  },
  chip: {
    position: "relative",
    gridArea: "1 / 1",
    alignSelf: "center",
    justifySelf: "center",
    height: "fit-content",
    width: "90%",
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
    textAlign: "center",
    marginTop: theme.spacing(3),
  },
  chipSprig: {
    width: 34,
    height: 34,
    margin: "0 auto",
    color: theme.palette.secondary.dark,
    opacity: 0.6,
  },
  heading: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  deadlineLabel: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  deadlineDate: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  cta: {
    marginTop: theme.spacing(3),
  },
}));

function RSVPTeaser({ onOpen }) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const rsvpPhoto = photos[0];

  const formattedDeadline = new Intl.DateTimeFormat(
    i18n.resolvedLanguage === "zh" ? "zh-CN" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(RSVP_DEADLINE);

  return (
    <Box id="rsvp" component="section" className={classes.imageWrap}>
      {rsvpPhoto && (
        <LazyImage
          src={rsvpPhoto.src}
          alt={rsvpPhoto.alt}
          wrapperClassName={classes.image}
          className={classes.imageCrop}
          fill
        />
      )}

      <Box className={classes.chip}>
        <Box className={classes.headerRow}>
          <Typography variant="h4" className={classes.heading}>
            {t("rsvp.heading")}
          </Typography>
          <FloralSprig variant="tulip" className={classes.chipSprig} />
        </Box>
        <Typography variant="body1" className={classes.deadlineLabel}>
          {t("rsvp.deadlineLabel", { date: formattedDeadline })}
        </Typography>
        <Typography variant="body1" className={classes.deadlineDate}>
          {formattedDeadline}
        </Typography>
        <Button
          className={classes.cta}
          variant="contained"
          color="primary"
          onClick={onOpen}
        >
          {t("hero.rsvpCta")}
        </Button>
      </Box>
    </Box>
  );
}

export default RSVPTeaser;
