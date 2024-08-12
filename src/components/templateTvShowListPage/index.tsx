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

const TVShowListPageTemplate: React.FC< TVShowListPageTemplateProps> = ({ shows, name, action }) =>{

  return (
    <Grid container sx={styles.root}>
      <SiteHeaderTV></SiteHeaderTV>
      <Grid item xs={12}>
      <TvHeader title={name} />
      </Grid>
      <Grid item container spacing={5}>
      <TvShowList
            shows={shows}
            action={action}
            averagePopularity={20} // fix this
          />
      </Grid>
    </Grid>
  );
}
export default TVShowListPageTemplate;