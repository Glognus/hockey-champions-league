import { Container, createTheme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import { useAsync } from "react-async-hook";
import { IGif } from "@giphy/js-types";

// For demo only
const gf = new GiphyFetch("LppXzJsGPrCc9g5zqMncLr7p00uEu3mR");

export const NotFoundPage = () => {
  const [gif, setGif] = useState<IGif | null>(null);
  const theme = createTheme();
  useAsync(async () => {
    const { data } = await gf.random({
      tag: "hockey",
      rating: "pg-13",
    });
    setGif(data);
  }, []);

  return (
    <Container
      fixed
      style={{
        alignSelf: "center",
        alignItems: "center",
        gap: theme.spacing(2),
      }}
    >
      <Box>
        <Typography variant="h2" textAlign={"center"}>
          Oops
        </Typography>
        <Typography variant="h3" textAlign={"center"}>
          This page does not seem to exist. 😔
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        {gif && <Gif gif={gif} width={600} noLink hideAttribution />}
      </Box>
    </Container>
  );
};
