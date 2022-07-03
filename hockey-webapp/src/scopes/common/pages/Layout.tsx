import {
  AppBar,
  createTheme,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useGlobalStore } from "../../../store/globalStore";
import shallow from "zustand/shallow";
import { SnackBar } from "../components";

export const Layout = () => {
  const theme = createTheme();
  const switchDarkMode = useGlobalStore(
    (state) => state.switchDarkMode,
    shallow
  );
  const handleSwitchTheme = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    switchDarkMode();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div>
          <AppBar position="relative" color="primary">
            <Toolbar>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Hockey champion's league
              </Typography>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleSwitchTheme}
                  color="inherit"
                >
                  <DarkModeIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ display: "flex", flexGrow: 1, overflow: "auto" }}>
          <Outlet />
        </div>
        <div>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ padding: theme.spacing(1) }}
          >
            Made with ❤️ by{" "}
            {<Link href="https://github.com/Glognus">Glognus</Link>}
          </Typography>
        </div>
        <SnackBar />
      </div>
    </>
  );
};
