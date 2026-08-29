import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  venue: {
    marginTop: (props) => (props.dense ? 0 : theme.spacing(10)),
    marginBottom: (props) => (props.dense ? 0 : theme.spacing(2)),
    color: theme.palette.text.secondary,
    textAlign: "center",
    fontSize: "0.85rem",
  },
}));

function VenueInfo({ dense }) {
  const classes = useStyles({ dense });
  const { t } = useTranslation();

  return (
    <Typography variant="body1" className={classes.venue}>
      {t("hero.restaurantName")} <br></br>
      {/* 2 Telok Blangah Wy <br></br> */}
      SAFRA Mt Faber, #02-05<br></br>
      Singapore 098803
    </Typography>
  );
}

export default VenueInfo;
