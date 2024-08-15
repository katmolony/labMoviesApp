# Movie & TV Show App

A React application that pulls data from The Movie Database (TMDb) API to display movies, TV shows, and people information. This app allows users to explore various movies, TV shows, and discover details about different people in the entertainment industry.

## Features

- **Movies**: Browse and search for movies, view detailed movie information including cast, crew, and more.
- **TV Shows**: Explore TV shows, view show details, and check out episodes and seasons.
- **People**: Find details about actors, directors, and other people in the film industry, along with their filmography.

## Technologies

- **React**: Frontend library for building user interfaces.
- **React Router**: For routing and navigation.
- **Material-UI**: For UI components and styling.
- **React Query**: For data fetching and caching.
- **TypeScript**: For type safety and better development experience.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine. If you don't have these, you can download and install them from [Node.js official site](https://nodejs.org/).

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/katmolony/labMoviesApp.git
   cd labMoviesApp 

2. **Install dependencies**

    ```bash
     npm install

3. **Set up environment variables**

    Create a .env file in the root of the project and add your TMDb API key:
    
      ```plaintext
      REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here

4. **Start the development server**

    ```bash
    npm start

  The app will be available at http://localhost:3000.

## Usage
- **Home Page**: Displays featured movies and TV shows.
- **Movies Page**: Browse and search for movies.
- **TV Shows Page**: Browse and search for TV shows.
- **People Page**: Discover details about actors and other people in the industry.
- **Movie Details**: View detailed information about a movie, including cast, crew, and reviews.
- **TV Show Details**: View detailed information about a TV show, including episodes, seasons, and cast.

## API Integration
  The application uses The Movie Database (TMDb) API to fetch data. Make sure to replace your_tmdb_api_key_here in the .env file with your actual TMDb API key. You can obtain an API key by signing up at TMDb API.

### API Endpoints Used

#### Movies

Get popular movies: GET /movie/popular
Get movie details: GET /movie/{movie_id}
Search for movies: GET /search/movie

#### TV Shows

Get popular TV shows: GET /tv/popular
Get TV show details: GET /tv/{tv_id}
Search for TV shows: GET /search/tv

#### People

Get popular people: GET /person/popular
Get person details: GET /person/{person_id}
Search for people: GET /search/person

### Code Overview

#### Components

- **MovieListPage**: Displays a list of movies with search and filter options.
- **MovieDetailPage**: Shows detailed information about a specific movie.
- **TVShowListPage**: Displays a list of TV shows with search and filter options.
- **TVShowDetailPage**: Shows detailed information about a specific TV show.
- **PersonDetailPage**: Displays information about a person, including their filmography.
- **Filmography**: Shows the filmography of a person, including movies and TV shows they have been involved in.

#### Pages

- **HomePage**: The main landing page that features popular movies and TV shows.
- **MoviesPage**: Page that lists movies with options to view details and perform actions like adding to favourites.
- **TVShowsPage**: Page that lists TV shows with options to view details and perform actions like adding to must-watch.
- **PeoplePage**: Page to explore people and view their details and filmography.

#### API Hooks

- **useQuery**: Utilized for fetching data from the TMDb API and managing caching with React Query.

#### State Management

- **MoviesContext**: Context for managing and accessing the state related to movies, such as favourites and must-watch lists.
- **TvShowsContext**: Context for managing and accessing the state related to Tv Shows, such as favourites and must-watch lists.

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. For bug reports and feature requests, please open an issue in the GitHub repository.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

