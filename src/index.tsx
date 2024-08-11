import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import TvPage from "./pages/tvDetailsPage"
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MostPopular from "./pages/mostPopular";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import MustWatchMoviesPage from "./pages/mustWatch";
import TvLayout from "./components/tvLayout";
import { LanguageProvider } from './contexts/LanguageContext';
import FavouriteTvShowsPage from "./pages/favouriteTvShowPage";

import TvShowListPage from "./pages/tvHomepage";
import { BaseTVShowProps } from "./types/interfaces";
import FantasyMoviePage from "./pages/fantasyMovePage";
import TvShowReviewPage from "./pages/tvShowReviewPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const shows: BaseTVShowProps[] = [
  // Add more TV shows here
];


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader /> {/* New Header  */}
        <MoviesContextProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/mustWatch" element={<MustWatchMoviesPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/fantasy" element={<FantasyMoviePage />} />
            <Route path="/movies/mostPopular" element={<MostPopular />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />

            {/* TV Routes */}
            <Route path="/tv" element={<TvLayout />} />
            {/* <Route path="/tv" element={<TvHomepage shows={shows}/>} /> */}
            <Route path="/tv/tvHomepage" element={<TvShowListPage shows={shows} />} />
            <Route path="/tv/:id" element={<TvPage />} /> 
            <Route path="/tv/favourites" element={<FavouriteTvShowsPage />} />
            <Route path="/tv/reviews/:id" element={<TvShowReviewPage/>} />
          </Routes>
          </LanguageProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
