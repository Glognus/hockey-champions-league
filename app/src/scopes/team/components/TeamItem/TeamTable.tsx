import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import shallow from "zustand/shallow";
import { useGlobalStore } from "../../../../store/globalStore";
import { positionTypeToString } from "../../../../utils";

export const TeamTable = () => {
  const { selectedTeamYear, selectedPlayers, setTeamCaptain } = useGlobalStore(
    (state) => ({
      selectedTeamYear: state.selectedTeam?.year,
      selectedTeamCoach: state.selectedTeam?.coach,
      selectedPlayers: state.selectedTeam?.players,
      loadingTeam: state.loadingTeam,
      setTeamCaptain: state.setTeamCaptain,
    }),
    shallow
  );
  const handleSelectPlayer = (playerId: number) => {
    selectedTeamYear && setTeamCaptain(selectedTeamYear, playerId);
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        maxHeight: 400,
      }}
    >
      <Table aria-label="Player table" stickyHeader>
        <caption>Select player to assign captain</caption>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Lastname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPlayers &&
            selectedPlayers
              .sort((a, b) => b.id - a.id)
              .map((player) => (
                <TableRow
                  hover
                  key={player.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  selected={player.isCapitain}
                  onClick={() => {
                    handleSelectPlayer(player.id);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {player.id}
                  </TableCell>
                  <TableCell align="right">
                    {player.position && positionTypeToString(player.position)}
                  </TableCell>
                  <TableCell align="right">{player.number}</TableCell>
                  <TableCell align="right">{player.name}</TableCell>
                  <TableCell align="right">{player.lastname}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
