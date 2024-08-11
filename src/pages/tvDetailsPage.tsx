import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "../components/contentDetails";
import PageTemplate from "../components/templateContentPage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TvShowDetailsProps } from "../types/interfaces";
import SiteHeaderTV from "../components/siteHeaderTv";
import { getTvShow } from "../api/tmdb-api";
import TvShowDetails from "../components/tvShowDetails";

// Define the type for the TV show details including `type`
interface TvShowDetailsWithType extends TvShowDetailsProps {
    type: "show";
}

const TvShowDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [show, setShow] = useState<TvShowDetailsWithType | undefined>();

    useEffect(() => {
        getTvShow(id ?? "").then((show) => {
            setShow({ ...show, type: "show" });
        });
    }, [id]);

    const { data: tvShow, error, isLoading, isError } = useQuery<TvShowDetailsWithType, Error>(
        ["tvShow", id],
        () => getTvShow(id || "").then(tvShow => ({ ...tvShow, type: "show" }))
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            <SiteHeaderTV />
            {show ? (
                <PageTemplate content={show}>
                    <TvShowDetails {...show} />
                </PageTemplate>
            ) : (
                <p>Waiting for TV show details</p>
            )}
        </>
    );
};

export default TvShowDetailsPage;
