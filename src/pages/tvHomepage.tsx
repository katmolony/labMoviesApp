import React from "react";
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import TvShowList from "../components/tvShowList";
import { BaseTVShowListProps } from "../types/interfaces";
 
const styles = {
  root: {
    padding: "20px",
  },
};



const TvShowListPage: React.FC<BaseTVShowListProps> = ({shows}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <TvShowList shows={shows}></TvShowList>
      </Grid>
    </Grid>
  );
};
export default TvShowListPage;