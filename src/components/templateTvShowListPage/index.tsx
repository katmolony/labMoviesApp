import React from "react";
import TvHeader from "../headerTvShowList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvShowList";
import { TVShowListPageTemplateProps, BaseTVShowListProps } from "../../types/interfaces";


const styles = {
  root: {
    padding: "20px",
  },
};

const TvShowListPage: React.FC<BaseTVShowListProps> = ({ shows }) => {
  const totalPopularity = shows.reduce((total, show) => total + show.popularity, 0);

  console.log(` frominterface TvShowCardProps {
    show: BaseTVShowProps;
    totalPopularity: number;
  }
  
  const TVShowCard: React.FC<TvShowCardProps> = ({ show, totalPopularity }) => {
    const popularityPercentage = totalPopularity > 0 
      ? ((show.popularity / totalPopularity) * 100).toFixed(2)
      : '0.00';
  
    console.log(`from template page Show: ${show.name}, Popularity: ${show.popularity}, Percentage: ${popularityPercentage}%, Total Popularity: ${totalPopularity}`);
  
    return (
      <Card>
        <CardMedia
          component="img"
          height="140"
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
  
  export default TVShowCard;interface TvShowCardProps {
    show: BaseTVShowProps;
    totalPopularity: number;
  }
  
  const TVShowCard: React.FC<TvShowCardProps> = ({ show, totalPopularity }) => {
    const popularityPercentage = totalPopularity > 0 
      ? ((show.popularity / totalPopularity) * 100).toFixed(2)
      : '0.00';
  
    console.log(`Show: ${show.name}, Popularity: ${show.popularity}, Percentage: ${popularityPercentage}%, Total Popularity: ${totalPopularity}`);
  
    return (
      <Card>
        <CardMedia
          component="img"
          height="140"
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
  
  export default TVShowCard;interface TvShowCardProps {
    show: BaseTVShowProps;
    totalPopularity: number;
  }
  
  const TVShowCard: React.FC<TvShowCardProps> = ({ show, totalPopularity }) => {
    const popularityPercentage = totalPopularity > 0 
      ? ((show.popularity / totalPopularity) * 100).toFixed(2)
      : '0.00';
  
    console.log(`Show: ${show.name}, Popularity: ${show.popularity}, Percentage: ${popularityPercentage}%, Total Popularity: ${totalPopularity}`);
  
    return (
      <Card>
        <CardMedia
          component="img"
          height="140"
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
  
  export default TVShowCard;Total Popularity: ${totalPopularity}`); // Log total popularity

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <h2>TV Shows</h2>
      </Grid>
      <Grid item container spacing={5}>
        <TvShowList shows={shows} totalPopularity={totalPopularity} />
      </Grid>
    </Grid>
  );
};

export default TvShowListPage;