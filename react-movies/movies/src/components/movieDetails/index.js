import React, { useState } from "react"; // Import React and useState for managing state
import Chip from "@mui/material/Chip"; // Material-UI Chip component for displaying tags
import Paper from "@mui/material/Paper"; // Paper component for wrapping elements
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Icon for runtime
import MonetizationIcon from "@mui/icons-material/MonetizationOn"; // Icon for revenue
import StarRate from "@mui/icons-material/StarRate"; // Icon for rating
import NavigationIcon from "@mui/icons-material/Navigation"; // Icon for navigation (used in the Fab button)
import Fab from "@mui/material/Fab"; // Floating Action Button (FAB) for reviews
import Typography from "@mui/material/Typography"; // Typography component for text styling
import Drawer from "@mui/material/Drawer"; // Drawer component for sliding reviews section
import MovieReviews from "../movieReviews"; // Custom component for displaying movie reviews
import Grid from "@mui/material/Grid"; // Grid system for layout
import Card from "@mui/material/Card"; // Material-UI Card component for displaying cast
import CardMedia from "@mui/material/CardMedia"; // Media section for actor profile picture
import CardContent from "@mui/material/CardContent"; // Content section for actor's name and role

// Define styles for various components
const root = {
  display: "flex", // Flexbox for arranging elements
  justifyContent: "center", // Center-align items
  flexWrap: "wrap", // Wrap elements to new lines as necessary
  listStyle: "none", // Remove list style
  padding: 1.5, // Padding around elements
  margin: 0, // No margin
};
const chip = { margin: 0.5 }; // Margin for the chip elements

// MovieDetails component for displaying detailed movie information
const MovieDetails = ({ movie, cast = [] }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer visibility

  return (
    <>
      {/* Movie Overview Section */}
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {movie.overview} {/* Display movie overview */}
      </Typography>

      {/* Genres Section */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" /> {/* Label for genres */}
        </li>
        {movie.genres.map((g) => ( // Map over genres and display them
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} /> {/* Display each genre as a chip */}
          </li>
        ))}
      </Paper>

      {/* Movie Details (Runtime, Revenue, Rating, Release Date) */}
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} /> {/* Movie runtime */}
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} /> {/* Movie revenue */}
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} /> {/* Movie rating */}
        <Chip label={`Released: ${movie.release_date}`} /> {/* Movie release date */}
      </Paper>

      {/* Production Countries Section */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" /> {/* Label for countries */}
        </li>
        {movie.production_countries.map((country) => ( // Map over production countries and display them
          <li key={country.name}>
            <Chip label={country.name} sx={{ ...chip }} /> {/* Display each country as a chip */}
          </li>
        ))}
      </Paper>

      {/* Top Cast Section */}
      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Top Cast
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {cast.length > 0 ? ( // If there is cast data, display it
          cast.map((actor) => (
            <Grid item xs={6} sm={4} md={2} key={actor.id}>
              <Card> {/* Card for each actor */}
                <CardMedia
                  component="img"
                  alt={actor.name} // Actor's name as alt text
                  height="150"
                  image={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` // Actor's profile picture if available
                      : "https://via.placeholder.com/150" // Placeholder image if no profile picture
                  }
                />
                <CardContent>
                  <Typography variant="body1" align="center">
                    {actor.name} {/* Actor's name */}
                  </Typography>
                  <Typography variant="body2" align="center">
                    as {actor.character} {/* Actor's role in the movie */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No cast information available.</Typography> // Display this if no cast data is available
        )}
      </Grid>

      {/* Floating Action Button for opening the reviews drawer */}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)} // Set the drawer to open
        sx={{
          position: "fixed", // Fixed position at the bottom-right of the screen
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon /> {/* Icon inside the FAB */}
        Reviews
      </Fab>

      {/* Drawer to display movie reviews when FAB is clicked */}
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} /> {/* Render the MovieReviews component inside the drawer */}
      </Drawer>
    </>
  );
};

export default MovieDetails;
