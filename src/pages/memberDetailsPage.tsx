import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMemberDetails } from "../api/tmdb-api";
import { DiscoverMember } from "../types/interfaces";

const MemberDetailPage = () => {
  const { id } = useParams();

  const {
    data: member,
    error: error,
    isLoading: loading,
    isError: isError,
  } = useQuery<DiscoverMember, Error>(["member", id], () =>
    getMemberDetails(id || "")
  );

  if (loading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  if (!member) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Paper style={{ padding: 20 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {member.name}
        </Typography>
        <img
          src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
          alt={member.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body1" component="p">
          {member.biography}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Also Known As
        </Typography>
        <ul>
          {member.also_known_as.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
        <Typography variant="h6" component="h2" gutterBottom>
          Place of Birth
        </Typography>
        <Typography variant="body1" component="p">
          {member.place_of_birth}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Date of Birth
        </Typography>
        <Typography variant="body1" component="p">
          {new Date(member.birthday).toDateString()}
        </Typography>
        {member.deathday && (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Date of Death
            </Typography>
            <Typography variant="body1" component="p">
              {new Date(member.deathday).toDateString()}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default MemberDetailPage;
