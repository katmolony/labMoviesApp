import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DiscoverMemberCredits, CastCredit } from "../../types/interfaces";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";
import { Link } from "react-router-dom";
import { Button, Box, Card, CardHeader, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { MoviesContext } from "../../contexts/moviesContext";

interface FilmographyProps {
  credits: DiscoverMemberCredits;
}

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

const Filmography: React.FC<FilmographyProps> = ({ credits }) => {
  const { favourites, mustWatch } = useContext(MoviesContext);

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Filmography
      </Typography>
      <Grid container spacing={3}>
        {credits?.cast?.length > 0 ? (
          credits.cast.map((credit: CastCredit) => {
            const isFavourite = favourites.includes(credit.id);
            const isMustWatch = mustWatch.includes(credit.id);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={credit.id}>
                <Card sx={styles.card}>
                  <CardHeader
                    avatar={
                      <div>
                        {isFavourite && (
                          <Avatar sx={styles.avatar}>
                            <FavoriteIcon />
                          </Avatar>
                        )}
                        {isMustWatch && (
                          <Avatar sx={styles.avatarMustWatch}>
                            <PlaylistAddCheckIcon />
                          </Avatar>
                        )}
                      </div>
                    }
                  />
                  <Paper elevation={1} sx={{ padding: 2 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${credit.poster_path || "/placeholder.jpg"}`}
                      alt={credit.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <Typography variant="h6" component="h3" gutterBottom>
                      {credit.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {credit.character}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(credit.release_date).toDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Rating: {credit.vote_average}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {credit.overview}
                    </Typography>
                    <Grid container spacing={1} sx={{ marginTop: 2 }}>
                      <Grid item>
                        <AddToFavouritesIcon {...credit} />
                      </Grid>
                      <Grid item>
                        <AddToMustWatchIcon {...credit} />
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start" mt={2}>
                          <Button variant="outlined" size="medium" color="primary" component={Link} to={`/movies/${credit.id}`}>
                            More Info ...
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1">No credits available.</Typography>
        )}
      </Grid>
    </Paper>
  );
};

export default Filmography;

