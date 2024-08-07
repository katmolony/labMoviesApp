import React from "react";
import TvShow from "../tvShowCard/";
import Grid from "@mui/material/Grid";
import { BaseTVShowListProps } from "../../types/interfaces";

const TvShowList: React.FC<BaseTVShowListProps> = ({shows}) => {
  let tvShowCards = shows.map((s) => (
    <Grid key={s.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TvShow key={s.id} {...s} />
    </Grid>
  ));
  return tvShowCards;
}

  export default TvShowList;