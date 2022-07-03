import { Snackbar, Alert } from "@mui/material";
import shallow from "zustand/shallow";
import { useGlobalStore } from "../../../store/globalStore";

export const SnackBar = () => {
  const snackbar = useGlobalStore((state) => state.snackbar, shallow);
  const closeSnackbar = useGlobalStore((state) => state.closeSnackbar, shallow);
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // We don't close snackbar if the user clicks over the snackbar
    if (reason === "clickaway") return;

    closeSnackbar();
  };
  return (
    <Snackbar
      open={snackbar?.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar?.severity}
        sx={{ width: "100%" }}
      >
        {snackbar?.message}
      </Alert>
    </Snackbar>
  );
};
