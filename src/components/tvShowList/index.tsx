import React from "react";
import TVShowCard from "../tvShowCard/";  // Import your TVShowCard component
import Grid from "@mui/material/Grid";
import { BaseTVShowListProps } from "../../types/interfaces";

interface TvShowListProps extends BaseTVShowListProps {
  averagePopularity: number;
}

const TvShowList: React.FC<BaseTVShowListProps> = ({ shows, action }) => {
  return shows.map((show) => (
    <Grid key={show.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVShowCard key={show.id} show={show} action={action} averagePopularity={10} />
    </Grid>
  ));
};

export default TvShowList;