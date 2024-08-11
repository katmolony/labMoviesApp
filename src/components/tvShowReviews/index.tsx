import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getTvShowReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

import { TVShowDetailsProps, Review } from "../../types/interfaces"; 

const styles = {
    table: {
        minWidth: 550,
    },
};

const TvShowReviews: React.FC<TVShowDetailsProps> = (show) => { 
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getTvShowReviews(show.id).then((reviews) => {
            console.log("getting review from tv reviews component")
            setReviews(reviews);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell >Author</TableCell>
                        <TableCell align="center">Excerpt</TableCell>
                        <TableCell align="right">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((r: Review) => (
                        <TableRow key={r.id}>
                            <TableCell component="th" scope="row">
                                {r.author}
                            </TableCell>
                            <TableCell >{excerpt(r.content)}</TableCell>
                            <TableCell >
                                <Link
                                    to={`/reviews/${r.id}`}
                                    state={{
                                        review: r,
                                        show: show,
                                    }}
                                >
                                    Full Review
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TvShowReviews;
