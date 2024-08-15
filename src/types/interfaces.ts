export type FilterOption = "title" | "genre";

export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
  mustWatch?: boolean[]; 
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  // action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    id: number;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface Review{
  id: string;
  content: string
  author: string
}

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string | null;
}

export interface MovieData {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface DiscoverUpcomingMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
}

export interface DiscoverSimilarMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface MovieCredits {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface CastCredit extends BaseMovieProps {
  character:string
}

export interface DiscoverMemberCredits {
  cast: CastCredit[];
  crew: CastCredit[];
}

export interface BaseTVShowProps {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  favourite?: boolean;
  mustWatch?: boolean[];
}

export interface BaseTVShowListProps {
  shows: BaseTVShowProps[];
 // selectFavourite: (movieId: number) => void; 
  action: (s: BaseTVShowProps) => React.ReactNode;
}

export interface TVShowDetailsProps extends BaseTVShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface TVShowImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface TVShowPageProps {
  show: TVShowDetailsProps;
  images: TVShowImage[];
}

// export interface TVShowListPageTemplateProps extends BaseTVShowListProps {
//   title: string;
// }
export interface TVShowListPageTemplateProps extends BaseTVShowListProps {
  name: string;
}

export interface Review {
  id: string;
  content: string;
  author: string;
  agree: boolean;
  rating: number;
  showId: number;
}

export interface GenreDataTV {
  genres: {
    id: string;
    name: string;
  }[];
}

export interface DiscoverTVShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTVShowProps[];
}

export interface MemberDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface DiscoverMember {
  page: number;
  total_pages: number;
  total_results: number;
  results: MemberDetails[];
}

export interface MovieDetailsProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  budget: number;
  homepage: string;
  imdb_id: string;
 // production_countries: { iso_3166_1: string; name: string }[];
}

export interface TvShowDetailsProps {
  id: number;
  title: string;
  name: string; 
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
}

export type ContentDetailsProps = MovieDetailsProps | TvShowDetailsProps;