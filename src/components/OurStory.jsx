import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FloralSprig from "./decor/FloralSprig.jsx";
import { photos } from "../data/photos.js";
import LazyImage from "./LazyImage.jsx";
import TimelineCarousel from "./TimelineCarousel.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(6, 6, 2, 6),
    backgroundColor: theme.palette.background.paper,
  },
  inner: {
    maxWidth: 640,
    margin: "0 auto",
  },
  headingSprig: {
    width: 34,
    height: 34,
    margin: "0 auto",
    color: theme.palette.secondary.dark,
    opacity: 0.6,
  },
  closingSprig: {
    display: "block",
    width: 40,
    height: 40,
    margin: "0 auto",
    paddingBottom: theme.spacing(2),
    color: theme.palette.primary.dark,
    opacity: 0.6,
    boxSizing: "content-box",
  },
  heading: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
    textAlign: "center",
  },
  paragraph: {
    color: theme.palette.text.secondary,
    lineHeight: 1.8,
    padding: theme.spacing(1, 6, 2, 6),
  },
}));

function OurStory() {
  const classes = useStyles();
  const { t } = useTranslation();
  const backviewPhoto = photos[3];

  return (
    <div>
      <Box id="our-story" component="section" className={classes.root}>
        <Box className={classes.inner}>
          <Typography variant="h4" className={classes.heading}>
            {t("story.heading")}
          </Typography>
          <TimelineCarousel />
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph1")}
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph2")}
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph3")}
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph4")}
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph5")}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default OurStory;
