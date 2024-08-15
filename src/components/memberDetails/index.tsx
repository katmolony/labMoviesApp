import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DiscoverMember } from "../../types/interfaces";

interface MemberDetailsProps {
  member: DiscoverMember;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
            alt={member.name}
            style={{ width: "100%", borderRadius: "8px" }}
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
          <Typography variant="body1">
            {new Date(member.birthday).toDateString()}
          </Typography>
          {member.deathday && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Date of Death
              </Typography>
              <Typography variant="body1">
                {new Date(member.deathday).toDateString()}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MemberDetails;
