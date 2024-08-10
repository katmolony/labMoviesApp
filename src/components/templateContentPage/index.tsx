import React from "react";
import MovieHeader from "../headerMovie";
import TvHeader from "../headerTvShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getContentImages } from "../../api/tmdb-api";
import {
  ContentDetailsProps,
  MovieImage,
  TVShowImage,
} from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { isMovie, isTvShow } from "../../types/typeGuards";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateContentPageProps {
  content: ContentDetailsProps;
  children: React.ReactNode; // Use React.ReactNode to allow multiple children
}

const TemplateContentPage: React.FC<TemplateContentPageProps> = ({
  content,
  children,
}) => {
  // Determine the type of content
  const isContentMovie = isMovie(content);
  const isContentTvShow = isTvShow(content);

  // // Choose the appropriate header component based on the content type
  // const Header = isContentTvShow ? TvHeader : MovieHeader;

  // Fetch images for both movies and TV shows
  const { data, error, isLoading, isError } = useQuery<
    MovieImage[] | TVShowImage[],
    Error
  >(["images", content.id], () =>
    getContentImages(content.id, isContentTvShow ? "tv" : "movie")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const images = data as (MovieImage | TVShowImage)[];

  return (
    <>
      {isContentMovie && <MovieHeader {...(content as any)} />}
      {isContentTvShow && <TvHeader {...(content as any)} />}

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              {images.map((image: MovieImage | TVShowImage) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                  cols={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={"Image alternative"}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateContentPage;
