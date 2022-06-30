import { Avatar, Box, createTheme, Typography } from "@mui/material";
import shallow from "zustand/shallow";
import { useGlobalStore } from "../../../../store/globalStore";

const CoachBox = () => {
  const { selectedTeamCoach } = useGlobalStore(
    (state) => ({
      selectedTeamCoach: state.selectedTeam?.coach,
    }),
    shallow
  );
  return (
    <div>
      <Typography variant="body1">Team's coach</Typography>
      <Typography variant="h5"> {selectedTeamCoach}</Typography>
    </div>
  );
};

export const TeamHeader = () => {
  const theme = createTheme();
  const { teamCaptain } = useGlobalStore(
    (state) => ({
      teamCaptain: state.selectedTeam?.players?.find((p) => p.isCapitain),
    }),
    shallow
  );
  return (
    <>
      <Avatar sx={{ width: 80, height: 80 }} />
      <Box
        style={{
          display: "flex",
          flexGrow: 1,
          gap: theme.spacing(2),
          flexDirection: "row",
        }}
      >
        <CoachBox />
        <div>
          <Typography variant="body1">Captain</Typography>
          <Typography variant="h5">{teamCaptain?.name}</Typography>
        </div>
      </Box>
    </>
  );
};