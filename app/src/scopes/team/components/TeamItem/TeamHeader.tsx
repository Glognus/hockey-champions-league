import { Avatar, Box, createTheme, Typography } from "@mui/material";
import { useState } from "react";
import { useAsync } from "react-async-hook";
import shallow from "zustand/shallow";
import { useGlobalStore } from "../../../../store/globalStore";
import { IGif } from "@giphy/js-types";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("LppXzJsGPrCc9g5zqMncLr7p00uEu3mR");

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

const CaptainBox = () => {
  const { selectedTeamCaptain } = useGlobalStore(
    (state) => ({
      selectedTeamCaptain: state.selectedTeam?.players.find(
        (p) => p.isCapitain
      ),
    }),
    shallow
  );
  return (
    <div>
      <Typography variant="body1">Captain</Typography>
      <Typography variant="h5">{selectedTeamCaptain?.name}</Typography>
    </div>
  );
};

export const TeamHeader = () => {
  const theme = createTheme();
  const [gif, setGif] = useState<IGif | null>(null);
  useAsync(async () => {
    const { data } = await gf.random({
      tag: "hockey",
      type: "stickers",
      rating: "g",
    });
    setGif(data);
  }, []);

  return (
    <>
      <Avatar sx={{ width: 80, height: 80 }} src={gif?.images?.original?.url} />
      <Box
        style={{
          display: "flex",
          flexGrow: 1,
          gap: theme.spacing(2),
          flexDirection: "row",
        }}
      >
        <CoachBox />
        <CaptainBox />
      </Box>
    </>
  );
};
