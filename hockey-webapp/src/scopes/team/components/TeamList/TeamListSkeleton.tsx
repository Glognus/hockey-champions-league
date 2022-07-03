import { Box, createTheme, Skeleton } from "@mui/material";

export const TeamListSkeleton = () => {
  const theme = createTheme();
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      }}
    >
      {Array.from(new Array(5), (_item, i) => {
        return (
          <Skeleton
            key={i}
            variant="rectangular"
            style={{ height: 100, borderRadius: 10 }}
          />
        );
      })}
    </Box>
  );
};
