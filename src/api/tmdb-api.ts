export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMostPopularMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getSimilarMovies = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to get movie data. Response status: ${response.status}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };


export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => {
  //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getTvShows = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvShow = (series_id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${series_id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get movie data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
export const getTvShowImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

export const getContentImages = async (
  id: number,
  type: "movie" | "tv"
): Promise<MovieImage[]> => {
  const endpoint =
    type === "movie" ? `/movie/${id}/images` : `/tv/${id}/images`;
  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error("Error fetching images");
  }
  const data = await response.json();
  return data.backdrops; // Adjust based on API response
};

export const getTvShowGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvShowReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

// Fantacy movie
export const getMovieDetails = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
    .then((response) => {
      console.log("this is the tv show reviews", response);
      if (!response.ok)
        throw new Error(
          `Unable to fetch movie details. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMoviesByReleaseDate = async (
  minDate: string,
  maxDate: string
) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=popularity.desc&release_date.gte=${minDate}&release_date.lte=${maxDate}&with_release_type=2|3`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movie details. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
