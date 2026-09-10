import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import VenueInfo from "./hero/VenueInfo.jsx";
import FloralSprig from "./decor/FloralSprig.jsx";
import LazyImage from "./LazyImage.jsx";
import VenueMap from "./VenueMap.jsx";
import { photos } from "../data/photos.js";

const useStyles = makeStyles((theme) => ({
  // Grid stacks image/topChip/bottomChip in the same cell, same full-bleed
  // pattern as Hero.
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
  topChip: {
    position: "relative",
    top: theme.spacing(1),
    gridArea: "1 / 1",
    alignSelf: "start",
    justifySelf: "center",
    // Grid items default to a content-based min-width, which can force the
    // whole grid (and page) wider than the viewport regardless of maxWidth.
    minWidth: 0,
    height: "fit-content",
    marginTop: theme.spacing(3),
    width: "90%",
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "#ffffff80",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.14)",
  },
  topChipSprig: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 34,
    height: 34,
    color: theme.palette.secondary.dark,
    opacity: 0.6,
    transform: "rotate(20deg)",
  },
  heading: {
    display: "block",
    color: theme.palette.secondary.dark,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  mapWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // gap: theme.spacing(2),
  },
  mapAddress: {
    flex: "1 1 auto",
    minWidth: 0,
  },
  mapThumb: {
    flexShrink: 0,
    width: 260,
    paddingTop: theme.spacing(2),
  },
}));

function Venue() {
  const classes = useStyles();
  const { t } = useTranslation();
  const backviewPhoto = photos[3];
  const bridgePhoto = photos[4];

  return (
    <Box id="venue" component="section">
      <Box className={classes.imageWrap}>
        <Box className={classes.topChip}>
          <FloralSprig variant="leaf" className={classes.topChipSprig} />
          <Typography variant="overline" className={classes.heading}>
            {t("venue.heading")}
          </Typography>
          {/* <VenueInfo dense /> */}
          <Box className={classes.mapWrap}>
            <Box className={classes.mapAddress}>
              <VenueInfo dense />
            </Box>
            <Box className={classes.mapThumb}>
              <VenueMap />
            </Box>
          </Box>
        </Box>
      </Box>
      {backviewPhoto && (
        <div style={{ marginTop: "40px" }}>
          <LazyImage
            src={backviewPhoto.src}
            alt={backviewPhoto.alt}
            wrapperClassName={classes.image}
            placeholderHeight={420}
            placeholderVariant="leaf"
          />
        </div>
      )}
      {bridgePhoto && (
        <div style={{ marginTop: "40px" }}>
          <LazyImage
            src={bridgePhoto.src}
            alt={bridgePhoto.alt}
            wrapperClassName={classes.image}
            placeholderHeight={420}
            placeholderVariant="leaf"
          />
        </div>
      )}
    </Box>
  );
}

export default Venue;
