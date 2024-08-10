import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { ContentDetailsProps } from "../../types/interfaces";

// Define styles
const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
};

const ContentDetails: React.FC<ContentDetailsProps> = ({
    type,
    overview,
    genres,
    runtime,
    revenue,
    vote_average,
    vote_count,
    release_date,
}) => {
    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                {type === "movie" && runtime && (
                    <Chip icon={<AccessTimeIcon />} label={`${runtime} min.`} />
                )}
                {type === "movie" && revenue !== undefined && (
                    <Chip
                        icon={<MonetizationIcon />}
                        label={`${revenue.toLocaleString()}`}
                    />
                )}
                <Chip
                    icon={<StarRate />}
                    label={`${vote_average} (${vote_count})`}
                />
                <Chip label={`Released: ${release_date}`} />
            </Paper>
        </>
    );
};

export default ContentDetails;