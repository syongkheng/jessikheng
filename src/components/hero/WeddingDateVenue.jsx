import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { WEDDING_DATE } from "../../data/weddingDate.js";

const useStyles = makeStyles((theme) => ({
  date: {
    marginTop: theme.spacing(2),
    // color: theme.palette.text.s  econdary,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontSize: "0.85rem",
  },
  venue: {
    marginTop: theme.spacing(0.8),
    fontWeight: 500,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontSize: "0.7rem",
  },
}));

function WeddingDateVenue() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const formattedDate = new Intl.DateTimeFormat(
    i18n.resolvedLanguage === "zh" ? "zh-CN" : "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(WEDDING_DATE);

  return (
    <>
      <Typography variant="body1" className={classes.date}>
        {formattedDate}
      </Typography>
      <Typography variant="body1" className={classes.venue}>
        {t("hero.restaurantName")}
      </Typography>
    </>
  );
}

export default WeddingDateVenue;
