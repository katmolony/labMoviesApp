import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DiscoverMemberCredits } from "../../types/interfaces";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";
interface FilmographyProps {
  credits: DiscoverMemberCredits;
}

const Filmography: React.FC<FilmographyProps> = ({ credits }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Filmography
      </Typography>
      <Grid container spacing={3}>
        {credits?.cast?.length > 0 ? (
          credits.cast.map((credit) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={credit.id}>
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
                {/* Action buttons */}
                <Grid container spacing={1} sx={{ marginTop: 2 }}>
                  <Grid item>
                    <AddToFavouritesIcon {...credit} />
                  </Grid>
                  <Grid item>
                    <AddToMustWatchIcon {...credit} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No credits available.</Typography>
        )}
      </Grid>
    </Paper>
  );
};

export default Filmography;
