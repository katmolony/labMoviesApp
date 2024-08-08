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

// const TvShowListPage: React.FC<BaseTVShowListProps> = ({ shows }) => {
  const TvShowListPage: React.FC= () => {
  const [shows, setShows] = useState<BaseTVShowProps[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("this is tv show", json)
        return json.results;
      })
      .then((shows) => {
        setShows(shows);
      });
  }, []);
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <SiteHeaderTV/>
        <TvHeader title={"TV Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <TvShowList shows={shows}></TvShowList>
      </Grid>
    </Grid>
  );
};

export default TvShowListPage;