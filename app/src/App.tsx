import { Route, Routes } from "react-router-dom";
import { HomePage, Layout, NotFoundPage } from "./scopes/common/pages";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useGlobalStore } from "./store/globalStore";

function App() {
  const isDarkMode = useGlobalStore((state) => state.isDarkMode);
  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#6c63ff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
