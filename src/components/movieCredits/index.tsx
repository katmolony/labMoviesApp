import React from "react";
import Grid from "@mui/material/Grid";

const MovieCreditsList = ({ movieData }) => {
  // Separate cast and crew by department
  const cast = movieData.cast || [];
  const crew = movieData.crew || [];

  // Limit the number of displayed members
  const maxCastDisplay = 6;
  const maxCrewDisplay = 4;

  const actingCast = cast.filter((member) => member.known_for_department === "Acting").slice(0, maxCastDisplay);
  const directingCrew = crew.filter((member) => member.department === "Directing").slice(0, maxCrewDisplay);
  const otherCrew = crew.filter((member) => member.department !== "Directing").slice(0, maxCrewDisplay);

  return (
    <div className="movie-details">
      <h2>Cast</h2>
      <h3>Acting</h3>
      <Grid container spacing={2}>
        {actingCast.map((member) => (
          <Grid item key={member.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p>
              <strong>{member.name}</strong> as {member.character}
            </p>
          </Grid>
        ))}
      </Grid>

      <h2>Crew</h2>
      <h3>Directing</h3>
      <ul>
        {directingCrew.map((member) => (
          <li key={member.id}>
            <strong>{member.name}</strong> - {member.job}
          </li>
        ))}
      </ul>

      <h3>Other Crew</h3>
      <ul>
        {otherCrew.map((member) => (
          <li key={member.id}>
            <strong>{member.name}</strong> - {member.job}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCreditsList;
