import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, TextField, Button, IconButton, Snackbar, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import FloralSprig from "./decor/FloralSprig.jsx";
import LazyImage from "./LazyImage.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { photos } from "../data/photos.js";
import { RSVP_STATUS_ENDPOINT } from "../utils/rsvpApi.js";
import { looksLikePin, normalizePin } from "../utils/reservationId.js";
import { formatDate } from "../utils/formatDate.js";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  photoHeader: {
    position: "relative",
    height: 180,
    flexShrink: 0,
  },
  bgImage: {
    objectFit: "cover",
  },
  backButton: {
    position: "absolute",
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  card: {
    flex: "1 1 auto",
    padding: theme.spacing(4, 3, 5),
  },
  headingRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  headingSprig: {
    width: 28,
    height: 28,
    flexShrink: 0,
    color: theme.palette.secondary.dark,
    opacity: 0.6,
  },
  heading: {
    flex: "1 1 auto",
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  hint: {
    color: theme.palette.text.secondary,
  },
  searchButton: {
    backgroundColor: "#A52A2A",
    "&:hover": {
      backgroundColor: "#7a1f1f",
    },
  },
  resultsList: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  resultCard: {
    position: "relative",
    overflow: "hidden",
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.secondary.light}`,
  },
  resultCardSprig: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 38,
    height: 38,
    color: theme.palette.secondary.dark,
    opacity: 0.5,
    transform: "rotate(25deg)",
  },
  resultTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  resultName: {
    fontSize: "1.6rem",
    color: theme.palette.text.primary,
  },
  resultNameEn: {
    fontFamily: '"Moon Dance", cursive !important',
  },
  resultNameZh: {
    fontFamily: '"Zhi Mang Xing", cursive !important',
  },
  statusChip: {
    display: "inline-block",
    flexShrink: 0,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.shape.borderRadius * 4,
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  statusChipYes: {
    backgroundColor: "rgba(138, 154, 91, 0.16)",
    color: theme.palette.primary.dark,
  },
  statusChipNo: {
    backgroundColor: "rgba(165, 42, 42, 0.1)",
    color: "#A52A2A",
  },
  resultMeta: {
    display: "block",
    color: theme.palette.text.secondary,
    fontSize: "0.85rem",
  },
  resultId: {
    display: "block",
    marginTop: theme.spacing(1.5),
    fontFamily: '"Playfair Display", "Georgia", serif',
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.25em",
    color: theme.palette.text.primary,
  },
  resultTimestamps: {
    marginTop: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    borderTop: `1px solid ${theme.palette.secondary.light}`,
  },
  resultTimestamp: {
    display: "block",
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
  },
  guestsHeading: {
    display: "block",
    marginTop: theme.spacing(1.5),
    color: theme.palette.secondary.dark,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontSize: "0.7rem",
  },
  guestList: {
    margin: theme.spacing(0.5, 0, 0),
    paddingLeft: theme.spacing(2.5),
    color: theme.palette.text.secondary,
  },
  emptyState: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(4, 1),
  },
}));

// `prefillQuery`, when given (e.g. the pin handed back on the RSVP
// confirmation screen), pre-fills the search box and runs the lookup
// immediately so the guest lands straight on their result.
function RsvpStatusPage({ prefillQuery, onBack }) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const isZh = i18n.resolvedLanguage === "zh";
  const nameFontClass = isZh ? classes.resultNameZh : classes.resultNameEn;
  const [query, setQuery] = useState(prefillQuery || "");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [matches, setMatches] = useState([]);
  const [searchError, setSearchError] = useState("");
  const rsvpPhoto = photos[0];

  const runSearch = async (rawQuery) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) return;

    setSearching(true);
    setSearchError("");

    try {
      const url = looksLikePin(trimmed)
        ? `${RSVP_STATUS_ENDPOINT}?pin=${normalizePin(trimmed)}`
        : `${RSVP_STATUS_ENDPOINT}?name=${encodeURIComponent(trimmed)}`;

      const response = await fetch(url);
      const body = await response.json().catch(() => null);

      if (!response.ok || body?.status !== "Ok") {
        setSearchError(t("rsvp.statusSearchError"));
        setMatches([]);
      } else {
        setMatches(body?.data?.matches ?? []);
      }
    } catch {
      setSearchError(t("rsvp.statusSearchError"));
      setMatches([]);
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  // Runs once on mount for a prefilled query only — not tied to
  // `prefillQuery`'s identity, since the user's own edits to the field
  // afterwards shouldn't re-trigger it.
  useEffect(() => {
    if (prefillQuery) {
      runSearch(prefillQuery);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch(query);
  };

  return (
    <Box className={classes.root}>
      {rsvpPhoto && (
        <Box className={classes.photoHeader}>
          <LazyImage src={rsvpPhoto.src} alt={rsvpPhoto.alt} className={classes.bgImage} fill />
          <IconButton
            className={classes.backButton}
            onClick={onBack}
            aria-label={t("rsvp.statusBackToInvite")}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
      )}

      <Box className={classes.card}>
        <Box className={classes.headingRow}>
          <FloralSprig variant="bloom" className={classes.headingSprig} />
          <Typography variant="h4" className={classes.heading}>
            {t("rsvp.statusPageHeading")}
          </Typography>
          <FloralSprig variant="bloom" className={classes.headingSprig} />
          <LanguageSwitcher />
        </Box>

        <Box component="form" className={classes.form} onSubmit={handleSubmit} noValidate>
          <Typography variant="body2" className={classes.hint}>
            {t("rsvp.statusSearchHint")}
          </Typography>
          <TextField
            label={t("rsvp.statusSearchLabel")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button
            type="submit"
            className={classes.searchButton}
            variant="contained"
            color="primary"
            disabled={searching || !query.trim()}
          >
            {searching ? t("rsvp.statusSearching") : t("rsvp.statusSearchButton")}
          </Button>
        </Box>

        {searched && !searching && (
          matches.length > 0 ? (
            <Box className={classes.resultsList}>
              {matches.map((match) => (
                <Box key={match.pin} className={classes.resultCard}>
                  <FloralSprig variant="leaf" className={classes.resultCardSprig} />
                  <Box className={classes.resultTopRow}>
                    <Typography
                      variant="h6"
                      className={`${classes.resultName} ${nameFontClass}`}
                    >
                      {match.name}
                    </Typography>
                    <Box
                      component="span"
                      className={`${classes.statusChip} ${
                        match.attending ? classes.statusChipYes : classes.statusChipNo
                      }`}
                    >
                      {match.attending ? t("rsvp.attendingStatus") : t("rsvp.notAttendingStatus")}
                    </Box>
                  </Box>

                  {match.matchedGuestName && (
                    <Typography variant="body2" className={classes.resultMeta}>
                      {t("rsvp.statusGuestOf", { name: match.name })}
                    </Typography>
                  )}

                  {match.additionalGuestNames?.length > 0 && (
                    <>
                      <Typography variant="overline" className={classes.guestsHeading}>
                        {t("rsvp.statusGuestsHeading")}
                      </Typography>
                      <ul className={classes.guestList}>
                        {match.additionalGuestNames.map((guestName) => (
                          <li key={guestName}>
                            <Typography variant="body2">{guestName}</Typography>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Typography variant="caption" className={classes.resultId}>
                    {match.pin}
                  </Typography>

                  <Box className={classes.resultTimestamps}>
                    <Typography variant="caption" className={classes.resultTimestamp}>
                      {t("rsvp.statusCreatedLabel", {
                        date: formatDate(match.createdAt, i18n.resolvedLanguage),
                      })}
                    </Typography>
                    {match.updatedAt !== match.createdAt && (
                      <Typography variant="caption" className={classes.resultTimestamp}>
                        {t("rsvp.statusUpdatedLabel", {
                          date: formatDate(match.updatedAt, i18n.resolvedLanguage),
                        })}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box className={classes.emptyState}>
              <Typography variant="body1">
                {t("rsvp.statusNoResults", { query: query.trim() })}
              </Typography>
            </Box>
          )
        )}
      </Box>

      <Snackbar
        open={Boolean(searchError)}
        autoHideDuration={6000}
        onClose={() => setSearchError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setSearchError("")}>
          {searchError}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RsvpStatusPage;
