import React, { useState, useEffect } from "react";
import { FilterOption, BaseTVShowProps } from "../types/interfaces";
import TVShowListPageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";

const TvShowHomePage: React.FC = () => {
  const [shows, setShows] = useState<BaseTVShowProps[]>([]);
  const favourites = shows.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

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
