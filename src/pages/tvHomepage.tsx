import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TVShowCard from "../components/tvShowCard";
import { FilterOption , BaseTVShowProps} from "../types/interfaces";
import TvShowList from "../components/tvShowList";
import SiteHeaderTV from "../components/siteHeaderTv";
import TvHeader from "../components/headerTvShowList";
import FilterTvShowCard from "../components/filterTvShowCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

 
const styles = {
  root: {
    padding: "20px",
  }, fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};


const TvShowListPage: React.FC = () => {
  const [shows, setShows] = useState<BaseTVShowProps[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  let displayedTvShows = shows
  .filter((m: BaseTVShowProps) => {
    return m.name.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
  })
  .filter((m: BaseTVShowProps) => {
    return genreId > 0 ? m.genre_ids?.includes(genreId) : true;
  });

  const handleChange = (type: FilterOption, value: string) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
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
    <>
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
      <SiteHeaderTV />
    //     <TvHeader title={"TV Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
      <TvShowList shows={displayedTvShows} averagePopularity={averagePopularity} />
        {/* <MovieList movies={displayedMovies}></MovieList> */}
      </Grid>
    </Grid>
    <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
    </Fab>
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <FilterTvShowCard
        onUserInput={handleChange}
        titleFilter={titleFilter}
        genreFilter={genreFilter}
      />
    </Drawer>
  </>
    // <Grid container sx={styles.root}>
    //   <Grid item xs={12}>
    //     <SiteHeaderTV />
    //     <TvHeader title={"TV Home Page"} />
    //   </Grid>
    //   <Grid item container spacing={5}>
    //     <TvShowList shows={shows} averagePopularity={averagePopularity} />
    //   </Grid>
    // </Grid>
  );
};

export default TvShowListPage;