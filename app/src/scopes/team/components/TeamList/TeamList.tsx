import { Box, createTheme, Paper } from "@mui/material";
import { useEffect } from "react";
import { useGlobalStore } from "../../../../store/globalStore";
import { TeamListItem } from "./TeamListItem";
import { TeamListSkeleton } from "./TeamListSkeleton";
import shallow from "zustand/shallow";

export const TeamList = () => {
  const theme = createTheme();
  const { teams, loadingTeams, fetchTeams } = useGlobalStore((state) => {
    return {
      teams: state.teams,
      loadingTeams: state.loadingTeams,
      fetchTeams: state.fetchTeams,
    };
  }, shallow);
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        height: 600,
        padding: theme.spacing(2),
        overflow: "auto",
        gap: theme.spacing(2),
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
        }}
      >
        {loadingTeams ? (
          <TeamListSkeleton />
        ) : (
          teams
            .sort((a, b) => b.year - a.year)
            .map((team) => (
              <TeamListItem key={team.id} year={team.year} coach={team.coach} />
            ))
        )}
      </Box>
    </Paper>
  );
};
