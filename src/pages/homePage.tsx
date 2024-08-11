import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

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

const HomePage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("popularity");

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
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
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const changeSortOption = (option: string) => {
    setSortOption(option);
  };

  const movies = data ? data.results : [];
  const filteredMovies = filterFunction(movies);

  // Sort movies based on the selected sort option
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);
      case "release_date":
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      case "popularity":
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={sortedMovies}
        action={(movie: BaseMovieProps) => (
          <>
            <AddToFavouritesIcon {...movie} />
            <AddToMustWatchIcon {...movie} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortOption={sortOption}
        onSortOptionChange={changeSortOption}
      />
    </>
  );
};

export default HomePage;
