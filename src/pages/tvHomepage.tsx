import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TVShowCard from "../components/tvShowCard";
import { FilterOption, BaseTVShowProps } from "../types/interfaces";
import TvShowList from "../components/tvShowList";
import SiteHeaderTV from "../components/siteHeaderTv";
import TvHeader from "../components/headerTvShowList";
import FilterTvShowCard from "../components/filterTvShowCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVShowListPageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";

// const styles = {
//   root: {
//     padding: "20px",
//   }, fab: {
//     marginTop: 8,
//     position: "fixed",
//     top: 2,
//     right: 2,
//   },
// };

const TvShowHomePage: React.FC = () => {
  const [shows, setShows] = useState<BaseTVShowProps[]>([]);
  const favourites = shows.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  // New function
  const addToFavouritesTVShow = (showId: number) => {
    const updatedShows = shows.map((m: BaseTVShowProps) =>
      m.id === showId ? { ...m, favourite: true } : m
    );
    setShows(updatedShows);
  };

  useEffect(() => {
    getTvShows().then(shows => {
      setShows(shows);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const totalPopularity = shows.reduce(
    (total, show) => total + show.popularity,
    0
  );
  const averagePopularity =
    shows.length > 0 ? totalPopularity / shows.length : 0;

  console.log(
    `Total Popularity: ${totalPopularity}, Average Popularity: ${averagePopularity}`
  );

  return (
    <TVShowListPageTemplate
      name='Discover TV Shows'
      shows={shows}
      selectFavourite={addToFavouritesTVShow}
    />
  );
};

export default TvShowHomePage;
