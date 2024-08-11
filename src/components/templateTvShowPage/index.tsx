import React, { useState, useEffect } from "react";
import SiteHeaderTV from "../siteHeaderTv";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTvShowImages } from "../../api/tmdb-api";
import { TVShowImage, TvShowDetailsProps } from "../../types/interfaces";
import TvHeader from "../headerTvShow";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplateMoviePageProps {
    show: TvShowDetailsProps;
    children: React.ReactElement;
}


const TemplateTvShowPage: React.FC<TemplateMoviePageProps> = ({show, children}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getTvShowImages(show.id).then((images) => {
            setImages(images);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <SiteHeaderTV></SiteHeaderTV>
            <TvHeader {...show} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: TVShowImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
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

export default TemplateTvShowPage;