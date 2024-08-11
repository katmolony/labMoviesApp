import React, { useState, useEffect } from "react";
import { FilterOption, BaseTVShowProps } from "../types/interfaces";
import TVShowListPageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TvShowHomePage: React.FC = () => {
  const [shows, setShows] = useState<BaseTVShowProps[]>([]);
  const favourites = shows.filter((m) => m.favourite);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  localStorage.setItem("tvfavourites", JSON.stringify(favourites));

  const addToFavouritesTVShow = (showId: number) => {
    const updatedShows = shows.map((m: BaseTVShowProps) =>
      m.id === showId ? { ...m, favourite: true } : m
    );
    setShows(updatedShows);
  };

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" // might have to change to name
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  useEffect(() => {
    getTvShows().then((shows) => {
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

  const displayTvShows = filterFunction(shows);

  return (
    <>
      <TVShowListPageTemplate
        name="Discover TV Shows"
        shows={displayTvShows}
        selectFavourite={addToFavouritesTVShow}
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TvShowHomePage;
