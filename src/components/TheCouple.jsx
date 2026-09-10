import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { photos } from "../data/photos.js";
import LazyImage from "./LazyImage.jsx";
import FloralSprig from "./decor/FloralSprig.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 1, 1, 1),
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 16px 1fr",
    columnGap: theme.spacing(0),
    rowGap: theme.spacing(0),
    alignItems: "center",
    maxWidth: 640,
    margin: "0 auto",
  },
  image: {
    borderRadius: theme.shape.borderRadius * 2,
    overflow: "hidden",
  },
  groomCol: {
    gridColumn: "1",
  },
  brideCol: {
    gridColumn: "3",
  },
  imageRow: {
    gridRow: "1",
  },
  titleRow: {
    gridRow: "2",
    textAlign: "center",
  },
  nameRow: {
    gridRow: "3",
    textAlign: "center",
  },
  heart: {
    gridColumn: "2",
    gridRow: "2",
    justifySelf: "center",
    width: 35,
    height: 22,
    color: theme.palette.secondary.dark,
    opacity: 0.8,
  },
  title: {
    marginTop: theme.spacing(0),
    display: "block",
    color: theme.palette.secondary.dark,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontSize: "1.25rem",
    lineHeight: 2,
  },
  name: {
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
    lineHeight: 1.5,
  },
  headlineLineEn: {
    fontFamily: '"Moon Dance", cursive !important',
  },
  headlineLineZh: {
    // Self-hosted subset covering just the couple's own Chinese name — see
    // index.css and public/fonts/LICENSE-851tegakizatsu.txt.
    fontFamily: '"Tegaki851", cursive !important',
  },
}));

// Placeholder photos below are pulled from the shared `photos` array —
// swap them for the couple's actual portraits once available.
function TheCouple() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const isZh = i18n.resolvedLanguage === "zh";
  const headlineFontClass = isZh
    ? classes.headlineLineZh
    : classes.headlineLineEn;
  const groomPhoto = photos[1];
  const bridePhoto = photos[1];
  const backviewPhoto = undefined // photos[3];

  return (
    <div>
      {backviewPhoto && (
        <div>
          <LazyImage
            src={backviewPhoto.src}
            alt={backviewPhoto.alt}
            wrapperClassName={classes.image}
            placeholderHeight={420}
            placeholderVariant="leaf"
          />
        </div>
      )}
      <Box component="section" className={classes.root}>
        <Box className={classes.grid}>
          <Box className={`${classes.groomCol} ${classes.imageRow}`}>
            {groomPhoto && (
              <LazyImage
                src={groomPhoto.src}
                alt={groomPhoto.alt}
                wrapperClassName={classes.image}
                placeholderHeight={220}
                placeholderVariant="leaf"
              />
            )}
          </Box>
          <Box className={`${classes.brideCol} ${classes.imageRow}`}>
            {bridePhoto && (
              <LazyImage
                src={bridePhoto.src}
                alt={bridePhoto.alt}
                wrapperClassName={classes.image}
                placeholderHeight={220}
                placeholderVariant="bloom"
              />
            )}
          </Box>

          <Box className={`${classes.groomCol} ${classes.titleRow}`}>
            <Typography variant="overline" className={classes.title}>
              {t("couple.groomLabel")}
            </Typography>
          </Box>
          <FloralSprig variant="heart" className={classes.heart} />
          <Box className={`${classes.brideCol} ${classes.titleRow}`}>
            <Typography variant="overline" className={classes.title}>
              {t("couple.brideLabel")}
            </Typography>
          </Box>

          <Box className={`${classes.groomCol} ${classes.nameRow}`}>
            <Typography
              variant="h6"
              className={`${classes.name} ${headlineFontClass}`}
            >
              {t("hero.coupleNameTwo")}
            </Typography>
          </Box>
          <Box className={`${classes.brideCol} ${classes.nameRow}`}>
            <Typography
              variant="h6"
              className={`${classes.name} ${headlineFontClass}`}
            >
              {t("hero.coupleNameOne")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default TheCouple;
