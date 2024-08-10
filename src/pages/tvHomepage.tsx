import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TVShowCard from "../components/tvShowCard";
import { BaseTVShowListProps , BaseTVShowProps} from "../types/interfaces";
import TvShowList from "../components/tvShowList";
import SiteHeaderTV from "../components/siteHeaderTv";
import TvHeader from "../components/headerTvShowList";

 
const styles = {
  root: {
    padding: "20px",
  },
};

const TvShowListPage: React.FC = () => {
  const [shows, setShows] = useState<BaseTVShowProps[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((json) => json.results)
      .then((shows) => setShows(shows));
  }, []);

  const totalPopularity = shows.reduce((total, show) => total + show.popularity, 0);
  const averagePopularity = shows.length > 0 ? totalPopularity / shows.length : 0;

  console.log(`Total Popularity: ${totalPopularity}, Average Popularity: ${averagePopularity}`);

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <SiteHeaderTV />
        <TvHeader title={"TV Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <TvShowList shows={shows} averagePopularity={averagePopularity} />
      </Grid>
    </Grid>
  );
};

export default TvShowListPage;