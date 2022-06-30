import { Box, Button, createTheme, Paper } from "@mui/material";
import { useRef, useState } from "react";
import shallow from "zustand/shallow";
import { Player } from "../../../../models";
import { useGlobalStore } from "../../../../store/globalStore";
import { PlayerForm } from "./PlayerForm";
import { TeamHeader } from "./TeamHeader";
import { TeamItemPresentation } from "./TeamItemPresentation";
import { TeamItemSkeleton } from "./TeamItemSkeleton";
import { TeamTable } from "./TeamTable";
export const TeamItem = () => {
  const theme = createTheme();
  const { selectedTeamYear, loadingTeam } = useGlobalStore(
    (state) => ({
      selectedTeamYear: state.selectedTeam?.year,
      loadingTeam: state.loadingTeam,
    }),
    shallow
  );
  const [open, setOpen] = useState(false);
  const selectedPlayer = useRef<Player | undefined>(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePlayer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    selectedPlayer.current = undefined;
    handleClickOpen();
  };

  return loadingTeam ? (
    <TeamItemSkeleton />
  ) : !selectedTeamYear ? (
    <TeamItemPresentation />
  ) : (
    <Paper
      elevation={3}
      sx={{
        height: 600,
        display: "flex",
        overflow: "auto",
        padding: theme.spacing(2),
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          display: "flex",
          gap: theme.spacing(2),
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <TeamHeader />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePlayer}
        >
          Add new player
        </Button>
      </Box>
      <TeamTable />
      {open && (
        <PlayerForm onClose={handleClose} player={selectedPlayer.current} />
      )}
    </Paper>
  );
};
