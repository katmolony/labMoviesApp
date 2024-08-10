
import React from 'react';
import { MovieDetailsProps } from "../../types/interfaces";

interface MovieHeaderProps extends MovieDetailsProps {}

const MovieHeader: React.FC<MovieHeaderProps> = (props) => {
    // Render movie-specific header
    return (
        <div>
            {/* Movie header content */}
            <h1>{props.title}</h1>
            {/* Add more movie-specific details */}
        </div>
    );
};

export default MovieHeader;