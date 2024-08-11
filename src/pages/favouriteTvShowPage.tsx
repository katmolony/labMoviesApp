import React from "react";
import TVShowListPageTemplate from "../components/templateTvShowListPage";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
}  from "../components/tvShowFilterUI";

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

const FavouriteTvShowsPage: React.FC= () => {
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const favouriteTvShows = JSON.parse(localStorage.getItem("tvfavourites") || '[]');

  const displayedTvShows = filterFunction(favouriteTvShows);

  const toDo = () => true;

    return (
      <>
      <TVShowListPageTemplate
        name="Favourite TV Shows"
        shows={displayedTvShows}
        selectFavourite={toDo}
      />
      <TvShowFilterUI
      onFilterValuesChange={changeFilterValues}
      titleFilter={filterValues[0].value}
      genreFilter={filterValues[1].value}
    />
  </>
    );
}
export default FavouriteTvShowsPage