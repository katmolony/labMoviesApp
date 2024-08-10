import React from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "../components/contentDetails";
import PageTemplate from "../components/templateContentPage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TvShowDetailsProps } from "../types/interfaces";
import SiteHeaderTV from "../components/siteHeaderTv";
import { getTvShow, getTvShowImages } from "../api/tmdb-api";

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
            return getTvShow(id || "").then(tvShow => ({
                ...tvShow,
                type: "show",
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
        <SiteHeaderTV />
            {tvShow ? (
                <PageTemplate content={tvShow}>
                    <ContentDetails {...tvShow} />
                </PageTemplate>
            ) : (
                <p>Waiting for TV show details</p>
            )}
        </>
    );
};

export default TvShowDetailsPage;