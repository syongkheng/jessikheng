import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: theme.spacing(0.5),
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
    borderRadius: theme.shape.borderRadius * 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 0,
    padding: theme.spacing(0.25, 1),
    fontSize: "0.7rem",
    color: theme.palette.text.secondary,
  },
  active: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
  },
}));

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

function LanguageSwitcher() {
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <Box className={classes.root}>
      {LANGUAGES.map((lang) => (
        <Button
          key={lang.code}
          size="small"
          className={`${classes.button} ${i18n.resolvedLanguage === lang.code ? classes.active : ""}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.label}
        </Button>
      ))}
    </Box>
  );
}

export default LanguageSwitcher;
