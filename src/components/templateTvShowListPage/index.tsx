import React from "react";
import TvHeader from "../headerTvShowList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvShowList";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const TvShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({ shows, name, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <TvHeader title={name} />
      </Grid>
      <Grid item container spacing={5}>
      <TvShowList action={action} shows={shows}></TvShowList>
      </Grid>
    </Grid>
  );
}
export default TvShowListPageTemplate;