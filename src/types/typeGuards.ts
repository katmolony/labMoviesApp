import { MovieDetailsProps, TvShowDetailsProps } from "./interfaces";

export function isMovie(content: MovieDetailsProps | TvShowDetailsProps): content is MovieDetailsProps {
    return (content as MovieDetailsProps).release_date !== undefined;
}

export function isTvShow(content: MovieDetailsProps | TvShowDetailsProps): content is TvShowDetailsProps {
    return (content as TvShowDetailsProps).first_air_date !== undefined;
}