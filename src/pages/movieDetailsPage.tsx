import React from "react";
import { useParams } from "react-router-dom";
import TemplateContentPage from "../components/templateContentPage";
import { getMovie, getSimilarMovies, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import {
  MovieDetailsProps,
  BaseMovieProps,
  BaseMovieListProps,
  DiscoverSimilarMovies,
  MovieCredits
} from "../types/interfaces";
import MovieDetails from "../components/movieDetails";
import MovieList from "../components/movieList";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import MovieCreditsList from "../components/movieCredits";

interface MovieDetailsWithType extends MovieDetailsProps {
  type: "movie";
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  // Fetch movie details
  const {
    data: movie,
    error: movieError,
    isLoading: isLoadingMovie,
    isError: isMovieError,
  } = useQuery<MovieDetailsWithType, Error>(["movie", id], () =>
    getMovie(id || "").then((movie) => ({
      ...movie,
      type: "movie",
    }))
  );

  // Fetch similar movies
  const {
    data: similarMovies,
    error: similarMoviesError,
    isLoading: isLoadingSimilarMovies,
    isError: isSimilarMoviesError,
  } = useQuery<DiscoverSimilarMovies, Error>(["similarMovies", id], () =>
    getSimilarMovies(id || "")
  );

  // Fetch movie credits (cast)
  const {
    data: credits,
    error: creditsError,
    isLoading: isLoadingCredits,
    isError: isCreditsError,
  } = useQuery<MovieCredits, Error>(["credits", id], () =>
    getMovieCredits(id || "")
  );

  if (isLoadingMovie || isLoadingSimilarMovies || isLoadingCredits ) {
    return <Spinner />;
  }

  if (isMovieError) {
    return <h1>{(movieError as Error).message}</h1>;
  }

  if (isSimilarMoviesError) {
    return <h1>{(similarMoviesError as Error).message}</h1>;
  }

  if (isCreditsError) {
    return <h1>{(creditsError as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <TemplateContentPage content={movie}>
          <MovieDetails {...movie} />
          <MovieCreditsList movieData={credits} />
          {similarMovies && (
            <PageTemplate
              title="Similar Movies"
              movies={similarMovies.results}
              action={(movie: BaseMovieProps) => (
                <>
                  <AddToFavouritesIcon {...movie} />
                  <AddToMustWatchIcon {...movie} />
                </>
              )}
            />
          )}
        </TemplateContentPage>
      ) : (
        <p>Waiting for movie details</p>
      )}

      {similarMovies && (
        <PageTemplate
          title="Similar Movies"
          movies={similarMovies.results}
          action={(movie: BaseMovieProps) => (
            <>
              {/* <AddToFavouritesIcon {...movie} />
                          <AddToMustWatchIcon {...movie} /> */}
            </>
          )}
        />
      )}
    </>
  );
};

export default MovieDetailsPage;
