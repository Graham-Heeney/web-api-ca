import React from "react"; // Import React to use JSX and create the component
import Movie from "../movieCard/"; // Import Movie component to display individual movie cards
import Grid from "@mui/material/Grid"; // Import Grid component from Material-UI for layout

// MovieList component to display a list of movies in a grid
const MovieList = (props) => {
  // Map over the movies array and create a Movie card for each movie
  let movieCards = (props.movies || []).map((m) => (
    <Grid item key={m.id} xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "10px" }}>
      {/* Render the Movie component for each movie, passing the movie data and action function as props */}
      <Movie movie={m} action={props.action} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          {/* Display the list of movie cards. If no movies are available, show a message */}
          {movieCards.length > 0 ? movieCards : <p>No movies available.</p>}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieList;
