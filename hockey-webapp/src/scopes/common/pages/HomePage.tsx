import { Container, Grid } from "@mui/material";
import { TeamItem } from "../../team/components/TeamItem";
import { TeamList } from "../../team/components/TeamList";
export const HomePage = () => {
  return (
    <Container fixed style={{ alignSelf: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TeamList />
        </Grid>
        <Grid item xs={7}>
          <TeamItem />
        </Grid>
      </Grid>
    </Container>
  );
};
