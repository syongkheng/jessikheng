import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useTranslation } from 'react-i18next'
import FloralSprig from './decor/FloralSprig.jsx'
import LazyImage from './LazyImage.jsx'
import { photos } from '../data/photos.js'

const RSVP_ENDPOINT = 'https://api.awense.com/wedding/rsvp'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_ADDITIONAL_GUESTS = 8

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(6, 3),
    overflow: 'hidden',
  },
  // The form's height is dynamic (validation state, language, etc.), so the
  // background image uses `cover` to always fill it, rather than the
  // grid-stack/aspect-ratio pattern used where the image itself sets height.
  // LazyImage's `fill` mode handles position/inset/sizing; this only needs
  // the crop behavior specific to this usage.
  bgImage: {
    objectFit: 'cover',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 520,
    margin: '0 auto',
    padding: theme.spacing(4, 3),
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  },
  headingSprig: {
    width: 34,
    height: 34,
    margin: '0 auto',
    color: theme.palette.secondary.dark,
    opacity: 0.6,
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  subheading: {
    display: 'block',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  deadlineDate: {
    display: 'block',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  sectionLabel: {
    display: 'block',
    color: theme.palette.secondary.dark,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  stepperLabel: {
    marginBottom: theme.spacing(1),
  },
  stepperRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  stepperButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  stepperValue: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
  guestFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(1),
  },
}))

const initialFormState = {
  name: '',
  email: '',
  contactNumber: '',
  attending: '',
  dietaryRestrictions: '',
  meal: '',
  additionalGuestCount: 0,
  guestNames: [],
  message: '',
}

function RSVPForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const rsvpPhoto = photos[0]

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleGuestNameChange = (index) => (event) => {
    setForm((prev) => {
      const guestNames = [...prev.guestNames]
      guestNames[index] = event.target.value
      return { ...prev, guestNames }
    })
  }

  const adjustGuestCount = (delta) => {
    setForm((prev) => {
      const nextCount = Math.min(MAX_ADDITIONAL_GUESTS, Math.max(0, prev.additionalGuestCount + delta))
      const guestNames = [...prev.guestNames]
      guestNames.length = nextCount
      return { ...prev, additionalGuestCount: nextCount, guestNames: guestNames.map((n) => n ?? '') }
    })
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) {
      nextErrors.name = t('rsvp.errors.nameRequired')
    }
    if (!form.email.trim()) {
      nextErrors.email = t('rsvp.errors.emailRequired')
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = t('rsvp.errors.emailInvalid')
    }
    if (!form.attending) {
      nextErrors.attending = t('rsvp.errors.attendingRequired')
    }
    if (form.attending === 'yes') {
      const guestNameErrors = []
      for (let i = 0; i < form.additionalGuestCount; i++) {
        if (!(form.guestNames[i] || '').trim()) {
          guestNameErrors[i] = t('rsvp.errors.guestNameRequired')
        }
      }
      if (guestNameErrors.length > 0) {
        nextErrors.guestNames = guestNameErrors
      }
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }

    setSubmitting(true)
    setSubmitError('')

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      contactNumber: form.contactNumber.trim() || null,
      attending: form.attending === 'yes',
      dietaryRestrictions: form.dietaryRestrictions.trim() || null,
      mealPreference: form.meal || null,
      message: form.message.trim() || null,
      additionalGuestContact:
        form.attending === 'yes'
          ? form.guestNames.slice(0, form.additionalGuestCount).map((name) => ({
              name: name.trim(),
              email: null,
              contactNumber: null,
              dietaryRestrictions: null,
              mealPreference: null,
            }))
          : [],
    }

    try {
      const response = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await response.json().catch(() => null)

      if (response.ok && body?.status === 'Ok') {
        setSubmitted(true)
      } else {
        const rawMessage = typeof body?.data === 'string' ? body.data : ''
        setSubmitError(
          rawMessage.toLowerCase().includes('email')
            ? t('rsvp.duplicateEmailError')
            : t('rsvp.submitError'),
        )
      }
    } catch {
      setSubmitError(t('rsvp.submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm(initialFormState)
    setErrors({})
    setSubmitted(false)
    setSubmitError('')
  }

  return (
    <Box id="rsvp" component="section" className={classes.root}>
      {rsvpPhoto && (
        <LazyImage src={rsvpPhoto.src} alt={rsvpPhoto.alt} className={classes.bgImage} fill />
      )}

      <Box className={classes.card}>
        <FloralSprig variant="bloom" className={classes.headingSprig} />

        {submitted ? (
          <Box className={classes.form}>
            <Alert severity="success">{t('rsvp.successMessage', { name: form.name })}</Alert>
            <Button variant="outlined" color="primary" onClick={handleReset}>
              {t('rsvp.resubmit')}
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h4" className={classes.heading}>
              {t('rsvp.heading')}
            </Typography>
            <Typography variant="body1" className={classes.subheading}>
              {t('rsvp.deadlineLabel')}
            </Typography>
            <Typography variant="body1" className={classes.deadlineDate}>
              {t('rsvp.deadlineDate')}
            </Typography>
            <Box
              component="form"
              className={classes.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <Typography variant="overline" className={classes.sectionLabel}>
                {t('rsvp.yourDetailsHeading')}
              </Typography>

              <TextField
                label={t('rsvp.nameLabel')}
                value={form.name}
                onChange={handleChange('name')}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
              />

              <TextField
                label={t('rsvp.emailLabel')}
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
              />

              <TextField
                label={t('rsvp.contactNumberLabel')}
                type="tel"
                value={form.contactNumber}
                onChange={handleChange('contactNumber')}
              />

              <FormControl error={Boolean(errors.attending)}>
                <FormLabel>{t('rsvp.attendingLabel')}</FormLabel>
                <RadioGroup
                  row
                  value={form.attending}
                  onChange={handleChange('attending')}
                >
                  <FormControlLabel value="yes" control={<Radio />} label={t('rsvp.attendingYes')} />
                  <FormControlLabel value="no" control={<Radio />} label={t('rsvp.attendingNo')} />
                </RadioGroup>
                {errors.attending && (
                  <Typography variant="caption" color="error">
                    {errors.attending}
                  </Typography>
                )}
              </FormControl>

              {form.attending === 'yes' && (
                <>
                  <Divider className={classes.divider} />

                  <TextField
                    label={t('rsvp.dietaryRestrictionsLabel')}
                    value={form.dietaryRestrictions}
                    onChange={handleChange('dietaryRestrictions')}
                  />

                  <TextField
                    select
                    label={t('rsvp.mealLabel')}
                    value={form.meal}
                    onChange={handleChange('meal')}
                  >
                    <MenuItem value="">—</MenuItem>
                    <MenuItem value="regular">{t('rsvp.mealRegular')}</MenuItem>
                    <MenuItem value="vegetarian">{t('rsvp.mealVegetarian')}</MenuItem>
                    <MenuItem value="vegan">{t('rsvp.mealVegan')}</MenuItem>
                    <MenuItem value="halal">{t('rsvp.mealHalal')}</MenuItem>
                  </TextField>

                  <Divider className={classes.divider} />

                  <Typography variant="overline" className={classes.sectionLabel}>
                    {t('rsvp.additionalGuestsHeading')}
                  </Typography>

                  <Box>
                    <FormLabel className={classes.stepperLabel}>
                      {t('rsvp.additionalGuestsLabel')}
                    </FormLabel>
                    <Box className={classes.stepperRow}>
                      <IconButton
                        className={classes.stepperButton}
                        onClick={() => adjustGuestCount(-1)}
                        disabled={form.additionalGuestCount <= 0}
                        aria-label="Decrease guest count"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography className={classes.stepperValue}>
                        {form.additionalGuestCount}
                      </Typography>
                      <IconButton
                        className={classes.stepperButton}
                        onClick={() => adjustGuestCount(1)}
                        disabled={form.additionalGuestCount >= MAX_ADDITIONAL_GUESTS}
                        aria-label="Increase guest count"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {form.additionalGuestCount > 0 && (
                    <Box className={classes.guestFields}>
                      {Array.from({ length: form.additionalGuestCount }, (_, index) => (
                        <TextField
                          key={index}
                          label={t('rsvp.guestNameLabel', { number: index + 2 })}
                          value={form.guestNames[index] || ''}
                          onChange={handleGuestNameChange(index)}
                          error={Boolean(errors.guestNames?.[index])}
                          helperText={errors.guestNames?.[index]}
                          required
                        />
                      ))}
                    </Box>
                  )}
                </>
              )}

              <Divider className={classes.divider} />

              <TextField
                label={t('rsvp.messageLabel')}
                value={form.message}
                onChange={handleChange('message')}
                multiline
                minRows={3}
              />

              {submitError && <Alert severity="error">{submitError}</Alert>}

              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? t('rsvp.submitting') : t('rsvp.submit')}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default RSVPForm
