import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { TVShowDetailsProps, BaseTVShowProps } from "../../types/interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { showsContext } from "../../contexts/showsContext";
import { TvShowDetailsProps } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const TvHeader: React.FC<TvShowDetailsProps> = (show) => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  const favourite = favourites.find(
    (favourite: TvShowDetailsProps) => favourite.id === show.id
  );

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      {
      favourite ? (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      ) : null
      }
      <Typography variant="h4" component="h3">
        {show.name}
        {"   "}
        {/* <a href={show.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a> */}
        <br />
        <span>{`${show.first_air_date}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TvHeader;
