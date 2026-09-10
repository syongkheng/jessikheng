import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import FloralSprig from "./decor/FloralSprig.jsx";
import LazyImage from "./LazyImage.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { photos } from "../data/photos.js";
import { RSVP_ENDPOINT } from "../utils/rsvpApi.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ADDITIONAL_GUESTS = 8;

const useStyles = makeStyles((theme) => ({
  // The modal replaces the current "screen" at the exact same size: on a
  // real phone that's a true full-screen takeover (matches PhoneFrame
  // rendering children edge-to-edge with no wrapper); on the desktop mockup
  // it matches PhoneFrame's own `device` box dimensions exactly (same
  // height/aspect-ratio/radius), so it reads as "the phone's screen
  // changed" rather than a smaller floating card. The modal itself still
  // scrolls internally (not the browser page) — only the `card` region
  // (form fields) scrolls; the photo header stays fixed and never shifts
  // as the form's content (e.g. added guest fields) grows.
  // MUI's Dialog paper has its own defaults (margin: 32px, maxHeight/
  // maxWidth: calc(100% - 64px)) that would otherwise win over anything
  // left unset — every dimension below is spelled out explicitly. Two
  // separate static classes (chosen in JS via isPhone), rather than one
  // rule with per-prop function values, avoids a JSS quirk where dynamic
  // per-props rules can leave a stale duplicate class attached.
  paperBase: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    margin: 0,
    maxWidth: "none",
    maxHeight: "none",
  },
  paperPhone: {
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
  },
  paperDesktop: {
    width: "auto",
    height: "min(880px, 92vh)",
    aspectRatio: "9 / 19.5",
    borderRadius: 25,
  },
  container: {
    padding: 0,
  },
  photoHeader: {
    position: "relative",
    height: 180,
    flexShrink: 0,
  },
  bgImage: {
    objectFit: "cover",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  card: {
    flex: "1 1 auto",
    minHeight: 0,
    overflowY: "auto",
    padding: theme.spacing(4, 3, 3),
    backgroundColor: "#fff",
  },
  // Floral decor, the RSVP heading, and the language toggle all sit in one
  // row — the heading grows to fill the middle so "RSVP" stays visually
  // centered regardless of the flanking elements' widths.
  headingRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  subheading: {
    display: "block",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  deadlineDate: {
    display: "block",
    textAlign: "center",
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  // Gives the user a bounded, always-visible sense of how many steps
  // remain — this is the direct fix for "just when I thought I was done,
  // more fields appeared": progressing is now an explicit Next click, not
  // a passive reveal, and the total is always known upfront.
  stepper: {
    marginBottom: theme.spacing(3),
    padding: 0,
    backgroundColor: "transparent",
    "& .MuiStepIcon-root.Mui-active": {
      color: "#A52A2A",
    },
    "& .MuiStepIcon-root.Mui-completed": {
      color: "#A52A2A",
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: "#A52A2A",
    },
    "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
      borderColor: "#A52A2A",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  sectionLabel: {
    display: "block",
    color: theme.palette.secondary.dark,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontSize: "0.75rem",
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  stepperLabel: {
    marginBottom: theme.spacing(1),
  },
  stepperRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  stepperButton: {
    backgroundColor: "#A52A2A",
    color: "#ffffff",
    width: 40,
    height: 40,
    "&:hover": {
      backgroundColor: "#7a1f1f",
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  stepperValue: {
    minWidth: 28,
    textAlign: "center",
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#A52A2A",
  },
  containedRedButton: {
    backgroundColor: "#A52A2A",
    "&:hover": {
      backgroundColor: "#7a1f1f",
    },
  },
  outlinedRedButton: {
    color: "#A52A2A",
    borderColor: "#A52A2A",
    "&:hover": {
      borderColor: "#7a1f1f",
      backgroundColor: "rgba(165, 42, 42, 0.04)",
    },
  },
  guestFields: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  successWrap: {
    textAlign: "center",
    padding: theme.spacing(1, 0),
  },
  successSprig: {
    width: 44,
    height: 44,
    margin: "0 auto",
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.dark,
    opacity: 0.7,
  },
  successHeading: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  successMessage: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
  },
  reservationCard: {
    position: "relative",
    overflow: "hidden",
    margin: theme.spacing(0, 0, 3),
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.secondary.light}`,
  },
  reservationCardSprig: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 38,
    height: 38,
    color: theme.palette.secondary.dark,
    opacity: 0.5,
    transform: "rotate(25deg)",
  },
  reservationRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
  },
  reservationCode: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "0.3em",
    // Compensates the trailing edge of that letter-spacing so the code
    // still optically centers instead of drifting right.
    paddingLeft: "0.3em",
    color: theme.palette.text.primary,
  },
  statusChip: {
    display: "inline-block",
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.shape.borderRadius * 4,
    fontSize: "0.75rem",
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
  successActions: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
  },
  wideButton: {
    width: "100%",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  navButton: {
    flex: "1 1 auto",
  },
}));

const initialFormState = {
  name: "",
  email: "",
  contactNumber: "",
  attending: "",
  dietaryRestrictions: "",
  meal: "",
  additionalGuestCount: 0,
  guestNames: [],
  message: "",
};

function RSVPModal({ open, onClose, onViewStatus }) {
  // Same breakpoint PhoneFrame uses to decide framed-desktop vs real-phone
  // rendering, so this modal always matches whichever "screen" is current.
  const isPhone = useMediaQuery("(max-width:800px)");
  const classes = useStyles();
  const paperClass = `${classes.paperBase} ${isPhone ? classes.paperPhone : classes.paperDesktop}`;
  const { t } = useTranslation();
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedPin, setSubmittedPin] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [checkingRsvp, setCheckingRsvp] = useState(false);
  const rsvpPhoto = photos[0];

  // Name is its own first step so the existing-RSVP lookup (which can
  // overwrite `attending` and every other field from the server) happens
  // before the guest ever sets those fields — otherwise a lookup triggered
  // by the same "Next" click that just captured their attending choice
  // would silently revert it. Always all four steps — even when attending
  // is "no" or an edited RSVP has no additional guests — so the Guest
  // Details step (and its guest stepper) never disappears from the wizard.
  const steps = ["lookup", "details", "event", "message"];
  const stepName = steps[Math.min(currentStep, steps.length - 1)];
  const stepLabels = {
    lookup: t("rsvp.stepLookup"),
    details: t("rsvp.stepDetails"),
    event: t("rsvp.stepEvent"),
    message: t("rsvp.stepMessage"),
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleGuestNameChange = (index) => (event) => {
    setForm((prev) => {
      const guestNames = [...prev.guestNames];
      guestNames[index] = event.target.value;
      return { ...prev, guestNames };
    });
  };

  const adjustGuestCount = (delta) => {
    setForm((prev) => {
      const nextCount = Math.min(
        MAX_ADDITIONAL_GUESTS,
        Math.max(0, prev.additionalGuestCount + delta),
      );
      const guestNames = [...prev.guestNames];
      guestNames.length = nextCount;
      return {
        ...prev,
        additionalGuestCount: nextCount,
        guestNames: guestNames.map((n) => n ?? ""),
      };
    });
  };

  // Re-submitting an already-registered name overwrites that person's
  // previous RSVP server-side (see qindom's WeddingValidator/Service), so
  // this just fetches it to pre-fill the form — the actual update-vs-insert
  // decision happens transparently on submit, keyed off name alone.
  const lookupExistingRsvp = async () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }

    try {
      const response = await fetch(
        `${RSVP_ENDPOINT}?name=${encodeURIComponent(name)}`,
      );
      const body = await response.json().catch(() => null);
      const rsvp = body?.data?.found ? body.data.rsvp : null;
      if (!rsvp) {
        return;
      }

      setForm((prev) => ({
        ...prev,
        name: rsvp.name ?? prev.name,
        email: rsvp.email ?? prev.email,
        contactNumber: rsvp.contactNumber ?? "",
        attending: rsvp.attending ? "yes" : "no",
        dietaryRestrictions: rsvp.dietaryRestrictions ?? "",
        meal: rsvp.mealPreference ?? "",
        additionalGuestCount: rsvp.additionalGuestContact?.length ?? 0,
        guestNames: (rsvp.additionalGuestContact ?? []).map(
          (guest) => guest.name ?? "",
        ),
        message: rsvp.message ?? "",
      }));
      setInfoMessage(t("rsvp.foundExisting"));
    } catch {
      // Best-effort convenience lookup — if it fails, the user just fills
      // the form in fresh, same as before this feature existed.
    }
  };

  const validateLookupStep = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = t("rsvp.errors.nameRequired");
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateDetailsStep = () => {
    const nextErrors = {};
    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = t("rsvp.errors.emailInvalid");
    }
    if (!form.attending) {
      nextErrors.attending = t("rsvp.errors.attendingRequired");
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateEventStep = () => {
    const guestNameErrors = [];
    for (let i = 0; i < form.additionalGuestCount; i++) {
      if (!(form.guestNames[i] || "").trim()) {
        guestNameErrors[i] = t("rsvp.errors.guestNameRequired");
      }
    }
    const nextErrors =
      guestNameErrors.length > 0 ? { guestNames: guestNameErrors } : {};
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = async () => {
    const isValid =
      stepName === "lookup"
        ? validateLookupStep()
        : stepName === "details"
          ? validateDetailsStep()
          : stepName === "event"
            ? validateEventStep()
            : true;
    if (!isValid) {
      return;
    }
    if (stepName === "lookup") {
      setCheckingRsvp(true);
      await lookupExistingRsvp();
      setCheckingRsvp(false);
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Defensive guard: only the last step's button is type="submit", but
    // native form-submit can still be triggered early in some browsers
    // (e.g. pressing Enter in a text field on an earlier step). Ignore it
    // unless the user has actually reached the final step.
    if (stepName !== "message") {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim() || null,
      contactNumber: form.contactNumber.trim() || null,
      attending: form.attending === "yes",
      dietaryRestrictions: form.dietaryRestrictions.trim() || null,
      mealPreference: form.meal || null,
      message: form.message.trim() || null,
      additionalGuestContact:
        form.attending === "yes"
          ? form.guestNames.slice(0, form.additionalGuestCount).map((name) => ({
              name: name.trim(),
              email: null,
              contactNumber: null,
              dietaryRestrictions: null,
              mealPreference: null,
            }))
          : [],
    };

    try {
      const response = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => null);

      if (response.ok && body?.status === "Ok") {
        setSubmitted(true);
        setSubmittedPin(body?.data?.pin ?? null);
      } else {
        setSubmitError(t("rsvp.submitError"));
      }
    } catch {
      setSubmitError(t("rsvp.submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
    setCurrentStep(0);
    setSubmitted(false);
    setSubmittedPin(null);
    setSubmitError("");
    setInfoMessage("");
    setCheckingRsvp(false);
  };

  const handleCopyReservationId = async () => {
    if (!submittedPin) return;
    try {
      await navigator.clipboard.writeText(submittedPin);
      setInfoMessage(t("rsvp.copiedReservationId"));
    } catch {
      // Clipboard API can be unavailable (e.g. non-secure context) — the ID
      // is still visible on screen to copy by hand.
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after the close transition so the form doesn't visibly flash
    // back to empty while still on screen.
    setTimeout(handleReset, 200);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      classes={{ paper: paperClass, container: classes.container }}
    >
      <IconButton
        className={classes.closeButton}
        onClick={handleClose}
        aria-label={t('rsvp.closeLabel')}
      >
        <CloseIcon />
      </IconButton>

      {rsvpPhoto && (
        <Box className={classes.photoHeader}>
          <LazyImage
            src={rsvpPhoto.src}
            alt={rsvpPhoto.alt}
            className={classes.bgImage}
            fill
          />
        </Box>
      )}

      <Box className={classes.card}>
        <Box className={classes.headingRow}>
          <FloralSprig variant="bloom" className={classes.headingSprig} />
          <Typography variant="h4" className={classes.heading}>
            {t("rsvp.heading")}
          </Typography>
          <FloralSprig variant="bloom" className={classes.headingSprig} />
          <LanguageSwitcher />
        </Box>

        {submitted ? (
          <Box className={classes.successWrap}>
            <FloralSprig variant="bloom" className={classes.successSprig} />
            <Typography variant="h3" className={classes.successHeading}>
              {t("rsvp.successHeading")}
            </Typography>
            <Typography variant="body1" className={classes.successMessage}>
              {t("rsvp.successMessage", { name: form.name })}
            </Typography>

            {submittedPin && (
              <Box className={classes.reservationCard}>
                <FloralSprig variant="leaf" className={classes.reservationCardSprig} />
                <Typography variant="overline" className={classes.sectionLabel}>
                  {t("rsvp.reservationIdLabel")}
                </Typography>
                <Box className={classes.reservationRow}>
                  <Typography className={classes.reservationCode}>{submittedPin}</Typography>
                  <IconButton
                    size="small"
                    onClick={handleCopyReservationId}
                    aria-label={t("rsvp.copyReservationId")}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box
                  component="span"
                  className={`${classes.statusChip} ${
                    form.attending === "yes" ? classes.statusChipYes : classes.statusChipNo
                  }`}
                >
                  {form.attending === "yes"
                    ? t("rsvp.attendingStatus")
                    : t("rsvp.notAttendingStatus")}
                </Box>
              </Box>
            )}

            <Box className={classes.successActions}>
              <Button
                className={`${classes.wideButton} ${classes.containedRedButton}`}
                variant="contained"
                color="primary"
                onClick={() => onViewStatus?.(submittedPin)}
              >
                {t("rsvp.viewStatus")}
              </Button>
              <Button
                className={`${classes.wideButton} ${classes.outlinedRedButton}`}
                variant="outlined"
                color="primary"
                onClick={handleReset}
              >
                {t("rsvp.resubmit")}
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="body2" className={classes.subheading}>
              {t("hero.venueName")}
            </Typography>
            <Typography variant="body1" className={classes.subheading}>
              {t("hero.restaurantName")}
            </Typography>
            <Typography variant="body1" className={classes.deadlineDate}>
              {t("rsvp.dateTimeLabel")}
            </Typography>
            <Stepper
              activeStep={currentStep}
              alternativeLabel
              className={classes.stepper}
            >
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{stepLabels[step]}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box
              component="form"
              className={classes.form}
              onSubmit={handleSubmit}
              noValidate
            >
              {stepName === "lookup" && (
                <>
                  <Typography
                    variant="overline"
                    className={classes.sectionLabel}
                  >
                    {t("rsvp.lookupHeading")}
                  </Typography>

                  <Typography variant="body2" className={classes.subheading}>
                    {t("rsvp.lookupHint")}
                  </Typography>

                  <TextField
                    label={t("rsvp.nameLabel")}
                    value={form.name}
                    onChange={handleChange("name")}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    required
                  />
                </>
              )}

              {stepName === "details" && (
                <>
                  <Typography
                    variant="overline"
                    className={classes.sectionLabel}
                  >
                    {t("rsvp.yourDetailsHeading")}
                  </Typography>

                  <TextField
                    label={t("rsvp.emailLabel")}
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />

                  <TextField
                    label={t("rsvp.contactNumberLabel")}
                    type="tel"
                    value={form.contactNumber}
                    onChange={handleChange("contactNumber")}
                  />

                  <FormControl error={Boolean(errors.attending)}>
                    <FormLabel>{t("rsvp.attendingLabel")}</FormLabel>
                    <RadioGroup
                      row
                      value={form.attending}
                      onChange={handleChange("attending")}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label={t("rsvp.attendingYes")}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label={t("rsvp.attendingNo")}
                      />
                    </RadioGroup>
                    {errors.attending && (
                      <Typography variant="caption" color="error">
                        {errors.attending}
                      </Typography>
                    )}
                  </FormControl>
                </>
              )}

              {stepName === "event" && (
                <>
                  <TextField
                    label={t("rsvp.dietaryRestrictionsLabel")}
                    value={form.dietaryRestrictions}
                    onChange={handleChange("dietaryRestrictions")}
                  />

                  <TextField
                    select
                    label={t("rsvp.mealLabel")}
                    value={form.meal}
                    onChange={handleChange("meal")}
                  >
                    <MenuItem value="">—</MenuItem>
                    <MenuItem value="regular">{t("rsvp.mealRegular")}</MenuItem>
                    <MenuItem value="vegetarian">
                      {t("rsvp.mealVegetarian")}
                    </MenuItem>
                    <MenuItem value="halal">{t("rsvp.mealHalal")}</MenuItem>
                  </TextField>

                  <Divider className={classes.divider} />

                  <Typography
                    variant="overline"
                    className={classes.sectionLabel}
                  >
                    {t("rsvp.additionalGuestsHeading")}
                  </Typography>

                  <Box>
                    <FormLabel className={classes.stepperLabel}>
                      {t("rsvp.additionalGuestsLabel")}
                    </FormLabel>
                    <Box className={classes.stepperRow}>
                      <IconButton
                        type="button"
                        className={classes.stepperButton}
                        onClick={() => adjustGuestCount(-1)}
                        disabled={form.additionalGuestCount <= 0}
                        aria-label={t('rsvp.decreaseGuestsLabel')}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography className={classes.stepperValue}>
                        {form.additionalGuestCount}
                      </Typography>
                      <IconButton
                        type="button"
                        className={classes.stepperButton}
                        onClick={() => adjustGuestCount(1)}
                        disabled={
                          form.additionalGuestCount >= MAX_ADDITIONAL_GUESTS
                        }
                        aria-label={t('rsvp.increaseGuestsLabel')}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {form.additionalGuestCount > 0 && (
                    <Box className={classes.guestFields}>
                      {Array.from(
                        { length: form.additionalGuestCount },
                        (_, index) => (
                          <TextField
                            key={index}
                            label={t("rsvp.guestNameLabel", {
                              number: index + 2,
                            })}
                            value={form.guestNames[index] || ""}
                            onChange={handleGuestNameChange(index)}
                            error={Boolean(errors.guestNames?.[index])}
                            helperText={errors.guestNames?.[index]}
                            required
                          />
                        ),
                      )}
                    </Box>
                  )}
                </>
              )}

              {stepName === "message" && (
                <TextField
                  label={t("rsvp.messageLabel")}
                  value={form.message}
                  onChange={handleChange("message")}
                  multiline
                  minRows={3}
                />
              )}

              <Box className={classes.navRow}>
                {currentStep > 0 && (
                  <Button
                    type="button"
                    className={`${classes.navButton} ${classes.outlinedRedButton}`}
                    variant="outlined"
                    color="primary"
                    onClick={handleBack}
                    disabled={submitting || checkingRsvp}
                  >
                    {t("rsvp.back")}
                  </Button>
                )}

                {currentStep < steps.length - 1 ? (
                  <Button
                    key="next"
                    type="button"
                    className={`${classes.navButton} ${classes.containedRedButton}`}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={checkingRsvp}
                  >
                    {checkingRsvp ? t("rsvp.checking") : t("rsvp.next")}
                  </Button>
                ) : (
                  <Button
                    key="submit"
                    className={`${classes.navButton} ${classes.containedRedButton}`}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                  >
                    {submitting ? t("rsvp.submitting") : t("rsvp.submit")}
                  </Button>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Snackbar
        open={Boolean(submitError)}
        autoHideDuration={6000}
        onClose={() => setSubmitError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSubmitError("")}
        >
          {submitError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(infoMessage)}
        autoHideDuration={6000}
        onClose={() => setInfoMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setInfoMessage("")}
        >
          {infoMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default RSVPModal;
