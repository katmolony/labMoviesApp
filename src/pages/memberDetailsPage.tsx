import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getMemberDetails, getMemberCredits } from '../api/tmdb-api';
import { DiscoverMember, DiscoverMemberCredits } from '../types/interfaces';

const MemberDetailPage = () => {
  const { id } = useParams();

  const {
    data: member,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverMember, Error>(['member', id], () => getMemberDetails(id || ''));

  const {
    data: memberCredits,
    error: errorCredits,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useQuery<DiscoverMemberCredits, Error>(['memberCredits', id], () => getMemberCredits(id || ''));

  if (isLoading || isLoadingCredits) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">Error: {(error as Error).message}</Typography>;
  }

  if (isErrorCredits) {
    return <Typography variant="h6" color="error">Error: {(errorCredits as Error).message}</Typography>;
  }

  if (!member) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {member.name}
            </Typography>
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
                <li key={index}>
                  <Typography variant="body1">{name}</Typography>
                </li>
              ))}
            </ul>
            <Typography variant="h6" component="h2" gutterBottom>
              Place of Birth
            </Typography>
            <Typography variant="body1">{member.place_of_birth}</Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Date of Birth
            </Typography>
            <Typography variant="body1">{new Date(member.birthday).toDateString()}</Typography>
            {member.deathday && (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  Date of Death
                </Typography>
                <Typography variant="body1">{new Date(member.deathday).toDateString()}</Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Filmography
        </Typography>
        <Grid container spacing={3}>
          {memberCredits?.cast?.length > 0 ? (
            memberCredits.cast.map((credit) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={credit.id}>
                <Paper elevation={1} sx={{ padding: 2 }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${credit.poster_path || '/placeholder.jpg'}`}
                    alt={credit.title}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                  <Typography variant="h6" component="h3" gutterBottom>
                    {credit.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {credit.character}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(credit.release_date).toDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {credit.vote_average}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {credit.overview}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No credits available.</Typography>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default MemberDetailPage;