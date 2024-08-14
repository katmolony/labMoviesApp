import React, { MouseEvent, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { BaseTVShowProps } from "../../types/interfaces";
import { useLanguageMap } from "../../contexts/LanguageContext";
import Avatar from "@mui/material/Avatar";
import { CardHeader } from "@mui/material";
import { TvShowsContext } from "../../contexts/tvShowsContext";

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

const truncateText = (text: string, maxLength: number) => {
  if (!text || text.trim() === "") {
    return "Overview to be added";
  }
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

interface TvShowCardProps {
  show: BaseTVShowProps;
  action: (show: BaseTVShowProps) => React.ReactNode;
  averagePopularity: number;
}

const TVShowCard: React.FC<TvShowCardProps> = ({show, action, averagePopularity}) => {
  const languageMap = useLanguageMap();
  const popularityPercentage =
    averagePopularity > 0
      ? ((show.popularity / averagePopularity) * 100).toFixed(2)
      : "0.00";

  const maxOverviewLength = 100; // max value of the overview

  const languageName =
    languageMap[show.original_language] || show.original_language;

    const { favourites, addToFavourites } = useContext(TvShowsContext);//NEW

    const isFavourite = favourites.find((id) => id === show.id)? true : false;//NEW
     
  return (
    
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {show.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {show.name}
        </Typography>
        {/* <Typography variant="body2">
          Popularity: {popularityPercentage}%
        </Typography> */}
        <Typography variant="body2">Language: {languageName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Overview: {truncateText(show.overview, maxOverviewLength)}
        </Typography>
        <CardActions disableSpacing>
        {action(show)}
          <Link to={`/tv/${show.id}`}>
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default TVShowCard;
