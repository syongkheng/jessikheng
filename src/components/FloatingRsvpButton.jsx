import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RSVP_DEADLINE } from "../data/rsvpDeadline.js";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.2)",
    zIndex: theme.zIndex.appBar,
  },
  cta: {
    width: "100%",
    maxWidth: 320,
    height: 36,
    fontWeight: 520,
    backgroundColor: "#A52A2A",
  },
  deadlineLabel: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

// Fixed full-width bar at the bottom of the screen (see PhoneFrame's
// `device` transform for why this stays contained on the desktop mockup) so
// RSVP is always one tap away, regardless of scroll position.
function FloatingRsvpButton({ onClick }) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const formattedDeadline = new Intl.DateTimeFormat(
    i18n.resolvedLanguage === "zh" ? "zh-CN" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(RSVP_DEADLINE);

  return (
    <Box className={classes.footer}>
      <Typography variant="body2" className={classes.deadlineLabel}>
        {t("rsvp.deadlineLabel", { date: formattedDeadline })}
      </Typography>
      <Button
        className={classes.cta}
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {t("rsvp.rsvpButtonLabel")}
      </Button>
    </Box>
  );
}

export default FloatingRsvpButton;
