import { Box, Button, createTheme, Paper } from "@mui/material";
import { useRef, useState } from "react";
import { Player } from "../../../../models";
import { PlayerForm } from "./PlayerForm";
import { TeamHeader } from "./TeamHeader";
import { TeamTable } from "./TeamTable";
export const TeamItemDetail = () => {
  const theme = createTheme();
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

  return (
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
      <PlayerForm
        open={open}
        onClose={handleClose}
        player={selectedPlayer.current}
      />
    </Paper>
  );
};
