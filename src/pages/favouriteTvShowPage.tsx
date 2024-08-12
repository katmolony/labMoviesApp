import React, { useContext } from "react";
import { TvShowsContext } from "../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import TVShowListPageTemplate from "../components/templateTvShowListPage";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavouritesTv";

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

const FavouriteTvShowsPage: React.FC = () => {
  const { favourites: showIds } = useContext(TvShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);
  // Create an array of queries and run them in parallel.
  const favouriteTvShowQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["show", showId],
        queryFn: () => getTvShow(showId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvShowQueries.map((q) => q.data);
  const displayedTvShows = allFavourites ? filterFunction(allFavourites) : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const toDo = () => true;

  return (
    <>
      <TVShowListPageTemplate
        name="Favourite TV Shows"
        shows={displayedTvShows}
        action={(show) => {
          return (
            <>
              <RemoveFromFavouritesIcon {...show} />
            </>
          );
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
export default FavouriteTvShowsPage;
