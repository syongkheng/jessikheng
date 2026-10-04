import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";
import FloralSprig, { SPRIG_VARIANTS } from "./FloralSprig.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: theme.spacing(1.5),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(2, 1, 1.5),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  big: {
    width: 80,
    height: 80,
    color: theme.palette.secondary.dark,
  },
  smallRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: theme.spacing(1.5),
    color: theme.palette.primary.dark,
  },
  label: {
    fontFamily: "monospace",
    color: theme.palette.text.secondary,
  },
}));

// Dev aid at /#/sprigs: every FloralSprig variant at hero size plus the two
// sizes it's typically used at, so shapes can be compared before picking one.
function SprigPreviewPage({ onBack }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5">
          Floral sprigs ({SPRIG_VARIANTS.length})
        </Typography>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
      </Box>

      <Box className={classes.grid}>
        {SPRIG_VARIANTS.map((variant) => (
          <Box key={variant} className={classes.card}>
            <FloralSprig variant={variant} className={classes.big} />
            <Box className={classes.smallRow}>
              <FloralSprig variant={variant} style={{ width: 36, height: 36 }} />
              <FloralSprig variant={variant} style={{ width: 24, height: 24 }} />
            </Box>
            <Typography variant="caption" className={classes.label}>
              {variant}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SprigPreviewPage;
