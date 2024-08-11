import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { ContentDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import TvShowReviews from "../tvShowReviews";

// Define styles
const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    bottom: 16,
    right: 16,
  },
};

const ContentDetails: React.FC<ContentDetailsProps> = ({
  type,
  overview,
  genres,
  runtime,
  revenue,
  vote_average,
  vote_count,
  release_date,
  movie,
  show,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        {type === "movie" && runtime && (
          <Chip icon={<AccessTimeIcon />} label={`${runtime} min.`} />
        )}
        {type === "movie" && revenue !== undefined && (
          <Chip
            icon={<MonetizationIcon />}
            label={`${revenue.toLocaleString()}`} 
          />
        )}
        <Chip
          icon={<StarRate />}
          label={`${vote_average} (${vote_count})`}
        />
        <Chip label={`Released: ${release_date}`} />
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {type === "movie" && movie && <MovieReviews {...movie} />}
        {type === "show" && show && <TvShowReviews {...show} />}
      </Drawer>
    </>
  );
};

export default ContentDetails;
