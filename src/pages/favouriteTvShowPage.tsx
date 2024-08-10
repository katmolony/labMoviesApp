import React from "react";
import TVShowListPageTemplate from "../components/templateTvShowListPage";

const FavouriteTvShowsPage: React.FC= () => {
    const toDo = () => true;
    // Get tv shows from local storage.
    const shows = JSON.parse(localStorage.getItem("favourites") || '[]');
  
    return (
      <TVShowListPageTemplate
        name="Favourite TV Shows"
        shows={shows}
        selectFavourite={toDo}
      />
    );
}
export default FavouriteTvShowsPage