import React, { useState } from "react";
import FilterMoviesCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().includes(value.toLowerCase());
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (filterType: string, value: string) => void;
    titleFilter: string;
    genreFilter: string;
    sortOption: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
    onFilterValuesChange,
    titleFilter,
    genreFilter,
    sortOption
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterMoviesCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    sortOption={sortOption}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
