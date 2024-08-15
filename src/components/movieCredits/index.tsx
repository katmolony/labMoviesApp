import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { MovieData } from '../../types/interfaces';

const styles = {
  gridContainer: {
    marginTop: 2,
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  listContainer: {
    padding: '16px',
    marginTop: '16px',
  },
};

interface MovieCreditsListProps {
  movieData: MovieData;
}

const MovieCreditsList: React.FC<MovieCreditsListProps> = ({ movieData }) => {
  const cast = movieData.cast || [];
  const crew = movieData.crew || [];

  const maxCastDisplay = 6;
  const maxCrewDisplay = 4;

  const actingCast = cast.filter(member => member.known_for_department === 'Acting').slice(0, maxCastDisplay);
  const directingCrew = crew.filter(member => member.department === 'Directing').slice(0, maxCrewDisplay);
  const otherCrew = crew.filter(member => member.department !== 'Directing').slice(0, maxCrewDisplay);

  return (
    <>
      <Typography variant="h5" component="h3" gutterBottom>
        Cast
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        Acting
      </Typography>
      <Grid container spacing={2} sx={styles.gridContainer}>
        {actingCast.map(member => (
          <Grid item key={member.id} xs={12} sm={6} md={4} lg={3} xl={2} sx={styles.gridItem}>
            <Link to={`/member/${member.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                style={styles.image}
              />
              <Typography variant="body1" component="p">
                <strong>{member.name}</strong> as {member.character}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h3" gutterBottom>
        Crew
      </Typography>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={styles.listContainer}>
            <Typography variant="h6" component="h4" gutterBottom>
              Directing
            </Typography>
            <ul>
              {directingCrew.map(member => (
                <li key={member.id}>
                  <Link to={`/member/${member.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body1" component="p">
                      <strong>{member.name}</strong> - {member.job}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={styles.listContainer}>
            <Typography variant="h6" component="h4" gutterBottom>
              Other Crew
            </Typography>
            <ul>
              {otherCrew.map(member => (
                <li key={member.id}>
                  <Link to={`/member/${member.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body1" component="p">
                      <strong>{member.name}</strong> - {member.job}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieCreditsList;
