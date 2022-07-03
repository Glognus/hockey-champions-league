import { Box, Button, createTheme, Paper, Skeleton } from "@mui/material";
export const TeamItemSkeleton = () => {
  const theme = createTheme();
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
        <Skeleton variant="circular" sx={{ width: 80, height: 80 }}></Skeleton>
        <Box
          style={{
            display: "flex",
            flexGrow: 1,
            gap: theme.spacing(2),
            flexDirection: "row",
          }}
        >
          <div>
            <Skeleton variant="text" key={"body1"} width={100} />
            <Skeleton variant="text" key={"h5"} width={100} />
          </div>
          <div>
            <Skeleton variant="text" key={"body1"} width={100} />
            <Skeleton variant="text" key={"h5"} width={100} />
          </div>
        </Box>
        <Button variant="contained" color="primary" disabled>
          Add new player
        </Button>
      </Box>
      <Skeleton variant="rectangular" key={"table"} sx={{ height: 400 }} />
    </Paper>
  );
};
