import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TemplateTvShowPage from "../components/templateTvShowPage";
import TvShowDetails from "../components/tvShowDetails";
import useTvShow from "../hooks/useTvShow";


const TvShowDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [show] = useTvShow(id ?? "");

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
