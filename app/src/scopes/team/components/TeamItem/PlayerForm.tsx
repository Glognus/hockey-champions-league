import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  createTheme,
  useMediaQuery,
  FormControl,
  Input,
  InputLabel,
  Switch,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { Player, PlayerPayload, PositionType } from "../../../../models";
import { useGlobalStore } from "../../../../store/globalStore";
import { positionTypeToString } from "../../../../utils/PlayerHelper";

interface PlayerFormProps {
  player?: Player;
  onClose: () => void;
}

export const PlayerForm = ({ player, onClose }: PlayerFormProps) => {
  const theme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { selectedTeam, addPlayer } = useGlobalStore((state) => {
    return {
      addPlayer: state.addPlayer,
      selectedTeam: state.selectedTeam,
    };
  }, shallow);
  const [form, setForm] = useState<PlayerPayload>({
    isCapitain: player?.isCapitain ?? false,
    name: player?.name ?? "",
    lastname: player?.lastname ?? "",
    position: player?.position ?? PositionType.CENTER_DEFENSEMAN,
    number: player?.number ?? 0,
  });
  useEffect(() => {
    return () => {};
  }, []);

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onClose();
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
  };

  const handleSelectPositionChange = (
    event: SelectChangeEvent<PositionType>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    selectedTeam && addPlayer(selectedTeam.year, form);
    onClose();
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Add new player</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="lastname">Lastname</InputLabel>
                <Input
                  name="lastname"
                  value={form.lastname}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="number">Number</InputLabel>
                <Input
                  name="number"
                  type="number"
                  value={form.number}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="position">Position</InputLabel>
                <Select
                  labelId="position-label"
                  name="position"
                  label="Position"
                  value={form.position}
                  onChange={handleSelectPositionChange}
                >
                  {Object.values(PositionType).map((key) => (
                    <MenuItem key={PositionType[key]} value={PositionType[key]}>
                      {positionTypeToString(PositionType[key])}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" fullWidth>
                <Typography variant="body1">Is Captain</Typography>
                <Switch
                  name="isCapitain"
                  checked={form.isCapitain}
                  onChange={handleCheckBoxChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={handleCreate} autoFocus>
            Create player
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
