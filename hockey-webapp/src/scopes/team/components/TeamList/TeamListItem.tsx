import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useGlobalStore } from "../../../../store/globalStore";

export const TeamListItem = ({
  year,
  coach,
}: {
  year: number;
  coach: string;
}) => {
  const [color] = useState(
    `#${Math.floor(Math.random() * 0xffffff).toString(16)}` // random custom color
  );
  const fetchTeam = useGlobalStore((state) => state.fetchTeam);
  return (
    <Card sx={{ display: "flex" }} onClick={() => fetchTeam(year)}>
      <CardActionArea>
        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: "center",
            backgroundColor: color,
          }}
        >
          <Typography variant="h5">{year}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {coach}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
