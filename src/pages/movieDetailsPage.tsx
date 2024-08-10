import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import ContentDetails from "../components/contentDetails";
import PageTemplate from "../components/templateMoviePage";
// import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps } from "../types/interfaces";

// Define the type for the movie details including `type`
interface MovieDetailsWithType extends MovieDetailsProps {
    type: "movie";
  }
  
  const MovieDetailsPage: React.FC = () => {
    const { id } = useParams();
    
    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsWithType, Error>(
      ["movie", id],
      () => {
        // Fetch the movie and add type property
        return getMovie(id || "").then(movie => ({
          ...movie,
          type: "movie", // Add the type property here
        }));
      }
    );

    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{(error as Error).message}</h1>;
    }

    return (
      <>
        {movie ? (
          <PageTemplate movie={movie}>
            <ContentDetails {...movie} />
          </PageTemplate>
        ) : (
          <p>Waiting for movie details</p>
        )}
      </>
    );
  };
  
  export default MovieDetailsPage;