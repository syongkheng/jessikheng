import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FloralSprig from "./decor/FloralSprig.jsx";
import { WEDDING_DATE } from "../data/weddingDate.js";
import { photos } from "../data/photos.js";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
  // Full-bleed image with content grid-stacked on top, same pattern as Hero.
  imageWrap: {
    display: "grid",
    width: "100%",
  },
  image: {
    gridArea: "1 / 1",
    display: "block",
    width: "100%",
    height: "auto",
  },
  overlay: {
    gridArea: "1 / 1",
    alignSelf: "center",
    justifySelf: "center",
    padding: theme.spacing(4, 3),
  },
  headingChip: {
    position: "relative",
    display: "inline-block",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "#fff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
  },
  headingSprig: {
    position: "absolute",
    top: -12,
    left: -12,
    width: 34,
    height: 34,
    color: theme.palette.primary.dark,
    opacity: 0.6,
    transform: "rotate(-20deg)",
  },
  heading: {
    color: theme.palette.text.primary,
  },
  tiles: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
  tile: {
    minWidth: 76,
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.14)",
  },
  value: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    lineHeight: 1,
  },
  label: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontSize: "0.75rem",
  },
  marriedChip: {
    padding: theme.spacing(2, 4),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  married: {
    color: theme.palette.primary.dark,
  },
}));

function getTimeRemaining() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return null;
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Countdown() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState(getTimeRemaining);
  const countdownPhoto = photos[2] ?? photos[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = remaining
    ? [
        { label: t("countdown.days"), value: remaining.days },
        { label: t("countdown.hours"), value: remaining.hours },
        { label: t("countdown.minutes"), value: remaining.minutes },
        { label: t("countdown.seconds"), value: remaining.seconds },
      ]
    : [];

  return (
    <Box id="countdown" component="section" className={classes.root}>
      <Box className={classes.imageWrap}>
        {countdownPhoto && (
          <img
            src={countdownPhoto.src}
            alt={countdownPhoto.alt}
            className={classes.image}
          />
        )}

        <Box className={classes.overlay}>
          {remaining ? (
            <>
              <Box className={classes.headingChip}>
                <FloralSprig variant="leaf" className={classes.headingSprig} />
                {/* <Typography variant="h3" className={classes.heading}>
                  {t('countdown.heading')}
                </Typography> */}
                <Box className={classes.tiles}>
                  {units.map((unit) => (
                    <Box key={unit.label} className={classes.tile}>
                      <Typography variant="h4" className={classes.value}>
                        {String(unit.value).padStart(2, "0")}
                      </Typography>
                      <Typography variant="body2" className={classes.label}>
                        {unit.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          ) : (
            <Box className={classes.marriedChip}>
              <Typography variant="h3" className={classes.married}>
                {t("countdown.married")}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Countdown;
