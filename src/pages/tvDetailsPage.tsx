import React from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "../components/contentDetails";
import PageTemplate from "../components/templateContentPage";
import { getTvShow } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TvShowDetailsProps } from "../types/interfaces";
import SiteHeaderTV from "../components/siteHeaderTv";

// Define the type for the TV show details including `type`
interface TvShowDetailsWithType extends TvShowDetailsProps {
    type: "show";
}

const TvShowDetailsPage: React.FC = () => {
    const { id } = useParams();
    
    // Use query to fetch TV show details
    const { data: tvShow, error, isLoading, isError } = useQuery<TvShowDetailsWithType, Error>(
        ["tvShow", id],
        () => {
            // Fetch the TV show and add type property
            return getTvShow(id || "").then(tvShow => ({
                ...tvShow,
                type: "show", // Add the type property here
            }));
        }
    );

    // Show a spinner while loading
    if (isLoading) {
        return <Spinner />;
    }

    // Show error message if there's an error
    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    // Render the TV show details page
    return (
        <>
        <SiteHeaderTV />
            {tvShow ? (
                <PageTemplate content={tvShow}> {/* Adjust to use a single PageTemplate for both movies and TV shows */}
                    <ContentDetails {...tvShow} />
                </PageTemplate>
            ) : (
                <p>Waiting for TV show details</p>
            )}
        </>
    );
};

export default TvShowDetailsPage;