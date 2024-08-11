import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { getGenres, getMovies, getMovieDetails } from "../../api/tmdb-api";
import { MovieDetailsProps, GenreData, BaseMovieProps } from "../../types/interfaces";

interface FantasyMovieFormProps {
  onSave: () => void;
}

const FantasyMovieForm: React.FC<FantasyMovieFormProps> = ({ onSave }) => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [genres, setGenres] = useState<GenreData["genres"]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsProps | null>(
    null
  );
  const [fantasyMovie, setFantasyMovie] = useState<Partial<MovieDetailsProps>>(
    {}
  );

  useEffect(() => {
    getMovies().then((data) => setMovies(data.results));
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  const handleMovieSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const movieId = event.target.value as string;
    getMovieDetails(movieId).then((data) => {
      setSelectedMovie(data);
      setFantasyMovie({
        title: data.title,
        overview: data.overview,
        genres: data.genres,
        release_date: data.release_date,
        runtime: data.runtime,
        production_countries: data.production_countries,
      });
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFantasyMovie({ ...fantasyMovie, [name]: value });
  };

  const saveFantasyMovie = () => {
    localStorage.setItem("fantasyMovie", JSON.stringify(fantasyMovie));
    alert("Fantasy movie saved!");
    onSave(); // Notify the parent component to refresh the displayed movie
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Fantasy Movie
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Movie</InputLabel>
            <Select value={selectedMovie?.id || ""} onChange={handleMovieSelect}>
              <MenuItem value="">
                <em>Select a Movie</em>
              </MenuItem>
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {selectedMovie && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={fantasyMovie.title || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Overview"
                name="overview"
                value={fantasyMovie.overview || ""}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Genres</InputLabel>
                <Select
                  name="genres"
                  multiple
                  value={fantasyMovie.genres?.map((g) => g.id) || []}
                  onChange={(event) =>
                    setFantasyMovie({
                      ...fantasyMovie,
                      genres: genres.filter((genre) =>
                        event.target.value.includes(genre.id)
                      ),
                    })
                  }
                  renderValue={(selected) =>
                    genres
                      .filter((genre) => selected.includes(genre.id))
                      .map((genre) => genre.name)
                      .join(", ")
                  }
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Release Date"
                type="date"
                name="release_date"
                value={fantasyMovie.release_date || ""}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Runtime (minutes)"
                type="number"
                name="runtime"
                value={fantasyMovie.runtime || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Production Countries</InputLabel>
                <Select
                  name="production_countries"
                  multiple
                  value={
                    fantasyMovie.production_countries?.map((c) => c.name) || []
                  }
                  onChange={(event) =>
                    setFantasyMovie({
                      ...fantasyMovie,
                      production_countries: selectedMovie.production_countries.filter(
                        (country) =>
                          event.target.value.includes(country.name)
                      ),
                    })
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {selectedMovie.production_countries.map((country) => (
                    <MenuItem key={country.id} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveFantasyMovie}
              >
                Save Fantasy Movie
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default FantasyMovieForm;