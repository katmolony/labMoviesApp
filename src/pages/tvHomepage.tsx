import React, { useState, useEffect } from "react";
import { FilterOption, BaseTVShowProps } from "../types/interfaces";
import TVShowListPageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { DiscoverTVShows } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesTv";

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
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>("discovertv", getTvShows);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" // might have to change to name
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const shows = data ? data.results : [];
  const displayTvShows = filterFunction(shows);

  //  Redundant, but necessary to avoid app crashing.
    const favourites = shows.filter(m => m.favourite)
    localStorage.setItem("tvfavourites", JSON.stringify(favourites));
    const addToFavouritesTVShow = (showsId: number) => true;

  return (
    <>
      <TVShowListPageTemplate
        name="Discover TV Shows"
        shows={displayTvShows}
        selectFavourite={addToFavouritesTVShow}
        action={(show: BaseTVShowProps) => {
          return <AddToFavouritesIcon {...show} />
        }}
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
