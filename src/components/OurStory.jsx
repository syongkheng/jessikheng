import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FloralSprig from "./decor/FloralSprig.jsx";
import { photos } from "../data/photos.js";
import LazyImage from "./LazyImage.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 6, 2, 6),
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
  heading: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
    textAlign: "center",
  },
  paragraph: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    lineHeight: 1.8,
  },
}));

// Replace the story.paragraph1/paragraph2 keys in the locale files with the
// couple's real story.
function OurStory() {
  const classes = useStyles();
  const { t } = useTranslation();
  const backviewPhoto = photos[3];

  return (
    <div>
      <Box id="our-story" component="section" className={classes.root}>
        <Box className={classes.inner}>
          <FloralSprig variant="bloom" className={classes.headingSprig} />
          <Typography variant="h4" className={classes.heading}>
            {t("story.heading")}
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph1")}
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            {t("story.paragraph2")}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default OurStory;
