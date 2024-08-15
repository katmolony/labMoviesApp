import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMemberDetails, getMemberCredits } from "../api/tmdb-api";
import { DiscoverMember, DiscoverMemberCredits } from "../types/interfaces";
import MemberDetails from "../components/memberDetails";
import Filmography from "../components/memberFilmography";

const MemberDetailPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: member,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverMember, Error>(["member", id], () =>
    getMemberDetails(id || "")
  );

  const {
    data: memberCredits,
    error: errorCredits,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useQuery<DiscoverMemberCredits, Error>(["memberCredits", id], () =>
    getMemberCredits(id || "")
  );

  if (isLoading || isLoadingCredits) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error">
        Error: {(error as Error).message}
      </Typography>
    );
  }

  if (isErrorCredits) {
    return (
      <Typography variant="h6" color="error">
        Error: {(errorCredits as Error).message}
      </Typography>
    );
  }

  if (!member) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <MemberDetails member={member} />
      <Filmography credits={memberCredits} />
    </Container>
  );
};

export default MemberDetailPage;
