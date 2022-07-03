import { Paper, Box, Typography, createTheme } from "@mui/material";
import { ReactComponent as Logo } from "../../../../assets/illustrations/gameday.svg";

export const TeamItemPresentation = () => {
  const theme = createTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        height: 600,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: theme.spacing(2),
        }}
      >
        <Logo width={300} height={300} />
        <Typography variant="h5">Select team to see its players</Typography>
        <Typography variant="subtitle1">
          Add new player, assign captain, etc...
        </Typography>
      </Box>
    </Paper>
  );
};
