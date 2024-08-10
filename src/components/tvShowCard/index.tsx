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
  averagePopularity: number;
}

const TVShowCard: React.FC<TvShowCardProps> = ({ show, averagePopularity }) => {
  const popularityPercentage = averagePopularity > 0 
    ? ((show.popularity / averagePopularity) * 100).toFixed(2)
    : '0.00';

  console.log(`Show: ${show.name}, Popularity: ${show.popularity}, Percentage: ${popularityPercentage}%`);

  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        // height="140"
        image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {show.name}
        </Typography>
        <Typography variant="body2">
          Popularity: {popularityPercentage}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview: {show.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TVShowCard;