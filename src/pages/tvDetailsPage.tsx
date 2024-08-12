import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TemplateTvShowPage from "../components/templateTvShowPage";
import TvShowDetails from "../components/tvShowDetails";
import useTvShow from "../hooks/useTvShow";
import { getTvShow } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TvShowDetailsProps } from "../types/interfaces";


const TvShowDetailsPage: React.FC = () => {
    const { id } = useParams();
    // const [show] = useTvShow(id ?? "");
    const { data: show, error, isLoading, isError } = useQuery<TvShowDetailsProps, Error>(
        ["show", id],
        ()=> getTvShow(id||"")
      );
    
      if (isLoading) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h1>{(error as Error).message}</h1>;
      }
    

    return (
        <>
          {show ? (
            <>
            <TemplateTvShowPage show={show}> 
              <TvShowDetails {...show} />
            </TemplateTvShowPage>
          </>
        ) : (
          <p>Waiting for movie details</p>
        )}
        </>
      );
    };


export default TvShowDetailsPage;
