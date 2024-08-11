import React, { useEffect, useState } from "react";
import { MovieDetailsProps } from "../types/interfaces";
import FantasyMovieForm from "../components/fantasyMovie";

const FantasyMoviePage: React.FC = () => {
  const [fantasyMovie, setFantasyMovie] = useState<MovieDetailsProps | null>(null);

  const refreshFantasyMovie = () => {
    const movieData = localStorage.getItem("fantasyMovie");
    if (movieData) {
      setFantasyMovie(JSON.parse(movieData));
    }
  };

  useEffect(() => {
    refreshFantasyMovie();
  }, []);

  return (
    <>
      <FantasyMovieForm onSave={refreshFantasyMovie} />
      <div>
        {fantasyMovie ? (
          <>
            <h2>My Fantasy Movie</h2>
            <h3>{fantasyMovie.title}</h3>
            <p>{fantasyMovie.overview}</p>
            <p>Genres: {fantasyMovie.genres.map(g => g.name).join(", ")}</p>
            <p>Release Date: {fantasyMovie.release_date}</p>
            <p>Runtime: {fantasyMovie.runtime} minutes</p>
            <p>Production Countries: {fantasyMovie.production_countries.map(c => c.name).join(", ")}</p>
          </>
        ) : (
          <p>No fantasy movie saved.</p>
        )}
      </div>
    </>
  );
};

export default FantasyMoviePage;