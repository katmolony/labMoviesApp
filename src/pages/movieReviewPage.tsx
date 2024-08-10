import React from "react";
import { useLocation } from "react-router-dom";
import TemplateContentPage from "../components/templateContentPage";
import MovieReview from "../components/movieReview";

const MovieReviewPage: React.FC = () => {
  const { state: { movie, review } } = useLocation();

  return (
    <TemplateContentPage content={movie}>
      <MovieReview {...review} />
    </TemplateContentPage>
  );
};

export default MovieReviewPage;