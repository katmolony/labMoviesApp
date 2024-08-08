import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { BaseTVShowProps } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)", // red for favourites
  },
  avatarMustWatch: {
    backgroundColor: "rgb(0, 0, 255)", // blue for must-watch
  },
};

interface TvShowCardProps {
  show: BaseTVShowProps;
 action: (s: BaseTVShowProps) => React.ReactNode;
}

const TVShowCard: React.FC<BaseTVShowProps> = ( show ) => {
  return (
    <Card sx={styles.card}>
      <CardMedia sx={styles.media}
        component="img"
        height="140"
        image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <h1>{show.name}</h1>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <h3>Overview: </h3> {show.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TVShowCard;