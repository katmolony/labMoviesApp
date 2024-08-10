import React, {useState} from "react";
import TvHeader from "../headerTvShowList";
import FilterTvShowCard from "../filterTvShowCard";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvShowList";
import { TVShowListPageTemplateProps, BaseTVShowListProps } from "../../types/interfaces";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import SiteHeaderTV from "../siteHeaderTv";


const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const TVShowListPageTemplate: React.FC< TVShowListPageTemplateProps> = ({ shows, name, selectFavourite }) =>{
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const genreId = Number(genreFilter);

  let displayedShows = shows
    .filter((m) => {
      return m.name.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids?.includes(genreId) : true;
    });

  const handleChange = (type: string, value: string) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  return (
   <>
      <Grid container sx={styles.root}>
      <SiteHeaderTV></SiteHeaderTV>
        <Grid item xs={12}>
          <TvHeader title={name} />
        </Grid>
        <Grid item container spacing={5}>
          <TvShowList
            shows={displayedShows}
            selectFavourite={selectFavourite}
            averagePopularity={20} // fix this
          />
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
  );
}
export default TVShowListPageTemplate;