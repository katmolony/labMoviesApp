import React from "react";
import { useLocation } from "react-router-dom";
// import TemplateContentPage from "../components/templateContentPage";
import TemplateTvShowPage from "../components/templateTvShowPage";
import TvShowReview from "../components/tvShowReview";

const MovieReviewPage: React.FC = () => {
  const { state : {show, review } } = useLocation()
  return (
    <TemplateTvShowPage show={show}>
      <TvShowReview {...review} />
    </TemplateTvShowPage>
  );
};

export default MovieReviewPage;
