import React from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "../components/contentDetails";
import TemplateContentPage from "../components/templateContentPage"; 
import { getMovie } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps } from "../types/interfaces";

interface MovieDetailsWithType extends MovieDetailsProps {
    type: "movie";
}

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams();
    
    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsWithType, Error>(
        ["movie", id],
        () => {
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
                <TemplateContentPage content={movie}>
                    <ContentDetails {...movie} />
                </TemplateContentPage>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MovieDetailsPage;